package com.sfalcigno.server.endpoints;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sfalcigno.models.CurrentPlayer;
import com.sfalcigno.models.ModelManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("player")
public class Player {
    @GET
    @Produces( { MediaType.APPLICATION_JSON })
    @Path("/")
    public CurrentPlayer get() {
        return ModelManager.getInstance().getCurrentPlayer();
    }

    // curl -X PUT http://localhost:9998/player -H "Content-Type:application/json" -d @current_player.json
    // curl -X POST http://localhost:9998/player -H "Content-Type:application/json" -d @current_player.json
    // curl -X GET http://localhost:9998/player


    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(CurrentPlayer currentPlayer) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        ModelManager.getInstance().setCurrentPlayer(currentPlayer);
        String result = null;
        try {
            result = "Player update saved : " + ow.writeValueAsString(currentPlayer) + "\n";
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        ModelManager.getInstance().setCurrentPlayer(currentPlayer);
        return Response.status(201).entity(result).build();
    }

    @PUT
    @Consumes( MediaType.APPLICATION_JSON)
    @Path("/")
    public void put(CurrentPlayer currentPlayer) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            System.out.println("received:"+ ow.writeValueAsString(currentPlayer));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        ModelManager.getInstance().setCurrentPlayer(currentPlayer);
    }
}