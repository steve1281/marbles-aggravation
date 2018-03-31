package com.sfalcigno;

import com.sfalcigno.server.Server;

import java.io.IOException;

public class Main {
    public static void main(final String[] args) {
        try {
            Server.startServer(Constants.PORT);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
