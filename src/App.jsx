import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StartScreen from './StartScreen.jsx'
import QuizzScreen from './QuizzScreen.jsx'

function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  function start(){
    setQuizStarted(true)
  }

  return (
    <>
      {!quizStarted ? <StartScreen start={start} /> : <QuizzScreen />}
    </>
  )
}

export default App
