package com.tcc.CrowdVision.Repository;


import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tcc.CrowdVision.Server.Detection.DetectionHistory;

public interface DetectionHistoryRepository extends MongoRepository<DetectionHistory, String> {
	
	@Query(sort="{'detectionTime':-1}")
	ArrayList<DetectionHistory> findDetectionByCameraId(String cameraId);
	
	@Query("{'cameraId': { $in : ?0}}")
	ArrayList<DetectionHistory> findDetectionByCameraIds(ArrayList<String> cameraIds);
	
	@Query("{'cameraId': { $in : ?0}, detectionTime: { $gte : ?1, $lte: ?2}}")
	ArrayList<DetectionHistory> findDetectionByCameraIdsInPeriod(ArrayList<String> cameraIds, Date StartDate, Date EndDate);
}
