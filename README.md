# Cloudinary SaaS Application

## Overview

An **AI-driven SaaS platform** built with **Next.js**, **Cloudinary**, and **TypeScript** that empowers users to upload and transform media for social sharing. It supports **image resizing**, **video compression**, **key frame extraction**, and **AI-generated captions** using Hugging Face. With **secure authentication via Clerk** and a polished UI built with **TailwindCSS**, this project showcases modern full-stack and AI-first product development.

## ✨ Features

- 🎥 **Video compression** with automatic optimization  
- 🖼️ **Image resizing and formatting** for social platforms  
- 🧠 **AI-powered caption generation** using Hugging Face LLMs  
- 📸 **Key frame extraction** for video highlight thumbnails  
- ☁️ **Cloudinary integration** for efficient media management  
- 🔐 **Clerk authentication** for secure sign-up/login  
- 🎨 **Responsive UI** using TailwindCSS and DaisyUI  
- ⚙️ **Clean architecture** with TypeScript, Prisma, and ESLint

## 🛠️ Tech Stack

| Category       | Tools Used                                                                 |
|----------------|----------------------------------------------------------------------------|
| Frontend       | Next.js, React, TypeScript, TailwindCSS, DaisyUI                          |
| Media Services | Cloudinary (image & video transformation)                                 |
| AI/LLM         | Hugging Face Inference API for auto-captioning                            |
| Auth           | Clerk (OAuth-ready secure authentication)                                 |
| ORM/DB         | Prisma ORM with PostgreSQL                                                 |
| Dev Tools      | ESLint, Prettier, NPM, GitHub                                              |

## 📸 Screenshots

### Video Transformation  
![image](https://github.com/user-attachments/assets/531957c0-fc7a-4cc1-a40e-5dbb7bbe1f73)

### Image Transformation  
![image](https://github.com/user-attachments/assets/f12c0acd-25f1-43d1-9a59-aea89bb79a5f)  
![image](https://github.com/user-attachments/assets/e2bb65d9-dccb-45af-a4a3-784b79f4ccaf)

### Sign-In  
![image](https://github.com/user-attachments/assets/69c26460-17bf-4d02-b1e9-50ea730762a7)

### Upload Video  
![image](https://github.com/user-attachments/assets/b57fc63b-b1bf-4e3c-b019-b6ad6f4dca87)

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- **Node.js** (v14+)
- **npm** or **yarn**

### Installation

```bash
git clone https://github.com/<your-username>/cloudinary-saas.git
cd cloudinary-saas
npm install
```

### Environment Setup

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_CLOUDINARY_URL=<your-cloudinary-url>
CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-api-key>
DATABASE_URL=<your-prisma-database-url>
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧠 AI Features

- **Image Captioning**: Auto-caption generation via Hugging Face LLMs  
- **Video Key Frame Extraction**: Highlights key visuals from video uploads  
- **Content Optimization**: Smart resizing/compression based on format presets  

These features elevate the user experience and demonstrate real-world use of modern AI/LLM APIs.

## 🧾 Project Structure

```
.
├── components/         # UI components
├── lib/                # Utilities and helpers
├── pages/              # Next.js routes
├── prisma/             # Database schemas
├── public/             # Static assets
├── styles/             # Tailwind config
└── .env.local          # Environment variables
```

## 🤝 Contributing

Contributions are welcome! Fork the repo, make your changes, and submit a pull request.

- Report bugs via GitHub Issues  
- Suggest new AI or transformation features

## 📄 License

Licensed under the MIT License. See [LICENSE](LICENSE).
