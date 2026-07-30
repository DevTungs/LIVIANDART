import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''
const SESSION_COOKIE = 'liv_admin_session'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string): Promise<boolean> {
  if (!ADMIN_PASSWORD_HASH) return false
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.has(SESSION_COOKIE)
}
