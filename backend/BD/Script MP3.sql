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
    ('The Great Gig in the Sky', 'Pink Floyd', '/images/TDSOTM.jpg', '/mp3/The Great Gig In The Sky.mp3'),
    ('Blue World', 'Mac Miller', '/images/Circles.jpg', '/mp3/Blue World.mp3'),
    ('POWER', 'Kanye West', '/images/My Beautiful Dark Twisted Fantasy.jpg', '/mp3/ruta_cancion3.mp3');
