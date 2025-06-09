'use client';
import { useState, useRef } from 'react';

export default function ThumbnailPicker({ videoUrl, publicId }: { videoUrl: string; publicId: string }) {
  const [timestamp, setTimestamp] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCapture = async () => {
    const res = await fetch('/api/video-thumbnail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId, timestamp }),
    });

    const data = await res.json();
    setThumbnailUrl(data.thumbnailUrl);
  };

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        onTimeUpdate={(e) => setTimestamp((e.target as HTMLVideoElement).currentTime)}
        className="w-full rounded-lg"
      />
      <button className="btn btn-primary" onClick={handleCapture}>
        📸 Capture Thumbnail
      </button>
      {thumbnailUrl && (
        <div>
          <p className="mt-4 font-medium">Thumbnail Preview:</p>
          <img src={thumbnailUrl} alt="Generated thumbnail" className="rounded border mt-2" />
        </div>
      )}
    </div>
  );
}
