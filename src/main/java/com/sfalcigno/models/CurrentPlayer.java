
package com.sfalcigno.models;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@JsonPropertyOrder({
        "current_player",
        "player_name",
        "last_roll"
})
public class CurrentPlayer {

    @JsonProperty("current_player")
    private Integer currentPlayer;
    @JsonProperty("player_name")
    private String playerName;
    @JsonProperty("last_roll")
    private Integer lastRoll;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("current_player")
    public Integer getCurrentPlayer() {
        return currentPlayer;
    }

    @JsonProperty("current_player")
    public void setCurrentPlayer(Integer currentPlayer) {
        this.currentPlayer = currentPlayer;
    }

    @JsonProperty("player_name")
    public String getPlayerName() {
        return playerName;
    }

    @JsonProperty("player_name")
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    @JsonProperty("last_roll")
    public Integer getLastRoll() {
        return lastRoll;
    }

    @JsonProperty("last_roll")
    public void setLastRoll(Integer lastRoll) {
        this.lastRoll = lastRoll;
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
