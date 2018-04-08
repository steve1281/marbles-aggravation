package com.sfalcigno.models;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "player",
        "board_grid"
})
public class SimpleGameBoard implements Cloneable {
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
    @JsonProperty("player")
    private int player;
    @JsonProperty("board_grid")
    private int [][] boardGrid = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("player")
    public int getPlayer() {
        return player;
    }

    @JsonProperty("player")
    public void setPlayer(int player) {
        this.player = player;
    }

    @JsonProperty("board_grid")
    public int[][] getBoardGrid() {
        return boardGrid;
    }

    @JsonProperty("board_grid")
    public void setBoardGrid(int [][] boardGrid) {
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

    // https://stackoverflow.com/questions/2799755/rotate-array-clockwise
    public int[][] rotateCW() {
        int [][] mat = getBoardGrid();
        final int M = mat.length;
        final int N = mat[0].length;
        int[][] ret = new int[N][M];
        for (int r = 0; r < M; r++) {
            for (int c = 0; c < N; c++) {
                ret[c][M-1-r] = mat[r][c];
            }
        }
        return ret;
    }
}