import React, {memo, useState, useEffect} from 'react';
import { StatisticsMainFormStyle } from 'Page/Statistics/Style/StatisticsMainFormStyle'
import { getUserCameras } from 'Service/UserService';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import ExploreIcon from '@material-ui/icons/Explore';
import Divisor from 'Components/Divisor/Divisor'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button } from 'react-bootstrap';

const StatisticsMainForm = ({}) => {
    const [camerasContent, setCamerasContent] = useState([]);
    const [camerasSelected, setCamerasSelected] = useState([]);

    useEffect(() => {
        getUserCameras()
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log(response.data);
                setCamerasContent(response.data);

            }
        })
        .catch((error) => {
            console.log(error);
        })

      },[]);
    

    const selectHandler = (camera) => {
        let selectCameras = JSON.parse(JSON.stringify(camerasSelected));

        if (!selectCameras.some(object => object.id === camera.id)){
            selectCameras.push(camera);
        }
        console.log(selectCameras);
        setCamerasSelected(selectCameras);
    }

    const selectAll = () => {
        let cameras = JSON.parse(JSON.stringify(camerasContent));
        let selectCameras = JSON.parse(JSON.stringify(camerasSelected));

        cameras.map(cameraObject => {
            if (!selectCameras.some(object => object.id === cameraObject.id)){
                selectCameras.push(cameraObject);
            }
        })
        console.log(selectCameras);
        setCamerasSelected(selectCameras);
    }

    const deleteSelect = (id) => {
        let selectCameras = JSON.parse(JSON.stringify(camerasSelected));
        let result = selectCameras.filter(cameraId => cameraId.id !== id);
        
        console.log(result);
        setCamerasSelected(result);
    }

    const buildCameraList = () => {
        let cameraList = [];
        cameraList = camerasContent.map((camera, index) => {
            return (
                <div key={"list" + index} className="camera-list-item">
                    <span style={{cursor: "default"}}>{camera.name}</span>
                    <AddCircleOutlineIcon 
                        className="add-icon"
                        onClick={() => selectHandler(camera)}
                    />
                </div>
            )
        })

        return cameraList
    }

    const buildSelectList = () => {
        let selectedList = [];
        selectedList = camerasSelected.map((selectedCamera, index) => {
            return (
                <div key={"select" + index} className="camera-list-item">
                    <span style={{cursor: "default", paddingRight: "15px"}}>{index}</span>
                    <span style={{cursor: "default"}}>{selectedCamera.name}</span>
                    <DeleteIcon
                        className="remove-icon"
                        onClick={() => deleteSelect(selectedCamera.id)}
                    />
                </div>
            )
        })

        return selectedList
    }

    return (
        <StatisticsMainFormStyle>
            <div className="title">Estatísticas</div>
            <div className="statistics-form-body">
                <div className="select-field">
                    <div className="camera-list-box">
                        <div className="subtitle">Selecionar Cameras</div>
                        {buildCameraList()}
                    </div>
                    <div style={{position: "relative"}}>
                        <Button className="select-all-buttom">
                            <DoubleArrowRoundedIcon onClick={() => selectAll()}/>
                        </Button>
                    </div>
                    <div className="select-list-box">
                        <div className="subtitle">Cameras Selecionadas</div>
                        {buildSelectList()}
                    </div>
                </div>
                <div className="data-field"></div>
                <div className="buttom-field"></div>
            </div>
        </StatisticsMainFormStyle>
    );
};

export default memo(StatisticsMainForm);