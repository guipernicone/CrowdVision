import React, { Component } from 'react';
import Navbar from "Page/Navbar/Navbar";
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { Redirect } from "react-router-dom";
import {DetectionsStyle} from 'Page/Detections/Style/DetectionsStyle';

class Detections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: LOGIN_STATES.WAITING,
        }
    }
    componentDidMount(){
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
                {this.state.loggedInStatus === LOGIN_STATES.WAITING ? null 
                    :
                    this.state.loggedInStatus === LOGIN_STATES.LOGGEDIN ?
                    <DetectionsStyle>
                        <h1 className="title">Detecções Recentes</h1>
                        <div className="cards">CARDS</div>
                        
                    </DetectionsStyle>
                    :
                    <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
                }
            </div>
        );
    }
}

export default Detections;