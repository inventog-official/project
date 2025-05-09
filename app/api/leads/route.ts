import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { sendLeadThankYouEmail } from '@/lib/email';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  whatsappNumber: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
  electricityBill: z.number().min(1, 'Please enter your electricity bill amount'),
  city: z.string().min(2, 'Please enter your city'),
  companyName: z.string().optional(),
  type: z.enum(['residential', 'housing_society', 'commercial'])
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = leadSchema.parse(body);

    const [lead] = await db.insert(leads).values(data).returning();

    // Send thank you email
    await sendLeadThankYouEmail(data.whatsappNumber + '@whatsapp.com', data.name);

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allLeads = await db.select().from(leads).orderBy(leads.createdAt);
    return NextResponse.json({ success: true, leads: allLeads });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    await db.delete(leads).where(eq(leads.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}