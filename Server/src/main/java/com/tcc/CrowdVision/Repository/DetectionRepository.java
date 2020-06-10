package com.tcc.CrowdVision.Repository;


import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tcc.CrowdVision.Server.Detection.Detection;

public interface DetectionRepository extends MongoRepository<Detection, String> {
	
	@Query("{'cameraId':?0}")
	ArrayList<Detection> findDetectionByCameraId(String cameraId);
}
