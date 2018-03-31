package com.sfalcigno.server;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("resources")
public class ServerApp extends ResourceConfig {
    public ServerApp() {
        packages("com.sfalcigno.server.endpoints");
        register(JacksonJsonProvider.class);
    }
}
