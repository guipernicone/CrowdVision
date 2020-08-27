import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {validateSession } from 'Service/LoginService'

/**
 * A logged in user route
 */
const PrivateRoute = ({ component: Component,  ...rest}) => {
    return (
        <Route { ...rest} render={ props=>(
            validateSession() ?
                <Component { ...props}/>
                :
                <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    );
};

export default PrivateRoute;