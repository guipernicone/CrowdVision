package com.tcc.CrowdVision.Controller;

import org.springframework.beans.factory.annotation.Autowired;
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
		Camera savedCamera = cameraRepository.save(camera);
		System.out.println(savedCamera.getId());
		return ResponseEntity.ok(savedCamera.getId());
	}
}
