import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "Page/Login/Login"
import Home from "Page/Home/Home"
import Detections from "Page/Detections/Detections"
import History from "Page/History/History"
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from 'Page/Routes/PrivateRoute'

class App extends Component {
    render() {
        
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/" exact component={Home}/>
                    <PrivateRoute path="/recent-detections" component={Detections}/>
                    <PrivateRoute path="/history" component={History}/>
                    <PrivateRoute path="/profile" component={Home}/>
                </Switch>
            </Router>
        );
    }
}

export default App;