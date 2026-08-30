import { DIFFICULTY_MIX, MAX_TOTAL_SCORE, TOTAL_QUESTIONS } from '../config';
import { TOPICS } from '../data/topics';
import type { PersistedState } from '../types';
import { difficultyToLogit, expectedAccuracy, probabilityCorrect } from './ability';
import { masteryToAbility } from './analytics';
import { topicsInScope } from './section3';

/**
 * LO TRINH DIEM TUYET DOI
 *
 * Cau hoi: "lam sao dat 150/150?"
 *
 * Cau tra loi trung thuc bat dau bang mot dieu chinh ve BAN CHAT cua con so:
 *
 *   150 diem khong phai mot KY VONG, no la mot BIEN CO.
 *
 * Moi mo hinh nang luc — Rasch, IRT hay bat ky bien the nao — deu cho ra mot
 * ti le dung KY VONG. Ti le do tien toi 1 nhung khong bao gio bang 1, nen
 * diem ky vong tien toi 150 nhung khong bao gio cham. Mot he thong hua "lo
 * trinh nay se cho ban 150 diem" la mot he thong dang noi doi ve mat toan hoc.
 *
 * Vi vay tep nay khong du bao diem. No tra loi mot cau hoi khac va tra loi
 * duoc that: VOI NANG LUC HIEN TAI, XAC SUAT LAM DUNG CA 150 CAU LA BAO NHIEU,
 * va can nang no len muc nao de xac suat do tro nen dang ke.
 *
 * Ba tru cot doc lap nhau, va day la phat hien quan trong nhat:
 *
 *  1. KIEN THUC — nang luc du de tung cau deu co xac suat dung rat cao.
 *  2. DO CHINH XAC THUC THI — khong sai bat can. Day la ky nang RIENG, khong
 *     phai he qua cua kien thuc. Mot nguoi biet het van co the sai vi doc
 *     nham de, bam nham dap an, hoac tinh voi.
 *  3. DO BEN — giu duoc ca hai thu tren suot 195 phut.
 *
 * Tru cot thu hai la tru cot bi bo qua o gan nhu moi tai lieu luyen thi, va
 * la tru cot QUYET DINH o vung diem tren 140. Ly do la phep nhan: xac suat
 * sach loi ca bai bang (1 − p)^150 voi p la ti le sai bat can moi cau. Sai
 * 1% moi cau — nghe rat nho — chi cho 22% co hoi lam dung ca bai.
 */

/**
 * Xac suat lam dung CA 150 cau voi nang luc theta.
 *
 * Tinh bang tich xac suat dung tren tung cau, nhom theo phan bo do kho chuan
 * cua de. Dung logarit de khong bi tran so khi nhan 150 thua so nho.
 */
export function perfectProbability(theta: number): number {
  let logP = 0;
  for (const [difficulty, share] of Object.entries(DIFFICULTY_MIX)) {
    const count = TOTAL_QUESTIONS * share;
    const p = probabilityCorrect(theta, difficultyToLogit(Number(difficulty)));
    logP += count * Math.log(p);
  }
  return Math.exp(logP);
}

/** Nang luc toi thieu de xac suat lam dung ca bai dat muc mong muon. */
export function abilityForPerfectChance(chance: number): number {
  const target = Math.min(0.999, Math.max(1e-9, chance));
  let lo = 0;
  let hi = 20;
  for (let i = 0; i < 80; i += 1) {
    const mid = (lo + hi) / 2;
    if (perfectProbability(mid) < target) lo = mid;
    else hi = mid;
  }
  return hi;
}

/** Doi nang luc logit ve muc thanh thao 0..1 de hien tren giao dien. */
export function masteryOfAbility(theta: number): number {
  return 1 / (1 + Math.exp(-theta));
}

/**
 * Xac suat khong mac loi bat can nao trong `count` cau.
 *
 * Day la phep nhan don gian nhung hau qua cua no thi khong: moi cau them vao
 * deu nhan them mot lan, nen mot ti le sai nho van bi khuech dai rat manh qua
 * 150 cau.
 */
export function cleanSheetProbability(errorRate: number, count: number = TOTAL_QUESTIONS): number {
  return Math.pow(1 - Math.min(1, Math.max(0, errorRate)), count);
}

/** Ti le sai bat can toi da cho phep de dat xac suat sach loi mong muon. */
export function maxErrorRateFor(chance: number, count: number = TOTAL_QUESTIONS): number {
  const target = Math.min(0.999999, Math.max(1e-9, chance));
  return 1 - Math.pow(target, 1 / count);
}

