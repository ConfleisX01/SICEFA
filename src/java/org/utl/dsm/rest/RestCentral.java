package org.utl.dsm.rest;

/**
 *Created by DreamSoft
 * Juan Pablo Perez Fernandez
 * Alejandra Hernandez Sauceda
 * Joel Ezequiel Rodrigues Briones
 * Edgar Castillo Aguas
 */

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

 @Path("ejemplo")
public class RestCentral extends Application{
     @Path("saludar")
     @GET
     @Produces(MediaType.APPLICATION_JSON)
     public Response saludar(){
         String out = """
                        {"response":"Hola desde el REST"}
                      """;
         
         return Response.status(Response.Status.OK).entity(out).build();
     }
}