package org.utl.dsm.controller;

import org.utl.dsm.model.Producto;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import org.utl.dsm.db.ConexionMysql;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.model.Inventario;

/**
 *
 * @author Confleis
 * Controlador para la logica de manejo de los productos o medicamentos
 */
public class ControllerProducto {
    
    /// Metodo para agregar un producto dentro de la tabla correspondiente
    public Producto insertProducto(Producto p) {
        String query = "CALL agregarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try {
            ConexionMysql connMySql = new ConexionMysql();
            Connection conn = connMySql.open();
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);
            
            cstmt.setString(1, p.getNombre());
            cstmt.setString(2, p.getNombreGenerico());
            cstmt.setString(3, p.getFormaFarmaceutica());
            cstmt.setString(4, p.getUnidadMedida());
            cstmt.setString(5, p.getPresentacion());
            cstmt.setString(6, p.getPrincipalIndicacion());
            cstmt.setString(7, p.getContraindicaciones());
            cstmt.setString(8, p.getConcentracion());
            cstmt.setInt(9, p.getUnidadesEnvase());
            cstmt.setFloat(10, p.getPrecioCompra());
            cstmt.setFloat(11, p.getPrecioVenta());
            cstmt.setString(12, p.getFoto());
            cstmt.setString(13, p.getRutaFoto());
            cstmt.setString(14, p.getCodigoBarras());
            cstmt.setInt(15, p.getInventario().getExistencias());
            cstmt.setInt(16, p.getInventario().getIdSucursal());
            cstmt.execute();
            
            cstmt.close();
            conn.close();
            connMySql.close();
            return p;
        } catch (Exception e) {
            e.printStackTrace();
            return p;
        }
    }
    
    /// Metodo para agregar todos los datos traidos desde la consulta a una estructura de datos para posteriormente retornar la lista
    public List<Producto> getAll() throws SQLException {
        String query = "SELECT * FROM vista_productos;";
        ConexionMysql connMySql = new ConexionMysql();
        Connection conn = connMySql.open();
        PreparedStatement pstmt = conn.prepareStatement(query);
        ResultSet rs = pstmt.executeQuery();
        List<Producto> producto = new ArrayList<>();
        while (rs.next()) {            
            producto.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySql.close();
        return producto;
    }
    
    /// Metodo para crear un objeto con los datos correspondientes al modelo con los datos de un ResultSet
    public Producto fill(ResultSet rs) throws SQLException {
        Producto p = new Producto();
        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombre(rs.getString("nombre"));
        p.setNombreGenerico(rs.getString("nombreGenerico"));
        p.setFormaFarmaceutica(rs.getString("formaFarmaceutica"));
        p.setUnidadMedida(rs.getString("unidadMedida"));
        p.setPresentacion(rs.getString("presentacion"));
        p.setPrincipalIndicacion(rs.getString("principalIndicacion"));
        p.setContraindicaciones(rs.getString("contraindicaciones"));
        p.setConcentracion(rs.getString("concentracion"));
        p.setUnidadesEnvase(rs.getInt("unidadesEnvase"));
        p.setPrecioCompra(rs.getFloat("precioCompra"));
        p.setPrecioVenta(rs.getFloat("precioVenta"));
        p.setFoto(rs.getString("foto"));
        p.setRutaFoto(rs.getString("rutaFoto"));
        p.setCodigoBarras(rs.getString("codigoBarras"));
        p.setEstatus(rs.getInt("estatus"));
        Inventario i = new Inventario();
        i.setIdInventario(rs.getInt("idInventario"));
        i.setIdSucursal(rs.getInt("idSucursal"));
        i.setExistencias(rs.getInt("existencias"));
        p.setInventario(i);
        return p;
    }
}