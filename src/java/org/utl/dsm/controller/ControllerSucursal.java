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

    public Sucursal insertSucursal(Sucursal s) {
        String query = "CALL insertarSucursal(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

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

            System.out.println(
                    "Nombre: " + s.getNombreSucursal()
                    + ", Titular: " + s.getTitular()
                    + ", RFC: " + s.getRfc()
                    + ", Domicilio: " + s.getDomicilio()
                    + ", Colonia: " + s.getColonia()
                    + ", Código Postal: " + s.getCodigoPostal()
                    + ", Ciudad: " + s.getCiudad()
                    + ", Estado: " + s.getEstado()
                    + ", Teléfono: " + s.getTelefono()
                    + ", Latitud: " + s.getLatitud()
                    + ", Longitud: " + s.getLongitud()
            );

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



    public List<Sucursal> getAll() throws SQLException {
       String query = "SELECT idSucursal, nombre, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud, estatus FROM vista_sucursales;";
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
    sucursal.setNombreSucursal(rs.getString("nombre"));
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
