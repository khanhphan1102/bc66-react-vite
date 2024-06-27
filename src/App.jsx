import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExReactForm from './ExReactForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ExReactForm/>
    </>
  )
}

export default App
