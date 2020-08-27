import React, { Component } from 'react';
import {LOGIN_STATES} from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import {Redirect} from "react-router-dom";
import Navbar from "Page/Navbar/Navbar";
import {HomeStyle} from "Page/Home/HomeStyle";
import 'Common/css/CrowdVision.css'

class Home extends Component {
    
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
        console.log(this.state.loggedInStatus)
        return (
            <div className="cv-background">
                 <Navbar/>
                {this.state.loggedInStatus === LOGIN_STATES.WAITING ? null 
                    :
                    this.state.loggedInStatus === LOGIN_STATES.LOGGEDIN ? 
                    
                    <HomeStyle>
                        HOME
                    </HomeStyle>

                    :
                    <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
                }
            </div>
        );
    }
}

export default Home;