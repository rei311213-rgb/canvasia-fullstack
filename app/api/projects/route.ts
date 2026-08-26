import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
const schema=z.object({name:z.string().trim().min(1).max(120),type:z.string().trim().max(80).default('Custom'),data:z.record(z.string(),z.unknown()).default({})});
export async function GET(){const user=await getCurrentUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});const projects=await prisma.project.findMany({where:{userId:user.id},orderBy:{updatedAt:'desc'}});return NextResponse.json(projects);}
export async function POST(req:Request){const user=await getCurrentUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});const parsed=schema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:'Invalid project'},{status:400});const project=await prisma.project.create({data:{...parsed.data,userId:user.id}});return NextResponse.json(project,{status:201});}
