'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles.css';

interface Word {
  word: string;
  hint: string;
  found: boolean;
}

interface Position {
  row: number;
  col: number;
}

const wordLists = [
  {
    difficulty: 'Fácil',
    words: [
      { word: 'GATO', hint: 'Animal felino doméstico' },
      { word: 'CASA', hint: 'Onde moramos' },
      { word: 'SOL', hint: 'Estrela que ilumina o dia' },
      { word: 'MAR', hint: 'Grande volume de água salgada' },
      { word: 'FLOR', hint: 'Parte colorida da planta' },
    ]
  },
  {
    difficulty: 'Médio',
    words: [
      { word: 'AMIGO', hint: 'Pessoa querida' },
      { word: 'FAMILIA', hint: 'Grupo de parentes' },
      { word: 'ESCOLA', hint: 'Lugar de aprender' },
      { word: 'ALEGRIA', hint: 'Sentimento de felicidade' },
      { word: 'LIVRO', hint: 'Objeto com páginas para ler' },
    ]
  },
  {
    difficulty: 'Difícil',
    words: [
      { word: 'AMIZADE', hint: 'Laço entre amigos' },
      { word: 'BORBOLETA', hint: 'Inseto colorido que voa' },
      { word: 'FELICIDADE', hint: 'Estado de completa alegria' },
      { word: 'ARCOIRIS', hint: 'Aparece no céu após a chuva' },
      { word: 'GRATIDAO', hint: 'Sentimento de agradecimento' },
    ]
  }
];

