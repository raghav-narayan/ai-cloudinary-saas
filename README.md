
# AuraCast 🎬✨  
**AI-Powered Media Toolkit for Content Creators & Animators**

> _“Whether it’s Goku’s first transformation or your latest animation clip—capture it, caption it, and share it.”_

AuraCast is a full-stack AI-powered media platform that helps creators extract iconic video frames, generate viral-ready captions, and compress media intelligently. Built with cutting-edge tools like Cloudinary and Gemini LLMs, AuraCast combines visual fidelity with AI automation to streamline content generation.

---

## 🔍 Core Features

### 🧠 AI Caption + Hashtag Generator
- Uses Gemini 1.5 Flash to generate engaging captions & hashtags
- Context-aware: inputs include title, description, duration & even thumbnail
- Supports tone variations: Fun, Formal, SEO-Optimized, More Engaging, etc.

### 🎞️ Keyframe Thumbnail Picker
- Powered by Cloudinary’s video transformation API  
- Allows creators to scrub, seek, and **extract precise thumbnails** using an interactive slider  
- Auto-generates high-resolution, shareable thumbnails

### 📦 AI-Optimized Video Compression
- **Lossless compression** with real-time before/after stats  
- Compression percentages shown clearly for each video  
- Instantly downloadable compressed versions

### 🖼️ Social Media Formatter for Images
- Format media for Twitter, LinkedIn, Instagram using Cloudinary transformations  
- Auto-generate post text and hashtags using LLMs  
- Download share-ready visuals for multiple platforms

### 🗃️ Personalized Video Library
- Upload videos and manage a smart library with filters, hover previews, and metadata  
- Each video includes captioning, keyframe control, and media stats (original vs. compressed size)

---

## ⚙️ Tech Stack

| Layer            | Tools / Libraries |
|------------------|-------------------|
| **Frontend**     | Next.js (App Router), React, TailwindCSS, DaisyUI |
| **Backend API**  | Next.js Server Functions (`app/api/`), TypeScript |
| **AI/LLM**       | **Gemini 1.5 Flash** via Google AI API for captions, tags, refinement |
| **Cloud Media**  | **Cloudinary** for video hosting, thumbnail generation, compression |
| **UI Enhancements** | Lucide Icons, Custom Modals, Responsive Layout |
| **State Mgmt**   | useState, useEffect, useRef — optimized per component |
| **Deployment**   | Vercel (or local dev with `npm run dev`) |

---

## 🔥 AI + Cloudinary Integration Highlights

| Feature              | Cloudinary       | Gemini (LLM)    |
|----------------------|------------------|------------------|
| Keyframe Extraction  | ✅ Precise timestamp thumbnails via `start_offset` |
| Caption Generation   | Contextual prompts: title, metadata, thumbnail |
| Hashtag Suggestions  | Hashtags tuned per tone & platform |
| Compression          | ✅ Real-time video compression & size stats |
| Image Formatting     | Auto-resize + preview for Twitter, LinkedIn, IG |

---

## 🚀 Demo

- 📹 [Video Demo – Keyframe & Captioning](https://your-link.com/sample1.mp4)  
- 🖼️ [Video Demo – Social Media Image Tool](https://your-link.com/sample2.mp4)

---

## 🧪 Screenshots

| Video Library | Captioning | Thumbnail Picker |
|---------------|------------|------------------|
| ![Library](./screenshots/library.png) | ![Captioner](./screenshots/captioner.png) | ![Thumbnail](./screenshots/thumbnail-modal.png) |

> _Replace the placeholders above with your actual screenshots_

---

## 💼 Why It Matters (for Recruiters)

- **End-to-end AI integration** using real LLM APIs (Gemini 1.5 Flash)  
- **Cloud-native media operations** — no fake mocks; real Cloudinary usage  
- **Strong UI/UX thinking**: clean design, clear controls, hover states, previews  
- **Built for creators, usable by marketers**: emphasizes AI that serves storytelling  
- Designed and implemented 100% independently as a **solo full-stack engineer**

---

## 🧑‍💻 Run It Locally

```bash
git clone https://github.com/your-username/auracast.git
cd auracast
npm install
npm run dev
```

### 🌐 Environment Variables

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_google_ai_key
```

---

## 📫 Contact

Built with care by [**Raghav Narayan**](https://linkedin.com/in/raghav-narayan)  
🔗 [Portfolio](https://your-portfolio-link.com) | ✉️ raghav.narayan.98@gmail.com
