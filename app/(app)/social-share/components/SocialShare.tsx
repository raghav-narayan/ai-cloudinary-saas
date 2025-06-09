'use client';
import React, { useState, useEffect } from 'react';
import Uploader from './Uploader';
import FormatSelector from './FormatSelector';
import ImagePreview from './ImagePreview';

const socialFormats = {
  'Instagram Square (1:1)': { width: 1080, height: 1080, aspectRatio: 1 },
  'Instagram Portrait (4:5)': { width: 1080, height: 1350, aspectRatio: 4 / 5 },
  'Twitter Post (16:9)': { width: 1200, height: 675, aspectRatio: 16 / 9 },
  'Twitter Header (3:1)': { width: 1500, height: 500, aspectRatio: 3 },
  'Facebook Cover (205:78)': { width: 820, height: 312, aspectRatio: 205 / 78 },
  'LinkedIn Post (1.91:1)': { width: 1200, height: 627, aspectRatio: 1.91 },
  'YouTube Thumbnail (16:9)': { width: 1280, height: 720, aspectRatio: 16 / 9 },
  'Pinterest Pin (2:3)': { width: 1000, height: 1500, aspectRatio: 2 / 3 },
} as const;

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>('Instagram Square (1:1)');
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Upload failed');

      setUploadedImage(data.publicId);
      setUploadedImageUrl(data.url);
      setCaption('');
      setHashtags('');
    } catch {
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const generateAIContent = async () => {
    if (!uploadedImageUrl) return;
    setLoadingAI(true);

    try {
      const captionRes = await fetch('/api/generate-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadedImageUrl }),
      });
      const { caption } = await captionRes.json();
      setCaption(caption);

      const hashtagRes = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption }),
      });
      const { hashtags } = await hashtagRes.json();
      setHashtags(hashtags);
    } catch (err) {
      alert('AI generation failed');
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

return (
  <div className="container mx-auto p-6 max-w-[1200px]">
    <h1 className="text-3xl font-bold mb-8 text-center">📱 Social Media Image Creator</h1>

    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-6">
        <Uploader onUpload={handleFileUpload} isUploading={isUploading} />

        {uploadedImage && (
          <>
            <FormatSelector
              selected={selectedFormat}
              onChange={(val) => setSelectedFormat(val as SocialFormat)}
              formats={Object.keys(socialFormats)}
            />

            {/* Full-width Image Preview */}
            <ImagePreview
              uploadedImage={uploadedImage}
              selectedFormat={selectedFormat}
              isTransforming={isTransforming}
              setIsTransforming={setIsTransforming}
              formats={socialFormats}
            />

            {/* Action + AI Output Section */}
            <div className="mt-8 space-y-6">

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  className="btn btn-primary transition-transform hover:-translate-y-1 duration-200"
                  onClick={generateAIContent}
                >
                  🤖 Generate Caption + Hashtags
                </button>

                <button
                  className="btn btn-outline btn-accent transition-transform hover:-translate-y-1 duration-200"
                  onClick={() => {
                    const anchor = document.createElement('a');
                    anchor.href = uploadedImageUrl || '';
                    anchor.download = 'social-image.png';
                    anchor.click();
                  }}
                >
                  ⬇️ Download for {selectedFormat.split(' ')[0]}
                </button>
              </div>

              {/* Loading */}
              {loadingAI && (
                <p className="text-sm text-center text-gray-500">Generating AI content...</p>
              )}

              {/* Caption + Hashtag Output */}
              {caption && (
                <div className="flex justify-center">
                  <div className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-md w-full max-w-2xl transition-shadow hover:shadow-lg">
                    <p className="text-base font-semibold mb-2">📝 AI Caption</p>
                    <p className="mb-4 text-sm text-base-content">{caption}</p>

                    <p className="text-base font-semibold mb-2">🏷️ Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.split(',').map((tag, idx) => (
                        <span
                          key={idx}
                          className="badge text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Copy Button */}
                    <button
                      className="btn btn-sm btn-outline mt-4"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${caption}\n\n${hashtags
                            .split(',')
                            .map((tag) => `#${tag.trim()}`)
                            .join(' ')}`
                        )
                      }
                    >
                      📋 Copy Caption + Hashtags
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);


}
