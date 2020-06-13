package com.tcc.CrowdVision;

import java.util.Timer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.tcc.CrowdVision.Server.Login.LoginTimeTask;

@SpringBootApplication
public class CrowdVisionApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(CrowdVisionApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		new Timer().schedule(new LoginTimeTask(), 0, 10000);
	}

}
