package com.tcc.CrowdVision.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tcc.CrowdVision.Server.Login.Login;

public interface LoginRepository extends MongoRepository<Login, String> {

}
