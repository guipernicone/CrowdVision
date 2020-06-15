package com.tcc.CrowdVision.Server.Detection;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DetectionFeedBack")
public class DetectionFeedBack {
	@Id
	private String id;
	private String detectionId;
	private String date;
	private Boolean detectionStatus;
}
