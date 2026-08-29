import { useRef, useState } from 'react';
import { coachAdvice, explainQuestion, hintQuestion, similarQuestion, resolveApiKey } from '../../lib/ai';
import type { CoachContext } from '../../lib/ai';
import type { Question } from '../../types';
import { Badge, Button, Spinner } from '../../components/ui/primitives';
import { IconSpark } from '../../components/layout/icons';
import { Link } from '../../lib/router';

type Mode = 'explain' | 'hint' | 'similar';

/**
 * Gia su AI — phan thuong, khong phai dieu kien.
 *
 * Khi chua co khoa API, thanh phan nay hien mot loi moi ro rang thay vi bao loi.
 * Khi co, moi cau tra loi deu kem canh bao doi chieu: mo hinh ngon ngu co the
 * sai, con loi giai chinh thuc trong ngan hang cau hoi thi khong.
 */
export function TutorPanel({
  apiKey,
  question,
  userAnswer,
}: {
  apiKey: string;
  question: Question;
  userAnswer: string | null;
}) {
  const [output, setOutput] = useState<{ mode: Mode; text: string } | null>(null);
  const [loading, setLoading] = useState<Mode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const key = resolveApiKey(apiKey);

  const run = async (mode: Mode) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(mode);
    setError(null);
    try {
      const text =
        mode === 'explain'
          ? await explainQuestion(key, question, userAnswer, controller.signal)
          : mode === 'hint'
            ? await hintQuestion(key, question, controller.signal)
            : await similarQuestion(key, question, controller.signal);
      setOutput({ mode, text });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không gọi được Gia sư AI.');
    } finally {
      setLoading(null);
    }
  };

  if (!key) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-surface-2 p-4 text-sm text-fg-muted">
        <p className="flex items-center gap-2 font-medium text-fg">
          <IconSpark className="size-4 text-brand" />
          Gia sư AI đang tắt
        </p>
        <p className="mt-1.5">
          Thêm khóa Gemini API trong{' '}
          <Link to="/settings" className="font-medium text-brand underline underline-offset-2">
            Cài đặt
          </Link>{' '}
          để được giảng lại theo cách khác, xin gợi ý mà không lộ đáp án, hoặc sinh thêm câu cùng dạng.
          Mọi tính năng khác của HSA365 vẫn hoạt động đầy đủ khi không có khóa.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">
          <IconSpark className="size-3.5" />
          Gia sư AI
        </Badge>
        <Button size="sm" onClick={() => void run('explain')} loading={loading === 'explain'}>
          Giảng lại cách khác
        </Button>
        <Button size="sm" onClick={() => void run('hint')} loading={loading === 'hint'}>
          Gợi ý không lộ đáp án
        </Button>
        <Button size="sm" onClick={() => void run('similar')} loading={loading === 'similar'}>
          Ra câu tương tự
        </Button>
      </div>

      {error && <p className="mt-3 text-sm text-bad">{error}</p>}

      {loading && !output && (
        <p className="mt-3 flex items-center gap-2 text-sm text-fg-muted">
          <Spinner /> Đang soạn câu trả lời…
        </p>
      )}

      {output && (
        <div className="mt-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg">{output.text}</p>
          <p className="mt-3 text-xs text-fg-subtle">
            Nội dung do AI sinh ra và có thể sai. Lời giải chính thức ở phía trên mới là căn cứ để đối chiếu.
          </p>
        </div>
      )}
    </div>
  );
}

/** Bien the tu van lo trinh, dung o man hinh Lo trinh. */
export function CoachPanel({ apiKey, context }: { apiKey: string; context: CoachContext }) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const key = resolveApiKey(apiKey);

  if (!key) return null;

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      setText(await coachAdvice(key, context));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không gọi được Gia sư AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium text-fg">
          <IconSpark className="size-4 text-brand" />
          Xin tư vấn kế hoạch 7 ngày tới
        </p>
        <Button size="sm" variant="primary" onClick={() => void run()} loading={loading}>
          Tư vấn
        </Button>
      </div>
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
      {text && (
        <>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg">{text}</p>
          <p className="mt-3 text-xs text-fg-subtle">
            Gợi ý do AI sinh ra dựa trên số liệu học tập của bạn. Hãy đối chiếu với lộ trình bên dưới.
          </p>
        </>
      )}
    </div>
  );
}
