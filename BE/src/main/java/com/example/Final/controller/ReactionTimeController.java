package com.example.Final.controller;

import com.example.Final.model.ReactionTime;
import com.example.Final.model.User;
import com.example.Final.repository.ReactionTimeRepository;
import com.example.Final.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reaction-time")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReactionTimeController {

    @Autowired
    private ReactionTimeRepository reactionTimeRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitReactionTime(
            @RequestParam long reactionTime,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("loggedInUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("User not logged in");
        }

        User user = userService.getUserById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        ReactionTime record = new ReactionTime(reactionTime, user);
        reactionTimeRepository.save(record);

        return ResponseEntity.ok("Reaction time saved successfully");
    }
}
