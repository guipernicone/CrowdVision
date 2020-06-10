package com.tcc.CrowdVision.Server.Organization;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Organization")
public class Organization {

	@Id
	private String id;
	private String name;
	private ArrayList<String> cameraIds;
	private String userId;
	

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public ArrayList<String> getCameraIds() {
		return cameraIds;
	}

	public String getUserId() {
		return userId;
	}

	@Override
	public String toString() {
		return "Organization [id=" + id + ", name=" + name + ", cameraIds=" + cameraIds + ", userId=" + userId + "]";
	}
	

	
}
