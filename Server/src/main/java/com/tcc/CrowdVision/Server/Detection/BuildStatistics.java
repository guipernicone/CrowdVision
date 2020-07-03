package com.tcc.CrowdVision.Server.Detection;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.tcc.CrowdVision.Repository.CameraRepository;
import com.tcc.CrowdVision.Server.Camera.Camera;
import com.tcc.CrowdVision.Server.Coordinate.CoordinateCalculator;
import com.tcc.CrowdVision.Server.Coordinate.Points;
import com.tcc.CrowdVision.Utils.BeanUtils;

public class BuildStatistics {

	private JSONObject resultJSON;
	private ArrayList<DetectionHistory> detectionHistory;
	private CameraRepository cameraRepository;
	
	public BuildStatistics(ArrayList<DetectionHistory> detectionHistory) {
		this.resultJSON = new JSONObject();
		this.detectionHistory = detectionHistory;
		this.cameraRepository = BeanUtils.getBean(CameraRepository.class);
	}
	
	/**
	 * Build the total statistics with both positive or false detections
	 */
	public void buildTotalStatusStatistics() 
	{
		JSONObject totalStatus = new JSONObject();
		Gson gson = new Gson();
		Float averageAccuracy = this.getAverageAccuracy(detectionHistory);
		String averageLocationCenter = this.getCenterCoordenate(detectionHistory);
		
		totalStatus.put("averageAccuracy", averageAccuracy);
		totalStatus.put("numberOfDetections", detectionHistory.size());
		totalStatus.put("averageLocationCenter", new JSONObject(averageLocationCenter));
		totalStatus.put("detections", new JSONArray(gson.toJson(detectionHistory)));
		resultJSON.put("totalStatusStatistics", totalStatus);
	}
	
	/**
	 *  Get the result JSON built
	 *  
	 *  @return JSON
	 */
	public String getResult() 
	{
		return resultJSON.toString();
	}
	
	/**
	 * Calculate the average accuracy of a list of detections
	 * 
	 * @param detections An array of detections for calculate the average accuracy
	 * @return The average accuracy value
	 */
	private Float getAverageAccuracy(ArrayList<DetectionHistory>  detections)
	{
		Float averageAccuracy = 0f;
		
		for (DetectionHistory detection : detections)
		{
			averageAccuracy += detection.getDetectionScore();
		}
		
		return (averageAccuracy / detections.size());
	}
	
	/**
	 * Calculate the center of a list of coordinates
	 * 
	 * @param detections An array of detections for search the cameras coordinates
	 * @return The center point of a list of coordinates
	 */
	private String getCenterCoordenate(ArrayList<DetectionHistory>  detections) {
		
		ArrayList<String> cameraIds = new ArrayList<String>();
		ArrayList<Points> pointsList = new ArrayList<Points>();
		Points center;
		JSONObject coordenateJSON = new JSONObject();
		for (DetectionHistory detection : detections) {
			if (!cameraIds.contains(detection.getCameraId())) {
				cameraIds.add(detection.getCameraId());
			}
		}
		
		Iterable<Camera> iterable = cameraRepository.findAllById(cameraIds);
		
		for (Camera camera : iterable) {
			Points points = new Points(Double.parseDouble(camera.getLatitude()), Double.parseDouble(camera.getLongitude()));
			
			if(!pointsList.contains(points)) {
				pointsList.add(points);
			}
		}
		
		if (pointsList.isEmpty()) {
			return (new JSONObject()).toString();
		}
		
		CoordinateCalculator coordCalc = new CoordinateCalculator(pointsList);
		center = coordCalc.CalculateCenter();
		
		coordenateJSON.put("latitude", center.getX());
		coordenateJSON.put("longitude", center.getY());
		
		return coordenateJSON.toString();
	}
	
}
