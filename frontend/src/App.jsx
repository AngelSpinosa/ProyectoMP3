import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [newSongInfo, setNewSongInfo] = useState({
    name: '',
    artist: '',
    audioFile: null,
    coverImage: null,
  });

  useEffect(() => {
    const audioPlayer = document.getElementById('audioPlayer');

    const updateProgress = () => {
      if (audioPlayer) {
        const newProgress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        setProgress(newProgress);
      }
    };

    if (audioPlayer) {
      audioPlayer.addEventListener('timeupdate', updateProgress);

      return () => {
        audioPlayer.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [selectedSong]);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const response = await axios.get('http://localhost:4567/canciones');
      setSongs(response.data);
      if (response.data.length > 0) {
        setSelectedSong(response.data[0]);
      }
    } catch (error) {
      console.error('Error al cargar la lista de canciones', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePlayPause = () => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex(song => song.filePath === selectedSong.filePath);
  
    if (currentIndex !== -1 && currentIndex < songs.length - 1) {
      const nextSong = songs[currentIndex + 1];
      setSelectedSong(nextSong);
    } else if (songs.length > 0) {
      // Si estás al final de la lista, vuelve a la primera canción
      setSelectedSong(songs[0]);
    }
  };
  

  const handlePrev = () => {
    const currentIndex = songs.findIndex(song => song.filePath === selectedSong.filePath);
  
    if (currentIndex !== -1 && currentIndex > 0) {
      const prevSong = songs[currentIndex - 1];
      setSelectedSong(prevSong);
    } else if (songs.length > 0) {
      // Si estás al principio de la lista, ve a la última canción
      setSelectedSong(songs[songs.length - 1]);
    }
  };
  

  const handleProgressBarChange = (e) => {
    const progressBar = e.target;
    const newTime = (selectedSong.duration / 100) * progressBar.value;
  
    // Actualiza la posición de reproducción de la canción
    selectedSong.audio.currentTime = newTime;
  
    // Además, si la canción no está reproduciendo, puedes iniciar la reproducción
    if (selectedSong.audio.paused) {
      selectedSong.audio.play();
    }
  };

  const handleAddSong = (files) => {
    const audioFile = files[0];
    setNewSongInfo((prevInfo) => ({ ...prevInfo, audioFile }));
  };

  const handleAddSongToServer = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newSongInfo.name);
      formData.append('artist', newSongInfo.artist);
      formData.append('audio', newSongInfo.audioFile);
      formData.append('coverImage', newSongInfo.coverImage);
  
      await axios.post('http://localhost:4567/canciones', formData);
  
      // Después de agregar la canción, puedes recargar la lista de canciones
      loadSongs();
  
      // También puedes cerrar el modal si lo deseas
      closeModal();
    } catch (error) {
      console.error('Error al agregar la canción', error);
    }
  };
  
  

  /*const handleAddSong = async (files) => {
    try {
      const formData = new FormData();
      formData.append('song', files[0]);

      // Puedes agregar más campos al formData si es necesario

      await axios.post('http://localhost:4567/agregar-cancion', formData);

      // Recarga la lista de canciones después de agregar una nueva
      loadSongs();
    } catch (error) {
      console.error('Error al agregar la canción', error);
    }
  };
  */
  

  return (
    <>
      <div id='Root' className='Div_padre'>
        <div id='Opciones' className='Div_opciones'>
          <img src="/Fluctus.svg" alt="Logo Fluctus" id='Logo' />
          <button id='Boton_agregar' onClick={openModal}>
            Agregar
          </button>
        </div>

        {selectedSong && (
          <>
            <div id='Cancion' className='ContenedorCancion'>
              <img src={selectedSong.cover} alt={selectedSong.title} />
              <h2>{selectedSong.title}</h2>
              <p>{selectedSong.artist}</p>
              <progress
                value={progress}  // Utiliza el estado progress para reflejar el progreso
                max="100"
                onClick={handleProgressBarChange}
              />
              <audio
                id='AudioPlayer'
                onTimeUpdate={(e) => setProgress((e.target.currentTime / e.target.duration) * 100)}
                onEnded={handleNext}  // Invoca handleNext cuando la canción actual ha terminado
              >
                <source src={selectedSong.filePath} type="audio/mp3" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
            <div id='BotonesPlay' className='Div_botones'>
              <button onClick={handlePrev} className='Botones_AS'>
                <img src="/Last_Song_Button.svg" alt="Anterior" />
              </button>
              <button id='Boton_pausa' onClick={handlePlayPause}>
                <img src="/Pause_button.svg" alt="Pausa" />
              </button>
              <button onClick={handleNext} className='Botones_AS'>
                <img src="/Next_Song_Button.svg" alt="Siguiente" />
              </button>
            </div>
          </>
        )}

        {showModal && (
          <div className='Modal'>
            <div className='Modal-content'>
              <span className='Close' onClick={closeModal}>
                &times;
              </span>
              <label htmlFor='fileInput'>
                Subir MP3
                <input
                  id='fileInput'
                  type='file'
                  accept='.mp3'
                  onChange={(e) => handleAddSong(e.target.files)}
                  style={{ display: 'none' }}
                />
              </label>
              <input
                type='text'
                placeholder='Nombre de la canción'
                value={newSongInfo.name}
                onChange={(e) => setNewSongInfo((prevInfo) => ({ ...prevInfo, name: e.target.value }))}
              />
              <input
                type='text'
                placeholder='Artista'
                value={newSongInfo.artist}
                onChange={(e) => setNewSongInfo((prevInfo) => ({ ...prevInfo, artist: e.target.value }))}
              />
              <label htmlFor='fileInput2'>
                Subir carátula
                <input
                  id='fileInput2'
                  type='file'
                  accept='.jpg, .jpeg, .png'
                  onChange={(e) => handleAddSong(e.target.files)}
                  style={{ display: 'none' }}
                />
              </label>
              <br/>
              <button id='BotonSubir' onClick={handleAddSongToServer}>Agregar canción</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App