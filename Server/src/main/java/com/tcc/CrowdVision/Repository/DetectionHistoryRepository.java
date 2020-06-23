package com.tcc.CrowdVision.Repository;


import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tcc.CrowdVision.Server.Detection.DetectionHistory;

public interface DetectionHistoryRepository extends MongoRepository<DetectionHistory, String> {
	
	@Query("{'cameraId':?0}")
	ArrayList<DetectionHistory> findDetectionByCameraId(String cameraId);
}
