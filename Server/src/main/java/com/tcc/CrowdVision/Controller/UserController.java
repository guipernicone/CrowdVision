package com.tcc.CrowdVision.Controller;

import java.util.ArrayList;
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

import com.tcc.CrowdVision.Repository.UserRepository;
import com.tcc.CrowdVision.Server.User.PermissionEnum;
import com.tcc.CrowdVision.Server.User.User;
import com.tcc.CrowdVision.Server.User.UserManager;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserRepository userRepository;
			
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
							ArrayList<String> organizationIds = (ArrayList<String>) userJSON.get("organizationIds");
							String parentUserId = null;
							
							if(userManager.isManager(requestUser)) {
								parentUserId = requestUser.getParentUserId();
							}
							else {
								parentUserId = requestUser.getId();
							}
							
							
							User user = new User(name, surname, email, password, permission, organizationIds, parentUserId);
				
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
}
