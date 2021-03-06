package com.sfalcigno;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public final class Constants {
    private Constants() { }

    public static Properties prop;
    public static final String ROOT ; 

    public static final String JSON_FOLDER;
    public static final Integer PORT;
    public static final String HTML_ROOT;
    public static final Boolean DEBUG=false;
    public static final String SAVE_GAME_FOLDER;


    static {
        try{
            FileInputStream file;
            file = new FileInputStream("./marbles.properties");
            prop = new Properties();
            prop.load(file);
            file.close();
        } catch(IOException ex){
            ex.printStackTrace();
        } catch(Exception ex){
            ex.printStackTrace();
        }
        String temp= System.getProperty("server.port"); // added to support heroku
        if (temp == null) {
            PORT = Integer.parseInt(prop.getProperty("PORT"));
        } else {
            PORT = Integer.parseInt(temp);
        }
        ROOT = prop.getProperty("ROOT");
        JSON_FOLDER = ROOT+"/json/";
        HTML_ROOT = ROOT+"/html";
        SAVE_GAME_FOLDER = ROOT+"/json/";
    }
}
