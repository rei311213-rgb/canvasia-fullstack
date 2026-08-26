import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from './prisma';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'development-only-secret-change-me');
const COOKIE = 'canvasia_session';

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret);
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
}
export async function clearSession() { (await cookies()).delete(COOKIE); }
export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, secret); const id = typeof payload.userId === 'string' ? payload.userId : ''; if (!id) return null; return prisma.user.findUnique({ where: { id } }); }
  catch { return null; }
}
