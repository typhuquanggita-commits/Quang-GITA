import React from 'react';
import { Card, M, Note } from '@/components/ui';
import { Logo } from '@/components/Logo';
import { GITA_FULL_NAME, GITA_SLOGAN } from '@/content';

/* =====================================================================
   BỘ CHUẨN NHẬN DIỆN THƯƠNG HIỆU GITA
   Trang tài liệu hoá quy chuẩn áp dụng thống nhất cho toàn bộ file,
   tài liệu in và màn hình của hệ thống MATHGITA.
   ===================================================================== */

const CORE = [
  { name: 'GITA Navy 900', v: '#061F4A', use: 'Nền header, bìa tài liệu, tiêu đề lớn' },
  { name: 'GITA Blue 800', v: '#0B3D91', use: 'Màu chính: logo, nút chủ đạo, tiêu đề mục' },
  { name: 'GITA Blue 700', v: '#1552B8', use: 'Trạng thái di chuột, dải chuyển sắc' },
  { name: 'GITA Gold 600', v: '#D99408', use: 'Màu nhấn: huy hiệu, nút hành động, điểm 10' },
  { name: 'GITA Gold 500', v: '#F2B023', use: 'Ruy băng, làm sáng trên nền tối' },
  { name: 'GITA Teal 600', v: '#0D8F7D', use: 'Trạng thái đúng, tiến bộ, mức Nhận biết' },
  { name: 'GITA Red 600', v: '#CF2F2F', use: 'Trạng thái sai, cảnh báo, lỗi thường gặp' },
  { name: 'GITA Violet 600', v: '#6C3FC4', use: 'Vận dụng cao, học sinh giỏi, phân tích tư duy' },
];

const LEVELS = [
  { k: 'NB', name: 'Nhận biết', v: '#0D8F7D' },
  { k: 'TH', name: 'Thông hiểu', v: '#0B3D91' },
  { k: 'VD', name: 'Vận dụng', v: '#D99408' },
  { k: 'VDC', name: 'Vận dụng cao', v: '#6C3FC4' },
];

