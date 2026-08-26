import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  type: z.string().trim().max(80).optional(),
  thumbnailUrl: z.string().max(2_500_000).optional().nullable(),
  data: z.record(z.string(), z.unknown()).optional(),
});

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { id, userId: user.id } });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid project' }, { status: 400 });
  const existing = await prisma.project.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (parsed.data.data) { await prisma.projectVersion.create({ data: { projectId: id, data: parsed.data.data } }); }
  const project = await prisma.project.update({ where: { id }, data: parsed.data });
  return NextResponse.json(project);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const existing = await prisma.project.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
