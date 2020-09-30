package com.tcc.CrowdVision.Controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.CrowdVision.Repository.CameraRepository;
import com.tcc.CrowdVision.Repository.OrganizationRepository;
import com.tcc.CrowdVision.Server.Camera.Camera;
import com.tcc.CrowdVision.Server.Organization.Organization;

@RestController
@CrossOrigin
@RequestMapping("/organization")
public class OrganizationController {
	
	@Autowired
	private OrganizationRepository organizationRepository;
	
	@Autowired
	private CameraRepository cameraRepository;
	
	@PostMapping("/save")
	public ResponseEntity<String> addicionar(@RequestBody Organization organization) {
		try {
				Organization savedOrganization = organizationRepository.save(organization);
				System.out.println(savedOrganization.toString());
				return ResponseEntity.ok("Success");
		}
		catch (IllegalArgumentException e) {
			e.printStackTrace();	
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed trying to save on database");
		}

	}
	
	@PostMapping("/update-camera-list")
	public ResponseEntity<String> updateCameraList(@RequestBody Map<String, Object> updateList)
	{
		
		try {
			
			if (updateList.containsKey("orgId") && updateList.containsKey("cameraId") && updateList.containsKey("delete"))
			{

				String orgId = (String) updateList.get("orgId");
				String cameraId = (String) updateList.get("cameraId");
				Boolean delete = (Boolean) updateList.get("delete");
				
				Optional<Organization> optionalOrg = organizationRepository.findById(orgId);
	
				if (optionalOrg.isPresent()) {
					Organization org = optionalOrg.get();
					
					Optional<Camera> optionalCamera = cameraRepository.findById(cameraId);
					
					if (optionalCamera.isPresent()) {
						
						Camera camera = optionalCamera.get();
						
						if (!delete) {
							org.getCameraIds().add(camera.getId());
						}
						else {
							org.getCameraIds().remove(camera.getId());
						}
						
						organizationRepository.save(org);
						return ResponseEntity.ok("Success");
					}
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid camera id");
					
					
				}
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid organization id");
			}

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
		}	
	}
}
