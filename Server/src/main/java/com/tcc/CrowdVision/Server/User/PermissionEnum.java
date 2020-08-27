package com.tcc.CrowdVision.Server.User;

public enum PermissionEnum {
    USER(100), MANAGER(200), ADMIN(300);
    
    private final int value;
    
    PermissionEnum(int option) {
    	value = option;
    }
    
    public int getValue(){
        return this.value;
    }
}
