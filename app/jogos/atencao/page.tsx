'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './styles.css';

interface Difference {
  x: number;
  y: number;
  radius: number;
}

interface Level {
  id: number;
  name: string;
  description: string;
  scene: string;
  differences: Difference[];
  timeLimit: number;
}

const AtencaoGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [found, setFound] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [clickedPositions, setClickedPositions] = useState<Array<{x: number, y: number, correct: boolean}>>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const levels: Level[] = [
    {
      id: 1,
      name: 'Nível 1 - Fácil',
      description: 'Encontre 3 diferenças',
      scene: '🏠🌳🌞🦋🌸',
      differences: [
        { x: 20, y: 30, radius: 50 },
        { x: 50, y: 50, radius: 50 },
        { x: 80, y: 30, radius: 50 }
      ],
      timeLimit: 60
    },
    {
      id: 2,
      name: 'Nível 2 - Médio',
      description: 'Encontre 4 diferenças',
      scene: '🌆🚗🌳👥🐕',
      differences: [
        { x: 15, y: 25, radius: 45 },
        { x: 40, y: 45, radius: 45 },
        { x: 65, y: 25, radius: 45 },
        { x: 85, y: 55, radius: 45 }
      ],
      timeLimit: 60
    },
    {
      id: 3,
      name: 'Nível 3 - Difícil',
      description: 'Encontre 5 diferenças',
      scene: '🎪🎠🎡🎢🎭',
      differences: [
        { x: 10, y: 30, radius: 40 },
        { x: 30, y: 50, radius: 40 },
        { x: 50, y: 30, radius: 40 },
        { x: 70, y: 55, radius: 40 },
        { x: 90, y: 35, radius: 40 }
      ],
      timeLimit: 60
    }
  ];

  useEffect(() => {
    if (gameStarted && !showResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endLevel(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, showResult, timeLeft]);

  useEffect(() => {
    if (found.length > 0 && found.every(f => f)) {
      endLevel(true);
    }
  }, [found]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentLevel(0);
    setTimeLeft(levels[0].timeLimit);
    setFound(new Array(levels[0].differences.length).fill(false));
    setTotalScore(0);
    setShowResult(false);
    setClickedPositions([]);
  };

  const endLevel = (completed: boolean) => {
    if (completed) {
      const bonus = Math.floor(timeLeft * 10);
      const levelScore = found.filter(f => f).length * 100 + bonus;
      setTotalScore(totalScore + levelScore);

      setTimeout(() => {
        if (currentLevel + 1 < levels.length) {
          setCurrentLevel(currentLevel + 1);
          setTimeLeft(levels[currentLevel + 1].timeLimit);
          setFound(new Array(levels[currentLevel + 1].differences.length).fill(false));
          setClickedPositions([]);
        } else {
          setShowResult(true);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        if (currentLevel + 1 < levels.length) {
          setCurrentLevel(currentLevel + 1);
          setTimeLeft(levels[currentLevel + 1].timeLimit);
          setFound(new Array(levels[currentLevel + 1].differences.length).fill(false));
          setClickedPositions([]);
        } else {
          setShowResult(true);
        }
      }, 1000);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const level = levels[currentLevel];
    let foundDifference = false;

    level.differences.forEach((diff, index) => {
      if (found[index]) return;

      const distance = Math.sqrt(Math.pow(x - diff.x, 2) + Math.pow(y - diff.y, 2));
      if (distance <= diff.radius / 10) {
        const newFound = [...found];
        newFound[index] = true;
        setFound(newFound);
        setClickedPositions([...clickedPositions, { x, y, correct: true }]);
        foundDifference = true;
      }
    });

    if (!foundDifference) {
      setClickedPositions([...clickedPositions, { x, y, correct: false }]);
      setTimeout(() => {
        setClickedPositions(prev => prev.filter(pos => pos.correct));
      }, 800);
    }
  };

  if (!gameStarted) {
    return (
      <div className="atencao-container">
        <div className="atencao-welcome">
          <h1 className="atencao-title">Atenção ao Detalhe</h1>
          <div className="atencao-icon">🔍</div>
          <p className="atencao-description">
            Encontre as diferenças nas cenas! Clique nas áreas diferentes antes que o tempo acabe.
          </p>
          <div className="levels-preview">
            {levels.map((level) => (
              <div key={level.id} className="level-card">
                <h3>{level.name}</h3>
                <p>{level.description}</p>
                <span className="level-scene">{level.scene}</span>
              </div>
            ))}
          </div>
          <button onClick={startGame} className="atencao-start-btn">
            Começar Jogo
          </button>
          <Link href="/jogos" className="atencao-back-btn">
            Voltar aos Jogos
          </Link>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="atencao-container">
        <div className="atencao-result">
          <h1 className="result-title">Jogo Finalizado</h1>
          <div className="result-emoji">🎯</div>
          <div className="result-score">
            <span className="score-label">Pontuação Total</span>
            <span className="score-value">{totalScore}</span>
          </div>
          <p className="result-message">
            Parabéns! Você completou todos os níveis de atenção ao detalhe!
          </p>
          <div className="result-buttons">
            <button onClick={startGame} className="play-again-btn">
              Jogar Novamente
            </button>
            <Link href="/jogos" className="back-home-btn">
              Voltar aos Jogos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const level = levels[currentLevel];
  const foundCount = found.filter(f => f).length;

  return (
    <div className="atencao-container">
      <div className="atencao-header">
        <div className="header-info">
          <span className="level-name">{level.name}</span>
          <span className="found-count">
            Encontradas: {foundCount}/{level.differences.length}
          </span>
          <span className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            ⏱️ {timeLeft}s
          </span>
        </div>
        <div className="score-display">Pontos: {totalScore}</div>
      </div>

      <div className="atencao-game">
        <div className="game-instructions">
          <p>{level.description}</p>
        </div>
        
        <div className="game-canvas" ref={canvasRef} onClick={handleClick}>
          <div className="scene-display">{level.scene}</div>
          
          {clickedPositions.map((pos, index) => (
            <div
              key={index}
              className={`click-marker ${pos.correct ? 'correct' : 'incorrect'}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`
              }}
            />
          ))}

          {found.map((isFound, index) => {
            if (!isFound) return null;
            const diff = level.differences[index];
            return (
              <div
                key={index}
                className="found-marker"
                style={{
                  left: `${diff.x}%`,
                  top: `${diff.y}%`
                }}
              >
                ✓
              </div>
            );
          })}
        </div>

        <div className="progress-indicators">
          {levels.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentLevel ? 'active' : ''} ${index < currentLevel ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AtencaoGame;
