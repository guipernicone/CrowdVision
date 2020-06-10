package com.tcc.CrowdVision.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.tcc.CrowdVision.Repository.CameraRepository;
import com.tcc.CrowdVision.Repository.DetectionRepository;
import com.tcc.CrowdVision.Server.Camera.Camera;
import com.tcc.CrowdVision.Server.Detection.Detection;

@RestController
@CrossOrigin
@RequestMapping("/detection")
public class DetectionController {
	
	@Autowired
	private DetectionRepository detectionRepository;
	
	@Autowired
	private CameraRepository cameraRepository;
	
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
	
	@GetMapping("/frames")
	public ResponseEntity<String> frames_detected(@RequestParam String cameraId) {
		try {
			Optional<Camera> cameraOptional  = cameraRepository.findById(cameraId);
			if (cameraOptional.isPresent()) {
				Camera camera = cameraOptional.get();
				
				JSONObject json = new JSONObject();
				
				Gson gson = new Gson();
				String cameraString = gson.toJson(camera);
				
				json.put("camera", new JSONObject(cameraString));
				
				JSONArray detectionArray = new JSONArray();
				ArrayList<Detection> detections = detectionRepository.findDetectionByCameraId(cameraId);
				for(Detection detection: detections) {
					String detectionString = gson.toJson(detection);
					
					JSONObject detectionObject = new JSONObject(detectionString);
					detectionArray.put(detectionObject);
				}
				json.put("frames", detectionArray);
				return ResponseEntity.ok(json.toString());
			}
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Camera Id");
		
		}
		catch (Exception e) {
			e.printStackTrace();	
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed trying to save on database");
		}
	}
}
