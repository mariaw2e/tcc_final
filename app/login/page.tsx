'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './login.css'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Email ou senha incorretos')
        return
      }

      // Login bem-sucedido
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/')
    } catch (error) {
      setError('Ocorreu um erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Simulação - em produção, implementar OAuth
    alert('Login com Google será implementado em breve!')
  }

  return (
    <div className="login-page">
      <Header />
      
      <div className="login-content">
        <div className="login-box">
          <h1>Login</h1>
          
          <p>
            Não tem uma conta? <Link href="/cadastro">Cadastre-se agora</Link>
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Digite sua senha"
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="remember"
              />
              <label htmlFor="remember">Lembrar de mim</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-login"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            <p style={{ marginTop: '20px' }}>
              <Link href="/esqueci-senha">Esqueceu sua senha?</Link>
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
