import { useMemo, useState } from 'react';
import { useApp } from '@/state';
import { Card } from '@/components/ui';
import type { FeedbackEntry } from '@/types';

/**
 * THU THẬP PHẢN HỒI
 *
 * Vì sao có thành phần này: chất lượng cảm nhận được của một trang là thứ duy
 * nhất người học đo được ngay, và cũng là tín hiệu đáng tin nhất để biết trang
 * nào cần viết lại. Ô phản hồi đặt ngay cuối nội dung, hỏi đúng hai điều: có
 * hữu ích không, và thiếu gì.
 *
 * Một điều cố ý KHÔNG làm: dữ liệu ở đây không được dùng để sinh thẻ đánh giá
 * sao gửi cho công cụ tìm kiếm. Muốn hiển thị sao trên trang kết quả tìm kiếm
 * thì đánh giá phải là đánh giá thật, thu thập công khai, kiểm chứng được và
 * hiển thị đầy đủ trên trang. Phản hồi lưu cục bộ trên trình duyệt của một
 * người không đáp ứng điều đó, nên tuyệt đối không được dùng làm dữ liệu đánh
 * giá có cấu trúc.
 */

const WHO: { id: FeedbackEntry['who']; label: string }[] = [
  { id: 'hoc-sinh', label: 'Học sinh' },
  { id: 'phu-huynh', label: 'Phụ huynh' },
  { id: 'giao-vien', label: 'Giáo viên' },
  { id: 'khac', label: 'Khác' },
];

const PROMPT: Record<number, string> = {
  1: 'Trang này chưa dùng được. Em/anh chị đang cần gì mà không tìm thấy?',
  2: 'Còn thiếu nhiều. Phần nào khó hiểu hoặc thiếu nhất?',
  3: 'Tạm được. Thêm điều gì thì sẽ thành thật sự hữu ích?',
  4: 'Tốt rồi. Còn một điểm nào nữa nên cải thiện không?',
  5: 'Cảm ơn. Điều gì ở trang này giúp được nhiều nhất?',
};

export function Feedback({ path, label }: { path: string; label: string }) {
  const { state, update } = useApp();
  const existing = useMemo(
    () => state.feedback.find((f) => f.path === path),
    [state.feedback, path],
  );
  const [rating, setRating] = useState<number>(existing?.rating ?? 0);
  const [comment, setComment] = useState(existing?.comment ?? '');
  const [who, setWho] = useState<FeedbackEntry['who']>(existing?.who ?? 'hoc-sinh');
  const [sent, setSent] = useState(!!existing);

  const submit = () => {
    if (!rating) return;
    const entry: FeedbackEntry = {
      id: `fb-${path}`,
      at: new Date().toISOString(),
      path,
      label,
      rating: rating as FeedbackEntry['rating'],
      comment: comment.trim(),
      who,
    };
    update((s) => ({
      ...s,
      feedback: [...s.feedback.filter((f) => f.path !== path), entry],
    }));
    setSent(true);
  };

  return (
    <Card className="no-print p-5">
      <div className="text-[14px] font-extrabold text-slate-900">
        {sent ? 'Đã ghi nhận phản hồi của bạn' : 'Trang này có giúp được bạn không?'}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            aria-label={`${n} sao`}
            aria-pressed={rating === n}
            className="rounded-lg px-2 py-1 text-2xl leading-none transition"
            style={{ color: n <= rating ? '#F0A21B' : '#cbd5e1' }}
            onClick={() => {
              setRating(n);
              setSent(false);
            }}
          >
            ★
          </button>
        ))}
        {rating > 0 && (
          <span className="text-[12.5px] font-semibold text-slate-600">{rating}/5</span>
        )}
      </div>

      {rating > 0 && !sent && (
        <div className="mt-3 space-y-3">
          <div>
            <div className="text-[12.5px] font-semibold text-slate-700">{PROMPT[rating]}</div>
            <textarea
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-[13px] outline-none focus:border-brand-400"
              rows={3}
              placeholder="Viết cụ thể sẽ giúp chúng tôi sửa đúng chỗ. Có thể bỏ trống."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-semibold text-slate-500">Bạn là:</span>
            {WHO.map((w) => (
              <button
                key={w.id}
                className="chip"
                style={
                  who === w.id
                    ? { background: '#1B4F9C', color: '#fff' }
                    : { background: '#eef1f6', color: '#334155' }
                }
                onClick={() => setWho(w.id)}
              >
                {w.label}
              </button>
            ))}
            <button className="btn btn-primary ml-auto px-4 py-1.5 text-[13px]" onClick={submit}>
              Gửi phản hồi
            </button>
          </div>
        </div>
      )}

      {sent && (
        <div className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
          Phản hồi được lưu trên trình duyệt của bạn và không gửi đi đâu. Khi triển khai thật, đây là
          nơi dữ liệu được gửi về đội biên soạn để sửa đúng trang bạn vừa đánh giá.
          <button
            className="ml-1 font-semibold text-brand-700 underline"
            onClick={() => {
              setSent(false);
            }}
          >
            Sửa lại đánh giá
          </button>
        </div>
      )}
    </Card>
  );
}
