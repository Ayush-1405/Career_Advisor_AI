<<<<<<< HEAD
package com.advisor.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.advisor.dto.CareerSuggestionRequest;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONArray;
import org.json.JSONObject;

@Service
public class AIService {

    @Value("${wit.ai.token}")
    private String witAiToken;

    private static final String WIT_AI_API_URL = "https://api.wit.ai/message?v=20240701&q=";

    public String getCareerPrediction(String userMessage) {
        try {
            // Encode user message for URL
            String encodedMessage = URLEncoder.encode(userMessage, "UTF-8");
            String requestUrl = WIT_AI_API_URL + encodedMessage;

            // Create HTTP request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(requestUrl))
                    .header("Authorization", "Bearer " + witAiToken)
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            // Send HTTP request
            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Parse JSON response
            JSONObject json = new JSONObject(response.body());
            JSONArray intents = json.optJSONArray("intents");

            if (intents != null && !intents.isEmpty()) {
                String topIntent = intents.getJSONObject(0).optString("name");
                return "Suggested career path based on your input: " + topIntent;
            } else {
                return "Sorry, I couldn't identify a suitable career path from your input.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error while processing your request: " + e.getMessage();
        }
    }

	public String suggestCareerPath(CareerSuggestionRequest request) {
		// TODO Auto-generated method stub
		return null;
	}
}
=======
package com.advisor.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.advisor.dto.CareerSuggestionRequest;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONArray;
import org.json.JSONObject;

@Service
public class AIService {

    @Value("${wit.ai.token}")
    private String witAiToken;

    private static final String WIT_AI_API_URL = "https://api.wit.ai/message?v=20240701&q=";

    public String getCareerPrediction(String userMessage) {
        try {
            // Encode user message for URL
            String encodedMessage = URLEncoder.encode(userMessage, "UTF-8");
            String requestUrl = WIT_AI_API_URL + encodedMessage;

            // Create HTTP request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(requestUrl))
                    .header("Authorization", "Bearer " + witAiToken)
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            // Send HTTP request
            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Parse JSON response
            JSONObject json = new JSONObject(response.body());
            JSONArray intents = json.optJSONArray("intents");

            if (intents != null && !intents.isEmpty()) {
                String topIntent = intents.getJSONObject(0).optString("name");
                return "Suggested career path based on your input: " + topIntent;
            } else {
                return "Sorry, I couldn't identify a suitable career path from your input.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error while processing your request: " + e.getMessage();
        }
    }

	public String suggestCareerPath(CareerSuggestionRequest request) {
		// TODO Auto-generated method stub
		return null;
	}
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
