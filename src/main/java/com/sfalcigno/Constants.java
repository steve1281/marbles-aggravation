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
        PORT = Integer.parseInt(prop.getProperty("PORT"));
        ROOT = prop.getProperty("ROOT");
        JSON_FOLDER = ROOT+"/json/";
        HTML_ROOT = ROOT+"/html";
    }
}
