import {sendPost, sendGet} from "Service/HttpRequest"

/**
 * Send a request to update de detection frame status
 * 
 * @param {String} id The detection frame id
 * @param {String} historyId The detection history frame id
 * @param {Boolean} status The detection status
 */
export const sendStatus = (id, historyId, status) => {
    let body = {
        detectionId: id,
        detectionHistoryId: historyId,
        detectionStatus: status
    }
    let route = 'detection/update-status'
    
    return sendPost(body, route)
}