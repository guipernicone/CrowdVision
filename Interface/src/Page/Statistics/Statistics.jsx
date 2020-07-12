import React, { Component } from 'react';
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { getStatisticsData } from 'Service/DetectionService'
import { Redirect } from "react-router-dom";
import { StatisticsStyle } from 'Page/Statistics/Style/StatisticsStyle';
import StatisticsReport from 'Page/Statistics/StatisticsReport'
import StatisticsMainForm from 'Page/Statistics/StatisticsMainForm'
import Navbar from 'Page/Navbar/Navbar';
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: LOGIN_STATES.WAITING,
            content : null,
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