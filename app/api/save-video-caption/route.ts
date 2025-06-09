import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { publicId, caption, tone } = await req.json();

    console.log('[Input]', { publicId, caption });


    if (!publicId || !caption) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const video = await prisma.video.findUnique({ where: { publicId } });
    console.log('[Video]', video);

    const title = video?.title || 'Untitled';

    console.log('[Sending to /generate-tags]', { title, caption });


    const tagRes = await fetch(`http://localhost:3000/api/generate-tags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, caption }),
    });

    const tagData = await tagRes.json();
    const tags = Array.isArray(tagData.tags) ? tagData.tags : [];

    const updated = await prisma.video.update({
      where: { publicId },
      data: {
        caption,
        tone,
        tags,
      },
    });

    return NextResponse.json({ success: true, video: updated });
  } catch (error) {
    console.error('❌ Save Caption Error:', error);
    return NextResponse.json({ error: 'Failed to save caption' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
