import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Senha obrigatória' }, { status: 400 })
    }

    const valid = await verifyPassword(password)

    if (!valid) {
      return NextResponse.json({ error: 'Senha inválida' }, { status: 401 })
    }

    await createSession()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
