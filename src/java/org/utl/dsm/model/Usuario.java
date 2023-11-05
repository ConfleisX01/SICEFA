package org.utl.dsm.model;

/**
 * Created by DreamSoft Juan Pablo Perez Fernandez Alejandra Hernandez Sauceda
 * Joel Ezequiel Rodrigues Briones Edgar Castillo Aguas
 */
public class Usuario {

    private String nombreUsuario;
    private String contrasena;

    public Usuario(String nombreUsuario, String contrasena) {
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
