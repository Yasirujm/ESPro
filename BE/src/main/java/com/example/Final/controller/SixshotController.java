package com.example.Final.controller;

import com.example.Final.model.Sixshot;
import com.example.Final.model.User;
import com.example.Final.repository.SixshotRepository;
import com.example.Final.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sixshot")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SixshotController {

    @Autowired
    private SixshotRepository sixshotRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitSixshot(
            @RequestParam double ttk,
            @RequestParam int score,
            @RequestParam double accuracy,
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

        Sixshot sixshot = new Sixshot(ttk, score, accuracy, user);
        sixshotRepository.save(sixshot);

        return ResponseEntity.ok("Sixshot saved successfully");
    }
}
