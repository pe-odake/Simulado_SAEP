import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Turma from './pages/Turma'
import Atividade from './pages/Atividade'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/turma" element={<Turma />} />
        <Route path="/atividade" element={<Atividade />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App