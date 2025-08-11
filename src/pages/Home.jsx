import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Botao from '../components/Botao';
import Header from '../components/Header';
import '../css/home.css';

function Home() {
  const [turmas, setTurmas] = useState([])

  useEffect(() => {
    const buscarTurmas = async () => {
      const { data, error } = await supabase
        .from('turma') // corrigido aqui
        .select('*')

      if (error) {
        console.error('Erro ao buscar turmas:', error)
      } else {
        setTurmas(data)
      }
    }

    buscarTurmas()
  }, [])

  return (
    <div>
      <Header />
      <div className="container">
        <div className="home">
          <h2>Bem-vindo!</h2>
          <h2>Turmas Cadastradas</h2>
          
          <p>Gerencie suas turmas de forma fácil e rápida.</p>

        </div>
      </div>
    </div>
  )
}

export default Home