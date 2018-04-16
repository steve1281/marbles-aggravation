package com.sfalcigno.server.endpoints;


import com.sfalcigno.models.ModelManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("admin")
public class Admin {

    @PUT
    @Consumes( MediaType.APPLICATION_JSON)
    @Path("/initgame")
    public void put() {
        ModelManager.getInstance().Init();
    }

    @POST
    @Consumes( MediaType.APPLICATION_JSON)
    @Path("/savegame")
    public void post_save() {
       ModelManager.getInstance().saveGame("testgame.json");
    }
    @POST
    @Consumes( MediaType.APPLICATION_JSON)
    @Path("/loadgame")
    public void post_load() {
        ModelManager.getInstance().loadGame("testgame.json");
    }
}
