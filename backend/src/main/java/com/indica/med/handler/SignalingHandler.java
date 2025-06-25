package com.indica.med.handler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class SignalingHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = getUserIdFromSession(session);
        sessions.put(userId, session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Chuyển tiếp thông điệp signaling đến người nhận
        JSONObject json = new JSONObject(message.getPayload());
        String targetId = json.getString("target");
        if (sessions.containsKey(targetId)) {
            sessions.get(targetId).sendMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.values().removeIf(s -> s.equals(session));
    }

    private String getUserIdFromSession(WebSocketSession session) {
        // Có thể lấy từ query params như ws://localhost:8080/ws?user=abc
        String query = session.getUri().getQuery(); // user=abc
        return query.split("=")[1];
    }
}
