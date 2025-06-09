import VideoDetailsPage from '@/components/VideoDetailsPage';

interface Props {
  params: { publicId: string[] };
}

export default async function Page({ params }: Props) {
  const fullPublicId = params.publicId.join('/'); // ✅ Safe in async component
  return <VideoDetailsPage publicId={fullPublicId} />;
}
