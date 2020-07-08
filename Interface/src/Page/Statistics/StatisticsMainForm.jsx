import React, {memo, useState, useEffect} from 'react';
import { StatisticsMainFormStyle } from 'Page/Statistics/Style/StatisticsMainFormStyle'
import { getUserCameras } from 'Service/UserService';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ExploreIcon from '@material-ui/icons/Explore';

const StatisticsMainForm = ({}) => {
    const [camerasContent, setCamerasContent] = useState([]);
    const [camerasSelected, setCamerasSelected] = useState();

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
    
    const buildCameraList = () => {
        let cameraList = [];
        cameraList = camerasContent.map(camera => {
            return (
                <div className="camera-list-item">
                    <span>{camera.name}</span>
                    <ArrowForwardIosIcon/>
                </div>
            )
        })

        return cameraList
    }

    return (
        <StatisticsMainFormStyle>
            <div className="title">Estatísticas</div>
            <div class="statistics-form-body">
                <div className="camera-list-box">
                    {buildCameraList()}
                </div>
                <DoubleArrowIcon/>
                <div className="select-list-box"></div>
                <div className="data-field"></div>
            </div>
        </StatisticsMainFormStyle>
    );
};

export default memo(StatisticsMainForm);