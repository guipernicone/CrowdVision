import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "Page/Login/Login"
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        
        return (
            <Router>
                <Switch>
                    {/* <Route path="/" exact component={Home}></Route> */}
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;