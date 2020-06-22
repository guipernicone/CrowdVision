package com.tcc.CrowdVision.Controller.WebSocket;

public class WebSocketListener {
	
	public void sendDetectionFrame() 
	{
		SocketDetectionHandler.send();
	}
}
