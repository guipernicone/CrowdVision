import React, { Component } from 'react';
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { Redirect } from "react-router-dom";
import { StatisticsStyle } from 'Page/Statistics/StatisticsStyle';
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

    render() {
        return (
            <div className="cv-background">
                <Navbar/>
                <div className="cv-body">
                    {this.state.loggedInStatus === LOGIN_STATES.WAITING ? null 
                        :
                        this.state.loggedInStatus === LOGIN_STATES.LOGGEDIN ?
                        'STATISTICS'
                        :
                        <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
                    }
                </div>  
            </div>
        );
    }
}

export default Statistics;