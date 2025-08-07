<<<<<<< HEAD
package com.advisor.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    @Value("${wit.ai.token}")
    private String witToken;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/ask")
    public ResponseEntity<?> processQuestion(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        if (question == null || question.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Question is required."));
        }

        String url = "https://api.wit.ai/message?v=20240717&q=" + question;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + witToken);
        headers.set("Accept", "application/json");

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(response.getStatusCode()).body("Wit.ai Error");
        }

        try {
            JsonNode json = objectMapper.readTree(response.getBody());

            // Extract the top intent (customize as per your trained wit.ai model)
            String intent = json.path("intents").isArray() && json.path("intents").size() > 0
                ? json.path("intents").get(0).path("name").asText()
                : null;

            String reply = "Sorry, I couldn't understand your question.";

            // You can customize replies based on intent
            if (intent != null) {
                switch (intent) {
                    case "career_suggestion":
                        reply = "Based on your interests, I suggest exploring a career in Software Development or Data Science.";
                        break;
                    case "freelancing":
                        reply = "You can start freelancing on platforms like Upwork or Fiverr using your Java and Web Dev skills.";
                        break;
                    case "startup_idea":
                        reply = "How about building an EdTech platform with AI-based content curation?";
                        break;
                    default:
                        reply = "I'm still learning! But I got the intent: " + intent;
                        break;
                }
            }

            Map<String, String> result = new HashMap<>();
            result.put("reply", reply);
            result.put("intent", intent);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to parse Wit.ai response.");
        }
    }
}
=======
package com.advisor.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    @Value("${wit.ai.token}")
    private String witToken;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/ask")
    public ResponseEntity<?> processQuestion(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        if (question == null || question.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Question is required."));
        }

        String url = "https://api.wit.ai/message?v=20240717&q=" + question;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + witToken);
        headers.set("Accept", "application/json");

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(response.getStatusCode()).body("Wit.ai Error");
        }

        try {
            JsonNode json = objectMapper.readTree(response.getBody());

            // Extract the top intent (customize as per your trained wit.ai model)
            String intent = json.path("intents").isArray() && json.path("intents").size() > 0
                ? json.path("intents").get(0).path("name").asText()
                : null;

            String reply = "Sorry, I couldn't understand your question.";

            // You can customize replies based on intent
            if (intent != null) {
                switch (intent) {
                    case "career_suggestion":
                        reply = "Based on your interests, I suggest exploring a career in Software Development or Data Science.";
                        break;
                    case "freelancing":
                        reply = "You can start freelancing on platforms like Upwork or Fiverr using your Java and Web Dev skills.";
                        break;
                    case "startup_idea":
                        reply = "How about building an EdTech platform with AI-based content curation?";
                        break;
                    default:
                        reply = "I'm still learning! But I got the intent: " + intent;
                        break;
                }
            }

            Map<String, String> result = new HashMap<>();
            result.put("reply", reply);
            result.put("intent", intent);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to parse Wit.ai response.");
        }
    }
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
