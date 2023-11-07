package org.utl.dsm.rest;

import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dsm.controller.ControllerUsuario;

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
            String out = "";
        try {
            boolean pass = cu.loginUser(user, password);
            if(pass) {
                out = """
                      {"result" : "OK"}
                      """;
            } else {
                out = """
                      {"result" : "Denied"}
                      """;
            }
        } catch (Exception e) {
            e.printStackTrace();
            out  = """
                   {"result" : "Error"}
                   """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
