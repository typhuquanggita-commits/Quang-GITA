import type { Grade } from '@/types';
import { HSG_TOPICS_BASE, type HsgTopic } from './hsg';
import { HSG_TOPICS_PLUS } from './hsg-plus';

export type { HsgTopic };

/** Toàn bộ chuyên đề bồi dưỡng học sinh giỏi, xếp theo khối. */
export const HSG_TOPICS: HsgTopic[] = [...HSG_TOPICS_BASE, ...HSG_TOPICS_PLUS]
  .sort((a, b) => a.grade - b.grade || a.id.localeCompare(b.id));

export const hsgOfGrade = (g: Grade): HsgTopic[] => HSG_TOPICS.filter((t) => t.grade === g);
