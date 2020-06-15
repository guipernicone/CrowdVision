package com.tcc.CrowdVision.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.CrowdVision.Repository.OrganizationRepository;
import com.tcc.CrowdVision.Server.Organization.Organization;

@RestController
@CrossOrigin
@RequestMapping("/organization")
public class OrganizationController {
	
	@Autowired
	private OrganizationRepository organizationRepository;
	
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
}
