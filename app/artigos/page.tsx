import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchSection from '../components/SearchSection';
import ThemeList from '../components/ThemeList';

export default function Artigos() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SearchSection />
      <ThemeList />
      <Footer />
    </main>
  );
}
