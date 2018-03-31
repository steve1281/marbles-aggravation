package com.sfalcigno.server.endpoints;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sfalcigno.models.CurrentPlayer;
import com.sfalcigno.models.GameBoard;
import com.sfalcigno.models.ModelManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("board")
public class Board {
    @GET
    @Produces( { MediaType.APPLICATION_JSON })
    @Path("/")
    public GameBoard get() {
        return ModelManager.getInstance().getGameBoard();
    }

    // curl -X POST http://localhost:9998/board -H "Content-Type:application/json" -d @set_game_board.json

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(GameBoard board ) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        ModelManager.getInstance().setGameBoard(board);
        String result = null;
        try {
            result = "Game Board update saved : " + ow.writeValueAsString(board) + "\n";
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        ModelManager.getInstance().setGameBoard(board);
        return Response.status(201).entity(result).build();
    }

    @PUT
    @Consumes( MediaType.APPLICATION_JSON)
    @Path("/")
    public void put(GameBoard board) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            System.out.println("received:"+ ow.writeValueAsString(board ));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        ModelManager.getInstance().setGameBoard(board);
    }
}
