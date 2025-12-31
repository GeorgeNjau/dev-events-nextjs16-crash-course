import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

// Type for route params in Next.js App Router
type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single events by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Await params to get the slug value
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter.' },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens only)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { message: 'Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens.' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query events by slug
    const event =  await Event.findOne({ slug }).lean();

    // Handle events not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${slug}' not found.` },
        { status: 404 }
      );
    }

    // Return the events data
    return NextResponse.json(
      {
        message: 'Event fetched successfully.',
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (consider using a proper logging service in production)
    console.error('Error fetching events by slug:', error);

    // Handle specific Mongoose errors
    if (error instanceof Error) {
      // Handle MongoDB connection errors
      if (error.name === 'MongooseError' || error.message.includes('connect')) {
        return NextResponse.json(
          { message: 'Database connection error. Please try again later.' },
          { status: 503 }
        );
      }

      // Return generic error with message
      return NextResponse.json(
        {
          message: 'Error fetching events.',
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
