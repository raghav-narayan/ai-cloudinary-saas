import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, caption } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    const prompt = `
You are an assistant that helps categorize short-form video content.
Extract 5–8 relevant tags (not hashtags) based on this title and caption.
Avoid emojis or punctuation. Just lowercase tags, comma-separated.

Title: ${title}
Caption: ${caption || 'N/A'}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const tags = raw
  .split(',')
  .map((tag: string) => tag.trim().toLowerCase())
  .filter(Boolean)
  .slice(0, 5);


    console.log('[Gemini Tag Response]', tags);
    return NextResponse.json({ tags });
  } catch (err) {
    console.error('❌ Gemini Tag Generation Error:', err);
    return NextResponse.json({ error: 'Tag generation failed' }, { status: 500 });
  }
}
