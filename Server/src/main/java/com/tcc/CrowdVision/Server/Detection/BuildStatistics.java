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
import com.tcc.CrowdVision.Utils.DateUtils;

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
		JSONObject statistics = this.buildStatisticsJSON(detectionHistory);
		statistics.put("positiveDetectionPercentage", this.getStatusPercentage(true));
		resultJSON.put("totalStatusStatistics", statistics);
	}
	
	/**
	 * Build the total statistics with positive detections
	 */
	public void buildPositiveStatistics() 
	{
		ArrayList<DetectionHistory> detections = this.getDetectionsByStatus(DetectionStatusEnum.POSITIVE_DETECTION.getValue());
		resultJSON.put("positiveDetectonsStatistics", this.buildStatisticsJSON(detections));
	}
	
	/**
	 * Build the total statistics with false detections
	 */
	public void buildFalseStatistics() 
	{
		ArrayList<DetectionHistory> detections = this.getDetectionsByStatus(DetectionStatusEnum.FALSE_DETECTION.getValue());
		resultJSON.put("falseDetectonsStatistics", this.buildStatisticsJSON(detections));
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
	 *  Build the statistics json 
	 *  
	 *  @return JSONObject
	 */
	private JSONObject buildStatisticsJSON(ArrayList<DetectionHistory> detections) 
	{
		JSONObject json = new JSONObject();
		Float averagePositiveAccuracy = this.getAverageAccuracy(detections);
		String averagePositiveLocationCenter = this.getCenterCoordenate(detections);
		String averageTimeOfPositiveDetection = this.getAverageDetectionTime(detections);
		JSONArray numberOfPositiveDetectionByCamera = this.getNumberOfDetectionByCamera(detections);
		
		json.put("numberOfDetectionByCamera", numberOfPositiveDetectionByCamera);
		json.put("averageTimeOfDetection", averageTimeOfPositiveDetection);
		json.put("averageAccuracy", averagePositiveAccuracy);
		json.put("numberOfDetections", detections.size());
		json.put("numberOfCameras", numberOfPositiveDetectionByCamera.length());
		json.put("averageLocationCenter", new JSONObject(averagePositiveLocationCenter));
		return json;
	
	}
	
	/**
	 *  Get the percentage of a status
	 *  
	 *  @return float
	 */
	private float getStatusPercentage(boolean status) 
	{
		ArrayList<DetectionHistory> positiveDetection = this.getDetectionsByStatus(status);
		return this.getPercentage((float) detectionHistory.size(), (float) positiveDetection.size());
	}
	
	/**
	 *  Get the result JSON built
	 *  
	 *  @return JSON
	 */
	private ArrayList<DetectionHistory> getDetectionsByStatus(boolean status) 
	{
		ArrayList<DetectionHistory> detections = new ArrayList<DetectionHistory>();
		for (DetectionHistory detection : detectionHistory) {
			if (detection.getDetectionStatus().equals(status))
			{
				detections.add(detection);
			}
		}
		return detections;
	
	}
	
	/**
	 *  Get the percentage from the given value
	 *  
	 *  @return float
	 */
	private float getPercentage(float totalNumber, float desireNumber) 
	{
		return (100 * desireNumber) / totalNumber;
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
		Double radius;
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
		radius = coordCalc.calculateRadiusFromList(center);
		
		coordenateJSON.put("latitude", center.getX());
		coordenateJSON.put("longitude", center.getY());
		coordenateJSON.put("radius", radius);
		
		return coordenateJSON.toString();
	}
	
	/**
	 * Get the average time for detection of a frame
	 * 
	 * @param detections An array of detections for search the average time of detection
	 * 
	 * @return average time
	 */
	private String getAverageDetectionTime(ArrayList<DetectionHistory>  detections) 
	{
		long totalTime = 0;
		long averageTime = 0;
		
		for (DetectionHistory detection: detections)
		{			
			totalTime += (detection.getDetectionTime().getTime() - detection.getCaptureTime().getTime());
		}
		
		averageTime = totalTime / detections.size();
		
		return DateUtils.convertMilisecondsToFormatString(averageTime);
	}
	
	/**
	 * Get the count of detections by camera
	 * 
	 * @param detections An array of detections for search count of detections by camera
	 * 
	 * @return count by camera
	 */
	private JSONArray getNumberOfDetectionByCamera(ArrayList<DetectionHistory>  detections) 
	{
	
		ArrayList<String> cameraIds = new ArrayList<String>();
		JSONArray camerasArray = new JSONArray();
		
		for (DetectionHistory detection : detections) {
			if (!cameraIds.contains(detection.getCameraId())) {
				cameraIds.add(detection.getCameraId());
			}
		}
		
		Iterable<Camera> iterable = cameraRepository.findAllById(cameraIds);
		
		for (Camera camera : iterable) 
		{
			
			Gson gson = new Gson();
			int count = 0;
			JSONObject cameraObject = new JSONObject(gson.toJson(camera));
			for (DetectionHistory detection : detections)
			{
				if (detection.getCameraId().equals(camera.getId()))
				{
					count++;
				}
			}
			
			cameraObject.put("numberOfDetetions", count);
			camerasArray.put(cameraObject);
		}
		
		return camerasArray;
	}
}
