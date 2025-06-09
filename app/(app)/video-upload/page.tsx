'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UploadIcon } from 'lucide-react';

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('File too large. Max size is 70MB.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('originalSize', file.size.toString());

    try {
      await axios.post('/api/video-upload', formData);
      router.push('/home');
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
     <div className="mb-8">
  <h1 className="text-4xl font-bold text-white">Upload New Video</h1>
  <p className="mt-2 text-sm text-gray-400 max-w-2xl">
    Provide a <span className="text-primary font-medium">title</span> and optional <span className="text-primary font-medium">description</span>. 
    Your video will be <span className="text-primary font-medium">uploaded</span>, <span className="text-primary font-medium">compressed</span>, 
    and listed in your <span className="text-primary font-medium">video library</span> with smart AI enhancements.
  </p>
</div>


      <div className="card bg-base-100 shadow-xl p-8 rounded-xl border border-base-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="label">
              <span className="label-text">Video Title</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g. Goku vs Frieza - Final Form"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              className="textarea textarea-bordered w-full min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional summary or context..."
            />
          </div>

          {/* File Input */}
          <div>
            <label htmlFor="file" className="label">
              <span className="label-text">Video File <span className="text-gray-500">(Max: 70MB)</span></span>
            </label>
            <input
              id="file"
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2"
              disabled={isUploading}
            >
              <UploadIcon size={16} />
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
