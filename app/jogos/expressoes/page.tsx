'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles.css';

interface Question {
  expression: string;
  options: string[];
  correct: string;
}

const ExpressoesGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [bestScore, setBestScore] = useState<number>(0);

  const questions: Question[] = [
    {
      expression: '😊',
      options: ['Feliz', 'Triste', 'Bravo', 'Assustado'],
      correct: 'Feliz'
    },
    {
      expression: '😢',
      options: ['Feliz', 'Triste', 'Animado', 'Cansado'],
      correct: 'Triste'
    },
    {
      expression: '😠',
      options: ['Calmo', 'Pensativo', 'Bravo', 'Feliz'],
      correct: 'Bravo'
    },
    {
      expression: '😨',
      options: ['Assustado', 'Feliz', 'Relaxado', 'Entediado'],
      correct: 'Assustado'
    },
    {
      expression: '😴',
      options: ['Animado', 'Alerta', 'Cansado', 'Surpreso'],
      correct: 'Cansado'
    },
    {
      expression: '🤔',
      options: ['Decidido', 'Pensativo', 'Alegre', 'Nervoso'],
      correct: 'Pensativo'
    },
    {
      expression: '😍',
      options: ['Apaixonado', 'Indiferente', 'Bravo', 'Confuso'],
      correct: 'Apaixonado'
    },
    {
      expression: '🤗',
      options: ['Distante', 'Acolhedor', 'Sério', 'Triste'],
      correct: 'Acolhedor'
    },
    {
      expression: '😱',
      options: ['Calmo', 'Chocado', 'Entediado', 'Feliz'],
      correct: 'Chocado'
    },
    {
      expression: '😎',
      options: ['Nervoso', 'Preocupado', 'Confiante', 'Tímido'],
      correct: 'Confiante'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('expressoes-best-score');
    if (saved) {
      setBestScore(parseInt(saved));
    }
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer('');
    setIsCorrect(null);
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setIsCorrect(null);
      } else {
        const finalScore = score + (correct ? 1 : 0);
        if (finalScore > bestScore) {
          setBestScore(finalScore);
          localStorage.setItem('expressoes-best-score', finalScore.toString());
        }
        setShowResult(true);
      }
    }, 1500);
  };

  if (!gameStarted) {
    return (
      <div className="expressoes-container">
        <div className="expressoes-welcome">
          <h1 className="expressoes-title">Expressões em Ação</h1>
          <div className="expressoes-icon">🎭</div>
          <p className="expressoes-description">
            Identifique as emoções corretas! Observe cada expressão e escolha o sentimento correspondente.
          </p>
          <div className="expressoes-info">
            <div className="info-item">
              <span className="info-label">Perguntas</span>
              <span className="info-value">{questions.length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Melhor Pontuação</span>
              <span className="info-value">{bestScore}</span>
            </div>
          </div>
          <button onClick={startGame} className="expressoes-start-btn">
            Começar Jogo
          </button>
          <Link href="/jogos" className="expressoes-back-btn">
            Voltar aos Jogos
          </Link>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    let emoji = '';

    if (percentage === 100) {
      message = 'Perfeito! Você identificou todas as emoções!';
      emoji = '🏆';
    } else if (percentage >= 70) {
      message = 'Muito bem! Você tem ótima percepção emocional!';
      emoji = '⭐';
    } else if (percentage >= 50) {
      message = 'Bom trabalho! Continue praticando!';
      emoji = '👍';
    } else {
      message = 'Continue tentando! A prática leva à perfeição!';
      emoji = '💪';
    }

    return (
      <div className="expressoes-container">
        <div className="expressoes-result">
          <h1 className="result-title">Jogo Finalizado</h1>
          <div className="result-emoji">{emoji}</div>
          <div className="result-score">
            <span className="score-label">Sua Pontuação</span>
            <span className="score-value">{score} / {questions.length}</span>
            <span className="score-percentage">{percentage}%</span>
          </div>
          <p className="result-message">{message}</p>
          {score > bestScore && (
            <div className="new-record">Novo Recorde!</div>
          )}
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

  const question = questions[currentQuestion];

  return (
    <div className="expressoes-container">
      <div className="expressoes-header">
        <div className="header-progress">
          <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
          <span>Pontos: {score}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="expressoes-game">
        <div className="question-card">
          <h2 className="question-title">Que emoção é esta?</h2>
          <div className={`expression-display ${isCorrect !== null ? 'answered' : ''}`}>
            {question.expression}
          </div>
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== ''}
                className={`option-btn ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : selectedAnswer && option === question.correct
                    ? 'show-correct'
                    : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressoesGame;
