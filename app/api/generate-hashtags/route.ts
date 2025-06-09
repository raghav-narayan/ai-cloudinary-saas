import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { caption } = await req.json();
    const prompt = `
    Generate 5 to 7 **fun and relevant hashtags** for this caption: "${caption}"
    Make sure they match the theme (anime, energy, mood, etc.). Return only hashtags, comma-separated.
    `;


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }]
        })
      }
    );

    const data = await response.json();
    const hashtags = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    console.log('[Gemini Hashtag Response]', hashtags);
    return NextResponse.json({ hashtags });
  } catch (err) {
    console.error('❌ Gemini Hashtag Error:', err);
    return NextResponse.json({ error: 'Hashtag generation failed' }, { status: 500 });
  }
}
