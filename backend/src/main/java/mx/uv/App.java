package mx.uv;

import java.io.IOException;

import javazoom.jl.decoder.Bitstream;
import javazoom.jl.decoder.JavaLayerException;
import javazoom.jl.player.advanced.AdvancedPlayer;
import javazoom.jl.player.advanced.PlaybackEvent;
import javazoom.jl.player.advanced.PlaybackListener;

/**
 * Hello world!
 *
 */
public class App 
{
public static void main(String[] args) {
            // Crear una instancia de la canción
            Song song = new Song("Song Title", "Artist Name", "path/to/song.mp3");

            // Imprimir información de la canción
            song.printInfo();

            // Resto de la lógica para la reproducción de MP3
    }
}
