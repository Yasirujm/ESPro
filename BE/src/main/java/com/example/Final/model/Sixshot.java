package com.example.Final.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sixshot")
public class Sixshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double ttk;
    private int score;
    private double accuracy;
    private LocalDateTime playedAt;

    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Sixshot() {}

    public Sixshot(double ttk, int score, double accuracy, User user) {
        this.ttk = ttk;
        this.score = score;
        this.accuracy = accuracy;
        this.user = user;
        this.username = user.getName(); // Ensure User has getName()
        this.playedAt = LocalDateTime.now();
    }

    // Getters and setters
    public Long getId() { return id; }

    public double getTtk() { return ttk; }
    public void setTtk(double ttk) { this.ttk = ttk; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public double getAccuracy() { return accuracy; }
    public void setAccuracy(double accuracy) { this.accuracy = accuracy; }

    public LocalDateTime getPlayedAt() { return playedAt; }
    public void setPlayedAt(LocalDateTime playedAt) { this.playedAt = playedAt; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
