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
import sys
from datetime import datetime
from io import StringIO

#--------------------------------------------------------------------
#                         VIDEO STREAM
#--------------------------------------------------------------------

cap = cv2.VideoCapture('videos/testVideo2.mp4')

#--------------------------------------------------------------------
#                         CONFIGs
#--------------------------------------------------------------------

# SERVER_URL = 'http://localhost:8080'
SERVER_URL = 'http://192.168.15.21:8080'

DETECTION_API_URL = 'http://localhost:5000'

MAX_FRAMES__PER_REQUEST = 499

RECONNECT_DELAY = 10


#--------------------------------------------------------------------
#                      CONVERT TO BASE64
#--------------------------------------------------------------------
#Enconde the image to a jpg format
def convert_frame_to_base_64_string(frame):
    ret, buffer = cv2.imencode('.jpg', cv2.resize(frame, (300, 300)))
    return base64.b64encode(buffer)

def convert_color_img_to_black_and_white(image):
    # image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # # threshold the image
    # img_binary = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)[1]
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    lower_black = np.array([0, 0, 0], np.uint8)
    upper_black = np.array([179, 100, 200], np.uint8)
    
    mask = cv2.inRange(hsv, lower_black, upper_black)
    res = cv2.bitwise_and(image,image, mask= mask)
    return res


#--------------------------------------------------------------------
#                         HTTP REQUEST
#--------------------------------------------------------------------
def get_key(camera_name):
    try:
        f = open(f'{camera_name}.bin', 'rb')
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
  
def request_key(camera_name):
    URL = SERVER_URL + "/camera/register"
    localization = geocoder.ip('me')

    payload = {
            "latitude" : str(localization.lat),
            "longitude" : str(localization.lng),
            "name" : str(camera_name),
        }

    print("Request for new device key")
    r = http_request.send_post(URL, payload)

    if (r.status_code == 200) :
        print("Device key " + r.text + " receive from server")
        f = open(f'{camera_name}.bin', 'wb')
        f.write(bytes(r.text, 'utf-8'))
        f.close()
        return r.text

    print("Device not regitered ")
    return False

def register_device(camera_name):
    key = get_key(camera_name)

    if (key != False):
        return key
     
    new_key = request_key(camera_name)

    if (new_key != False):
        return new_key
            
def send_to_detection(frame, device_key):
    URL = DETECTION_API_URL + "/detection"
    global failed_send_attemps
    payload = {
        "frames" : frame,
        "deviceId" : str(device_key)
    }

    try:
        r = http_request.send_post(URL, payload)
    except Exception:
        failed_send_attemps += 1
        semaphore.release()
    semaphore.release()
    # print(f"HTTP post request Response status: {r.status_code}")
       
#--------------------------------------------------------------------
#                         CAPTURE
#--------------------------------------------------------------------

if (len(sys.argv) >= 3 and sys.argv[1] == "-camera_name"):
    print(sys.argv)
    camera_name = sys.argv[2]

    if (len(sys.argv) == 5 and sys.argv[3] == "-video"):
        cap = cv2.VideoCapture(f'videos/{sys.argv[4]}.mp4')
    else:
        if (len(sys.argv) == 5 and sys.argv[3] == "-camera_src"):
            cap = cv2.VideoCapture(int(sys.argv[4]))
    
    device_key = register_device(camera_name)
    frame_list = []
    frame_count = 0
    semaphore = threading.Semaphore(9)
    failed_send_attemps = 0

    while True:
        # Read a frame from the defined stream
        ret, image_np = cap.read()

        image_np = convert_color_img_to_black_and_white(image_np)
        
        if (failed_send_attemps > 10):
            failed_send_attemps = 0
            print('Connection to ' + DETECTION_API_URL + ' failed')
            print('Trying to reconnect again in ' + str(RECONNECT_DELAY) + ' seconds')
            time.sleep(RECONNECT_DELAY)
        
        if (ret == True):
            img64 = convert_frame_to_base_64_string(image_np)

            frame_count += 1
            frame_list.append({
                "frame": str(img64, 'utf-8'),
                "captureTime": datetime.today().strftime('%d/%m/%Y %H:%M:%S')
            })

            if (frame_count > MAX_FRAMES__PER_REQUEST):
                semaphore.acquire()
                print("Enviando " + str(MAX_FRAMES__PER_REQUEST + 1) + " frames")

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
else:
    print("No name for the camera was declared")
        
