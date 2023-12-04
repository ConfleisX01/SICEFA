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
import org.utl.dsm.controller.ControllerEmpleado;
import org.utl.dsm.model.Empleado;

@Path("empleado")
public class RestEmpleado {

    @Path("insertarEmpleado")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response insertEmpleado(@FormParam("empleado") @DefaultValue("") String e) {
        String out = "";
        
        ControllerEmpleado ce = new ControllerEmpleado();
        Gson gson = new Gson();
        try {
            // se formatea el objeto en json
            Empleado empleado = gson.fromJson(e, Empleado.class);
            ce.insertEmpleado(empleado);
             out = """
                  {"response" : %s}
                  """;
            out = String.format(out, e);
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                  {"response" : "Error en la transacción"}
                  """;
        }
        return Response.status(Response.Status.CREATED).entity(out).build();
    }
    
     @Path("modificarEmpleado")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response modificarEmpleado(@FormParam("empleado") @DefaultValue("") String e) {
        String out = "";
        
        ControllerEmpleado ce = new ControllerEmpleado();
        Gson gson = new Gson();
        try {
            // se formatea el objeto en json
            Empleado empleado = gson.fromJson(e, Empleado.class);
            ce.modificarEmpleado(empleado);
             out = """
                  {"response" : %s}
                  """;
            out = String.format(out, e);
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                  {"response" : "Error en la transacción"}
                  """;
        }
        return Response.status(Response.Status.CREATED).entity(out).build();
    }
    
     @Path("eliminarEmpleado")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response eliminarEmpleado(@FormParam("empleado") @DefaultValue("") String e) {
        String out = "";
        
        ControllerEmpleado ce = new ControllerEmpleado();
        Gson gson = new Gson();
        try {
            // se formatea el objeto en json
            Empleado empleado = gson.fromJson(e, Empleado.class);
            ce.eliminarEmpleado(empleado);
             out = """
                  {"response" : %s}
                  """;
            out = String.format(out, e);
        } catch (Exception ex) {
            ex.printStackTrace();
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
        List<Empleado> empleados = null;
        ControllerEmpleado cs = new ControllerEmpleado();
        try {
            empleados = cs.getAll();
            out = new Gson().toJson(empleados);
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                      {"error" : "Ocurrio un error, Intente mas tarde."}
                      """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}