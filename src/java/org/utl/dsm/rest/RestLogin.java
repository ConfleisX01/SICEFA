package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dsm.controller.ControllerUsuario;
import org.utl.dsm.model.Usuario;

@Path("login")
public class RestLogin extends Application {

    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response login(
            @QueryParam("user") @DefaultValue("") String user,
            @QueryParam("password") @DefaultValue("") String password
    ) {
        ControllerUsuario cu = new ControllerUsuario();
        Usuario u = cu.loginUser(user, password);
        Gson gson = new Gson();
        String out = "";
        if (u != null) {
            out = gson.toJson(u);
        } else {
            out = """
                  {"response" : "null"}
                  """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
