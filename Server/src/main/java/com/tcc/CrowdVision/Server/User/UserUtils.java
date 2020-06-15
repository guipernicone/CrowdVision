package com.tcc.CrowdVision.Server.User;

public class UserUtils {

	public static String getPermissionByInt(int permission) {
		
		if (permission == PermissionEnum.ADMIN.getValue()) {
			return "ADMIN";
		}
		if (permission == PermissionEnum.MANAGER.getValue()) {
			return "MANAGER";
		}
		if (permission == PermissionEnum.USER.getValue()) {
			return "USER";
		}
		return null;
	}
}
