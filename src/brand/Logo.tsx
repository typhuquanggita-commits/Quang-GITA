import type { SVGProps } from 'react';

/**
 * DAU HIEU GITA
 *
 * Ba vet cong dong tam va mot cum sao. Moi vet duoc dung bang hai cung elip
 * long nhau co tam lech nhau — chinh do lech ay tao ra do thon o hai dau ma
 * mot net day deu khong bao gio co duoc.
 *
 * GHI CHU QUAN TRONG: phan chu "GITA" o day dung phong chu he thong, khong
 * phai phong chu goc cua logo. Day la ban dung lai de dung duoc trong san
 * pham va in duoc o moi co; khi co tep vector goc cua thuong hieu, hay thay
 * phan <text> bang duong dan chu that.
 */

const BLUE_OUTER = '#2E6FBF';
const BLUE_INNER = '#5B9BD8';
const RED = '#E02B20';
const WORD = '#1C5BA8';

const STAR = 'M0-11 3.4-3.6 11.5-2.7 5.4 2.9 7.1 11 0 6.9-7.1 11-5.4 2.9-11.5-2.7-3.4-3.6Z';

/** Ba vet cong + cum sao, khong co chu. Dung khi da co chu ben canh. */
export function GitaMark({
  mono = false,
  title = 'Dấu hiệu GITA',
  ...rest
}: { mono?: boolean; title?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 480 250" role="img" aria-label={title} {...rest}>
      <GitaMarkPaths mono={mono} />
    </svg>
  );
}

/** Dau hieu day du: vet cong, cum sao va chu GITA. */
export function GitaLogo({
  mono = false,
  title = 'GITA',
  ...rest
}: { mono?: boolean; title?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 480 250" role="img" aria-label={title} {...rest}>
      <GitaMarkPaths mono={mono} />
      <text
        x="262"
        y="156"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', 'Noto Serif', serif"
        fontWeight={700}
        fontSize={92}
        letterSpacing={1}
        fill={mono ? 'currentColor' : WORD}
      >
        GITA
      </text>
    </svg>
  );
}

function GitaMarkPaths({ mono }: { mono: boolean }) {
  const blueOuter = mono ? 'currentColor' : BLUE_OUTER;
  const blueInner = mono ? 'currentColor' : BLUE_INNER;
  const red = mono ? 'currentColor' : RED;
  return (
    <>
      <g opacity={mono ? 0.55 : 1}>
        <path fill={blueOuter} d="M455 104A218 106 0 1 0 320 218A206 94 0 1 1 455 104Z" />
      </g>
      <g opacity={mono ? 0.35 : 1}>
        <path fill={blueInner} d="M432 100A190 89 0 1 0 312 196A180 79 0 1 1 432 100Z" />
      </g>
      <g opacity={mono ? 0.8 : 1}>
        <path fill={red} d="M424 74A196 88 0 1 0 300 190A188 80 0 1 1 424 74Z" />
      </g>
      <g fill={mono ? 'currentColor' : BLUE_OUTER}>
        <path transform="translate(352,44) scale(0.62)" d={STAR} />
        <path transform="translate(377,36) scale(0.78)" d={STAR} />
        <path transform="translate(404,29) scale(0.92)" d={STAR} />
        <path transform="translate(432,24)" d={STAR} />
      </g>
      <g fill={mono ? 'currentColor' : RED}>
        <path transform="translate(455,34) scale(0.86)" d={STAR} />
        <path transform="translate(470,50) scale(0.68)" d={STAR} />
      </g>
    </>
  );
}

/**
 * Khoa nhan dien cho san pham: dau hieu GITA + ten HSA365 + dong mo ta.
 *
 * Thu tu co y: GITA truoc, HSA365 sau. HSA365 la MOT chuong trinh trong he
 * GITA, khong phai mot thuong hieu doc lap muon logo — va bo nhan dien phai
 * noi dung quan he do ngay tu cai nhin dau tien.
 */
export function BrandLockup({
  descriptor = 'Luyện thi Đánh giá năng lực HSA',
  compact = false,
  className,
}: {
  descriptor?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      <span className="flex items-center gap-3">
        <GitaMark className={compact ? 'h-6 w-auto' : 'h-9 w-auto'} />
        <span className="flex flex-col leading-none">
          <span className={compact ? 'text-sm font-bold tracking-tight' : 'text-lg font-bold tracking-tight'}>
            HSA<span className="text-brand">365</span>
          </span>
          {!compact && <span className="mt-1 text-[0.6875rem] text-fg-subtle">{descriptor}</span>}
        </span>
      </span>
    </span>
  );
}
