#!/bin/bash

SET ROOTPATH=/home/soul/Documentos/CrowdVision/Server

cd %ROOTPATH%
call mvn clean
call mvn install

pause
