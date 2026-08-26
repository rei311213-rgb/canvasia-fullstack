import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

const schema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().email().transform(v => v.toLowerCase()),
  password: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid registration details' },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    await createSession(user.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('REGISTRATION_ERROR:', error);

    return NextResponse.json(
      { error: 'Unable to register' },
      { status: 500 }
    );
  }
}
