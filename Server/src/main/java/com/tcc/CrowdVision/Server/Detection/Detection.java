package com.tcc.CrowdVision.Server.Detection;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Detection")
public class Detection {
	
	@Id
	private String id;
	private String frame;
	private Float detectionScore;
	private Date detectionTime;
	private Date captureTime;
	private String cameraId;
	@Indexed(name = "creationTime", expireAfterSeconds = 86400)
	private Date creationTime;
	private String historyId;
	
	
	@PersistenceConstructor
	public Detection(String frame, Float detectionScore, Date detectionTime, Date captureTime, String cameraId, String historyId) {
		this.frame = frame;
		this.detectionScore = detectionScore;
		this.detectionTime = detectionTime;
		this.captureTime = captureTime;
		this.cameraId = cameraId;
		this.historyId = historyId;
		this.creationTime = new Date();
	}
	
	public Detection(DetectionHistory detection) {
		this.frame = detection.getFrame();
		this.detectionScore = detection.getDetectionScore();
		this.detectionTime = detection.getDetectionTime();
		this.captureTime = detection.getCaptureTime();
		this.cameraId = detection.getCameraId();
		this.historyId = detection.getId();
		this.creationTime = new Date();
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
	
	public Date getDetectionTime() {
		return detectionTime;
	}
	
	public void setDetectionTime(Date detectionTime) {
		this.detectionTime = detectionTime;
	}
	
	public Date getCaptureTime() {
		return captureTime;
	}
	
	public void setCaptureTime(Date captureTime) {
		this.captureTime = captureTime;
	}
	
	public String getCameraId() {
		return cameraId;
	}
	
	public void setCameraId(String cameraId) {
		this.cameraId = cameraId;
	}
	
	public Date getCreationTime() {
		return creationTime;
	}
	
	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}
	
	public String getHistoryId() {
		return historyId;
	}

	public void setHistoryId(String historyId) {
		this.historyId = historyId;
	}

	@Override
	public String toString() {
		return "Detection [id=" + id + ", frame=" + frame + ", detectionScore=" + detectionScore + ", detectionTime="
				+ detectionTime + ", captureTime=" + captureTime + ", cameraId=" + cameraId + ", creationTime="
				+ creationTime + "]";
	}
	
	
	
}
