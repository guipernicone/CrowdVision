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

/**
 * Send a request to get statistics data
 * 
 * @param {Array} ids An array of cameras ids
 * @param {String} startPeriodDate The start period date
 * @param {String} endPeriodDate The end period date
 */
export const getStatisticsData = (id, startPeriodDate, endPeriodDate) => {
    let body = {
        cameraIds: id,
        startDate: startPeriodDate,
        endDate: endPeriodDate
    }
    let route = 'detection/statistics'
    
    return sendPost(body, route)
}

/**
 * Send a request to get all historic detections data
 * 
 * @param {String} id User id to get all detections relationate
 * @param {String} cameraId Filter by cameraId
 */
export const getHistoryDetections = (id, cameraId = null) => {
    let body = {
        userId: id,
        cameraId: cameraId
    }
    let route = 'detection/history'
    
    return sendGet(body, route)
}