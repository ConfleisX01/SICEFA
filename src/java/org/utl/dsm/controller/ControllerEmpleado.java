package org.utl.dsm.controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.util.List;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
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
    // metodo para modificar empleado

    public Empleado modificarEmpleado(Empleado e) {
        String query = "CALL modificarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);

            Persona persona = e.getPersona();
            Usuario usuario = e.getUsuario();
            Sucursal sucursal = e.getSucursal();

            // parametros de entrada
            cstmt.setInt(1, e.getIdEmpleado());
            cstmt.setString(2, persona.getNombre());
            cstmt.setString(3, persona.getApellidoPaterno());
            cstmt.setString(4, persona.getApellidoMaterno());
            cstmt.setString(5, persona.getGenero());
            cstmt.setString(6, persona.getFechaNacimiento());
            cstmt.setString(7, persona.getRfc());
            cstmt.setString(8, persona.getCurp());
            cstmt.setString(9, persona.getDomicilio());
            cstmt.setString(10, persona.getCodigoPostal());
            cstmt.setString(11, persona.getCiudad());
            cstmt.setString(12, persona.getEstado());
            cstmt.setString(13, persona.getTelefono());
            cstmt.setString(14, persona.getFoto());
            cstmt.setInt(15, sucursal.getIdSucursal());
            cstmt.setString(16, usuario.getRol());
            cstmt.setString(17, e.getPuesto());
            cstmt.setFloat(18, e.getSalarioBruto());

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
    
    // metodo para eliminar de manera lógica empleado
      public void eliminarEmpleado(Empleado e){
        String query = "CALL eliminarEmpleado(?);";
        
          try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);
            
            cstmt.setInt(1, e.getIdEmpleado());
            
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

    public List<Empleado> getAll() throws SQLException {
        String sql = "SELECT * FROM VistaEmpleado;";
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
        System.out.println(empleados);
        rs.close();
        pstmt.close();
        connMySQL.close();
        return empleados;
    }

   private Empleado fill(ResultSet rs) throws SQLException {
    Empleado empleado = new Empleado();
    Persona persona = new Persona();
    Usuario usuario = new Usuario();
    Sucursal sucursal = new Sucursal();

    // Datos de la persona
    persona.setIdPersona(rs.getInt("idPersona"));
    persona.setNombre(rs.getString("nombrePersona"));
    persona.setApellidoPaterno(rs.getString("apellidoPaterno"));
    persona.setApellidoMaterno(rs.getString("apellidoMaterno"));
    persona.setGenero(rs.getString("genero"));
    persona.setFechaNacimiento(rs.getString("fechaNacimientoPersona"));
    persona.setRfc(rs.getString("rfcPersona"));
    persona.setCurp(rs.getString("curpPersona"));
    persona.setDomicilio(rs.getString("domicilioPersona"));
    persona.setCodigoPostal(rs.getString("codigoPostalPersona"));
    persona.setCiudad(rs.getString("ciudadPersona"));
    persona.setEstado(rs.getString("estadoPersona"));
    persona.setTelefono(rs.getString("telefonoPersona"));
    persona.setFoto(rs.getString("fotoPersona"));

    // Datos del usuario
    usuario.setIdUsuario(rs.getInt("idUsuario"));
    usuario.setNombreUsuario(rs.getString("nombreUsuario"));
    usuario.setContrasenia(rs.getString("contrasenia"));
    usuario.setRol(rs.getString("rol"));

    // Datos de la sucursal
    sucursal.setIdSucursal(rs.getInt("idSucursal"));
    sucursal.setNombreSucursal(rs.getString("nombreSucursal"));
    sucursal.setTitular(rs.getString("titularSucursal"));
    sucursal.setRfc(rs.getString("rfcSucursal"));
    sucursal.setDomicilio(rs.getString("domicilioSucursal"));
    sucursal.setColonia(rs.getString("colonia"));
    sucursal.setCodigoPostal(rs.getString("codigoPostalSucursal"));
    sucursal.setCiudad(rs.getString("ciudadSucursal"));
    sucursal.setEstado(rs.getString("estadoSucursal"));
    sucursal.setTelefono(rs.getString("telefonoSucursal"));
    sucursal.setLatitud(rs.getString("latitud"));
    sucursal.setLongitud(rs.getString("longitud"));
    sucursal.setEstatus(rs.getInt("estatusSucursal"));

    // Datos del empleado
    empleado.setIdEmpleado(rs.getInt("idEmpleado"));
    empleado.setCodigo(rs.getString("codigo"));
    empleado.setFechaIngreso(rs.getString("fechaIngreso"));
    empleado.setPuesto(rs.getString("puesto"));
    empleado.setSalarioBruto(rs.getFloat("salarioBruto"));
    empleado.setActivo(rs.getInt("activo"));

    // Asignar objetos a empleado
    empleado.setPersona(persona);
    empleado.setUsuario(usuario);
    empleado.setSucursal(sucursal);
    
       System.out.println("nombre:" + rs.getString("nombrePersona"));
     System.out.println("ID Empleado: " + rs.getInt("idEmpleado"));
    System.out.println("Código: " + rs.getString("codigo"));

    return empleado;
}



}
