package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm.controller.ControllerUsuario;
import org.utl.dsm.model.Usuario;

@Path("login")
public class RestLogin extends Application {

    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response login(
            @QueryParam("nombreUsuario") @DefaultValue("") String nombreUsuario,
            @QueryParam("contrasena") @DefaultValue("") String contrasena
    ) {
        String out = "";
        ControllerUsuario cu = new ControllerUsuario();
        Usuario u = new Usuario();
        try {
            u = cu.loginUsuario(nombreUsuario, contrasena);
            out = new Gson().toJson(u);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\": \"Error\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll() {
        String out = null;
        List<Usuario> usuarios = null;
        ControllerUsuario cu = new ControllerUsuario();
        try {
            usuarios = cu.getAll();
            out = new Gson().toJson(usuarios);
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"error" : "Error"}
                  """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
