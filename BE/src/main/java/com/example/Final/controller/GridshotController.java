package com.example.Final.controller;

import com.example.Final.dto.GridshotDTO;
import com.example.Final.model.Gridshot;
import com.example.Final.model.User;
import com.example.Final.repository.GridshotRepository;
import com.example.Final.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gridshot")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class GridshotController {

    @Autowired
    private GridshotRepository gridshotRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitGridshot(
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

        Gridshot gridshot = new Gridshot(ttk, score, accuracy, user);

        gridshotRepository.save(gridshot);

        return ResponseEntity.ok("Gridshot saved successfully");
    }
}

