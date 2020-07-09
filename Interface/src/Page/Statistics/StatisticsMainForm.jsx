import React, {memo, useState, useEffect} from 'react';
import { StatisticsMainFormStyle } from 'Page/Statistics/Style/StatisticsMainFormStyle'
import { getUserCameras } from 'Service/UserService';
import Divisor from 'Components/Divisor/Divisor'
import BoxSelect from 'Components/BoxSelect/BoxSelect';
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
        console.log("selecHandler");
        let selectCameras = JSON.parse(JSON.stringify(camerasSelected));

        if (!selectCameras.some(object => object.id === camera.id)){
            selectCameras.push(camera);
        }
        console.log(selectCameras);
        setCamerasSelected(selectCameras);
    }

    const selectAll = () => {
        console.log("all");
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
        console.log("delete");
        let selectCameras = JSON.parse(JSON.stringify(camerasSelected));
        let result = selectCameras.filter(cameraId => cameraId.id !== id);
        
        console.log(result);
        setCamerasSelected(result);
    }

    return (
        <StatisticsMainFormStyle>
            <div className="title">Estatísticas</div>
            <div className="statistics-form-body">
                <BoxSelect 
                    content={camerasContent} 
                    selectContent={camerasSelected}
                    onSelectItem={(camera) => selectHandler(camera)}
                    onSelectAll={selectAll}
                    onDeleteItem={(id) => deleteSelect(id)}
                />
                <div className="data-field"></div>
                <div className="buttom-field"></div>
            </div>
        </StatisticsMainFormStyle>
    );
};

export default memo(StatisticsMainForm);