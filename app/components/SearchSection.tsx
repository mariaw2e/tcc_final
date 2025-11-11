"use client";

import React, { useState } from "react";

interface SearchSectionProps {
  onSearch?: (searchTerm: string) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Busca em tempo real enquanto digita
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <section className="search-section" style={{ marginTop: 0 }}>
      <div className="container">
        <div className="texto-pesquisa">
          <h2>Artigos Disponíveis</h2>
          <p>Mergulhe profundamente em vários temas e encontre um novo artigo toda a semana.</p>
        </div>
        <div className="search-wrapper">
          <div className="input-container">
            <input
              type="text"
              id="searchInput"
              placeholder="Buscar temas..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button 
              type="button" 
              className="search-icon-btn"
              onClick={handleSearch}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}