import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

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
    // Implementa la lógica para reproducir/pausar la canción seleccionada
  };

  const handleNext = () => {
    // Implementa la lógica para reproducir la siguiente canción de la lista
  };

  const handlePrev = () => {
    // Implementa la lógica para reproducir la canción anterior de la lista
  };

  const handleProgressBarChange = (e) => {
    // Implementa la lógica para cambiar la posición de reproducción de la canción
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
              <progress
                value="50"
                max="100"
                onChange={handleProgressBarChange}>
              </progress>
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