package com.sfalcigno.server.endpoints;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
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
    public SimpleGameBoard get() {
        return ModelManager.getInstance().getSimpleGameBoard();
    }


    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(SimpleGameBoard board ) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        ModelManager.getInstance().setSimpleGameBoard(board);
        String result = null;
        try {
            result = "Game Board update saved : " + ow.writeValueAsString(board) + "\n";
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        ModelManager.getInstance().setSimpleGameBoard(board);
        return Response.status(201).entity(result).build();
    }

    @PUT
    @Consumes( MediaType.APPLICATION_JSON)
    @Path("/")
    public void put(SimpleGameBoard board) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            System.out.println("received:"+ ow.writeValueAsString(board ));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        ModelManager.getInstance().setSimpleGameBoard(board);
    }
}