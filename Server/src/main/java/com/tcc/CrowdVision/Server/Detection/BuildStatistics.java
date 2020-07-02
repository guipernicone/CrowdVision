package com.tcc.CrowdVision.Server.Detection;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

public class BuildStatistics {

	private JSONObject resultJSON;
	private ArrayList<DetectionHistory> detectionHistory;
	
	public BuildStatistics(ArrayList<DetectionHistory> detectionHistory) {
		this.resultJSON = new JSONObject();
		this.detectionHistory = detectionHistory;
	}
	
	public void buildTotalStatusStatistics() 
	{
		Gson gson = new Gson();
		Float averageAccuracy = this.getAverageAccuracy(detectionHistory);

		resultJSON.put("averageAccuracy", averageAccuracy);
		resultJSON.put("numberOfDetections", detectionHistory.size());
		resultJSON.put("detections", new JSONArray(gson.toJson(detectionHistory)));
	}
	
	public String getResult() 
	{
		return resultJSON.toString();
	}
	private Float getAverageAccuracy(ArrayList<DetectionHistory>  detections)
	{
		Float averageAccuracy = 0f;
		
		for (DetectionHistory detection : detections)
		{
			averageAccuracy += detection.getDetectionScore();
		}
		
		return (averageAccuracy / detections.size());
	}
}
