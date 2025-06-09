'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import VideoCard from '@/components/VideoCard';
import { Video } from '@/types';

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'withCaption' | 'noCaption'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get('/api/videos');
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.mp4`);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleDelete = async (publicId: string) => {
  try {
    await axios.delete(`/api/videos?publicId=${publicId}`);
    setVideos(prev => prev.filter(v => v.publicId !== publicId));
  } catch (err) {
    console.error('❌ Delete failed:', err);
    alert('Failed to delete video.');
  }
};


  const uniqueTags = [...new Set(videos.flatMap((v) => v.tags || []))];

  const filteredVideos = videos.filter((video) => {
    const captionMatch =
      filter === 'withCaption'
        ? !!video.caption
        : filter === 'noCaption'
        ? !video.caption
        : true;

    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => video.tags?.includes(tag));

    return captionMatch && tagMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* 🧠 Page Title + Description */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Your Video Library
            </h1>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              For each uploaded video, you can{' '}
              <span className="text-primary font-medium">generate an AI caption</span>,{' '}
              <span className="text-primary font-medium">pick a custom thumbnail</span>, and{' '}
              <span className="text-primary font-medium">download the compressed version</span>.
            </p>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="select select-sm bg-base-200 border border-base-300 text-white focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-60"
          >
            <option value="all">Show All Videos</option>
            <option value="withCaption">With Captions</option>
            <option value="noCaption">Without Captions</option>
          </select>
        </div>
      </div>

      {/* 🏷️ Tag Filter UI */}
      {uniqueTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="ml-2 px-3 py-1 text-sm border rounded-md text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-900"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* 🗂 Video Grid or Empty State */}
      {filteredVideos.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos to display for this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} onDownload={handleDownload} onTagClick={toggleTag}
              onDelete={handleDelete}

            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
