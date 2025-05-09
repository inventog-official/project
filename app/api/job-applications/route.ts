import { db } from '@/lib/db';
import { jobApplications, careers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// GET - Fetch all job applications
export async function GET() {
  const data = await db
    .select({
      id: jobApplications.id,
      name: jobApplications.name,
      email: jobApplications.email,
      phone: jobApplications.phone,
      resumeUrl: jobApplications.resumeUrl,
      coverLetter: jobApplications.coverLetter,
      createdAt: jobApplications.createdAt,
      careerTitle: careers.title,
    })
    .from(jobApplications)
    .leftJoin(careers, eq(jobApplications.careerId, careers.id))
    .orderBy(jobApplications.createdAt);

  return NextResponse.json(data);
}

// POST - Submit job application
export async function POST(request: Request) {
  try {
    const { name, email, phone, resumeUrl, coverLetter, careerId } = await request.json();

    // Validation (you can customize it as per your needs)
    if (!name || !email || !phone || !resumeUrl || !careerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert job application into the database
    const result = await db.insert(jobApplications).values({
      name,
      email,
      phone,
      resumeUrl,
      coverLetter,
      careerId,
    });

    return NextResponse.json({ message: 'Application submitted successfully', data: result });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong while submitting the application.' }, { status: 500 });
  }
}
