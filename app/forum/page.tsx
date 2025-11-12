"use client";

import { useEffect } from "react";
import "./forum.css";
import { findBestMatch, knowledgeBase } from "./chatKnowledge";

export default function ForumPage() {
  useEffect(() => {
    // Carregar Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    // Chat functionality
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput') as HTMLInputElement;
    const sendBtn = document.getElementById('sendBtn');

    if (!chatMessages || !userInput || !sendBtn) return;

    // Respostas rápidas para saudações e comandos simples
    const quickResponses: { [key: string]: string } = {
      // Saudações
      "oi": "Olá! 👋 Bem-vindo ao BrainWave Connect. Como posso ajudá-lo hoje?",
      "olá": "Oi! 😊 Em que posso ser útil?",
      "bom dia": "Bom dia! ☀️ Espero que esteja tendo um ótimo dia!",
      "boa tarde": "Boa tarde! 🌤️ Como posso ajudar?",
      "boa noite": "Boa noite! 🌙 Estou aqui para ajudar!",
      
      // Perguntas pessoais
      "como você está": "Estou funcionando perfeitamente, obrigado por perguntar! 😊 E você, como está?",
      "qual é o seu nome": "Meu nome é BrainWave Bot 🤖. Estou aqui para ajudar a comunidade neurodivergente!",
      "quem criou você": "Fui criado pela equipe BrainWave Connect para ajudar e informar sobre neurodiversidade! 💡",
      
      // Ajuda e informações
      "menu": "📋 Posso ajudar com:\n• TDAH (sintomas, tratamento, hiperfoco)\n• Autismo (diagnóstico, comunicação, stimming)\n• Dislexia e aprendizagem\n• Ansiedade e saúde mental\n• Inclusão escolar\n• Recursos para pais\n• Carreiras e trabalho\n• Muito mais!\n\nDigite o tema que deseja saber!",
      "o que você faz": "Eu ajudo a responder dúvidas detalhadas sobre neurodiversidade, indicar recursos educativos e conectar você aos serviços do BrainWave Connect! 🎯",
      
      // Despedidas
      "tchau": "Até logo! 👋 Foi um prazer conversar com você. Volte sempre!",
      "até logo": "Até mais! 😊 Estou sempre aqui quando precisar!",
      "adeus": "Adeus! 🌟 Espero ter ajudado. Até a próxima!",
      
      // Agradecimentos
      "obrigado": "De nada! 😊 Estou sempre aqui para ajudar!",
      "obrigada": "Por nada! 💛 Fico feliz em poder ajudar!",
      "valeu": "Disponha! 👍 Sempre que precisar, estarei aqui!",
      
      // Default
      "default": "🤔 Desculpe, não entendi completamente. Posso ajudar com temas como: TDAH, autismo, dislexia, ansiedade, inclusão escolar, pais, carreiras. Digite 'menu' para ver todos os tópicos!"
    };

    function addMessage(text: string, isUser: boolean) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'message-content';
      
      const icon = document.createElement('i');
      icon.className = isUser ? 'fas fa-user' : 'fas fa-robot';
      
      const p = document.createElement('p');
      p.textContent = text;
      
      contentDiv.appendChild(icon);
      contentDiv.appendChild(p);
      messageDiv.appendChild(contentDiv);
      
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage: string): string {
      const lowerMessage = userMessage.toLowerCase().trim();
      
      // Primeiro tenta respostas rápidas
      for (const [key, value] of Object.entries(quickResponses)) {
        if (lowerMessage.includes(key)) {
          return value;
        }
      }
      
      // Depois busca no banco de conhecimento abrangente
      const knowledgeResponse = findBestMatch(lowerMessage);
      if (knowledgeResponse) {
        let response = knowledgeResponse.answer;
        
        // Adiciona tópicos relacionados se existirem
        if (knowledgeResponse.relatedTopics && knowledgeResponse.relatedTopics.length > 0) {
          response += `\n\n📚 Tópicos relacionados: ${knowledgeResponse.relatedTopics.join(', ')}`;
        }
        
        return response;
      }
      
      // Resposta padrão se nada foi encontrado
      return quickResponses.default;
    }

    function handleSend() {
      const message = userInput.value.trim();
      
      if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        setTimeout(() => {
          const botResponse = getBotResponse(message);
          addMessage(botResponse, false);
        }, 1000);
      }
    }

    sendBtn.addEventListener('click', handleSend);
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    };
    
    userInput.addEventListener('keypress', handleKeyPress);

    return () => {
      sendBtn.removeEventListener('click', handleSend);
      userInput.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <div className="forum-page">
      <div className="chat-container-wrapper">
        <div className="chat-box">
          <div className="chat-header">
            <h2>Chat BrainWave</h2>
            <p>Conecte-se com nossa comunidade</p>
          </div>
          
          <div className="chat-messages" id="chatMessages">
            <div className="message bot-message">
              <div className="message-content">
                <i className="fas fa-robot"></i>
                <p>Olá! 👋 Bem-vindo ao BrainWave Connect. Sou o BrainWave Bot e estou aqui para ajudar! Você pode perguntar sobre artigos, jogos, TDAH, autismo, recursos educativos e muito mais. Digite "menu" para ver todas as opções! 😊</p>
              </div>
            </div>
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              id="userInput"
              placeholder="Digite sua mensagem..."
              className="chat-input"
            />
            <button id="sendBtn" className="send-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
