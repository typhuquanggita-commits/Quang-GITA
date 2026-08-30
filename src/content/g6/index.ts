import type { Topic } from '@/types';
import { G6_TOPICS_A } from './topics-a';
import { G6_TOPICS_B } from './topics-b';

export const G6_TOPICS: Topic[] = [...G6_TOPICS_A, ...G6_TOPICS_B].sort((a, b) => a.order - b.order);
