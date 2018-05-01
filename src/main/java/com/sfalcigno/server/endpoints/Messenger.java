package com.sfalcigno.server.endpoints;

import com.sfalcigno.models.MessageBroadcast;
import com.sfalcigno.models.ModelManager;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("message")
public class Messenger
{
    @GET
    @Produces( { MediaType.APPLICATION_JSON })
    @Path("/getmessages")
    public MessageBroadcast get() {
        return ModelManager.getInstance().getMessages();
    }
}
