import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';
import {v2 as cloudinary} from 'cloudinary';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({message: 'Invalid Data format.'}, {status: 400});
        }

        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({message: 'Image File is required.'}, {status: 400});
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({message: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'}, {status: 400});
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'DevEvent'}, (error, results) => {
                if (error) return reject(error);

                resolve(results);

            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create(event);

        return NextResponse.json({message: 'Event created successfully', event: createdEvent}, {status: 201});

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message: 'Error Creating Event',
            error: e instanceof Error ? e.message : 'Unknown Error'
        }, {status: 500});
    }

}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({createdAt: -1});

        return NextResponse.json({message: 'Event Fetched Successfully.', events: events}, {status: 200});
    } catch (e) {
        return NextResponse.json({message: 'Error fetching events', error: e instanceof Error ? e.message : 'Unknown Error'}, {status: 500});
    }
}

