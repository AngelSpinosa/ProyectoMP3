package mx.uv;

import mx.uv.Controller.DAO;
import static spark.Spark.*;
import  com.google.gson.*;

public class App {
    static Gson gson = new Gson();
    public static void main(String[] args) {
        // Registrar archivos MP3
        FileUploadController fileUploadController = new FileUploadController();

        // Registrar rutas de subida de archivos
        fileUploadController.registerRoutes();

        //fuente:https://gist.github.com/saeidzebardast/e375b7d17be3e0f4dddf
        options("/*",(request,response)->{
            String accessControlRequestHeaders=request.headers("Access-Control-Request-Headers");
            if(accessControlRequestHeaders!=null){
                response.header("Access-Control-Allow-Headers",accessControlRequestHeaders);
            }
            String accessControlRequestMethod=request.headers("Access-Control-Request-Method");
            if(accessControlRequestMethod!=null){
                response.header("Access-Control-Allow-Methods",accessControlRequestMethod);
                }
            return "OK";
        });
        post("/canciones", (request, response) -> {
            // Obtener información de la solicitud y crear una nueva canción
            String payload = request.body();
            Song newSong = gson.fromJson(payload, Song.class);

            // Insertar la nueva canción en la base de datos
            boolean success = DAO.insertSong(newSong);

            // Crear y devolver una respuesta
            JsonObject respuesta = new JsonObject();
            respuesta.addProperty("msj", success);
            return respuesta;
        });
    }
}