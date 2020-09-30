package com.tcc.CrowdVision.Controller;

import java.util.List;
import java.util.Map;
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

import com.tcc.CrowdVision.Repository.CameraRepository;
import com.tcc.CrowdVision.Repository.OrganizationRepository;
import com.tcc.CrowdVision.Server.Camera.Camera;
import com.tcc.CrowdVision.Server.Organization.Organization;

@RestController
@CrossOrigin
@RequestMapping("/camera")
public class CameraController {

	@Autowired
	private CameraRepository cameraRepository;
	
	@Autowired
	private OrganizationRepository organizationRepository;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Camera camera) {
		try {
			Camera savedCamera = cameraRepository.save(camera);
			return ResponseEntity.ok(savedCamera.getId());
		}
		catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body("Invalid request");
		}
		
	}
	
	@PostMapping("/validate-key")
	public ResponseEntity<String> validadeKey(@RequestBody Map<String, String> payload) {
		if (payload.containsKey("cameraId")) {
			Optional<Camera> optionalCamera = cameraRepository.findById(payload.get("cameraId").toString());
			
			if (optionalCamera.isPresent()) {
				return ResponseEntity.ok(optionalCamera.get().getId());
			}
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Camera Id");
	}
	
	@GetMapping("/available-cameras")
	public ResponseEntity<String> availableCameras(@RequestParam(defaultValue = "none") String orgId) {
		System.out.println(orgId);
		if (!orgId.equals("none")) {
			
			Optional<Organization> optionalOrg = organizationRepository.findById(orgId);
			System.out.println(optionalOrg.isPresent());
			if (optionalOrg.isPresent()) {
				Organization org = optionalOrg.get();
				
				List<Camera> cameraList = cameraRepository.findAll();
				JSONArray cameraArray = new JSONArray();
				
				for (Camera camera : cameraList) {
					if (!org.getCameraIds().contains(camera.getId())) {
						JSONObject cameraObject = new JSONObject();
						cameraObject.put("id", camera.getId());
						cameraObject.put("name", camera.getName());
						cameraArray.put(cameraObject);
					}
				}
				
				if (cameraArray.length() > 0) {
					return ResponseEntity.ok(cameraArray.toString());
				}
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No available camera found");
			}
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Organization Id");
	}
}
