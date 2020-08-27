#!/bin/bash

current_dir=$PWD

cd ../../contrib/TensorFlow_Object_Detection_Api/models/research
ls
echo $PWD
export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/slim
echo $current_dir

cd $current_dir
python3 app.py

