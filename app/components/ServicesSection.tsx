"use client";

import Link from 'next/link';
import './ServicesSection.css';

export default function ServicesSection() {
  return (
    <section className="servicos" id="servicos">
      <div className="container">
        <h3>Nossos Serviços</h3>
        <div className="cards">
          <Link href="/forum" className="card-link">
            <div className="card">
              <i className="fas fa-comments"></i>
              <h4>Fóruns</h4>
              <p>Conecte-se com outros pais e profissionais para trocar experiências e dicas.</p>
            </div>
          </Link>
          <Link href="/jogos" className="card-link">
            <div className="card">
              <i className="fas fa-gamepad"></i>
              <h4>Jogos Educativos</h4>
              <p>Jogos que estimulam o desenvolvimento cognitivo das crianças.</p>
            </div>
          </Link>
          <Link href="/#temas-populares" className="card-link">
            <div className="card">
              <i className="fas fa-book"></i>
              <h4>Artigos</h4>
              <p>Informações e orientações sobre como lidar com deficiências cognitivas.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
