"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Quiz from "./Quiz";
import ShareModal from "./ShareModal";
import "./ArtigoPremium.css";

export default function ArtigoPremium() {
  const [shareModalOpen, setShareModalOpen] = useState(false);

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
                zIndex: 3
              }}
              onClick={() => {
                const articleStart = document.getElementById("articleStart");
                if (articleStart) {
                  articleStart.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
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
              humano. Essa perspectiva revolucionária está transformando a forma
              como entendemos a diversidade cognitiva e sua importância para a
              sociedade.
            </p>

            <img
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Ilustração de conexões neurais"
              className="animate__animated"
              id="articleImage1"
              loading="lazy"
            />

            <p>
              O termo "neurodivergente" foi cunhado pela socióloga Judy Singer
              na década de 1990 e ganhou força com o movimento de direitos dos
              autistas. Segundo pesquisas atuais, estima-se que 15-20% da
              população mundial seja neurodivergente. Esses indivíduos muitas
              vezes possuem formas únicas de processar informações, resolver
              problemas e interagir com o mundo, trazendo perspectivas valiosas
              que podem beneficiar toda a sociedade.
            </p>

            <div className="highlight-box animate__animated" id="highlightBox">
              <p>
                "A neurodivergência não é um defeito, mas uma diferença que pode
                ser uma força poderosa quando reconhecida e apoiada
                adequadamente." - Dr. Thomas Armstrong, Autor de "O Poder da
                Neurodiversidade"
              </p>
            </div>

            <p>
              No ambiente educacional, a compreensão da neurodivergência está
              levando a abordagens mais inclusivas. Em vez de tentar forçar
              todos os alunos a aprender da mesma forma, escolas progressistas
              estão adotando métodos que respeitam os diferentes estilos de
              aprendizagem. Isso não só beneficia estudantes neurodivergentes,
              mas cria um ambiente mais rico para todos.
            </p>

            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Crianças aprendendo de formas diferentes"
              className="animate__animated"
              id="articleImage2"
              loading="lazy"
            />

            <p>
              No local de trabalho, empresas inovadoras estão descobrindo que
              equipes neurodiversas são mais criativas e resolvem problemas de
              forma mais eficaz. Grandes nomes da tecnologia como Microsoft, SAP
              e IBM têm programas específicos para recrutar talentos
              neurodivergentes, reconhecendo seu potencial único para inovação e
              pensamento fora da caixa.
            </p>

            <p>
              No entanto, os desafios permanecem. Muitos neurodivergentes ainda
              enfrentam estigma, diagnóstico tardio e falta de acomodações
              adequadas. A conscientização sobre neurodiversidade é crucial para
              criar uma sociedade verdadeiramente inclusiva que valorize todas
              as formas de pensar e ser.
            </p>
          </article>

          <section className="proposta-section animate__animated" id="propostaSection">
            <h2 className="proposta-title">
              Curiosidades sobre Neurodivergência
            </h2>
            <div className="curiosidades-list">
              <div className="curiosidade-item">
                <h3>1. Grandes mentes neurodivergentes</h3>
                <p>
                  Muitos gênios da história como Albert Einstein, Mozart e
                  Nikola Tesla apresentavam características neurodivergentes que
                  podem ter contribuído para suas visões únicas.
                </p>
              </div>

              <div className="curiosidade-item">
                <h3>2. Habilidades especiais</h3>
                <p>
                  Pessoas neurodivergentes frequentemente desenvolvem
                  "superpoderes" como memória excepcional, atenção a detalhes ou
                  pensamento hiperfocado em áreas de interesse.
                </p>
              </div>

              <div className="curiosidade-item">
                <h3>3. Diversidade no espectro</h3>
                <p>
                  Não existem dois neurodivergentes iguais - cada pessoa tem um
                  perfil único de habilidades e desafios, mesmo dentro da mesma
                  condição.
                </p>
              </div>

              <div className="curiosidade-item">
                <h3>4. Benefícios evolutivos</h3>
                <p>
                  Alguns cientistas acreditam que a neurodivergência foi crucial
                  para a evolução humana, trazendo pensadores inovadores e
                  solucionadores de problemas.
                </p>
              </div>
            </div>
          </section>

          <section className="conclusao-section animate__animated">
            <h2 className="proposta-title">Conclusão</h2>
            <div className="conclusao-content">
              <p>
                A neurodivergência representa uma parte essencial da diversidade
                humana, oferecendo perspectivas únicas e habilidades valiosas
                para nossa sociedade. Como vimos neste artigo, compreender e
                valorizar essas diferenças neurológicas não é apenas uma questão
                de inclusão, mas de enriquecimento coletivo.
              </p>

              <p>
                À medida que avançamos em nossa compreensão do cérebro humano,
                torna-se cada vez mais claro que a neurodiversidade é um ativo,
                não um déficit. Criar ambientes educacionais e profissionais que
                acolham e aproveitem essas diferenças é um desafio que vale a
                pena enfrentar.
              </p>

              <div className="highlight-box">
                <p>
                  "A verdadeira medida de qualquer sociedade pode ser encontrada
                  em como ela trata seus membros mais diferentes." - Adaptado de
                  Mahatma Gandhi
                </p>
              </div>

              <p>
                Que este artigo sirva como ponto de partida para reflexões e
                ações mais inclusivas. A neurodivergência não é algo a ser
                'consertado', mas sim compreendido, respeitado e celebrado como
                parte do rico espectro da experiência humana.
              </p>
            </div>
          </section>

          <section className="quiz-section animate__animated">
            <h2 className="proposta-title">Teste Seu Conhecimento</h2>
            <div className="quiz-container">
              <Quiz />
            </div>
          </section>

          <section className="artigos-sugeridos animate__animated" id="artigosSugeridos">
            <h2 className="proposta-title">Continue Explorando</h2>
            <div className="sugeridos-grid">
              <div
                className="artigo-sugerido"
                onClick={() => (window.location.href = "#")}
              >
                <img
                  src="https://t3.ftcdn.net/jpg/08/34/96/16/240_F_834961628_1JgTl2RHCXvRbicYjGuTgNtozShtRYRh.jpg"
                  alt="TDAH"
                  loading="lazy"
                />
                <h3>TDAH: Mitos e Verdades</h3>
                <p>
                  Desvendando os equívocos mais comuns sobre o Transtorno de
                  Déficit de Atenção e Hiperatividade.
                </p>
                <span className="leia-mais">Ler artigo →</span>
              </div>

              <div
                className="artigo-sugerido"
                onClick={() => (window.location.href = "#")}
              >
                <img
                  src="https://t3.ftcdn.net/jpg/03/34/03/28/240_F_334032893_Xd0qQrgaj2V2ohBLIXXcMRcAJqsjTrXq.jpg"
                  alt="Autismo"
                  loading="lazy"
                />
                <h3>Autismo no Ambiente de Trabalho</h3>
                <p>
                  Como empresas estão criando espaços mais inclusivos para
                  profissionais autistas.
                </p>
                <span className="leia-mais">Ler artigo →</span>
              </div>

              <div
                className="artigo-sugerido"
                onClick={() => (window.location.href = "#")}
              >
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Dislexia"
                  loading="lazy"
                />
                <h3>Dislexia e Criatividade</h3>
                <p>
                  A conexão surpreendente entre pensamento não-linear e soluções
                  inovadoras.
                </p>
                <span className="leia-mais">Ler artigo →</span>
              </div>

              <div
                className="artigo-sugerido"
                onClick={() => (window.location.href = "#")}
              >
                <img
                  src="https://t4.ftcdn.net/jpg/08/63/37/13/240_F_863371344_eaAoEq3Tt9P91wHZOaK8gaAKdDQNTfRb.jpg"
                  alt="Neurodiversidade"
                  loading="lazy"
                />
                <h3>Neurodiversidade na Prática</h3>
                <p>Como implementar estratégias inclusivas no dia a dia.</p>
                <span className="leia-mais">Ler artigo →</span>
              </div>
            </div>
          </section>
        </main>

        {/* Botões flutuantes com correções de hover */}
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            zIndex: 9999
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
              position: "relative"
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-5px)";
              target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
              const tooltip = target.querySelector(".tooltip");
              if (tooltip instanceof HTMLElement) {
                tooltip.style.opacity = "1";
                tooltip.style.right = "70px";
              }
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
              const tooltip = target.querySelector(".tooltip");
              if (tooltip instanceof HTMLElement) {
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
                transition: "all 0.3s ease"
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
              position: "relative"
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-5px)";
              target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
              const tooltip = target.querySelector(".tooltip");
              if (tooltip instanceof HTMLElement) {
                tooltip.style.opacity = "1";
                tooltip.style.right = "70px";
              }
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
              const tooltip = target.querySelector(".tooltip");
              if (tooltip instanceof HTMLElement) {
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
                transition: "all 0.3s ease"
              }}
              className="tooltip"
            >
              Compartilhar
            </div>
          </button>
        </div>

        <ShareModal isOpen={shareModalOpen} onClose={closeShareModal} />
      </main>
      <Footer />
    </>
  );
}
