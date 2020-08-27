import axios from 'axios';
import  { serverIP, serverPort } from 'Config/Config'

/**
 * Send a http post request
 * 
 * @param {String} body 
 * @param {String} route 
 */
export const sendPost = (body, route) => {
    let config = {
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        validateStatus: () => true
    }
    return axios.post(`http://${serverIP}:${serverPort}/${route}`, body, config)
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
}

/**
 * Send a http get request
 * 
 * @param {Object} params 
 * @param {String} route 
 */
export const sendGet = (params, route) => {
    let config = {
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        validateStatus: () => true
    }
    let convertedParams = convertObjectToRouteParams(params);
    return axios.get(`http://${serverIP}:${serverPort}/${route}?${convertedParams}`, config)
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
}


/**
 * Convert a JSON Object to a route params
 * 
 * Ex: {"key" : "value"} => key=value
 * 
 * @param {Object} object 
 */
function convertObjectToRouteParams(object) {
    let paramConverted = '';

    let length = Object.keys(object).length;

    let i = 0;
    for (let key in object) {

        paramConverted += key + '=' + object[key];
        i++;
        if (length !== i) {
            paramConverted += '&';
        } 
    }
    return paramConverted;
}