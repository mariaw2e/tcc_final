'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles.css';

interface SoundEmotion {
  sound: string;
  emoji: string;
  emotion: string;
  description: string;
  audioUrl: string;
}

const soundEmotions: SoundEmotion[] = [
  { 
    sound: '🎵', 
    emoji: '😊', 
    emotion: 'Feliz', 
    description: 'Som alegre e animado',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'
  },
  { 
    sound: '🎶', 
    emoji: '😢', 
    emotion: 'Triste', 
    description: 'Som melancólico',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3'
  },
  { 
    sound: '🔊', 
    emoji: '😠', 
    emotion: 'Bravo', 
    description: 'Som intenso e forte',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3'
  },
  { 
    sound: '🎼', 
    emoji: '😨', 
    emotion: 'Assustado', 
    description: 'Som que causa surpresa',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2015/2015-preview.mp3'
  },
  { 
    sound: '🎹', 
    emoji: '🤔', 
    emotion: 'Pensativo', 
    description: 'Som calmo e reflexivo',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'
  },
  { 
    sound: '🎧', 
    emoji: '😴', 
    emotion: 'Cansado', 
    description: 'Som tranquilo e suave',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
  }
];

export default function SonsGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questions, setQuestions] = useState<SoundEmotion[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('sons-best-score');
    if (saved) setBestScore(parseInt(saved));
    
    const shuffled = [...soundEmotions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    generateOptions(shuffled[0]);
  }, []);

  const generateOptions = (currentQuestion: SoundEmotion) => {
    const wrongOptions = soundEmotions
      .filter(se => se.emotion !== currentQuestion.emotion)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(se => se.emotion);
    
    const allOptions = [...wrongOptions, currentQuestion.emotion]
      .sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
  };

  const playCurrentSound = () => {
    if (questions.length === 0) return;
    
    const audio = new Audio(questions[currentQuestionIndex].audioUrl);
    setIsPlaying(true);
    
    audio.play().catch(err => {
      console.error('Erro ao reproduzir áudio:', err);
      setIsPlaying(false);
    });
    
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
  };

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === questions[currentQuestionIndex].emotion;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        generateOptions(questions[currentQuestionIndex + 1]);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        if (finalScore > bestScore) {
          setBestScore(finalScore);
          localStorage.setItem('sons-best-score', finalScore.toString());
        }
        setGameOver(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    const shuffled = [...soundEmotions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    generateOptions(shuffled[0]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsPlaying(false);
  };

  if (questions.length === 0) {
    return (
      <div className="sons-page">
        <div className="sons-container">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="sons-page">
      <div className="sons-container">
        <Link href="/jogos" className="sons-back-button">
          ← Voltar aos Jogos
        </Link>

        <div className="sons-header">
          <h1 className="sons-title">🎵 Sons e Emoções 🎶</h1>
          <p className="sons-subtitle">
            Ouça o som e descubra qual emoção ele representa!
          </p>
        </div>

        {!gameOver ? (
          <div className="sons-game-area">
            <div className="sons-progress-bar">
              <div className="sons-progress-info">
                <span>Pergunta {currentQuestionIndex + 1} de {questions.length}</span>
                <span className="sons-score">Pontuação: {score}</span>
              </div>
              <div className="sons-progress-track">
                <div 
                  className="sons-progress-fill"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="sons-question-card">
              <div className="sons-sound-display">
                <div className="sons-sound-icon">
                  {currentQuestion.sound}
                </div>
                <p className="sons-description">{currentQuestion.description}</p>
              </div>

              <button 
                className={`sons-play-button ${isPlaying ? 'playing' : ''}`}
                onClick={playCurrentSound}
                disabled={isPlaying}
              >
                {isPlaying ? '🔊 Tocando...' : '▶️ Tocar Som'}
              </button>

              <div className="sons-options-grid">
                {options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.emotion;
                  let buttonClass = 'sons-option-button';
                  
                  if (showFeedback && isSelected) {
                    buttonClass += isCorrect ? ' correct' : ' incorrect';
                  }
                  if (showFeedback && isCorrect && !isSelected) {
                    buttonClass += ' correct';
                  }

                  return (
                    <button
                      key={index}
                      className={buttonClass}
                      onClick={() => handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className={`sons-feedback ${selectedAnswer === currentQuestion.emotion ? 'correct' : 'incorrect'}`}>
                  {selectedAnswer === currentQuestion.emotion ? (
                    <>
                      <span className="sons-feedback-icon">✅</span>
                      <span>Muito bem! Você acertou!</span>
                    </>
                  ) : (
                    <>
                      <span className="sons-feedback-icon">❌</span>
                      <span>A resposta correta era: {currentQuestion.emotion}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="sons-result-card">
            <div className="sons-result-icon">
              {score >= 5 ? '🏆' : score >= 3 ? '⭐' : '💪'}
            </div>
            <h2 className="sons-result-title">Jogo Concluído!</h2>
            <div className="sons-result-stats">
              <div className="sons-stat-item">
                <span className="sons-stat-label">Pontuação Final</span>
                <span className="sons-stat-value">{score} / {questions.length}</span>
              </div>
              <div className="sons-stat-item">
                <span className="sons-stat-label">Melhor Pontuação</span>
                <span className="sons-stat-value highlight">{bestScore}</span>
              </div>
              <div className="sons-stat-item">
                <span className="sons-stat-label">Aproveitamento</span>
                <span className="sons-stat-value">
                  {Math.round((score / questions.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="sons-result-message">
              {score === questions.length && <p>🎉 Perfeito! Você reconheceu todas as emoções!</p>}
              {score >= 4 && score < questions.length && <p>😊 Ótimo trabalho! Continue praticando!</p>}
              {score >= 2 && score < 4 && <p>👍 Bom esforço! Tente novamente!</p>}
              {score < 2 && <p>💪 Continue tentando! A prática leva à perfeição!</p>}
            </div>

            <div className="sons-result-actions">
              <button className="sons-restart-button" onClick={restartGame}>
                🔄 Jogar Novamente
              </button>
              <Link href="/jogos" className="sons-home-button">
                🏠 Voltar aos Jogos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
