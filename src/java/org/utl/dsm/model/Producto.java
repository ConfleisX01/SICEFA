package org.utl.dsm.model;

public class Producto {
    private int idProducto;
    private String nombre;
    private String nombreGenerico;
    private String formaFarmaceutica;
    private String unidadMedida;
    private String presentacion;
    private String principalIndicacion;
    private String contraindicaciones;
    private String concentracion;
    private int unidadesEnvase;
    private float precioCompra;
    private float precioVenta;
    private String foto;
    private String rutaFoto;
    private String codigoBarras;
    private int estatus;

    public Producto() {
    }

    public Producto(int idProducto, String nombre, String nombreGenerico, String formaFarmaceutica, String unidadMedida, String presentacion, String principalIndicacion, String contraindicaciones, String concentracion, int unidadesEnvase, float precioCompra, float precioVenta, String foto, String rutaFoto, String codigoBarras, int estatus) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.nombreGenerico = nombreGenerico;
        this.formaFarmaceutica = formaFarmaceutica;
        this.unidadMedida = unidadMedida;
        this.presentacion = presentacion;
        this.principalIndicacion = principalIndicacion;
        this.contraindicaciones = contraindicaciones;
        this.concentracion = concentracion;
        this.unidadesEnvase = unidadesEnvase;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.foto = foto;
        this.rutaFoto = rutaFoto;
        this.codigoBarras = codigoBarras;
        this.estatus = estatus;
    }
    
}
