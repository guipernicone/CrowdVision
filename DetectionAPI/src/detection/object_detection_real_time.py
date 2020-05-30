import numpy as np
import os
import tensorflow as tf
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
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util

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
#                            BASE64
#--------------------------------------------------------------------
#Enconde the image to a jpg format
def convert_frame_to_base_64_string(frame):
    ret, buffer = cv2.imencode('.jpg', cv2.resize(frame, (300, 300)))
    return base64.b64encode(buffer)

def decode_base_64_string(frame):
    base64_bytes = base64.b64decode(frame)
    npbuffer = np.frombuffer(base64_bytes, np.uint8)
    return cv2.imdecode(npbuffer, cv2.IMREAD_COLOR)


#--------------------------------------------------------------------
#                         DETECTION
#--------------------------------------------------------------------
def run_detection(frame):  
    image_np = decode_base_64_string(frame)
    with detection_graph.as_default():
        with tf.compat.v1.Session(graph=detection_graph) as sess:
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
            
            frame = convert_frame_to_base_64_string(image_np)

            return {
                "frame" : str(frame),
                "score" : float(scores[0][0]),
            }