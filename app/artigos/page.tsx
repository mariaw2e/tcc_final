"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchSection from '../components/SearchSection';
import ThemeList from '../components/ThemeList';

export default function Artigos() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SearchSection onSearch={handleSearch} />
      <ThemeList searchTerm={searchTerm} />
      <Footer />
    </main>
  );
}
