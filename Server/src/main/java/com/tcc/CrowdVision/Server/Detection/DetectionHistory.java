package com.tcc.CrowdVision.Server.Detection;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DetectionHistory")
public class DetectionHistory {
	@Id
	private String id;
	private String frame;
	private Float detectionScore;
	private String detectionTime;
	private String captureTime;
	private String cameraId;
	private Boolean detectionStatus;
	
	public DetectionHistory(
			String id,
			String frame,
			Float detectionScore,
			String detectionTime,
			String captureTime,
			String cameraId)
	{
		this.id = id;
		this.frame = frame;
		this.detectionScore = detectionScore;
		this.detectionTime = detectionTime;
		this.captureTime = captureTime;
		this.cameraId = cameraId;
		this.detectionStatus = true;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getFrame() {
		return frame;
	}
	
	public void setFrame(String frame) {
		this.frame = frame;
	}
	
	public Float getDetectionScore() {
		return detectionScore;
	}
	
	public void setDetectionScore(Float detectionScore) {
		this.detectionScore = detectionScore;
	}
	
	public String getDetectionTime() {
		return detectionTime;
	}
	
	public void setDetectionTime(String detectionTime) {
		this.detectionTime = detectionTime;
	}
	
	public String getCaptureTime() {
		return captureTime;
	}
	
	public void setCaptureTime(String captureTime) {
		this.captureTime = captureTime;
	}
	
	public String getCameraId() {
		return cameraId;
	}
	
	public void setCameraId(String cameraId) {
		this.cameraId = cameraId;
	}

	public Boolean getDetectionStatus() {
		return detectionStatus;
	}

	public void setDetectionStatus(Boolean detectionStatus) {
		this.detectionStatus = detectionStatus;
	}

	@Override
	public String toString() {
		return "Detection [id=" + id + ", frame=" + frame + ", detectionScore=" + detectionScore + ", detectionTime="
				+ detectionTime + ", captureTime=" + captureTime + ", cameraId=" + cameraId + "]";
	}
	
}
