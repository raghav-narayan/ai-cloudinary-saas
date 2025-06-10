# AuraCast 🎥📸

**Intelligent media management platform** enabling creators to upload videos, extract key frames, compress media, generate captions, hashtags, and ready-to-share thumbnails — all powered by Cloudinary and LLMs.

---

## 🚀 Features

- **Video Upload & Compression**  
  Upload videos, get them optimized and compressed via Cloudinary.
- **Key‑Frame Extraction**  
  Automatically extract visually compelling frames with Cloudinary AI.
- **Thumbnail Selection Tool**  
  Interactive slider + preview modal to pick the perfect thumbnail.
- **AI‑Powered Caption & Hashtag Generation**  
  Generate or refine captions and hashtags using video metadata and context.
- **Image Formatter**  
  Resize images for various social platforms (Twitter, LinkedIn, etc.).

---

## 🎬 Screenshots & Demo
### Landing Page  
![image](https://github.com/user-attachments/assets/2455ba11-30f9-4990-a2f1-4269bde81b11)

### Upload Flow  
![image](https://github.com/user-attachments/assets/1c7b2319-6584-44d0-a051-82bf079239d5)

### Video Library - AI Compression and Key Frame Extraction  
![image](https://github.com/user-attachments/assets/580d470c-36f6-494a-88aa-f5894e188ec8)

### Thumbnail Picker  
![image](https://github.com/user-attachments/assets/9bc030a8-d45e-45ea-9b44-4aa12ffe3d11)

### Caption & Hashtags Generator with Tone-based Refinement  
![image](https://github.com/user-attachments/assets/d563bf44-41e2-4065-8bad-87412ee3f024)

### Image Formatter  
![image](https://github.com/user-attachments/assets/9d5289dd-85bb-4010-a0cd-cf120a62b7e9)

### Caption & Hashtags Generator for Images
![image](https://github.com/user-attachments/assets/3ff279bd-96eb-404c-bd07-553aea1ba3c5)

### Demo
https://youtu.be/l5T-Rx35ggQ

---

## ⚙️ Tech Stack

| Layer               | Technologies                                                         |
|--------------------|----------------------------------------------------------------------|
| **Frontend**        | Next.js 13 (App Router), React, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend / API**   | Next.js API Routes, Cloudinary (Video/Thumbnail APIs), OpenAI API (LLM) |
| **Cloud & Storage** | Cloudinary for video/image transforms & key-frame extraction       |
| **Media Utils**     | `filesize` (JS lib for readable file sizes)                         |

---

## 🧠 AI & Cloudinary Workflow

1. **Video Upload** — Send file to backend; store via Cloudinary.
2. **Compression** — Cloudinary auto-optimizes the video.
3. **Key‑Frame Extraction** — User-driven slice/slider triggers Cloudinary `start_offset` frame.
4. **AI Captioning** — LLM uses video metadata (title, thumbnails) to generate SEO-optimized captions & hashtags.
5. **Downloadable Outputs** — compressed video, thumbnail, captions, and image formats ready for sharing.

---

## 📂 Setup & Local Development

1. Clone & install:
   ```bash
   git clone https://github.com/your-username/ai-cloudinary-saas.git
   cd ai-cloudinary-saas
   npm install
   ```
2. Add `.env.local` with:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   OPENAI_API_KEY=...
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Navigate to: `http://localhost:3000`

---

## 📍 Usage

- **Upload** a short video clip (~<70 MB).
- **Browse** your library with auto-compressed previews.
- **Pick** a timestamp using the modal slider → extract a frame.
- **Generate** caption + hashtags — copy & paste anywhere.

---

## 🎯 Use Cases

- Content creators & animators capturing viral moment thumbnails
- Social media marketers preparing post-ready assets
- Developers exploring Cloudinary integrations and LLM workflows

---

## 🤝 Get Involved

Contributions and feedback are welcome!  
Connect with me: **raghav.narayan.98@gmail.com**

---

## 🔖 License

This repo is shared under the **MIT License**.
