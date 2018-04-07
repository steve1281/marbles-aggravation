package com.sfalcigno;

import com.sfalcigno.models.ModelManager;
import com.sfalcigno.server.Server;

import java.io.IOException;

public class Main {
    public static void main(final String[] args) {
        ModelManager.getInstance(); // init.
        try {
            Server.startServer(Constants.PORT);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
