import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Botao from '../components/Botao';
import Header from '../components/Header';

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
      <div className="table">
        <h2>Bem-vindo!</h2>
        <h2>Turmas Cadastradas</h2>
        <div className="turmas-grid">
          {turmas.length === 0 ? (
            <p>Nenhuma turma cadastrada.</p>
          ) : (
            turmas.map((turma) => (
              <div key={turma.id_turma} className="turma-card">
                <h3>{turma.nometurma}</h3>
                <p>ID do Professor: {turma.id_professor}</p>
                <button onClick={() => deletarTurma(turma.id_turma)}>🗑️</button>
              </div>
            ))
          )}
        </div>  
      </div>
    </div>
  )
}

export default Home
