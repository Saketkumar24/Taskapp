import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes } from "react-router-dom"
import Signup from "./Pages/Signup.jsx"
import { Route } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/register" element={<Signup />} />
    </Routes>
  )
}

export default App
