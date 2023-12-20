import { useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleAddSong = () => {
    // Implementa la lógica para añadir la canción aquí
    // Puedes usar el estado y funciones para gestionar la lista de canciones, etc.
    // ...
  };

  return (
    <> 
      <div id='Root' className='Div_padre'>
        <div id ='Opciones' className='Div_opciones'>
          <img src="/Fluctus.svg" alt="Logo Fluctus" id='Logo' />
          <button id='Boton_agregar' onClick={openModal}>Agregar</button>
        </div>
        
        <img src="/PinkFloyd.jpg" alt="The Dark Side Of The Moon"/>
        <h2>Nombre de la canción</h2>
        <p>Artista X</p>
        <progress value="50" max="100"></progress>

        <div className='Div_botones'>
          <button className='Botones_AS'><img src="/Last_Song_Button.svg" alt="Anterior" /></button>
          <button id='Boton_pausa'><img src="/Pause_button.svg" alt="Pausa" /></button>
          <button className='Botones_AS'><img src="/Next_Song_Button.svg" alt="Siguiente" /></button>
        </div>

        {showModal && (
          <div className='Modal'>
            <div className='Modal-content'>
              <span className='Close' onClick={closeModal}>&times;</span>
              {/* Contenido del modal, puedes añadir formularios, entradas de archivo, etc. */}
              <label htmlFor="fileInput">
                Subir
                <input
                  id="fileInput"
                  type="file"
                  accept=".mp3"
                  onChange={(e) => handleAddSong(e.target.files)}
                  style={{ display: "none" }}
                />
              </label>
              <input type="text" placeholder="Nombre de la canción" />
              <input type="text" placeholder="Artista" />
              <label htmlFor="fileInput">
                Subir carátula
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAddSong(e.target.files)}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
