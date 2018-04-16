package com.sfalcigno.models;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sfalcigno.Constants;


import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class ModelManager {
    private  static ModelManager instance = null;

    private  GameDefaults gameDefaults = null;
    private  GameBoard gameBoard = null;
    private  SimpleGameBoard simpleGameBoard = null;
    private  CurrentPlayer currentPlayer = null;

    protected ModelManager(){
        initialGameDefaults();
        initialCurrentPlayer();
        initialGameBoard();
        initialSimpleGameBoard();
    }

    public static ModelManager getInstance()
    {
        if (instance == null) {
            instance = new ModelManager();
        }
        return instance;
    }

    public void Init()
    {
        initialGameDefaults();
        initialCurrentPlayer();
        initialGameBoard();
        initialSimpleGameBoard();
    }

    private void initialSimpleGameBoard()
    {
        ObjectMapper objectMapper = new ObjectMapper();
        File file = new File(Constants.JSON_FOLDER+"simple_game_board.json");
        try {
            setSimpleGameBoard(objectMapper.readValue(file, SimpleGameBoard.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void initialGameBoard()
    {
        ObjectMapper objectMapper = new ObjectMapper();
        File file = new File(Constants.JSON_FOLDER+"game_board.json");
        try {
            gameBoard = objectMapper.readValue(file, GameBoard.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void loadGame(String filename)
    {
        ObjectMapper objectMapper = new ObjectMapper();
        File file = new File(Constants.SAVE_GAME_FOLDER+filename );
        try {
            simpleGameBoard = objectMapper.readValue(file, SimpleGameBoard.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void saveGame(String filename)
    {
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File(Constants.SAVE_GAME_FOLDER+filename),simpleGameBoard);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void initialCurrentPlayer()
    {
        ObjectMapper objectMapper = new ObjectMapper();
        File file = new File(Constants.JSON_FOLDER+"current_player.json");
        try {
            currentPlayer = objectMapper.readValue(file, CurrentPlayer.class );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void initialGameDefaults()
    {
        ObjectMapper objectMapper = new ObjectMapper();

        File file = new File(Constants.JSON_FOLDER+"game_defaults.json");

        try {
            gameDefaults = objectMapper.readValue(file, GameDefaults.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public GameBoard getGameBoard() {
        return gameBoard;
    }
    public void setGameBoard(GameBoard gameBoard) {
        this.gameBoard = gameBoard;
    }

    public GameDefaults getGameDefaults() {
        return gameDefaults;
    }
    public void setGameDefaults(GameDefaults gameDefaults) {
        this.gameDefaults = gameDefaults;
    }

    public CurrentPlayer getCurrentPlayer() {
        return currentPlayer;
    }
    public void setCurrentPlayer(CurrentPlayer currentPlayer){
        this.currentPlayer = currentPlayer;
    }


    public SimpleGameBoard getSimpleGameBoard() {
        return simpleGameBoard;
    }

    public void setSimpleGameBoard(SimpleGameBoard simpleGameBoard) {
        this.simpleGameBoard = simpleGameBoard;
    }
}
