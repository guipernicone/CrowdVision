package com.tcc.CrowdVision.Server.Detection;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Detection")
public class Detection {
	
	@Id
	public String id;
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

	@Override
	public String toString() {
		return "Detection [id=" + id + ", frame=" + frame + ", detectionScore=" + detectionScore + ", latitude="
				+ latitude + ", longitude=" + longitude + ", time=" + time + "]";
	}
	
	
}
