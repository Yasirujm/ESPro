package com.example.Final.repository;

import com.example.Final.model.Gridshot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GridshotRepository extends JpaRepository<Gridshot, Long> {


    List<Gridshot> findAllByOrderByScoreDesc();

    Optional<Gridshot> findTopByUsernameOrderByScoreDesc(String username);
    Optional<Gridshot> findTopByUsernameOrderByScoreAsc(String username);

    Optional<Gridshot> findTopByUsernameOrderByAccuracyDesc(String username);
    Optional<Gridshot> findTopByUsernameOrderByAccuracyAsc(String username);

    Optional<Gridshot> findTopByUsernameOrderByTtkAsc(String username);
    Optional<Gridshot> findTopByUsernameOrderByTtkDesc(String username);
}
