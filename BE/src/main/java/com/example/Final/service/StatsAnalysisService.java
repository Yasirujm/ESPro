package com.example.Final.service;

import com.example.Final.dto.StatsSummaryDTO;
import com.example.Final.model.Gridshot;
import com.example.Final.model.ReactionTime;
import com.example.Final.model.Sixshot;
import com.example.Final.repository.GridshotRepository;
import com.example.Final.repository.ReactionTimeRepository;
import com.example.Final.repository.SixshotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatsAnalysisService {

    @Autowired
    private ReactionTimeRepository reactionTimeRepository;

    @Autowired
    private GridshotRepository gridshotRepository;

    @Autowired
    private SixshotRepository sixshotRepository;

    public StatsSummaryDTO getBestAndWorstStats(String username) {
        // Reaction Time best/worst
        ReactionTime bestReaction = reactionTimeRepository.findTopByUsernameOrderByReactionTimeAsc(username).orElse(null);
        ReactionTime worstReaction = reactionTimeRepository.findTopByUsernameOrderByReactionTimeDesc(username).orElse(null);

        // Gridshot best/worst timeToKill
        Gridshot bestGridTime = gridshotRepository.findTopByUsernameOrderByTtkAsc(username).orElse(null);
        Gridshot worstGridTime = gridshotRepository.findTopByUsernameOrderByTtkDesc(username).orElse(null);

        // Gridshot best/worst accuracy
        Gridshot bestGridAcc = gridshotRepository.findTopByUsernameOrderByAccuracyDesc(username).orElse(null);
        Gridshot worstGridAcc = gridshotRepository.findTopByUsernameOrderByAccuracyAsc(username).orElse(null);

        // Gridshot best/worst score
        Gridshot bestGridScore = gridshotRepository.findTopByUsernameOrderByScoreDesc(username).orElse(null);
        Gridshot worstGridScore = gridshotRepository.findTopByUsernameOrderByScoreAsc(username).orElse(null);

        // Sixshot best/worst timeToKill
        Sixshot bestSixTime = sixshotRepository.findTopByUsernameOrderByTtkAsc(username).orElse(null);
        Sixshot worstSixTime = sixshotRepository.findTopByUsernameOrderByTtkDesc(username).orElse(null);

        // Sixshot best/worst accuracy
        Sixshot bestSixAcc = sixshotRepository.findTopByUsernameOrderByAccuracyDesc(username).orElse(null);
        Sixshot worstSixAcc = sixshotRepository.findTopByUsernameOrderByAccuracyAsc(username).orElse(null);

        // Sixshot best/worst score
        Sixshot bestSixScore = sixshotRepository.findTopByUsernameOrderByScoreDesc(username).orElse(null);
        Sixshot worstSixScore = sixshotRepository.findTopByUsernameOrderByScoreAsc(username).orElse(null);

        // Package all into DTO and return
        return new StatsSummaryDTO(
                bestReaction, worstReaction,
                bestGridTime, worstGridTime,
                bestGridAcc, worstGridAcc,
                bestGridScore, worstGridScore,
                bestSixTime, worstSixTime,
                bestSixAcc, worstSixAcc,
                bestSixScore, worstSixScore
        );
    }
}
