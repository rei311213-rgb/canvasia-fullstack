import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function NewDesign() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const project = await prisma.project.create({
    data: { userId: user.id, name: 'Untitled design', type: 'Custom', data: { version: 1, width: 760, height: 540, objects: [] } },
  });
  redirect(`/editor/${project.id}`);
}
