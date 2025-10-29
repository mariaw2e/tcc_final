'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './styles.css'

// Lista de emoções expandida com conceitos de neurodivergência
const emotionsData = {
  facil: [
    { emoji: '😊', name: 'Feliz' },
    { emoji: '😢', name: 'Triste' },
    { emoji: '😡', name: 'Bravo' },
    { emoji: '😮', name: 'Surpreso' }
  ],
  medio: [
    { emoji: '😊', name: 'Feliz' },
    { emoji: '😢', name: 'Triste' },
    { emoji: '😡', name: 'Bravo' },
    { emoji: '😮', name: 'Surpreso' },
    { emoji: '😴', name: 'Sonolento' },
    { emoji: '😨', name: 'Assustado' },
    { emoji: '🤔', name: 'Pensativo' },
    { emoji: '😤', name: 'Frustrado' }
  ],
  dificil: [
    { emoji: '😊', name: 'Feliz' },
    { emoji: '😢', name: 'Triste' },
    { emoji: '😡', name: 'Bravo' },
    { emoji: '😮', name: 'Surpreso' },
    { emoji: '😴', name: 'Sonolento' },
    { emoji: '😨', name: 'Assustado' },
    { emoji: '🤔', name: 'Pensativo' },
    { emoji: '😤', name: 'Frustrado' },
    { emoji: '🥳', name: 'Animado' },
    { emoji: '😌', name: 'Calmo' },
    { emoji: '🤯', name: 'Sobrecarregado' },
    { emoji: '😇', name: 'Concentrado' }
  ]
}

// Função para criar cartas baseado no nível
const createCards = (difficulty: keyof typeof emotionsData) => {
  const emotions = emotionsData[difficulty]
  return [...emotions, ...emotions].map((emotion, index) => ({
    ...emotion,
    id: index,
    isFlipped: false,
    isMatched: false
  })).sort(() => Math.random() - 0.5)
}

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState<keyof typeof emotionsData>('facil')
  const [gameCards, setGameCards] = useState(() => createCards('facil'))
  const [firstCard, setFirstCard] = useState<number | null>(null)
  const [secondCard, setSecondCard] = useState<number | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  // Embaralhar as cartas quando o nível mudar
  useEffect(() => {
    setGameCards(createCards(difficulty))
    setFirstCard(null)
    setSecondCard(null)
    setMoves(0)
    setMatches(0)
    setGameStarted(false)
  }, [difficulty])

  // Verificar se houve uma correspondência
  useEffect(() => {
    if (firstCard === null || secondCard === null) return

    setIsLocked(true)
    setMoves(moves => moves + 1)

    if (gameCards[firstCard].name === gameCards[secondCard].name) {
      setGameCards(cards => 
        cards.map((card, index) => 
          index === firstCard || index === secondCard
            ? { ...card, isMatched: true }
            : card
        )
      )
      setMatches(matches => matches + 1)
      resetTurn()
    } else {
      setTimeout(() => {
        setGameCards(cards =>
          cards.map((card, index) =>
            index === firstCard || index === secondCard
              ? { ...card, isFlipped: false }
              : card
          )
        )
        resetTurn()
      }, 1000)
    }
  }, [firstCard, secondCard, gameCards])

  // Resetar a jogada
  const resetTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setIsLocked(false)
  }

  // Lidar com o clique na carta
  const handleCardClick = (index: number) => {
    if (isLocked) return
    if (index === firstCard) return
    if (gameCards[index].isMatched) return
    if (gameCards[index].isFlipped) return

    setGameCards(cards =>
      cards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    )

    if (firstCard === null) {
      setFirstCard(index)
    } else {
      setSecondCard(index)
    }
  }

  // Reiniciar o jogo
  const resetGame = () => {
    setGameCards(createCards(difficulty))
    setFirstCard(null)
    setSecondCard(null)
    setIsLocked(false)
    setMoves(0)
    setMatches(0)
    setGameStarted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />

      <main className="memoria-container">
        {/* Hero Section */}
        <div className="memoria-hero">
          <h1 className="memoria-title">
            Jogo da Memória Emocional
          </h1>
          <p className="memoria-description">
            Encontre os pares de emoções combinando os cartões. 
            Exercite sua memória e aprenda a reconhecer diferentes expressões!
          </p>
          <div className="memoria-stats">
            <div className="memoria-stat">
              Movimentos: <span className="memoria-stat-value">{moves}</span>
            </div>
            <div className="memoria-stat">
              Pares encontrados: <span className="memoria-stat-value">{matches} de {emotionsData[difficulty].length}</span>
            </div>
          </div>
        </div>

        {/* Seletor de Dificuldade */}
        <div className="memoria-difficulty-section">
          <h3 className="memoria-difficulty-title">Escolha a Dificuldade:</h3>
          <div className="memoria-difficulty-buttons">
            <button
              onClick={() => setDifficulty('facil')}
              className={`memoria-difficulty-btn ${
                difficulty === 'facil' ? 'active' : ''
              }`}
            >
              Fácil (4 pares)
            </button>
            <button
              onClick={() => setDifficulty('medio')}
              className={`memoria-difficulty-btn ${
                difficulty === 'medio' ? 'active' : ''
              }`}
            >
              Médio (8 pares)
            </button>
            <button
              onClick={() => setDifficulty('dificil')}
              className={`memoria-difficulty-btn ${
                difficulty === 'dificil' ? 'active' : ''
              }`}
            >
              Difícil (12 pares)
            </button>
          </div>
        </div>

          {/* Grade de Cartas */}
          <div className={`grid gap-4 mb-8 ${
            difficulty === 'facil' ? 'grid-cols-2 md:grid-cols-4' : 
            difficulty === 'medio' ? 'grid-cols-3 md:grid-cols-4' : 
            'grid-cols-3 md:grid-cols-6'
          }`}>
            {gameCards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`
                  aspect-square rounded-xl text-4xl md:text-5xl
                  transition-all duration-300 transform
                  ${card.isFlipped || card.isMatched
                    ? 'bg-white rotate-y-0'
                    : 'bg-blue-500 rotate-y-180'
                  }
                  ${card.isMatched ? 'bg-green-100' : ''}
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500
                `}
                disabled={isLocked || card.isMatched}
              >
                <span className={`
                  block transition-all duration-300
                  ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}
                `}>
                  {card.emoji}
                </span>
              </button>
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-center gap-4">
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-yellow-500 text-blue-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              Reiniciar Jogo
            </button>
            <Link
              href="/jogos"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400 transition-colors"
            >
              Voltar aos Jogos
            </Link>
          </div>

          {/* Mensagem de Vitória */}
          {matches === emotionsData[difficulty].length && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-xl text-center max-w-md mx-4">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Parabéns! 🎉
                </h2>
                <p className="text-gray-600 mb-6">
                  Você completou o jogo em {moves} movimentos!
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetGame}
                    className="px-6 py-2 bg-yellow-500 text-blue-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                  >
                    Jogar Novamente
                  </button>
                  <Link
                    href="/jogos"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400 transition-colors"
                  >
                    Outros Jogos
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
