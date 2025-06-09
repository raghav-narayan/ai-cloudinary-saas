import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    console.log("HF TOKEN:", process.env.HUGGINGFACE_API_TOKEN ? "✅ PRESENT" : "❌ MISSING");


    if (!imageUrl) {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
    }

    // Fetch the image and convert to base64
    const imageRes = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const imageBase64 = Buffer.from(imageRes.data, "binary").toString("base64");

    // Send to Hugging Face Inference API (GIT Model)

    // console.log("HF TOKEN:", process.env.HUGGINGFACE_API_TOKEN ? "✅ PRESENT" : "❌ MISSING");

    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/git-base",
      {
        inputs: {
          image: imageBase64,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const caption = hfResponse.data?.[0]?.generated_text ?? "No caption generated";
    return NextResponse.json({ caption });
  } catch (error: any) {
    const message =
      error?.response?.data?.error ||
      error?.response?.data ||
      error?.message ||
      "Unknown error occurred";
    console.error("Image captioning error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
