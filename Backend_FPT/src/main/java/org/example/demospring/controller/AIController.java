package org.example.demospring.controller;

import org.example.demospring.dto.request.ChatRequest;
import org.example.demospring.dto.response.ChatResponse;
import org.example.demospring.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        String reply = geminiService.generateContent(request.getMessage());
        return ResponseEntity.ok(new ChatResponse(reply));
    }
}
