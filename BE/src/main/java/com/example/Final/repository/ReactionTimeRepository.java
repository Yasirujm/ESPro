package com.example.Final.repository;

import com.example.Final.model.ReactionTime;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ReactionTimeRepository extends JpaRepository<ReactionTime, Long> {

    List<ReactionTime> findAllByOrderByReactionTimeAsc();

    // Best reaction time by username
    Optional<ReactionTime> findTopByUsernameOrderByReactionTimeAsc(String username);

    // Worst reaction time by username
    Optional<ReactionTime> findTopByUsernameOrderByReactionTimeDesc(String username);
}

