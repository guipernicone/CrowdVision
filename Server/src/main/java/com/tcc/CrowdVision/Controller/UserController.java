package com.tcc.CrowdVision.Controller;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONArray;
import org.json.JSONObject;

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
import com.tcc.CrowdVision.Server.User.UserUtils;

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
			user.setPassword(new DigestUtils(SHA3_256).digestAsHex(user.getPassword()));
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

					
					JSONObject response = new JSONObject();
					JSONArray orgArray= new JSONArray();
					JSONObject parentUserObject = new JSONObject();
					
					User user = optionalUser.get();
					
					response.put("id", user.getId());
					response.put("name", user.getName());
					response.put("surname", user.getSurname());
					response.put("email", user.getEmail());

					Iterable<Organization> iterableOrganization = null;
					if(user.getOrganizationIds() != null) {
						iterableOrganization = organizationRepository.findAllById(user.getOrganizationIds());
						for(Organization org : iterableOrganization) {
							JSONObject orgObject = new JSONObject();
							orgObject.put("id",org.getId());
							orgObject.put("name",org.getName());
							orgArray.put(orgObject);
						}
					}
					else {
						orgArray = null;
					}
					response.put("org", orgArray);
					
					if(user.getParentUserId() != null) {
						Optional<User> optionalParentUser = userRepository.findById(user.getParentUserId());
						
						if (optionalParentUser.isPresent()) {
							User parentUser = optionalParentUser.get();
							parentUserObject.put("id", parentUser.getId());
							parentUserObject.put("name", parentUser.getName());
							parentUserObject.put("surname", parentUser.getSurname());
							parentUserObject.put("email", parentUser.getEmail());
							parentUserObject.put("permission", UserUtils.getPermissionByInt(parentUser.getPermission()));
						}
						else {
							ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Parent User does not exist");
						}
				
						
					}
					else {
						parentUserObject = null;
					}
					response.put("parentUser", parentUserObject);
					response.put("permission", UserUtils.getPermissionByInt(user.getPermission()));
					
			
					return ResponseEntity.ok(response.toString());
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
