'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import './styles.css'

// Palavras educativas para crianças neurodivergentes por faixa etária
const palavrasEducativas = [
  // 4-6 anos - Conceitos básicos e familiares
  {
    palavra: 'FAMILIA',
    dica: 'Pessoas que nos amam e cuidam de nós todos os dias',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'AMIGO',
    dica: 'Pessoa especial com quem gostamos de brincar e conversar',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'BRINCAR',
    dica: 'Atividade divertida que fazemos quando estamos felizes',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'ESCOLA',
    dica: 'Lugar onde aprendemos coisas novas e fazemos amigos',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'CASA',
    dica: 'Lugar onde moramos e nos sentimos seguros',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'MAMAE',
    dica: 'Pessoa que nos deu a vida e cuida de nós',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'PAPAI',
    dica: 'Pessoa que nos protege e brinca conosco',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'ABRACO',
    dica: 'Carinho gostoso que damos com os braços',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'BEIJINHO',
    dica: 'Carinho pequeno que damos com os lábios',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'BRINQUEDO',
    dica: 'Objeto divertido que usamos para brincar',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'LIVRO',
    dica: 'Tem páginas com histórias e figuras bonitas',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'DESENHO',
    dica: 'Arte que fazemos com lápis ou giz de cera',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'MUSICA',
    dica: 'Sons bonitos que gostamos de escutar e cantar',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'DANCA',
    dica: 'Movimento do corpo no ritmo da música',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  {
    palavra: 'ALEGRIA',
    dica: 'Sentimento quando estamos muito felizes',
    categoria: '4-6 anos',
    faixaEtaria: 'infantil'
  },
  
  // 7-10 anos - Emoções e relacionamentos
  {
    palavra: 'FELICIDADE',
    dica: 'Sentimento bom que temos quando algo legal acontece',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'PACIENCIA',
    dica: 'Quando conseguimos esperar sem ficar nervosos',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'AJUDAR',
    dica: 'Fazer algo bom para alguém que precisa',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'ORGULHO',
    dica: 'Sentimento quando fazemos algo muito bem feito',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'GENTILEZA',
    dica: 'Ser carinhoso e educado com outras pessoas',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'GRATIDAO',
    dica: 'Sentimento de agradecimento por coisas boas',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'BONDADE',
    dica: 'Qualidade de quem faz o bem para os outros',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'CARINHO',
    dica: 'Demonstração de afeto e cuidado',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'RESPEITO',
    dica: 'Tratar todos com educação e consideração',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'AMIZADE',
    dica: 'Relacionamento especial entre pessoas que se gostam',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'HONESTIDADE',
    dica: 'Sempre falar a verdade e ser sincero',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'CURIOSIDADE',
    dica: 'Vontade de aprender e descobrir coisas novas',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'ALEGRIA',
    dica: 'Sentimento de contentamento e diversão',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'CALMA',
    dica: 'Estado tranquilo quando não estamos agitados',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'TALENTO',
    dica: 'Habilidade especial que cada pessoa tem',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'APRENDER',
    dica: 'Descobrir e guardar novos conhecimentos',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'CUIDADO',
    dica: 'Atenção especial que damos ao que é importante',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  {
    palavra: 'SORRISO',
    dica: 'Expressão facial que mostra que estamos felizes',
    categoria: '7-10 anos',
    faixaEtaria: 'fundamental'
  },
  
  // 11-14 anos - Habilidades sociais e autoconhecimento
  {
    palavra: 'CONFIANCA',
    dica: 'Acreditar em si mesmo e nas suas capacidades',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'COOPERACAO',
    dica: 'Trabalhar junto com outras pessoas para um objetivo comum',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'CRIATIVIDADE',
    dica: 'Capacidade de imaginar e criar coisas novas e diferentes',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'PERSEVERANCA',
    dica: 'Não desistir mesmo quando algo está difícil',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'RESPONSABILIDADE',
    dica: 'Cumprir com nossos deveres e compromissos',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'DETERMINACAO',
    dica: 'Força de vontade para alcançar nossos objetivos',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'INDEPENDENCIA',
    dica: 'Capacidade de fazer coisas sozinho',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'LIDERANCA',
    dica: 'Habilidade de guiar e inspirar outras pessoas',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'EMPATIA',
    dica: 'Capacidade de entender os sentimentos dos outros',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'DEDICACAO',
    dica: 'Empenho total em fazer algo com qualidade',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'RESILENCIA',
    dica: 'Capacidade de se recuperar das dificuldades',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'TOLERANCIA',
    dica: 'Aceitar e respeitar as diferenças dos outros',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'AUTOESTIMA',
    dica: 'Gostar de si mesmo e reconhecer seu valor',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'INTEGRIDADE',
    dica: 'Agir sempre de acordo com seus valores',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'COMPAIXAO',
    dica: 'Sentimento de querer ajudar quem está sofrendo',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'SABEDORIA',
    dica: 'Conhecimento profundo sobre a vida e as pessoas',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'AUTENTICIDADE',
    dica: 'Ser verdadeiro consigo mesmo e com os outros',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  {
    palavra: 'FLEXIBILIDADE',
    dica: 'Capacidade de se adaptar a diferentes situações',
    categoria: '11-14 anos',
    faixaEtaria: 'adolescente'
  },
  
  // Palavras universais - Todas as idades
  {
    palavra: 'AMOR',
    dica: 'Sentimento mais forte e bonito que existe no mundo',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'SONHO',
    dica: 'Algo que desejamos muito e trabalhamos para conseguir',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'CORAGEM',
    dica: 'Força que sentimos para enfrentar nossos medos',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'ESPERANCA',
    dica: 'Acreditar que coisas boas vão acontecer',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'PAZ',
    dica: 'Sentimento tranquilo quando tudo está bem',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'FORCA',
    dica: 'Poder interior que nos ajuda a superar desafios',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'LIBERDADE',
    dica: 'Poder de escolher e ser quem queremos ser',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'HARMONIA',
    dica: 'Quando tudo funciona bem junto',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'VITORIA',
    dica: 'Sucesso após muito esforço e dedicação',
    categoria: 'universal',
    faixaEtaria: 'todas'
  },
  {
    palavra: 'FUTURO',
    dica: 'Tempo que está por vir, cheio de possibilidades',
    categoria: 'universal',
    faixaEtaria: 'todas'
  }
]

export default function JogoForca() {
  const [palavraAtual, setPalavraAtual] = useState(palavrasEducativas[0])
  const [letrasReveladas, setLetrasReveladas] = useState<Set<string>>(new Set())
  const [letrasErradas, setLetrasErradas] = useState<Set<string>>(new Set())
  const [tentativas, setTentativas] = useState(6)
  const [jogoFinalizado, setJogoFinalizado] = useState(false)
  const [vitoria, setVitoria] = useState(false)
  const [faixaEtariaSelecionada, setFaixaEtariaSelecionada] = useState<string>('todas')
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Sistema de áudio para efeitos sonoros
  const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null

  // Sons para o jogo da forca
  const playCorrectLetterSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.2)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  const playWrongLetterSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.4)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.4)
  }

  const playWinSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const melody = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    
    melody.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      const startTime = audioContext.currentTime + (index * 0.2)
      oscillator.frequency.setValueAtTime(freq, startTime)
      
      gainNode.gain.setValueAtTime(0.4, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + 0.3)
    })
  }

  const playLoseSound = () => {
    if (!soundEnabled || !audioContext) return
    
    const notes = [261.63, 233.08, 207.65] // C4, Bb3, Ab3
    
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      const startTime = audioContext.currentTime + (index * 0.3)
      oscillator.frequency.setValueAtTime(freq, startTime)
      
      gainNode.gain.setValueAtTime(0.4, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + 0.5)
    })
  }

  // Função para filtrar palavras por faixa etária
  const filtrarPalavrasPorIdade = (faixa: string) => {
    if (faixa === 'todas') {
      return palavrasEducativas
    }
    return palavrasEducativas.filter(palavra => 
      palavra.faixaEtaria === faixa || palavra.faixaEtaria === 'todas'
    )
  }

  // Função para escolher uma nova palavra aleatória
  const escolherNovaPalavra = () => {
    const palavrasFiltradas = filtrarPalavrasPorIdade(faixaEtariaSelecionada)
    const indiceAleatorio = Math.floor(Math.random() * palavrasFiltradas.length)
    setPalavraAtual(palavrasFiltradas[indiceAleatorio])
  }

  // Resetar o jogo
  const resetarJogo = () => {
    setLetrasReveladas(new Set())
    setLetrasErradas(new Set())
    setTentativas(6)
    setJogoFinalizado(false)
    setVitoria(false)
    escolherNovaPalavra()
  }

  // Função para mudar faixa etária
  const mudarFaixaEtaria = (faixa: string) => {
    setFaixaEtariaSelecionada(faixa)
    setLetrasReveladas(new Set())
    setLetrasErradas(new Set())
    setTentativas(6)
    setJogoFinalizado(false)
    setVitoria(false)
    
    const palavrasFiltradas = filtrarPalavrasPorIdade(faixa)
    const indiceAleatorio = Math.floor(Math.random() * palavrasFiltradas.length)
    setPalavraAtual(palavrasFiltradas[indiceAleatorio])
  }

  // Verificar se a palavra foi descoberta
  useEffect(() => {
    const palavraSemEspacos = palavraAtual.palavra.replace(/\s/g, '')
    const todasLetrasReveladas = palavraSemEspacos
      .split('')
      .every(letra => letrasReveladas.has(letra))

    if (todasLetrasReveladas && !jogoFinalizado) {
      setVitoria(true)
      setJogoFinalizado(true)
      playWinSound()
    }
  }, [letrasReveladas, palavraAtual, jogoFinalizado])

  // Verificar se perdeu
  useEffect(() => {
    if (tentativas <= 0 && !jogoFinalizado) {
      setJogoFinalizado(true)
      setVitoria(false)
      playLoseSound()
    }
  }, [tentativas, jogoFinalizado])

  // Função para tentar uma letra
  const tentarLetra = (letra: string) => {
    if (letrasReveladas.has(letra) || letrasErradas.has(letra) || jogoFinalizado) {
      return
    }

    if (palavraAtual.palavra.includes(letra)) {
      setLetrasReveladas(prev => new Set([...prev, letra]))
      playCorrectLetterSound()
    } else {
      setLetrasErradas(prev => new Set([...prev, letra]))
      setTentativas(prev => prev - 1)
      playWrongLetterSound()
    }
  }

  // Renderizar a palavra com letras reveladas
  const renderizarPalavra = () => {
    return palavraAtual.palavra.split('').map((letra, index) => (
      <span key={index} className="forca-letter">
        {letra === ' ' ? (
          <span>&nbsp;</span>
        ) : (
          <span className={letrasReveladas.has(letra) ? 'revealed' : ''}>
            {letrasReveladas.has(letra) ? letra : ''}
          </span>
        )}
      </span>
    ))
  }

  // Alfabeto para botões
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  // Desenho da forca baseado nas tentativas restantes
  const renderizarForca = () => {
    const erros = 6 - tentativas
    return (
      <div className="forca-gallows">
        <div>  ┌─────┐</div>
        <div>  │     {erros >= 1 ? '😵' : '  '}</div>
        <div>  │     {erros >= 2 ? '│' : ' '}</div>
        <div>  │    {erros >= 3 ? '/' : ' '}{erros >= 2 ? '│' : ' '}{erros >= 4 ? '\\' : ' '}</div>
        <div>  │    {erros >= 5 ? '/' : ' '} {erros >= 6 ? '\\' : ' '}</div>
        <div>  │</div>
        <div>┌─┴─┐</div>
      </div>
    )
  }

  return (
    <div className="forca-container">
      {/* Botão Voltar */}
      <Link href="/jogos" className="back-to-games">
        ← Voltar aos Jogos
      </Link>

      {/* Hero Section */}
      <section className="forca-hero">
        <h1>Jogo da Forca Educativo</h1>
        <p>Descubra palavras especiais feitas para você!</p>
        
        {/* Seletor de Faixa Etária */}
        <div className="forca-age-selector" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#F6B600', marginBottom: '1rem', fontSize: '1.2rem' }}>Escolha sua faixa etária:</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => mudarFaixaEtaria('infantil')}
              className={`forca-btn ${faixaEtariaSelecionada === 'infantil' ? 'primary' : 'secondary'}`}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              4-6 anos
            </button>
            <button
              onClick={() => mudarFaixaEtaria('fundamental')}
              className={`forca-btn ${faixaEtariaSelecionada === 'fundamental' ? 'primary' : 'secondary'}`}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              7-10 anos
            </button>
            <button
              onClick={() => mudarFaixaEtaria('adolescente')}
              className={`forca-btn ${faixaEtariaSelecionada === 'adolescente' ? 'primary' : 'secondary'}`}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              11-14 anos
            </button>
            <button
              onClick={() => mudarFaixaEtaria('todas')}
              className={`forca-btn ${faixaEtariaSelecionada === 'todas' ? 'primary' : 'secondary'}`}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              Todas
            </button>
          </div>
        </div>

        <div className="forca-stats">
          <div className="forca-stat">
            <div className="forca-stat-label">Categoria:</div>
            <div className="forca-stat-value">{palavraAtual.categoria}</div>
          </div>
          <div className="forca-stat">
            <div className="forca-stat-label">Tentativas restantes:</div>
            <div className="forca-stat-value">{tentativas}</div>
          </div>
        </div>
      </section>

      <main className="forca-main">
        <div className="forca-game-grid">
          {/* Lado esquerdo - Forca */}
          <div className="forca-card">
            <h3>Forca</h3>
            {renderizarForca()}
          </div>

          {/* Lado direito - Jogo */}
          <div className="forca-card">
            <h3>Palavra</h3>
            
            {/* Dica */}
            <div className="forca-hint">
              <p>
                <strong>Dica:</strong> {palavraAtual.dica}
              </p>
            </div>

            {/* Palavra */}
            <div className="forca-word">
              {renderizarPalavra()}
            </div>

            {/* Letras erradas */}
            {letrasErradas.size > 0 && (
              <div className="forca-wrong-letters">
                <h4>Letras erradas:</h4>
                <div className="forca-wrong-list">
                  {Array.from(letrasErradas).map(letra => (
                    <span key={letra} className="forca-wrong-letter">
                      {letra}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alfabeto */}
        <div className="forca-alphabet">
          <h3>Escolha uma letra:</h3>
          <div className="forca-letters-grid">
            {alfabeto.map(letra => (
              <button
                key={letra}
                onClick={() => tentarLetra(letra)}
                disabled={letrasReveladas.has(letra) || letrasErradas.has(letra) || jogoFinalizado}
                className={`forca-letter-btn ${
                  letrasReveladas.has(letra)
                    ? 'correct'
                    : letrasErradas.has(letra)
                    ? 'wrong'
                    : jogoFinalizado
                    ? 'disabled'
                    : 'available'
                }`}
              >
                {letra}
              </button>
            ))}
          </div>
        </div>

        {/* Botões de controle */}
        <div className="forca-controls">
          <button
            onClick={resetarJogo}
            className="forca-btn primary"
          >
            Nova Palavra
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`forca-btn ${soundEnabled ? 'primary' : 'secondary'}`}
            style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
          >
            {soundEnabled ? '🔊 Som Ligado' : '🔇 Som Desligado'}
          </button>
          <Link
            href="/jogos"
            className="forca-btn secondary"
          >
            Voltar aos Jogos
          </Link>
        </div>

        {/* Modal de fim de jogo */}
        {jogoFinalizado && (
          <div className="forca-modal">
            <div className="forca-modal-content">
              <h2 className={vitoria ? 'victory' : 'defeat'}>
                {vitoria ? 'Parabéns! 🎉' : 'Que pena! 😔'}
              </h2>
              <p>
                {vitoria 
                  ? 'Você descobriu a palavra '
                  : 'A palavra era '
                }
                <span className="word-reveal">"{palavraAtual.palavra}"</span>!
              </p>
              <p className="hint-text">
                {palavraAtual.dica}
              </p>
              <div className="forca-modal-actions">
                <button
                  onClick={resetarJogo}
                  className="forca-btn primary"
                >
                  Jogar Novamente
                </button>
                <Link
                  href="/jogos"
                  className="forca-btn secondary"
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