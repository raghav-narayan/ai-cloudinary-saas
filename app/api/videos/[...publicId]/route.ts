import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname; // e.g., /api/videos/video-uploads/abc123
  const fullPublicId = pathname.split('/api/videos/')[1]; // extract "video-uploads/abc123"

  const video = await prisma.video.findUnique({
    where: { publicId: fullPublicId },
  });

  if (!video) {
    return new Response(JSON.stringify({ error: 'Video not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(video), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
