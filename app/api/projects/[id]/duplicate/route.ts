import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export async function POST(_req:Request,{params}:{params:Promise<{id:string}>}){const user=await getCurrentUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await params;const p=await prisma.project.findFirst({where:{id,userId:user.id}});if(!p)return NextResponse.json({error:'Not found'},{status:404});const copy=await prisma.project.create({data:{name:`${p.name} Copy`,type:p.type,data:p.data,thumbnailUrl:p.thumbnailUrl,userId:user.id}});return NextResponse.json(copy,{status:201});}
