import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';
const schema=z.object({email:z.string().email().transform(v=>v.toLowerCase()),password:z.string().min(1).max(72)});
export async function POST(req:Request){try{const parsed=schema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:'Invalid credentials'},{status:400});const {email,password}=parsed.data;const user=await prisma.user.findUnique({where:{email}});if(!user||!(await bcrypt.compare(password,user.passwordHash)))return NextResponse.json({error:'Invalid email or password'},{status:401});await createSession(user.id);return NextResponse.json({ok:true});}catch{return NextResponse.json({error:'Unable to sign in'},{status:500});}}
