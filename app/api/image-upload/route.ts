// app/api/image-upload/route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// ✅ Better to configure once and reuse from a utility file
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true, // ✅ enforce HTTPS
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Wrap upload in Promise
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
      {
          folder: 'next-cloudinary-uploads',
          resource_type: 'image',
          use_filename: false,
          unique_filename: true,
          overwrite: false,
          transformation: [
            { quality: 'auto:good', fetch_format: 'auto' },
          ],
        },

        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Upload failed'));
          } else {
            resolve(result as CloudinaryUploadResult);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json(
      {
        publicId: result.public_id,
        url: result.secure_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Upload image failed:', error);
    return NextResponse.json({ error: 'Upload image failed' }, { status: 500 });
  }
}
