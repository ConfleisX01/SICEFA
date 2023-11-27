package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm.controller.ControllerCliente;
import org.utl.dsm.controller.ControllerPersona;
import org.utl.dsm.model.Cliente;
import org.utl.dsm.model.Persona;

@Path("cliente")
public class RestCliente extends Application {

    @Path("insertarCliente")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertCliente(@FormParam("datosCliente") @DefaultValue("") String datosCliente) {
        String out = "";
        ControllerCliente cc = new ControllerCliente();
        Gson gson = new Gson();
        try {
            System.out.println(datosCliente);
            Cliente cliente = gson.fromJson(datosCliente, Cliente.class);
            cc.insertCliente(cliente);
            out = """
                  {"result":"Objeto insertado"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                 {"result":"Error en la transacción"}
                 """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll() {
        String out = null;
        List<Cliente> clientes = null;
        ControllerCliente cc = new ControllerCliente();
        try {
            clientes = cc.getAll();
            out = new Gson().toJson(clientes);
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                        {"error":"Ocurrio un error. Intente mas tarde."}
                    """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("updateCliente")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateCliente(@FormParam("datosCliente") @DefaultValue("{}") String datosCliente) {
        String out = null;
        ControllerCliente cc = null;
        Gson gson = new Gson();
        try {
            Cliente c = null;
            c = gson.fromJson(datosCliente, Cliente.class);
            cc = new ControllerCliente();
            cc.update(c);
            out = gson.toJson(c);
        } catch (Exception e) {
            out = """
                   {"error": "Error interno del servidor, Intente más tarde."}
                  """;
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
@Path("deleteCliente")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCliente(@FormParam("datosCliente") @DefaultValue("") String datosCliente) {
        String out = "";
        ControllerCliente cc = new ControllerCliente();
        Gson gson = new Gson();
        try {
            Cliente cliente = gson.fromJson(datosCliente, Cliente.class);
            cc.deleteCliente(cliente);
            out = """
              {"result" : "OK"}
              """;
        } catch (Exception e) {
            e.printStackTrace();
            out = """
              {"result" : "Error al eliminar el cliente"}
              """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}



/*
@Path("deleteCliente")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCliente(@FormParam("datosCliente") @DefaultValue("") String datosCliente) {
        String out = "";
        ControllerCliente cc = new ControllerCliente();
        Gson gson = new Gson();
        try {
            Cliente cliente = gson.fromJson(datosCliente, Cliente.class);
            cc.deleteCliente(cliente);
            out = """
              {"result" : "OK"}
              """;
        } catch (Exception e) {
            e.printStackTrace();
            out = """
              {"result" : "Error al eliminar el cliente"}
              """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
*/