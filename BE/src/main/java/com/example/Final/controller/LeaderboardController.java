package com.example.Final.controller;

import com.example.Final.model.Gridshot;
import com.example.Final.model.Sixshot;
import com.example.Final.model.ReactionTime;
import com.example.Final.repository.GridshotRepository;
import com.example.Final.repository.SixshotRepository;
import com.example.Final.repository.ReactionTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    @Autowired
    private GridshotRepository gridshotRepository;

    @Autowired
    private SixshotRepository sixshotRepository;

    @Autowired
    private ReactionTimeRepository reactionTimeRepository;

    @GetMapping("/gridshot")
    public List<Map<String, Object>> getGridshotLeaderboard() {
        List<Gridshot> entries = gridshotRepository.findAllByOrderByScoreDesc();
        List<Map<String, Object>> result = new ArrayList<>();

        for (int i = 0; i < entries.size(); i++) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("rank", i + 1);
            entry.put("name", entries.get(i).getUsername());
            entry.put("score", entries.get(i).getScore());
            result.add(entry);
        }

        return result;
    }

    @GetMapping("/sixshot")
    public List<Map<String, Object>> getSixshotLeaderboard() {
        List<Sixshot> entries = sixshotRepository.findAllByOrderByScoreDesc();
        List<Map<String, Object>> result = new ArrayList<>();

        for (int i = 0; i < entries.size(); i++) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("rank", i + 1);
            entry.put("name", entries.get(i).getUsername());
            entry.put("score", entries.get(i).getScore());
            result.add(entry);
        }

        return result;
    }

    @GetMapping("/reactionTime")
    public List<Map<String, Object>> getReactionTimeLeaderboard() {
        List<ReactionTime> entries = reactionTimeRepository.findAllByOrderByReactionTimeAsc();
        List<Map<String, Object>> result = new ArrayList<>();

        for (int i = 0; i < entries.size(); i++) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("rank", i + 1);
            entry.put("name", entries.get(i).getUsername());
            entry.put("score", entries.get(i).getReactionTime());
            result.add(entry);
        }

        return result;
    }
}
