import type { FeedPost, Program, Milestone, Merchandise } from '@/types';

import postsData from 'virtual:content/posts';
import programsData from 'virtual:content/programs';
import milestonesData from 'virtual:content/milestones';
import merchandiseData from 'virtual:content/merchandise';

export function fetchPosts(): FeedPost[] {
  return postsData as FeedPost[];
}

export function fetchPrograms(): Program[] {
  return programsData as Program[];
}

export function fetchMilestones(): Milestone[] {
  return milestonesData as Milestone[];
}

export function fetchMerchandise(): Merchandise[] {
  return merchandiseData as Merchandise[];
}
