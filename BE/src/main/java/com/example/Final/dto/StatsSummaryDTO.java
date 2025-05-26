package com.example.Final.dto;

import com.example.Final.model.Gridshot;
import com.example.Final.model.ReactionTime;
import com.example.Final.model.Sixshot;

public class StatsSummaryDTO {
    private ReactionTime bestReaction;
    private ReactionTime worstReaction;

    private Gridshot bestGridTime;
    private Gridshot worstGridTime;
    private Gridshot bestGridAcc;
    private Gridshot worstGridAcc;
    private Gridshot bestGridScore;
    private Gridshot worstGridScore;

    private Sixshot bestSixTime;
    private Sixshot worstSixTime;
    private Sixshot bestSixAcc;
    private Sixshot worstSixAcc;
    private Sixshot bestSixScore;
    private Sixshot worstSixScore;

    public StatsSummaryDTO() {
    }

    public StatsSummaryDTO(ReactionTime bestReaction, ReactionTime worstReaction,
                           Gridshot bestGridTime, Gridshot worstGridTime,
                           Gridshot bestGridAcc, Gridshot worstGridAcc,
                           Gridshot bestGridScore, Gridshot worstGridScore,
                           Sixshot bestSixTime, Sixshot worstSixTime,
                           Sixshot bestSixAcc, Sixshot worstSixAcc,
                           Sixshot bestSixScore, Sixshot worstSixScore) {
        this.bestReaction = bestReaction;
        this.worstReaction = worstReaction;
        this.bestGridTime = bestGridTime;
        this.worstGridTime = worstGridTime;
        this.bestGridAcc = bestGridAcc;
        this.worstGridAcc = worstGridAcc;
        this.bestGridScore = bestGridScore;
        this.worstGridScore = worstGridScore;
        this.bestSixTime = bestSixTime;
        this.worstSixTime = worstSixTime;
        this.bestSixAcc = bestSixAcc;
        this.worstSixAcc = worstSixAcc;
        this.bestSixScore = bestSixScore;
        this.worstSixScore = worstSixScore;
    }

    public ReactionTime getBestReaction() {
        return bestReaction;
    }

    public void setBestReaction(ReactionTime bestReaction) {
        this.bestReaction = bestReaction;
    }

    public ReactionTime getWorstReaction() {
        return worstReaction;
    }

    public void setWorstReaction(ReactionTime worstReaction) {
        this.worstReaction = worstReaction;
    }

    public Gridshot getBestGridTime() {
        return bestGridTime;
    }

    public void setBestGridTime(Gridshot bestGridTime) {
        this.bestGridTime = bestGridTime;
    }

    public Gridshot getWorstGridTime() {
        return worstGridTime;
    }

    public void setWorstGridTime(Gridshot worstGridTime) {
        this.worstGridTime = worstGridTime;
    }

    public Gridshot getBestGridAcc() {
        return bestGridAcc;
    }

    public void setBestGridAcc(Gridshot bestGridAcc) {
        this.bestGridAcc = bestGridAcc;
    }

    public Gridshot getWorstGridAcc() {
        return worstGridAcc;
    }

    public void setWorstGridAcc(Gridshot worstGridAcc) {
        this.worstGridAcc = worstGridAcc;
    }

    public Gridshot getBestGridScore() {
        return bestGridScore;
    }

    public void setBestGridScore(Gridshot bestGridScore) {
        this.bestGridScore = bestGridScore;
    }

    public Gridshot getWorstGridScore() {
        return worstGridScore;
    }

    public void setWorstGridScore(Gridshot worstGridScore) {
        this.worstGridScore = worstGridScore;
    }

    public Sixshot getBestSixTime() {
        return bestSixTime;
    }

    public void setBestSixTime(Sixshot bestSixTime) {
        this.bestSixTime = bestSixTime;
    }

    public Sixshot getWorstSixTime() {
        return worstSixTime;
    }

    public void setWorstSixTime(Sixshot worstSixTime) {
        this.worstSixTime = worstSixTime;
    }

    public Sixshot getBestSixAcc() {
        return bestSixAcc;
    }

    public void setBestSixAcc(Sixshot bestSixAcc) {
        this.bestSixAcc = bestSixAcc;
    }

    public Sixshot getWorstSixAcc() {
        return worstSixAcc;
    }

    public void setWorstSixAcc(Sixshot worstSixAcc) {
        this.worstSixAcc = worstSixAcc;
    }

    public Sixshot getBestSixScore() {
        return bestSixScore;
    }

    public void setBestSixScore(Sixshot bestSixScore) {
        this.bestSixScore = bestSixScore;
    }

    public Sixshot getWorstSixScore() {
        return worstSixScore;
    }

    public void setWorstSixScore(Sixshot worstSixScore) {
        this.worstSixScore = worstSixScore;
    }
}
