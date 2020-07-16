import {sendPost, sendGet} from "Service/HttpRequest"
import CookieService from "Service/CookieService"

/**
 * Send a request to get all user cameras
 * 
 * @param {String} id The usr id
 */
export const getUserCameras = () => {

    let cm = new CookieService();
    let params = {
        userId:  cm.get('login').user.id,
    }
    let route = 'user/cameras'
    
    return sendGet(params, route)
}