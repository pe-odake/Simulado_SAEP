import React, { useState } from 'react';
import { supabase } from '../supabaseClient';


function Home() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [status, setStatus] = useState('')

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     if (!isLogin) {
//       if (formData.password !== formData.confirmPassword) {
//         setStatus('As senhas não coincidem')
//         setIsLoading(false)
//         return
//       }

//       const { data, error } = await supabase
//         .from('aluno')
//         .insert([{
//           nome: formData.fullName,
//           email: formData.email,
//           telefone: formData.phone,
//           password_hash: formData.password
//         }])

//       if (error) {
//         console.error(error)
//         setStatus('Erro ao criar conta')
//       } else {
//         setStatus('Conta criada com sucesso!')
//         setFormData({
//           fullName: '',
//           phone: '',
//           email: '',
//           password: '',
//           confirmPassword: ''
//         })
//       }
//     } else {
//       // LOGIN
//       const { email, password } = formData

//       const { data, error } = await supabase
//         .from('aluno')
//         .select('*')
//         .eq('email', email)
//         .eq('password_hash', password)
//         .single()

//       if (error || !data) {
//         setStatus('Email ou senha incorretos')
//       } else {
//         setStatus('Login bem-sucedido!')
//         console.log('Usuário logado:', data)
//       }
//     }

//     setIsLoading(false)
//   }

  return (
    <h1>Hello Mundo</h1>
  );
}

export default Home;