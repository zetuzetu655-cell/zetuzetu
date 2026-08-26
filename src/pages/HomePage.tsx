import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ManifestoBanner } from '@/components/home/ManifestoBanner';
import { PillarsGrid } from '@/components/home/PillarsGrid';
import { ActivityFeed } from '@/components/home/ActivityFeed';
import { EngagementFloor } from '@/components/home/EngagementFloor';
import type { FeedPost } from '@/types';

interface HomePageProps {
  onJoin: () => void;
  onDonate: () => void;
}

export function HomePage({ onJoin, onDonate }: HomePageProps) {
  const [posts, setPosts] = useState<FeedPost[]>([]);

  useEffect(() => {
    fetch('/data/posts.json')
      .then((res) => res.json())
      .then((data: FeedPost[]) => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

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
