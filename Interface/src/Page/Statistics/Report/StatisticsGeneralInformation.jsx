import React, {memo} from 'react';
import { StatisticsGeneralInformationStyle} from 'Page/Statistics/Report/Style/StatisticsGeneralInformationStyle'
import TitleDivisor from 'Components/TitleDivisor/TitleDivisor'
import { PieChart } from 'react-minimal-pie-chart';
import InformationNumberCard from 'Components/InformationNumberCard/InformationNumberCard'
import AreaMap from 'Components/GoogleMapsApi/AreaMap'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
  
  

const StatisticsGeneralInformation = ({content, title, pieChart=true}) => {

    const buildInfoCards = () => {
        return [
            <InformationNumberCard key="info_1" number={content["numberOfCameras"]} label={"Total de Câmeras"}/>,
            <InformationNumberCard key="info_2" number={content["numberOfDetections"]} label={"Total de Detecções"}/>,
            <InformationNumberCard key="info_3" number={`${(content["averageAccuracy"] * 100).toFixed(3)}%`} label={"Confiança de detecção Média"}/>,
            <InformationNumberCard key="info_4" number={content["averageTimeOfDetection"]} label={"Tempo Médio de Detecção"}/>
        ]
    }

    const dataMock = [
        { title: 'Detecções Corretas', value: content["positiveDetectionPercentage"], color: '#00ff00'},
        { title: 'Detecções Incorretas', value: (100 - content["positiveDetectionPercentage"]), color: '#ff0000' },
    ]

    const getCamerasCoordinates = () => {
        let coordinates = content["numberOfDetectionByCamera"].map(camera => {
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

    const buildChartPieLegend = () => {
        return dataMock.map((data, index) => {
            return (
                <div key={"chart_legend_" + index} className="subtitle-item">
                    <div className="subtitle-circle" style={{backgroundColor: data.color}}/>
                    <div>{data.title}: {`${data.value.toFixed(2)} %`}</div>
                </div>
            )
        })
    }

    return (
        <StatisticsGeneralInformationStyle>
            <TitleDivisor title={title} width="83%"/>
            {pieChart ? 
                <div style={{position:"relative"}}>
                    <div className="pieChart">
                        <div style={{marginBottom: "15px"}}>Detecções</div>
                        <div style={{marginBottom: "15px"}}>Corretas X Incorretas</div>
                        <PieChart
                            data={dataMock}
                            // label={({ dataEntry }) => `${dataEntry.percentage.toFixed(2)} %`}
                            labelStyle={(index) => ({
                                fill: dataMock[index].color,
                                fontSize: '12px',
                                fontFamily: 'sans-serif',
                            })}
                            lineWidth={10}
                            labelPosition={50}
                            animate
                        />
                    </div>
                    <div className="subtitle">
                        {buildChartPieLegend()}
                    </div>
                </div>
                :null
            }
            <div className="statistics">
                <div className="card-information">
                    {buildInfoCards()}
                </div>
            </div>
            <div className="sub-title">Detecções por Data</div>
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
            <div className="area">
                <div className="area-map">
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
                <div className="subtitle">
                    <div className="subtitle-item">
                        <div className="subtitle-circle" style={{backgroundColor:"#ccccff"}}/>
                        <div>Área englobando todas as câmeras analisadas</div>
                    </div>
                    <div className="subtitle-item">
                        <img src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png"/>
                        <div>Detecções por câmera analisada </div>
                    </div>
                </div>
            </div>
            
        </StatisticsGeneralInformationStyle>
    );
};

export default memo(StatisticsGeneralInformation);