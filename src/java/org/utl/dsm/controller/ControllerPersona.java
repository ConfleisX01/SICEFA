package org.utl.dsm.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.utl.dsm.db.ConexionMysql;
import org.utl.dsm.model.Cliente;
import org.utl.dsm.model.Persona;

public class ControllerPersona {

    public Persona convertirAobjeto(String nombre, 
            String apellidoPaterno, 
            String apellidoMaterno, 
            String genero,
            String fechaNacimiento, 
            String rfc, 
            String curp, 
            String domicilio, 
            String codigoPostal, 
            String ciudad, 
            String estado,
            String telefono, 
            String foto) {
        Persona p = new Persona();

        p.setNombre(nombre);
        p.setApellidoPaterno(apellidoPaterno);
        p.setApellidoMaterno(apellidoMaterno);
        p.setGenero(genero);
        p.setFechaNacimiento(fechaNacimiento);
        p.setRfc(rfc);
        p.setCurp(curp);
        p.setDomicilio(domicilio);
        p.setCodigoPostal(codigoPostal);
        p.setCiudad(ciudad);
        p.setEstado(estado);
        p.setTelefono(telefono);
        p.setFoto(foto);
        return p;
    }

    public void insertPersona(String nombre, 
            String apellidoPaterno, 
            String apellidoMaterno, 
            String genero,
            String fechaNacimiento, 
            String rfc, 
            String curp, 
            String domicilio, 
            String codigoPostal, 
            String ciudad, 
            String estado,
            String telefono, 
            String foto) {

        String query = "INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, "
                + "rfc, curp, domicilio, codigoPostal, ciudad, estado, telefono, foto) VALUES"
                + "(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement cstmt = conn.prepareStatement(query);

            //pasar los parametros al query
            cstmt.setString(1, nombre);
            cstmt.setString(2, apellidoPaterno);
            cstmt.setString(3, apellidoMaterno);
            cstmt.setString(4, genero);
            cstmt.setString(5, fechaNacimiento);
            cstmt.setString(6, rfc);
            cstmt.setString(7, curp);
            cstmt.setString(8, domicilio);
            cstmt.setString(9, codigoPostal);
            cstmt.setString(10, ciudad);
            cstmt.setString(11, estado);
            cstmt.setString(12, telefono);
            cstmt.setString(13, foto);

            cstmt.execute();
            cstmt.close();
            connMySQL.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Persona insertObjeto(Persona p) {
        String query = "INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, "
                + "rfc, curp, domicilio, codigoPostal, ciudad, estado, telefono, foto) VALUES"
                + "(?,?,?,?,?,?,?,?,?,?,?,?,?)";

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            //Abrimos la conexión con la base de datos.
            Connection conn = connMySQL.open();
            //Con este objeto invocaremos al asistente para llenar el query
            PreparedStatement cstmt = conn.prepareStatement(query);
            //Establecemos lso parámetros de los datos personales en el orden 
            //en que los pide el procedimiento almacenado, comenzando en 1:

            //pasar los parametros al query
            cstmt.setString(1, p.getNombre());
            cstmt.setString(2, p.getApellidoPaterno());
            cstmt.setString(3, p.getApellidoMaterno());
            cstmt.setString(4, p.getGenero());
            cstmt.setString(5, p.getFechaNacimiento());
            cstmt.setString(6, p.getRfc());
            cstmt.setString(7, p.getCurp());
            cstmt.setString(8, p.getDomicilio());
            cstmt.setString(9, p.getCodigoPostal());
            cstmt.setString(10, p.getCiudad());
            cstmt.setString(11, p.getEstado());
            cstmt.setString(12, p.getTelefono());
            cstmt.setString(13, p.getTelefono());

            cstmt.execute();
            //Cerrar todas las instancias abiertas hacia la base de datos
            cstmt.close();
            conn.close();
            connMySQL.close();
            return p;
        } catch (Exception e) {
            e.printStackTrace();
            return p;
        }
    }

    public Persona fill(String nombre, 
            String apellidoPaterno, 
            String apellidoMaterno, 
            String genero,
            String fechaNacimiento, 
            String rfc, 
            String curp, 
            String domicilio, 
            String codigoPostal, 
            String ciudad, 
            String estado,
            String telefono, 
            String foto) {

        Persona p = new Persona();
        p.setNombre(nombre);
        p.setApellidoPaterno(apellidoPaterno);
        p.setApellidoMaterno(apellidoMaterno);
        p.setGenero(genero);
        p.setFechaNacimiento(fechaNacimiento);
        p.setRfc(rfc);
        p.setCurp(curp);
        p.setDomicilio(domicilio);
        p.setCodigoPostal(codigoPostal);
        p.setCiudad(ciudad);
        p.setEstado(estado);
        p.setTelefono(telefono);
        p.setFoto(foto);
        return p;
    }
   /* public void update(Persona p) throws SQLException {
        String query = "{CALL sp_update_persona(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        ConexionMysql connMysql = new ConexionMysql();
        Connection conn = connMysql.open();
        java.sql.CallableStatement cstm = conn.prepareCall(query);
        cstm.setInt(1, p.getIdPersona());
        cstm.setString(2, p.getNombre());
        cstm.setString(3, p.getApellidoPaterno());
        cstm.setString(4, p.getApellidoMaterno());
        cstm.setString(5, p.getGenero());
        cstm.setString(6, p.getFechaNacimiento());
        cstm.setString(7, p.getRfc());
        cstm.setString(8,p.getCurp());
        cstm.setString(9,p.getDomicilio());
        cstm.setString(10, p.getCodigoPostal());
        cstm.setString(11,p.getCiudad());
        cstm.setString(12, p.getEstado());
        cstm.setString(13, p.getTelefono());
        cstm.setString(14,p.getFoto());

        //ejecutamos el PreparedStatement
        cstm.execute();
        //Cerramos todos nuestros objetos de conexión con el servidor.
        cstm.close();
        connMysql.close();
        conn.close();
    } */
}
