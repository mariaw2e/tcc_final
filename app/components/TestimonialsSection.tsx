"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./TestimonialsSection.css";

// Dados de depoimentos
const depoimentosData = [
  // Autismo
  {
    id: 1,
    nome: "Maria Silva",
    idade: 28,
    condicao: "Autismo",
    texto: "O BrainWave Connect transformou minha vida. Aqui encontrei uma comunidade que me compreende e recursos que me ajudaram a desenvolver habilidades sociais de forma natural e respeitosa.",
    foto: "/imagens/img1.jpg",
    profissao: "Desenvolvedora de Software",
    destaque: true
  },
  {
    id: 6,
    nome: "Carlos Eduardo",
    idade: 29,
    condicao: "Autismo",
    texto: "Como pai de uma criança autista, encontrei aqui não apenas suporte para mim, mas também recursos valiosos para ajudar meu filho em seu desenvolvimento.",
    foto: "/imagens/img6.jpg",
    profissao: "Engenheiro",
    destaque: true
  },
  // TDAH
  {
    id: 2,
    nome: "João Oliveira",
    idade: 24,
    condicao: "TDAH",
    texto: "Sempre tive dificuldade em me concentrar, mas os recursos e técnicas que encontrei aqui realmente fazem diferença. Agora sei como trabalhar com meu cérebro, não contra ele.",
    foto: "/imagens/img2.jpg",
    profissao: "Designer",
    destaque: true
  },
  {
    id: 7,
    nome: "Ana Beatriz",
    idade: 32,
    condicao: "TDAH",
    texto: "Descobrir que tenho TDAH na fase adulta foi desafiador. A plataforma me ajudou a compreender meus padrões de pensamento e comportamento, proporcionando ferramentas práticas para o dia a dia.",
    foto: "/imagens/img7.jpg",
    profissao: "Jornalista",
    destaque: false
  },
  // Dislexia
  {
    id: 3,
    nome: "Pedro Santos",
    idade: 19,
    condicao: "Dislexia",
    texto: "Durante toda minha vida escolar lutei com a leitura. Os recursos adaptados e estratégias que aprendi aqui me fizeram perceber que posso aprender de forma diferente, mas igualmente eficaz.",
    foto: "/imagens/img3.jpg",
    profissao: "Estudante de Artes",
    destaque: true
  },
  {
    id: 8,
    nome: "Laura Mendes",
    idade: 41,
    condicao: "Dislexia",
    texto: "Como professora com dislexia, encontrei ferramentas valiosas para não apenas melhorar minha própria experiência, mas também para ajudar meus alunos neurodivergentes.",
    foto: "/imagens/img8.jpg",
    profissao: "Professora",
    destaque: false
  },
  // Ansiedade Social
  {
    id: 4,
    nome: "Juliana Costa",
    idade: 26,
    condicao: "Ansiedade Social",
    texto: "A ansiedade social sempre me impediu de mostrar meu potencial. Com o suporte da comunidade e recursos específicos, tenho feito progressos significativos na minha confiança social.",
    foto: "/imagens/img4.jpg",
    profissao: "Contadora",
    destaque: true
  },
  {
    id: 9,
    nome: "Roberto Almeida",
    idade: 35,
    condicao: "Ansiedade Social",
    texto: "As técnicas de gestão de ansiedade e simulações sociais me ajudaram a preparar para entrevistas de emprego e situações de networking que antes eu evitaria completamente.",
    foto: "/imagens/img9.jpg",
    profissao: "Analista de Marketing",
    destaque: false
  },
  // Síndrome de Asperger
  {
    id: 5,
    nome: "Rafael Nunes",
    idade: 31,
    condicao: "Síndrome de Asperger",
    texto: "Encontrar recursos especializados para adultos com Asperger é raro. Aqui descobri conteúdo que realmente entende minhas necessidades específicas e como posso utilizar minhas habilidades únicas.",
    foto: "/imagens/img5.jpg",
    profissao: "Programador",
    destaque: true
  },
  {
    id: 10,
    nome: "Camila Rocha",
    idade: 27,
    condicao: "Síndrome de Asperger",
    texto: "A plataforma me ajudou a entender melhor as nuances sociais e desenvolver estratégias para navegar em situações sociais complexas no trabalho.",
    foto: "/imagens/img15.jpg",
    profissao: "Cientista de Dados",
    destaque: true
  }
];

// Categorias para filtragem
const categoriasFilters = [
  { id: 'todos', label: 'Todos os Depoimentos' },
  { id: 'autismo', label: 'Autismo' },
  { id: 'tdah', label: 'TDAH' },
  { id: 'dislexia', label: 'Dislexia' },
  { id: 'ansiedade', label: 'Ansiedade Social' },
  { id: 'asperger', label: 'Síndrome de Asperger' }
];

