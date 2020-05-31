package com.tcc.CrowdVision.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
		try {
			Detection savedDetection = detectionRepository.save(detection);
			System.out.println(savedDetection.toString());
		}
		catch (Exception e) {
			e.printStackTrace();	
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed trying to save on database");
		}

		return ResponseEntity.ok("Success");
	}
}
