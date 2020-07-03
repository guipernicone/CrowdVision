package com.tcc.CrowdVision.Server.Coordinate;

import java.util.ArrayList;

public class CoordinateCalculator {

	private ArrayList<Points> coordinates;
	
	public CoordinateCalculator(ArrayList<Points> coordinates) {
		this.coordinates = coordinates;
	}
	
	
	/**
	 * Calculate the center coordinate for a list of coordinate points
	 *
	 * @return A coordinate as a Point class
	 */
	public Points CalculateCenter() {
		return new Points(calculateLatitudeCenter(), calculateLongitudeCenter());
	}
	

	/**
	 * Calculate the center of a list of latitudes
	 * 
	 * @return latitude
	 */
	private double calculateLatitudeCenter()
	{
		Double latCenter;
		Double latSum = 0d;
		for (Points points : coordinates) {
			latSum += points.getX();
		}
		latCenter = latSum / coordinates.size();
		return latCenter;
	}
	
	/**
	 * Calculate the center of a list of longitude
	 * 
	 * @return longitude
	 */
	private double calculateLongitudeCenter()
	{
		Double longMean = 0d;
		Double longSinSum = 0d;
		Double longCosSum = 0d;
		Double longSinMean = 0d;
		Double longCosMean = 0d;
		
		for (Points points: coordinates) {
			longSinSum += Math.sin(Math.toRadians(points.getY()));
			longCosSum += Math.cos(Math.toRadians(points.getY()));
		}
		
		longSinMean = longSinSum / coordinates.size();
		longCosMean = longCosSum / coordinates.size();
		
		longMean = Math.toDegrees(Math.atan2(longSinMean, longCosMean));
		return longMean;
	}
}
