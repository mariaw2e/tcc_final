'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles.css';

interface MathQuestion {
  num1: number;
  num2: number;
  operator: '+' | '-';
  correctAnswer: number;
  emoji: string;
}

const emojis = ['??', '??', '??', '??', '??', '??', '??', '??', '??', '??'];

export default function MatematicaPage() {
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  const TOTAL_QUESTIONS = 10;

  useEffect(() => {
    if (gameStarted && !gameOver && difficulty) {
      generateQuestion();
    }
  }, [gameStarted, questionNumber, difficulty]);

  const generateQuestion = () => {
    let maxNum = 5;
    let useSubtraction = false;

    if (difficulty === 'medium') {
      maxNum = 10;
      useSubtraction = true;
    } else if (difficulty === 'hard') {
      maxNum = 20;
      useSubtraction = true;
    }

    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    
    let operator: '+' | '-' = '+';
    let correctAnswer = num1 + num2;

    if (useSubtraction && Math.random() > 0.5 && num1 > num2) {
      operator = '-';
      correctAnswer = num1 - num2;
    }

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const newQuestion: MathQuestion = {
      num1,
      num2,
      operator,
      correctAnswer,
      emoji: randomEmoji
    };

    setQuestion(newQuestion);
    generateOptions(correctAnswer);
    setFeedback('');
  };

  const generateOptions = (correct: number) => {
    const opts = [correct];
    
    while (opts.length < 4) {
      const offset = Math.floor(Math.random() * 5) - 2;
      const newOpt = Math.max(0, correct + offset);
      
      if (!opts.includes(newOpt) && newOpt !== correct) {
        opts.push(newOpt);
      }
    }

    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (selected: number) => {
    if (!question) return;

    const isCorrect = selected === question.correctAnswer;

    if (isCorrect) {
      setScore(score + 10);
      setFeedback('?Isso mesmo! Resposta correta!');
      playSound(true);
    } else {
      setFeedback(`Ops! A resposta era ${question.correctAnswer}`);
      playSound(false);
    }

    setTimeout(() => {
      if (questionNumber + 1 >= TOTAL_QUESTIONS) {
        setGameOver(true);
        saveScore();
      } else {
        setQuestionNumber(questionNumber + 1);
      }
    }, 2500);
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
    const finalScore = Math.round((score / (TOTAL_QUESTIONS * 10)) * 100);
    const record = {
      score: finalScore,
      date: new Date().toISOString(),
      difficulty: difficulty
    };
    localStorage.setItem('matematicaRecord', JSON.stringify(record));
  };

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
    setGameStarted(true);
    setScore(0);
    setQuestionNumber(0);
    setGameOver(false);
    setFeedback('');
  };

  const restartGame = () => {
    setGameStarted(false);
    setDifficulty(null);
    setGameOver(false);
  };

  if (!gameStarted) {
    return (
      <div className="matematica-container">
        <div className="matematica-welcome">
          <h1>?Matem�tica do Faz de Conta</h1>
          <p className="matematica-description">
            Resolva problemas matem�ticos de forma divertida! Use frutas para aprender soma e subtra��o.
          </p>
          <div className="matematica-instructions">
            <h3>Como Jogar:</h3>
            <ul>
              <li>?Escolha o n�vel de dificuldade</li>
              <li>?Conte as frutas e resolva a opera��o</li>
              <li>Escolha a resposta correta</li>
              <li>?Responda 10 perguntas</li>
            </ul>
          </div>
          <div className="matematica-difficulty">
            <h3>Escolha a Dificuldade:</h3>
            <div className="difficulty-buttons">
              <button onClick={() => startGame('easy')} className="diff-btn easy">
               F�cil<br/>
                <span>N�meros at� 5 - Apenas soma</span>
              </button>
              <button onClick={() => startGame('medium')} className="diff-btn medium">
               M�dio<br/>
                <span>N�meros at� 10 - Soma e subtra��o</span>
              </button>
              <button onClick={() => startGame('hard')} className="diff-btn hard">
               ? Dif�cil<br/>
                <span>N�meros at� 20 - Soma e subtra��o</span>
              </button>
            </div>
          </div>
          <Link href="/jogos" className="matematica-back-btn">
            ? Voltar aos Jogos
          </Link>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const finalScore = Math.round((score / (TOTAL_QUESTIONS * 10)) * 100);
    return (
      <div className="matematica-container">
        <div className="matematica-game-over">
          <h1>?Parab�ns!</h1>
          <div className="matematica-final-score">
            <h2>Pontua��o Final: {finalScore}%</h2>
            <p>Voc� acertou {score / 10} de {TOTAL_QUESTIONS} quest�es!</p>
            <p>Dificuldade: {difficulty === 'easy' ? 'F�cil' : difficulty === 'medium' ? 'M�dio' : 'Dif�cil'}</p>
          </div>
          <div className="matematica-feedback-final">
            {finalScore === 100 && <p>?Perfeito! Voc� � um g�nio da matem�tica!</p>}
            {finalScore >= 70 && finalScore < 100 && <p>?Muito bem! Excelente racioc�nio!</p>}
            {finalScore < 70 && <p>?Bom trabalho! Continue praticando!</p>}
          </div>
          <button onClick={restartGame} className="matematica-restart-btn">
            Jogar Novamente?
          </button>
          <Link href="/jogos" className="matematica-back-btn">
            ? Voltar aos Jogos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="matematica-container">
      <div className="matematica-header">
        <Link href="/jogos" className="matematica-back-link">? Voltar</Link>
        <div className="matematica-score">
          <span>?Pontos: {score}</span>
          <span>?Quest�o: {questionNumber + 1}/{TOTAL_QUESTIONS}</span>
        </div>
      </div>

      {question && (
        <div className="matematica-game">
          <div className="matematica-question">
            <h2>Quanto �?</h2>
            
            <div className="matematica-visual">
              <div className="visual-group">
                <div className="emoji-group">
                  {Array(question.num1).fill(null).map((_, i) => (
                    <span key={i} className="emoji-item">{question.emoji}</span>
                  ))}
                </div>
                <span className="number-label">{question.num1}</span>
              </div>

              <span className="operator">{question.operator}</span>

              <div className="visual-group">
                <div className="emoji-group">
                  {Array(question.num2).fill(null).map((_, i) => (
                    <span key={i} className="emoji-item">{question.emoji}</span>
                  ))}
                </div>
                <span className="number-label">{question.num2}</span>
              </div>

              <span className="equals">=</span>
              <span className="question-mark">?</span>
            </div>

            <div className="matematica-expression">
              {question.num1} {question.operator} {question.num2} = ?
            </div>
          </div>

          <div className="matematica-options">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="matematica-option-btn"
                disabled={feedback !== ''}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`matematica-feedback ${feedback.includes('correta') ? 'correct' : 'incorrect'}`}>
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
