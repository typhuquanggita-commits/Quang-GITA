/**
 * The brand book, as a page in the product rather than a PDF nobody opens.
 *
 * A design system that lives only in a document drifts from the code within a
 * release or two, because the document has no way of being wrong. This page
 * renders the actual components with the actual tokens, so if the mark changes
 * or a colour is retuned, the book changes with it and cannot lie.
 *
 * It is also where the reasoning is kept — in particular the rule that the
 * brand colours are for marks and rules and never for running text, which is
 * the decision most likely to be undone by someone who has only seen the
 * palette and not the contrast figures beside it.
 */

import React from 'react';
import { GitaMark, SatLockup } from './Brandmark.tsx';
import { BRAND, PILLAR_COLOUR, PRINT_SCALE } from './tokens.ts';
import { DocumentFrame } from './DocumentFrame.tsx';
import { Badge, Card } from '../components/ui/primitives.tsx';
import { useLocale } from '../i18n/index.ts';
import { formatDate, isoDate } from '../lib/util.ts';

/**
 * Relative luminance and contrast, computed here rather than quoted.
 *
 * A contrast figure typed into a comment is a figure that was true once. These
 * are recomputed on every render from the same tokens the mark uses, so the
 * page cannot claim a ratio the colour does not have.
 */
function luminance(hex: string): number {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((i) => {
    const c = parseInt(value.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const PILLARS = [
  { id: 'goal' as const, letter: 'G', en: 'Goal', vi: 'Mục tiêu', roleEn: 'The outer arc — the destination the whole orbit is drawn around.', roleVi: 'Cung ngoài — đích đến mà cả quỹ đạo được vẽ quanh nó.' },
  { id: 'inspirits' as const, letter: 'I', en: 'Inspirits', vi: 'Nội lực', roleEn: 'The red arc — the drive that cuts across the others.', roleVi: 'Cung đỏ — nội lực cắt ngang các cung còn lại.' },
  { id: 'talent' as const, letter: 'T', en: 'Talent', vi: 'Tài năng', roleEn: 'The rising stars — what is already there, waiting to be seen.', roleVi: 'Những ngôi sao đang lên — thứ vốn đã có sẵn, chờ được nhìn thấy.' },
  { id: 'action' as const, letter: 'A', en: 'Action', vi: 'Hành động', roleEn: 'The inner arc — the daily path, closest to the centre.', roleVi: 'Cung trong — con đường mỗi ngày, gần tâm nhất.' },
];

export function BrandBook(): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{vi ? 'Nhận diện tài liệu SAT365' : 'SAT365 document identity'}</h1>
        <p className="page-sub">
          {vi
            ? 'Hệ thống nhận diện dựng từ logo GITA, áp cho mọi tài liệu in được của SAT365.'
            : 'The identity system built from the GITA mark and applied to every printable SAT365 document.'}
        </p>
      </header>

      <Card title={vi ? 'Dấu hiệu nhận diện' : 'The mark'}>
        <div className="brand-marks">
          <div className="brand-swatch-block">
            <GitaMark height={72} />
            <span className="text-xs muted">{vi ? 'Đủ màu' : 'Full colour'}</span>
          </div>
          <div className="brand-swatch-block brand-dark">
            <GitaMark height={72} />
            <span className="text-xs">{vi ? 'Trên nền tối' : 'On dark'}</span>
          </div>
          <div className="brand-swatch-block">
            <GitaMark height={72} mono />
            <span className="text-xs muted">{vi ? 'Một màu' : 'Monochrome'}</span>
          </div>
        </div>
        <p className="text-sm muted" style={{ marginTop: 'var(--space-4)', maxWidth: '66ch' }}>
          {vi
            ? 'Dựng lại bằng vector từ logo được cung cấp, khớp bằng mắt: đủ tốt cho màn hình và máy in văn phòng, và không phải bản gốc. In thương mại hoặc in khổ lớn thì nên thay bằng tệp vector gốc — ranh giới component đặt ở đây để việc thay chỉ động vào đúng một tệp.'
            : 'A vector rebuild of the supplied mark, matched by eye: good enough for the screen and an office printer, and not the original artwork. For commercial printing or large sizes the original vector file should replace it — the component boundary exists so that swap touches one file.'}
        </p>
      </Card>

      <Card
        title={vi ? 'Khoá nhận diện' : 'The lockup'}
        subtitle={
          vi
            ? 'SAT365 là chương trình bên trong GITA, và cách sắp xếp nói lên điều đó: dấu hiệu đi trước, một nét kẻ ngăn, tên chương trình theo sau bằng chữ giao diện chứ không phải chữ của logo.'
            : 'SAT365 is a programme inside GITA, and the arrangement says so: the mark leads, a hairline separates, and the programme name follows in the interface typeface rather than the wordmark’s serif.'
        }
      >
        <SatLockup height={40} />
      </Card>

      <Card
        title={vi ? 'Bảng màu, và quy tắc bất di bất dịch' : 'The palette, and the rule that governs it'}
        subtitle={
          vi
            ? 'Màu thương hiệu dùng cho dấu hiệu và nét kẻ, không bao giờ cho chữ chạy. Chữ dùng token giao diện, vốn được chọn theo độ tương phản trước tiên.'
            : 'Brand colours are for marks and rules, never for running text. Text keeps the interface tokens, which were chosen for contrast first.'
        }
      >
        <div className="scroll-x">
          <table className="table">
            <thead>
              <tr>
                <th>{vi ? 'Màu' : 'Colour'}</th>
                <th>{vi ? 'Trong logo' : 'In the mark'}</th>
                <th>{vi ? 'Tương phản trên giấy' : 'On white'}</th>
                <th>{vi ? 'Biến thể cho chữ' : 'Text variant'}</th>
                <th>{vi ? 'Tương phản' : 'Contrast'}</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(BRAND) as Array<keyof typeof BRAND>).map((key) => {
                const colour = BRAND[key];
                const raw = contrastRatio(colour.hex, '#ffffff');
                const safe = contrastRatio(colour.onPaper, '#ffffff');
                return (
                  <tr key={key}>
                    <td className="semibold">{vi ? colour.nameVi : colour.name}</td>
                    <td>
                      <span className="brand-chip" style={{ background: colour.hex }} aria-hidden="true" />
                      <code>{colour.hex}</code>
                    </td>
                    <td>
                      <Badge tone={raw >= 4.5 ? 'success' : 'warning'}>
                        {raw.toFixed(1)}:1 {raw >= 4.5 ? '' : vi ? '· không đủ cho chữ' : '· not for text'}
                      </Badge>
                    </td>
                    <td>
                      <span className="brand-chip" style={{ background: colour.onPaper }} aria-hidden="true" />
                      <code>{colour.onPaper}</code>
                    </td>
                    <td>
                      <Badge tone={safe >= 4.5 ? 'success' : 'danger'}>{safe.toFixed(1)}:1</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-sm muted" style={{ marginTop: 'var(--space-4)', maxWidth: '68ch' }}>
          {vi
            ? 'Các tỉ số trên được tính lại mỗi lần trang này hiển thị, từ đúng những token mà logo dùng. Một con số tương phản gõ vào chú thích là con số từng đúng một lần.'
            : 'These ratios are recomputed every time the page renders, from the same tokens the mark uses. A contrast figure typed into a comment is a figure that was true once.'}
        </p>
      </Card>

      <Card
        title={vi ? 'Bốn trụ, trong chính dấu hiệu' : 'The four pillars, inside the mark'}
        subtitle={
          vi
            ? 'Logo có bốn thành phần và mô thức có bốn trụ. Ghép chúng không phải để trang trí: một tài liệu mang màu của trụ nào thì người đọc biết ngay nó phục vụ phần nào của mô thức, trước khi đọc chữ đầu tiên.'
            : 'The mark has four elements and the model has four pillars. Pairing them is not decoration: a document carrying a pillar colour tells a reader which part of the model it serves before they have read a word.'
        }
      >
        <div className="pillar-grid">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-swatch"
              style={{ '--pillar': PILLAR_COLOUR[pillar.id] } as React.CSSProperties}
            >
              <span className="pillar-letter">{pillar.letter}</span>
              <span className="pillar-name">{vi ? pillar.vi : pillar.en}</span>
              <span className="pillar-role">{vi ? pillar.roleVi : pillar.roleEn}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title={vi ? 'Khung tài liệu' : 'The document frame'}
        subtitle={
          vi
            ? 'Mọi tài liệu in được đều nói bốn điều mà không cần ai hỏi: nó là gì, về ai, lập khi nào, và dùng được đến đâu.'
            : 'Every printable document says four things without being asked: what it is, who it is about, when it was made, and what it may be relied on for.'
        }
      >
        <DocumentFrame
          kind={vi ? 'Phiếu ôn thi' : 'Revision sheet'}
          title={vi ? 'Từ nối' : 'Transitions'}
          pillar="action"
          subject={vi ? 'Nguyễn Minh An' : 'Nguyen Minh An'}
          date={formatDate(isoDate(), locale)}
          reference="transitions/revision"
          locale={locale}
          limits={
            vi
              ? 'Ví dụ minh hoạ khung tài liệu. Dòng giới hạn này là bắt buộc chứ không phải tuỳ chọn: một khung cho phép tài liệu giấu đi giới hạn của chính nó là một khung sẽ được dùng để giấu.'
              : 'An illustration of the frame. This limits line is required rather than optional: a frame that lets a document omit its own limits is a frame that will be used to omit them.'
          }
        >
          <p className="muted">
            {vi
              ? '— nội dung phiếu nằm ở đây —'
              : '— the sheet’s content sits here —'}
          </p>
        </DocumentFrame>
      </Card>

      <Card title={vi ? 'Cỡ chữ khi in' : 'Print type scale'}>
        <div className="scroll-x">
          <table className="table">
            <thead>
              <tr>
                <th>{vi ? 'Vai trò' : 'Role'}</th>
                <th>{vi ? 'Cỡ (điểm)' : 'Size (pt)'}</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(PRINT_SCALE) as Array<keyof typeof PRINT_SCALE>).map((key) => (
                <tr key={key}>
                  <td className="semibold">{key}</td>
                  <td>{PRINT_SCALE[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm muted" style={{ marginTop: 'var(--space-3)', maxWidth: '64ch' }}>
          {vi
            ? 'Đặt bằng điểm chứ không phải pixel, vì tờ giấy có kích thước vật lý. Thân bài 10,5 điểm là ngưỡng đọc thoải mái trên A4 ở khoảng cách cầm tay.'
            : 'Set in points rather than pixels, because paper has a physical size. A 10.5 pt body is the comfortable reading threshold on A4 at arm’s length.'}
        </p>
      </Card>
    </div>
  );
}
