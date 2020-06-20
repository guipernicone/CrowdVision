
import {sendPost, sendGet} from "Service/HttpRequest"
import CookieService from "Service/CookieService"

/**
 * Rest call to a login user request
 * 
 * @param {String} email 
 * @param {String} password
 *  
 */
export const login = (email, password) =>{
    let body = {
        userEmail: email,
        userPassword: password
    }
    let route = 'login'
    
    return sendPost(body, route)
}

/**
 * Validate if the user is currently logged in on the server
 */
export const validateLogin = () =>{
    let route = 'login/validate'
    let cm = new CookieService();

    let loginParam = {loginSession : cm.get('login').loginID};

    return sendGet(loginParam, route)
}

/**
 * Validate if a user has a session
 */
export const validateSession = () =>{
    let cm = new CookieService();
    return cm.isDeclared('login');
}

/**
 * Logout the user
 */
export const logoutUser = () => {
    let cs = new CookieService();
    return cs.remove('login')
}