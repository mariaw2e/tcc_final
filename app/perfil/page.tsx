'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './perfil.css'

export default function Perfil() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Verificar se o usuário está logado
    const userString = localStorage.getItem('user')
    if (!userString) {
      router.push('/login')
      return
    }

    try {
      const userData = JSON.parse(userString)
      setUser(userData)
      
      // Carregar foto de perfil do localStorage
      const savedImage = localStorage.getItem(`profileImage_${userData.email}`)
      if (savedImage) {
        setProfileImage(savedImage)
      }
    } catch (error) {
      console.error('Erro ao ler dados do usuário:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem')
      return
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB')
      return
    }

    setIsUploading(true)

    // Ler arquivo e converter para base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setProfileImage(base64String)
      
      // Salvar no localStorage
      if (user) {
        localStorage.setItem(`profileImage_${user.email}`, base64String)
        // Disparar evento para atualizar o Header
        window.dispatchEvent(new Event('profileImageChanged'))
      }
      
      setIsUploading(false)
    }
    reader.onerror = () => {
      alert('Erro ao carregar imagem')
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    if (user) {
      localStorage.removeItem(`profileImage_${user.email}`)
      setProfileImage(null)
      // Disparar evento para atualizar o Header
      window.dispatchEvent(new Event('profileImageChanged'))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="perfil-page">
        <Header />
        <div className="perfil-content">
          <div className="loading">Carregando...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="perfil-page">
      <Header />
      
      <div className="perfil-content">
        <div className="perfil-container">
          <div className="perfil-header">
            <div className="perfil-avatar" onClick={handleImageClick}>
              {isUploading ? (
                <div className="avatar-loading">
                  <div className="spinner-small"></div>
                </div>
              ) : profileImage ? (
                <img src={profileImage} alt="Foto de perfil" className="avatar-image" />
              ) : (
                <span className="avatar-icon">{user.name.charAt(0).toUpperCase()}</span>
              )}
              <div className="avatar-overlay">
                <span className="camera-icon">📷</span>
                <span className="upload-text">Alterar foto</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {profileImage && (
              <button className="remove-photo-btn" onClick={handleRemoveImage}>
                Remover foto
              </button>
            )}
            <h1>Meu Perfil</h1>
          </div>

          <div className="perfil-info">
            <div className="info-group">
              <label>Nome</label>
              <div className="info-value">{user.name}</div>
            </div>

            <div className="info-group">
              <label>E-mail</label>
              <div className="info-value">{user.email}</div>
            </div>

            <div className="info-group">
              <label>Membro desde</label>
              <div className="info-value">Outubro 2025</div>
            </div>
          </div>

          <div className="perfil-actions">
            <button className="btn-secondary" onClick={() => router.push('/jogos')}>
              Ver Jogos
            </button>
            <button className="btn-secondary" onClick={() => router.push('/')}>
              Ver Artigos
            </button>
            <button className="btn-danger" onClick={handleLogout}>
              Sair da Conta
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
