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
	
	/**
	 * Calculate the radius of a list of points from a certain point
	 * 
	 * @return radius in meters
	 */
	public double calculateRadiusFromList(Points basePoint)
	{
		Double radius = 0d;
		Double maxRadius = 0d;
		
		for (Points points: coordinates)
		{

			radius = calculateDistance(basePoint, points);
			if (radius > maxRadius) {
				maxRadius = radius;
			}

		}
		
		return maxRadius;
	}
	
	/**
	 * Calculate the distance between two coordinates
	 * 
	 * a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
	 * c = 2 ⋅ atan2( √a, √(1−a) )
	 * d = R ⋅ c
	 * 
	 * @param firstPoint
	 * @param secondPoint
	 * 
	 * @return Radius in meters
	 */
	private double calculateDistance(Points firstPoint, Points secondPoint)
	{
		Double earthRadius = 6371e3;
		Double latRadians1 = Math.toRadians(firstPoint.getX());
		Double latRadians2 = Math.toRadians(secondPoint.getX());
		
		Double deltaLat = Math.toRadians(secondPoint.getX() - firstPoint.getX());
		Double deltaLong = Math.toRadians(secondPoint.getY() - firstPoint.getY());
		
		Double a = Math.pow(Math.sin(deltaLat/2), 2) + (Math.cos(latRadians1) * Math.cos(latRadians2) * Math.pow(Math.sin(deltaLong), 2)); 
		Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		
		
		
		return earthRadius * c;
	}
}
