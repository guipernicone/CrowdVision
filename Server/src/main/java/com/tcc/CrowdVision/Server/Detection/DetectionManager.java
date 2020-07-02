package com.tcc.CrowdVision.Server.Detection;

import java.util.ArrayList;
import java.util.List;
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
	private WebSocketListener listener;
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
		this.listener = listener;
	}
	
	/**
	 * Call the listener send Function
	 */
	public synchronized void sendStatus() {
		this.listener.sendDetectionFrame();
	}
	
	/**
	 * Get a list of frames of a User
	 * 
	 * @param userId - An User id
	 * @param history - True for getting frames from history or False for getting recent frames
	 * 
	 * @return JSON
	 */
	public String getFrames(String userId, Boolean history) {
		
		ArrayList<String> cameraIds = new ArrayList<String>();
		JSONArray json = new JSONArray();
		
		Optional<User> optionalUser = userRepository.findById(userId);
		
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			
			if (user.getOrganizationIds() != null) {	

				Iterable<Organization> iterable = orgRepository.findAllById(user.getOrganizationIds());
				List<Organization> organizations = new ArrayList<Organization>();
				iterable.iterator().forEachRemaining(organizations::add);
				
				for (Organization org : organizations) {
					cameraIds.addAll(org.getCameraIds());
				}
				
				for (String cameraId: cameraIds) {
					JSONObject cameraObject = new JSONObject();
					
					Iterable<Camera> cameras = cameraRepository.findAllById(cameraIds);
					
					for (Camera camera : cameras) {
						
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
	
	/**
	 * Build the statistics data JSON
	 * 
	 * @param cameraIds An array of camera IDs for search detections linked to the ID
	 * @param StartDate	The start date to filter the detections search
	 * @param EndDate The end date to filter the detections search
	 * 
	 * @return JSON Object as string
	 */
	public String buildStatisticData(ArrayList<String> cameraIds, String StartDate, String EndDate) 
	{	
		ArrayList<DetectionHistory> detections = new ArrayList<DetectionHistory>();
		JSONObject resultStatistics;
		String totalStatus;
		
		if (StartDate == null || EndDate == null)
		{
			detections = detectionHistoryRepository.findDetectionByCameraIds(cameraIds);
		}
		else
		{
			detections = detectionHistoryRepository.findDetectionByCameraIdsInPeriod(cameraIds, StartDate, EndDate);
		}
		
		if (!detections.isEmpty()) {
			
			BuildStatistics statisticsBuilder = new BuildStatistics(detections);
			statisticsBuilder.buildTotalStatusStatistics();
			return statisticsBuilder.getResult();
//			totalStatus = buildTotalStatusStatistics(detections);
		}
		
		return null;
	}
	
}
