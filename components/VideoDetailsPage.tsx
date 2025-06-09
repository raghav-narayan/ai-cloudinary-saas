'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import { Clock, ArrowLeft } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import GenerateVideoCaption from '@/components/GenerateVideoCaption';
import { Video } from '@/types';

dayjs.extend(relativeTime);

function formatDuration(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${min}m ${sec}s`;
}


interface VideoDetailsPageProps {
  publicId: string;
}

export default function VideoDetailsPage({ publicId }: VideoDetailsPageProps) {
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const res = await fetch(`/api/videos/${publicId}`);
        const data = await res.json();
        setVideo(data);
      } catch (err) {
        console.error('Failed to fetch video details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (publicId) fetchVideo();
  }, [publicId]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!video) return <div className="p-8 text-red-500">Video not found</div>;

  const fullVideoUrl = getCldVideoUrl({ src: video.publicId });
  const thumbnailUrl = getCldImageUrl({
    src: video.publicId,
    width: 400,
    height: 225,
    crop: 'fill',
    gravity: 'auto',
    format: 'jpg',
    quality: 'auto',
    assetType: 'video',
  });

  return (
    <div className="w-full min-h-screen px-6 py-10 space-y-6">
      <button
        className="text-sm text-primary font-medium inline-flex items-center hover:underline"
        onClick={() => router.push('/home')}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Library
      </button>

      <h1 className="text-3xl font-bold text-white">{video.title}</h1>
      <p className="text-sm text-gray-400">Uploaded {dayjs(video.createdAt).fromNow()}</p>

      <div className="flex flex-col xl:flex-row gap-8 xl:items-start">
        {/* Video Player */}
        <div className="w-full xl:w-1/2">
          <video src={fullVideoUrl} controls className="w-full rounded-xl shadow-md" />
          <div className="mt-3 space-y-2">
            <p className="text-sm text-base-content flex items-center gap-2">
              <Clock size={16} />
              Duration: {Math.floor(video.duration / 60)}m {Math.round(video.duration % 60)}s
            </p>
            {video.description && (
              <p className="text-sm text-gray-400">{video.description}</p>
            )}
            {video.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-outline text-xs font-medium text-primary border-primary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Caption Generator */}
        <div className="w-full xl:w-1/2">
          <div className="bg-base-200 border border-base-300 rounded-xl p-5 shadow space-y-4 h-full">
            <GenerateVideoCaption
              videoTitle={video.title}
              durationSec={video.duration}
              thumbnailUrl={thumbnailUrl}
              publicId={video.publicId}
              existingCaption={video.caption}
              description={video.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
