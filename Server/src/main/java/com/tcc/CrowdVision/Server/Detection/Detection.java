package com.tcc.CrowdVision.Server.Detection;

public class Detection {
	
	public String frame;
	public Float detectionScore;
	public String latitude;
	public String longitude;
	public String time;
	
	public Detection(String frame, Float detectionScore, String latitude, String longitude, String time) {
		this.frame = frame;
		this.detectionScore = detectionScore;
		this.latitude = latitude;
		this.longitude = longitude;
		this.time = time;
	}
	
	public String getFrame() {
		return frame;
	}
	
	public Float getDetectionScore() {
		return detectionScore;
	}
	
	public String getLatitude() {
		return latitude;
	}
	
	public String getLongitude() {
		return longitude;
	}
	
	public String getTime() {
		return time;
	}
	
	
}
