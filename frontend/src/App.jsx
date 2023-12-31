import { useState, useEffect, useRef } from 'react';
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
  
  const audioPlayerRef = useRef(null); 
  

  useEffect(() => {

    const updateProgress = () => {
      if (audioPlayerRef.current) {  // Asegúrate de acceder a current
        const newProgress = (audioPlayerRef.current.currentTime / audioPlayerRef.current.duration) * 100;
        setProgress(newProgress);
      }
    };
    
    if (audioPlayerRef.current) {  // Asegúrate de acceder a current
      audioPlayerRef.current.addEventListener('timeupdate', updateProgress);
    
      return () => {
        audioPlayerRef.current.removeEventListener('timeupdate', updateProgress);
      };
    }
    
  }, [selectedSong]);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/frontend');
      const songsWithCorrectPaths = response.data.map(song => ({
        ...song,
        filePath: `${song.nombre}.mp3`,
        cover: `${song.caratula}`
      }));
      
      
      
      setSongs(songsWithCorrectPaths);
      if (songsWithCorrectPaths.length > 0) {
        setSelectedSong(songsWithCorrectPaths[0]);
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
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer) {
      if (audioPlayer.paused) {
        audioPlayer.play().catch(error => console.error('Error al reproducir:', error));
      } else {
        audioPlayer.pause();
      }
    }
  };

  const changeSong = (newSongId) => {
    const newSong = songs.find(song => song.id === newSongId);
    if (newSong) {
      setSelectedSong(newSong);
      // También puedes reiniciar el progreso u otras configuraciones aquí si es necesario
    }
  };
   

  const handleNext = () => {
    const currentIndex = songs.findIndex(song => song.id === selectedSong.id);
    if (currentIndex !== -1 && currentIndex < songs.length - 1) {
      const nextSong = songs[currentIndex + 1];
      changeSong(nextSong.id);
    } else if (songs.length > 0) {
      // Si estás al final de la lista, vuelve a la primera canción
      const firstSong = songs[0];
      changeSong(firstSong.id);
    }
  };
  

  const handlePrev = () => {
    const currentIndex = songs.findIndex(song => song.id === selectedSong.id);
    if (currentIndex !== -1 && currentIndex > 0) {
      const prevSong = songs[currentIndex - 1];
      changeSong(prevSong.id);
    } else if (songs.length > 0) {
      // Si estás al principio de la lista, ve a la última canción
      const lastSong = songs[songs.length - 1];
      changeSong(lastSong.id);
    }
  };
  

  const handleProgressBarChange = (e) => {
    const progressBar = e.target;
    const newTime = (audioPlayerRef.current.duration / 100) * progressBar.value;
  
    if (!isNaN(newTime) && isFinite(newTime)) {  // Asegúrate de que newTime sea un valor finito y no NaN
      audioPlayerRef.current.currentTime = newTime;
  
      if (audioPlayerRef.current.paused) {
        audioPlayerRef.current.play().catch(error => console.error('Error al reproducir:', error));
      }
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
  
      await axios.post('http://localhost:3001/frontend', formData);
  
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
          <button id='Boton_login'>
            Iniciar Sesión
          </button>
        </div>

        {selectedSong && (
          <>
            <div id='Cancion' className='ContenedorCancion'>
              <img src={selectedSong.cover} alt={selectedSong.title} />
              <h2>{selectedSong.title}</h2>
              <p>{selectedSong.artist}</p>
              <progress
                value={isNaN(progress) ? 0 : progress}  // Asegúrate de que progress sea un número válido
                max="100"
                onClick={handleProgressBarChange}
              />
            <audio
              autoPlay
              ref={audioPlayerRef}
              onLoadedMetadata={(e) => {
                setTimeout(() => {
                  e.target.play().catch(error => console.error('Error al reproducir:', error));
                }, 100);
              }}
              onTimeUpdate={(e) => setProgress((e.target.currentTime / e.target.duration) * 100)}
              onEnded={handleNext}
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
                id='NombreCancion'
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
              
              <button id='BotonSubir' onClick={handleAddSongToServer}>Agregar canción</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App