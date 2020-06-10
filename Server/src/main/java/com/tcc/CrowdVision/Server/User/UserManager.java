package com.tcc.CrowdVision.Server.User;

public class UserManager {

	private static final UserManager INSTANCE  = new UserManager();
	
	public static UserManager getInstance() {
		return INSTANCE;
	}
	
	public static boolean isAdmin(User user) {
		if (user.getPermission() == PermissionEnum.ADMIN.getValue()) {
			return true;
		}
		return false;
	}

	public static boolean isManager(User user) {
		if (user.getPermission() == PermissionEnum.MANAGER.getValue()) {
			return true;
		}
		return false;
	}
	
	public static boolean isAdminOrManager(User user) {
		if (isManager(user) || isAdmin(user)) {
			return true;
		}
		return false;
	}
}
