package com.sfalcigno.models;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@JsonPropertyOrder({ "board_grid" })
public class SimpleGameBoard {

    @JsonProperty("board_grid")
    private List<List<Integer>> boardGrid = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("board_grid")
    public List<List<Integer>> getBoardGrid() {
        return boardGrid;
    }

    @JsonProperty("board_grid")
    public void setBoardGrid(List<List<Integer>> boardGrid) {
        this.boardGrid = boardGrid;
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