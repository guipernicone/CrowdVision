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
	private String email;
	private String password;
	private int permission;
	private ArrayList<String> organizationIds;
	private String parentUserId;
	
	
	
	public User(String name, String surname, String email, String password, int permission, ArrayList<String> organizationIds, String parentUserId) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.permission = permission;
		this.organizationIds = organizationIds;
		this.parentUserId = parentUserId;
	}

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
	
	public String getEmail() {
		return email;
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
	
	public String getParentUserId() {
		return parentUserId;
	}

	public ArrayList<String> getOrganizationIds() {
		return organizationIds;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", surname=" + surname + ", password=" + password + ", permission="
				+ permission + ", organizationIds=" + organizationIds + ", parentUserId=" + parentUserId + "]";
	}

	
	
}
