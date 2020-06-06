import os
import numpy as np
import cv2
import base64
import json
import geocoder
import socket
import threading
import time
import http_request
from datetime import datetime
from io import StringIO

#--------------------------------------------------------------------
#                         VIDEO STREAM
#--------------------------------------------------------------------

cap = cv2.VideoCapture('videos/testVideo2.mp4')

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
    # return base64.standard_b64encode(buffer)

#--------------------------------------------------------------------
#                         HTTP REQUEST
#--------------------------------------------------------------------
def get_key():
    try:
        f = open('property.bin', 'rb')
        contntBytes = f.read()
        print(contntBytes)
        content = str(contntBytes, 'utf-8')
        print(content)

        if (len(content) != 0) :
            f.close()
            print("Local save found, device key " + content)
            URL = SERVER_URL + "/camera/validate-key"
            payload = {
                "cameraId" : content
            }

            print("Sending key " + content  + " to validade")
            r = http_request.send_post(URL, payload)

            if (r.status_code == 200):
                print("Valid key")
                return r.text

            print("Invalid key")
            return False
    except FileNotFoundError:
        print('Local save not found')
        return False
  
def request_key():
    URL = SERVER_URL + "/camera/register"
    localization = geocoder.ip('me');

    payload = {
            "latitude" : str(localization.lat),
            "longitude" : str(localization.lng),
        }

    print("Request for new device key")
    r = http_request.send_post(URL, payload)

    # print(f"HTTP post request Response status: {r.status_code}")
    if (r.status_code == 200) :
        print("Device key " + r.text + " receive from server")
        f = open('property.bin', 'wb')
        f.write(bytes(r.text, 'utf-8'))
        f.close()
        return r.text
    print("Device not regitered ")
    return False

def register_device():
    key = get_key()

    if (key != False):
        return key
     
    new_key = request_key();

    if (new_key != False):
        return new_key
            
def send_to_detection(frame, device_key):
    URL = DETECTION_API_URL + "/detection"
    payload = {
        "frames" : frame,
        "deviceId" : str(device_key)
    }
    r = http_request.send_post(URL, payload)
    semaphore.release()
    # print(f"HTTP post request Response status: {r.status_code}")
       
#--------------------------------------------------------------------
#                         CAPTURE
#--------------------------------------------------------------------
device_key = register_device()
frame_list = []
frame_count = 0
semaphore = threading.Semaphore(9)

while True:
    # Read a frame from the defined stream
    ret, image_np = cap.read()

    if (ret == True):
        img64 = convert_frame_to_base_64_string(image_np)

        frame_count += 1
        frame_list.append(str(img64, 'utf-8'))

        if (frame_count > 199):
            semaphore.acquire()
            print("Enviando 200 frames")

            threaded = threading.Thread(target=send_to_detection, args=(frame_list, device_key))
            # threaded.daemon = True
            threaded.start()
            frame_list = []
            frame_count = 0

        # Display the frames with the detection boxes
        cv2.imshow('object detection', cv2.resize(image_np, (800, 600)))

        if cv2.waitKey(25) & 0xFF == ord('q'):
            cv2.destroyAllWindows()
            break

    else:
        if (frame_count != 0):
            print(f"Enviando {frame_count} frames")
            threaded = threading.Thread(target=send_to_detection, args=(frame_list, device_key))
            threaded.daemon = True
            threaded.start()
            frame_list = []
            frame_count = 0 

        print("No frame was received")
        time.sleep(2)
        break
        
