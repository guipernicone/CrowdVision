package com.tcc.CrowdVision.Server.Login;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.tcc.CrowdVision.Utils.DateUtils;


@Document(collection = "Login")
public class Login {

	@Id
	private String id;
	@Indexed(name = "creationDate", expireAfterSeconds = 0)
	private Date creationDate;
	private String userId;
	
	public Login(String id) {
//		creationDate = DateUtils.convetDateToString(new Date(), "dd-MM-yyyy hh:mm:ss");
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
