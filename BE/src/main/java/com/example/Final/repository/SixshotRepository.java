package com.example.Final.repository;

import com.example.Final.model.Sixshot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SixshotRepository extends JpaRepository<Sixshot, Long> {

    List<Sixshot> findAllByOrderByScoreDesc();

    // Best and worst Score by username
    Optional<Sixshot> findTopByUsernameOrderByScoreDesc(String username);
    Optional<Sixshot> findTopByUsernameOrderByScoreAsc(String username);

    // Best and worst Accuracy by username
    Optional<Sixshot> findTopByUsernameOrderByAccuracyDesc(String username);
    Optional<Sixshot> findTopByUsernameOrderByAccuracyAsc(String username);

    // Best and worst Time To Kill by username
    Optional<Sixshot> findTopByUsernameOrderByTtkAsc(String username);
    Optional<Sixshot> findTopByUsernameOrderByTtkDesc(String username);
}
