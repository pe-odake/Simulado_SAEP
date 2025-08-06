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
        <div className="turmas-table">
          <table>
            <thead>
              <tr>
                <th>ID Turma</th>
                <th>Nome da Turma</th>
                <th>Ano</th>
                <th>Periodo</th>
                <th>ID Professor</th>
              </tr>
            </thead>
            <tbody>
              {turmas.length === 0 ? (
                <tr>Nenhuma turma cadastrada.</tr>
              ) : (
                turmas.map((turma) => (
                  <tr key={turma.id_turma} className="turma-card">
                    <td>{turma.id_turma}</td>
                    <td>{turma.nometurma}</td>
                    <td>{turma.ano}</td>
                    <td>{turma.periodo}</td>
                    <td>ID do Professor: {turma.id_professor}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>  
      </div>
    </div>
  )
}

export default Home