export default function CacaPalavrasGame() {
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedCells, setSelectedCells] = useState<Position[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gridSize, setGridSize] = useState(10);

  useEffect(() => {
    const saved = localStorage.getItem('caca-palavras-best-score');
    if (saved) setBestScore(parseInt(saved));
  }, []);

  const startGame = (difficultyIndex: number) => {
    setDifficulty(difficultyIndex);
    const selectedWords = wordLists[difficultyIndex].words.map(w => ({
      ...w,
      found: false
    }));
    setWords(selectedWords);
    setFoundWords([]);
    setSelectedCells([]);
    setScore(0);
    setGameOver(false);
    
    const size = difficultyIndex === 0 ? 8 : difficultyIndex === 1 ? 10 : 12;
    setGridSize(size);
    generateGrid(selectedWords.map(w => w.word), size);
  };

  const generateGrid = (wordList: string[], size: number) => {
    const newGrid: string[][] = Array(size).fill(null).map(() => 
      Array(size).fill('')
    );

    const directions = [
      { dx: 0, dy: 1 },  // horizontal
      { dx: 1, dy: 0 },  // vertical
      { dx: 1, dy: 1 },  // diagonal
    ];

    wordList.forEach(word => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const startRow = Math.floor(Math.random() * size);
        const startCol = Math.floor(Math.random() * size);
        
        if (canPlaceWord(newGrid, word, startRow, startCol, direction, size)) {
          placeWord(newGrid, word, startRow, startCol, direction);
          placed = true;
        }
        attempts++;
      }
    });

    fillEmptySpaces(newGrid, size);
    setGrid(newGrid);
  };

  const canPlaceWord = (
    grid: string[][], 
    word: string, 
    startRow: number, 
    startCol: number, 
    direction: { dx: number; dy: number },
    size: number
  ): boolean => {
    const endRow = startRow + (word.length - 1) * direction.dx;
    const endCol = startCol + (word.length - 1) * direction.dy;

    if (endRow >= size || endCol >= size || endRow < 0 || endCol < 0) {
      return false;
    }

    for (let i = 0; i < word.length; i++) {
      const row = startRow + i * direction.dx;
      const col = startCol + i * direction.dy;
      if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
        return false;
      }
    }

    return true;
  };

  const placeWord = (
    grid: string[][], 
    word: string, 
    startRow: number, 
    startCol: number, 
    direction: { dx: number; dy: number }
  ) => {
    for (let i = 0; i < word.length; i++) {
      const row = startRow + i * direction.dx;
      const col = startCol + i * direction.dy;
      grid[row][col] = word[i];
    }
  };

  const fillEmptySpaces = (grid: string[][], size: number) => {
    const letters = 'ABCDEFGHIJLMNOPQRSTUVXZ';
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  };

  const handleCellMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    
    const lastCell = selectedCells[selectedCells.length - 1];
    if (!lastCell) return;

    if (Math.abs(row - lastCell.row) <= 1 && Math.abs(col - lastCell.col) <= 1) {
      const newCell = { row, col };
      if (!selectedCells.some(cell => cell.row === row && cell.col === col)) {
        setSelectedCells([...selectedCells, newCell]);
      }
    }
  };

  const handleCellMouseUp = () => {
    setIsSelecting(false);
    checkWord();
  };

  const checkWord = () => {
    if (selectedCells.length < 2) {
      setSelectedCells([]);
      return;
    }

    const selectedWord = selectedCells.map(pos => grid[pos.row][pos.col]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    const foundWord = words.find(w => 
      (w.word === selectedWord || w.word === reversedWord) && !w.found
    );

    if (foundWord) {
      setFoundWords([...foundWords, foundWord.word]);
      setWords(words.map(w => 
        w.word === foundWord.word ? { ...w, found: true } : w
      ));
      setScore(score + foundWord.word.length * 10);

      if (foundWords.length + 1 === words.length) {
        const finalScore = score + foundWord.word.length * 10;
        if (finalScore > bestScore) {
          setBestScore(finalScore);
          localStorage.setItem('caca-palavras-best-score', finalScore.toString());
        }
        setTimeout(() => setGameOver(true), 1000);
      }
    }

    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const isCellInFoundWord = (row: number, col: number): boolean => {
    return false;
  };

  const restartGame = () => {
    setDifficulty(null);
    setGrid([]);
    setWords([]);
    setSelectedCells([]);
    setFoundWords([]);
    setGameOver(false);
    setScore(0);
  };

  if (difficulty === null) {
    return (
      <div className="caca-page">
        <div className="caca-container">
          <Link href="/jogos" className="caca-back-button">
            ← Voltar aos Jogos
          </Link>

          <div className="caca-header">
            <h1 className="caca-title">🔍 Caça Palavras Divertido 🔎</h1>
            <p className="caca-subtitle">
              Encontre as palavras escondidas no grid!
            </p>
          </div>

          <div className="caca-difficulty-selection">
            <h2>Escolha a dificuldade:</h2>
            <div className="caca-difficulty-buttons">
              {wordLists.map((list, index) => (
                <button
                  key={index}
                  className="caca-difficulty-button"
                  onClick={() => startGame(index)}
                >
                  <span className="caca-difficulty-icon">
                    {index === 0 ? '😊' : index === 1 ? '🤔' : '🧠'}
                  </span>
                  <span className="caca-difficulty-name">{list.difficulty}</span>
                  <span className="caca-difficulty-info">
                    {list.words.length} palavras
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="caca-page">
        <div className="caca-container">
          <Link href="/jogos" className="caca-back-button">
            ← Voltar aos Jogos
          </Link>

          <div className="caca-result-card">
            <div className="caca-result-icon">🏆</div>
            <h2 className="caca-result-title">Parabéns!</h2>
            <p className="caca-result-message">Você encontrou todas as palavras!</p>
            
            <div className="caca-result-stats">
              <div className="caca-stat-item">
                <span className="caca-stat-label">Pontuação Final</span>
                <span className="caca-stat-value">{score}</span>
              </div>
              <div className="caca-stat-item">
                <span className="caca-stat-label">Palavras Encontradas</span>
                <span className="caca-stat-value">{foundWords.length}</span>
              </div>
              <div className="caca-stat-item">
                <span className="caca-stat-label">Melhor Pontuação</span>
                <span className="caca-stat-value highlight">{bestScore}</span>
              </div>
            </div>

            <div className="caca-result-actions">
              <button className="caca-restart-button" onClick={restartGame}>
                🔄 Jogar Novamente
              </button>
              <Link href="/jogos" className="caca-home-button">
                🏠 Voltar aos Jogos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="caca-page">
      <div className="caca-container">
        <Link href="/jogos" className="caca-back-button">
          ← Voltar aos Jogos
        </Link>

        <div className="caca-header">
          <h1 className="caca-title">🔍 Caça Palavras Divertido 🔎</h1>
          <p className="caca-subtitle">
            Dificuldade: {wordLists[difficulty].difficulty}
          </p>
        </div>

        <div className="caca-game-area">
          <div className="caca-score-panel">
            <div className="caca-score-item">
              <span className="caca-score-label">Pontuação:</span>
              <span className="caca-score-value">{score}</span>
            </div>
            <div className="caca-score-item">
              <span className="caca-score-label">Encontradas:</span>
              <span className="caca-score-value">{foundWords.length}/{words.length}</span>
            </div>
          </div>

          <div className="caca-main-content">
            <div 
              className="caca-grid"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`
              }}
              onMouseLeave={() => {
                if (isSelecting) {
                  setIsSelecting(false);
                  checkWord();
                }
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`caca-cell ${isCellSelected(rowIndex, colIndex) ? 'selected' : ''} ${isCellInFoundWord(rowIndex, colIndex) ? 'found' : ''}`}
                    onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                    onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                    onMouseUp={handleCellMouseUp}
                  >
                    {letter}
                  </div>
                ))
              )}
            </div>

            <div className="caca-words-list">
              <h3>Palavras para encontrar:</h3>
              <div className="caca-words-grid">
                {words.map((word, index) => (
                  <div 
                    key={index} 
                    className={`caca-word-item ${word.found ? 'found' : ''}`}
                  >
                    <div className="caca-word-text">
                      {word.found ? '✓ ' : '◯ '}
                      {word.word}
                    </div>
                    <div className="caca-word-hint">{word.hint}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
