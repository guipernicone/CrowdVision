import React, {memo, useState, useEffect} from 'react';
import { StatisticsMainFormStyle } from 'Page/Statistics/Style/StatisticsMainFormStyle'
import { getUserCameras } from 'Service/UserService';
import BoxSelect from 'Components/BoxSelect/BoxSelect';
import "react-datepicker/dist/react-datepicker.css";
import StatisticsDateInput from 'Page/Statistics/StatisticsDateInput'
import { Button } from 'react-bootstrap';
import TitleDivisor from 'Components/TitleDivisor/TitleDivisor'

const StatisticsMainForm = () => {
    const [camerasContent, setCamerasContent] = useState([]);
    const [camerasSelected, setCamerasSelected] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [startTime, setStartTime] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [endTime, setEndTime] = useState([]);

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

    const dateHandler = (date, period) => {
       if (period === "start") {
            setStartDate(date);
       }
       else if (period === "end") {
            setEndDate(date);
       }
    }

    const timeHandler = (time, period) => {
        console.log(time);
        if (period === "start") {
            setStartTime(time);
        }
        else if (period === "end") {
            setEndTime(time);
        }
     }

     const submitResponse = () => {
         
     }

    return (
        <StatisticsMainFormStyle>
            <div className="title">Estatísticas</div>
            <div className="statistics-form-body">
                <div style={{ paddingLeft:"40px", paddingBottom:"20px"}}>
                    <TitleDivisor title="Cameras Disponiveis" width="83%"/>
                </div>
                <BoxSelect 
                    content={camerasContent} 
                    selectContent={camerasSelected}
                    onSelectItem={(camera) => selectHandler(camera)}
                    onSelectAll={selectAll}
                    onDeleteItem={(id) => deleteSelect(id)}
                    title={"Cameras"}
                />
                <StatisticsDateInput date={[startDate, endDate]} onDateChange={(date,period) => dateHandler(date, period)} time={[startTime, endTime]} onTimeChange={(time,period) => timeHandler(time, period)}/>
                <div className="buttom-field">
                    <Button className="buttonSearch" onClick={submitResponse}>Buscar</Button>
                </div>
            </div>
        </StatisticsMainFormStyle>
    );
};

export default memo(StatisticsMainForm);