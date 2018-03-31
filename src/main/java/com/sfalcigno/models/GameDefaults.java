
package com.sfalcigno.models;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "start_player_one",
        "start_player_two",
        "start_player_three",
        "start_player_four",
        "the_center",
        "exit_center_player_one",
        "exit_center_player_two",
        "exit_center_player_three",
        "exit_center_player_four"
})
public class GameDefaults {

    @JsonProperty("start_player_one")
    private Integer startPlayerOne;
    @JsonProperty("start_player_two")
    private Integer startPlayerTwo;
    @JsonProperty("start_player_three")
    private Integer startPlayerThree;
    @JsonProperty("start_player_four")
    private Integer startPlayerFour;
    @JsonProperty("the_center")
    private Integer theCenter;
    @JsonProperty("exit_center_player_one")
    private Integer exitCenterPlayerOne;
    @JsonProperty("exit_center_player_two")
    private Integer exitCenterPlayerTwo;
    @JsonProperty("exit_center_player_three")
    private Integer exitCenterPlayerThree;
    @JsonProperty("exit_center_player_four")
    private Integer exitCenterPlayerFour;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("start_player_one")
    public Integer getStartPlayerOne() {
        return startPlayerOne;
    }

    @JsonProperty("start_player_one")
    public void setStartPlayerOne(Integer startPlayerOne) {
        this.startPlayerOne = startPlayerOne;
    }

    @JsonProperty("start_player_two")
    public Integer getStartPlayerTwo() {
        return startPlayerTwo;
    }

    @JsonProperty("start_player_two")
    public void setStartPlayerTwo(Integer startPlayerTwo) {
        this.startPlayerTwo = startPlayerTwo;
    }

    @JsonProperty("start_player_three")
    public Integer getStartPlayerThree() {
        return startPlayerThree;
    }

    @JsonProperty("start_player_three")
    public void setStartPlayerThree(Integer startPlayerThree) {
        this.startPlayerThree = startPlayerThree;
    }

    @JsonProperty("start_player_four")
    public Integer getStartPlayerFour() {
        return startPlayerFour;
    }

    @JsonProperty("start_player_four")
    public void setStartPlayerFour(Integer startPlayerFour) {
        this.startPlayerFour = startPlayerFour;
    }

    @JsonProperty("the_center")
    public Integer getTheCenter() {
        return theCenter;
    }

    @JsonProperty("the_center")
    public void setTheCenter(Integer theCenter) {
        this.theCenter = theCenter;
    }

    @JsonProperty("exit_center_player_one")
    public Integer getExitCenterPlayerOne() {
        return exitCenterPlayerOne;
    }

    @JsonProperty("exit_center_player_one")
    public void setExitCenterPlayerOne(Integer exitCenterPlayerOne) {
        this.exitCenterPlayerOne = exitCenterPlayerOne;
    }

    @JsonProperty("exit_center_player_two")
    public Integer getExitCenterPlayerTwo() {
        return exitCenterPlayerTwo;
    }

    @JsonProperty("exit_center_player_two")
    public void setExitCenterPlayerTwo(Integer exitCenterPlayerTwo) {
        this.exitCenterPlayerTwo = exitCenterPlayerTwo;
    }

    @JsonProperty("exit_center_player_three")
    public Integer getExitCenterPlayerThree() {
        return exitCenterPlayerThree;
    }

    @JsonProperty("exit_center_player_three")
    public void setExitCenterPlayerThree(Integer exitCenterPlayerThree) {
        this.exitCenterPlayerThree = exitCenterPlayerThree;
    }

    @JsonProperty("exit_center_player_four")
    public Integer getExitCenterPlayerFour() {
        return exitCenterPlayerFour;
    }

    @JsonProperty("exit_center_player_four")
    public void setExitCenterPlayerFour(Integer exitCenterPlayerFour) {
        this.exitCenterPlayerFour = exitCenterPlayerFour;
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
