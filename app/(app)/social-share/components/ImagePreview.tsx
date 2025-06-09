'use client';
import React from 'react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';

export default function ImagePreview({
  uploadedImage,
  selectedFormat,
  isTransforming,
  setIsTransforming,
  formats,
}: {
  uploadedImage: string;
  selectedFormat: string;
  isTransforming: boolean;
  setIsTransforming: (val: boolean) => void;
  formats: Record<string, { width: number; height: number; aspectRatio: number }>;
}) {
  const { width, height } = formats[selectedFormat];

  // Cloudinary URL for downloading
  const transformedUrl = getCldImageUrl({
    src: uploadedImage,
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
    format: 'png',
  });

  const download = () => {
    fetch(transformedUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedFormat.replace(/\s|\(|\)/g, '_')}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="mt-10 w-full">
      <h2 className="text-xl font-semibold mb-4">🖼️ Live Format Preview</h2>

      <div className="w-full rounded-xl overflow-hidden border border-base-300 bg-base-200 shadow">
        <div className="mockup-browser-toolbar px-4 py-2 bg-base-300 text-sm font-mono">
          cloudinary.com/social-preview
        </div>

        <div className="flex justify-center p-6 bg-base-100">
          <div
            className="relative w-full max-w-[1100px]"
            style={{
              aspectRatio: `${width} / ${height}`,
              maxHeight: '75vh', // ✅ Prevents vertical overflow
            }}
          >
            {isTransforming && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-100 bg-opacity-70">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            )}

            <CldImage
              width={width}
              height={height}
              crop="fill"
              gravity="auto"
              src={uploadedImage}
              alt="Transformed preview"
              onLoad={() => setIsTransforming(false)}
              className="rounded-lg w-full h-full object-contain border"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="btn btn-primary shadow" onClick={download}>
          ⬇️ Download for {selectedFormat.split(' ')[0]}
        </button>
      </div>
    </div>
  );
}
