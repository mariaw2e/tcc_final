'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import './styles.css'

// Tipos para o quebra-cabeças
type PuzzlePiece = {
  value: number
  isEmpty: boolean
  correctPosition?: boolean
}

type PuzzleSize = 3 | 4 | 5

type PuzzleTheme = {
  id: string
  name: string
  description: string
  emoji: string
  colors: string[]
  difficulty: 'fácil' | 'médio' | 'difícil'
}

type GameStats = {
  moves: number
  time: number
  size: PuzzleSize
  theme: string
  date: string
}

// Temas disponíveis para o quebra-cabeças
const puzzleThemes: PuzzleTheme[] = [
  {
    id: 'numbers',
    name: 'Números',
    description: 'Sequência numérica clássica',
    emoji: '🔢',
    colors: ['#4CAF50', '#45a049'],
    difficulty: 'fácil'
  },
  {
    id: 'emotions',
    name: 'Emoções',
    description: 'Reconhecimento de sentimentos',
    emoji: '😊',
    colors: ['#FF6B6B', '#e55656'],
    difficulty: 'fácil'
  },
  {
    id: 'animals',
    name: 'Animais',
    description: 'Bichinhos fofinhos',
    emoji: '🐱',
    colors: ['#9C27B0', '#7B1FA2'],
    difficulty: 'médio'
  },
  {
    id: 'colors',
    name: 'Cores',
    description: 'Aprendendo as cores',
    emoji: '🌈',
    colors: ['#FF9800', '#F57C00'],
    difficulty: 'fácil'
  },
  {
    id: 'space',
    name: 'Espaço',
    description: 'Aventura no cosmos',
    emoji: '🚀',
    colors: ['#3F51B5', '#303F9F'],
    difficulty: 'difícil'
  },
  {
    id: 'nature',
    name: 'Natureza',
    description: 'Elementos da natureza',
    emoji: '🌳',
    colors: ['#4CAF50', '#388E3C'],
    difficulty: 'médio'
  }
]

// Dados para diferentes temas
const themeData = {
  numbers: (size: number) => Array.from({ length: size * size - 1 }, (_, i) => (i + 1).toString()),
  emotions: () => ['😊', '😢', '😡', '😨', '😍', '🤔', '😴', '🤗', '😎', '🥳', '😇', '🤐', '🥺', '😋', '🤤', '🤠', '🤪', '🤯', '🥸', '😷', '🤧', '🤮', '🥶', '🥵'],
  animals: () => ['🐱', '🐶', '🐰', '🐸', '🦋', '🐝', '🐠', '🦀', '🐙', '🦉', '🐧', '🦆', '🐷', '🐮', '🐴', '🦄', '🐻', '🐼', '🐨', '🦒', '🦓', '🐘', '🦏', '🦛'],
  colors: () => ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫', '⬛', '⬜', '🌈', '💖', '💛', '💚', '💙', '💜'],
  space: () => ['🚀', '🌟', '🌙', '☀️', '🪐', '🌎', '👽', '🛸', '⭐', '🌌', '🔭', '🛰️', '☄️', '🌠', '🌞', '🌛', '🌜', '🌝', '🌚', '🌓', '🌔', '🌕', '🌖', '🌗'],
  nature: () => ['🌳', '🌲', '🌿', '🍃', '🌺', '🌸', '🌼', '🌻', '🌷', '🌹', '🌾', '🍄', '🌵', '🌴', '🍀', '🌱', '🌿', '🏔️', '🌊', '🔥', '💎', '🪨', '⛰️', '🌋']
}

