import { HeroSection } from '@/components/home/HeroSection';
import { ManifestoBanner } from '@/components/home/ManifestoBanner';
import { PillarsGrid } from '@/components/home/PillarsGrid';
import { ActivityFeed } from '@/components/home/ActivityFeed';
import { EngagementFloor } from '@/components/home/EngagementFloor';
import { fetchPosts } from '@/lib/content';

interface HomePageProps {
  onJoin: () => void;
  onDonate: () => void;
}

export function HomePage({ onJoin, onDonate }: HomePageProps) {
  const posts = fetchPosts();

  return (
    <>
      <HeroSection onJoin={onJoin} />
      <ManifestoBanner />
      <PillarsGrid onJoin={onJoin} />
      <ActivityFeed posts={posts} />
      <EngagementFloor onDonate={onDonate} />
    </>
  );
}
