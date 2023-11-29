/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm.controller;


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



public class ControllerEmpleados {

    /**
     * Metodo que devuelve todos los registros de empelados No recive parametros
     *
     * @return:Lista de objetos Empleado
     */
    public List<Empleado> getAllEmpleados() {
        //Aqui va ña primera parte del paso 6
        List<Empleado> empleados = new ArrayList<>();
        try {
            //1) Crear la setencia SQL
            String query = "SELECT * FROM empleado";
            //2) Se establece la conexion con la base de datos
            ConexionMysql connMySQL = new ConexionMysql();
            //3) Se abre la conexion y devuelve un tipo conexion
            Connection conn = connMySQL.open();
            //4) Se genera el statement para enviar la consulta
            PreparedStatement pstm = conn.prepareStatement(query);
            //5.Se prepara un ResultSet para obtener la respuesta de la BD
            ResultSet rs = pstm.executeQuery();
            //6) Recorrer el rs y extraer los datos

            while (rs.next()) {
                Persona p = new Persona();
                Empleado e = new Empleado();
                Usuario u = new Usuario();
                Sucursal s = new Sucursal();
                
                e.setIdEmpleado(rs.getInt("idEmpleado"));
                e.setCodigo(rs.getString("codigo"));
                Date fechaIngreso = rs.getDate("fechaIngreso");
                e.setFechaIngreso(fechaIngreso);
                e.setPuesto(rs.getString("puesto"));
                e.setSalarioBruto(rs.getFloat("salarioBruto"));
                e.setActivo(rs.getInt("activo"));
                e.setEmail(rs.getString("email"));
                
                p.setIdPersona(rs.getInt("idPersona"));
                u.setIdUsuario(rs.getInt("idUsuario"));
                s.setIdSucursal(rs.getInt("idSucursal"));
                
                e.setPersona(p);
                e.setUsuario(u);
                e.setSucursal(s);
                
                empleados.add(e);

            }
            //7) Cerrar todos los objetos
            rs.close();
            pstm.close();
            conn.close();
            connMySQL.close();

        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        //8) Devolver la informacion
        return empleados;
    }

    public Empleado fill(String nombre, String apellidoPaterno, String apellidoMaterno, String genero, String fechaNacimiento, String rfc, String curp, String domicilio, String cp, String ciudad, String estado, String telefono, String foto, int idSucursal, String rol, String puesto, float salarioBruto) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public Empleado insertEmpleado(Empleado newEmpleado) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
