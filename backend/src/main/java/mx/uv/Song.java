package mx.uv;

public class Song {
    private String title;
    private String artist;
    private String cover; // Ruta de la imagen de la carátula
    private String filePath; // Ruta del archivo MP3

    public Song(String title, String artist, String cover, String filePath) {
        this.title = title;
        this.artist = artist;
        this.cover = cover;
        this.filePath = filePath;
    }

    // Getters y setters

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }
    public String getCover() {
        return cover;
    }
    public String getFilePath() {
        return filePath;
    }

    // Método para imprimir información de la canción
    public void printInfo() {
        System.out.println("Title: " + title);
        System.out.println("Artist: " + artist);
        System.out.println("Cover: " + cover);
        System.out.println("File Path: " + filePath);
    }
}