const Swatch: React.FC<{ name: string; v: string; use: string }> = ({ name, v, use }) => (
  <div className="card tight">
    <div style={{ height: 56, borderRadius: 'var(--r-md)', background: v, marginBottom: 10, boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.14)' }} />
    <div className="bold">{name}</div>
    <div className="faint" style={{ fontFamily: 'var(--font-math)' }}>{v}</div>
    <div className="xs muted mt2">{use}</div>
  </div>
);

export const Brand: React.FC = () => (
  <div className="wrap page">
    <div className="section-head">
      <div>
        <h1 style={{ marginBottom: 4 }}>Bộ chuẩn nhận diện thương hiệu GITA</h1>
        <p className="muted mb0">
          Quy chuẩn áp dụng thống nhất cho <strong>toàn bộ</strong> tài liệu của GITA:
          màn hình web, phiếu bài tập, đề thi, đề cương, sơ đồ tư duy và báo cáo gửi phụ huynh.
        </p>
      </div>
      <button className="btn btn-outline btn-sm no-print" onClick={() => window.print()}>🖨 In bộ chuẩn</button>
    </div>

    {/* ---------------- LOGO ---------------- */}
    <Card className="rule-top mb6">
      <h2>1. Logo</h2>
      <div className="grid g2" style={{ alignItems: 'center' }}>
        <div>
          <div style={{ background: 'var(--gita-navy-800)', padding: 24, borderRadius: 'var(--r-lg)' }}>
            <Logo />
          </div>
          <div className="faint tc mt2">Phiên bản trên nền tối (mặc định)</div>
        </div>
        <div>
          <div style={{ background: '#fff', padding: 24, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <Logo onLight />
          </div>
          <div className="faint tc mt2">Phiên bản trên nền sáng (tài liệu in)</div>
        </div>
      </div>
      <div className="grid g2 mt4">
        <div className="note ok">
          <div className="note-title">✓ Nên</div>
          <ul className="mb0 small">
            <li>Giữ nguyên tỉ lệ khối biểu tượng và phần chữ.</li>
            <li>Chừa khoảng trắng quanh logo tối thiểu bằng chiều cao chữ “G”.</li>
            <li>Chiều cao tối thiểu khi in: 8 mm.</li>
            <li>Dòng phụ dưới tên (“Toán THCS 6–9”, “Tài liệu học tập”…) thay đổi theo ngữ cảnh.</li>
          </ul>
        </div>
        <div className="note bad">
          <div className="note-title">✕ Không nên</div>
          <ul className="mb0 small">
            <li>Đổi màu khối biểu tượng sang màu khác ngoài dải vàng GITA.</li>
            <li>Kéo giãn, nghiêng hoặc thêm bóng đổ cho logo.</li>
            <li>Đặt logo lên nền ảnh nhiều chi tiết mà không có lớp nền đặc.</li>
            <li>Viết tên thương hiệu tách rời thành “Math GITA” hoặc “MathGita”.</li>
          </ul>
        </div>
      </div>
    </Card>

    {/* ---------------- MÀU ---------------- */}
    <Card className="rule-top mb6">
      <h2>2. Bảng màu thương hiệu</h2>
      <p className="muted">Xanh học thuật là màu chủ đạo, vàng là màu nhấn. Ba màu phụ chỉ dùng để mã hoá trạng thái, không dùng làm màu trang trí.</p>
      <div className="grid g4">
        {CORE.map((c) => <Swatch key={c.name} {...c} />)}
      </div>

      <h3 className="mt8">Mã màu bốn mức độ nhận thức</h3>
      <p className="muted small">Bốn màu này gắn cố định với bốn mức độ trong ma trận đề của Bộ GD&amp;ĐT, dùng thống nhất ở mọi màn hình và mọi tài liệu in.</p>
      <div className="grid g4">
        {LEVELS.map((l) => (
          <div key={l.k} className="card tight" style={{ borderTop: `4px solid ${l.v}` }}>
            <div className="row-wrap">
              <span className={`badge badge-${l.k.toLowerCase()}`}>{l.k}</span>
              <span className="bold">{l.name}</span>
            </div>
            <div className="faint mt2" style={{ fontFamily: 'var(--font-math)' }}>{l.v}</div>
          </div>
        ))}
      </div>
    </Card>

    {/* ---------------- CHỮ ---------------- */}
    <Card className="rule-top mb6">
      <h2>3. Hệ thống chữ</h2>
      <div className="table-scroll">
        <table className="table">
          <thead><tr><th>Vai trò</th><th>Bộ chữ</th><th>Dùng cho</th><th>Ví dụ</th></tr></thead>
          <tbody>
            <tr>
              <td className="bold">Chữ chính</td>
              <td><code>Be Vietnam Pro</code></td>
              <td>Toàn bộ giao diện, tiêu đề, nội dung</td>
              <td style={{ fontFamily: 'var(--font-sans)' }}>Học Toán hiểu tận gốc</td>
            </tr>
            <tr>
              <td className="bold">Chữ trích dẫn</td>
              <td><code>Lora</code></td>
              <td>Lời dẫn, nhận xét của thầy cô</td>
              <td className="serif">Mỗi lỗi sai được chữa là một khoản điểm giữ lại</td>
            </tr>
            <tr>
              <td className="bold">Chữ toán học</td>
              <td><code>Cambria Math</code></td>
              <td>Mọi công thức, đáp số, mã đề</td>
              <td><M t="$\f{-b\pm\s{\Delta}}{2a}$" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="mt6">Thang cỡ chữ</h3>
      <div className="stack" style={{ gap: 6 }}>
        {[
          { n: 'Tiêu đề trang', s: 32 }, { n: 'Tiêu đề mục', s: 26 }, { n: 'Tiêu đề nhỏ', s: 21 },
          { n: 'Nội dung', s: 15 }, { n: 'Chú thích', s: 13 }, { n: 'Nhãn', s: 12 },
        ].map((x) => (
          <div key={x.n} className="row" style={{ gap: 16 }}>
            <span className="faint" style={{ width: 130 }}>{x.n}</span>
            <span style={{ fontSize: x.s, fontWeight: x.s >= 21 ? 700 : 400 }}>Toán THCS GITA</span>
            <span className="spacer" />
            <span className="badge">{x.s}px</span>
          </div>
        ))}
      </div>
    </Card>

    {/* ---------------- TÀI LIỆU IN ---------------- */}
    <Card className="rule-top mb6">
      <h2>4. Quy chuẩn tài liệu in</h2>
      <div className="grid g2">
        <div>
          <h4>Cấu trúc bắt buộc của một phiếu bài tập GITA</h4>
          <ol className="small">
            <li><strong>Đầu trang:</strong> dòng <em>“{GITA_FULL_NAME}”</em> căn giữa, in đậm, gạch chân bằng đường kẻ xanh GITA.</li>
            <li><strong>Khối thông tin:</strong> Giáo viên … / Ngày … / Họ và tên học sinh … / Lớp (ví dụ <code>6CB</code>, <code>6NC</code>) / Mục tiêu …</li>
            <li><strong>Hộp tiêu đề:</strong> khung viền xanh, ghi <strong>“PHIẾU CƠ BẢN: …”</strong> hoặc <strong>“PHIẾU NÂNG CAO: …”</strong> kèm dòng “Năm học”.</li>
            <li><strong>TÓM TẮT LÝ THUYẾT:</strong> chỉ ghi công thức và lưu ý trọng tâm, không diễn giải dài.</li>
            <li><strong>Thân bài:</strong> đánh số <strong>“THỬ THÁCH 1:”, “THỬ THÁCH 2:”…</strong> — nhãn in màu xanh GITA, đậm. Không dùng “Bài 1”, “Câu 1”.</li>
            <li><strong>VỀ ĐÍCH:</strong> phần cuối phiếu, gồm 2–3 thử thách tổng hợp ở mức cao hơn một bậc.</li>
            <li><strong>Trang đáp án:</strong> sang trang mới, kẻ vàng GITA, tiêu đề “ĐÁP ÁN &amp; LỜI GIẢI CHI TIẾT”.</li>
            <li><strong>Chân trang:</strong> khẩu hiệu <em>‘‘{GITA_SLOGAN}’’</em> in đậm, nghiêng, căn giữa.</li>
          </ol>
        </div>
        <div>
          <h4>Quy chuẩn kỹ thuật</h4>
          <div className="table-scroll">
            <table className="table">
              <tbody>
                <tr><td>Tên đầy đủ trên tài liệu</td><td className="bold">{GITA_FULL_NAME}</td></tr>
                <tr><td>Mã lớp</td><td className="bold">{'{'}khối{'}'}CB (cơ bản) · {'{'}khối{'}'}NC (nâng cao)</td></tr>
                <tr><td>Nhãn bài tập</td><td className="bold">THỬ THÁCH n: (không dùng “Bài”, “Câu”)</td></tr>
                <tr><td>Khổ giấy</td><td className="bold">A4 dọc</td></tr>
                <tr><td>Cỡ chữ nội dung</td><td className="bold">12 pt</td></tr>
                <tr><td>Giãn dòng</td><td className="bold">1,3</td></tr>
                <tr><td>Khoảng cách giữa các câu</td><td className="bold">18 px (≈ 5 mm)</td></tr>
                <tr><td>Mỗi câu</td><td className="bold">Không được cắt ngang trang</td></tr>
                <tr><td>Chỗ trống trả lời</td><td className="bold">Trả lời ngắn: 1 dòng chấm · Tự luận: khung 90 px</td></tr>
                <tr><td>Phương án trắc nghiệm</td><td className="bold">Xếp 2 cột, ký hiệu A. B. C. D.</td></tr>
              </tbody>
            </table>
          </div>
          <Note title="🎨 Mã màu in ấn" tone="gold">
            <p className="mb0 small">
              Đường kẻ tiêu đề dùng <strong>Xanh GITA #0B3D91</strong>; đường kẻ trang đáp án dùng
              <strong> Vàng GITA #D99408</strong>. Cảnh báo bẫy in màu <strong>Đỏ #CF2F2F</strong>.
              Bản in đen trắng vẫn phải phân biệt được nhờ độ đậm và ký hiệu, không chỉ dựa vào màu.
            </p>
          </Note>
        </div>
      </div>
    </Card>

    {/* ---------------- TRÌNH BÀY BÀI GIẢI ---------------- */}
    <Card className="rule-top mb6">
      <h2>5. Quy chuẩn trình bày bài giải GITA</h2>
      <p className="muted">Mọi lời giải trong hệ thống — trên web và trong tài liệu in — đều tuân theo cùng một cấu trúc bốn phần.</p>
      <div className="grid g4">
        {[
          { i: '📖', t: 'Đề bài', d: 'In đậm, có đánh số câu và nhãn mức độ nhận thức.' },
          { i: '🧠', t: 'Phân tích tư duy', d: 'Khối tím — trả lời câu hỏi “vì sao nghĩ ra bước đó”, viết trước lời giải.' },
          { i: '✅', t: 'Lời giải', d: 'Khối xanh lá — đánh số từng bước, mỗi bước một ý, trình bày như bài thi.' },
          { i: '⚠', t: 'Bẫy thường gặp', d: 'Khối đỏ — nêu lỗi sai học sinh hay mắc ở đúng câu này.' },
        ].map((x) => (
          <div key={x.t} className="mm-branch">
            <div style={{ fontSize: 22 }}>{x.i}</div>
            <h5 className="mt2">{x.t}</h5>
            <p className="muted small mb0">{x.d}</p>
          </div>
        ))}
      </div>
      <Note title="✍ Nguyên tắc ngôn ngữ" tone="gold">
        <ul className="mb0">
          <li>Xưng hô với học sinh là <strong>“em”</strong>; không dùng ngôi thứ nhất số ít cho hệ thống.</li>
          <li>Mỗi bước giải là một câu hoàn chỉnh, có căn cứ (“vì …”, “theo định lí …”).</li>
          <li>Kết luận luôn có <strong>đơn vị</strong> và viết thành câu: “Vậy quãng đường AB dài 150 km.”</li>
          <li>Không dùng từ ngữ phủ định năng lực học sinh; lỗi sai được mô tả như một điểm cần chữa.</li>
          <li>Số thập phân dùng dấu phẩy theo chuẩn Việt Nam: <M t="$3{,}14$" /> (không viết 3.14).</li>
        </ul>
      </Note>
    </Card>

    {/* ---------------- MÃ HOÁ ---------------- */}
    <Card className="rule-top">
      <h2>6. Quy tắc đặt mã</h2>
      <div className="table-scroll">
        <table className="table">
          <thead><tr><th>Loại</th><th>Cấu trúc mã</th><th>Ví dụ</th><th>Ý nghĩa</th></tr></thead>
          <tbody>
            <tr><td>Đề luyện thi</td><td><code>MG{'{khối}'}-LD-{'{số}'}</code></td><td><code>MG9-LD-047</code></td><td>Đề luyện thi số 47 khối 9</td></tr>
            <tr><td>Đề cương giữa kỳ</td><td><code>MG{'{khối}'}-GI-{'{số}'}</code></td><td><code>MG7-GI-001</code></td><td>Đề cương giữa kỳ khối 7</td></tr>
            <tr><td>Đề cương cuối kỳ</td><td><code>MG{'{khối}'}-CU-{'{số}'}</code></td><td><code>MG8-CU-002</code></td><td>Đề cương cuối kỳ khối 8</td></tr>
            <tr><td>Đề học sinh giỏi</td><td><code>MG{'{khối}'}-HS-{'{số}'}</code></td><td><code>MG9-HS-007</code></td><td>Đề HSG khối 9</td></tr>
            <tr><td>Chuyên đề</td><td><code>g{'{khối}'}-t{'{thứ tự}'}</code></td><td><code>g9-t3</code></td><td>Chuyên đề 3 khối 9</td></tr>
            <tr><td>Dạng bài</td><td><code>g{'{khối}'}-t{'{cđ}'}-d{'{thứ tự}'}</code></td><td><code>g9-t3-d5</code></td><td>Dạng 5 của chuyên đề 3 khối 9</td></tr>
            <tr><td>Khuôn câu hỏi</td><td><code>g{'{khối}'}.{'{nhãn dạng}'}</code></td><td><code>g9.viete</code></td><td>Khuôn câu hỏi về hệ thức Viète</td></tr>
          </tbody>
        </table>
      </div>
      <Note title="🔒 Nguyên tắc bất biến">
        <p className="mb0">
          Mã đề gắn cố định với một hạt giống sinh câu hỏi. Vì vậy <strong>cùng một mã đề luôn cho đúng
          cùng một bộ câu hỏi</strong> — giáo viên có thể gọi tên đề trong buổi học mà không sợ học sinh
          nhận bản khác. Tuyệt đối không đổi mã của đề đã phát hành.
        </p>
      </Note>
    </Card>
  </div>
);
