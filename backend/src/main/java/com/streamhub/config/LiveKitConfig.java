package com.streamhub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LiveKitConfig {
    @Value("${livekit.api_key}")
    public String apiKey;

    @Value("${livekit.api_secret}")
    public String apiSecret;

    @Value("${livekit.url}")
    public String livekitUrl;
}
