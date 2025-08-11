import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Botao from '../components/Botao';
import Header from '../components/Header';
import '../css/turma.css';

function Turma() {
  const [turmas, setTurmas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(false); // controlar se está editando
  const [turmaAtual, setTurmaAtual] = useState({
    id: null,
    nome: '',
    descricao: '',
    professor_id: ''
  });

  useEffect(() => {
    buscarTurmas();
  }, []);

  const buscarTurmas = async () => {
    const { data, error } = await supabase
      .from('turma')
      .select('*');

    if (error) {
      console.error('Erro ao buscar turmas:', error);
    } else {
      setTurmas(data);
    }
  };

  const abrirEditar = (turma) => {
    setTurmaAtual({
      id: turma.id,
      nome: turma.nome,
      descricao: turma.descricao,
      professor_id: turma.professor_id
    });
    setEditando(true);
    setMostrarForm(true);
  };

  const removerTurma = async (id) => {
    if (window.confirm('Tem certeza que deseja remover esta turma?')) {
      const { error } = await supabase
        .from('turma')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao remover turma:', error);
      } else {
        setTurmas(turmas.filter(turma => turma.id !== id));
      }
    }
  };

  const salvarTurma = async (e) => {
    e.preventDefault();

    if (editando) {
      // Atualizar turma existente
      const { data, error } = await supabase
        .from('turma')
        .update({
          nome: turmaAtual.nome,
          descricao: turmaAtual.descricao,
          professor_id: Number(turmaAtual.professor_id)
        })
        .eq('id', turmaAtual.id)
        .select();

      if (error) {
        console.error('Erro ao atualizar turma:', error);
      } else {
        setTurmas(turmas.map(t =>
          t.id === turmaAtual.id ? data[0] : t
        ));
        setMostrarForm(false);
        setEditando(false);
        setTurmaAtual({ id: null, nome: '', descricao: '', professor_id: '' });
      }
    } else {
      // Inserir nova turma
      const { data, error } = await supabase
        .from('turma')
        .insert([{
          nome: turmaAtual.nome,
          descricao: turmaAtual.descricao,
          professor_id: Number(turmaAtual.professor_id)
        }])
        .select();

      if (error) {
        console.error('Erro ao adicionar turma:', error);
      } else {
        setTurmas([...turmas, data[0]]);
        setMostrarForm(false);
        setTurmaAtual({ id: null, nome: '', descricao: '', professor_id: '' });
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="home">
          <h2>Bem-vindo!</h2>
          <h2>Turmas Cadastradas</h2>

          <div className="botoes">
            <button onClick={() => {
              setMostrarForm(true);
              setEditando(false);
              setTurmaAtual({ id: null, nome: '', descricao: '', professor_id: '' });
            }}>Adicionar Turma</button>
          </div>

          {mostrarForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>{editando ? 'Editar Turma' : 'Adicionar Turma'}</h2>
                <form onSubmit={salvarTurma}>
                  <input
                    type="text"
                    placeholder="Nome da Turma"
                    value={turmaAtual.nome}
                    onChange={(e) => setTurmaAtual({ ...turmaAtual, nome: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Descrição"
                    value={turmaAtual.descricao}
                    onChange={(e) => setTurmaAtual({ ...turmaAtual, descricao: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="ID do Professor"
                    value={turmaAtual.professor_id}
                    onChange={(e) => setTurmaAtual({ ...turmaAtual, professor_id: e.target.value })}
                    required
                  />
                  <div className="modal-buttons">
                    <button type="button" onClick={() => setMostrarForm(false)}>Cancelar</button>
                    <button type="submit">Salvar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="conteudo">
            <div className="table-area">
              <table id='tabela_turmas'>
                <thead>
                  <tr>
                    <th>ID Turma</th>
                    <th>Nome da Turma</th>
                    <th>Descrição</th>
                    <th>ID Professor</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {turmas.length === 0 ? (
                    <tr><td colSpan="5">Nenhuma turma cadastrada.</td></tr>
                  ) : (
                    turmas.map((turma) => (
                      <tr key={turma.id} className="turma-card">
                        <td>{turma.id}</td>
                        <td>{turma.nome}</td>
                        <td>{turma.descricao}</td>
                        <td>{turma.professor_id}</td>
                        <td>
                          <button onClick={() => abrirEditar(turma)}>Editar</button>{' '}
                          <button onClick={() => removerTurma(turma.id)}>Remover</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Turma;
