CREATE DATABASE MP3;
USE MP3;

CREATE TABLE Canciones (
	id integer primary key auto_increment,
    nombre varchar(255) not null,
    artista varchar(255) not null,
    caratula varchar(255),
    archivo_mp3 varchar(255) not null
);

insert into Canciones (nombre, artista, caratula, archivo_mp3) 
values 
    ('The Great Gig in the Sky', 'Pink Floyd', 'ruta_caratula1.jpg', 'ruta_cancion1.mp3'),
    ('Blue World', 'Mac Miller', 'ruta_caratula2.jpg', 'ruta_cancion2.mp3'),
    ('POWER', 'Kanye West', 'ruta_caratula3.jpg', 'ruta_cancion3.mp3');
