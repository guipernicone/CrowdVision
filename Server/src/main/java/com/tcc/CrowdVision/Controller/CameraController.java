package com.tcc.CrowdVision.Controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.CrowdVision.Repository.CameraRepository;
import com.tcc.CrowdVision.Server.Camera.Camera;

@RestController
@RequestMapping("/camera")
public class CameraController {

	@Autowired
	private CameraRepository cameraRepository;
	
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
}
