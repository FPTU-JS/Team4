package org.example.demospring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api_key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=";

    public String generateContent(String prompt) {
        String url = GEMINI_API_URL + geminiApiKey;

        // Custom prompt framing to keep the AI focused as a cooking assistant
        String framedPrompt = "You are an expert chef AI assistant named 'CO-CHE AI Chef Assistant' for a cooking website. " +
                "You provide helpful, concise, and accurate culinary advice, recipes, and cooking tips. " +
                "User's query: " + prompt;

        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> contents = new HashMap<>();
        Map<String, Object> parts = new HashMap<>();
        parts.put("text", framedPrompt);
        contents.put("parts", Collections.singletonList(parts));
        requestBody.put("contents", Collections.singletonList(contents));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            Map<String, Object> response = restTemplate.postForObject(url, requestEntity, Map.class);
            return extractTextFromResponse(response);
        } catch (Exception e) {
            e.printStackTrace();
            return "Xin lỗi, hiện tại tôi đang gặp chút sự cố kết nối. Vui lòng thử lại sau.";
        }
    }

    private String extractTextFromResponse(Map<String, Object> response) {
        if (response != null && response.containsKey("candidates")) {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            if (!candidates.isEmpty()) {
                Map<String, Object> candidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                if (!parts.isEmpty()) {
                    return (String) parts.get(0).get("text");
                }
            }
        }
        return "Xin lỗi, tôi không thể tìm thấy câu trả lời phù hợp.";
    }
}
