"use client";

import { useState } from 'react';
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import SearchSection from "./components/SearchSection";
import ServicesSection from "./components/ServicesSection";
import ThemeList from "./components/ThemeList";
import RedacaoFAQ from "./components/RedacaoFAQ";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // Rola suavemente para a seção de temas populares
    setTimeout(() => {
      const temasSection = document.getElementById('temas-populares');
      if (temasSection) {
        temasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      <Header />
      <HeroBanner />
      <SearchSection onSearch={handleSearch} />
      <ServicesSection />
      <div className="background-continuity">
        <ThemeList searchTerm={searchTerm} />
        <RedacaoFAQ />
        <ContactSection />
      </div>
      <BackToTop />
      <Footer />
    </>
  );
}
