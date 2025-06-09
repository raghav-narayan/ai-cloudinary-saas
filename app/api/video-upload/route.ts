import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { Readable } from 'stream';

const prisma = new PrismaClient();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    // Clerk Auth
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check Cloudinary config
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: 'Cloudinary credentials not found' },
        { status: 500 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;
    const originalSize = formData.get('originalSize') as string | null;

    // Log form input for debugging
    console.log('📥 Incoming Upload:', {
      title,
      description,
      originalSize,
      fileName: file?.name,
    });

    // Validate inputs
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 });
    }
    if (
      typeof title !== 'string' || title.trim() === '' ||
      typeof description !== 'string' || description.trim() === '' ||
      typeof originalSize !== 'string' || originalSize.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'Missing or empty required fields' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'video-uploads',
          transformation: [
            {
              quality: 'auto:eco',       // better compression
              fetch_format: 'mp4',       // ensures MP4 output
              bitrate: '500k',           // limits bitrate to 500kbps
              width: 720,                // optional: cap resolution
              crop: 'limit',             // prevent upscaling
            },
          ],
                  },
        (error, result) => {
          if (error || !result) {
            console.error('❌ Cloudinary upload error:', error);
            return reject(error || new Error('Upload failed'));
          }
          resolve(result as CloudinaryUploadResult);
        }
      );
      Readable.from(buffer).pipe(uploadStream);
    });

    // Save to Prisma
    const video = await prisma.video.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        publicId: uploadResult.public_id,
        originalSize: originalSize.trim(),
        compressedSize: String(uploadResult.bytes),
        duration: uploadResult.duration || 0,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error: any) {
    console.error('❌ Upload video failed:', error.message || error);
    return NextResponse.json(
      { error: 'Upload video failed', details: error.message || error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
