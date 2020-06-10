package com.tcc.CrowdVision.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tcc.CrowdVision.Server.User.User;


public interface UserRepository extends MongoRepository<User, String> {

}
