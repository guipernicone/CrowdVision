package com.tcc.CrowdVision.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tcc.CrowdVision.Server.Login.Login;

public interface LoginRepository extends MongoRepository<Login, String> {

	Optional<Login> findLoginByUserId(String userId);
	
}