export default function QuebraCabeca() {
  const [size, setSize] = useState<PuzzleSize>(3)
  const [theme, setTheme] = useState<string>('numbers')
  const [puzzle, setPuzzle] = useState<PuzzlePiece[][]>([])
  const [moves, setMoves] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [gameTime, setGameTime] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [bestScores, setBestScores] = useState<GameStats[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Obter dados do tema atual
  const getCurrentThemeData = () => {
    const themeFunction = themeData[theme as keyof typeof themeData]
    if (theme === 'numbers') {
      return (themeFunction as (size: number) => string[])(size)
    }
    return (themeFunction as () => string[])().slice(0, size * size - 1)
  }

  // Inicializar o puzzle
  const initializePuzzle = (newSize: PuzzleSize) => {
    const themeElements = getCurrentThemeData()
    const newPuzzle: PuzzlePiece[][] = []
    
    for (let i = 0; i < newSize; i++) {
      newPuzzle[i] = []
      for (let j = 0; j < newSize; j++) {
        if (i === newSize - 1 && j === newSize - 1) {
          newPuzzle[i][j] = { value: 0, isEmpty: true }
        } else {
          const index = i * newSize + j
          newPuzzle[i][j] = { 
            value: theme === 'numbers' ? parseInt(themeElements[index]) : index + 1, 
            isEmpty: false,
            correctPosition: false
          }
        }
      }
    }
    
    return newPuzzle
  }

  // Verificar posições corretas para dicas
  const checkCorrectPositions = (puzzleGrid: PuzzlePiece[][]) => {
    const updatedPuzzle = puzzleGrid.map(row => [...row])
    let expectedValue = 1
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === size - 1 && j === size - 1) continue
        
        if (theme === 'numbers') {
          updatedPuzzle[i][j].correctPosition = updatedPuzzle[i][j].value === expectedValue
        } else {
          updatedPuzzle[i][j].correctPosition = updatedPuzzle[i][j].value === expectedValue
        }
        expectedValue++
      }
    }
    
    return updatedPuzzle
  }

  // Embaralhar o puzzle
  const shufflePuzzle = (puzzleToShuffle: PuzzlePiece[][]) => {
    const shuffled = [...puzzleToShuffle]
    const moves = 1000
    
    for (let i = 0; i < moves; i++) {
      const emptyPos = findEmptyPosition(shuffled)
      const possibleMoves = getPossibleMoves(shuffled, emptyPos.row, emptyPos.col)
      
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        movePiece(shuffled, randomMove.row, randomMove.col, emptyPos.row, emptyPos.col)
      }
    }
    
    return shuffled
  }

  // Encontrar posição vazia
  const findEmptyPosition = (puzzleGrid: PuzzlePiece[][]) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (puzzleGrid[i][j].isEmpty) {
          return { row: i, col: j }
        }
      }
    }
    return { row: -1, col: -1 }
  }

  // Obter movimentos possíveis
  const getPossibleMoves = (puzzleGrid: PuzzlePiece[][], emptyRow: number, emptyCol: number): { row: number; col: number }[] => {
    const moves: { row: number; col: number }[] = []
    const directions = [
      { row: -1, col: 0 }, // cima
      { row: 1, col: 0 },  // baixo
      { row: 0, col: -1 }, // esquerda
      { row: 0, col: 1 }   // direita
    ]

    directions.forEach(dir => {
      const newRow = emptyRow + dir.row
      const newCol = emptyCol + dir.col
      
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        moves.push({ row: newRow, col: newCol })
      }
    })

    return moves
  }

  // Mover peça
  const movePiece = (puzzleGrid: PuzzlePiece[][], fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const temp = puzzleGrid[fromRow][fromCol]
    puzzleGrid[fromRow][fromCol] = puzzleGrid[toRow][toCol]
    puzzleGrid[toRow][toCol] = temp
  }

  // Verificar se o puzzle está completo
  const isPuzzleComplete = (puzzleGrid: PuzzlePiece[][]) => {
    let expectedValue = 1
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === size - 1 && j === size - 1) {
          return puzzleGrid[i][j].isEmpty
        }
        if (puzzleGrid[i][j].value !== expectedValue) {
          return false
        }
        expectedValue++
      }
    }
    
    return true
  }

  // Lidar com clique na peça
  const handlePieceClick = (row: number, col: number) => {
    if (gameCompleted || puzzle[row][col].isEmpty) return

    const emptyPos = findEmptyPosition(puzzle)
    const isAdjacent = 
      (Math.abs(row - emptyPos.row) === 1 && col === emptyPos.col) ||
      (Math.abs(col - emptyPos.col) === 1 && row === emptyPos.row)

    if (isAdjacent) {
      const newPuzzle = puzzle.map(row => [...row])
      movePiece(newPuzzle, row, col, emptyPos.row, emptyPos.col)
      const updatedPuzzle = checkCorrectPositions(newPuzzle)
      setPuzzle(updatedPuzzle)
      setMoves(prev => prev + 1)

      // Tocar som de movimento
      playMoveSound()

      // Verificar se a peça está na posição correta
      const pieceValue = newPuzzle[emptyPos.row][emptyPos.col].value
      const expectedValue = emptyPos.row * size + emptyPos.col + 1
      if (pieceValue === expectedValue) {
        setTimeout(() => playCorrectSound(), 100)
      }

      if (isPuzzleComplete(newPuzzle)) {
        setGameCompleted(true)
        const finalTime = startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0
        setGameTime(finalTime)
        
        // Salvar recorde
        saveGameStats(finalTime)
        
        // Tocar som de vitória
        setTimeout(() => playWinSound(), 200)
      }
    } else {
      // Tocar som de erro para movimento inválido
      playErrorSound()
    }
  }

  // Sistema de áudio para efeitos sonoros
  const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null

  // Criar som de movimento de peça
  const playMoveSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  // Som de peça na posição correta
  const playCorrectSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15)
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  }

  // Som de vitória (melodia celebrativa)
  const playWinSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      const startTime = audioContext.currentTime + (index * 0.2)
      oscillator.frequency.setValueAtTime(freq, startTime)
      
      gainNode.gain.setValueAtTime(0.5, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + 0.3)
    })
  }

  // Som de erro (movimento inválido)
  const playErrorSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.2)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  // Som de troca de tema
  const playThemeSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  // Salvar estatísticas do jogo
  const saveGameStats = (time: number) => {
    const newStat: GameStats = {
      moves,
      time,
      size,
      theme,
      date: new Date().toLocaleDateString()
    }
    
    const updatedScores = [...bestScores, newStat]
      .sort((a, b) => {
        // Ordenar por tamanho, depois por movimentos, depois por tempo
        if (a.size !== b.size) return a.size - b.size
        if (a.moves !== b.moves) return a.moves - b.moves
        return a.time - b.time
      })
      .slice(0, 10) // Manter apenas os 10 melhores
      
    setBestScores(updatedScores)
    localStorage.setItem('puzzle-scores', JSON.stringify(updatedScores))
  }

  // Reiniciar jogo
  const resetGame = () => {
    const newPuzzle = initializePuzzle(size)
    const shuffledPuzzle = shufflePuzzle(newPuzzle)
    const updatedPuzzle = checkCorrectPositions(shuffledPuzzle)
    setPuzzle(updatedPuzzle)
    setMoves(0)
    setGameCompleted(false)
    setStartTime(new Date())
  }

  // Mudar tamanho do puzzle
  const changeSize = (newSize: PuzzleSize) => {
    setSize(newSize)
    const newPuzzle = initializePuzzle(newSize)
    const shuffledPuzzle = shufflePuzzle(newPuzzle)
    const updatedPuzzle = checkCorrectPositions(shuffledPuzzle)
    setPuzzle(updatedPuzzle)
    setMoves(0)
    setGameCompleted(false)
    setStartTime(new Date())
  }

  // Mudar tema
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme)
    setMoves(0)
    setGameCompleted(false)
    setStartTime(new Date())
    
    // Tocar som de mudança de tema
    playThemeSound()
  }

  // Renderizar valor da peça baseado no tema
  const renderPieceValue = (piece: PuzzlePiece, index: number) => {
    if (piece.isEmpty) return ''
    
    if (theme === 'numbers') {
      return piece.value.toString()
    }
    
    const themeElements = getCurrentThemeData()
    return themeElements[piece.value - 1] || piece.value
  }

  // Carregar recordes salvos
  useEffect(() => {
    const savedScores = localStorage.getItem('puzzle-scores')
    if (savedScores) {
      setBestScores(JSON.parse(savedScores))
    }
  }, [])

  // Inicializar quando o componente montar
  useEffect(() => {
    resetGame()
  }, [])

  // Atualizar quando o tamanho mudar
  useEffect(() => {
    if (puzzle.length > 0) {
      resetGame()
    }
  }, [size])

  // Atualizar quando o tema mudar
  useEffect(() => {
    resetGame()
  }, [theme])

  return (
    <div className="puzzle-container">

      {/* Hero Section */}
      <section className="puzzle-hero">
        <h1>Quebra-Cabeças Interativo</h1>
        <p>Escolha seu tema favorito e organize as peças! Múltiplos temas e dificuldades disponíveis.</p>
        <div className="puzzle-stats">
          <div className="puzzle-stat">
            <span className="puzzle-stat-label">Tema:</span>
            <span className="puzzle-stat-value">
              {puzzleThemes.find(t => t.id === theme)?.emoji} {puzzleThemes.find(t => t.id === theme)?.name}
            </span>
          </div>
          <div className="puzzle-stat">
            <span className="puzzle-stat-label">Movimentos:</span>
            <span className="puzzle-stat-value">{moves}</span>
          </div>
          {startTime && !gameCompleted && (
            <div className="puzzle-stat">
              <span className="puzzle-stat-label">Tempo:</span>
              <span className="puzzle-stat-value puzzle-timer">
                {Math.floor((Date.now() - startTime.getTime()) / 1000)}s
              </span>
            </div>
          )}
          <div className="puzzle-stat">
            <span className="puzzle-stat-label">Tamanho:</span>
            <span className="puzzle-stat-value">{size}x{size}</span>
          </div>
        </div>
      </section>

      <main className="puzzle-main">
        {/* Seletor de Tema */}
        <div className="puzzle-difficulty-section">
          <h3 className="puzzle-difficulty-title">🎨 Escolha seu Tema Favorito:</h3>
          <div className="puzzle-theme-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {puzzleThemes.map(themeOption => (
              <button
                key={themeOption.id}
                onClick={() => changeTheme(themeOption.id)}
                className={`puzzle-theme-card ${theme === themeOption.id ? 'active' : ''}`}
                style={{
                  background: theme === themeOption.id 
                    ? `linear-gradient(135deg, ${themeOption.colors[0]}, ${themeOption.colors[1]})` 
                    : 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${theme === themeOption.id ? themeOption.colors[0] : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{themeOption.emoji}</div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{themeOption.name}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>{themeOption.description}</div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  marginTop: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '12px',
                  display: 'inline-block'
                }}>
                  {themeOption.difficulty}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Seletor de Dificuldade */}
        <div className="puzzle-difficulty-section">
          <h3 className="puzzle-difficulty-title">⚡ Escolha o Nível de Dificuldade:</h3>
          <div className="puzzle-difficulty-buttons">
            <button
              onClick={() => changeSize(3)}
              className={`puzzle-btn ${
                size === 3 ? 'primary' : 'secondary'
              }`}
            >
              3x3 - Fácil 🟢
            </button>
            <button
              onClick={() => changeSize(4)}
              className={`puzzle-btn ${
                size === 4 ? 'primary' : 'secondary'
              }`}
            >
              4x4 - Médio 🟡
            </button>
            <button
              onClick={() => changeSize(5)}
              className={`puzzle-btn ${
                size === 5 ? 'primary' : 'secondary'
              }`}
            >
              5x5 - Difícil 🔴
            </button>
          </div>
        </div>

        {/* Controles Adicionais */}
        <div className="puzzle-controls-section" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setShowHints(!showHints)}
            className={`puzzle-btn ${showHints ? 'primary' : 'secondary'}`}
            style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
          >
            {showHints ? '🔍 Ocultar Dicas' : '💡 Mostrar Dicas'}
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`puzzle-btn ${showPreview ? 'primary' : 'secondary'}`}
            style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
          >
            {showPreview ? '❌ Fechar Preview' : '👁️ Ver Solução'}
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`puzzle-btn ${soundEnabled ? 'primary' : 'secondary'}`}
            style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
          >
            {soundEnabled ? '🔊 Som Ligado' : '🔇 Som Desligado'}
          </button>
        </div>

        {/* Preview da Solução */}
        {showPreview && (
          <div className="puzzle-preview" style={{
            background: 'rgba(246, 182, 0, 0.1)',
            border: '2px solid rgba(246, 182, 0, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            margin: '2rem auto',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#F6B600', marginBottom: '1rem' }}>🎯 Solução Completa:</h4>
            <div className={`puzzle-grid size-${size}`} style={{ 
              scale: '0.7',
              margin: '0 auto',
              pointerEvents: 'none'
            }}>
              {Array.from({ length: size }, (_, i) =>
                Array.from({ length: size }, (_, j) => {
                  if (i === size - 1 && j === size - 1) {
                    return <div key={`preview-${i}-${j}`} className="puzzle-piece empty"></div>
                  }
                  const value = i * size + j + 1
                  const themeElements = getCurrentThemeData()
                  const displayValue = theme === 'numbers' 
                    ? value.toString() 
                    : themeElements[value - 1] || value
                  
                  return (
                    <div key={`preview-${i}-${j}`} className="puzzle-piece completed" style={{
                      fontSize: theme === 'numbers' ? '1rem' : '1.5rem'
                    }}>
                      {displayValue}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Puzzle Grid */}
        <div className="puzzle-game-area">
          <div className="puzzle-grid-container">
            <div className={`puzzle-grid size-${size}`}>
              {puzzle.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                  const pieceIndex = rowIndex * size + colIndex
                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handlePieceClick(rowIndex, colIndex)}
                      className={`puzzle-piece ${
                        piece.isEmpty 
                          ? 'empty' 
                          : gameCompleted
                          ? 'completed'
                          : showHints && piece.correctPosition
                          ? 'correct-hint'
                          : 'filled'
                      }`}
                      style={{
                        fontSize: theme === 'numbers' ? '1.2rem' : '1.8rem',
                        background: piece.isEmpty 
                          ? 'transparent'
                          : gameCompleted 
                          ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'
                          : showHints && piece.correctPosition
                          ? 'linear-gradient(135deg, #4CAF50 0%, rgba(76, 175, 80, 0.3) 100%)'
                          : undefined
                      }}
                      disabled={piece.isEmpty || gameCompleted}
                    >
                      {renderPieceValue(piece, pieceIndex)}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Seção de Recordes */}
        {bestScores.length > 0 && (
          <div className="puzzle-records" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(246, 182, 0, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            margin: '2rem auto',
            maxWidth: '600px'
          }}>
            <h3 style={{ color: '#F6B600', textAlign: 'center', marginBottom: '1.5rem' }}>
              🏆 Melhores Recordes
            </h3>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {bestScores.slice(0, 5).map((score, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'rgba(246, 182, 0, 0.1)',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  <span style={{ color: '#F6B600', fontWeight: '600' }}>
                    #{index + 1}
                  </span>
                  <span>
                    {puzzleThemes.find(t => t.id === score.theme)?.emoji} {score.size}x{score.size}
                  </span>
                  <span>{score.moves} movimentos</span>
                  <span>{score.time}s</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    {score.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botões de Controle */}
        <div className="puzzle-controls">
          <button
            onClick={resetGame}
            className="puzzle-btn primary"
          >
            🔄 Embaralhar Novamente
          </button>
          <Link
            href="/jogos"
            className="puzzle-btn secondary"
          >
            ← Voltar aos Jogos
          </Link>
        </div>

        {/* Modal de Vitória */}
        {gameCompleted && (
          <div className="puzzle-modal">
            <div className="puzzle-modal-content">
              <h2>Parabéns! 🎉</h2>
              <p>Você completou o quebra-cabeças!</p>
              
              <div style={{ 
                background: 'rgba(246, 182, 0, 0.1)', 
                padding: '1rem', 
                borderRadius: '12px', 
                margin: '1rem 0' 
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  textAlign: 'center', 
                  marginBottom: '0.5rem' 
                }}>
                  {puzzleThemes.find(t => t.id === theme)?.emoji}
                </div>
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                  <strong>{puzzleThemes.find(t => t.id === theme)?.name}</strong>
                </div>
              </div>
              
              <p className="stats-text">
                <span className="stats-highlight">🎯 Tamanho:</span> {size}x{size}<br />
                <span className="stats-highlight">👆 Movimentos:</span> {moves}<br />
                <span className="stats-highlight">⏱️ Tempo:</span> {gameTime} segundos<br />
                <span className="stats-highlight">🏅 Eficiência:</span> {
                  moves <= size * size ? 'Excelente!' : 
                  moves <= size * size * 2 ? 'Muito bom!' : 
                  'Pode melhorar!'
                }
              </p>
              
              <div className="puzzle-modal-actions">
                <button
                  onClick={resetGame}
                  className="puzzle-btn primary"
                >
                  🔄 Jogar Novamente
                </button>
                <Link
                  href="/jogos"
                  className="puzzle-btn secondary"
                >
                  ← Voltar aos Jogos
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}