package com.tcc.CrowdVision.Server.Detection;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Detection")
public class Detection {
	
	@Id
	private String id;
	private String frame;
	private Float detectionScore;
	private String time;
	private String cameraId;
	
	public String getFrame() {
		return frame;
	}
	
	public Float getDetectionScore() {
		return detectionScore;
	}
	
	public String getTime() {
		return time;
	}

	public String getCameraId() {
		return cameraId;
	}

	@Override
	public String toString() {
		return "Detection [id=" + id + ", frame=" + frame + ", detectionScore=" + detectionScore + ", time=" + time
				+ ", camera=" + cameraId + "]";
	}

	
	
}
