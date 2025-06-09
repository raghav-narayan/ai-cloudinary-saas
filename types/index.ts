export interface Video {
  id: string;
  publicId: string;
  title: string;
  description?: string;
  originalSize: string;
  compressedSize: string;
  duration: number;
  caption?: string;
  tone?: string;
  tags: string[];         // ✅ Add this line
  createdAt: string;
  updatedAt: string;
}
