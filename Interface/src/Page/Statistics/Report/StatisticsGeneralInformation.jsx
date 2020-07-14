import React, {memo} from 'react';
import { StatisticsGeneralInformationStyle} from 'Page/Statistics/Report/Style/StatisticsGeneralInformationStyle'
import TitleDivisor from 'Components/TitleDivisor/TitleDivisor'
import { PieChart } from 'react-minimal-pie-chart';
import InformationNumberCard from 'Components/InformationNumberCard/InformationNumberCard'
import ClusterMap from 'Components/GoogleMapsApi/ClusterMap'
import AreaMap from 'Components/GoogleMapsApi/AreaMap'

const StatisticsGeneralInformation = ({content}) => {

    const buildInfoCards = () => {
        console.log(content)
        return [
            <InformationNumberCard number={content["totalStatusStatistics"]["numberOfCameras"]} label={"Total de Câmeras"}/>,
            <InformationNumberCard number={content["totalStatusStatistics"]["numberOfDetections"]} label={"Total de Detecções"}/>,
            <InformationNumberCard number={`${content["totalStatusStatistics"]["averageAccuracy"].toFixed(3) * 100}%`} label={"Acurácia Média"}/>,
            <InformationNumberCard number={content["totalStatusStatistics"]["averageTimeOfDetection"]} label={"Tempo Médio de Detecção"}/>
        ]
    }

    const dataMock = [
        { title: 'Detecções Corretas', value: content["totalStatusStatistics"]["positiveDetectionPercentage"], color: '#00ff00' },
        { title: 'Detecções Incorretas', value: (100 - content["totalStatusStatistics"]["positiveDetectionPercentage"]), color: '#ff0000' },
    ]

    const getCamerasCoordinates = () => {
        let coordinates = content["totalStatusStatistics"]["numberOfDetectionByCamera"].map(camera => {
            console.log(camera)
            return {
                lat: parseFloat(camera.latitude),
                lng: parseFloat(camera.longitude)
            }
        })
        // console.log(coordinates);
        return coordinates
    }
    return (
        <StatisticsGeneralInformationStyle>
           <TitleDivisor title="Informações Gerais" width="83%"/>
            <div className="content">
                <div style={{position:"relative"}}>
                    <div className="pieChart">
                        <div style={{marginBottom: "15px"}}>Corretas X Incorretas</div>
                        <PieChart
                            data={dataMock}
                            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                            labelStyle={(index) => ({
                                fill: dataMock[index].color,
                                fontSize: '12px',
                                fontFamily: 'sans-serif',
                            })}
                            lineWidth={25}
                            animate
                        />
                    </div>
                </div>
                <div className="statistics">
                    <div className="card-information">
                        {buildInfoCards()}
                    </div>
                </div>
                <div className="clusterMap">
                    {/* <ClusterMap
                        zoom={10}
                        coordinates={getCamerasCoordinates()}
                    /> */}
                </div>
                <div className="areaMap">
                    {/* <AreaMap
                        zoom={16}
                        coordinates={getCamerasCoordinates()}
                        centerCoordinate={
                            {
                                lat:content["totalStatusStatistics"]["averageLocationCenter"]["latitude"],
                                lng:content["totalStatusStatistics"]["averageLocationCenter"]["longitude"],
                            }
                        }
                        radius= {content["totalStatusStatistics"]["averageLocationCenter"]["radius"]}
                    /> */}
                </div>
            </div>
            
        </StatisticsGeneralInformationStyle>
    );
};

export default memo(StatisticsGeneralInformation);