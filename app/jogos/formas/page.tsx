'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles.css';

interface Shape {
  type: string;
  emoji: string;
  color: string;
  name: string;
}

interface Challenge {
  id: number;
  target: string;
  targetEmoji: string;
  requiredShapes: { type: string; count: number }[];
  description: string;
}

const shapes: Shape[] = [
  { type: 'circle', emoji: '🔴', color: '#FF6B6B', name: 'Círculo' },
  { type: 'square', emoji: '🟦', color: '#4ECDC4', name: 'Quadrado' },
  { type: 'triangle', emoji: '🔺', color: '#FFE66D', name: 'Triângulo' },
  { type: 'star', emoji: '⭐', color: '#95E1D3', name: 'Estrela' },
];

const challenges: Challenge[] = [
  {
    id: 1,
    target: 'Casa',
    targetEmoji: '🏠',
    requiredShapes: [
      { type: 'square', count: 1 },
      { type: 'triangle', count: 1 }
    ],
    description: 'Use 1 quadrado e 1 triângulo para fazer uma casa'
  },
  {
    id: 2,
    target: 'Árvore',
    targetEmoji: '🌲',
    requiredShapes: [
      { type: 'circle', count: 1 },
      { type: 'triangle', count: 3 }
    ],
    description: 'Use 1 círculo e 3 triângulos para fazer uma árvore'
  },
  {
    id: 3,
    target: 'Castelo',
    targetEmoji: '🏰',
    requiredShapes: [
      { type: 'square', count: 3 },
      { type: 'triangle', count: 2 }
    ],
    description: 'Use 3 quadrados e 2 triângulos para fazer um castelo'
  },
  {
    id: 4,
    target: 'Foguete',
    targetEmoji: '🚀',
    requiredShapes: [
      { type: 'square', count: 1 },
      { type: 'triangle', count: 1 },
      { type: 'circle', count: 2 }
    ],
    description: 'Use 1 quadrado, 1 triângulo e 2 círculos para fazer um foguete'
  },
  {
    id: 5,
    target: 'Flor',
    targetEmoji: '🌸',
    requiredShapes: [
      { type: 'circle', count: 5 },
      { type: 'triangle', count: 1 }
    ],
    description: 'Use 5 círculos e 1 triângulo para fazer uma flor'
  },
  {
    id: 6,
    target: 'Borboleta',
    targetEmoji: '🦋',
    requiredShapes: [
      { type: 'circle', count: 4 },
      { type: 'star', count: 1 }
    ],
    description: 'Use 4 círculos e 1 estrela para fazer uma borboleta'
  },
  {
    id: 7,
    target: 'Carro',
    targetEmoji: '🚗',
    requiredShapes: [
      { type: 'square', count: 2 },
      { type: 'circle', count: 2 }
    ],
    description: 'Use 2 quadrados e 2 círculos para fazer um carro'
  },
  {
    id: 8,
    target: 'Sol',
    targetEmoji: '☀️',
    requiredShapes: [
      { type: 'circle', count: 1 },
      { type: 'star', count: 8 }
    ],
    description: 'Use 1 círculo e 8 estrelas para fazer um sol'
  }
];

