package org.utl.dsm.controller;

import org.utl.dsm.db.ConexionMysql;
import org.utl.dsm.model.Usuario;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ControllerUsuario {
    public Usuario loginUsuario(Usuario u) {
        String query = "SELECT * FROM usuario WHERE nombreUsuario = ? AND contrasena = ?";
        
        try {
            ConexionMysql connMySql = new ConexionMysql();
            Connection conn = connMySql.open();
            PreparedStatement cstmt = conn.prepareStatement(query);
            
            cstmt.setString(1, u.getNombreUsuario());
            cstmt.setString(2, u.getContrasena());
            
            cstmt.execute();
            
            cstmt.close();
            connMySql.close();
            conn.close();
            return u;
        } catch (Exception e) {
            e.printStackTrace();
            return u;
        }
    }
}
