package com.tcc.CrowdVision.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tcc.CrowdVision.Server.Camera.Camera;


public interface CameraRepository extends MongoRepository<Camera, String> {

}
