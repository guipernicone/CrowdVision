package com.tcc.CrowdVision.Server.Detection;

import java.text.ParseException;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DetectionHistory")
public class DetectionHistory {
	@Id
	private String id;
	private String frame;
	private Float detectionScore;
	private Date detectionTime;
	private Date captureTime;
	private String cameraId;
	private Boolean detectionStatus;
	
	
//	public DetectionHistory(
//			String id,
//			String frame,
//			Float detectionScore,
//			String detectionTime,
//			String captureTime,
//			String cameraId) throws ParseException
//	{
//		this.id = id;
//		this.frame = frame;
//		this.detectionScore = detectionScore;
//		this.detectionTime = DateUtils.convetStringToDate(detectionTime, "dd/MM/yyyy hh:mm:ss");
//		this.captureTime = DateUtils.convetStringToDate(captureTime, "dd/MM/yyyy hh:mm:ss");
//		this.cameraId = cameraId;
//		this.detectionStatus = true;
//	}
	public DetectionHistory(
			String frame,
			Float detectionScore,
			Date detectionTime,
			Date captureTime,
			String cameraId) throws ParseException
	{
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
