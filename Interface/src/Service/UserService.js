import {sendPost, sendGet} from "Service/HttpRequest"
import CookieService from "Service/CookieService"

/**
 * Send a request to get all user cameras
 * 
 * @param {String} id The user id
 */
export const getUserCameras = () => {

    let cm = new CookieService();
    let params = {
        userId:  cm.get('login').user.id,
    }
    let route = 'user/cameras'
    
    return sendGet(params, route)
}

/**
 * Send a request to get all user organizations
 * 
 * @param {String} id The user id
 */
export const getUserOrganizations = () => {

    let cm = new CookieService();
    let params = {
        userId:  cm.get('login').user.id,
    }
    let route = 'user/organizations'
    
    return sendGet(params, route)
}

/**
 * Send a request to register a user
 * 
 * Expect the following json:
 * 
 * @param {String} id The user id
 * @param {String} name The user name
 * @param {String} surname The user surname
 * @param {String} email The user email
 * @param {String} password The user password
 * @param {Int} permission The user permission
 * @param {Array} organizationIds The user permission
 * @param {String} requestUserId The request user id
 * 
 */
export const saveUser = (userJson) => {
    return sendPost(userJson, 'user/save')
}

/**
 * Send a request to get user information
 * 
 * @param {String} id The user id
 */
export const getUserInformation = () => {

    let cm = new CookieService();
    let params = {
        userID:  cm.get('login').user.id,
    }
    let route = 'user/information'
    
    return sendGet(params, route)
}

/**
 * Send a request to get all user organizations
 * 
 * @param {String} id The user id
 */
export const getUserOrganizationsList = () => {

    let cm = new CookieService();
    let params = {
        userId:  cm.get('login').user.id,
    }
    let route = 'user/organizations-list'
    
    return sendGet(params, route)
}