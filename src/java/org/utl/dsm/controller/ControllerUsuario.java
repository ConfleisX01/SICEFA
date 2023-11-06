package org.utl.dsm.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import org.utl.dsm.db.ConexionMysql;
import org.utl.dsm.model.Usuario;

/**
 * Created by DreamSoft Juan Pablo Perez Fernandez Alejandra Hernandez Sauceda
 * Joel Ezequiel Rodrigues Briones Edgar Castillo Aguas
 */
public class ControllerUsuario {

    public Usuario verificarUsuario(Usuario u) {
        String query = "Select * from WHERE nombreUsuario = ? AND contrasena = ?";

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement cstmt = conn.prepareStatement(query);

            cstmt.setString(1, u.getNombreUsuario());
            cstmt.setString(2, u.getContrasena());
            cstmt.close();
            conn.close();
            connMySQL.close();
            return u;

        } catch (Exception e) {
            e.printStackTrace();
            return u;
        }
    }
}
