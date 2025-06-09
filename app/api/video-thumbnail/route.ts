import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { publicId, timestamp } = await req.json();

    if (!publicId || timestamp === undefined) {
      return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }

    const thumbnailUrl = cloudinary.url(publicId, {
      resource_type: 'video',
      format: 'jpg',
      transformation: [
        { start_offset: `${timestamp}` },
        { width: 1280, height: 720, crop: 'fill', gravity: 'auto' },
      ],
    });

    return NextResponse.json({ thumbnailUrl });
  } catch (error) {
    console.error('Thumbnail generation failed:', error);
    return NextResponse.json({ error: 'Thumbnail generation failed' }, { status: 500 });
  }
}
