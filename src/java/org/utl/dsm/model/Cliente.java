package org.utl.dsm.model;
//Crear modelo cliente que tiene dependencia del modelo persona  "idPersona".
public class Cliente {
    private Persona persona;
    private String email;
    private String fechaRegistro;
    private int estatus;

    public Cliente() {
    }

    public Cliente(Persona persona, String email, String fechaRegistro, int estatus) {
        this.persona = persona;
        this.email = email;
        this.fechaRegistro = fechaRegistro;
        this.estatus = estatus;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

   
}