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
    public Response insertSucursal(@FormParam("sucursal") @DefaultValue("") String s) {
        String out = "";
        ControllerSucursal cp = new ControllerSucursal();
        Gson gson = new Gson();
        try {
            Sucursal sucursal = gson.fromJson(s, Sucursal.class);   
            cp.insertSucursal(sucursal);
            out = """
                  {"response": "%s"}
                  """;
            out = String.format(out, s);
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"response" : "Error en la transacción"}
                  """;
        }
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
