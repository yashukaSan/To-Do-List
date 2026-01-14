import { useState } from 'react'
import { Body } from './Body.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-3xl text-center underline decoration-double-dashed p-3 bg-white font-extrabold">
      TO DO LIST
    </h1>
    <Body/>
    </>
  )
}

export default App
