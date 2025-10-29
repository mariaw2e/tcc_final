'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles.css';

interface Puzzle {
  id: number;
  name: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pieces: number;
}

const puzzles: Puzzle[] = [
  { id: 1, name: 'Le�o', emoji: '??', difficulty: 'easy', pieces: 4 },
  { id: 2, name: 'Elefante', emoji: '??', difficulty: 'easy', pieces: 4 },
  { id: 3, name: 'Panda', emoji: '??', difficulty: 'medium', pieces: 6 },
  { id: 4, name: 'Tigre', emoji: '??', difficulty: 'medium', pieces: 6 },
  { id: 5, name: 'Urso', emoji: '??', difficulty: 'hard', pieces: 9 },
  { id: 6, name: 'Raposa', emoji: '??', difficulty: 'hard', pieces: 9 }
];

export default function QuebraCabecaPage() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const [pieces, setPieces] = useState<number[]>([]);
  const [solvedPieces, setSolvedPieces] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  useEffect(() => {
    if (selectedPuzzle) {
      const pieceArray = Array.from({ length: selectedPuzzle.pieces }, (_, i) => i);
      const shuffled = pieceArray.sort(() => Math.random() - 0.5);
      setPieces(shuffled);
      setSolvedPieces(new Set());
      setStartTime(Date.now());
    }
  }, [selectedPuzzle]);

  const handlePieceClick = (pieceIndex: number, actualPosition: number) => {
    if (solvedPieces.has(actualPosition)) return;

    if (pieceIndex === actualPosition) {
      const newSolved = new Set(solvedPieces);
      newSolved.add(actualPosition);
      setSolvedPieces(newSolved);
      setScore(score + 10);
      playSound(true);

      if (newSolved.size === selectedPuzzle?.pieces) {
        setEndTime(Date.now());
        setGameOver(true);
        saveScore();
      }
    } else {
      playSound(false);
    }
  };

  const playSound = (isCorrect: boolean) => {
    const audio = new Audio(
      isCorrect 
        ? 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3'
    );
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Audio play failed:', err));
  };

  const saveScore = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const record = {
      score: score + 10,
      time: timeSpent,
      date: new Date().toISOString(),
      puzzle: selectedPuzzle?.name
    };
    localStorage.setItem('quebraCabecaRecord', JSON.stringify(record));
  };

  const startGame = (puzzle: Puzzle) => {
    setSelectedPuzzle(puzzle);
    setGameStarted(true);
    setScore(0);
    setGameOver(false);
  };

  const restartGame = () => {
    setGameStarted(false);
    setSelectedPuzzle(null);
    setGameOver(false);
  };

  if (!gameStarted) {
    return (
      <div className="qc-container">
        <div className="qc-welcome">
          <h1>?Quebra-Cabe�a de Animais</h1>
          <p className="qc-description">
            Monte quebra-cabe�as com seus animais favoritos! Desenvolva paci�ncia e coordena��o.
          </p>
          <div className="qc-instructions">
            <h3>Como Jogar:</h3>
            <ul>
              <li>?Escolha um quebra-cabe�a</li>
              <li>?Clique nas pe�as na ordem correta</li>
              <li>Cada pe�a correta fica destacada</li>
              <li>?Complete o mais r�pido poss�vel!</li>
            </ul>
          </div>
          <div className="qc-selection">
            <h3>Escolha um Quebra-Cabe�a:</h3>
            <div className="puzzle-grid">
              {puzzles.map(puzzle => (
                <button
                  key={puzzle.id}
                  onClick={() => startGame(puzzle)}
                  className={`puzzle-card ${puzzle.difficulty}`}
                >
                  <span className="puzzle-emoji">{puzzle.emoji}</span>
                  <h4>{puzzle.name}</h4>
                  <span className="puzzle-info">
                    {puzzle.pieces} pe�as
                  </span>
                  <span className="puzzle-difficulty">
                    {puzzle.difficulty === 'easy' && '?F�cil'}
                    {puzzle.difficulty === 'medium' && '?M�dio'}
                    {puzzle.difficulty === 'hard' && '?? Dif�cil'}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <Link href="/jogos" className="qc-back-btn">
            ? Voltar aos Jogos
          </Link>
        </div>
      </div>
    );
  }

  if (gameOver && selectedPuzzle) {
    const timeSpent = Math.round((endTime - startTime) / 1000);
    return (
      <div className="qc-container">
        <div className="qc-game-over">
          <h1>?Parab�ns!</h1>
          <div className="qc-completion">
            <div className="completed-animal">{selectedPuzzle.emoji}</div>
            <h2>Voc� completou o quebra-cabe�a!</h2>
          </div>
          <div className="qc-final-score">
            <p><strong>Animal:</strong> {selectedPuzzle.name}</p>
            <p><strong>Pe�as:</strong> {selectedPuzzle.pieces}</p>
            <p><strong>Tempo:</strong> {timeSpent} segundos</p>
            <p><strong>Pontos:</strong> {score + 10}</p>
          </div>
          <div className="qc-feedback">
            {timeSpent < 30 && <p>? Impressionante! Voc� foi super r�pido!</p>}
            {timeSpent >= 30 && timeSpent < 60 && <p>?Muito bem! �tima concentra��o!</p>}
            {timeSpent >= 60 && <p>?Parab�ns! Voc� conseguiu!</p>}
          </div>
          <button onClick={restartGame} className="qc-restart-btn">
            Escolher Outro?
          </button>
          <Link href="/jogos" className="qc-back-btn">
            ? Voltar aos Jogos
          </Link>
        </div>
      </div>
    );
  }

  const gridSize = selectedPuzzle?.pieces === 4 ? 2 : selectedPuzzle?.pieces === 6 ? 3 : 3;

  return (
    <div className="qc-container">
      <div className="qc-header">
        <Link href="/jogos" className="qc-back-link">? Voltar</Link>
        <div className="qc-score">
          <span>?{selectedPuzzle?.name}</span>
          <span>{solvedPieces.size}/{selectedPuzzle?.pieces}</span>
        </div>
      </div>

      <div className="qc-game">
        <div className="qc-preview">
          <h3>Imagem Completa:</h3>
          <div className="preview-box">
            <span className="preview-emoji">{selectedPuzzle?.emoji}</span>
          </div>
        </div>

        <div className={`qc-puzzle-grid grid-${gridSize}x${gridSize}`}>
          {pieces.map((piece, index) => {
            const isSolved = solvedPieces.has(index);
            return (
              <button
                key={index}
                onClick={() => handlePieceClick(piece, index)}
                className={`puzzle-piece ${isSolved ? 'solved' : ''}`}
                disabled={isSolved}
              >
                {isSolved ? (
                  <span className="piece-solved">?</span>
                ) : (
                  <span className="piece-number">{piece + 1}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="qc-hint">
          <p>?Dica: Clique nas pe�as numeradas na ordem de 1 a {selectedPuzzle?.pieces}!</p>
        </div>
      </div>
    </div>
  );
}
