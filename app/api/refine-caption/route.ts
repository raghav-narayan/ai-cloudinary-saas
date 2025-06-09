import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { caption, refinement = 'More Engaging' } = await req.json();

    if (!caption) {
      return NextResponse.json({ error: 'Missing caption to refine' }, { status: 400 });
    }

    const prompt = `
You are a social media caption expert.
Refine the following caption to be "${refinement}".
Only return the refined caption as a single compelling sentence. 
Do NOT include any hashtags, emojis, or commentary. Just the plain sentence.

Original:
"${caption}"

Refined Caption:
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    console.log('🧠 Gemini Refine Response:', JSON.stringify(data, null, 2));

    const refined = data?.candidates?.[0]?.content?.parts
      ?.map((p: any) => p.text)
      .join(' ')
      .trim() || '';

    return NextResponse.json({ refined });
  } catch (err) {
    console.error('❌ Refine Caption API error:', err);
    return NextResponse.json({ error: 'Failed to refine caption' }, { status: 500 });
  }
}
