package com.tcc.CrowdVision.Repository;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tcc.CrowdVision.Server.User.User;


public interface UserRepository extends MongoRepository<User, String> {
	
	@Query("{'email':?0}")
	ArrayList<User> findUsersByEmail(String email);
}
