package com.sfalcigno.server.endpoints;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sfalcigno.Constants;
import com.sfalcigno.models.CurrentPlayer;
import com.sfalcigno.models.GameBoard;
import com.sfalcigno.models.ModelManager;
import com.sfalcigno.models.SimpleGameBoard;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("simpleboard")
public class SimpleBoard {
    @GET
    @Produces( { MediaType.APPLICATION_JSON })
    @Path("/")
    public SimpleGameBoard get(
        @QueryParam("player") final int playerid )
    {
        // clone the board before rotates; we dont want to modify the model.
        SimpleGameBoard board = null;
        try {
            board = (SimpleGameBoard)ModelManager.getInstance().getSimpleGameBoard().clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        board.setPlayer(playerid);
        switch(playerid) {
            case 1: // red
                board.setBoardGrid(board.rotateCW());
                board.setBoardGrid(board.rotateCW());
                break;
            case 2: // green
                board.setBoardGrid(board.rotateCW());
                break;
            case 3: // blue
                break;
            case 4: //yellow
                board.setBoardGrid(board.rotateCW());
                board.setBoardGrid(board.rotateCW());
                board.setBoardGrid(board.rotateCW());
                break;
            default:
                break;
        }
        if ( Constants.DEBUG ) dumpBoard("sending ...", board);
        return board;
    }


    @PUT
    @Consumes( MediaType.APPLICATION_JSON)
    @Path("/")
    public void put(SimpleGameBoard board) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            if (Constants.DEBUG)  System.out.println("received:"+ ow.writeValueAsString(board ));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        switch (board.getPlayer()) {
            case 1: //red
                board.setBoardGrid(board.rotateCW());
                board.setBoardGrid(board.rotateCW());
                break;
            case 2: // green
                board.setBoardGrid(board.rotateCW());
                board.setBoardGrid(board.rotateCW());
                board.setBoardGrid(board.rotateCW());
                break;
            case 3: //blue
                break;
            case 4: // yellow
                board.setBoardGrid(board.rotateCW());
                break;
            default:
                break;
        }
        ModelManager.getInstance().setSimpleGameBoard(board);
    }

    private void dumpBoard(String message, SimpleGameBoard board)
    {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            System.out.println(message+ ow.writeValueAsString(board ));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}