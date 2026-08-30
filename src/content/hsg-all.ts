import type { Grade } from '@/types';
import { HSG_TOPICS_BASE, type HsgTopic } from './hsg';
import { HSG_TOPICS_PLUS } from './hsg-plus';
import { HSG_TOPICS_GITA } from './hsg-gita';
import { HSG_TOPICS_GITA2 } from './hsg-gita2';

export type { HsgTopic };

/** Toàn bộ chuyên đề bồi dưỡng học sinh giỏi, xếp theo khối. */
export const HSG_TOPICS: HsgTopic[] = [...HSG_TOPICS_BASE, ...HSG_TOPICS_PLUS, ...HSG_TOPICS_GITA, ...HSG_TOPICS_GITA2]
  .sort((a, b) => a.grade - b.grade || a.id.localeCompare(b.id));

export const hsgOfGrade = (g: Grade): HsgTopic[] => HSG_TOPICS.filter((t) => t.grade === g);
