package com.tcc.CrowdVision.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.tcc.CrowdVision.Server.Detection.Detection;

public interface DetectionRepository extends MongoRepository<Detection, String> {
	
}
