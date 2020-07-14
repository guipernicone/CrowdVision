import React, { Component } from 'react';
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { getStatisticsData } from 'Service/DetectionService'
import { Redirect } from "react-router-dom";
import { StatisticsStyle } from 'Page/Statistics/Style/StatisticsStyle';
import StatisticsReport from 'Page/Statistics/Report/StatisticsReport'
import StatisticsMainForm from 'Page/Statistics/Form/StatisticsMainForm'
import Navbar from 'Page/Navbar/Navbar';
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: LOGIN_STATES.WAITING,
            content : {
                "falseDetectonsStatistics": {
                    "numberOfDetectionByCamera": [
                        {
                            "latitude": "-22.836406",
                            "name": "camera01",
                            "id": "5f02d053866f03440acfbaaa",
                            "numberOfDetetions": 1,
                            "longitude": "-47.052661"
                        },
                        {
                            "latitude": "-22.834419",
                            "name": "camera02",
                            "id": "5f0bd8341b6af92c10a81626",
                            "numberOfDetetions": 10,
                            "longitude": "-47.052945"
                        }
                    ],
                    "numberOfCameras": 2,
                    "numberOfDetections": 11,
                    "averageLocationCenter": {
                        "latitude": -22.8354125,
                        "radius": 114.24168792480587,
                        "longitude": -47.052803000000004
                    },
                    "averageTimeOfDetection": "00:00:15",
                    "averageAccuracy": 0.8903485
                },
                "totalStatusStatistics": {
                    "numberOfDetectionByCamera": [
                        {
                            "latitude": "-22.836406",
                            "name": "camera01",
                            "id": "5f02d053866f03440acfbaaa",
                            "numberOfDetetions": 36,
                            "longitude": "-47.052661"
                        },
                        {
                            "latitude": "-22.834419",
                            "name": "camera02",
                            "id": "5f0bd8341b6af92c10a81626",
                            "numberOfDetetions": 20,
                            "longitude": "-47.052945"
                        }
                    ],
                    "numberOfCameras": 2,
                    "numberOfDetections": 56,
                    "positiveDetectionPercentage": 80.35714,
                    "averageLocationCenter": {
                        "latitude": -22.8354125,
                        "radius": 114.24168792480587,
                        "longitude": -47.052803000000004
                    },
                    "averageTimeOfDetection": "00:00:26",
                    "averageAccuracy": 0.904006
                },
                "positiveDetectonsStatistics": {
                    "numberOfDetectionByCamera": [
                        {
                            "latitude": "-22.836406",
                            "name": "camera01",
                            "id": "5f02d053866f03440acfbaaa",
                            "numberOfDetetions": 35,
                            "longitude": "-47.052661"
                        },
                        {
                            "latitude": "-22.834419",
                            "name": "camera02",
                            "id": "5f0bd8341b6af92c10a81626",
                            "numberOfDetetions": 10,
                            "longitude": "-47.052945"
                        }
                    ],
                    "numberOfCameras": 2,
                    "numberOfDetections": 45,
                    "averageLocationCenter": {
                        "latitude": -22.8354125,
                        "radius": 114.24168792480587,
                        "longitude": -47.052803000000004
                    },
                    "averageTimeOfDetection": "00:00:28",
                    "averageAccuracy": 0.90734476
                }
            }
        }
    }

    componentDidMount(){
        this.callValidateLogin();
    }

    callValidateLogin(){
        validateLogin()
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return this.setState({loggedInStatus : LOGIN_STATES.LOGGEDIN})
            }
            this.setState({loggedInStatus : LOGIN_STATES.NOTLOGGEDIN})
        })
        .catch((error) => {
            console.log(error);
            this.setState({loggedInStatus : LOGIN_STATES.NOTLOGGEDIN})
        })
    }

    statisticsFormHandler = (formResponse) => {
        console.log(formResponse);
        
        getStatisticsData(formResponse.cameraIds, formResponse.startDate, formResponse.endDate)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
               this.setState({content: response.data})
            }
            else {
                this.setState({content: "Não foram encontrados frames detectados para as cameras selecionadas"})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="cv-background">
                <Navbar/>
                <div className="cv-body">
                    {this.state.loggedInStatus === LOGIN_STATES.WAITING ? null 
                        :
                        this.state.loggedInStatus === LOGIN_STATES.LOGGEDIN ?
                            // <StatisticsStyle>
                            //     {this.state.content != null ? <StatisticsReport statistics={this.state.content}/> : <StatisticsMainForm formHandler={this.statisticsFormHandler}/>}
                            // </StatisticsStyle>
                            this.state.content != null ? <StatisticsReport statistics={this.state.content}/> : <StatisticsMainForm formHandler={this.statisticsFormHandler}/>
                        :
                        <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
                    }
                </div>  
            </div>
        );
    }
}

export default Statistics;