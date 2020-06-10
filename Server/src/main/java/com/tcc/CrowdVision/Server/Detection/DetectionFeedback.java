package com.tcc.CrowdVision.Server.Detection;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DetectionFeedback")
public class DetectionFeedback {
	@Id
	private String id;
	private String detectionId;
	private String date;
	private Boolean detectionStatus;
}
