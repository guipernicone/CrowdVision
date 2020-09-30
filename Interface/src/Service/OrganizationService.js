import {sendPost, sendGet} from "Service/HttpRequest"
import CookieService from "Service/CookieService"

/**
 * Send a request to get all user cameras
 * 
 * @param {String} org The Organization id
 * 
 * @param {String} camera The Camera id to update
 * 
 * @param {String} deleteBool Indicate if is to delete or not
 */
export const updateOrganizationCameraList = (org, camera, deleteBool) => {

    let params = {
        orgId:  org,
        cameraId: camera,
        delete: deleteBool
    }
    let route = 'organization/update-camera-list'
    
    return sendPost(params, route)
}