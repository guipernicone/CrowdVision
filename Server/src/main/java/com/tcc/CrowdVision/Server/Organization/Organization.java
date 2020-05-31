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
	
}
