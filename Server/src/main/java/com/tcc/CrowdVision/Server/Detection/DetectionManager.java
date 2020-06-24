package com.tcc.CrowdVision.Server.Detection;

import java.util.ArrayList;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.tcc.CrowdVision.Controller.WebSocket.WebSocketListener;
import com.tcc.CrowdVision.Repository.CameraRepository;
import com.tcc.CrowdVision.Repository.DetectionHistoryRepository;
import com.tcc.CrowdVision.Repository.DetectionRepository;
import com.tcc.CrowdVision.Repository.OrganizationRepository;
import com.tcc.CrowdVision.Repository.UserRepository;
import com.tcc.CrowdVision.Server.Camera.Camera;
import com.tcc.CrowdVision.Server.Organization.Organization;
import com.tcc.CrowdVision.Server.User.User;
import com.tcc.CrowdVision.Utils.BeanUtils;

public class DetectionManager {

	private static DetectionManager instance;
	private WebSocketListener listerner;
	private DetectionRepository detectionRepository = BeanUtils.getBean(DetectionRepository.class);
	private DetectionHistoryRepository detectionHistoryRepository = BeanUtils.getBean(DetectionHistoryRepository.class);
	private UserRepository userRepository = BeanUtils.getBean(UserRepository.class);
	private CameraRepository cameraRepository = BeanUtils.getBean(CameraRepository.class);
	private OrganizationRepository orgRepository = BeanUtils.getBean(OrganizationRepository.class);
	
	public static DetectionManager getInstance() {
		if (instance == null) {
			instance = new DetectionManager();
		}
		return instance;
	}
	
	public void addListener(WebSocketListener listener) {
		this.listerner = listener;
	}
	
	public synchronized void sendStatus() {
		this.listerner.sendDetectionFrame();
	}
	
	public String getFrames(String userId, Boolean history) {
		
		ArrayList<String> cameraIds = new ArrayList<String>();
		JSONArray json = new JSONArray();
		
		Optional<User> optionalUser = userRepository.findById(userId);
		
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			
			if (user.getOrganizationIds() != null) {
				
				for (String orgId : user.getOrganizationIds()) {
					Optional<Organization> optionalOrg = orgRepository.findById(orgId);
					
					if (optionalOrg.isPresent()) {
						Organization org = optionalOrg.get();
						cameraIds.addAll(org.getCameraIds());
					}
				}
	
				for (String cameraId: cameraIds) {
					JSONObject cameraObject = new JSONObject();
					Optional<Camera> cameraOptional = cameraRepository.findById(cameraId);
					
					if (cameraOptional.isPresent()) {
						Camera camera = cameraOptional.get();
						
						Gson gson = new Gson();
						String cameraString = gson.toJson(camera);
						cameraObject.put("camera", new JSONObject(cameraString));
						
						JSONArray detectionArray = new JSONArray();
						
						if (history) {
							ArrayList<DetectionHistory> detections = detectionHistoryRepository.findDetectionByCameraId(cameraId); 
							
							
							for (DetectionHistory detection: detections) {
								String detectionString = gson.toJson(detection);
								
								JSONObject detectionObject = new JSONObject(detectionString);
								detectionArray.put(detectionObject);
							}
						}
						else {
							ArrayList<Detection> detections = detectionRepository.findDetectionByCameraId(cameraId);
							
							for (Detection detection: detections) {
								String detectionString = gson.toJson(detection);
								
								JSONObject detectionObject = new JSONObject(detectionString);
								detectionArray.put(detectionObject);
							}
						}
						
						
						
						cameraObject.put("frames", detectionArray);
					}
					json.put(cameraObject);
				}
				
				
			}
		}
		
		return json.toString();
	}
}
