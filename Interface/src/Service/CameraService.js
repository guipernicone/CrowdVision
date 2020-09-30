import {sendPost, sendGet} from "Service/HttpRequest"

/**
 * Get all available cameras from a given org
 * 
 * @param {String} id The organization id frame id
 */
export const getAvailableCameras = (id) => {
    console.log(id);
    let body = {
        orgId: id,
    }
    let route = 'camera/available-cameras'
    
    return sendGet(body, route)
}