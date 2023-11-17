package org.utl.dsm.controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.db.ConexionMysql;
import org.utl.dsm.model.Cliente;
import org.utl.dsm.model.Persona;

public class ControllerCliente {

    public Cliente insertCliente(Cliente c) {
        String query = "CALL sp_insert_cliente(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);

            //pasar los parametros al query
            cstmt.setString(1, c.getPersona().getNombre());
            cstmt.setString(2, c.getPersona().getApellidoPaterno());
            cstmt.setString(3, c.getPersona().getApellidoMaterno());
            cstmt.setString(4, c.getPersona().getGenero());
            cstmt.setString(5, c.getPersona().getFechaNacimiento());
            cstmt.setString(6, c.getPersona().getRfc());
            cstmt.setString(7, c.getPersona().getCurp());
            cstmt.setString(8, c.getPersona().getDomicilio());
            cstmt.setString(9, c.getPersona().getCodigoPostal());
            cstmt.setString(10, c.getPersona().getCiudad());
            cstmt.setString(11, c.getPersona().getEstado());
            cstmt.setString(12, c.getPersona().getTelefono());
            cstmt.setString(13, c.getPersona().getFoto());
            cstmt.setString(14, c.getEmail());
            cstmt.setString(15, c.getFechaRegistro());
            cstmt.setInt(16, c.getEstatus());

            cstmt.execute();

            //Cerrar todas las instancias abiertas hacia la base de datos
            cstmt.close();
            conn.close();
            connMySQL.close();
            return c;
        } catch (Exception ex) {
            ex.printStackTrace();
            return c;
        }
    }
    public List<Cliente> getAll() throws SQLException{
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM view_cliente";
        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMysql connMySQL = new ConexionMysql();
        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        List<Cliente> cliente = new ArrayList<>();
        while (rs.next()) {
            cliente.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return cliente;
    }
    public Cliente fill(ResultSet rs) throws SQLException{
        Cliente c = new Cliente();
        c.setEmail(rs.getString("email"));
        c.setFechaRegistro(rs.getString("fechaRegistro"));
        c.setEstatus(rs.getInt("estatus"));
        Persona p = new Persona();
        p.setIdPersona(rs.getInt("idPersona"));
        p.setNombre(rs.getString("nombre"));
        p.setApellidoPaterno(rs.getString("apellidoPaterno"));
        p.setApellidoMaterno(rs.getString("apellidoMaterno"));
        p.setGenero(rs.getString("genero"));
        p.setFechaNacimiento("fechaNacimiento");
        p.setRfc(rs.getString("rfc"));
        p.setCurp(rs.getString("curp"));
        p.setDomicilio(rs.getString("domicilio"));
        p.setCodigoPostal(rs.getString("codigoPostal"));
        p.setCiudad(rs.getString("ciudad"));
        p.setEstado(rs.getString("estado"));
        p.setTelefono(rs.getString("telefono"));
        p.setFoto(rs.getString("foto"));
        c.setPersona(p);
        return c;
    } 
}
