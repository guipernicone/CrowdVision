package com.tcc.CrowdVision.Controller;

import static org.apache.commons.codec.digest.MessageDigestAlgorithms.SHA3_256;

import java.util.Map;
import java.util.Optional;

import org.apache.commons.codec.digest.DigestUtils;
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

import com.tcc.CrowdVision.Repository.LoginRepository;
import com.tcc.CrowdVision.Repository.UserRepository;
import com.tcc.CrowdVision.Server.Login.Login;
import com.tcc.CrowdVision.Server.User.User;
import com.tcc.CrowdVision.Server.User.UserUtils;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private LoginRepository loginRepository;
	
	@PostMapping
	public ResponseEntity<String> userLogin(@RequestBody Map<String, String> loginJSON) {
		if (loginJSON.containsKey("userEmail") && loginJSON.containsKey("userPassword")) {
			
			String userEmail = loginJSON.get("userEmail");
			String userPassword = loginJSON.get("userPassword");
			String hashPassword = new DigestUtils(SHA3_256).digestAsHex(userPassword);
			Optional<User> optionalUser = userRepository.findUserByEmailAndPassword(userEmail, hashPassword);
			JSONObject response = new JSONObject();
			JSONObject userObject = new JSONObject();
			
			if(optionalUser.isPresent()) {
				User user = optionalUser.get();
				Optional<Login> optionalLogin = loginRepository.findLoginByUserId(user.getId());
				Login login;
				
				if(optionalLogin.isPresent()) {
					login = optionalLogin.get();
					loginRepository.delete(login);
				}
				
				login = new Login(user.getId());
				Login savedLogin = loginRepository.save(login);
				
				
				userObject.put("id", user.getId());
				userObject.put("name", user.getName());
				userObject.put("email", user.getEmail());
				userObject.put("permission", UserUtils.getPermissionByInt(user.getPermission()));
				response.put("loginID", savedLogin.getId());
				response.put("user", userObject);
				return ResponseEntity.ok(response.toString());
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email or Password Incorrect");
			
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");

	}
	
	@GetMapping(value="/validate")
	public ResponseEntity<String> validateLogin(@RequestParam(defaultValue = "none") String loginSession) {
		if (!loginSession.equals("none")) {
			Optional<Login> login = loginRepository.findById(loginSession);
			
			if(login.isPresent()) {
				return ResponseEntity.ok("User session founded");
			}

		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Session");

	}
	
}
