import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const name = String(body.name || 'Uploaded image').slice(0, 120);
  const category = String(body.category || 'uploads').slice(0, 60);
  const imageUrl = String(body.imageUrl || '');
  if (!imageUrl.startsWith('data:image/')) return NextResponse.json({ error: 'Only image data is supported.' }, { status: 400 });
  if (imageUrl.length > 8_000_000) return NextResponse.json({ error: 'Image is too large. Maximum is about 6 MB.' }, { status: 413 });
  const asset = await prisma.asset.create({ data: { name, category, imageUrl, userId: user.id } });
  return NextResponse.json(asset, { status: 201 });
}
