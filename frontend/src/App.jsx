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
        <img src="" alt="" />Logo app
        <button>Agregar</button>
        <img src="" alt=""/>
        <h2>Nombre de la canción</h2>
        <p>Artista X</p>
        <progress value="10" max="100"></progress>

        <div className='Div_botones'>
          <button>Anterior</button>
          <button>PAUSA</button>
          <button>Siguiente</button>
        </div>

      </div>

    </>
  )
}

export default App
