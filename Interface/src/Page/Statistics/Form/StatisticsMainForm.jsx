import React, {memo, useState, useEffect} from 'react';
import { StatisticsMainFormStyle } from 'Page/Statistics/Form/Style/StatisticsMainFormStyle'
import { getUserCameras } from 'Service/UserService';
import BoxSelect from 'Components/BoxSelect/BoxSelect';
import "react-datepicker/dist/react-datepicker.css";
import StatisticsDateInput from 'Page/Statistics/Form/StatisticsDateInput'
import { Button, Alert } from 'react-bootstrap';
import TitleDivisor from 'Components/TitleDivisor/TitleDivisor'

/**
 * An form for the statistics report, list all camereras available 
 * for the user.
 * 
 * @param {func} formHandler 
 */
const StatisticsMainForm = ({formHandler}) => {
    const [camerasContent, setCamerasContent] = useState([]);
    const [camerasSelected, setCamerasSelected] = useState([]);
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState("00:00:00");
    const [endDate, setEndDate] = useState();
    const [endTime, setEndTime] = useState("00:00:00");
    const [dateMsg, setDateMsg] = useState("none");
    const [timeMsg, setTimeMsg] = useState("none");
    const [cameraMsg, setCameraMsg] = useState("none");

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
        console.log("all");
        let cameras = JSON.parse(JSON.stringify(camerasContent));
        let selectCameras = JSON.parse(JSON.stringify(camerasSelected));

        cameras.forEach(cameraObject => {
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
         console.log(startDate)
         console.log(endDate)
         console.log(startTime)
         console.log(endTime)
         if (camerasSelected.length > 0) 
         {
            setCameraMsg("none");
            let cameraIds = camerasSelected.map(camera => {
                return camera.id;
            })
            if(startDate || endDate) {

                if (startDate && endDate)
                {
                    setTimeMsg("none");
                    let startDateResponse = new Date(startDate);
                    startDateResponse.setDate(startDateResponse.getDate() + 1);
                    startDateResponse = new Intl.DateTimeFormat('pt').format(startDateResponse) + " " + startTime;
                    
                    let endDateResponse = new Date(endDate);
                    endDateResponse.setDate(endDateResponse.getDate() + 1);
                    endDateResponse = new Intl.DateTimeFormat('pt').format(endDateResponse) + " " + endTime;
                    if (startDate == endDate) {
                        if (startTime < endTime){
                            setTimeMsg("none");
                            formHandler({
                                "cameraIds" : cameraIds,
                                "startDate": startDateResponse,
                                "endDate" : endDateResponse
                            })
                        }
                    }
                    else if (startDate < endDate)
                    {
                        setTimeMsg("none");
                        formHandler({
                            "cameraIds" : cameraIds,
                            "startDate": startDateResponse,
                            "endDate" : endDateResponse
                        })
                    }
                    else{
                        setTimeMsg("")
                    }                    
                }
                else{
                    setDateMsg("");
                }
            }
            else{
                formHandler({
                    "cameraIds" : cameraIds,
                    "startDate": null,
                    "endDate" : null
                })
            }
         }
         else{
             setCameraMsg("");
         }
        
     }

    return (
        <StatisticsMainFormStyle>
            <div className="title">Estatísticas</div>
            <Alert variant={'danger'} className="alertForm" style={{display:cameraMsg}}>Selecionar ao menos uma camera</Alert>
            <Alert variant={'danger'} className="alertForm" style={{display:dateMsg}}>Inserir data inicial e final</Alert>
            <Alert variant={'danger'} className="alertForm" style={{display:timeMsg}}>Data inicial deve ser menor do que a final</Alert>
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
                    <Button className="buttonSearch" onClick={submitResponse}>Gerar Relatorio</Button>
                </div>
            </div>
        </StatisticsMainFormStyle>
    );
};

export default memo(StatisticsMainForm);