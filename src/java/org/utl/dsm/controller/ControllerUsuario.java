package org.utl.dsm.controller;

import org.utl.dsm.db.ConexionMysql;
import org.utl.dsm.model.Usuario;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ControllerUsuario {

    public Usuario loginUsuario(String nombreUsuario, String contrasena) {
        String query = "SELECT * FROM usuario WHERE nombreUsuario = ? AND contrasena = ?";
        Usuario usuarioEncontrado = null;

        try {
            ConexionMysql connMySql = new ConexionMysql();
            Connection conn = connMySql.open();
            PreparedStatement cstmt = conn.prepareStatement(query);

            cstmt.setString(1, nombreUsuario);
            cstmt.setString(2, contrasena);

            ResultSet rs = cstmt.executeQuery();

            if (rs.next()) {
                usuarioEncontrado = new Usuario();
                usuarioEncontrado.setNombreUsuario(rs.getString("nombreUsuario"));
                usuarioEncontrado.setContrasena(rs.getString("contrasena"));
            }

            rs.close();
            cstmt.close();
            connMySql.close();
            conn.close();

            return usuarioEncontrado;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Usuario> getAll() throws SQLException {
        String sql = "SELECT * FROM usuario";
        ConexionMysql connMySql = new ConexionMysql();
        Connection conn = connMySql.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Usuario> usuarios = new ArrayList<>();
        while (rs.next()) {
            usuarios.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySql.close();
        return usuarios;
    }

    public Usuario fill(ResultSet rs) throws SQLException {
        Usuario u = new Usuario();
        u.setIdUsuario(rs.getInt("idUsuario"));
        u.setNombreUsuario(rs.getString("nombreUsuario"));
        u.setContrasena(rs.getString("contrasena"));
        return u;
    }
}