export default function FormasGame() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedShapes, setSelectedShapes] = useState<{ type: string }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('formas-best-score');
    if (saved) setBestScore(parseInt(saved));
  }, []);

  const currentChallenge = challenges[currentChallengeIndex];

  const addShape = (shapeType: string) => {
    if (showFeedback) return;
    setSelectedShapes([...selectedShapes, { type: shapeType }]);
  };

  const removeLastShape = () => {
    if (showFeedback) return;
    if (selectedShapes.length > 0) {
      setSelectedShapes(selectedShapes.slice(0, -1));
    }
  };

  const clearShapes = () => {
    if (showFeedback) return;
    setSelectedShapes([]);
  };

  const checkSolution = () => {
    if (showFeedback) return;

    const shapeCounts: { [key: string]: number } = {};
    selectedShapes.forEach(shape => {
      shapeCounts[shape.type] = (shapeCounts[shape.type] || 0) + 1;
    });

    let isCorrect = true;
    currentChallenge.requiredShapes.forEach(req => {
      if (shapeCounts[req.type] !== req.count) {
        isCorrect = false;
      }
    });

    const totalRequired = currentChallenge.requiredShapes.reduce((sum, req) => sum + req.count, 0);
    if (selectedShapes.length !== totalRequired) {
      isCorrect = false;
    }

    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 1);
      setFeedbackMessage('🎉 Perfeito! Você montou corretamente!');
    } else {
      setFeedbackMessage('❌ Ops! Tente novamente. Confira as formas necessárias.');
    }

    setTimeout(() => {
      if (isCorrect) {
        if (currentChallengeIndex < challenges.length - 1) {
          setCurrentChallengeIndex(currentChallengeIndex + 1);
          setSelectedShapes([]);
          setShowFeedback(false);
        } else {
          const finalScore = score + 1;
          if (finalScore > bestScore) {
            setBestScore(finalScore);
            localStorage.setItem('formas-best-score', finalScore.toString());
          }
          setGameOver(true);
        }
      } else {
        setShowFeedback(false);
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentChallengeIndex(0);
    setSelectedShapes([]);
    setScore(0);
    setGameOver(false);
    setShowFeedback(false);
    setFeedbackMessage('');
  };

  return (
    <div className="formas-page">
      <div className="formas-container">
        <Link href="/jogos" className="formas-back-button">
          ← Voltar aos Jogos
        </Link>

        <div className="formas-header">
          <h1 className="formas-title">🔷 Formas Geométricas 🔶</h1>
          <p className="formas-subtitle">
            Monte os objetos usando as formas corretas!
          </p>
        </div>

        {!gameOver ? (
          <div className="formas-game-area">
            <div className="formas-progress-bar">
              <div className="formas-progress-info">
                <span>Desafio {currentChallengeIndex + 1} de {challenges.length}</span>
                <span className="formas-score">Acertos: {score}</span>
              </div>
              <div className="formas-progress-track">
                <div 
                  className="formas-progress-fill"
                  style={{ width: `${((currentChallengeIndex + 1) / challenges.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="formas-challenge-card">
              <div className="formas-target">
                <div className="formas-target-icon">{currentChallenge.targetEmoji}</div>
                <h2 className="formas-target-title">Monte um(a): {currentChallenge.target}</h2>
                <p className="formas-target-description">{currentChallenge.description}</p>
              </div>

              <div className="formas-required-shapes">
                <h3>Formas necessárias:</h3>
                <div className="formas-required-list">
                  {currentChallenge.requiredShapes.map((req, index) => {
                    const shape = shapes.find(s => s.type === req.type);
                    return (
                      <div key={index} className="formas-required-item">
                        <span className="formas-required-emoji">{shape?.emoji}</span>
                        <span className="formas-required-text">
                          {req.count}x {shape?.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="formas-workspace">
                <h3>Sua construção:</h3>
                <div className="formas-selected-area">
                  {selectedShapes.length === 0 ? (
                    <p className="formas-empty-message">Selecione formas abaixo para começar</p>
                  ) : (
                    <div className="formas-selected-shapes">
                      {selectedShapes.map((shape, index) => {
                        const shapeData = shapes.find(s => s.type === shape.type);
                        return (
                          <div key={index} className="formas-selected-shape">
                            {shapeData?.emoji}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="formas-shape-palette">
                <h3>Escolha as formas:</h3>
                <div className="formas-shape-buttons">
                  {shapes.map((shape) => (
                    <button
                      key={shape.type}
                      className="formas-shape-button"
                      onClick={() => addShape(shape.type)}
                      disabled={showFeedback}
                      style={{ borderColor: shape.color }}
                    >
                      <span className="formas-shape-emoji">{shape.emoji}</span>
                      <span className="formas-shape-name">{shape.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="formas-action-buttons">
                <button 
                  className="formas-remove-button"
                  onClick={removeLastShape}
                  disabled={showFeedback || selectedShapes.length === 0}
                >
                  ↶ Remover Última
                </button>
                <button 
                  className="formas-clear-button"
                  onClick={clearShapes}
                  disabled={showFeedback || selectedShapes.length === 0}
                >
                  🗑️ Limpar Tudo
                </button>
                <button 
                  className="formas-check-button"
                  onClick={checkSolution}
                  disabled={showFeedback || selectedShapes.length === 0}
                >
                  ✓ Verificar
                </button>
              </div>

              {showFeedback && (
                <div className={`formas-feedback ${feedbackMessage.includes('Perfeito') ? 'correct' : 'incorrect'}`}>
                  {feedbackMessage}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="formas-result-card">
            <div className="formas-result-icon">
              {score >= 7 ? '🏆' : score >= 5 ? '⭐' : '💪'}
            </div>
            <h2 className="formas-result-title">Parabéns!</h2>
            <div className="formas-result-stats">
              <div className="formas-stat-item">
                <span className="formas-stat-label">Desafios Completados</span>
                <span className="formas-stat-value">{score} / {challenges.length}</span>
              </div>
              <div className="formas-stat-item">
                <span className="formas-stat-label">Melhor Pontuação</span>
                <span className="formas-stat-value highlight">{bestScore}</span>
              </div>
              <div className="formas-stat-item">
                <span className="formas-stat-label">Aproveitamento</span>
                <span className="formas-stat-value">
                  {Math.round((score / challenges.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="formas-result-message">
              {score === challenges.length && <p>🎉 Incrível! Você completou todos os desafios!</p>}
              {score >= 6 && score < challenges.length && <p>😊 Muito bem! Você é excelente com formas!</p>}
              {score >= 4 && score < 6 && <p>👍 Bom trabalho! Continue praticando!</p>}
              {score < 4 && <p>💪 Não desista! A prática traz perfeição!</p>}
            </div>

            <div className="formas-result-actions">
              <button className="formas-restart-button" onClick={restartGame}>
                🔄 Jogar Novamente
              </button>
              <Link href="/jogos" className="formas-home-button">
                🏠 Voltar aos Jogos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
