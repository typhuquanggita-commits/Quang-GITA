import { GITA_PILLARS } from '../../data/gita';
import { GitaLogo, GitaMark, BrandLockup } from '../../brand/Logo';
import {
  BRAND_COLORS,
  BRAND_RULES,
  DOCUMENT_KINDS,
  FONT_STACKS,
  MARK_MEANING,
  PRINT_TYPE_SCALE,
} from '../../brand/tokens';
import { DocumentShell } from '../../components/DocumentShell';
import { Badge, Card, CardHeader } from '../../components/ui/primitives';

/**
 * SACH THUONG HIEU SONG
 *
 * Man hinh nay in ra dung cac gia tri ma ma nguon dang dung — cung nguyen tac
 * voi man hinh Phan quyen. Mot bo nhan dien nam trong tep PDF rieng se lech
 * khoi san pham trong vong vai thang; mot bo nhan dien doc thang tu ma nguon
 * thi khong the lech.
 */
export function BrandPage() {
  return (
    <div className="space-y-8">
      <header>
        <Badge tone="brand">Nhận diện</Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Bộ nhận diện HSA365 · GITA</h1>
        <p className="mt-2 max-w-3xl text-sm text-fg-muted">
          Một bộ nhận diện không phải là một tệp logo. Nó là tập các{' '}
          <strong className="text-fg">quyết định đã chốt kèm lý do</strong>, để lần sau không ai phải chốt lại.
          Mọi giá trị dưới đây đọc thẳng từ mã nguồn đang chạy.
        </p>
      </header>

      <Card>
        <CardHeader
          title="Dấu hiệu"
          subtitle="Ba vệt cong đồng tâm và một cụm sao. Mỗi vệt dựng bằng hai cung elip lồng nhau có tâm lệch — chính độ lệch ấy tạo ra độ thon ở hai đầu mà một nét dày đều không bao giờ có."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <figure className="rounded-xl border border-line bg-white p-6">
            <GitaLogo className="h-24 w-full" />
            <figcaption className="mt-3 text-xs text-fg-muted">Đủ màu, trên nền sáng</figcaption>
          </figure>
          <figure className="rounded-xl border border-line bg-gita-blue-800 p-6 text-white">
            <GitaLogo mono className="h-24 w-full" />
            <figcaption className="mt-3 text-xs opacity-80">Một màu, trên nền đậm</figcaption>
          </figure>
          <figure className="rounded-xl border border-line bg-surface-2 p-6">
            <div className="flex h-24 items-center">
              <BrandLockup />
            </div>
            <figcaption className="mt-3 text-xs text-fg-muted">
              Khóa nhận diện sản phẩm. GITA đứng trước, HSA365 đứng sau — HSA365 là một chương trình trong hệ
              GITA, không phải một thương hiệu độc lập mượn logo.
            </figcaption>
          </figure>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Bốn phần tử, bốn trụ cột"
          subtitle="Ánh xạ này để người học nhìn dấu hiệu là nhớ được mô thức, thay vì phải học thuộc bốn chữ cái."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {MARK_MEANING.map((item) => {
            const pillar = GITA_PILLARS.find((p) => p.id === item.pillar);
            return (
              <div key={item.element} className="rounded-xl border border-line bg-surface-2 p-4">
                <div className="flex items-center gap-2">
                  <span
                    className="size-3.5 shrink-0 rounded-full"
                    style={{ background: `var(${item.colorToken.replace('--gita', '--color-gita')})` }}
                  />
                  <h3 className="text-sm font-semibold text-fg">{item.element}</h3>
                  <Badge>
                    {pillar?.letter} — {pillar?.name}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-fg-muted">{item.meaning}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Bảng màu"
          subtitle="Lấy trực tiếp từ logo. Tỉ lệ tương phản tính theo WCAG 2.1 và có bài test canh giữ — đổi một mã màu làm tụt dưới ngưỡng sẽ làm đỏ test, không phải đợi ai đó tình cờ nhìn ra."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                <th scope="col" className="px-2 py-2">Màu</th>
                <th scope="col" className="px-2 py-2">Vai trò</th>
                <th scope="col" className="px-2 py-2 text-right">Trên nền trắng</th>
                <th scope="col" className="px-2 py-2 text-right">Trên nền tối</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_COLORS.map((color) => (
                <tr key={color.token} className="border-b border-line/60">
                  <th scope="row" className="px-2 py-2 font-normal">
                    <span className="flex items-center gap-2">
                      <span
                        className="size-8 shrink-0 rounded-lg border border-line"
                        style={{ background: color.hex }}
                      />
                      <span>
                        <span className="block text-fg">{color.name}</span>
                        <span className="doc-code">{color.hex}</span>
                      </span>
                    </span>
                  </th>
                  <td className="px-2 py-2 text-fg-muted">{color.role}</td>
                  <td className="px-2 py-2 text-right tabular-nums">
                    <ContrastCell value={color.onWhite} />
                  </td>
                  <td className="px-2 py-2 text-right tabular-nums">
                    <ContrastCell value={color.onDark} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-fg-subtle">
          Ngưỡng: từ 4,5:1 dùng được cho chữ thường; từ 3:1 chỉ dùng cho chữ lớn và đồ họa; dưới 3:1 không dùng
          cho thứ mang thông tin.
        </p>
      </Card>

      <Card>
        <CardHeader
          title="Hệ chữ"
          subtitle="Không nạp phông chữ từ Internet. Chính sách bảo mật của trang chỉ cho phép font-src 'self', và toàn bộ ứng dụng phải chạy được khi mất mạng — một bộ nhận diện phụ thuộc phông tải về sẽ vô hiệu đúng lúc người học cần nó nhất: trong phòng thi thử offline, hoặc khi in ở một máy không có mạng."
        />
        <dl className="mb-5 grid gap-3 sm:grid-cols-3">
          {Object.entries(FONT_STACKS).map(([name, stack]) => (
            <div key={name} className="rounded-xl border border-line bg-surface-2 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">{name}</dt>
              <dd className="mt-1 text-xs text-fg-muted" style={{ fontFamily: stack }}>
                Đủ dấu tiếng Việt: ườ ẫ ộ ỹ ặ — 0123456789
              </dd>
            </div>
          ))}
        </dl>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                <th scope="col" className="px-2 py-2">Bậc</th>
                <th scope="col" className="px-2 py-2">Dùng ở đâu</th>
                <th scope="col" className="px-2 py-2 text-right">Cỡ</th>
                <th scope="col" className="px-2 py-2 text-right">Dãn dòng</th>
              </tr>
            </thead>
            <tbody>
              {PRINT_TYPE_SCALE.map((step) => (
                <tr key={step.name} className="border-b border-line/60">
                  <th scope="row" className="px-2 py-2 font-normal text-fg" style={{ fontWeight: step.weight }}>
                    {step.name}
                  </th>
                  <td className="px-2 py-2 text-fg-muted">{step.usage}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{step.size}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{step.lineHeight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Năm loại tài liệu"
          subtitle="Mã tiền tố vừa là mã tra cứu vừa là thứ nhận diện: nhìn hai chữ cái đầu là biết đang cầm thứ gì."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOCUMENT_KINDS.map((doc) => (
            <div key={doc.code} className="rounded-xl border border-line bg-surface-2 p-4">
              <span className="doc-code text-base font-semibold text-brand">{doc.code}</span>
              <h3 className="mt-1 text-sm font-semibold text-fg">{doc.name}</h3>
              <p className="mt-1 text-xs text-fg-muted">{doc.purpose}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Khung tài liệu mẫu"
          subtitle="Mọi tài liệu phát ra ngoài đều đi qua khung này. Mã tài liệu xuất hiện hai lần: đầu trang để nhận ra ngay, chân trang để còn đọc được khi tờ giấy bị gấp đôi."
        />
        <div className="rounded-xl border border-line bg-surface p-6">
          <DocumentShell
            kind="LG"
            code="LG-TOA-ARI-L3-004"
            title="Số học & tỉ lệ phần trăm — Cấp 3"
            subtitle="Phiếu lời giải kèm bảng phân tích chuyên sâu"
            meta={
              <>
                Phần Toán học
                <br />
                12 câu · 15 phút
              </>
            }
          >
            <p className="text-sm text-fg-muted">
              Nội dung tài liệu nằm ở đây. Khung chỉ lo phần nhận diện và phần tra cứu; nó không bao giờ đụng vào
              nội dung chuyên môn.
            </p>
          </DocumentShell>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Quy tắc dùng"
          subtitle="Mỗi quy tắc đều có lý do. Một quy tắc không giải thích được lý do sẽ bị phá ngay lần đầu có người vội — và đúng ra là nên bị phá."
        />
        <ol className="space-y-4">
          {BRAND_RULES.map((item, i) => (
            <li key={item.rule} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-soft text-xs font-semibold text-brand">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-fg">{item.rule}</p>
                <p className="mt-1 text-sm text-fg-muted">{item.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="border-dashed">
        <CardHeader title="Về phần chữ trong dấu hiệu" />
        <div className="flex flex-wrap items-center gap-6">
          <GitaMark className="h-16 w-auto" />
          <p className="min-w-0 flex-1 text-sm text-fg-muted">
            Ba vệt cong và cụm sao là vector dựng lại chính xác và dùng được ở mọi cỡ. Riêng chữ{' '}
            <strong className="text-fg">GITA</strong> đang dùng phông chữ hệ thống, không phải phông gốc của
            logo. Khi có tệp vector gốc của thương hiệu, hãy thay phần chữ đó bằng đường dẫn chữ thật —{' '}
            <span className="doc-code">src/brand/Logo.tsx</span> và{' '}
            <span className="doc-code">public/logo-gita.svg</span>. Mọi thứ còn lại của bộ nhận diện không phụ
            thuộc vào việc đó.
          </p>
        </div>
      </Card>
    </div>
  );
}

function ContrastCell({ value }: { value: number }) {
  const tone = value >= 4.5 ? 'ok' : value >= 3 ? 'warn' : 'neutral';
  const label = value >= 4.5 ? 'chữ thường' : value >= 3 ? 'chữ lớn' : 'chỉ trang trí';
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-fg">{value.toFixed(2)}:1</span>
      <Badge tone={tone}>{label}</Badge>
    </span>
  );
}
