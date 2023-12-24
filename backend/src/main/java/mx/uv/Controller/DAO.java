package mx.uv.Controller;

import mx.uv.Song;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DAO {
    public List<Song> getAllSongs() {
        List<Song> songs = new ArrayList<>();
        Connection conn = null;
        Statement stm = null;
        ResultSet rs = null;

        try {
            conn = Conexion.getConnection();
            String sql = "SELECT * FROM Canciones";
            stm = conn.createStatement();
            rs = stm.executeQuery(sql);

            while (rs.next()) {
                Song song = new Song(
                        rs.getString("nombre"),
                        rs.getString("artista"),
                        rs.getString("caratula"),
                        rs.getString("archivo_mp3")
                );
                songs.add(song);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Opcional: Si decides añadir un método close en la clase Conexion, puedes llamarlo aquí.
        }

        return songs;
    }

    public static boolean insertSong(Song song) {
        Connection conn = null;
        PreparedStatement stm = null;

        try {
            conn = Conexion.getConnection();
            String sql = "INSERT INTO Canciones (nombre, artista, caratula, archivo_mp3) VALUES (?, ?, ?, ?)";
            stm = conn.prepareStatement(sql);
            stm.setString(1, song.getTitle());
            stm.setString(2, song.getArtist());
            stm.setString(3, "/images/" + song.getCover()); // Ajusta según tu estructura de carpetas
            stm.setString(4, "/mp3/" + song.getFilePath());

            return stm.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            Conexion.close(stm);
            Conexion.close(conn);        
        }
        return false;
    }

    // Otros métodos según sea necesario...
}