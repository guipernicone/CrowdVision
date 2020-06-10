package com.tcc.CrowdVision.Server.User;

import java.util.ArrayList;

import com.tcc.CrowdVision.Repository.UserRepository;
import com.tcc.CrowdVision.Utils.BeanUtils;

public class UserManager {

	private static final UserManager INSTANCE  = new UserManager();
	private UserRepository userRepository = BeanUtils.getBean(UserRepository.class);

	public static UserManager getInstance() {
		return INSTANCE;
	}
	
	public boolean isAdmin(User user) {
		if (user.getPermission() == PermissionEnum.ADMIN.getValue()) {
			return true;
		}
		return false;
	}

	public boolean isManager(User user) {
		if (user.getPermission() == PermissionEnum.MANAGER.getValue()) {
			return true;
		}
		return false;
	}
	
	public boolean isAdminOrManager(User user) {
		if (isManager(user) || isAdmin(user)) {
			return true;
		}
		return false;
	}
	
	public boolean isEmailUniq(User user) {

		ArrayList<User> userArray = userRepository.findUsersByEmail(user.getEmail());
		if (userArray.isEmpty()){
			return true;
		}
		return false;
	}
}
