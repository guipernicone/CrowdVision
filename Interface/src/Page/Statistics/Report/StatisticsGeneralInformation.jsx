import React, {memo} from 'react';
import { StatisticsGeneralInformationStyle} from 'Page/Statistics/Report/Style/StatisticsGeneralInformationStyle'
import TitleDivisor from 'Components/TitleDivisor/TitleDivisor'
import { PieChart } from 'react-minimal-pie-chart';
import InformationNumberCard from 'Components/InformationNumberCard/InformationNumberCard'
const StatisticsGeneralInformation = ({content}) => {

    content = {
        "falseDetectonsStatistics": {
            "numberOfDetectionByCamera": [
                {
                    "latitude": "-23.0884",
                    "name": "camera01",
                    "id": "5f02d053866f03440acfbaaa",
                    "numberOfDetetions": 1,
                    "longitude": "-47.2119"
                },
                {
                    "latitude": "-23.0884",
                    "name": "camera02",
                    "id": "5f0bd8341b6af92c10a81626",
                    "numberOfDetetions": 10,
                    "longitude": "-47.2119"
                }
            ],
            "numberOfCameras": 2,
            "numberOfDetections": 11,
            "averageLocationCenter": {
                "latitude": -23.0884,
                "radius": 0,
                "longitude": -47.2119
            },
            "averageTimeOfDetection": "00:00:15",
            "averageAccuracy": 0.8903485
        },
        "totalStatusStatistics": {
            "numberOfDetectionByCamera": [
                {
                    "latitude": "-23.0884",
                    "name": "camera01",
                    "id": "5f02d053866f03440acfbaaa",
                    "numberOfDetetions": 36,
                    "longitude": "-47.2119"
                },
                {
                    "latitude": "-23.0884",
                    "name": "camera02",
                    "id": "5f0bd8341b6af92c10a81626",
                    "numberOfDetetions": 20,
                    "longitude": "-47.2119"
                }
            ],
            "numberOfCameras": 2,
            "numberOfDetections": 56,
            "positiveDetectionPercentage": 80.35714,
            "averageLocationCenter": {
                "latitude": -23.0884,
                "radius": 0,
                "longitude": -47.2119
            },
            "averageTimeOfDetection": "00:00:26",
            "averageAccuracy": 0.904006
        },
        "positiveDetectonsStatistics": {
            "numberOfDetectionByCamera": [
                {
                    "latitude": "-23.0884",
                    "name": "camera01",
                    "id": "5f02d053866f03440acfbaaa",
                    "numberOfDetetions": 35,
                    "longitude": "-47.2119"
                },
                {
                    "latitude": "-23.0884",
                    "name": "camera02",
                    "id": "5f0bd8341b6af92c10a81626",
                    "numberOfDetetions": 10,
                    "longitude": "-47.2119"
                }
            ],
            "numberOfCameras": 2,
            "numberOfDetections": 45,
            "averageLocationCenter": {
                "latitude": -23.0884,
                "radius": 0,
                "longitude": -47.2119
            },
            "averageTimeOfDetection": "00:00:28",
            "averageAccuracy": 0.90734476
        }
    }

    const dataMock = [
        { title: 'Detecções Corretas', value: content["totalStatusStatistics"]["positiveDetectionPercentage"], color: '#00ff00' },
        { title: 'Detecções Incorretas', value: (100 - content["totalStatusStatistics"]["positiveDetectionPercentage"]), color: '#ff0000' },
    ]

    return (
        <StatisticsGeneralInformationStyle>
           <TitleDivisor title="Informações Gerais" width="83%"/>
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
           <div className="card-information">
               <InformationNumberCard/>
           </div>
           
        </StatisticsGeneralInformationStyle>
    );
};

export default memo(StatisticsGeneralInformation);