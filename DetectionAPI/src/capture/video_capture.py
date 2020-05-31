import os
import numpy as np
import cv2
import base64
import requests
import json
import geocoder
import socket
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

def register_deveice():
    try:
        f = open('property.bin', 'rb')
        contntBytes = f.read()
        content = str(contntBytes, 'utf-8')
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
        f = open('property.bin', 'wb')
        f.write(bytes(r.text, 'utf-8'))
        f.close()
        return r.text
            
def send_to_detection(frame, device_key, t):
    URL = DETECTION_API_URL + "/detection"
    payload = {
        "frames" : frame,
        "deviceId" : str(device_key),
        "t" : t
    }
    r = send_post(URL, payload)

    print(f"HTTP post request Response status: {r.status_code}")
       

#--------------------------------------------------------------------
#                         CAPTURE
#--------------------------------------------------------------------
device_key = register_deveice()
print(device_key)
frame_list = []
frame_count = 0
t = 0
while True:
    # Read a frame from the defined stream
    ret, image_np = cap.read()

    if (ret == True):
        img64 = convert_frame_to_base_64_string(image_np)

        frame_count += 1
        frame_list.append(str(img64, 'utf-8'))
        
        if (frame_count > 99):
            print("Enviando 100 frames")
            t += 1
            threaded = threading.Thread(target=send_to_detection, args=(frame_list, device_key, f'Pacote {t}'))
            threaded.daemon = True
            threaded.start()
            frame_list = []
            frame_count = 0

        # # Display the frames with the detection boxes
        # cv2.imshow('object detection', cv2.resize(image_np, (800, 600)))

        # if cv2.waitKey(25) & 0xFF == ord('q'):
        #     cv2.destroyAllWindows()
        #     break

    else:
        if (frame_count != 0):
            print(f"Enviando {frame_count} frames")
            t += 1
            threaded = threading.Thread(target=send_to_detection, args=(frame_list, device_key, f'Pacote {t}'))
            threaded.daemon = True
            threaded.start()
            frame_list = []
            frame_count = 0 
   
        print("Frame was not receive")
        time.sleep(2)
        break
        
