package org.utl.dsm.rest;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Created by DreamSoft Juan Pablo Perez Fernandez Alejandra Hernandez Sauceda
 * Joel Ezequiel Rodrigues Briones Edgar Castillo Aguas
 */
@Path("login")
public class RestLogin extends Application {

    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response Saludar() {
        String mensaje = """
                                 {"result":"Hola DreamSoft"}
                                        """;
        return Response.status(Response.Status.OK).entity(mensaje).build();
    }
    
    
}
