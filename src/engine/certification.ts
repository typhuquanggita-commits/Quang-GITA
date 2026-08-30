/**
 * Internal certification.
 *
 * A learner who has practised for six months has a folder of scores and no
 * way to say what they can do. The point of a certificate is to convert that
 * into one sentence they can stand behind — and the whole value of it rests
 * on the certificate being hard enough to get that the sentence is true.
 *
 * ## Standards-referenced, not norm-referenced
 *
 * Bands are defined by what the holder can do, not by where they sit against
 * other candidates. A cohort that all improves should all move up a band; a
 * percentile cannot express that, and a percentile awarded inside one tuition
 * centre is meaningless anyway — it ranks a learner against whoever else
 * happened to enrol.
 *
 * ## The rule that makes it worth having
 *
 * **A band is awarded only when the score's measurement interval lies wholly
 * inside it.** A candidate scoring 1198 with a standard error of 30 has not
 * demonstrated a 1200 standard; the evidence is consistent with 1168. So the
 * award goes to the lower band, and the certificate says why in the
 * candidate's own language.
 *
 * This costs awards. It is also the only version of this document worth
 * printing: a certificate that a candidate can obtain by sitting the test
 * enough times until the noise falls their way certifies nothing, and both
 * they and the centre issuing it will find that out later.
 *
 * For the same reason the scheme also requires a full-length sitting rather
 * than a section paper, a delivered form reliable enough to support an
 * individual decision, and an integrity log without unexplained absence.
 *
 * ## Not a College Board score
 *
 * Stated on the certificate, in the scheme, and here. The scale is the same
 * 400–1600, the parameters behind it are author estimates rather than
 * calibrations, and no university has agreed to read this. It is evidence a
 * learner has met an internal standard, and it is honest about being exactly
 * that.
 *
 * ## Portable across exam families
 *
 * Nothing here knows what the SAT is. A scheme names its own scale, its own
 * bands and its own descriptors, so a sibling platform on a different exam
 * defines a scheme and reuses the whole apparatus.
 */

import type { Attempt, IntegrityEvent } from '../types.ts';
import { reliabilityGrade } from './irt.ts';
import { addDays, hashString, isoDate } from '../lib/util.ts';

export interface BandDescriptor {
  en: string;
  vi: string;
}

export interface CertificationBand {
  id: string;
  name: string;
  nameVi: string;
  /** Lowest scaled total that can be awarded this band. */
  minScore: number;
  /** What the holder can do. Never a percentile, never a comparison. */
  descriptors: BandDescriptor[];
}

export interface CertificationScheme {
  id: string;
  name: string;
  nameVi: string;
  scaleMin: number;
  scaleMax: number;
  /** Ascending by minScore. */
  bands: CertificationBand[];
  /** Marginal reliability the delivered form must reach for an individual award. */
  minReliability: number;
  /** Section papers do not certify. */
  requireFullLength: boolean;
  /** Seconds a candidate may be away from the window before the award is held. */
  maxAwaySeconds: number;
  validMonths: number;
  /** What this certificate is not. Printed verbatim. */
  disclaimer: string;
  disclaimerVi: string;
}

export type AwardStatus =
  | 'awarded'
  /** The point estimate reached a band, but its error interval did not. */
  | 'held-at-lower-band'
  /** Below the lowest band, even on the point estimate. */
  | 'below-lowest-band'
  /** No full-length scored sitting. */
  | 'insufficient-evidence'
  /** The form could not measure an individual precisely enough. */
  | 'unreliable-form'
  /** The integrity log needs a human before anything is issued. */
  | 'integrity-hold';

export interface AwardReason {
  en: string;
  vi: string;
}

export interface CertificationResult {
  status: AwardStatus;
  /** The band actually awarded, if any. */
  band: CertificationBand | null;
  /** The band the point estimate alone would have reached. Shown when they differ. */
  provisionalBand: CertificationBand | null;
  score: number | null;
  sem: number | null;
  interval: [number, number] | null;
  reliability: number | null;
  reliabilityGrade: ReturnType<typeof reliabilityGrade> | null;
  /** Why this status, in both languages. Never empty. */
  reasons: AwardReason[];
  /** Verification code, present only on an award. */
  serial: string | null;
  issuedOn: string | null;
  expiresOn: string | null;
  attemptId: string | null;
}

