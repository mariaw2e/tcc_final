'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaSearch, FaBrain, FaPuzzlePiece, FaBook, FaCalculator, FaPalette, FaSmile, FaBullseye, FaGamepad, FaHeart, FaUsers, FaChartLine } from 'react-icons/fa'

// Lista de jogos
const games = [
  {
    title: "Jogo da Memória Emocional",
    description: "Combine expressões faciais para aprender sobre emoções",
    category: "memoria",
    ageGroup: "3-5",
    difficulty: "facil",
    link: "/jogos/memoria",
    image: "/imagens/img4.jpg",
    tags: ["memória", "emoções", "atenção"]
  },
  {
    title: "Labirinto das Palavras",
    description: "Encontre o caminho formando palavras corretas",
    category: "linguagem",
    ageGroup: "6-8",
    difficulty: "medio",
    link: "/jogos/labirinto",
    image: "/imagens/img5.jpg",
    tags: ["linguagem", "leitura", "concentração"]
  },
  {
    title: "Quebra-Cabeça Numérico",
    description: "Organize os números na sequência correta para vencer",
    category: "numeros",
    ageGroup: "6-8",
    difficulty: "medio",
    link: "/jogos/numeros",
    image: "/imagens/img6.jpg",
    tags: ["números", "raciocínio", "sequência"]
  }
]

// Categorias de jogos
const categories = [
  { id: 'memoria', name: 'Memória', icon: FaBrain },
  { id: 'logica', name: 'Lógica', icon: FaPuzzlePiece },
  { id: 'linguagem', name: 'Linguagem', icon: FaBook },
  { id: 'numeros', name: 'Números', icon: FaCalculator },
  { id: 'cores', name: 'Cores', icon: FaPalette },
  { id: 'emocional', name: 'Emocional', icon: FaSmile },
  { id: 'atencao', name: 'Atenção', icon: FaBullseye },
  { id: 'todos', name: 'Todos os Jogos', icon: FaGamepad }
]

// Benefícios dos jogos
const benefits = [
  {
    icon: FaBrain,
    title: "Estimulação Cognitiva",
    description: "Desenvolve habilidades de memória, atenção e raciocínio lógico"
  },
  {
    icon: FaHeart,
    title: "Desenvolvimento Emocional",
    description: "Ajuda no reconhecimento e expressão de emoções"
  },
  {
    icon: FaUsers,
    title: "Habilidades Sociais",
    description: "Promove interação e comunicação em ambiente seguro"
  },
  {
    icon: FaChartLine,
    title: "Acompanhamento de Progresso",
    description: "Relatórios detalhados para pais e terapeutas"
  }
]

// Progresso de desenvolvimento
const progressItems = [
  { name: "Página Inicial", progress: 100 },
  { name: "Login e Cadastro", progress: 100 },
  { name: "Página de Jogos", progress: 85 },
  { name: "Sistema de Fóruns", progress: 20 },
  { name: "Controle Parental", progress: 10 }
]

export default function Jogos() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [searchText, setSearchText] = useState('')
  const [ageFilter, setAgeFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('')

  const filteredGames = games.filter(game => {
    if (activeCategory !== 'todos' && game.category !== activeCategory) {
      return false
    }
    
    if (ageFilter && game.ageGroup !== ageFilter) {
      return false
    }
    
    if (difficultyFilter && game.difficulty !== difficultyFilter) {
      return false
    }
    
    if (searchText) {
      const searchLower = searchText.toLowerCase()
      return (
        game.title.toLowerCase().includes(searchLower) ||
        game.description.toLowerCase().includes(searchLower) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    
    return true
  })

  return (
    <div className="min-h-screen bg-[#f0f8ff]">
      <Header />

      {/* Introdução */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-300 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Jogos Educativos</h1>
          <p className="text-xl">
            Mais de 20 jogos desenvolvidos para estimulação cognitiva de crianças neurodivergentes
          </p>
        </div>
      </section>

      {/* Filtros */}
      <div className="container mx-auto px-4 -mt-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar jogos..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          >
            <option value="">Todas as idades</option>
            <option value="3-5">3-5 anos</option>
            <option value="6-8">6-8 anos</option>
            <option value="9-12">9-12 anos</option>
          </select>

          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="">Todas as dificuldades</option>
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
        </div>
      </div>

      {/* Lista de Jogos */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.length === 0 ? (
            <p className="text-gray-500 text-center text-xl py-12 col-span-full">
              Nenhum jogo encontrado com os filtros selecionados
            </p>
          ) : (
            filteredGames.map((game, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{game.title}</h3>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={game.link}
                    className="block w-full text-center bg-yellow-500 text-blue-900 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                  >
                    Jogar Agora
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Categorias */}
      <section className="container mx-auto px-4 my-16">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Filtre por Categoria
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  p-4 rounded-xl transition-all flex flex-col items-center gap-2
                  ${activeCategory === category.id
                    ? 'bg-yellow-500 text-blue-900'
                    : 'bg-white hover:bg-yellow-50'
                  }
                `}
              >
                <Icon className="text-2xl" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Benefícios */}
      <section className="container mx-auto px-4 my-16">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Benefícios dos Nossos Jogos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:-translate-y-2 transition-transform"
              >
                <Icon className="text-4xl text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Progresso */}
      <section className="container mx-auto px-4 my-16">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Progresso de Desenvolvimento
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {progressItems.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm font-medium text-blue-900 mb-2">
                <span>{item.name}</span>
                <span>{item.progress}%</span>
              </div>
              <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section className="container mx-auto px-4 my-16">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-pink-100 to-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Dúvidas sobre nossos jogos?
          </h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe de especialistas está pronta para ajudar você a escolher os jogos mais adequados
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Deixe aqui o seu WhatsApp"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            />
            <button className="px-6 py-2 bg-yellow-500 text-blue-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              Enviar
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
