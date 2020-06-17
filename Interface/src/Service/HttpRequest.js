import axios from 'axios';
import  { serverIP, serverPort } from 'Config/Config'

const sendPost = (body, route) => {
    let config = {
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        validateStatus: () => true
    }
    return axios.post(`http://${serverIP}:${serverPort}/${route}`, body, config)
    .then((response) => {
        console.log(response);
        return response.status;
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
}

export const login = (email, password) =>{
    let body = {
        userEmail: email,
        userPassword: password
    }
    let route = 'login'
    
    return sendPost(body, route)
}