package com.tcc.CrowdVision.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.CrowdVision.Repository.LoginRepository;
import com.tcc.CrowdVision.Repository.UserRepository;
import com.tcc.CrowdVision.Server.Login.Login;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private LoginRepository loginRepository;
	
	@PostMapping()
	public ResponseEntity<String> saveUser(@RequestBody Map<String, String> loginJSON) {
		Login login = new Login("1");
		Login savedLogin = loginRepository.save(login);
		return ResponseEntity.ok(savedLogin.getId());
	}
}
