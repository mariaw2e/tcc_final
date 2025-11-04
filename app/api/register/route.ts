import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Por enquanto, apenas simula sucesso
    // Quando reconectar o banco, você implementará a lógica real aqui
    return NextResponse.json(
      { 
        message: 'Conta criada com sucesso!',
        user: { name, email }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { message: 'Erro ao processar requisição' },
      { status: 500 }
    )
  }
}
