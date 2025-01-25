'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const MAX_FILE_SIZE = 70 * 1024 * 1024; // Max file size = 70 MB

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('File size too large');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('originalSize', file.size.toString());

    try {
      const response = await axios.post('/api/video-upload', formData);
      // Handle the 200 response or show success feedback
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form action="" className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="description"
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="label">
            <span className="label-text">Video File</span>
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
        <div>
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VideoUpload;
