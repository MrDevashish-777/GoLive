package com.streamhub.service;

import com.streamhub.config.LiveKitConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class LiveKitService {
    @Autowired
    private LiveKitConfig config;

    public String generateAccessToken(String userId, String roomName, String role) {
        // LiveKit JWT payload
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", userId);
        claims.put("room", roomName);
        claims.put("video", true);
        claims.put("audio", true);
        claims.put("role", role); // e.g., "host", "co-host", "viewer"

        long now = System.currentTimeMillis();
        long exp = now + 60 * 60 * 1000; // 1 hour

        return Jwts.builder()
                .setClaims(claims)
                .setIssuer(config.apiKey)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(exp))
                .signWith(SignatureAlgorithm.HS256, config.apiSecret.getBytes())
                .compact();
    }
}
