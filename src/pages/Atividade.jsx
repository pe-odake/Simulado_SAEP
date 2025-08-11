import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Botao from '../components/Botao';
import Header from '../components/Header';
import '../css/atividade.css';

function Atividade() {
  const [atividade, setAtividade] = useState([]);

  // Modal e modo (add/edit)
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Id da atividade para edição ou remoção
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);

  // Estado do formulário
  const [formAtividade, setFormAtividade] = useState({
    turma_id: '',
    titulo: '',
    descricao: '',
    data_entrega: '',
    criado_por: '',
  });

  // Carregar atividades
  useEffect(() => {
    buscarAtividades();
  }, []);

  async function buscarAtividades() {
    const { data, error } = await supabase
      .from('atividade')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Erro ao buscar atividades:', error);
    } else {
      setAtividade(data);
    }
  }

  // Abrir modal para adicionar
  function abrirAdicionar() {
    setModoEdicao(false);
    setFormAtividade({
      turma_id: '',
      titulo: '',
      descricao: '',
      data_entrega: '',
      criado_por: '',
    });
    setMostrarForm(true);
  }

  // Abrir modal para editar
  function abrirEditar(atividade) {
    setModoEdicao(true);
    setAtividadeSelecionada(atividade.id);
    setFormAtividade({
      turma_id: atividade.turma_id,
      titulo: atividade.titulo,
      descricao: atividade.descricao,
      data_entrega: atividade.data_entrega ? atividade.data_entrega.slice(0, 10) : '',
      criado_por: atividade.criado_por,
    });
    setMostrarForm(true);
  }

  // Fechar modal
  function fecharForm() {
    setMostrarForm(false);
    setAtividadeSelecionada(null);
  }

  // Handle form input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormAtividade((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Adicionar ou editar atividade
  async function handleSubmit(e) {
    e.preventDefault();

    if (modoEdicao) {
      // Editar
      const { error } = await supabase
        .from('atividade')
        .update({
          turma_id: Number(formAtividade.turma_id),
          titulo: formAtividade.titulo,
          descricao: formAtividade.descricao,
          data_entrega: formAtividade.data_entrega,
          criado_por: Number(formAtividade.criado_por),
        })
        .eq('id', atividadeSelecionada);

      if (error) {
        console.error('Erro ao editar atividade:', error);
      } else {
        await buscarAtividades();
        fecharForm();
      }
    } else {
      // Adicionar
      const { data, error } = await supabase
        .from('atividade')
        .insert([
          {
            turma_id: Number(formAtividade.turma_id),
            titulo: formAtividade.titulo,
            descricao: formAtividade.descricao,
            data_entrega: formAtividade.data_entrega,
            criado_por: Number(formAtividade.criado_por),
          },
        ])
        .select();

      if (error) {
        console.error('Erro ao adicionar atividade:', error);
      } else {
        setAtividade((prev) => [...prev, data[0]]);
        fecharForm();
      }
    }
  }

  // Remover atividade
  async function removerAtividade(id) {
    if (!window.confirm('Tem certeza que deseja remover essa atividade?')) return;

    const { error } = await supabase.from('atividade').delete().eq('id', id);

    if (error) {
      console.error('Erro ao remover atividade:', error);
    } else {
      setAtividade((prev) => prev.filter((ativ) => ativ.id !== id));
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="home">
          <h2>Bem-vindo!</h2>
          <h2>Atividades Cadastradas</h2>

          <div className="botoes">
            <button onClick={abrirAdicionar} >Adicionar Atividade</button>
          </div>

          {/* Modal Adicionar / Editar */}
          {mostrarForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>{modoEdicao ? 'Editar Atividade' : 'Adicionar Atividade'}</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    name="turma_id"
                    placeholder="ID da Turma"
                    value={formAtividade.turma_id}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={formAtividade.titulo}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="descricao"
                    placeholder="Descrição"
                    value={formAtividade.descricao}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="date"
                    name="data_entrega"
                    value={formAtividade.data_entrega}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="criado_por"
                    placeholder="ID Professor"
                    value={formAtividade.criado_por}
                    onChange={handleChange}
                    required
                  />
                  <div className="modal-buttons">
                    <button type="button" onClick={fecharForm}>
                      Cancelar
                    </button>
                    <button type="submit">{modoEdicao ? 'Salvar Alterações' : 'Adicionar'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Lista de Atividades */}
          <div className="conteudo">
            <div className="table-area">
              <table id="tabela_turmas">
                <thead>
                  <tr>
                    <th>ID Atividade</th>
                    <th>ID Turma</th>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Data de Entrega</th>
                    <th>Criado por</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {atividade.length === 0 ? (
                    <tr>
                      <td colSpan="7">Nenhuma Atividade cadastrada.</td>
                    </tr>
                  ) : (
                    atividade.map((ativ) => (
                      <tr key={ativ.id} className="turma-card">
                        <td>{ativ.id}</td>
                        <td>{ativ.turma_id}</td>
                        <td>{ativ.titulo}</td>
                        <td>{ativ.descricao}</td>
                        <td>{ativ.data_entrega}</td>
                        <td>{ativ.criado_por}</td>
                        <td>
                          <button id='edit' onClick={() => abrirEditar(ativ)}>Editar</button>
                          <button id='remove' onClick={() => removerAtividade(ativ.id)}>Remover</button>
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

export default Atividade;
