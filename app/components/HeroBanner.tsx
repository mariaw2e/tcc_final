"use client";

import { useState, useEffect } from 'react';
import './HeroBanner.css';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/imagens/img1.jpg',
      title: 'Transformando a Inclusão e o Apoio à Neurodiversidade',
      description: 'Nosso compromisso é transformar a vida de pessoas neurodivergentes e suas famílias, proporcionando suporte especializado para aqueles com TEA, TDAH, autismo e outras condições.'
    },
    {
      image: '/imagens/img2.jpg',
      title: 'Educação Inclusiva e Personalizada',
      description: 'Oferecemos recursos educacionais adaptados às necessidades individuais, promovendo o desenvolvimento pleno de cada pessoa.'
    },
    {
      image: '/imagens/img3.jpg',
      title: 'Comunidade de Apoio e Compreensão',
      description: 'Conecte-se com famílias, profissionais e pessoas neurodivergentes em um ambiente acolhedor e respeitoso.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-banner">
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={slide.image}
                alt={slide.title}
                className="slide-image"
              />
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>

        {/* Conteúdo do Banner */}
        <div className="banner-content">
          <h2 className="banner-title">{slides[currentSlide].title}</h2>
          <p className="banner-description">{slides[currentSlide].description}</p>
          <a href="#servicos" className="banner-btn">Saiba Mais</a>
        </div>

        {/* Botões de Navegação */}
        <button className="carousel-btn prev" onClick={prevSlide} aria-label="Anterior">
          ‹
        </button>
        <button className="carousel-btn next" onClick={nextSlide} aria-label="Próximo">
          ›
        </button>

        {/* Indicadores */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
