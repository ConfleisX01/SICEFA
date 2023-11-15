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
import org.utl.dsm.controller.ControllerProducto;
import org.utl.dsm.model.Producto;

/**
 *
 * @author Confleis
 */
/// Ruta para llamar las APIS desde el navegador de la seccion productos
@Path("producto")
public class RestProducto extends Application {

    /// Metodo para insertar un producto a la tabla correspondiente
    @Path("insertProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertProducto(@FormParam("producto") @DefaultValue("") String p) {
        String out = "";
        ControllerProducto cp = new ControllerProducto();
        Gson gson = new Gson();
        try {
            Producto producto = gson.fromJson(p, Producto.class);
            cp.insertProducto(producto);
            out = """
                  {"response" : "%s"}
                  """;
            out = String.format(out, p);
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"response" : "Error en la transacción"}
                  """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    /// Metodo para obtener todos los registros de la tabla productos y convertirlos a Json
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll() {
        String out = null;
        List<Producto> productos = null;
        ControllerProducto cp = new ControllerProducto();
        try {
            productos = cp.getAll();
            out = new Gson().toJson(productos);
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"error" : "Ocurrio un error, Intente mas tarde."}
                  """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
