'use client';

import { useState, useEffect } from 'react';

interface Props {
  videoTitle: string;
  durationSec: number;
  thumbnailUrl: string;
  publicId: string;
  existingCaption?: string;
  description?: string;
}

export default function GenerateVideoCaption({
  videoTitle,
  durationSec,
  thumbnailUrl,
  publicId,
  existingCaption,
  description = '',
}: Props) {
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tone, setTone] = useState('fun');
  const [refining, setRefining] = useState(false);
  const [refinement, setRefinement] = useState('More Engaging');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingCaption) setCaption(existingCaption);
  }, [existingCaption]);

  const handleGenerate = async () => {
    setLoading(true);
    setCopied(false);
    setCopiedTags(false);
    setSaved(false);
    setError('');
    try {
      const res = await fetch('/api/video-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: videoTitle, durationSec, thumbnailUrl, tone, description }),
      });

      const data = await res.json();
      if (res.ok && data.caption) {
        setCaption(data.caption);
        setHashtags(data.hashtags || []);
        setEditing(false);
      } else {
        setError(data.error || 'Caption generation failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    setRefining(true);
    setError('');
    try {
      const res = await fetch('/api/refine-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, refinement }),
      });

      const data = await res.json();
      if (res.ok && data.refined?.trim()) {
        setCaption(data.refined.trim());
        setEditing(false);
      } else {
        setError('No meaningful refinement returned.');
      }
    } catch (err) {
      setError('Something went wrong during refinement.');
    } finally {
      setRefining(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/save-video-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, caption, tone, tags: hashtags }),
      });
      if (res.ok) {
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error('❌ Save error:', err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(hashtags.map((tag) => `#${tag}`).join(' '));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  return (
    <div className="space-y-6 text-base-content">
      {/* Generate Caption Section */}
      <section>
        <p className="text-sm font-bold mb-1">🎬 Generate Caption + Hashtags</p>
        <p className="text-xs text-muted-content mb-2">
          Uses video title, tone, and thumbnail to generate a fresh caption and tags.
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          <select
            className="select select-sm bg-base-100 border-base-300"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="fun">Fun</option>
            <option value="formal">Formal</option>
            <option value="chill">Relaxed</option>
            <option value="descriptive">Descriptive</option>
          </select>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Caption + Hashtags'}
          </button>
        </div>
      </section>

      {/* Refine Caption Section */}
      <section>
        <p className="text-sm font-bold mb-1">🛠 Refine Caption</p>
        <p className="text-xs text-muted-content mb-2">
          Improve the current caption for SEO, clarity, or tone. Hashtags will not be changed.
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          <select
            className="select select-xs bg-base-100 border-base-300"
            value={refinement}
            onChange={(e) => setRefinement(e.target.value)}
          >
            <option value="More Engaging">More Engaging</option>
            <option value="Shorter">Shorter</option>
            <option value="More Descriptive">More Descriptive</option>
            <option value="SEO Optimized">SEO Optimized</option>
          </select>
          <button
            className="btn btn-xs btn-secondary"
            onClick={handleRefine}
            disabled={refining}
          >
            {refining ? 'Refining...' : '✨ Refine Caption'}
          </button>
        </div>
      </section>

      {/* Output Section */}
      {caption && (
        <section className="space-y-2">
          <p className="text-sm font-bold mb-1">📄 Caption</p>
          <div className="bg-base-100 border border-base-300 p-4 rounded-md text-sm whitespace-pre-wrap leading-relaxed transition-all min-h-[64px]">
            {editing ? (
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="textarea textarea-sm w-full bg-base-100 text-base-content"
                rows={4}
              />
            ) : (
              caption
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {editing ? (
              <button className="btn btn-xs btn-success" onClick={handleSave}>
                {saved ? '✔ Saved' : 'Save'}
              </button>
            ) : (
              <button className="btn btn-xs btn-accent" onClick={() => setEditing(true)}>
                Edit
              </button>
            )}
            <button className="btn btn-xs btn-outline btn-primary" onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy Caption'}
            </button>
          </div>
        </section>
      )}

      {hashtags.length > 0 && (
        <section className="space-y-1">
          <p className="text-sm font-bold">🏷️ Hashtags</p>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="badge bg-base-200 border-base-300 text-xs px-2 py-1 font-medium rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="btn btn-xs btn-outline btn-primary" onClick={handleCopyTags}>
              {copiedTags ? 'Tags Copied' : 'Copy Hashtags'}
            </button>
          </div>
        </section>
      )}

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
