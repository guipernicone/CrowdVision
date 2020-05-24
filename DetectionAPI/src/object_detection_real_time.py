import numpy as np
import os
import tensorflow as tf
import cv2
import base64
import requests
import json
import geocoder
import socket
from datetime import datetime
from io import StringIO
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util

#--------------------------------------------------------------------
#                         VIDEO STREAM
#--------------------------------------------------------------------

cap = cv2.VideoCapture('videos/testVideo4.mp4')

#--------------------------------------------------------------------
#                         MODEL PREPARATION
#--------------------------------------------------------------------

# PATH for the TensorFlow frozen inference graph, that is the actual model for 
# the object detection.
PATH_TO_CKPT = os.path.join('inference_graph', 'frozen_inference_graph.pb')

# PATH to the labels map, in a json file.
PATH_TO_LABELS = os.path.join('label_map', 'object-detection.pbtxt')

# Number of classes to detect
# Class: 
#   1 - arma
NUM_CLASSES = 1

#--------------------------------------------------------------------
#                         LOAD MODEL
#--------------------------------------------------------------------

# Load the frozen TensorFlow model to the memory
detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.compat.v1.GraphDef()
    with tf.io.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')

# Load the label map and create a indice to the category name, where a indice
# corresponds to a actual category name.
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(
    label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)


#--------------------------------------------------------------------
#                            HELPER
#--------------------------------------------------------------------

def load_image_into_numpy_array(image):
    (im_width, im_height) = image.size
    return np.array(image.getdata()).reshape(
        (im_height, im_width, 3)).astype(np.uint8)

#--------------------------------------------------------------------
#                      CONVERT TO BASE64
#--------------------------------------------------------------------
#Enconde the image to a jpg format
def convert_frame_to_base_64_string(frame):
    ret, buffer = cv2.imencode('.jpg', cv2.resize(image_np, (300, 300)))
    return base64.b64encode(buffer)

#--------------------------------------------------------------------
#                         HTTP REQUEST
#--------------------------------------------------------------------
#Send a http request to the java server.
def send_detected_frame(frame, score):
    URL = "http://localhost:8080/detection/add-frame/detected"
    headers = {'content-type': 'application/json'}
    response = geocoder.ip('me');

    payload = {
            "frame" : str(frame),
            "detectionScore" : float(score),
            "latitude" : str(response.lat),
            "longitude": str(response.lng),
            "time" : datetime.today().strftime('%d-%m-%Y %H:%M:%S')
        }
    r = requests.post(url = URL, data=json.dumps(payload), headers=headers, );
    print(f"HTTP post request Response status: {r.status_code}");

#--------------------------------------------------------------------
#                         DETECTION
#--------------------------------------------------------------------

with detection_graph.as_default():
    with tf.compat.v1.Session(graph=detection_graph) as sess:
        while True:
            # Read a frame from the defined stream
            ret, image_np = cap.read()

            if (ret == True):
                jpg_img = convert_frame_to_base_64_string(image_np)

            # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
            image_np_expanded = np.expand_dims(image_np, axis=0)
            # Extract image tensor
            image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
            # Extract detection boxes
            boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
            # Extract detection scores
            scores = detection_graph.get_tensor_by_name('detection_scores:0')
            # Extract detection classes
            classes = detection_graph.get_tensor_by_name('detection_classes:0')
            # Extract number of detectionsd
            num_detections = detection_graph.get_tensor_by_name('num_detections:0')

            # Run the tensors by running the session, getting the actual detection.
            (boxes, scores, classes, num_detections) = sess.run(
                [boxes, scores, classes, num_detections],
                feed_dict={image_tensor: image_np_expanded})

            # Visualization of the results of a detection by creating the boxes and
            # labels on the frame
            vis_util.visualize_boxes_and_labels_on_image_array(
                image_np,
                np.squeeze(boxes),
                np.squeeze(classes).astype(np.int32),
                np.squeeze(scores),
                category_index,
                use_normalized_coordinates=True,
                min_score_thresh=.75,
                line_thickness=8)

            print(scores[0][0])
            print(classes[0][0])
            print(num_detections[0])
            print(boxes[0][0])

            # convert any frame that has more than 75% of accuracy
            if (scores[0][0].item() > 0.75):
                jpg_img_detected = convert_frame_to_base_64_string(image_np)
                send_detected_frame(jpg_img_detected, scores[0][0])

            # Display the frames with the detection boxes
            cv2.imshow('object detection', cv2.resize(image_np, (800, 600)))
            # cv2.imshow('object detection', cv2.resize(image_np, (340, 660)))

            if cv2.waitKey(25) & 0xFF == ord('q'):
                cv2.destroyAllWindows()
                break
