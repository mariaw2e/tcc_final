"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Quiz from "./Quiz";
import ShareModal from "./ShareModal";
import "./ArtigoPremium.css";

export default function ArtigoPremium() {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Scroll para o topo quando o componente for montado
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
  };

  return (
    <>
      <Header />
      <main className="artigo-main">
        {/* Hero Section */}
        <section className="hero" id="heroSection">
          <img
            src="/imagens/img13.jpg"
            alt="Cérebro humano ilustrado"
            className="hero-bg"
            loading="lazy"
          />

          <div className="hero-content animate__animated animate__fadeIn">
            <h1 className="hero-title">
              Neurodivergência: O Que É e Por Que Importa?
            </h1>

            <div className="hero-meta">
              <div className="meta-item">
                <i className="meta-icon">📅</i>
                <span>junho 15, 2025</span>
              </div>
              <div className="meta-item">
                <i className="meta-icon">🔖</i>
                <span>Neurociência</span>
              </div>
            </div>

            <button
              className="scroll-down artigo-seta-flutuante"
              style={{
                position: "absolute",
                bottom: "-1rem",
                left: "50%",
                transform: "translateX(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                zIndex: 3,
              }}
              onClick={() => {
                const articleStart = document.getElementById("articleStart");
                if (articleStart) {
                  articleStart.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              aria-label="Rolar para o conteúdo do artigo"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </button>
          </div>
        </section>

        {/* Main Content */}
        <main className="main-content" id="articleStart">
          <div className="breadcrumb">
            <a href="#">Início</a>
            <span className="divider">/</span>
            <a href="#">Artigos</a>
            <span className="divider">/</span>
            <span>Neurodivergência: O Que É e Por Que Importa?</span>
          </div>

          <article className="article-content">
            <p>
              A neurodivergência é um conceito que reconhece e valoriza as
              diferenças neurológicas entre as pessoas, entendendo que condições
              como autismo, TDAH, dislexia e outras não são necessariamente
              "distúrbios" a serem curados, mas variações naturais do cérebro
              humano.
            </p>

            <img
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1350&q=80"
              alt="Ilustração de conexões neurais"
              className="animate__animated"
              id="articleImage1"
              loading="lazy"
            />

            <p>
              O termo "neurodivergente" foi cunhado pela socióloga Judy Singer
              na década de 1990 e ganhou força com o movimento de direitos dos
              autistas. Estima-se que 15-20% da população mundial seja
              neurodivergente.
            </p>

            <div className="highlight-box animate__animated" id="highlightBox">
              <p>
                "A neurodivergência não é um defeito, mas uma diferença que pode
                ser uma força poderosa quando reconhecida e apoiada
                adequadamente." - Dr. Thomas Armstrong
              </p>
            </div>

            <p>
              No ambiente educacional, a compreensão da neurodivergência está
              levando a abordagens mais inclusivas.
            </p>

            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1350&q=80"
              alt="Crianças aprendendo de formas diferentes"
              className="animate__animated"
              id="articleImage2"
              loading="lazy"
            />
          </article>

          {/* Seção de Quiz */}
          <section className="quiz-section animate__animated">
            <h2 className="proposta-title">Teste Seu Conhecimento</h2>
            <div className="quiz-container">
              <Quiz />
            </div>
          </section>
        </main>

        {/* Botões flutuantes */}
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            zIndex: 9999,
          }}
        >
          {/* Botão Voltar ao Topo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#F6B600",
              color: "#071D3B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative",
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = "translateY(-5px)";
              target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
              const tooltip = target.querySelector(".tooltip") as HTMLElement | null;
              if (tooltip) {
                tooltip.style.opacity = "1";
                tooltip.style.right = "70px";
              }
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
              const tooltip = target.querySelector(".tooltip") as HTMLElement | null;
              if (tooltip) {
                tooltip.style.opacity = "0";
                tooltip.style.right = "60px";
              }
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#071D3B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            <div
              style={{
                position: "absolute",
                right: "60px",
                backgroundColor: "#071D3B",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
                opacity: "0",
                pointerEvents: "none",
                transition: "all 0.3s ease",
              }}
              className="tooltip"
            >
              Voltar ao topo
            </div>
          </button>

          {/* Botão Compartilhar */}
          <button
            onClick={openShareModal}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#071D3B",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative",
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = "translateY(-5px)";
              target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
              const tooltip = target.querySelector(".tooltip") as HTMLElement | null;
              if (tooltip) {
                tooltip.style.opacity = "1";
                tooltip.style.right = "70px";
              }
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
              const tooltip = target.querySelector(".tooltip") as HTMLElement | null;
              if (tooltip) {
                tooltip.style.opacity = "0";
                tooltip.style.right = "60px";
              }
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            <div
              style={{
                position: "absolute",
                right: "60px",
                backgroundColor: "#071D3B",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
                opacity: "0",
                pointerEvents: "none",
                transition: "all 0.3s ease",
              }}
              className="tooltip"
            >
              Compartilhar
            </div>
          </button>
        </div>
      </main>
      <Footer />
      <ShareModal isOpen={shareModalOpen} onClose={closeShareModal} />
    </>
  );
}
