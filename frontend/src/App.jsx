import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from "axios"
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <div id='Root' className='Div_padre'>
        <div id ='Opciones' className='Div_opciones'>
          <img src="/Fluctus.svg" alt="Logo Fluctus" id='Logo' />
          <button id='Boton_agregar'>Agregar</button>
        </div>
        
        <img src="/PinkFloyd.jpg" alt="The Dark Side Of The Moon"/>
        <h2>Nombre de la canción</h2>
        <p>Artista X</p>
        <progress value="50" max="100"></progress>

        <div className='Div_botones'>
          <button className='Botones_AS'>Anterior</button>
          <button id='Boton_pausa'>PAUSA</button>
          <button className='Botones_AS'>Siguiente</button>
        </div>

      </div>
    </>
  )
}

export default App
