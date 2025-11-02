import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Sobre() {
  return (
    <main className="min-h-screen bg-[#f9fafb]">
      <Header />

      {/* Seção principal */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-montserrat text-4xl font-bold text-[#002147] mb-16 text-center">
            Conheça um pouco mais sobre nós
          </h1>

          {/* Cards alinhados lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-100 p-8 rounded-lg border-l-4 border-[#002147] hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#002147] mb-6">Sobre nós</h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-left">
                Na BrainWave Connect, cada detalhe é pensado para garantir que nossos serviços
                atendam às necessidades de quem mais precisa. Estamos comprometidos em oferecer
                um suporte que vai além do convencional, trabalhando para que todos se sintam
                valorizados e capacitados a viver uma vida plena e satisfatória.
              </p>
              <button className="bg-[#FFC107] text-black px-8 py-3 rounded-md font-bold hover:bg-[#ffb300] transition-colors shadow-md">
                Saiba mais
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-100 p-8 rounded-lg border-l-4 border-[#002147] hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#002147] mb-6">Nosso objetivo</h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-left">
                Nossa missão é criar um ambiente digital inclusivo e acessível que ofereça suporte
                integral e personalizado para pessoas com deficiência cognitiva. Por meio de uma
                plataforma online inovadora, disponibilizamos uma equipe de psicólogos qualificados
                e recursos especializados para promover o bem-estar, o desenvolvimento pessoal e a autonomia de nossos usuários.
              </p>
              <button className="bg-[#FFC107] text-black px-8 py-3 rounded-md font-bold hover:bg-[#ffb300] transition-colors shadow-md">
                Saiba mais
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-100 p-8 rounded-lg border-l-4 border-[#002147] hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#002147] mb-6">Comunidade</h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-left">
                Comunidade e inclusão: Promovemos um ambiente inclusivo onde nossos usuários
                podem se conectar, compartilhar experiências e encontrar suporte mútuo. Acreditamos
                na força da comunidade e na importância de construir redes de apoio.
              </p>
              <button className="bg-[#FFC107] text-black px-8 py-3 rounded-md font-bold hover:bg-[#ffb300] transition-colors shadow-md">
                Saiba mais
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
