package com.streamhub.controller;

import com.streamhub.service.LiveKitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/livekit")
public class LiveKitController {
    @Autowired
    private LiveKitService liveKitService;

    @PostMapping("/token")
    public ResponseEntity<?> getToken(@RequestBody Map<String, String> req) {
        String userId = req.get("userId");
        String roomName = req.get("roomName");
        String role = req.getOrDefault("role", "viewer");
        String token = liveKitService.generateAccessToken(userId, roomName, role);
        return ResponseEntity.ok(Map.of("token", token));
    }
}
