'use client';
import Link from 'next/link';
import { Sparkles, Camera, Download, Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0e0e0e] text-white flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Welcome to <span className="text-purple-500">AuraCast</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Create, compress, and share media with intelligent AI-powered tools.
        </p>
        <div className="flex gap-4 mt-6">
          <Link href="/sign-in">
            <button className="btn btn-primary px-6 py-3 rounded-lg font-medium">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="btn bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-medium">
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-base-100 py-16 px-10">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Core Features</h2>
          <p className="text-gray-400 mt-2">All-in-one platform for creators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-base-200 rounded-xl p-6 shadow hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-purple-400">
              <Camera className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Social Media Formatter</h3>
            </div>
            <p className="text-sm text-gray-400">
              Instantly resize images to fit Instagram, Twitter, YouTube, and more.
            </p>
          </div>

          <div className="bg-base-200 rounded-xl p-6 shadow hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-400">
              <Download className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Video Compression</h3>
            </div>
            <p className="text-sm text-gray-400">
              Upload videos and get fast, AI-optimized compressed versions.
            </p>
          </div>

          <div className="bg-base-200 rounded-xl p-6 shadow hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-pink-400">
              <Bot className="w-6 h-6" />
              <h3 className="text-lg font-semibold">AI Captions & Hashtags</h3>
            </div>
            <p className="text-sm text-gray-400">
              Generate engaging captions and hashtags using AI in one click.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} AuraCast. All rights reserved.
      </footer>
    </div>
  );
}
