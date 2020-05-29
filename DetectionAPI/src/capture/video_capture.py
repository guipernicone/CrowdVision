import os
import numpy as np
import cv2
import base64
import requests
import json
import geocoder
import socket
import _thread as thread
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

def send_detected_frame(frame, score, device_key):
    URL = "http://localhost:8080/detection/add-frame/detected"

    payload = {
            "frame" : str(frame),
            "detectionScore" : float(score),
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

    print(f"HTTP post request Response status: {r.status_code}")
    return r.text
    

#--------------------------------------------------------------------
#                         DETECTION
#--------------------------------------------------------------------

def validate_frame(image_np):
    jpg_img = convert_frame_to_base_64_string(image_np)
    response = send_to_detection(jpg_img);
    # print(response)
    # # convert any frame that has more than 75% of accuracy
    # if (scores[0][0].item() > 0.75):
    #     detectionTime = int(round(time.time() * 1000))
    #     running_time = detectionTime - initial_time
    #     #Send the detection once 5 seconds
    #     if (delay <= running_time):
    #         jpg_img_detected = convert_frame_to_base_64_string(image_np)
    #         initial_time = int(round(time.time() * 1000))
    #         delay = 5000
    #         thread.start_new_thread(send_detected_frame, (jpg_img_detected, scores[0][0], device_key))

    # Display the frames with the detection boxes
    cv2.imshow('object detection', cv2.resize(image_np, (800, 600)))
    # # time.sleep(10)
    # cv2.imshow('object detection', cv2.resize(image_np, (340, 660)))

    if cv2.waitKey(25) & 0xFF == ord('q'):
        cv2.destroyAllWindows()


    

# delay = 0
# initial_time = int(round(time.time() * 1000))
# device_key = register_deveice()
# print(device_key)
while True:
    # Read a frame from the defined stream
    ret, image_np = cap.read()
    # max = 50
    # i = 0
    # max1 = 0
    # thread_id = 0;
    if (ret == True):
        validate_frame(image_np)
        # if (max > i):
        thread_id = thread.start_new_thread(validate_frame, (image_np,))
        print(thread_id)
        # else:
        #     time.sleep(1)
        #     i = 0
        # i += 1
        # max1 += 1
        # print(max1)
    else:       
        print("Frame was not receive")
