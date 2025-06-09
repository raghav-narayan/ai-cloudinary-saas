'use client';
import React from 'react';

export default function Uploader({
  onUpload,
  isUploading,
}: {
  onUpload: (file: File) => void;
  isUploading: boolean;
}) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium text-base-content">Upload an image</span>
      </label>
      <input
        type="file"
        className="file-input file-input-accent w-full"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
        accept="image/*"
      />
      {isUploading && (
        <progress className="progress progress-accent mt-3 w-full h-2" />
      )}
    </div>
  );
}
