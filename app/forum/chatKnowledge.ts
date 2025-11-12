// Base de conhecimento abrangente do BrainWave Connect
// Informações verificadas sobre neurodiversidade, TDAH, autismo e educação inclusiva

export interface ChatResponse {
  answer: string;
  relatedTopics?: string[];
}

export const knowledgeBase: Record<string, ChatResponse> = {
  
  // ==================== TDAH ====================
  "tdah": {
    answer: "💫 O TDAH (Transtorno do Déficit de Atenção com Hiperatividade) é uma condição neurobiológica caracterizada por:\n\n• Desatenção persistente\n• Hiperatividade (nem sempre presente)\n• Impulsividade\n\nAfeta cerca de 5-8% das crianças e pode persistir na vida adulta. É importante saber que pessoas com TDAH têm cérebros que funcionam de forma diferente, não inferior. Com estratégias adequadas, podem ter muito sucesso!",
    relatedTopics: ["sintomas tdah", "tratamento tdah", "tdah adulto", "hiperfoco"]
  },
  
  "sintomas tdah": {
    answer: "🔍 Os principais sintomas do TDAH incluem:\n\n**Desatenção:**\n• Dificuldade em manter foco em tarefas\n• Esquecimentos frequentes\n• Perda de objetos\n• Dificuldade em seguir instruções detalhadas\n• Sonhar acordado\n\n**Hiperatividade:**\n• Inquietação constante\n• Dificuldade em ficar sentado\n• Falar excessivamente\n• Sempre 'a mil por hora'\n\n**Impulsividade:**\n• Agir sem pensar nas consequências\n• Interromper conversas\n• Dificuldade em esperar a vez\n\nNem todos têm todos os sintomas. Existem 3 tipos: predominantemente desatento, hiperativo-impulsivo e combinado.",
    relatedTopics: ["diagnóstico tdah", "tdah em meninas"]
  },
  
  "tratamento tdah": {
    answer: "💊 O tratamento do TDAH é multidisciplinar:\n\n**Medicação:**\n• Estimulantes (metilfenidato, lisdexanfetamina)\n• Não-estimulantes (atomoxetina)\n• Sempre prescritos por psiquiatra\n\n**Terapia:**\n• Terapia Cognitivo-Comportamental (TCC)\n• Coaching para TDAH\n• Psicopedagogia\n\n**Estratégias práticas:**\n• Rotinas estruturadas\n• Uso de timers e alarmes\n• Listas e checklists\n• Exercícios físicos regulares\n• Sono adequado\n• Alimentação balanceada\n\n**Apoio educacional:**\n• Adaptações escolares\n• Tempo extra em provas\n• Ambiente tranquilo para estudos",
    relatedTopics: ["medicação tdah", "estratégias tdah"]
  },
  
  "tdah adulto": {
    answer: "👔 O TDAH adulto é real e comum! Muitos adultos descobrem o diagnóstico só depois de adultos.\n\n**Sintomas em adultos:**\n• Procrastinação crônica\n• Dificuldade em gerenciar tempo\n• Desorganização\n• Problemas no trabalho/relacionamentos\n• Baixa autoestima\n• Ansiedade e depressão associadas\n\n**Como lidar:**\n• Busque diagnóstico com psiquiatra\n• Considere medicação + terapia\n• Use apps de organização\n• Trabalhe em ambientes que minimizem distrações\n• Pratique autocompaixão\n• Encontre sua 'zona de genialidade'\n\nMuitos adultos com TDAH são criativos, resilientes e bem-sucedidos quando encontram o ambiente e apoio certos!",
    relatedTopics: ["diagnóstico adulto", "carreira com tdah"]
  },
  
  "hiperfoco": {
    answer: "🎯 O hiperfoco é o 'superpoder' do TDAH! É a capacidade de focar intensamente em algo interessante por horas.\n\n**Características:**\n• Concentração extrema\n• Perda da noção do tempo\n• Esquecer de comer/beber/ir ao banheiro\n• Alta produtividade na tarefa\n\n**Como usar a seu favor:**\n• Identifique suas áreas de interesse\n• Agende blocos de hiperfoco\n• Use timers para não perder compromissos\n• Escolha carreiras que permitam hiperfoco\n• Aproveite para projetos importantes\n\n**Cuidado:**\n• Não esqueça necessidades básicas\n• Balance com outras responsabilidades\n• Use alarmes para transições",
    relatedTopics: ["tdah criatividade", "produtividade tdah"]
  },
  
  "diagnóstico tdah": {
    answer: "🩺 O diagnóstico de TDAH deve ser feito por profissionais qualificados:\n\n**Quem pode diagnosticar:**\n• Psiquiatra (pode prescrever medicação)\n• Neurologista\n• Neuropediatra (crianças)\n\n**Processo de avaliação:**\n• Entrevista clínica detalhada\n• Histórico desde a infância\n• Questionários padronizados (SNAP-IV, ASRS)\n• Avaliação neuropsicológica (opcional)\n• Exclusão de outras condições\n\n**Importante:**\n• Não existe 'exame de TDAH' definitivo\n• O diagnóstico é clínico\n• Sintomas devem estar presentes há pelo menos 6 meses\n• Devem causar prejuízo significativo\n• Devem estar presentes em mais de um ambiente (casa, escola, trabalho)\n\nBusque profissionais especializados em TDAH para diagnóstico preciso!",
    relatedTopics: ["psiquiatra tdah", "teste tdah"]
  },
  
  // ==================== AUTISMO ====================
  "autismo": {
    answer: "🧩 O Autismo (TEA - Transtorno do Espectro Autista) é uma condição do neurodesenvolvimento caracterizada por:\n\n**Características principais:**\n• Diferenças na comunicação social\n• Padrões restritos e repetitivos de comportamento\n• Processamento sensorial diferente\n• Interesses intensos e específicos\n\n**É um espectro:**\nCada pessoa autista é única! Não existe 'autismo leve' ou 'severo', mas sim diferentes níveis de suporte necessário.\n\n**Prevalência:**\n• 1 em cada 36 crianças nos EUA\n• Mais diagnosticado em meninos, mas meninas também têm (muitas subdiagnosticadas)\n\nO autismo não é doença - é uma forma diferente de processar o mundo!",
    relatedTopics: ["sintomas autismo", "diagnóstico autismo", "autismo em meninas"]
  },
  
  "sintomas autismo": {
    answer: "🔍 Sinais e características do autismo (podem variar muito!):\n\n**Comunicação Social:**\n• Dificuldade com contato visual\n• Dificuldade em entender expressões faciais/tom de voz\n• Comunicação muito literal\n• Dificuldade em fazer amigos\n• Preferência por rotinas e previsibilidade\n\n**Comportamentos:**\n• Movimentos repetitivos (stimming: balançar, bater palmas)\n• Interesses intensos em tópicos específicos\n• Necessidade de rotinas\n• Resistência a mudanças\n\n**Sensorial:**\n• Hiper ou hipossensibilidade a sons, luzes, texturas, cheiros\n• Seletividade alimentar\n• Desconforto com certas roupas/etiquetas\n\n**Lembrando:** Nem todos os autistas têm todos esses traços! Cada pessoa é única.",
    relatedTopics: ["diagnóstico autismo", "stimming"]
  },
  
  "diagnóstico autismo": {
    answer: "🩺 O diagnóstico de autismo deve ser feito por equipe multidisciplinar:\n\n**Profissionais envolvidos:**\n• Psiquiatra infantil ou neurologista\n• Psicólogo especializado\n• Fonoaudiólogo\n• Terapeuta ocupacional\n\n**Processo:**\n• Observação comportamental\n• Entrevista com pais/cuidadores\n• Escalas padronizadas (M-CHAT, CARS, ADI-R, ADOS)\n• Avaliação do desenvolvimento\n• Histórico desde os primeiros anos\n\n**Quanto antes, melhor:**\nIntervenção precoce (antes dos 3 anos) traz melhores resultados!\n\n**Diagnóstico na adolescência/vida adulta:**\nMuitas pessoas, especialmente meninas, são diagnosticadas tarde. Nunca é tarde para buscar avaliação!",
    relatedTopics: ["autismo adulto", "intervenção precoce"]
  },
  
  "autismo em meninas": {
    answer: "👧 Meninas autistas são frequentemente subdiagnosticadas!\n\n**Por quê:**\n• Tendem a 'camuflar' (masking) mais\n• Sintomas podem ser mais sutis\n• Interesses podem ser socialmente aceitos (animais, leitura)\n• Melhor habilidade de imitar comportamento social\n\n**Sinais específicos em meninas:**\n• Exaustão social intensa\n• Ansiedade e depressão\n• Dificuldade em manter amizades (apesar de querer)\n• Masking constante (esconder traços autistas)\n• Meltdowns em casa (após segurar o dia todo)\n• Interesses intensos, mas socialmente aceitos\n\n**Consequências do diagnóstico tardio:**\n• Burnout autista\n• Problemas de saúde mental\n• Baixa autoestima\n\nSe você suspeita de autismo em meninas, procure profissionais que conheçam essas diferenças!",
    relatedTopics: ["masking", "burnout autista"]
  },
  
  "comunicação autismo": {
    answer: "💬 Estratégias para melhorar a comunicação com pessoas autistas:\n\n**Seja direto e literal:**\n• Evite metáforas e sarcasmo\n• Diga exatamente o que você quer dizer\n• Dê instruções claras e específicas\n\n**Considerações sensoriais:**\n• Ambiente calmo, sem muitos estímulos\n• Respeite a necessidade de espaço pessoal\n• Não force contato visual\n\n**Comunicação alternativa:**\n• PECS (sistema de comunicação por figuras)\n• Aplicativos de comunicação (Livox, LetMe Talk)\n• Língua de sinais\n• Escrita/digitação\n\n**Paciência e respeito:**\n• Dê tempo para processar\n• Não pressione para interação social\n• Respeite quando precisam de tempo sozinhos\n• Valide suas emoções e experiências",
    relatedTopics: ["pecs", "caa", "autismo não verbal"]
  },
  
  "stimming": {
    answer: "🌀 Stimming (comportamentos autoestimulatórios) é natural e importante!\n\n**O que é:**\nMovimentos repetitivos que ajudam a regular emoções e processar sensações:\n• Balançar o corpo\n• Bater palmas\n• Movimentos com as mãos (flapping)\n• Girar objetos\n• Balançar as pernas\n• Sons vocais repetitivos\n\n**Por que é importante:**\n• Ajuda a acalmar ansiedade\n• Regula sobrecarga sensorial\n• Expressa emoções intensas\n• Ajuda na concentração\n• É uma forma de autocuidado\n\n**Quando intervir:**\nApenas se for perigoso ou muito disruptivo. Do contrário, deixe! É uma forma de autorregulação.\n\n**Alternativas discretas:**\nFidget toys, joias de stimming, apertar bolas antistress.",
    relatedTopics: ["sobrecarga sensorial", "autorregulação"]
  },
  
  // ==================== DISLEXIA ====================
  "dislexia": {
    answer: "📖 Dislexia é uma diferença no processamento da leitura e escrita.\n\n**Características:**\n• Dificuldade em decodificar palavras\n• Leitura lenta e trabalhosa\n• Erros de ortografia\n• Inversão de letras (b/d, p/q)\n• Dificuldade com rimas\n\n**Importante saber:**\n• NÃO é falta de inteligência!\n• Muitas pessoas disléxicas são altamente inteligentes e criativas\n• Famosos com dislexia: Albert Einstein, Steven Spielberg, Whoopi Goldberg\n\n**Estratégias:**\n• Método fônico de alfabetização\n• Leitura multissensorial\n• Audiolivros\n• Tempo extra em provas\n• Tecnologia assistiva (leitores de tela)\n• Fonte OpenDyslexic\n\n**Diagnóstico:**\nPsicopedagogo, neuropsicólogo ou fonoaudiólogo especializado.",
    relatedTopics: ["estratégias dislexia", "tecnologia dislexia"]
  },
  
  // ==================== ANSIEDADE & SAÚDE MENTAL ====================
  "ansiedade neurodivergente": {
    answer: "😰 Ansiedade é muito comum em pessoas neurodivergentes!\n\n**Por quê:**\n• Sobrecarga sensorial constante\n• Dificuldade em prever situações sociais\n• Mascaramento/camuflagem social\n• Experiências de rejeição\n• Dificuldades executivas (TDAH)\n\n**Como ajudar:**\n• Terapia especializada (TCC adaptada)\n• Técnicas de regulação sensorial\n• Mindfulness e respiração\n• Reduzir demandas quando possível\n• Ambiente previsível e estruturado\n• Medicação (quando necessário)\n• Autocuidado e limites claros\n\n**Emergências:**\nSe você ou alguém está em crise: CVV 188 (24h, gratuito)",
    relatedTopics: ["sobrecarga sensorial", "burnout autista"]
  },
  
  "burnout autista": {
    answer: "🔥 Burnout autista é um estado de exaustão física e mental extrema.\n\n**Causas:**\n• Mascaramento prolongado\n• Sobrecarga sensorial crônica\n• Demandas sociais excessivas\n• Falta de acomodações\n• Mudanças constantes\n\n**Sintomas:**\n• Perda de habilidades (fala, autocuidado)\n• Exaustão extrema\n• Aumento de meltdowns/shutdowns\n• Hipersensibilidade sensorial\n• Dificuldade com tarefas antes fáceis\n• Isolamento social\n\n**Recuperação:**\n• DESCANSO (muito!)\n• Reduzir demandas ao mínimo\n• Ambiente seguro e calmo\n• Permitir stimming\n• Sem pressão social\n• Terapia especializada\n• Pode levar meses/anos\n\n**Prevenção:**\nConheça seus limites, não force mascaramento, peça acomodações, descanse preventivamente!",
    relatedTopics: ["masking", "autocuidado autista"]
  },
  
  // ==================== EDUCAÇÃO E ESCOLA ====================
  "inclusão escolar": {
    answer: "🏫 Inclusão escolar é direito garantido por lei no Brasil!\n\n**Lei Brasileira de Inclusão (LBI - 13.146/2015):**\n• Proíbe recusa de matrícula\n• Garante adaptações necessárias\n• Profissional de apoio quando necessário\n• Materiais acessíveis\n\n**Adaptações comuns:**\n• Provas com tempo estendido\n• Provas orais\n• Ambiente tranquilo separado\n• Redução de estímulos\n• Uso de fones de ouvido\n• Intervalos para autorregulação\n• Material visual/concreto\n• Comunicação alternativa\n\n**Plano Educacional Individualizado (PEI):**\nDocumento que define adaptações específicas para cada aluno.\n\n**Direitos:**\nSe a escola negar adaptações, você pode:\n• Conversar com direção/coordenação\n• Procurar Secretaria de Educação\n• Ministério Público\n• Defensoria Pública",
    relatedTopics: ["pei", "direitos educacionais"]
  },
  
  "estratégias sala de aula": {
    answer: "👨‍🏫 Estratégias para professores com alunos neurodivergentes:\n\n**Para TDAH:**\n• Sentar perto do professor\n• Instruções curtas e claras\n• Uso de timers visuais\n• Pausas para movimento\n• Reforço positivo frequente\n• Permissão para fidget toys\n\n**Para Autismo:**\n• Rotina visual clara\n• Avisos prévios de mudanças\n• Espaço de regulação sensorial\n• Instruções escritas\n• Tempo extra para transições\n• Evitar sobrecarga sensorial\n\n**Para Dislexia:**\n• Material com fonte maior\n• Tempo extra para leitura\n• Audiolivros\n• Não forçar leitura em voz alta\n• Focar no conteúdo, não na ortografia\n\n**Universal:**\n• Ensino multissensorial\n• Múltiplas formas de demonstrar aprendizado\n• Ambiente acolhedor e respeitoso",
    relatedTopics: ["adaptações escolares", "educação inclusiva"]
  },
  
  // ==================== FAMÍLIA E PAIS ====================
  "pais de neurodivergentes": {
    answer: "👨‍👩‍👧‍👦 Guia para pais de crianças neurodivergentes:\n\n**Primeiros passos:**\n• Busque diagnóstico com profissionais qualificados\n• Eduque-se sobre a condição\n• Conecte-se com outras famílias\n• Busque apoio profissional (terapias)\n\n**Autocuidado:**\n• Cuide da sua saúde mental!\n• Procure terapia se necessário\n• Tire pausas\n• Não se culpe\n• Celebre pequenas vitórias\n\n**Advocacia:**\n• Conheça os direitos do seu filho\n• Seja parceiro da escola\n• Exija adaptações necessárias\n• Documente tudo\n\n**Amor e aceitação:**\n• Aceite seu filho como ele é\n• Foque nas forças, não só dificuldades\n• Ouça suas necessidades\n• Respeite seus limites\n• Celebre sua neurodiversidade!\n\n**Recursos:**\nBusque grupos de apoio, associações de pais, comunidades online.",
    relatedTopics: ["direitos", "terapias", "autocuidado pais"]
  },
  
  "irmãos de neurodivergentes": {
    answer: "👫 Irmãos de crianças neurodivergentes também precisam de atenção!\n\n**Desafios comuns:**\n• Sentir que recebem menos atenção\n• Responsabilidade excessiva\n• Preocupação com futuro\n• Dificuldade em explicar aos amigos\n• Ciúmes dos cuidados especiais\n\n**Como ajudar:**\n• Reserve tempo individual com cada filho\n• Explique a condição de forma adequada à idade\n• Valide sentimentos (mesmo negativos)\n• Não sobrecarregue com responsabilidades\n• Permita que sejam crianças\n• Inclua em atividades familiares\n• Busque grupos de irmãos (sibshops)\n\n**Aspectos positivos:**\nIrmãos frequentemente desenvolvem:\n• Maior empatia\n• Paciência\n• Maturidade\n• Orgulho e amor profundo",
    relatedTopics: ["família", "relações familiares"]
  },
  
  // ==================== RECURSOS E FERRAMENTAS ====================
  "tecnologia assistiva": {
    answer: "💻 Tecnologias que ajudam pessoas neurodivergentes:\n\n**Para leitura/escrita:**\n• Leitores de tela (NVDA, JAWS)\n• Ditado por voz (Dragon, Google Docs)\n• Corretor ortográfico inteligente (Grammarly)\n• OpenDyslexic (fonte)\n\n**Para organização (TDAH):**\n• Todoist, Any.do (listas de tarefas)\n• Forest, Focus@Will (foco)\n• Google Calendar (lembretes)\n• Habitica (gamificação de tarefas)\n\n**Para comunicação (Autismo):**\n• Livox, LetMe Talk (CAA)\n• Visual schedules apps\n• Timer visual\n\n**Para regulação sensorial:**\n• Apps de sons brancos\n• Apps de respiração (Calm, Headspace)\n• Fidget apps\n\n**Acessibilidade nativa:**\n• Modo escuro\n• Tamanho de fonte\n• Narração de tela\n• Legendas automáticas",
    relatedTopics: ["apps tdah", "caa", "acessibilidade"]
  },
  
  "jogos educativos": {
    answer: "🎮 Jogos educativos do BrainWave Connect:\n\n**Memória e Atenção:**\n• Jogo da Memória das Emoções\n• Jogo de Concentração\n• Encontre as Diferenças\n\n**Linguagem:**\n• Caça-Palavras\n• Jogo da Forca\n• Complete a Palavra\n\n**Raciocínio:**\n• Quebra-Cabeça\n• Sequências Lógicas\n• Labirinto\n\n**Matemática:**\n• Números e Quantidades\n• Operações Matemáticas\n\n**Benefícios:**\n• Desenvolvimento cognitivo\n• Melhora da atenção\n• Aprendizado lúdico\n• Autoestima\n• Diversão!\n\n**Acesse:** Visite nossa página de Jogos para explorar!",
    relatedTopics: ["jogos", "desenvolvimento cognitivo"]
  },
  
  // ==================== TRABALHO E CARREIRA ====================
  "carreira neurodivergente": {
    answer: "💼 Guia de carreira para pessoas neurodivergentes:\n\n**Pontos fortes comuns:**\n\n**TDAH:**\n• Criatividade\n• Pensamento 'fora da caixa'\n• Energia e entusiasmo\n• Capacidade de hiperfoco\n• Bom em crises/urgências\n\n**Autismo:**\n• Atenção aos detalhes\n• Pensamento lógico/sistemático\n• Honestidade\n• Foco intenso\n• Expertise em áreas específicas\n\n**Carreiras favoráveis:**\n• Programação/TI\n• Design/Arte\n• Pesquisa científica\n• Escrita/Jornalismo\n• Empreendedorismo\n• Engenharia\n• Música\n\n**Acomodações no trabalho:**\n• Home office/híbrido\n• Fones com cancelamento de ruído\n• Flexibilidade de horários\n• Instruções por escrito\n• Pausas para autorregulação\n\n**Divulgação:**\nVocê decide se quer revelar seu diagnóstico. Considere cultura da empresa e necessidade de acomodações.",
    relatedTopics: ["acomodações trabalho", "empreendedorismo neurodivergente"]
  },
  
  // ==================== INFORMAÇÕES GERAIS ====================
  "neurodiversidade": {
    answer: "🌈 Neurodiversidade é um conceito que reconhece que cérebros humanos variam naturalmente.\n\n**Inclui:**\n• Autismo\n• TDAH\n• Dislexia\n• Dispraxia\n• Tourette\n• E outras variações neurológicas\n\n**Filosofia:**\n• Não são 'transtornos' a serem 'curados'\n• São variações naturais da cognição humana\n• Cada tipo de cérebro tem forças e desafios\n• A sociedade deve se adaptar, não só o indivíduo\n\n**Modelo social vs. médico:**\n• Médico: foca em 'déficit' e 'tratamento'\n• Social: foca em barreiras ambientais e inclusão\n\n**Advocacia:**\n• 'Nada sobre nós sem nós'\n• Ouvir vozes neurodivergentes\n• Respeito e inclusão\n• Acomodações, não 'normalização'",
    relatedTopics: ["modelo social", "direitos neurodivergentes"]
  },
  
  "laudo médico": {
    answer: "📋 Laudo médico para neurodiversidade:\n\n**Para que serve:**\n• Acesso a tratamentos e terapias\n• Adaptações escolares\n• Acomodações no trabalho\n• Benefícios (BPC-LOAS, quando aplicável)\n• Isenção de impostos (carros, quando aplicável)\n• Prioridade em filas\n\n**Quem pode emitir:**\n• Psiquiatra\n• Neurologista\n• Neuropediatra\n• Em alguns casos: psicólogo + médico\n\n**O que deve conter:**\n• CID (Código Internacional de Doenças)\n• Descrição dos sintomas e prejuízos\n• Avaliações realizadas\n• Indicação de tratamentos\n• Necessidade de acomodações\n\n**CIDs comuns:**\n• F90 - TDAH\n• F84.0 - Autismo\n• F81.0 - Dislexia\n\n**Importante:**\nGuarde cópias, atualize periodicamente, leve sempre que necessário!",
    relatedTopics: ["direitos", "benefícios"]
  },
  
  // ==================== CRISE E EMERGÊNCIA ====================
  "meltdown": {
    answer: "🌪️ Meltdown é uma sobrecarga que leva à perda de controle (comum no autismo).\n\n**Não é birra!**\nÉ uma resposta neurológica involuntária a sobrecarga.\n\n**Causas:**\n• Sobrecarga sensorial\n• Mudanças inesperadas\n• Demandas excessivas\n• Estresse acumulado\n• Fome, cansaço, doença\n\n**Sinais de alerta:**\n• Aumento de stimming\n• Irritabilidade\n• Dificuldade em processar informações\n• Rigidez\n\n**Como ajudar durante:**\n• Remova da situação estressante\n• Reduza estímulos (luzes, sons)\n• Dê espaço\n• Fale pouco e calmamente\n• Não toque sem permissão\n• Mantenha segurança\n• Seja paciente\n\n**Depois:**\n• Não puna ou envergonhe\n• Converse quando estiver calmo\n• Identifique gatilhos\n• Planeje prevenção",
    relatedTopics: ["shutdown", "sobrecarga sensorial", "autorregulação"]
  },
  
  "shutdown": {
    answer: "🔇 Shutdown é quando a pessoa 'desliga' devido à sobrecarga (comum no autismo).\n\n**Diferença do meltdown:**\n• Meltdown = explosão para fora\n• Shutdown = implosão para dentro\n\n**Sinais:**\n• Mutismo (para de falar)\n• Imobilidade\n• Olhar vago\n• Incapacidade de tomar decisões\n• Necessidade de isolamento\n\n**Como ajudar:**\n• Respeite a necessidade de silêncio\n• Dê tempo e espaço\n• Ambiente escuro e quieto\n• Coberta pesada (se ajudar)\n• Não force interação\n• Ofereça água/comida (não force)\n• Espere o sistema 'reiniciar'\n\n**Recuperação:**\nPode levar minutos até dias. Seja paciente!\n\n**Prevenção:**\nIdentifique sinais precoces, reduza demandas, permita pausas frequentes.",
    relatedTopics: ["meltdown", "regulação sensorial"]
  },
  
  // ==================== AJUDA E RECURSOS ====================
  "onde buscar ajuda": {
    answer: "🆘 Recursos e onde buscar ajuda:\n\n**Diagnóstico e tratamento:**\n• SUS: CAPS, ambulatórios de saúde mental\n• Universidades: clínicas-escola (atendimento gratuito/baixo custo)\n• Convênios médicos\n• Particular\n\n**Apoio psicológico:**\n• CVV: 188 (24h, gratuito)\n• Pode Falar (chat para jovens)\n• CAPS (Centro de Atenção Psicossocial)\n\n**Direitos e advocacia:**\n• Defensoria Pública\n• Ministério Público\n• OAB (assistência jurídica)\n• Associações de pais e autistas\n\n**Comunidades online:**\n• Grupos no Facebook\n• Fóruns especializados\n• Instagram de ativistas neurodivergentes\n\n**Emergências:**\n• SAMU: 192\n• Bombeiros: 193\n• Polícia: 190\n• CVV (prevenção suicídio): 188",
    relatedTopics: ["sus", "terapias", "direitos"]
  },
  
  "terapias": {
    answer: "🧘 Principais terapias para pessoas neurodivergentes:\n\n**Para Autismo:**\n• ABA (Análise do Comportamento Aplicada) - polêmica, pesquise bem\n• TEACCH (estruturação visual)\n• Modelo Denver\n• Terapia Ocupacional\n• Fonoaudiologia\n• Psicoterapia adaptada\n\n**Para TDAH:**\n• TCC (Terapia Cognitivo-Comportamental)\n• Coaching para TDAH\n• Terapia Ocupacional\n• Psicopedagogia\n\n**Para Dislexia:**\n• Psicopedagogia\n• Fonoaudiologia\n• Reforço escolar especializado\n\n**Importante:**\n• Abordagem multidisciplinar é ideal\n• Respeite a neurodivergência (não tente 'normalizar')\n• Ouça a pessoa neurodivergente\n• Foque em qualidade de vida, não em 'parecer neurotípico'\n• Cuidado com terapias que prometem 'cura'",
    relatedTopics: ["aba controversia", "terapia ocupacional"]
  }
};

// Função para buscar resposta mais relevante
export function findBestMatch(userMessage: string): ChatResponse | null {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Busca exata
  if (knowledgeBase[lowerMessage]) {
    return knowledgeBase[lowerMessage];
  }
  
  // Busca por palavras-chave
  const keywords = lowerMessage.split(' ');
  let bestMatch: { key: string; score: number } | null = null;
  
  for (const [key, response] of Object.entries(knowledgeBase)) {
    let score = 0;
    const keyWords = key.split(' ');
    
    for (const keyword of keywords) {
      if (keyword.length > 2) { // Ignora palavras muito curtas
        if (key.includes(keyword)) {
          score += 2;
        }
        for (const keyWord of keyWords) {
          if (keyWord.includes(keyword) || keyword.includes(keyWord)) {
            score += 1;
          }
        }
      }
    }
    
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { key, score };
    }
  }
  
  return bestMatch && bestMatch.score >= 2 ? knowledgeBase[bestMatch.key] : null;
}
