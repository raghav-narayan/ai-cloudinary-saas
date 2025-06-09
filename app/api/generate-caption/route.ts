import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();
    if (!imageUrl) {
      return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
    }

    // 1. Fetch and convert image to base64
    const imgRes = await fetch(imageUrl);
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
    const imgBuffer = await imgRes.arrayBuffer();
    const base64Image = Buffer.from(imgBuffer).toString('base64');

    // 2. Prepare Gemini request
    const prompt = `
    You are an assistant that writes short, **fun and catchy captions** for social media posts. 
    Describe the image vividly in 1 sentence. Your tone should be energetic, visual, and social-media friendly. 
    Use references if the character is recognizable (e.g. Goku, Luffy, Pikachu), otherwise describe the scene.
    Avoid generic phrases like "here is" or "an image of". Just write the caption directly.
    `;


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: contentType, data: base64Image } }
            ]
          }]
        })
      }
    );

    const data = await response.json();
    const caption = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'No caption generated';
    console.log('[Gemini Caption Response]', caption);
    return NextResponse.json({ caption });
  } catch (err) {
    console.error('❌ Caption generation error:', err);
    return NextResponse.json({ error: 'Caption generation failed' }, { status: 500 });
  }
}
