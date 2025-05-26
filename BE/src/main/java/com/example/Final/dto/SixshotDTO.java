package com.example.Final.dto;

public class SixshotDTO {
    private double ttk;
    private int score;
    private double accuracy;
    private String playedAt;

    // Getters and setters
    public double getTtk() { return ttk; }
    public void setTtk(double ttk) { this.ttk = ttk; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public double getAccuracy() { return accuracy; }
    public void setAccuracy(double accuracy) { this.accuracy = accuracy; }

    public String getPlayedAt() { return playedAt; }
    public void setPlayedAt(String playedAt) { this.playedAt = playedAt; }
}
