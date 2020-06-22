package com.tcc.CrowdVision.Controller;

import java.util.ArrayList;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.tcc.CrowdVision.Repository.CameraRepository;
import com.tcc.CrowdVision.Repository.DetectionRepository;
import com.tcc.CrowdVision.Repository.OrganizationRepository;
import com.tcc.CrowdVision.Repository.UserRepository;
import com.tcc.CrowdVision.Server.Camera.Camera;
import com.tcc.CrowdVision.Server.Detection.Detection;
import com.tcc.CrowdVision.Server.Organization.Organization;
import com.tcc.CrowdVision.Server.User.User;

@RestController
@CrossOrigin
@RequestMapping("/detection")
public class DetectionController {
	
	@Autowired
	private DetectionRepository detectionRepository;
	
	@Autowired
	private CameraRepository cameraRepository;
	
	@Autowired
	private OrganizationRepository orgRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@PostMapping("/add-frame/detected")
	public ResponseEntity<String> addicionar(@RequestBody Detection detection) {
		try {
			Optional<Camera> optionalCamera = cameraRepository.findById(detection.getCameraId());
						
			if (optionalCamera.isPresent()) {
				Detection savedDetection = detectionRepository.save(detection);
				System.out.println(savedDetection.toString());
				return ResponseEntity.ok("Success");
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Camera Id");
		}
		catch (Exception e) {
			e.printStackTrace();	
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed trying to save on database");
		}

	}
	
	@GetMapping("/frames-from-camera")
	public ResponseEntity<String> framesFromCamera(@RequestParam String cameraId) {
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
	
	@GetMapping("/frames-from-user")
	public ResponseEntity<String> framesFromUser(@RequestParam(defaultValue = "none") String userId) {
		
		ArrayList<String> cameraIds = new ArrayList<String>();
		JSONArray json = new JSONArray();
		
		Optional<User> optionalUser = userRepository.findById(userId);
		
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			
			if (user.getOrganizationIds() != null) {
				
				for (String orgId : user.getOrganizationIds()) {
					Optional<Organization> optionalOrg = orgRepository.findById(orgId);
					
					if (optionalOrg.isPresent()) {
						Organization org = optionalOrg.get();
						cameraIds.addAll(org.getCameraIds());
					}
				}
	
				for (String cameraId: cameraIds) {
					JSONObject cameraObject = new JSONObject();
					Optional<Camera> cameraOptional = cameraRepository.findById(cameraId);
					
					if (cameraOptional.isPresent()) {
						Camera camera = cameraOptional.get();
						
						Gson gson = new Gson();
						String cameraString = gson.toJson(camera);
						cameraObject.put("camera", cameraString);
						
						ArrayList<Detection> detections = detectionRepository.findDetectionByCameraId(cameraId); 
						JSONArray detectionArray = new JSONArray();
						
						for (Detection detection: detections) {
							String detectionString = gson.toJson(detection);
							
							JSONObject detectionObject = new JSONObject(detectionString);
							detectionArray.put(detectionObject);
						}
						
						cameraObject.put("frames", detectionArray);
					}
					json.put(cameraObject);
				}
				
				return ResponseEntity.ok(json.toString());
			}
		}
		return ResponseEntity.badRequest().body("user id invalido");
	}
	
}
