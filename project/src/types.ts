export interface SiteSettings {
  siteName: string;
  tagline: string;
  location: string;
  logoUrl: string;
  heroImageUrl: string;
  social: {
    instagram: string;
    tiktok: string;
    youtube: string;
    whatsapp: string;
    facebook: string;
    twitter: string;
  };
  pesapalMerchantUrl: string;
  contactEmail: string;
  contactPhone: string;
}

export interface FeedPost {
  id: string;
  author: string;
  avatar: string;
  location: string;
  timestamp: string;
  text: string;
  image: string;
  likes: number;
  comments: number;
}

export interface Program {
  id: string;
  track: string;
  title: string;
  summary: string;
  schedule: string;
  targetAudience: string;
  image: string;
  actionLabel: string;
  actionType: string;
}

export interface Milestone {
  id: string;
  headline: string;
  tag: string;
  summary: string;
  image: string;
}

export interface MediaItem {
  id: string;
  type: 'video' | 'photo';
  title: string;
  description: string;
  thumbnail: string;
  duration: string | null;
  platform: string;
}

export interface Merchandise {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export type PageKey =
  | 'home'
  | 'programs'
  | 'impact'
  | 'media'
  | 'store'
  | 'volunteer'
  | 'contacts';
