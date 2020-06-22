package com.tcc.CrowdVision.Controller.WebSocket;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Configurable
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new SocketDetectionHandler(), "/detections-wb").setAllowedOrigins("*");
	}
	
	@Bean
    public HandshakeInterceptor socketInterceptor() {
        return new HandshakeInterceptor() {
            public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, 
                  WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

                // Get the URI segment corresponding to the auction id during handshake
                String path = request.getURI().getPath();
                String userId = path.substring(path.lastIndexOf('/') + 1);
                
                // This will be added to the websocket session
                attributes.put("userId", userId);
                attributes.put("connectionTime", new Date());
                
                return true;
            }

            public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, 
                    WebSocketHandler wsHandler, Exception exception) {
                // Nothing to do after handshake
            }
        };
    }
}
