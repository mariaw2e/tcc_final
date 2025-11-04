"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Header.css";

export default function Header() {
  const h1Ref = useRef(null);
  const [title, setTitle] = useState("BrainWave Connect");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está logado
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setUser(userData);
        
        // Carregar foto de perfil
        const savedImage = localStorage.getItem(`profileImage_${userData.email}`);
        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.error('Erro ao ler dados do usuário:', error);
      }
    }

    // Atualizar foto de perfil quando mudar
    const handleStorageChange = () => {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        const savedImage = localStorage.getItem(`profileImage_${userData.email}`);
        setProfileImage(savedImage);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Também escutar mudanças customizadas
    window.addEventListener('profileImageChanged', handleStorageChange);

    // Função para garantir que o texto seja "BrainWave Connect"
    const fixText = () => {
      if (h1Ref.current && h1Ref.current.textContent !== "BrainWave Connect") {
        h1Ref.current.textContent = "BrainWave Connect";
      }
    };

    // Aplicar imediatamente
    fixText();

    // Aplicar após um pequeno atraso para garantir
    const timer1 = setTimeout(fixText, 100);
    const timer2 = setTimeout(fixText, 500);
    const timer3 = setTimeout(fixText, 1000);

    // Observar mudanças no DOM
    if (h1Ref.current) {
      const observer = new MutationObserver(fixText);

      observer.observe(h1Ref.current, {
        childList: true,
        characterData: true,
        subtree: true
      });

      // Garantir que o h1 não possa ser alterado por CSS
      document.head.insertAdjacentHTML(
        "beforeend",
        `<style>
          .header .header-container .logo-titulo h1::before,
          .header .header-container .logo-titulo h1::after {
            content: none !important;
            display: none !important;
          }
        </style>`
      );

      // Limpar
      return () => {
        observer.disconnect();
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('profileImageChanged', handleStorageChange);
      };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="header" id="mainHeader">
      <div className="header-container">
        <Link href="/" className="logo-titulo">
          <img
            src="/imagens/logo_branca - Copia.jpg"
            alt="Logo"
            className="logo"
          />
          <h1
            ref={h1Ref}
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "26px",
              color: "#071D3B",
              margin: 0
            }}
          >
            {title}
          </h1>
        </Link>
        <nav className="menu">
          <Link href="/sobre">Sobre</Link>
          <Link href="/artigos">Artigos</Link>
          <Link href="/depoimentos">Depoimentos</Link>
          <Link href="/jogos">Jogos</Link>
          <Link href="/#contato">Contato</Link>
        </nav>
        <div className="auth-buttons">
          {user ? (
            <>
              <Link href="/perfil">
                <button className="auth-btn user-btn">
                  {profileImage ? (
                    <img src={profileImage} alt="Perfil" className="user-avatar-img" />
                  ) : (
                    <span className="user-initial">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  )}
                  <span className="user-name">{user?.name?.split(' ')[0] || 'Usuário'}</span>
                </button>
              </Link>
              <button className="auth-btn logout-btn" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="auth-btn conecte-btn">Conecte-se</button>
              </Link>
              <Link href="/cadastro">
                <button className="auth-btn cadastrar-btn">Cadastrar</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
