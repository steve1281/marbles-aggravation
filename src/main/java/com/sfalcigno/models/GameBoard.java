package com.sfalcigno.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@JsonPropertyOrder({
        "in_play",
        "home_player_one",
        "home_player_two",
        "home_player_three",
        "home_player_four",
        "hoose_gow_player_one",
        "hoose_gow_player_two",
        "hoose_gow_player_three",
        "hoose_gow_player_four"
})
public class GameBoard {

    @JsonProperty("in_play")
    private List<Integer> inPlay = null;
    @JsonProperty("home_player_one")
    private List<Integer> homePlayerOne = null;
    @JsonProperty("home_player_two")
    private List<Integer> homePlayerTwo = null;
    @JsonProperty("home_player_three")
    private List<Integer> homePlayerThree = null;
    @JsonProperty("home_player_four")
    private List<Integer> homePlayerFour = null;
    @JsonProperty("hoose_gow_player_one")
    private List<Integer> hooseGowPlayerOne = null;
    @JsonProperty("hoose_gow_player_two")
    private List<Integer> hooseGowPlayerTwo = null;
    @JsonProperty("hoose_gow_player_three")
    private List<Integer> hooseGowPlayerThree = null;
    @JsonProperty("hoose_gow_player_four")
    private List<Integer> hooseGowPlayerFour = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("in_play")
    public List<Integer> getInPlay() {
        return inPlay;
    }

    @JsonProperty("in_play")
    public void setInPlay(List<Integer> inPlay) {
        this.inPlay = inPlay;
    }

    @JsonProperty("home_player_one")
    public List<Integer> getHomePlayerOne() {
        return homePlayerOne;
    }

    @JsonProperty("home_player_one")
    public void setHomePlayerOne(List<Integer> homePlayerOne) {
        this.homePlayerOne = homePlayerOne;
    }

    @JsonProperty("home_player_two")
    public List<Integer> getHomePlayerTwo() {
        return homePlayerTwo;
    }

    @JsonProperty("home_player_two")
    public void setHomePlayerTwo(List<Integer> homePlayerTwo) {
        this.homePlayerTwo = homePlayerTwo;
    }

    @JsonProperty("home_player_three")
    public List<Integer> getHomePlayerThree() {
        return homePlayerThree;
    }

    @JsonProperty("home_player_three")
    public void setHomePlayerThree(List<Integer> homePlayerThree) {
        this.homePlayerThree = homePlayerThree;
    }

    @JsonProperty("home_player_four")
    public List<Integer> getHomePlayerFour() {
        return homePlayerFour;
    }

    @JsonProperty("home_player_four")
    public void setHomePlayerFour(List<Integer> homePlayerFour) {
        this.homePlayerFour = homePlayerFour;
    }

    @JsonProperty("hoose_gow_player_one")
    public List<Integer> getHooseGowPlayerOne() {
        return hooseGowPlayerOne;
    }

    @JsonProperty("hoose_gow_player_one")
    public void setHooseGowPlayerOne(List<Integer> hooseGowPlayerOne) {
        this.hooseGowPlayerOne = hooseGowPlayerOne;
    }

    @JsonProperty("hoose_gow_player_two")
    public List<Integer> getHooseGowPlayerTwo() {
        return hooseGowPlayerTwo;
    }

    @JsonProperty("hoose_gow_player_two")
    public void setHooseGowPlayerTwo(List<Integer> hooseGowPlayerTwo) {
        this.hooseGowPlayerTwo = hooseGowPlayerTwo;
    }

    @JsonProperty("hoose_gow_player_three")
    public List<Integer> getHooseGowPlayerThree() {
        return hooseGowPlayerThree;
    }

    @JsonProperty("hoose_gow_player_three")
    public void setHooseGowPlayerThree(List<Integer> hooseGowPlayerThree) {
        this.hooseGowPlayerThree = hooseGowPlayerThree;
    }

    @JsonProperty("hoose_gow_player_four")
    public List<Integer> getHooseGowPlayerFour() {
        return hooseGowPlayerFour;
    }

    @JsonProperty("hoose_gow_player_four")
    public void setHooseGowPlayerFour(List<Integer> hooseGowPlayerFour) {
        this.hooseGowPlayerFour = hooseGowPlayerFour;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
