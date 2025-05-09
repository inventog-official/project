// import { NextResponse } from 'next/server';
// import { z } from 'zod';
// import { db } from '@/lib/db';
// import { testimonials } from '@/lib/db/schema';
// import { eq } from 'drizzle-orm';

// const testimonialSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   role: z.string().min(2, 'Role must be at least 2 characters'),
//   content: z.string().min(10, 'Content must be at least 10 characters'),
//   imageUrl: z.string().url('Please enter a valid image URL'),
//   youtubeUrl: z.string().url('Please enter a valid YouTube URL').optional().or(z.literal(""))
// });

// export async function GET() {
//   try {
//     const allTestimonials = await db.select().from(testimonials);
//     return NextResponse.json({ success: true, testimonials: allTestimonials });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const data = testimonialSchema.parse(body);

//     const [testimonial] = await db.insert(testimonials).values(data).returning();
//     return NextResponse.json({ success: true, testimonial });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
//     }
//     return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ success: false, error: 'Testimonial ID is required' }, { status: 400 });
//     }

//     await db.delete(testimonials).where(eq(testimonials.id, id));
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { testimonials } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  imageUrl: z.string().url('Please enter a valid image URL'),
  youtubeUrl: z.string().url('Please enter a valid YouTube URL').optional().or(z.literal("")),
});

// GET all testimonials
export async function GET() {
  try {
    const allTestimonials = await db.select().from(testimonials);
    return NextResponse.json({ success: true, testimonials: allTestimonials });
  } catch (error) {
    console.error('[GET Testimonials]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST a new testimonial
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = testimonialSchema.parse(body);

    const [testimonial] = await db.insert(testimonials).values({
      name: data.name,
      role: data.role,
      content: data.content,
      imageUrl: data.imageUrl,        // ✅ Use camelCase (matches Drizzle schema key)
      youtubeUrl: data.youtubeUrl || null
    }).returning();
    

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('[POST Testimonials]', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE a testimonial by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Testimonial ID is required' }, { status: 400 });
    }

    await db.delete(testimonials).where(eq(testimonials.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE Testimonials]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
