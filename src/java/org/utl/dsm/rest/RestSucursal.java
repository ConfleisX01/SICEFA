package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm.controller.ControllerSucursal;
import org.utl.dsm.model.Sucursal;

/**
 * Clase para el servicio REST relacionado con la inserción de Sucursales.
 */
@Path("sucursal")
public class RestSucursal {

    @Path("insertarSucursal")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response insertSucursal(@FormParam("nombre") @DefaultValue("") String nombre,
            @FormParam("titular") @DefaultValue("") String titular,
            @FormParam("rfc") @DefaultValue("") String rfc,//
            @FormParam("domicilio") @DefaultValue("") String domicilio,
            @FormParam("colonia") @DefaultValue("") String colonia,
            @FormParam("codigoPostal") @DefaultValue("") String codigoPostal,//
            @FormParam("ciudad") @DefaultValue("") String ciudad,//
            @FormParam("estado") @DefaultValue("") String estado,//
            @FormParam("telefono") @DefaultValue("") String telefono,
            @FormParam("latitud") @DefaultValue("") String latitud,//
            @FormParam("longitud") @DefaultValue("") String longitud,
            @FormParam("estatus") @DefaultValue("") String estatus

    ) {
        ControllerSucursal cs = new ControllerSucursal();
        Sucursal s = cs.fill(nombre, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud,estatus);
        Sucursal newSucursal = cs.insertSucursal(s);
        Gson gson = new Gson();
        String out = gson.toJson(newSucursal);
        return Response.status(Response.Status.CREATED).entity(out).build();
    }

    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll() {
        String out = null;
        List<Sucursal> sucursales = null;
        ControllerSucursal cp = new ControllerSucursal();
        try {
            sucursales = cp.getAll();
            out = new Gson().toJson(sucursales);
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                      {"error" : "Ocurrio un error, Intente mas tarde."}
                      """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
