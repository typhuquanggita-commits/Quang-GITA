import type { Grade, Strand, Term, Topic } from '@/types';
import { G6_TOPICS } from './g6';
import { G7_TOPICS } from './g7/topics';
import { G8_TOPICS } from './g8/topics';
import { G9_TOPICS } from './g9/topics';

export const ALL_TOPICS: Topic[] = [...G6_TOPICS, ...G7_TOPICS, ...G8_TOPICS, ...G9_TOPICS];

export const topicsOfGrade = (g: Grade): Topic[] =>
  ALL_TOPICS.filter((t) => t.grade === g).sort((a, b) => a.order - b.order);

export const getTopic = (id: string): Topic | undefined => ALL_TOPICS.find((t) => t.id === id);

export const topicName = (id: string): string => getTopic(id)?.name ?? id;

export const STRAND_LABEL: Record<Strand, string> = {
  SO_DAI_SO: 'Số & Đại số',
  HINH_HOC: 'Hình học & Đo lường',
  THONG_KE_XS: 'Thống kê & Xác suất',
  THUC_TIEN: 'Toán thực tiễn',
};

export const TERM_LABEL: Record<Term, string> = { HK1: 'Học kỳ I', HK2: 'Học kỳ II' };

export const GRADES: Grade[] = [6, 7, 8, 9];

export * from './formulas';
export * from './hsg';
export * from './roadmap';
