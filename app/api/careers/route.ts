// app/api/admin/careers/route.ts
import { db } from '@/lib/db';
import { careers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const allCareers = await db.select().from(careers).orderBy(careers.createdAt);
  return NextResponse.json(allCareers);
}
