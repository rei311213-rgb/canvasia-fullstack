import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export async function GET(req: Request) { const user=await getCurrentUser(); if(!user)return NextResponse.json({error:'Unauthorized'},{status:401}); const u=new URL(req.url),q=(u.searchParams.get('q')||'').trim(),category=u.searchParams.get('category'); const templates=await prisma.template.findMany({where:{...(category&&category!=='all'?{category}:{}),...(q?{OR:[{name:{contains:q,mode:'insensitive'}},{category:{contains:q,mode:'insensitive'}}]}:{})},orderBy:{createdAt:'desc'}}); return NextResponse.json(templates); }
