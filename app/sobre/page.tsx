import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Sobre() {
  return (
    <main className="min-h-screen bg-[#f9fafb]">
      <Header />

      {/* Seção principal */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-montserrat text-4xl font-bold text-[#002147] mb-16">
            Conheça um pouco mais sobre nós
          </h1>

          {/* Cards alinhados lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#002147] mb-4">Sobre nós</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Na BrainWave Connect, cada detalhe é pensado para garantir que nossos serviços
                atendam às necessidades de quem mais precisa. Estamos comprometidos em oferecer
                um suporte que vai além do convencional, trabalhando para que todos se sintam
                valorizados e capacitados a viver uma vida plena e satisfatória.
              </p>
              <button className="bg-[#FFC107] text-[#002147] px-6 py-2 rounded-md font-semibold hover:bg-[#ffb300] transition-colors">
                Saiba mais
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#002147] mb-4">Nosso objetivo</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nossa missão é criar um ambiente digital inclusivo e acessível que ofereça suporte
                integral e personalizado para pessoas com deficiência cognitiva. Por meio de uma
                plataforma online inovadora, disponibilizamos uma equipe de psicólogos qualificados
                e recursos especializados para promover o bem-estar e a autonomia dos usuários.
              </p>
              <button className="bg-[#FFC107] text-[#002147] px-6 py-2 rounded-md font-semibold hover:bg-[#ffb300] transition-colors">
                Saiba mais
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#002147] mb-4">Comunidade</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Promovemos um ambiente inclusivo onde nossos usuários podem se conectar,
                compartilhar experiências e encontrar suporte mútuo. Acreditamos na força da
                comunidade e na importância de construir redes de apoio que fortaleçam o
                desenvolvimento coletivo.
              </p>
              <button className="bg-[#FFC107] text-[#002147] px-6 py-2 rounded-md font-semibold hover:bg-[#ffb300] transition-colors">
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
