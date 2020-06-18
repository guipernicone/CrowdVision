import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "Page/Login/Login"
import Home from "Page/Home/Home"
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from 'Page/Routes/PrivateRoute'

class App extends Component {
    render() {
        
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/" exact component={Home}/>
                </Switch>
            </Router>
        );
    }
}

export default App;