// Componente de imagem otimizada
const OptimizedImage = ({ src, alt, className, ...props }: { src: string, alt: string, className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`image-container ${className || ''}`}>
      {!loaded && !error && (
        <div className="image-placeholder">
          <div className="spinner"></div>
        </div>
      )}
      {error ? (
        <div className="image-error">
          <span>Imagem não disponível</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={80}
          height={80}
          className={`optimized-image ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </div>
  );
};

export default function TestimonialsSection() {
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [depoimentoExpandido, setDepoimentoExpandido] = useState<number | null>(null);

  const filtrarDepoimentos = () => {
    if (filtroAtivo === 'todos') return depoimentosData;
    
    const filtrosMap: {[key: string]: string[]} = {
      'autismo': ['Autismo'],
      'tdah': ['TDAH'],
      'dislexia': ['Dislexia'],
      'ansiedade': ['Ansiedade Social'],
      'asperger': ['Síndrome de Asperger']
    };

    const condicoesParaFiltrar = filtrosMap[filtroAtivo] || [];
    
    return depoimentosData.filter(depoimento => 
      condicoesParaFiltrar.some(condicao => 
        depoimento.condicao.toLowerCase().includes(condicao.toLowerCase())
      )
    );
  };

  const toggleDepoimento = (id: number) => {
    setDepoimentoExpandido(depoimentoExpandido === id ? null : id);
  };

  const handleFilterClick = (filterId: string) => {
    setFiltroAtivo(filterId);
    
    // Scroll suave para o título das histórias em destaque
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const titleElement = document.getElementById('featured-stories-title');
        if (titleElement) {
          const rect = titleElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - 90; // 90px de offset para mostrar o título completo
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 200); // Aumentado para 200ms para dar tempo do conteúdo atualizar
  };

  const depoimentosFiltrados = filtrarDepoimentos();

  return (
    <section className="testimonials-section">
      {/* Header da Seção - agora dentro do card de filtros */}
      <div className="testimonials-filters">
        <div className="testimonials-header-card">
          <h1>Depoimentos da Nossa Comunidade</h1>
          <p>Conheça as histórias inspiradoras de pessoas que encontraram apoio, compreensão e crescimento em nossa plataforma.</p>
        </div>
        
        <div className="filters-container">
          {categoriasFilters.map(categoria => (
            <button 
              key={categoria.id}
              className={`filter-btn ${filtroAtivo === categoria.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(categoria.id)}
            >
              {categoria.label}
            </button>
          ))}
        </div>
      </div>

      {/* Container de Depoimentos */}
      <div id="testimonials-stories" className="testimonials-container">
        {/* Depoimentos em Destaque */}
        <div className="featured-testimonials">
          <h2 id="featured-stories-title">
            {filtroAtivo === 'todos' 
              ? 'Histórias em Destaque' 
              : `Histórias em Destaque - ${categoriasFilters.find(c => c.id === filtroAtivo)?.label || 'Categoria'}`
            }
          </h2>
          {/* Aplicamos classes diferentes com base no número de cards para melhor centralização */}
          <div className={`featured-grid ${depoimentosFiltrados.filter(d => d.destaque).length <= 3 ? 'few-items' : ''}`}>
            {depoimentosFiltrados
              .filter(depoimento => depoimento.destaque)
              .slice(0, filtroAtivo === 'todos' ? 4 : 3) // Reduzindo o número de cards para evitar overflow
              .map(depoimento => (
                <div key={depoimento.id} className="featured-testimonial-card">
                  <div className="testimonial-photo">
                    <OptimizedImage 
                      src={depoimento.foto} 
                      alt={depoimento.nome}
                    />
                    <div className="condition-badge">{depoimento.condicao}</div>
                  </div>
                  <div className="testimonial-content">
                    <h3>{depoimento.nome}</h3>
                    <p className="profession">{depoimento.profissao}</p>
                    <p className="age">{depoimento.idade} anos</p>
                    <blockquote>"{depoimento.texto}"</blockquote>
                  </div>
                </div>
              ))}
          </div>
          
          {/* Mensagem quando não há depoimentos em destaque para a categoria */}
          {depoimentosFiltrados.filter(d => d.destaque).length === 0 && filtroAtivo !== 'todos' && (
            <div className="no-featured-message">
              <p>Ainda não temos histórias em destaque para esta categoria, mas você pode ver todos os depoimentos abaixo!</p>
            </div>
          )}
        </div>

        {/* Todos os Depoimentos */}
        <div className="all-testimonials">
          <h2>Todos os Depoimentos</h2>
          <div className={`testimonials-grid ${depoimentosFiltrados.length <= 4 ? 'few-items' : ''}`}>
            {depoimentosFiltrados
              .slice(0, 8) // Limitando o número total de depoimentos para não sobrecarregar a página
              .map(depoimento => (
              <div key={depoimento.id} className="testimonial-card">
                <div className="card-header">
                  <OptimizedImage 
                    src={depoimento.foto} 
                    alt={depoimento.nome} 
                    className="avatar"
                  />
                  <div className="user-info">
                    <h4>{depoimento.nome}</h4>
                    <p className="profession">{depoimento.profissao}</p>
                    <span className="condition-tag">{depoimento.condicao}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <blockquote 
                    className={`testimonial-text ${depoimentoExpandido === depoimento.id ? 'expanded' : ''}`}
                  >
                    "{depoimento.texto}"
                  </blockquote>
                  
                  {depoimento.texto.length > 120 && (
                    <button 
                      className="read-more-btn"
                      onClick={() => toggleDepoimento(depoimento.id)}
                    >
                      {depoimentoExpandido === depoimento.id ? 'Ler menos' : 'Ler mais'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}