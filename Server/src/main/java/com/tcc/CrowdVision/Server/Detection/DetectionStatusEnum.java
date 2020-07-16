package com.tcc.CrowdVision.Server.Detection;

public enum DetectionStatusEnum {
    POSITIVE_DETECTION(true), FALSE_DETECTION(false);
    
    private final boolean value;
    
    DetectionStatusEnum(boolean option) {
    	value = option;
    }
    
    public boolean getValue(){
        return this.value;
    }
}
