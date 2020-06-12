package com.tcc.CrowdVision.Controller;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.codec.digest.DigestUtils;
import static org.apache.commons.codec.digest.MessageDigestAlgorithms.SHA3_256;
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

import com.tcc.CrowdVision.Repository.OrganizationRepository;
import com.tcc.CrowdVision.Repository.UserRepository;
import com.tcc.CrowdVision.Server.Organization.Organization;
import com.tcc.CrowdVision.Server.User.PermissionEnum;
import com.tcc.CrowdVision.Server.User.User;
import com.tcc.CrowdVision.Server.User.UserManager;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OrganizationRepository organizationRepository;
			
	@PostMapping("/save")
	@SuppressWarnings("unchecked")
	public ResponseEntity<String> saveUser(@RequestBody Map<String, Object> userJSON) {
		try {
				UserManager userManager = UserManager.getInstance();
				String requestUserId = (String) userJSON.get("requestUserId");
				Optional<User> userOptional = userRepository.findById(requestUserId);
				
				if(userOptional.isPresent()) {
					User requestUser = userOptional.get();
					
					if(userManager.isAdminOrManager(requestUser)) {
						int permission = (int) userJSON.get("permission");
						
						if (permission == PermissionEnum.MANAGER.getValue() || permission == PermissionEnum.USER.getValue()) {
							String name = (String) userJSON.get("name");
							String surname = (String) userJSON.get("surname");
							String email = (String) userJSON.get("email");
							String password = (String) userJSON.get("password");
							String sha3_256hex_password = new DigestUtils(SHA3_256).digestAsHex(password);
							ArrayList<String> organizationIds = (ArrayList<String>) userJSON.get("organizationIds");
							String parentUserId = null;
							
							if(userManager.isManager(requestUser)) {
								parentUserId = requestUser.getParentUserId();
							}
							else {
								parentUserId = requestUser.getId();
							}
							
							
							User user = new User(name, surname, email, sha3_256hex_password, permission, organizationIds, parentUserId);
				
							if (!userManager.isEmailUniq(user)) {
								return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email Already Used");
							}
							User savedUser = userRepository.save(user);
							System.out.println(savedUser.toString());
							
							return ResponseEntity.ok("Success");
						}
						
					}
					
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Permission");
				}
				
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");

		}
		catch (Exception e) {
			e.printStackTrace();	
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");
		}

	}
	
	@PostMapping("/add")
	public ResponseEntity<String> saveUser(@RequestBody User user) {
		try {
			User savedUser = userRepository.save(user);
			System.out.println(savedUser.toString());
			return ResponseEntity.ok("Success");
		}
		catch (IllegalArgumentException e) {
			e.printStackTrace();	
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed trying to save on database");
		}

	}
	
	@GetMapping("/information")
	public ResponseEntity<String> getUser(@RequestParam(defaultValue = "none") String userID) {
		try {
			if (!userID.equals("none")) {
				Optional<User> optionalUser = userRepository.findById(userID);
				
				if (optionalUser.isPresent()) {
					System.out.println(optionalUser.toString());
					User user = optionalUser.get();
					Iterable<Organization> iterableOrganization = null;
					
					if(user.getOrganizationIds() != null) {
						iterableOrganization = organizationRepository.findAllById(user.getOrganizationIds());
						for(Organization org : iterableOrganization) {
							System.out.println(org.toString());
						}
					}
					
			
					return ResponseEntity.ok("Success");
				}
				
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");
		}
		catch (IllegalArgumentException e) {
			e.printStackTrace();	
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid JSON");
		}

	}
}
