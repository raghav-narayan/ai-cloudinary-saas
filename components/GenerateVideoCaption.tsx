'use client';
import { useEffect, useState } from 'react';

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
      console.error('❌ Generate error:', err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(hashtags.map(tag => `#${tag}`).join(' '));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
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

  return (
    <div className="mt-4 bg-base-200 border border-base-300 rounded-xl p-4 shadow-md transition-all duration-300">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <select
          className="select select-sm w-auto bg-base-100 border border-base-300 text-base-content"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="fun">Friendly</option>
          <option value="formal">Formal</option>
          <option value="chill">Relaxed</option>
          <option value="descriptive">Detailed</option>
        </select>

        <button
          className="btn btn-sm btn-primary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Caption'}
        </button>

        {caption && (
          <span className="text-green-500 text-xs ml-auto font-medium">
            Caption ready
          </span>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Caption Display */}
      {caption && (
        <div className="mt-3">
          {editing ? (
            <textarea
              className="w-full p-2 rounded-md bg-base-100 text-base-content border border-base-300 resize-none text-sm"
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          ) : (
            <div className="bg-base-100 p-3 rounded-md border border-base-300 text-sm text-base-content whitespace-pre-wrap max-h-[160px] overflow-auto leading-relaxed">
              {caption}
            </div>
          )}

          {/* Hashtag Display */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 text-sm">
              {hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="badge badge-outline bg-base-100 border-base-300 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-4">
            {!editing ? (
              <button className="btn btn-xs btn-accent" onClick={() => setEditing(true)}>
                Edit
              </button>
            ) : (
              <button className="btn btn-xs btn-accent" onClick={handleSave}>
                Save
              </button>
            )}

            <button
              className="btn btn-xs btn-outline btn-secondary"
              onClick={handleCopy}
            >
              {copied ? 'Copied' : 'Copy Caption'}
            </button>

            {hashtags.length > 0 && (
              <button
                className="btn btn-xs btn-outline btn-secondary"
                onClick={handleCopyTags}
              >
                {copiedTags ? 'Tags Copied' : 'Copy Hashtags'}
              </button>
            )}

            {saved && <span className="text-green-400 text-xs font-medium">Saved</span>}
          </div>
        </div>
      )}
    </div>
  );
}
