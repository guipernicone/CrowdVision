package com.tcc.CrowdVision.Server.Login;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Login")
public class Login {

	@Id
	private String id;
	
	@Indexed(name = "creationDate", expireAfterSeconds = 3600)
	private Date creationDate;
	private String userId;
	
	public Login(String id) {
		creationDate = new Date();
		userId = id;

	}
	
	public String getId() {
		return id;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public String getUserId() {
		return userId;
	}

	@Override
	public String toString() {
		return "Login [id=" + id + ", creationDate=" + creationDate + ", userId=" + userId + "]";
	}

	

}
