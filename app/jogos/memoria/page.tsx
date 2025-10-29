'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  const [gameCompleted, setGameCompleted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Sistema de áudio para efeitos sonoros
  const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null

  // Sons para o jogo da memória
  const playFlipSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const playMatchSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const notes = [659.25, 783.99] // E5, G5
    
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      const startTime = audioContext.currentTime + (index * 0.1)
      oscillator.frequency.setValueAtTime(freq, startTime)
      
      gainNode.gain.setValueAtTime(0.4, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + 0.2)
    })
  }

  const playWinSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51] // C5, E5, G5, C6, E6
    
    melody.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      const startTime = audioContext.currentTime + (index * 0.15)
      oscillator.frequency.setValueAtTime(freq, startTime)
      
      gainNode.gain.setValueAtTime(0.5, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + 0.3)
    })
  }

  const playMismatchSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  // Embaralhar as cartas quando o nível mudar
  useEffect(() => {
    setGameCards(createCards(difficulty))
    setFirstCard(null)
    setSecondCard(null)
    setMoves(0)
    setMatches(0)
    setGameCompleted(false)
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
      playMatchSound()
      resetSelection()
    } else {
      setTimeout(() => {
        playMismatchSound()
        resetSelection()
      }, 1000)
    }
  }, [firstCard, secondCard, gameCards])

  // Verificar se o jogo foi completado
  useEffect(() => {
    if (matches === emotionsData[difficulty].length) {
      setGameCompleted(true)
      playWinSound()
    }
  }, [matches, difficulty])

  const resetSelection = () => {
    setFirstCard(null)
    setSecondCard(null)
    setIsLocked(false)
  }

  const handleCardClick = (index: number) => {
    if (isLocked || gameCards[index].isMatched) return
    if (index === firstCard || index === secondCard) return

    playFlipSound()

    if (firstCard === null) {
      setFirstCard(index)
    } else {
      setSecondCard(index)
    }
  }

  const resetGame = () => {
    setGameCards(createCards(difficulty))
    setFirstCard(null)
    setSecondCard(null)
    setIsLocked(false)
    setMoves(0)
    setMatches(0)
    setGameCompleted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="memoria-container">
        {/* Botão Voltar */}
        <Link href="/jogos" className="back-to-games">
          ← Voltar aos Jogos
        </Link>

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

        {/* Área do Jogo */}
        <div className="memoria-game-area">
          <div className={`memoria-grid ${difficulty}`}>
            {gameCards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`memoria-card ${
                  card.isFlipped || firstCard === index || secondCard === index ? 'flipped' : ''
                } ${
                  card.isMatched ? 'matched' : ''
                }`}
                disabled={isLocked || card.isMatched}
              >
                {card.isFlipped || card.isMatched || firstCard === index || secondCard === index
                  ? card.emoji
                  : '🧠'
                }
              </button>
            ))}
          </div>

          {/* Controles */}
          <div className="memoria-controls">
            <button
              onClick={resetGame}
              className="memoria-btn memoria-btn-primary"
            >
              Reiniciar Jogo
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`memoria-btn ${soundEnabled ? 'memoria-btn-primary' : 'memoria-btn-secondary'}`}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              {soundEnabled ? '🔊 Som Ligado' : '🔇 Som Desligado'}
            </button>
            <Link
              href="/jogos"
              className="memoria-btn memoria-btn-secondary"
            >
              Voltar aos Jogos
            </Link>
          </div>
        </div>

        {/* Modal de Vitória */}
        {gameCompleted && (
          <div className="memoria-modal">
            <div className="memoria-modal-content">
              <h2 className="memoria-modal-title">
                Parabéns! 🎉
              </h2>
              <div className="memoria-modal-stats">
                <p>Você completou o jogo da memória!</p>
                <p><strong>Movimentos:</strong> {moves}</p>
                <p><strong>Nível:</strong> {difficulty === 'facil' ? 'Fácil' : difficulty === 'medio' ? 'Médio' : 'Difícil'}</p>
                <p><strong>Pares encontrados:</strong> {matches}</p>
              </div>
              <div className="memoria-modal-buttons">
                <button
                  onClick={resetGame}
                  className="memoria-btn memoria-btn-primary"
                >
                  Jogar Novamente
                </button>
                <Link
                  href="/jogos"
                  className="memoria-btn memoria-btn-secondary"
                >
                  Voltar aos Jogos
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}