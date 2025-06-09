import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

// ✅ Configure Cloudinary immediately after import
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

// 🔍 Optional: Debug env variables (remove in prod)
console.log('ENV DEBUG:', {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? 'loaded' : 'MISSING',
});

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(videos);
  } catch (error) {
    console.error('❌ Error fetching videos:', error);
    return NextResponse.json({ error: 'Error Fetching Videos' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  const publicId = request.nextUrl.searchParams.get('publicId');

  if (!publicId) {
    return NextResponse.json({ error: 'Missing publicId' }, { status: 400 });
  }

  try {
    // ✅ Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

    // ✅ Delete from your database
    await prisma.video.delete({
      where: { publicId },
    });

    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting video:', error);
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
