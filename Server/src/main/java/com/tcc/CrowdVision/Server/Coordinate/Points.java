package com.tcc.CrowdVision.Server.Coordinate;

public class Points {

	private double x;
	private double y;
	
	public Points(double x, double y) {
		this.x = x;
		this.y = y;
	}

	public double getX() {
		return x;
	}

	public double getY() {
		return y;
	}

	@Override
	public String toString() {
		return "( " + x + ", " + y + " )";
	}
	
	
}
