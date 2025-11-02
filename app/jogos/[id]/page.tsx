import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface GamePageProps {
  params: Promise<{
    id: string
  }>
}

const getGameData = (id: string) => {
  // Aqui você pode buscar os dados do jogo de uma API ou banco de dados
  // Por enquanto, vamos usar dados estáticos
  const games = {
    'memoria': {
      title: 'Jogo da Memória',
      description: 'Exercite sua memória e concentração com este jogo divertido e educativo.',
      image: '/imagens/img4.jpg',
      category: 'Memória',
      ageRange: '4-12 anos',
      instructions: `
        <h2>Como Jogar</h2>
        <p>O Jogo da Memória é uma atividade divertida que ajuda a desenvolver:</p>
        <ul>
          <li>Memória visual</li>
          <li>Concentração</li>
          <li>Reconhecimento de padrões</li>
          <li>Habilidades cognitivas</li>
        </ul>

        <h2>Instruções</h2>
        <ol>
          <li>Clique em uma carta para virá-la</li>
          <li>Tente encontrar o par correspondente</li>
          <li>Se as cartas forem iguais, elas permanecerão viradas</li>
          <li>Se forem diferentes, elas voltarão a ficar escondidas</li>
          <li>Continue até encontrar todos os pares</li>
        </ol>
      `
    },
    'quebra-cabeca': {
      title: 'Quebra-Cabeça',
      description: 'Desenvolva o raciocínio lógico e a coordenação motora montando quebra-cabeças.',
      image: '/imagens/img5.jpg',
      category: 'Lógica',
      ageRange: '3-10 anos',
      instructions: `
        <h2>Como Jogar</h2>
        <p>O Quebra-Cabeça é uma atividade que desenvolve:</p>
        <ul>
          <li>Raciocínio lógico</li>
          <li>Coordenação motora</li>
          <li>Percepção visual</li>
          <li>Resolução de problemas</li>
        </ul>

        <h2>Instruções</h2>
        <ol>
          <li>Escolha uma imagem para montar</li>
          <li>Arraste as peças para o local correto</li>
          <li>Use as dicas visuais para encontrar a posição certa</li>
          <li>Complete a imagem juntando todas as peças</li>
        </ol>
      `
    },
    'palavras': {
      title: 'Caça Palavras',
      description: 'Aprimore seu vocabulário e habilidades de busca com este jogo educativo.',
      image: '/imagens/img6.jpg',
      category: 'Linguagem',
      ageRange: '6-12 anos',
      instructions: `
        <h2>Como Jogar</h2>
        <p>O Caça Palavras ajuda a desenvolver:</p>
        <ul>
          <li>Vocabulário</li>
          <li>Atenção aos detalhes</li>
          <li>Habilidades de busca</li>
          <li>Reconhecimento de palavras</li>
        </ul>

        <h2>Instruções</h2>
        <ol>
          <li>Escolha um tema de palavras</li>
          <li>Procure as palavras na grade</li>
          <li>Clique e arraste para marcar as palavras encontradas</li>
          <li>Encontre todas as palavras da lista</li>
        </ol>
      `
    }
  }

  return games[id as keyof typeof games]
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  const game = getGameData(id)

  if (!game) {
    return <div>Jogo não encontrado</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      {/* Banner do Jogo */}
      <section className="relative h-[400px] mt-20">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-white text-center">
            <h1 className="font-montserrat text-4xl mb-4">
              {game.title}
            </h1>
            <div className="flex justify-center gap-4 text-sm">
              <span>{game.category}</span>
              <span>•</span>
              <span>{game.ageRange}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Área do Jogo */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="font-montserrat text-2xl text-primary mb-6">
            Área do Jogo
          </h2>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Área reservada para o jogo interativo
            </p>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div 
            className="prose prose-lg mx-auto"
            dangerouslySetInnerHTML={{ __html: game.instructions }}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
