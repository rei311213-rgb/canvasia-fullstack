import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!project) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  const projectData =
    project.data === null
      ? Prisma.JsonNull
      : (project.data as Prisma.InputJsonValue);

  const copy = await prisma.project.create({
    data: {
      name: `${project.name} Copy`,
      type: project.type,
      data: projectData,
      thumbnailUrl: project.thumbnailUrl,
      userId: user.id,
    },
  });

  return NextResponse.json(copy, { status: 201 });
}
