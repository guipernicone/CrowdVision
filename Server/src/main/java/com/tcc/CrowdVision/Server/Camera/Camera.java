package com.tcc.CrowdVision.Server.Camera;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Camera")
public class Camera {

	@Id
	private String id;
	private String latitude;
	private String longitude;
	
	@Override
	public String toString() {
		return "Camera [id=" + id + ", latitude=" + latitude + ", longitude=" + longitude + "]";
	}

	public String getLatitude() {
		return latitude;
	}
	
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	
	public String getLongitude() {
		return longitude;
	}
	
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	
	public String getId() {
		return id;
	}

	
}
