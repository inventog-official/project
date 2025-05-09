import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { careers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const careerSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  type: z.enum(['Full-Time', 'Part-Time', 'Internship']),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters'),
  salary: z.string().optional(),
  applyUrl: z.string().url('Please enter a valid URL').optional().or(z.literal(''))
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [career] = await db.select().from(careers).where(eq(careers.id, params.id));
    if (!career) {
      return NextResponse.json(
        { success: false, error: 'Career not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, career });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(careers).where(eq(careers.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();

    const updated = await db
      .update(careers)
      .set({
        title: body.title,
        type: body.type,
        location: body.location,
        description: body.description,
        requirements: body.requirements,
        salary: body.salary || null,
        applyUrl: body.applyUrl || null,
      })
      .where(eq(careers.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating career:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}