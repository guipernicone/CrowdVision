package com.tcc.CrowdVision;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.tcc.CrowdVision.Controller.WebSocket.WebSocketListener;
import com.tcc.CrowdVision.Server.Detection.DetectionManager;

@SpringBootApplication
public class CrowdVisionApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(CrowdVisionApplication.class, args);
		WebSocketListener listener = new WebSocketListener();
		DetectionManager detectionManager = DetectionManager.getInstance();
		detectionManager.addListener(listener);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
	}

}
