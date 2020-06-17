import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "Page/Login/Login"
import Home from "Page/Home/Home"
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" exact component={Home}></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;