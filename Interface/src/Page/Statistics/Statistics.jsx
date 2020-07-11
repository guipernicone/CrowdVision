import React, { Component } from 'react';
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { Redirect } from "react-router-dom";
import { StatisticsStyle } from 'Page/Statistics/Style/StatisticsStyle';
import StatisticsMainForm from 'Page/Statistics/StatisticsMainForm'
import Navbar from 'Page/Navbar/Navbar';
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: LOGIN_STATES.WAITING,
            content : [],
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
        this.setState({content: [0, 2]})
    }

    render() {
        return (
            <div className="cv-background">
                <Navbar/>
                <div className="cv-body">
                    {this.state.loggedInStatus === LOGIN_STATES.WAITING ? null 
                        :
                        this.state.loggedInStatus === LOGIN_STATES.LOGGEDIN ?
                            this.state.content.length > 0 ? "content" : <StatisticsMainForm formHandler={this.statisticsFormHandler}/>
                        :
                        <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
                    }
                </div>  
            </div>
        );
    }
}

export default Statistics;