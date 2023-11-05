package org.utl.dsm.db;

import java.sql.Connection;
import java.sql.DriverManager;

/**
*Created by DreamSoft
 * Juan Pablo Perez Fernandez
 * Alejandra Hernandez Sauceda
 * Joel Ezequiel Rodrigues Briones
 * Edgar Castillo Aguas
 */
public class ConexionMysql {

    Connection conn;

    public Connection open() {
        String user = "root";
        String password = "root";
        String url = "jdbc:mysql://127.0.0.1:3306/MedicamosTuVidaBD";
        String parametros = "?useSSL=false&useUnicode=true&characterEncoding=utf-8";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url + parametros, user, password);
            return conn;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void close() {
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("Excepción controlada.");
            }
        }
    }
}
