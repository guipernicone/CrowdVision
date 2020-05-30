import os
import numpy as np
import cv2
import base64
import requests
import json
import geocoder
import socket
# import _thread as thread
import threading
import time
from datetime import datetime
from io import StringIO

#--------------------------------------------------------------------
#                         VIDEO STREAM
#--------------------------------------------------------------------

cap = cv2.VideoCapture('videos/testVideo4.mp4')

#--------------------------------------------------------------------
#                         CONFIGs
#--------------------------------------------------------------------

# PATH for the TensorFlow frozen inference graph, that is the actual model for 
# the object detection.
SERVER_URL = 'http://localhost:8080'

DETECTION_API_URL = 'http://localhost:5000'


#--------------------------------------------------------------------
#                      CONVERT TO BASE64
#--------------------------------------------------------------------
#Enconde the image to a jpg format
def convert_frame_to_base_64_string(frame):
    ret, buffer = cv2.imencode('.jpg', cv2.resize(frame, (300, 300)))
    return base64.b64encode(buffer)

#--------------------------------------------------------------------
#                         HTTP REQUEST
#--------------------------------------------------------------------
#Send a http request to the java server.
def send_post(URL, payload):
    headers = {'content-type': 'application/json'}
    return requests.post(url = URL, data=json.dumps(payload), headers=headers)

def send_detected_frame(detection, device_key):
    URL = "http://localhost:8080/detection/add-frame/detected"

    payload = {
            "frame" : detection['frame'],
            "detectionScore" : detection['score'],
            "cameraId": str(device_key),
            "time" : datetime.today().strftime('%d-%m-%Y %H:%M:%S')
        }

    r = send_post(URL, payload)
    print(f"HTTP post request Response status: {r.status_code}");

def register_deveice():
    try:
        f = open('property.txt', 'r')
        content = f.read()
        if (len(content) != 0) :
            f.close()
            return content
    except FileNotFoundError:
        print('File does not exist')
     
    URL = "http://localhost:8080/camera/register"
    response = geocoder.ip('me');

    payload = {
            "latitude" : str(response.lat),
            "longitude" : str(response.lng),
        }
    r = send_post(URL, payload)

    print(f"HTTP post request Response status: {r.status_code}")
    if (r.status_code == 200) :
        f = open('property.txt', 'w')
        f.write(r.text)
        f.close()
        return r.text
            
def send_to_detection(frame):
    URL = DETECTION_API_URL + "/detection"
    payload = {
            "frame" : str(frame, 'utf-8')
        }
    r = send_post(URL, payload)

    # print(f"HTTP post request Response status: {r.status_code}")
    return r.text
    

#--------------------------------------------------------------------
#                         DETECTION
#--------------------------------------------------------------------

def validate_frame(image_np, device_key):
    global delay, initial_time
    jpg_img = convert_frame_to_base_64_string(image_np)
    response = send_to_detection(jpg_img);
    jsonResponse = json.loads(response)
    print(jsonResponse['score'])

    if (jsonResponse['score'] > 0.75):
                print("Detectou");
                detectionTime = int(round(time.time() * 1000))
                running_time = detectionTime - initial_time
                #Send the detection once 5 seconds
                if (delay <= running_time):
                    initial_time = int(round(time.time() * 1000))
                    delay = 5000
                    threaded = threading.Thread(target=send_detected_frame, args=(jsonResponse, device_key))
                    threaded.daemon = True
                    threaded.start()
                    

i = 0
delay = 0
initial_time = int(round(time.time() * 1000))
device_key = register_deveice()
print(device_key)
while True:
    # Read a frame from the defined stream
    ret, image_np = cap.read()

    
    if (ret == True):
        validate_frame(image_np, device_key)
        # thread_id = thread.start_new_thread(validate_frame, (image_np,))
        # threaded = threading.Thread(target=validate_frame, args=(image_np,))
        # threaded.daemon = True  # This thread dies when main thread (only non-daemon thread) exits.
        # threaded.start()
        # assert threading.current_thread() is threading.main_thread()
        # i += 1
        # print(i)
        # if(i == 10):
        #     time.sleep(5)
        #     i = 0
    else:       
        print("Frame was not receive")
        break;
        time.sleep(10)
