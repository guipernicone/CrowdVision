package com.tcc.CrowdVision.Utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {
	
	public static String convetDateToString(Date date, String format) {
	    SimpleDateFormat formatter = new SimpleDateFormat(format);  
	    return formatter.format(date);  
	}
	
	public static Date convetStringToDate(String date, String format) throws ParseException {
	    SimpleDateFormat formatter = new SimpleDateFormat(format);  
	    return formatter.parse(date);  
	}
	
	public static String convertMilisecondsToFormatString(long miliseconds) 
	{
		long seconds = (miliseconds / 1000) % 60;
		long minutes = (miliseconds / (1000 * 60)) % 60;
		long hours = (miliseconds / (1000 * 60 * 60));
		
		return String.format("%02d:%02d:%02d", hours, minutes, seconds);
	}
}
