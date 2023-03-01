import { useState } from 'react'
import './App.css'
import Board from './board/Board'

function App() {
  const [side, setSide] = useState(3);

  return (
    <div className="App">
      <h1>Slide puzzle</h1>
      <div>
        <button onClick={() => setSide(3)}>3</button>
        <button onClick={() => setSide(4)}>4</button>
        <button onClick={() => setSide(5)}>5</button>
      </div>
      <Board N={side} />
    </div>
  )
}

export default App
