import React, { Component } from 'react';
import Navbar from "Page/Navbar/Navbar";
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { Redirect } from "react-router-dom";
import {DetectionsStyle} from 'Page/Detections/Style/DetectionsStyle';
import CookieService from 'Service/CookieService'
import {serverIP, serverPort} from 'Config/Config'
import  DetectionView from 'Page/Detections/DetectionView'
class Detections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: LOGIN_STATES.WAITING,
            content : [],
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
        
        let cs = new CookieService();
        let login = cs.get('login');

        const ws = new WebSocket(`ws://${serverIP}:${serverPort}/websocket/detections/${login.user.id}`);

        ws.onopen = () => {
            console.log("connection stablished")
        }

        ws.onmessage = evt => {
            let contentJSON = JSON.parse(evt.data);
            this.setState({content: contentJSON});
        }
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
                        <div className="cards">
                            <DetectionView content={this.state.content}/>    
                        </div>
                        
                    </DetectionsStyle>
                    :
                    <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
                }
            </div>
        );
    }
}

export default Detections;