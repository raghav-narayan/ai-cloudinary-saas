'use client';
import React, { useState } from 'react';

export default function CaptionBox({ uploadedImageUrl }: { uploadedImageUrl: string }) {
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    console.log("🧠 Sending imageUrl:", uploadedImageUrl);

    try {
      const res = await fetch('/api/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: uploadedImageUrl
        }),
      });
      const data = await res.json();
      setCaption(data.caption || 'No caption generated.');
    } catch {
      setCaption('Failed to generate caption.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button onClick={handleGenerate} className="btn btn-outline btn-accent">
        🧠 Generate AI Caption
      </button>
      {loading && <p className="mt-2 text-sm text-gray-400">Generating...</p>}
      {caption && !loading && (
        <div className="mt-4 bg-base-200 p-4 rounded-lg shadow">
          <p className="text-primary font-medium mb-1">AI Caption:</p>
          <p className="italic">{caption}</p>
          <button
            className="btn btn-xs btn-outline btn-info mt-2"
            onClick={() => navigator.clipboard.writeText(caption)}
          >
            📋 Copy Caption
          </button>
        </div>
      )}
    </div>
  );
}
