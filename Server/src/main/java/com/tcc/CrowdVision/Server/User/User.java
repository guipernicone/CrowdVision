package com.tcc.CrowdVision.Server.User;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {
	
	@Id
	private String id;
	private String name;
	private String surname;
	private String password;
	private int permission;
	private ArrayList<String> organizationId;
	
	public String getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getSurname() {
		return surname;
	}
	
	public void setSurname(String surname) {
		this.surname = surname;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public int getPermission() {
		return permission;
	}
	
	public void setPermission(int permission) {
		this.permission = permission;
	}
	

	public ArrayList<String> getOrganizationId() {
		return organizationId;
	}
	
}
