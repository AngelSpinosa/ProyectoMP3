package mx.uv;

import spark.Request;
import spark.Response;
import spark.Route;
import static spark.Spark.post;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class FileUploadController {
    public void registerRoutes() {
        // Ruta para subir archivos MP3
        post("/upload/mp3", "multipart/form-data", handleMP3Upload);

        // Ruta para subir imágenes JPG
        post("/upload/images", "multipart/form-data", handleImageUpload);
    }

    private Route handleMP3Upload = (Request request, Response response) -> {
        try {
            // Obtener el Part correspondiente al archivo MP3
            InputStream mp3Stream = request.raw().getPart("mp3File").getInputStream();

            // Guardar el archivo MP3 en el sistema de archivos
            Path mp3FilePath = Path.of("ruta/del/directorio/mp3", "nombre_archivo.mp3");
            Files.copy(mp3Stream, mp3FilePath, StandardCopyOption.REPLACE_EXISTING);

            return "Archivo MP3 subido exitosamente.";
        } catch (Exception e) {
            e.printStackTrace();
            response.status(500);
            return "Error al subir el archivo MP3.";
        }
    };

    private Route handleImageUpload = (Request request, Response response) -> {
        try {
            // Obtener el Part correspondiente al archivo de imagen
            InputStream imageStream = request.raw().getPart("imageFile").getInputStream();

            // Guardar el archivo de imagen en el sistema de archivos
            Path imageFilePath = Path.of("ruta/del/directorio/imagenes", "nombre_imagen.jpg");
            Files.copy(imageStream, imageFilePath, StandardCopyOption.REPLACE_EXISTING);

            return "Imagen subida exitosamente.";
        } catch (Exception e) {
            e.printStackTrace();
            response.status(500);
            return "Error al subir la imagen.";
        }
    };
}
