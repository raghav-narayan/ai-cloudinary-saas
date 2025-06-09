import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, durationSec, thumbnailUrl, tone = 'fun', description = '' } = await req.json();

    if (!title || !durationSec) {
      return NextResponse.json({ error: 'Missing title or duration' }, { status: 400 });
    }

    const durationText =
      durationSec >= 60
        ? `${Math.floor(durationSec / 60)} min ${durationSec % 60} sec`
        : `${durationSec} sec`;

    const toneDescriptions: Record<string, string> = {
      fun: 'Use a bold, energetic, and emoji-rich tone that would go viral on TikTok or Instagram Reels.',
      formal: 'Use a polished, professional tone suitable for business or formal brand use.',
      chill: 'Use a smooth, casual, conversational tone — like talking to a friend.',
      descriptive: 'Describe what’s visually happening in the video — motion, expressions, transformation — in a vivid narrative tone.',
    };

    const prompt = `
You're a captioning assistant for viral short-form videos.

Video Title: "${title}"
Duration: ${durationText}
Description: "${description || 'N/A'}"

Goal:
1. Write a short, catchy caption that fits the tone below.
2. Then, on a new line, write 3–5 relevant hashtags that reflect the **content**, **characters**, **themes**, or **action** in the video.

Tone: ${toneDescriptions[tone] || toneDescriptions['fun']}

❗ Do NOT use generic hashtags like #shorts, #video, #trending, or #fun.
✅ Focus on specific elements: e.g., #Goku, #SuperSaiyan, #EpicBattle, #AnimeEdit

Format strictly like this:

<caption text>
#tag1, #tag2, #tag3, ...
    `.trim();

    let imagePart = null;
    if (thumbnailUrl) {
      const imgRes = await fetch(thumbnailUrl);
      const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
      const buffer = await imgRes.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');

      imagePart = {
        inline_data: {
          mime_type: contentType,
          data: base64Image,
        },
      };
    }

    const body = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            ...(imagePart ? [imagePart] : []),
          ],
        },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    const [captionLine = '', tagsLine = ''] = raw.split('\n');

    const fallbackCaption = `Watch "${title}" — a quick ${durationText} video you’ll love!`;
    const fallbackTags = ['anime', 'goku', 'fight', 'power', 'action'];

    const cleanedCaption = captionLine.trim().length >= 10 ? captionLine.trim() : fallbackCaption;

    // Extract and clean hashtags
    const allTags = tagsLine
      .match(/#?\w+/g)
      ?.map((tag: string) => tag.replace(/[#,\s]/g, ''))
      .filter(Boolean) || [];

    const bannedTags = ['video', 'shorts', 'viral', 'trending', 'fun', 'cool'];
    const filteredTags = allTags.filter((tag: string) => !bannedTags.includes(tag.toLowerCase()));


    return NextResponse.json({
      caption: cleanedCaption,
      hashtags: filteredTags.length > 0 ? filteredTags : fallbackTags,
    });
  } catch (err) {
    console.error('❌ Video caption error:', err);
    return NextResponse.json({ error: 'Video caption generation failed' }, { status: 500 });
  }
}
