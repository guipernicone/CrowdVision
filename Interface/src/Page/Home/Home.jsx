import React, { Component } from 'react';
import {LOGIN_STATES} from "Common/Js/LoginStatusEnum"
import { validateLogin } from 'Service/LoginService'
import {Redirect} from "react-router-dom";
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
        return (
            <div>
                {this.state.loggedInStatus === LOGIN_STATES.WAITING ? null 
                    :
                    this.state.loggedInStatus === LOGIN_STATES.LOGGEDIN ? 
                    <div> HOME </div>
                    :
                    <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
                }
            </div>
        );
    }
}

export default Home;