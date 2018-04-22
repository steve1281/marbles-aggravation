package com.sfalcigno.server.endpoints;


import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.net.URI;

@Path("")
public class Redirect {
    @POST
    @Path("/")
    public Response redirect() {
        URI location = URI.create("game/index.html");
        return Response.seeOther(location).build();
    }

    @GET
    @Path("/")
    public Response redirect_get() {
        URI location = URI.create("game/index.html");
        return Response.seeOther(location).build();
    }
}