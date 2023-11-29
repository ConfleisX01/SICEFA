/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dsm.controller.ControllerEmpleados;
import org.utl.dsm.model.Empleado;

@Path("empleado")
public class RestEmpleado {

    @Path("insertarEmpleado")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response insertEmpleado(@FormParam("nombre") @DefaultValue("") String nombre,
            @FormParam("apellidoPaterno") @DefaultValue("") String apellidoPaterno,
            @FormParam("apellidoMaterno") @DefaultValue("") String apellidoMaterno,
            @FormParam("genero") @DefaultValue("") String genero,
            @FormParam("fechaNacimiento") String fechaNacimiento,
            @FormParam("rfc") @DefaultValue("") String rfc,
            @FormParam("curp") @DefaultValue("") String curp,
            @FormParam("domicilio") @DefaultValue("") String domicilio,
            @FormParam("cp") @DefaultValue("") String cp,
            @FormParam("ciudad") @DefaultValue("") String ciudad,
            @FormParam("estado") @DefaultValue("") String estado,
            @FormParam("telefono") @DefaultValue("") String telefono,
            @FormParam("foto") @DefaultValue("") String foto,
            @FormParam("idSucursal") @DefaultValue("0") int idSucursal,
            @FormParam("rol") @DefaultValue("") String rol,
            @FormParam("puesto") @DefaultValue("") String puesto,
            @FormParam("salarioBruto") @DefaultValue("0.0") float salarioBruto) {

        ControllerEmpleados cs = new ControllerEmpleados();
        Empleado newEmpleado = cs.fill(nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento,
                rfc, curp, domicilio, cp, ciudad, estado, telefono, foto, idSucursal, rol, puesto, salarioBruto);
        
        newEmpleado = cs.insertEmpleado(newEmpleado);
        Gson gson = new Gson();
        String out = gson.toJson(newEmpleado);
        return Response.status(Response.Status.CREATED).entity(out).build();
    }
}
