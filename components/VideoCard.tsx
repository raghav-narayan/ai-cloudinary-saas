'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import { Download, Clock, FileDown, FileUp } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { filesize } from 'filesize';
import { Video } from '@/types';
import GenerateVideoCaption from './GenerateVideoCaption';

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
  onTagClick?: (tag: string) => void; //
  onDelete?: (publicId: string) => void
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload,onTagClick, onDelete  }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const [showThumbnailModal, setShowThumbnailModal] = useState(false);
  const [thumbnailTime, setThumbnailTime] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchThumbnail = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/video-thumbnail', {
        method: 'POST',
        body: JSON.stringify({ publicId: video.publicId, timestamp: thumbnailTime }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.thumbnailUrl) setThumbnailUrl(data.thumbnailUrl);
    } catch (err) {
      console.error('❌ Thumbnail fetch failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const getThumbnailUrl = useCallback(
    (publicId: string) =>
      getCldImageUrl({
        src: publicId,
        width: 400,
        height: 225,
        crop: 'fill',
        gravity: 'auto',
        format: 'jpg',
        quality: 'auto',
        assetType: 'video',
      }),
    []
  );

  const getFullVideoUrl = useCallback(
    (publicId: string) =>
      getCldVideoUrl({
        src: publicId,
        width: 1920,
        height: 1080,
      }),
    []
  );

  const getPreviewVideoUrl = useCallback(
    (publicId: string) =>
      getCldVideoUrl({
        src: publicId,
        width: 400,
        height: 225,
        rawTransformations: ['e_preview:duration_15:max_seg_9:min_seg_dur_1'],
      }),
    []
  );

  const formatSize = useCallback((size: number) => filesize(size), []);
  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  useEffect(() => setPreviewError(false), [isHovered]);
  useEffect(() => {
    const enableSound = () => {
      setCanPlaySound(true);
      window.removeEventListener('click', enableSound);
    };
    window.addEventListener('click', enableSound);
    return () => window.removeEventListener('click', enableSound);
  }, []);

  const [showDetails, setShowDetails] = useState(false); // Add this to your state block

return (
  <>
    <div
      className="rounded-2xl overflow-hidden border border-base-300 bg-gradient-to-br from-[#1c1c24] to-[#11111b] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative aspect-video">
        {isHovered && !previewError ? (
          <video
            src={getPreviewVideoUrl(video.publicId)}
            autoPlay
            loop
            muted={!canPlaySound}
            playsInline
            className="w-full h-full object-cover rounded-t-xl"
            onError={() => setPreviewError(true)}
          />
        ) : previewError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-red-500">
            Preview unavailable
          </div>
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className="w-full h-full object-cover rounded-t-xl"
          />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 text-xs rounded-md flex items-center">
          <Clock size={14} className="mr-1" />
          {formatDuration(video.duration)}
        </div>
      </div>

      <div className="p-4 space-y-3 pb-6">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{video.title}</h3>
        {video.description && (
          <p className="text-xs text-gray-400 line-clamp-2">{video.description}</p>
        )}
        <p className="text-xs text-gray-500">Uploaded {dayjs(video.createdAt).fromNow()}</p>

        <div className="flex items-center justify-between gap-4 text-sm pt-3 border-t border-base-300">
          <div className="flex flex-col gap-1 text-gray-300">
            <div className="flex gap-2 items-center">
              <FileUp size={16} className="text-base-content/80" />
              <span>Original: <span className="font-medium">{formatSize(Number(video.originalSize))}</span></span>
            </div>
            <div className="flex gap-2 items-center">
              <FileDown size={16} className="text-base-content/80" />
              <span>Compressed: <span className="font-medium">{formatSize(Number(video.compressedSize))}</span></span>
            </div>
          </div>

          <span
            className={`text-sm font-semibold ${
              compressionPercentage >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {compressionPercentage >= 0 ? '+' : ''}
            {compressionPercentage}% Compression
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            className="btn btn-outline btn-primary btn-sm"
            onClick={() => setShowThumbnailModal(true)}
          >
            🎞️ Pick Thumbnail
          </button>

          <button
            className="btn btn-primary btn-sm text-white"
            onClick={() => onDownload(getFullVideoUrl(video.publicId), video.title)}
          >
            <Download size={16} className="mr-1" />
            Download
          </button>

          <button
            className="btn btn-outline btn-error btn-sm"
            onClick={() => {
              if (confirm(`Are you sure you want to delete "${video.title}"?`)) {
                onDelete?.(video.publicId);
              }
            }}
          >
            🗑 Delete
          </button>

          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowDetails(prev => !prev)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {showDetails && (
          <>
            {(video.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {video.tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => onTagClick?.(tag)}
                    className="text-xs text-primary bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-base-300 mt-4">
              <GenerateVideoCaption
                videoTitle={video.title}
                durationSec={video.duration}
                thumbnailUrl={getThumbnailUrl(video.publicId)}
                existingCaption={video.caption}
                publicId={video.publicId}
                description={video.description}
              />
            </div>
          </>
        )}
      </div>
    </div>

    {/* Modal for Thumbnail Selection */}
    {showThumbnailModal && (
      <div
        className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center overflow-auto px-4 py-10"
        onClick={() => {
          setShowThumbnailModal(false);
          setThumbnailTime(0);
          setThumbnailUrl('');
          setIsGenerating(false);
        }}
      >
        <div
          className="bg-base-100 text-base-content p-6 rounded-xl w-full max-w-5xl shadow-lg grid md:grid-cols-2 gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h2 className="text-xl font-semibold mb-3">🎬 Scrub & Select</h2>
            <video
              src={getPreviewVideoUrl(video.publicId)}
              controls
              className="w-full rounded mb-3"
            />
            <input
              type="range"
              min={0}
              max={Math.floor(video.duration)}
              value={thumbnailTime}
              onChange={(e) => setThumbnailTime(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-sm text-center mb-4">Selected: {thumbnailTime}s</p>
            <button
              className="btn btn-primary w-full"
              onClick={fetchThumbnail}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Thumbnail'}
            </button>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-3">🖼️ Preview</h2>
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt="Generated thumbnail"
                  className="w-full max-h-[300px] object-contain rounded"
                />
              ) : (
                <div className="w-full h-[300px] rounded bg-base-200 flex items-center justify-center text-gray-500">
                  No thumbnail yet
                </div>
              )}
            </div>
            {thumbnailUrl && (
              <a
                href={thumbnailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-accent mt-4"
              >
                Download Thumbnail
              </a>
            )}
            <button
              className="btn btn-ghost w-full mt-4"
              onClick={() => {
                setShowThumbnailModal(false);
                setThumbnailUrl('');
                setIsGenerating(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);


};

export default VideoCard;
