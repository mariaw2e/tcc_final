import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface ArticlePageProps {
  params: Promise<{
    id: string
  }>
}

const getArticleData = (id: string) => {
  // Aqui você pode buscar os dados do artigo de uma API ou banco de dados
  // Por enquanto, vamos usar dados estáticos
  const articles = {
    'neurodivergencia': {
      title: 'Neurodivergência: O Que É e Por Que Importa?',
      date: 'setembro 9, 2025',
      category: 'Neurociência',
      image: '/imagens/img13.jpg',
      content: `
        <h2>O que é Neurodivergência?</h2>
        <p>A neurodivergência é um termo que reconhece e celebra as diferentes formas como nossos cérebros funcionam. 
        Pessoas neurodivergentes podem ter condições como autismo, TDAH, dislexia e outras variações neurológicas que 
        afetam como processam informações, interagem com o mundo e expressam suas emoções.</p>

        <h2>Por que é importante falar sobre isso?</h2>
        <p>Compreender a neurodivergência é essencial para criar uma sociedade mais inclusiva e acolhedora. 
        Quando reconhecemos e valorizamos as diferentes formas de pensar e perceber o mundo, podemos:</p>
        <ul>
          <li>Desenvolver melhores estratégias de apoio</li>
          <li>Criar ambientes mais acessíveis</li>
          <li>Promover a inclusão efetiva</li>
          <li>Celebrar a diversidade neurológica</li>
        </ul>
      `
    },
    'desenvolvimento-emocional': {
      title: 'Desenvolvimento Emocional e Neurodiversidade',
      date: 'setembro 9, 2025',
      category: 'Desenvolvimento',
      image: '/imagens/img14.jpg',
      content: `
        <h2>A Importância do Desenvolvimento Emocional</h2>
        <p>O desenvolvimento emocional é um aspecto crucial no crescimento de todas as pessoas, especialmente 
        quando falamos sobre neurodiversidade. Compreender e apoiar este desenvolvimento pode fazer uma 
        diferença significativa na qualidade de vida de pessoas neurodivergentes.</p>

        <h2>Estratégias de Apoio</h2>
        <p>Existem diversas estratégias que podem auxiliar no desenvolvimento emocional:</p>
        <ul>
          <li>Comunicação adaptada às necessidades individuais</li>
          <li>Ambientes seguros e previsíveis</li>
          <li>Suporte sensorial adequado</li>
          <li>Respeito ao tempo de processamento</li>
        </ul>
      `
    },
    'inclusao-digital': {
      title: 'Inclusão e Acessibilidade na Era Digital',
      date: 'setembro 9, 2025',
      category: 'Tecnologia',
      image: '/imagens/img15.jpg',
      content: `
        <h2>Tecnologia como Ferramenta de Inclusão</h2>
        <p>A era digital trouxe inúmeras oportunidades para promover a inclusão e acessibilidade. 
        Através da tecnologia, podemos criar ferramentas e recursos que facilitam a aprendizagem, 
        a comunicação e a expressão de pessoas neurodivergentes.</p>

        <h2>Recursos Tecnológicos</h2>
        <p>Alguns exemplos de como a tecnologia pode ajudar:</p>
        <ul>
          <li>Aplicativos de comunicação alternativa</li>
          <li>Softwares de apoio à aprendizagem</li>
          <li>Ferramentas de organização e planejamento</li>
          <li>Recursos de acessibilidade personalizados</li>
        </ul>
      `
    }
  }

  return articles[id as keyof typeof articles]
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params
  const article = getArticleData(id)

  if (!article) {
    return <div>Artigo não encontrado</div>
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Banner do Artigo */}
      <section className="relative h-[400px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-white text-center">
            <h1 className="font-montserrat text-4xl mb-4">
              {article.title}
            </h1>
            <div className="flex justify-center gap-4 text-sm">
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo do Artigo */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div 
          className="prose prose-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      <Footer />
    </main>
  )
}
