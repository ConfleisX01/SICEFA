package org.utl.dsm.controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.ResultSetMetaData;
import java.sql.Connection;
import java.sql.PreparedStatement;
import org.utl.dsm.db.ConexionMysql;
import org.utl.dsm.model.Sucursal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ControllerSucursal {

    // METODO PARA ELIMINAR UNA SUCURSAL
    public Sucursal insertSucursal(Sucursal s) {
        String query = "CALL insertarSucursal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        if (s == null) {
            System.out.println(s);
        }
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);

            // Establecer los parámetros de entrada
            cstmt.setString(1, s.getNombreSucursal());
            cstmt.setString(2, s.getTitular());
            cstmt.setString(3, s.getRfc());
            cstmt.setString(4, s.getDomicilio());
            cstmt.setString(5, s.getColonia());
            cstmt.setString(6, s.getCodigoPostal());
            cstmt.setString(7, s.getCiudad());
            cstmt.setString(8, s.getEstado());
            cstmt.setString(9, s.getTelefono());
            cstmt.setString(10, s.getLatitud());
            cstmt.setString(11, s.getLongitud());

            // Registrar los parámetros de salida antes de ejecutar el procedimiento almacenado
            cstmt.registerOutParameter(12, java.sql.Types.INTEGER); // var_idSucursal
            cstmt.registerOutParameter(13, java.sql.Types.INTEGER); // var_idPersona
            cstmt.registerOutParameter(14, java.sql.Types.INTEGER); // var_idUsuario
            cstmt.registerOutParameter(15, java.sql.Types.INTEGER); // var_idEmpleado
            cstmt.registerOutParameter(16, java.sql.Types.VARCHAR); // var_codigoEmpleado
            cstmt.registerOutParameter(17, java.sql.Types.VARCHAR); // var_nombreUsuario
            cstmt.registerOutParameter(18, java.sql.Types.VARCHAR); // var_contrasenia

            // Ejecutar el procedimiento almacenado
            cstmt.execute();

            // Aquí puedes acceder a los valores de salida si es necesario
            cstmt.close();
            conn.close();
            connMySQL.close();

            return s;

        } catch (Exception ex) {
            ex.printStackTrace();
            return s;
        }
    }
// METODO PARA MODIFICAR UNA SUCURSAL
    public void modificarSucursal(Sucursal s) {
        String query = "CALL modificarSucursal(?,?,?,?,?,?,?,?,?,?,?,?)";

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);

            // Establecer los parámetros de entrada
            cstmt.setInt(1, s.getIdSucursal());
            cstmt.setString(2, s.getNombreSucursal());
            cstmt.setString(3, s.getTitular());
            cstmt.setString(4, s.getRfc());
            cstmt.setString(5, s.getDomicilio());
            cstmt.setString(6, s.getColonia());
            cstmt.setString(7, s.getCodigoPostal());
            cstmt.setString(8, s.getCiudad());
            cstmt.setString(9, s.getEstado());
            cstmt.setString(10, s.getTelefono());
            cstmt.setDouble(11, Double.parseDouble(s.getLatitud()));
            cstmt.setDouble(12, Double.parseDouble(s.getLongitud()));

            // Ejecutar el procedimiento almacenado
            cstmt.execute();

            // Cerrar recursos
            cstmt.close();
            conn.close();
            connMySQL.close();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public void eliminarSucursal(Sucursal s){
        String query = "CALL eliminarSucursal(?);";
        
          try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);
            
            cstmt.setInt(1, s.getIdSucursal());
            
               // Ejecutar el procedimiento almacenado
            cstmt.execute();

            // Cerrar recursos
            cstmt.close();
            conn.close();
            connMySQL.close();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    
    public List<Sucursal> getAll() throws SQLException {
        String query = "SELECT * FROM vistaSucursal;";
        ConexionMysql connMySql = new ConexionMysql();
        Connection conn = connMySql.open();
        PreparedStatement pstmt = conn.prepareStatement(query);
        ResultSet rs = pstmt.executeQuery();
        List<Sucursal> sucursal = new ArrayList<>();
        while (rs.next()) {
            sucursal.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySql.close();
        return sucursal;
    }

    private Sucursal fill(ResultSet rs) throws SQLException {
        Sucursal sucursal = new Sucursal();

        // Obtén los nombres de las columnas
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();

        for (int i = 1; i <= columnCount; i++) {
            System.out.println("Column name: " + metaData.getColumnName(i));
        }

        // Llena la sucursal con los datos del ResultSet
        sucursal.setIdSucursal(rs.getInt("idSucursal"));
        sucursal.setNombreSucursal(rs.getString("nombreSucursal"));
        sucursal.setTitular(rs.getString("titular"));
        sucursal.setRfc(rs.getString("rfc"));
        sucursal.setDomicilio(rs.getString("domicilio"));
        sucursal.setColonia(rs.getString("colonia"));
        sucursal.setCodigoPostal(rs.getString("codigoPostal"));
        sucursal.setCiudad(rs.getString("ciudad"));
        sucursal.setEstado(rs.getString("estado"));
        sucursal.setTelefono(rs.getString("telefono"));
        sucursal.setLatitud(rs.getString("latitud"));
        sucursal.setLongitud(rs.getString("longitud"));
        sucursal.setEstatus(rs.getInt("estatus"));

        return sucursal;
    }

}