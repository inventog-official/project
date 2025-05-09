// File: app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { blogs } from '@/lib/db/schema';

const blogSchema = z.object({
  title: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.string().min(50),
  imageUrl: z.string().url(),
  category: z.string().min(2)
});

export async function POST(req: Request) {
  try {
    const data = blogSchema.parse(await req.json());
    const [blog] = await db.insert(blogs).values(data).returning();
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allBlogs = await db.select().from(blogs).orderBy(blogs.createdAt);
    return NextResponse.json({ success: true, blogs: allBlogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
