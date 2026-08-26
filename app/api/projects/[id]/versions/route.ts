import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { id, userId: user.id }, select: { id: true } });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const versions = await prisma.projectVersion.findMany({ where: { projectId: id }, orderBy: { createdAt: 'desc' }, take: 30, select: { id: true, createdAt: true, data: true } });
  return NextResponse.json(versions);
}