/**
 * Dien dat ti le sai duoi dang de hanh dong: "mot loi trong bao nhieu cau".
 *
 * Con so 0,46% khong noi len dieu gi voi nguoi hoc. Cau "duoc sai mot cau
 * trong 217 cau" thi dem duoc, va dem duoc thi luyen duoc.
 */
export function oneErrorIn(errorRate: number): number {
  return errorRate <= 0 ? Number.POSITIVE_INFINITY : Math.round(1 / errorRate);
}

export interface PerfectMilestone {
  /** Xac suat lam dung ca bai tai moc nay. */
  chance: number;
  /** Nang luc can co. */
  ability: number;
  /** Muc thanh thao tuong ung, 0..1. */
  mastery: number;
  /** Diem ky vong o muc nang luc do — luon nho hon 150. */
  expectedScore: number;
  /** Ti le sai bat can toi da cho phep. */
  maxErrorRate: number;
  /** Cu bao nhieu cau moi duoc sai mot cau. */
  oneErrorPer: number;
}

/** Cac moc xac suat dung lam thang do cho lo trinh diem tuyet doi. */
export const PERFECT_CHANCES: readonly number[] = [0.1, 0.25, 0.5, 0.8];

export function perfectMilestones(): PerfectMilestone[] {
  return PERFECT_CHANCES.map((chance) => {
    const ability = abilityForPerfectChance(chance);
    const maxErrorRate = maxErrorRateFor(chance);
    return {
      chance,
      ability,
      mastery: masteryOfAbility(ability),
      expectedScore: expectedAccuracy(ability) * MAX_TOTAL_SCORE,
      maxErrorRate,
      oneErrorPer: oneErrorIn(maxErrorRate),
    };
  });
}

export interface PerfectAssessment {
  /** Muc thanh thao thap nhat trong cac chuyen de dang hoc. */
  weakestMastery: number;
  weakestTopicId: string | null;
  /** Nang luc suy tu chuyen de yeu nhat — vi ca bai chi manh bang mat xich yeu nhat. */
  ability: number;
  /** Xac suat lam dung ca bai voi nang luc hien tai. */
  chance: number;
  /** Diem ky vong hien tai. */
  expectedScore: number;
  /** So chuyen de da cham nguong cua moc 50%. */
  topicsAtStandard: number;
  totalTopics: number;
  /** Ti le sai bat can toi da cho phep de giu 50% co hoi. */
  errorBudget: number;
  oneErrorPer: number;
}

/**
 * Danh gia kha nang cham diem tuyet doi cua mot nguoi hoc.
 *
 * Diem mau chot: lay chuyen de YEU NHAT lam thuoc do, khong lay trung binh.
 * Voi muc tieu 150, trung binh la mot chi so gay hieu nham — de that lay cau
 * o moi chuyen de, nen mot lo hong duy nhat cung du lam hong ca bai. Ca bai
 * chi manh bang mat xich yeu nhat cua no.
 */
export function assessPerfect(state: PersistedState): PerfectAssessment {
  const topics = topicsInScope(state.settings.section3, TOPICS);
  const standard = abilityForPerfectChance(0.5);

  let weakestMastery = 1;
  let weakestTopicId: string | null = null;
  let atStandard = 0;

  for (const topic of topics) {
    const mastery = state.mastery[topic.id]?.mastery ?? 0.5;
    if (mastery < weakestMastery) {
      weakestMastery = mastery;
      weakestTopicId = topic.id;
    }
    if (masteryToAbility(mastery) >= standard) atStandard += 1;
  }

  const ability = masteryToAbility(weakestMastery);
  const errorBudget = maxErrorRateFor(0.5);

  return {
    weakestMastery,
    weakestTopicId,
    ability,
    chance: perfectProbability(ability),
    expectedScore: expectedAccuracy(ability) * MAX_TOTAL_SCORE,
    topicsAtStandard: atStandard,
    totalTopics: topics.length,
    errorBudget,
    oneErrorPer: oneErrorIn(errorBudget),
  };
}

/**
 * Ti le sai bat can quan sat duoc tu cac lan lam bai gan day.
 *
 * Chi tinh tren cac cau thuoc chuyen de nguoi hoc DA thanh thao — vi sai o
 * chuyen de chua hoc khong phai loi bat can ma la lo hong kien thuc, va hai
 * thu do can hai cach chua khac nhau.
 */
export function observedErrorRate(state: PersistedState, masteredAt = 0.85): number | null {
  let attempts = 0;
  let wrong = 0;
  for (const mastery of Object.values(state.mastery)) {
    if (mastery.mastery < masteredAt) continue;
    attempts += mastery.attempts;
    wrong += mastery.attempts - mastery.correct;
  }
  return attempts >= 30 ? wrong / attempts : null;
}
