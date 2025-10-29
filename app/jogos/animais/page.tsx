'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles.css';

interface Animal {
  name: string;
  emoji: string;
  category: string;
  habitat: string;
  type: string;
}

interface Question {
  animal: Animal;
  options: string[];
  correct: string;
  questionType: 'category' | 'habitat' | 'type';
}

const AnimaisGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<'category' | 'habitat' | 'type' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const animals: Animal[] = [
    { name: 'Leão', emoji: '🦁', category: 'Mamífero', habitat: 'Savana', type: 'Carnívoro' },
    { name: 'Elefante', emoji: '🐘', category: 'Mamífero', habitat: 'Savana', type: 'Herbívoro' },
    { name: 'Pinguim', emoji: '🐧', category: 'Ave', habitat: 'Antártida', type: 'Carnívoro' },
    { name: 'Tubarão', emoji: '🦈', category: 'Peixe', habitat: 'Oceano', type: 'Carnívoro' },
    { name: 'Borboleta', emoji: '🦋', category: 'Inseto', habitat: 'Floresta', type: 'Herbívoro' },
    { name: 'Coala', emoji: '🐨', category: 'Mamífero', habitat: 'Floresta', type: 'Herbívoro' },
    { name: 'Águia', emoji: '🦅', category: 'Ave', habitat: 'Montanha', type: 'Carnívoro' },
    { name: 'Polvo', emoji: '🐙', category: 'Molusco', habitat: 'Oceano', type: 'Carnívoro' },
    { name: 'Girafa', emoji: '🦒', category: 'Mamífero', habitat: 'Savana', type: 'Herbívoro' },
    { name: 'Sapo', emoji: '🐸', category: 'Anfíbio', habitat: 'Pântano', type: 'Carnívoro' }
  ];

  const gameModes = [
    {
      id: 'category' as const,
      name: 'Categorias',
      description: 'Identifique a categoria de cada animal',
      icon: '📚',
      color: '#f97316'
    },
    {
      id: 'habitat' as const,
      name: 'Habitat',
      description: 'Descubra onde cada animal vive',
      icon: '🌍',
      color: '#10b981'
    },
    {
      id: 'type' as const,
      name: 'Alimentação',
      description: 'Identifique o tipo de alimentação',
      icon: '🍃',
      color: '#3b82f6'
    }
  ];

  const generateQuestions = (mode: 'category' | 'habitat' | 'type'): Question[] => {
    const shuffled = [...animals].sort(() => Math.random() - 0.5).slice(0, 10);
    
    return shuffled.map(animal => {
      let options: string[] = [];
      let correct = '';

      if (mode === 'category') {
        const categories = ['Mamífero', 'Ave', 'Peixe', 'Inseto', 'Réptil', 'Anfíbio', 'Molusco'];
        correct = animal.category;
        options = [correct, ...categories.filter(c => c !== correct).sort(() => Math.random() - 0.5).slice(0, 3)];
      } else if (mode === 'habitat') {
        const habitats = ['Savana', 'Floresta', 'Oceano', 'Montanha', 'Deserto', 'Antártida', 'Pântano'];
        correct = animal.habitat;
        options = [correct, ...habitats.filter(h => h !== correct).sort(() => Math.random() - 0.5).slice(0, 3)];
      } else {
        const types = ['Carnívoro', 'Herbívoro', 'Onívoro'];
        correct = animal.type;
        options = [correct, ...types.filter(t => t !== correct)];
      }

      return {
        animal,
        options: options.sort(() => Math.random() - 0.5),
        correct,
        questionType: mode
      };
    });
  };

  const selectMode = (mode: 'category' | 'habitat' | 'type') => {
    setGameMode(mode);
    setQuestions(generateQuestions(mode));
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
        setShowResult(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameMode(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer('');
    setIsCorrect(null);
  };

  if (!gameStarted) {
    return (
      <div className="animais-container">
        <div className="animais-welcome">
          <h1 className="animais-title">Lógica Animal</h1>
          <div className="animais-icon">🦁</div>
          <p className="animais-description">
            Teste seus conhecimentos sobre o reino animal! Escolha um modo de jogo e descubra o que sabe sobre animais.
          </p>
          <div className="modes-grid">
            {gameModes.map((mode) => (
              <div key={mode.id} className="mode-card" onClick={() => selectMode(mode.id)}>
                <div className="mode-icon" style={{ background: mode.color }}>
                  {mode.icon}
                </div>
                <h3>{mode.name}</h3>
                <p>{mode.description}</p>
                <button className="mode-select-btn" style={{ background: mode.color }}>
                  Jogar
                </button>
              </div>
            ))}
          </div>
          <Link href="/jogos" className="animais-back-btn">
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
      message = 'Incrível! Você é um expert em animais!';
      emoji = '🏆';
    } else if (percentage >= 70) {
      message = 'Excelente! Você conhece muito sobre animais!';
      emoji = '⭐';
    } else if (percentage >= 50) {
      message = 'Bom trabalho! Continue aprendendo!';
      emoji = '👍';
    } else {
      message = 'Continue estudando! Cada tentativa é um aprendizado!';
      emoji = '📚';
    }

    const currentMode = gameModes.find(m => m.id === gameMode);

    return (
      <div className="animais-container">
        <div className="animais-result">
          <h1 className="result-title">Jogo Finalizado</h1>
          <div className="result-emoji">{emoji}</div>
          <div className="mode-badge" style={{ background: currentMode?.color }}>
            {currentMode?.icon} {currentMode?.name}
          </div>
          <div className="result-score">
            <span className="score-label">Sua Pontuação</span>
            <span className="score-value">{score} / {questions.length}</span>
            <span className="score-percentage">{percentage}%</span>
          </div>
          <p className="result-message">{message}</p>
          <div className="result-buttons">
            <button onClick={() => selectMode(gameMode!)} className="play-again-btn">
              Jogar Novamente
            </button>
            <button onClick={resetGame} className="change-mode-btn">
              Mudar Modo
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
  const currentMode = gameModes.find(m => m.id === gameMode);

  let questionText = '';
  if (gameMode === 'category') {
    questionText = 'Qual é a categoria deste animal?';
  } else if (gameMode === 'habitat') {
    questionText = 'Onde este animal vive?';
  } else {
    questionText = 'Como este animal se alimenta?';
  }

  return (
    <div className="animais-container">
      <div className="animais-header">
        <div className="mode-badge" style={{ background: currentMode?.color }}>
          {currentMode?.icon} {currentMode?.name}
        </div>
        <div className="header-progress">
          <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
          <span>Pontos: {score}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              background: currentMode?.color
            }}
          />
        </div>
      </div>

      <div className="animais-game">
        <div className="question-card">
          <div className="animal-display">
            <span className="animal-emoji">{question.animal.emoji}</span>
            <h3 className="animal-name">{question.animal.name}</h3>
          </div>
          <h2 className="question-title">{questionText}</h2>
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

export default AnimaisGame;
