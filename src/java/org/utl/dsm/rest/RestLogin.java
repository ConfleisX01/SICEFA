package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dsm.controller.ControllerUsuario;
import org.utl.dsm.model.Usuario;


@Path("login")
public class RestLogin extends Application{
    
    @Path("loginUser")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response loginUser(@FormParam("usuario") @DefaultValue("") String u) {
        String out = "";
        ControllerUsuario cu = new ControllerUsuario();
        Gson gson = new Gson();
        try {
            Usuario usuario = gson.fromJson(u, Usuario.class);
            cu.loginUsuario(usuario);
            out = """
                  {"result":"OK"}
                  """;
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"result":"Error en la transaccion"}
                  """;
        }
        return Response.ok(out).build();
    }
}
