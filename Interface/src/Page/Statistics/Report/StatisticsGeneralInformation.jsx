import React, {memo} from 'react';
import { StatisticsGeneralInformationStyle} from 'Page/Statistics/Report/Style/StatisticsGeneralInformationStyle'
import TitleDivisor from 'Components/TitleDivisor/TitleDivisor'
import { PieChart } from 'react-minimal-pie-chart';
import InformationNumberCard from 'Components/InformationNumberCard/InformationNumberCard'
import AreaMap from 'Components/GoogleMapsApi/AreaMap'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, Cell} from 'recharts';
  
  

const StatisticsGeneralInformation = ({content, title, pieChart=true}) => {

    const buildInfoCards = () => {
        return [
            <InformationNumberCard key="info_1" number={content["numberOfCameras"]} label={"Total de Câmeras"}/>,
            <InformationNumberCard key="info_2" number={content["numberOfDetections"]} label={"Total de Detecções"}/>,
            <InformationNumberCard key="info_3" number={`${(content["averageAccuracy"] * 100).toFixed(3)}%`} label={"Acurácia Média"}/>,
            <InformationNumberCard key="info_4" number={content["averageTimeOfDetection"]} label={"Tempo Médio de Detecção"}/>
        ]
    }

    const dataMock = [
        { title: 'Detecções Corretas', value: content["positiveDetectionPercentage"], color: '#00ff00'},
        { title: 'Detecções Incorretas', value: (100 - content["positiveDetectionPercentage"]), color: '#ff0000' },
    ]

    const getCamerasCoordinates = () => {
        let coordinates = content["numberOfDetectionByCamera"].map(camera => {
            console.log(camera)
            return {
                lat: parseFloat(camera.latitude),
                lng: parseFloat(camera.longitude),
                number: camera.numberOfDetetions,
                title: camera.name,
                urlIcon: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png"
            }
        })
        return coordinates
    }

    const buildBarData = () => {
        let barData = content["detectionsByDate"].map(detections => {
            return {
                date: detections.date,
                count: detections.count
            }
        });
        return barData;
    }

    return (
        <StatisticsGeneralInformationStyle>
           <TitleDivisor title={title} width="83%"/>
            <div className="content">
                {pieChart ? 
                    <div style={{position:"relative"}}>
                        <div className="pieChart">
                            <div style={{marginBottom: "15px"}}>Corretas X Incorretas</div>
                            <PieChart
                                data={dataMock}
                                label={({ dataEntry }) => `${dataEntry.percentage.toFixed(2)} %`}
                                labelStyle={(index) => ({
                                    fill: dataMock[index].color,
                                    fontSize: '12px',
                                    fontFamily: 'sans-serif',
                                })}
                                lineWidth={10}
                                labelPosition={100 - 30/ 2}
                                animate
                            />
                        </div>
                    </div>
                    :null
                }
                <div className="statistics">
                    <div className="card-information">
                        {buildInfoCards()}
                    </div>
                </div>
                <div className="barChart">
                    <BarChart width={800} height={500} data={buildBarData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" name="Número de detecções"/>
                    </BarChart>
                </div>
                <div className="areaMap">
                    {/* <AreaMap
                        zoom={16}
                        coordinates={getCamerasCoordinates()}
                        centerCoordinate={
                            {
                                lat:content["averageLocationCenter"]["latitude"],
                                lng:content["averageLocationCenter"]["longitude"],
                            }
                        }
                        radius= {content["averageLocationCenter"]["radius"]}
                    /> */}
                </div>
            </div>
            
        </StatisticsGeneralInformationStyle>
    );
};

export default memo(StatisticsGeneralInformation);