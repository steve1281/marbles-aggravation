package com.sfalcigno.server;

import com.sfalcigno.Constants;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.StaticHttpHandler;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.core.UriBuilder;
import java.io.IOException;
import java.net.URI;

public class Server {
    public static void startServer(int port) throws IOException
    {
        URI baseUri = UriBuilder.fromUri("http://0.0.0.0/").port(port).build();
        ResourceConfig resourceConfig = new ServerApp();
        HttpServer server = GrizzlyHttpServerFactory.createHttpServer(baseUri, resourceConfig, false);
        // add a static path
        server.getServerConfiguration().addHttpHandler(new StaticHttpHandler(Constants.HTML_ROOT), "/game");
        try {
            server.start();
            Thread.currentThread().join();
        } catch (Exception ioe) {
            System.err.println(ioe);
        } finally {
                server.stop();
        }
        //server.start();

        /*
        System.out.println("press any key to stop server");
        System.in.read();
        */
    }

}
