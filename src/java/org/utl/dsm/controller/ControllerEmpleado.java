package org.utl.dsm.controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.util.List;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Date;
import org.utl.dsm.db.ConexionMysql;
import org.utl.dsm.model.Empleado;
import org.utl.dsm.model.Persona;
import org.utl.dsm.model.Sucursal;
import org.utl.dsm.model.Usuario;

public class ControllerEmpleado {

    public Empleado insertEmpleado(Empleado e) {
        String query = "CALL insertarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);
            
            Persona persona = e.getPersona();
            Usuario usuario = e.getUsuario();
            Sucursal sucursal = e.getSucursal();
            
            // parametros de entrada
              cstmt.setString(1, persona.getNombre());
            cstmt.setString(2, persona.getApellidoPaterno());
            cstmt.setString(3, persona.getApellidoMaterno());
            cstmt.setString(4, persona.getGenero());
            cstmt.setString(5, persona.getFechaNacimiento());
            cstmt.setString(6, persona.getRfc());
            cstmt.setString(7, persona.getCurp());
            cstmt.setString(8, persona.getDomicilio());
            cstmt.setString(9, persona.getCodigoPostal());
            cstmt.setString(10, persona.getCiudad());
            cstmt.setString(11, persona.getEstado());
            cstmt.setString(12, persona.getTelefono());
            cstmt.setString(13, persona.getFoto());
            cstmt.setInt(14, sucursal.getIdSucursal());
            cstmt.setString(15, usuario.getRol());
            cstmt.setString(16, e.getPuesto());
            cstmt.setFloat(17, e.getSalarioBruto());
            
            // recuperar valores de salida
             cstmt.registerOutParameter(18, java.sql.Types.INTEGER); // var_idPersona
            cstmt.registerOutParameter(19, java.sql.Types.INTEGER); // var_idUsuario
            cstmt.registerOutParameter(20, java.sql.Types.INTEGER); // var_idEmpleado
            cstmt.registerOutParameter(21, java.sql.Types.VARCHAR); // var_codigoEmpleado
            
              // Ejecutar el procedimiento almacenado
            cstmt.execute();

            // Aquí puedes acceder a los valores de salida si es necesario
            cstmt.close();
            conn.close();
            connMySQL.close();

            return e;

        } catch (Exception ex) {
            ex.printStackTrace();
            return e;
        }
    }
    
      public List<Empleado> getAll() throws SQLException {
        String sql = "SELECT * FROM VistaEmpleadoSucursal";
        // nos vamos a conectar a la Base de Datos:
        ConexionMysql connMySQL = new ConexionMysql();
        // Abrimos la conexion con la Base de Datos:
        Connection conn = connMySQL.open();
        // ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        // guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        List<Empleado> empleados = new ArrayList<>();
        while (rs.next()) {
            empleados.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return empleados;
    }
      private Empleado fill(ResultSet rs) throws SQLException {
    Empleado empleado = new Empleado();
    Persona p = new Persona();
    Sucursal s = new Sucursal();
    
    // datos de persona
    p.setNombre(rs.getString("nombrePersona"));
    p.setTelefono(rs.getString("telefono"));
    // datos de sucursal
    s.setNombreSucursal(rs.getString("nombreSucursal"));
   // datos de empleado
    empleado.setEstatus(rs.getInt("estatus"));
    empleado.setPuesto(rs.getString("puesto"));

        empleado.setPersona(p);
        empleado.setSucursal(s);

    return empleado;
}

}
