import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Por enquanto, apenas simula sucesso
    // Quando reconectar o banco, você implementará a lógica real aqui
    return NextResponse.json(
      { 
        message: 'Login realizado com sucesso!',
        user: { email }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { message: 'Erro ao processar requisição' },
      { status: 500 }
    )
  }
}
