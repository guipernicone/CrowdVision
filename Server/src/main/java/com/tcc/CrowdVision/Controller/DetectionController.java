package com.tcc.CrowdVision.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.CrowdVision.Repository.DetectionRepository;
import com.tcc.CrowdVision.Server.Detection.Detection;

@RestController
@RequestMapping("/detection")
public class DetectionController {
	
	@Autowired
	private DetectionRepository detectionRepository;
	
	@PostMapping("/add-frame/detected")
	public ResponseEntity<String> addicionar(@RequestBody Detection detection) {
		System.out.println(detection);
		System.out.println(detection.getFrame());
		System.out.println(detection.getDetectionScore());
		System.out.println(detection.getLatitude());
		System.out.println(detection.getLongitude());
		System.out.println(detection.getTime());
		
		Detection savedDetection = detectionRepository.save(detection);
		System.out.println(savedDetection.toString());
		return ResponseEntity.ok("Success");
	}
}