/* ------------------------------------------------------------------ */
/* The SAT365 scheme                                                   */
/* ------------------------------------------------------------------ */

export const SAT365_SCHEME: CertificationScheme = {
  id: 'sat365',
  name: 'SAT365 Certificate of Readiness',
  nameVi: 'Chứng nhận Sẵn sàng SAT365',
  scaleMin: 400,
  scaleMax: 1600,
  minReliability: 0.8,
  requireFullLength: true,
  maxAwaySeconds: 120,
  validMonths: 12,
  disclaimer:
    'This is an internal SAT365 certificate issued by a tuition provider. It is not a College Board score, it is not accepted by any university, and the item parameters behind the scale are author estimates rather than calibrations against a live testing population. It certifies that a candidate met a stated internal standard on a stated date, under stated conditions, and nothing beyond that.',
  disclaimerVi:
    'Đây là chứng nhận nội bộ của SAT365 do một đơn vị giảng dạy cấp. Đây KHÔNG phải điểm SAT của College Board, KHÔNG được trường đại học nào chấp nhận, và tham số câu hỏi phía sau thang điểm là ước lượng của người soạn chứ chưa hiệu chuẩn trên quần thể thi thật. Nó chứng nhận rằng thí sinh đã đạt một chuẩn nội bộ đã công bố, vào một ngày cụ thể, trong điều kiện cụ thể — và không hàm ý gì hơn thế.',
  bands: [
    {
      id: 'foundation',
      name: 'Foundation',
      nameVi: 'Nền tảng',
      minScore: 1000,
      descriptors: [
        {
          en: 'Recognises every question type on the test and can name what each is asking before attempting it.',
          vi: 'Nhận ra được mọi dạng câu hỏi trong đề và gọi tên được từng dạng đang hỏi gì trước khi bắt tay làm.',
        },
        {
          en: 'Completes both modules of each section within the time allowed, without leaving items unread.',
          vi: 'Làm hết cả hai module của mỗi phần trong thời gian cho phép, không bỏ sót câu nào chưa kịp đọc.',
        },
        {
          en: 'Applies a stated method to routine items rather than answering by impression.',
          vi: 'Áp dụng một phương pháp rõ ràng cho các câu quen thuộc, thay vì trả lời theo cảm tính.',
        },
      ],
    },
    {
      id: 'proficient',
      name: 'Proficient',
      nameVi: 'Thành thạo',
      minScore: 1200,
      descriptors: [
        {
          en: 'Separates what a text states from what it implies, and can point to the sentence that decides a question.',
          vi: 'Phân biệt được điều văn bản NÓI với điều nó HÀM Ý, và chỉ ra được câu văn quyết định đáp án.',
        },
        {
          en: 'Chooses an algebraic form before manipulating, rather than manipulating until something familiar appears.',
          vi: 'Chọn dạng đại số trước khi biến đổi, thay vì biến đổi cho tới khi thấy thứ gì quen mắt.',
        },
        {
          en: 'Distinguishes an association in data from a causal claim made about it.',
          vi: 'Phân biệt được mối liên hệ trong dữ liệu với khẳng định nhân quả mà người ta rút ra từ đó.',
        },
      ],
    },
    {
      id: 'advanced',
      name: 'Advanced',
      nameVi: 'Nâng cao',
      minScore: 1350,
      descriptors: [
        {
          en: 'Handles hard-band items in every domain, including those where the hard version differs in kind rather than in length.',
          vi: 'Xử lý được câu band khó ở mọi lĩnh vực, kể cả những dạng mà bản khó khác về BẢN CHẤT chứ không chỉ dài hơn.',
        },
        {
          en: 'Reads two texts against each other for position rather than for shared topic.',
          vi: 'Đọc đối chiếu hai văn bản theo QUAN ĐIỂM chứ không theo chủ đề chung.',
        },
        {
          en: 'Manages the clock deliberately: decides which item to leave, and stops checking one already settled.',
          vi: 'Quản lý thời gian có chủ đích: quyết định bỏ câu nào, và dừng kiểm tra câu đã chắc chắn.',
        },
      ],
    },
    {
      id: 'distinction',
      name: 'Distinction',
      nameVi: 'Xuất sắc',
      minScore: 1480,
      descriptors: [
        {
          en: 'Loses at most a small number of items across a full sitting, with no systematic weakness in any domain.',
          vi: 'Chỉ mất rất ít câu trên cả một lượt thi trọn vẹn, không có điểm yếu hệ thống ở lĩnh vực nào.',
        },
        {
          en: 'Sustains accuracy through the fourth hour, when most loss at this level occurs.',
          vi: 'Giữ được độ chính xác đến giờ thứ tư — chính là lúc phần lớn điểm mất ở mức này xảy ra.',
        },
        {
          en: 'Can explain why a wrong option is wrong, not only why the right one is right.',
          vi: 'Giải thích được vì sao phương án sai là sai, chứ không chỉ vì sao phương án đúng là đúng.',
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Evidence                                                            */
/* ------------------------------------------------------------------ */

/**
 * Seconds the candidate spent with the exam window unfocused.
 *
 * Computed here from the raw log rather than imported from the proctor hook,
 * because an award decision must not depend on a feature module. A blur with
 * no matching focus is treated as lasting until the attempt was submitted:
 * the alternative — ignoring it — would make walking away and never coming
 * back the cheapest way to defeat the check.
 */
export function awaySeconds(events: readonly IntegrityEvent[], submittedAt: number | null): number {
  let total = 0;
  let awaySince: number | null = null;

  for (const event of events) {
    if (event.kind === 'blur' && awaySince === null) awaySince = event.at;
    else if (event.kind === 'focus' && awaySince !== null) {
      total += event.at - awaySince;
      awaySince = null;
    }
  }
  if (awaySince !== null && submittedAt !== null) total += Math.max(0, submittedAt - awaySince);

  return Math.round(total / 1000);
}

/** The highest band a score reaches, ignoring measurement error. */
function bandFor(scheme: CertificationScheme, score: number): CertificationBand | null {
  let found: CertificationBand | null = null;
  for (const band of scheme.bands) {
    if (score >= band.minScore) found = band;
  }
  return found;
}

/**
 * A verification code.
 *
 * Deterministic in the scheme, the attempt, the score and the issue date, so
 * the same award always produces the same serial and a re-issued certificate
 * can be matched to the original. It deliberately carries no personal data:
 * a code printed on a document that leaves the building should not encode a
 * name.
 *
 * It is a checksum, not a signature. Without a server there is nothing to
 * verify against, and `describeVerification` says so rather than implying an
 * authority the code does not have.
 */
export function serialFor(
  scheme: CertificationScheme,
  attemptId: string,
  score: number,
  issuedOn: string,
): string {
  const digest = hashString(`${scheme.id}|${attemptId}|${score}|${issuedOn}`)
    .toString(36)
    .toUpperCase()
    .padStart(7, '0');
  const year = issuedOn.slice(2, 4);
  return `${scheme.id.toUpperCase()}-${year}-${digest.slice(0, 4)}-${digest.slice(4, 7)}`;
}

export interface CertifyInput {
  scheme: CertificationScheme;
  attempts: readonly Attempt[];
  /** Defaults to today. */
  today?: string;
}

/* ------------------------------------------------------------------ */
/* The decision                                                        */
/* ------------------------------------------------------------------ */

export function certify(input: CertifyInput): CertificationResult {
  const { scheme } = input;
  const today = input.today ?? isoDate();

  const empty: CertificationResult = {
    status: 'insufficient-evidence',
    band: null,
    provisionalBand: null,
    score: null,
    sem: null,
    interval: null,
    reliability: null,
    reliabilityGrade: null,
    reasons: [],
    serial: null,
    issuedOn: null,
    expiresOn: null,
    attemptId: null,
  };

  /*
   * The best eligible sitting, not the most recent. A candidate who has done
   * better before has demonstrated the standard; requiring the latest attempt
   * would mean a bad morning erases evidence already given. What it must not
   * do is let repeated sittings creep a candidate over a boundary on noise —
   * and that is prevented by the interval rule below, not by picking a
   * different attempt.
   */
  const eligible = input.attempts.filter(
    (a) =>
      a.score &&
      a.status === 'submitted' &&
      (!scheme.requireFullLength || a.score.sections.length === 2),
  );

  if (eligible.length === 0) {
    return {
      ...empty,
      reasons: [
        {
          en: scheme.requireFullLength
            ? 'No full-length sitting has been scored. A section paper measures one half of the standard and cannot certify the whole of it.'
            : 'No scored sitting is on record.',
          vi: scheme.requireFullLength
            ? 'Chưa có lượt thi trọn vẹn nào được chấm. Đề lẻ một phần chỉ đo được một nửa chuẩn, không thể chứng nhận cho toàn bộ.'
            : 'Chưa có lượt thi nào được chấm trong hồ sơ.',
        },
      ],
    };
  }

  const best = eligible.reduce((a, b) => (b.score!.total > a.score!.total ? b : a));
  const report = best.score!;
  const score = report.total;
  const sem = Math.max(1, Math.round((report.totalBand[1] - report.totalBand[0]) / 2));
  const interval: [number, number] = [score - sem, score + sem];

  /*
   * Reliability of the delivered form, combined across sections. A form that
   * cannot resolve an individual has no business supporting an individual
   * award, however high the number on it.
   */
  const reliability =
    report.sections.reduce((acc, s) => acc + s.reliability, 0) / report.sections.length;
  const grade = reliabilityGrade(reliability);

  const base = {
    ...empty,
    score,
    sem,
    interval,
    reliability,
    reliabilityGrade: grade,
    attemptId: best.id,
    provisionalBand: bandFor(scheme, score),
  };

  const away = awaySeconds(best.integrity, best.submittedAt);
  if (away > scheme.maxAwaySeconds) {
    return {
      ...base,
      status: 'integrity-hold',
      reasons: [
        {
          en: `The candidate was away from the exam window for ${away} seconds, above the ${scheme.maxAwaySeconds}-second limit for an unsupervised sitting. The result stands; the certificate is held until someone who was present can account for it.`,
          vi: `Thí sinh rời khỏi cửa sổ bài thi tổng cộng ${away} giây, vượt mức ${scheme.maxAwaySeconds} giây cho phép với lượt thi không có giám thị. Kết quả vẫn giữ nguyên; chứng nhận tạm giữ cho tới khi có người chứng kiến giải trình được.`,
        },
      ],
    };
  }

  if (reliability < scheme.minReliability) {
    return {
      ...base,
      status: 'unreliable-form',
      reasons: [
        {
          en: `The delivered form has a marginal reliability of ${reliability.toFixed(2)}, below the ${scheme.minReliability.toFixed(2)} this scheme requires for an individual decision. That is a property of the items, not of the candidate — a longer or better-targeted form would fix it, and re-sitting the same one would not.`,
          vi: `Đề đã phát có độ tin cậy biên ${reliability.toFixed(2)}, dưới mức ${scheme.minReliability.toFixed(2)} mà quy chế này yêu cầu để ra quyết định cho cá nhân. Đây là đặc tính của bộ câu hỏi chứ không phải của thí sinh — một đề dài hơn hoặc nhắm đúng mức hơn sẽ khắc phục được, còn thi lại chính đề đó thì không.`,
        },
      ],
    };
  }

  const provisional = base.provisionalBand;
  if (!provisional) {
    return {
      ...base,
      status: 'below-lowest-band',
      reasons: [
        {
          en: `A total of ${score} is below ${scheme.bands[0].minScore}, the lowest band this scheme awards.`,
          vi: `Tổng điểm ${score} thấp hơn ${scheme.bands[0].minScore} — bậc thấp nhất mà quy chế này cấp.`,
        },
      ],
    };
  }

  /*
   * The interval rule. The award goes to the highest band whose boundary the
   * lower end of the interval also clears.
   */
  const awarded = bandFor(scheme, interval[0]);

  if (!awarded) {
    return {
      ...base,
      status: 'below-lowest-band',
      reasons: [
        {
          en: `A total of ${score} reaches ${provisional.name}, but the measurement interval runs down to ${interval[0]} — below the lowest band. The evidence does not yet separate this candidate from someone who would not be certified.`,
          vi: `Tổng điểm ${score} chạm bậc ${provisional.nameVi}, nhưng khoảng sai số kéo xuống tới ${interval[0]} — thấp hơn cả bậc thấp nhất. Bằng chứng chưa tách được thí sinh này khỏi người lẽ ra không được cấp.`,
        },
      ],
    };
  }

  const issuedOn = today;
  const expiresOn = addDays(today, Math.round(scheme.validMonths * 30.4));
  const serial = serialFor(scheme, best.id, score, issuedOn);

  if (awarded.id !== provisional.id) {
    return {
      ...base,
      status: 'held-at-lower-band',
      band: awarded,
      serial,
      issuedOn,
      expiresOn,
      reasons: [
        {
          en: `A total of ${score} reaches ${provisional.name}, but its measurement interval is ${interval[0]}–${interval[1]} and runs below the ${provisional.minScore} boundary. A score is evidence of a range, not of a point, so the award is ${awarded.name}. One further sitting above ${provisional.minScore + sem} would settle it.`,
          vi: `Tổng điểm ${score} chạm bậc ${provisional.nameVi}, nhưng khoảng sai số là ${interval[0]}–${interval[1]}, tụt xuống dưới mốc ${provisional.minScore}. Một điểm số là bằng chứng cho một KHOẢNG chứ không phải một ĐIỂM, nên bậc được cấp là ${awarded.nameVi}. Thêm một lượt thi trên ${provisional.minScore + sem} sẽ phân định dứt điểm.`,
        },
      ],
    };
  }

  return {
    ...base,
    status: 'awarded',
    band: awarded,
    serial,
    issuedOn,
    expiresOn,
    reasons: [
      {
        en: `A total of ${score} with a measurement interval of ${interval[0]}–${interval[1]}, wholly above the ${awarded.minScore} boundary, on a form with reliability ${reliability.toFixed(2)}.`,
        vi: `Tổng điểm ${score}, khoảng sai số ${interval[0]}–${interval[1]} nằm trọn trên mốc ${awarded.minScore}, trên một đề có độ tin cậy ${reliability.toFixed(2)}.`,
      },
    ],
  };
}

/**
 * What the verification code can and cannot establish.
 *
 * There is no server. The code is reproducible from the award's own facts, so
 * it detects a certificate whose score or date has been altered — and it does
 * nothing at all against someone who invents a plausible-looking string. A
 * document that implied otherwise would be worse than one with no code on it.
 */
export function describeVerification(scheme: CertificationScheme): AwardReason {
  return {
    en: `Verify by asking ${scheme.name.split(' ')[0]} to reproduce this code from the sitting it names. The code is a checksum over the scheme, the sitting, the score and the issue date; it detects an altered certificate and cannot, on its own, prove that one was ever issued.`,
    vi: `Xác minh bằng cách yêu cầu ${scheme.name.split(' ')[0]} tạo lại mã này từ chính lượt thi được ghi trên chứng nhận. Mã là một checksum trên quy chế, lượt thi, điểm số và ngày cấp; nó phát hiện được chứng nhận bị sửa, nhưng tự nó không chứng minh được rằng chứng nhận từng được cấp thật.`,
  };
}

/** True when the certificate is still inside its validity window. */
export function isCurrent(result: CertificationResult, today = isoDate()): boolean {
  return result.expiresOn !== null && result.expiresOn >= today;
}
