'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './cadastro.css'

export default function Cadastro() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Erro ao criar conta')
        return
      }

      // Cadastro bem-sucedido
      alert('Conta criada com sucesso! Faça login para continuar.')
      router.push('/login')
    } catch (error) {
      setError('Ocorreu um erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="cadastro-page">
      <Header />
      
      <div className="cadastro-content">
        <div className="signup-container">
          <h2>Crie sua conta aqui!</h2>

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="input-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Digite seu nome"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="signup-button"
            >
              {isLoading ? 'Criando...' : 'Concluído'}
            </button>
          </form>

          <div className="cadastro-footer">
            <p>
              Já tem uma conta? <Link href="/login">Faça login</Link>
            </p>
            
            <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
              © 2025 BrainWave Connect. Todos os direitos reservados.
            </p>
            
            <p style={{ marginTop: '10px', fontSize: '0.75rem' }}>
              <Link href="/termos">Termos de Serviço</Link>
              {' | '}
              <Link href="/privacidade">Política de Privacidade</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
