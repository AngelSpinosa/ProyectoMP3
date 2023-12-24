import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audioPlayer = document.getElementById('audioPlayer');

    const updateProgress = () => {
      const newProgress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      setProgress(newProgress);
    };

    audioPlayer.addEventListener('timeupdate', updateProgress);

    return () => {
      audioPlayer.removeEventListener('timeupdate', updateProgress);
    };
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
              <audio
                id='AudioPlayer'
                controls
                onTimeUpdate={(e) => setProgress((e.target.currentTime / e.target.duration) * 100)}
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
                Subir
                <input
                  id='fileInput'
                  type='file'
                  accept='.mp3'
                  onChange={(e) => handleAddSong(e.target.files)}
                  style={{ display: 'none' }}
                />
              </label>
              <input type='text' placeholder='Nombre de la canción' />
              <input type='text' placeholder='Artista' />
              <label htmlFor='fileInput'>
                Subir carátula
                <input
                  id='fileInput'
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleAddSong(e.target.files)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App