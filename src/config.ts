import type { ScienceSubject, SectionId } from './types';

export const APP_NAME = 'HSA365';
export const APP_TAGLINE = 'Lộ trình cá nhân hóa cho kỳ thi Đánh giá năng lực HSA';

/** Thang diem chinh thuc cua bai thi HSA: 150 diem, moi phan 50 diem. */
export const MAX_TOTAL_SCORE = 150;
export const MAX_SECTION_SCORE = 50;

/**
 * Diem muc tieu mac dinh. HSA cham tren thang 150 nen "1400" khong ton tai;
 * muc tieu tinh hoa tuong duong la 140/150 (nhom dan dau pho diem).
 * Nguoi dung doi duoc trong Cai dat.
 */
export const DEFAULT_TARGET_SCORE = 140;

export interface SectionSpec {
  id: SectionId;
  name: string;
  shortName: string;
  /** Ten hien thi theo cach goi trong quy che. */
  officialName: string;
  questionCount: number;
  minutes: number;
  mcqCount: number;
  fillCount: number;
  /** Khe mau bieu do (da kiem dinh cho ca hai che do mau). */
  accent: 'viz-1' | 'viz-2' | 'viz-3';
  description: string;
}

/**
 * Cau truc de thi HSA (DHQGHN): 150 cau / 195 phut / 150 diem.
 * Nguon: Vien Dao tao so va Khao thi DHQGHN, cau truc de thi 2026.
 */
export const SECTIONS: readonly SectionSpec[] = [
  {
    id: 'quantitative',
    name: 'Toán học và xử lý số liệu',
    shortName: 'Toán',
    officialName: 'Phần 1 — Tư duy định lượng',
    questionCount: 50,
    minutes: 75,
    mcqCount: 35,
    fillCount: 15,
    accent: 'viz-1',
    description: '35 câu trắc nghiệm 4 lựa chọn và 15 câu điền đáp án.',
  },
  {
    id: 'qualitative',
    name: 'Ngôn ngữ — Văn học',
    shortName: 'Văn',
    officialName: 'Phần 2 — Tư duy định tính',
    questionCount: 50,
    minutes: 60,
    mcqCount: 50,
    fillCount: 0,
    accent: 'viz-2',
    description: '25 câu đơn lẻ và 5 chùm câu hỏi đọc hiểu, mỗi chùm 5 câu.',
  },
  {
    id: 'science',
    name: 'Khoa học / Tiếng Anh',
    shortName: 'Khoa học',
    officialName: 'Phần 3 — Tự chọn',
    questionCount: 50,
    minutes: 60,
    mcqCount: 50,
    fillCount: 0,
    accent: 'viz-3',
    description: 'Chọn môn trong Lý, Hóa, Sử, Địa hoặc Tiếng Anh.',
  },
] as const;

export const SECTION_BY_ID: Record<SectionId, SectionSpec> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
) as Record<SectionId, SectionSpec>;

export const TOTAL_QUESTIONS = SECTIONS.reduce((n, s) => n + s.questionCount, 0);
export const TOTAL_MINUTES = SECTIONS.reduce((n, s) => n + s.minutes, 0);

export const SCIENCE_SUBJECTS: ReadonlyArray<{ id: ScienceSubject; name: string; note: string }> = [
  { id: 'physics', name: 'Vật lý', note: 'Cơ — Điện — Sóng — Hạt nhân' },
  { id: 'chemistry', name: 'Hóa học', note: 'Đại cương — Vô cơ — Hữu cơ' },
  { id: 'history', name: 'Lịch sử', note: 'Việt Nam và thế giới hiện đại' },
  { id: 'geography', name: 'Địa lý', note: 'Tự nhiên — Kinh tế — Bảng số liệu' },
  { id: 'english', name: 'Tiếng Anh', note: 'Ngữ pháp — Từ vựng — Đọc hiểu' },
];

export const SUBJECT_NAME: Record<ScienceSubject, string> = Object.fromEntries(
  SCIENCE_SUBJECTS.map((s) => [s.id, s.name]),
) as Record<ScienceSubject, string>;

/** Nhan cho tung muc do kho. */
export const DIFFICULTY_LABEL: Record<number, string> = {
  1: 'Nhận biết',
  2: 'Thông hiểu',
  3: 'Vận dụng',
  4: 'Vận dụng cao',
  5: 'Phân loại',
};

/**
 * Phan bo do kho muc tieu cua mot de chuan (tong = 1 cho moi section).
 * Dung de du bao diem: nang luc uoc luong duoc chieu len phan bo nay.
 */
export const DIFFICULTY_MIX: Record<number, number> = {
  1: 0.16,
  2: 0.3,
  3: 0.3,
  4: 0.17,
  5: 0.07,
};

export const STORAGE_KEY = 'hsa365:state';
export const STORAGE_VERSION = 5;
