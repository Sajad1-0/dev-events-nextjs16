import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Await params — required in Next.js 15+
    const { slug } = await params;

    // Validate slug presence and type
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    await connectDB();

    // Query by slug (indexed for performance)
    const event: IEvent | null = await Event.findOne({ slug: slug.toLowerCase().trim() }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `No event found with slug: "${slug}"` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    );
  } catch (e) {
    console.error('[GET /api/events/[slug]]', e);
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: e instanceof Error ? e.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
