import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const premium = searchParams.get('premium');
    const destaque = searchParams.get('destaque');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {
      ativo: true
    };

    if (categoria) {
      where.categoria = categoria;
    }

    if (premium !== null) {
      where.premium = premium === 'true';
    }

    if (destaque !== null) {
      where.destaque = destaque === 'true';
    }

    const artigos = await prisma.artigo.findMany({
      where,
      select: {
        id: true,
        titulo: true,
        slug: true,
        subtitulo: true,
        descricao: true,
        imagemCapa: true,
        imagemPrincipal: true,
        categoria: true,
        tags: true,
        autor: true,
        dataPublicacao: true,
        visualizacoes: true,
        destaque: true,
        premium: true
      },
      orderBy: [
        { destaque: 'desc' },
        { dataPublicacao: 'desc' }
      ],
      take: limit,
      skip: offset
    });

    const total = await prisma.artigo.count({ where });

    return NextResponse.json({
      artigos,
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    });
  } catch (error) {
    console.error('Erro ao buscar artigos (usando dados mock):', error);
    
    // Obter limit do searchParams no catch também
    const { searchParams } = new URL(request.url);
    const limitValue = parseInt(searchParams.get('limit') || '10');
    
    // Retornar dados mock quando o banco não estiver disponível
    const mockArtigos = [
      {
        id: 1,
        titulo: "TDAH e Hiperfoco: O Superpoder da Concentração",
        slug: "tdah-hiperfoco-superpoder-concentracao",
        subtitulo: "Como transformar o hiperfoco em uma vantagem",
        descricao: "Entenda como pessoas com TDAH podem usar o hiperfoco de forma produtiva",
        imagemCapa: "/imagens/tdah-hiperfoco.jpg",
        imagemPrincipal: "/imagens/tdah-hiperfoco.jpg",
        categoria: "TDAH",
        tags: ["TDAH", "Hiperfoco", "Produtividade"],
        autor: "BrainWave Connect",
        dataPublicacao: new Date("2024-10-15"),
        visualizacoes: 1250,
        destaque: true,
        premium: false
      },
      {
        id: 2,
        titulo: "Autismo e Comunicação: Quebrando Barreiras",
        slug: "autismo-comunicacao-quebrando-barreiras",
        subtitulo: "Estratégias eficazes de comunicação",
        descricao: "Descubra técnicas para melhorar a comunicação com pessoas autistas",
        imagemCapa: "/imagens/autismo-comunicacao.jpg",
        imagemPrincipal: "/imagens/autismo-comunicacao.jpg",
        categoria: "Autismo",
        tags: ["Autismo", "Comunicação", "Inclusão"],
        autor: "BrainWave Connect",
        dataPublicacao: new Date("2024-10-10"),
        visualizacoes: 980,
        destaque: true,
        premium: false
      },
      {
        id: 3,
        titulo: "Neurodivergência e Criatividade",
        slug: "neurodivergencia-criatividade",
        subtitulo: "O poder criativo da mente neurodivergente",
        descricao: "Como a neurodivergência impulsiona a criatividade e inovação",
        imagemCapa: "/imagens/neurodivergencia-criatividade.jpg",
        imagemPrincipal: "/imagens/neurodivergencia-criatividade.jpg",
        categoria: "Neurodivergência",
        tags: ["Neurodivergência", "Criatividade", "Inovação"],
        autor: "BrainWave Connect",
        dataPublicacao: new Date("2024-10-05"),
        visualizacoes: 756,
        destaque: false,
        premium: false
      }
    ];
    
    return NextResponse.json({
      artigos: mockArtigos.slice(0, limitValue),
      total: mockArtigos.length,
      limit: limitValue,
      offset: 0,
      hasMore: false
    });
  }
}