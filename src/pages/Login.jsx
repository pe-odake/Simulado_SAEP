import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
// import '../App.css'
import '../css/login.css'
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('') 

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setStatus('As senhas não coincidem')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('professor')
        .insert([{
          nome: formData.fullName,
          email: formData.email,
          senha: formData.password // usar 'senha'
        }]);


      if (error) {
        console.error(error)
        setStatus('Erro ao criar conta')
      } else {
        setStatus('Conta criada com sucesso!')
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      }
    } else {
      // LOGIN
      const { email, password } = formData

      const { data, error } = await supabase
        .from('professor')
        .select('*')
        .eq('email', email)
        .eq('senha', password)
        .single();

      if (error || !data) {
        setStatus('Email ou senha incorretos')
      } else {
        setStatus('Login bem-sucedido!')
        console.log('Usuário logado:', data)
        navigate('/home'); 
      }
    }

    setIsLoading(false)
  }

  return (
    <div className='container'>
      <div className='form'>
        <h2>{isLogin ? 'Entrar na Conta' : 'Criar Conta'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label>Nome Completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Esconder' : 'Mostrar'}
            </button>
          </div>

          {!isLogin && (
            <div>
              <label>Confirmar Senha</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? 'Esconder' : 'Mostrar'}
              </button>
            </div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
          </button>

          {status && <p>{status}</p>}

        </form>

        <div>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Não tem conta? Criar conta' : 'Já tem conta? Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;