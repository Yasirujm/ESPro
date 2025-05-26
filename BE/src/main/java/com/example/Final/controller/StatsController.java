package com.example.Final.controller;

import com.example.Final.dto.StatsSummaryDTO;
import com.example.Final.model.Gridshot;
import com.example.Final.model.ReactionTime;
import com.example.Final.model.Sixshot;
import com.example.Final.repository.GridshotRepository;
import com.example.Final.repository.ReactionTimeRepository;
import com.example.Final.repository.SixshotRepository;
import com.example.Final.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:3000")
public class StatsController {

    @Autowired
    private ReactionTimeRepository reactionTimeRepository;

    @Autowired
    private GridshotRepository gridshotRepository;

    @Autowired
    private SixshotRepository sixshotRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/analyze")
    public ResponseEntity<?> analyzeStats(HttpSession session) {
        Long userId = (Long) session.getAttribute("loggedInUser");

        if (userId == null) {
            return ResponseEntity.status(401).body("User not logged in");
        }

        // Fetch username from userId (implement this in your UserService)
        String username = userService.getUsernameById(userId);
        if (username == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // Fetch best/worst ReactionTime
        ReactionTime bestReaction = reactionTimeRepository.findTopByUsernameOrderByReactionTimeAsc(username).orElse(null);
        ReactionTime worstReaction = reactionTimeRepository.findTopByUsernameOrderByReactionTimeDesc(username).orElse(null);

        // Fetch best/worst Gridshot Time to Kill
        Gridshot bestGridTime = gridshotRepository.findTopByUsernameOrderByTtkAsc(username).orElse(null);
        Gridshot worstGridTime = gridshotRepository.findTopByUsernameOrderByTtkDesc(username).orElse(null);

        // Fetch best/worst Gridshot Accuracy
        Gridshot bestGridAcc = gridshotRepository.findTopByUsernameOrderByAccuracyDesc(username).orElse(null);
        Gridshot worstGridAcc = gridshotRepository.findTopByUsernameOrderByAccuracyAsc(username).orElse(null);

        // Fetch best/worst Gridshot Score
        Gridshot bestGridScore = gridshotRepository.findTopByUsernameOrderByScoreDesc(username).orElse(null);
        Gridshot worstGridScore = gridshotRepository.findTopByUsernameOrderByScoreAsc(username).orElse(null);

        // Fetch best/worst Sixshot Time to Kill
        Sixshot bestSixTime = sixshotRepository.findTopByUsernameOrderByTtkAsc(username).orElse(null);
        Sixshot worstSixTime = sixshotRepository.findTopByUsernameOrderByTtkDesc(username).orElse(null);

        // Fetch best/worst Sixshot Accuracy
        Sixshot bestSixAcc = sixshotRepository.findTopByUsernameOrderByAccuracyDesc(username).orElse(null);
        Sixshot worstSixAcc = sixshotRepository.findTopByUsernameOrderByAccuracyAsc(username).orElse(null);

        // Fetch best/worst Sixshot Score
        Sixshot bestSixScore = sixshotRepository.findTopByUsernameOrderByScoreDesc(username).orElse(null);
        Sixshot worstSixScore = sixshotRepository.findTopByUsernameOrderByScoreAsc(username).orElse(null);

        // Build the DTO
        StatsSummaryDTO summary = new StatsSummaryDTO(
                bestReaction, worstReaction,
                bestGridTime, worstGridTime,
                bestGridAcc, worstGridAcc,
                bestGridScore, worstGridScore,
                bestSixTime, worstSixTime,
                bestSixAcc, worstSixAcc,
                bestSixScore, worstSixScore
        );

        // Return as JSON
        return ResponseEntity.ok(summary);
    }
}
