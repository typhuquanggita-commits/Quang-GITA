import { useState } from 'react';
import { LIBRARY_TREE, countFolders, countArtifacts, type Folder } from '@/data/library-tree';
import { TIERS } from '@/data/gita';
import { Card, SectionTitle, Badge, Callout } from '@/components/ui';

export default function Library() {
  const [q, setQ] = useState('');
  const total = countFolders(LIBRARY_TREE);
  const artifacts = countArtifacts(LIBRARY_TREE);

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Kiến trúc tài liệu"
        title="Cây thư mục MATH365"
        desc={`${total} thư mục · ${artifacts} đầu tài liệu bổ trợ. Mỗi thư mục có mã, mục đích, vai trò chịu trách nhiệm và danh mục tài liệu — để bất kỳ ai tiếp nhận cũng biết chính xác mình đang cầm cái gì và dùng nó thế nào.`}
      />

      <Callout tone="brand" title="Nguyên tắc tổ chức">
        Ba khối nội dung học thuật (Luồng 1–2–3) đi song song với bốn khối vận hành: đào tạo đội ngũ,
        gia đình, nhà trường và phát triển bản thân. Trong mỗi chuyên đề, tài liệu lại chia tiếp theo
        năm tầng hấp thu — đó là chiều sâu thứ ba của kiến trúc.
      </Callout>

      <Card className="p-4">
        <label className="block">
          <span className="text-[11.5px] font-bold text-slate-600">
            Tìm nhanh theo mã hoặc tên thư mục
          </span>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px]"
            placeholder="10.2, Số học, Gia đình, P4…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </Card>

      <div className="space-y-2">
        {LIBRARY_TREE.map((f) => (
          <FolderNode key={f.code} folder={f} depth={0} query={q.trim().toLowerCase()} />
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-[16px] font-extrabold text-slate-900">
          Chuẩn tài liệu theo tầng hấp thu
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
          Mọi thư mục chuyên đề đều có đủ năm tầng dưới đây. Khi biên soạn tài liệu mới, đây là danh
          mục bắt buộc phải phủ.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-extrabold text-white"
                  style={{ background: t.color }}
                >
                  {t.id}
                </span>
                <span className="text-[13px] font-extrabold text-slate-900">{t.name}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {t.materials.map((m) => (
                  <li key={m} className="text-[12px] leading-relaxed text-slate-600">
                    ❐ {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function matches(f: Folder, q: string): boolean {
  if (!q) return true;
  if (`${f.code} ${f.name} ${f.purpose} ${f.owner}`.toLowerCase().includes(q)) return true;
  return (f.children ?? []).some((c) => matches(c, q));
}

function FolderNode({ folder, depth, query }: { folder: Folder; depth: number; query: string }) {
  const [open, setOpen] = useState(depth === 0 && !query ? false : true);
  if (!matches(folder, query)) return null;
  const hasChildren = !!folder.children?.length;
  const tier = folder.tier ? TIERS.find((t) => t.id === folder.tier) : undefined;

  return (
    <div style={{ marginLeft: depth ? 16 : 0 }}>
      <div
        className={`rounded-xl border bg-white ${
          depth === 0 ? 'border-slate-200 shadow-sm' : 'border-slate-100'
        }`}
      >
        <button
          className="flex w-full items-start gap-3 p-3.5 text-left"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold"
            style={{
              background: tier ? `${tier.color}18` : depth === 0 ? '#eef2ff' : '#f1f5f9',
              color: tier ? tier.color : depth === 0 ? '#4338ca' : '#64748b',
            }}
          >
            {folder.code}
          </span>
          <span className="min-w-0 flex-1">
            <span
              className={`block ${
                depth === 0 ? 'text-[15px] font-extrabold' : 'text-[13.5px] font-bold'
              } text-slate-900`}
            >
              {folder.name}
            </span>
            <span className="mt-0.5 block text-[12px] leading-relaxed text-slate-600">
              {folder.purpose}
            </span>
            <span className="mt-1.5 flex flex-wrap gap-1.5">
              <Badge>Phụ trách: {folder.owner}</Badge>
              {folder.cadence && <Badge tone="brand">{folder.cadence}</Badge>}
              {hasChildren && <Badge>{folder.children!.length} thư mục con</Badge>}
              <Badge tone="green">{folder.artifacts.length} tài liệu</Badge>
            </span>
          </span>
          <span className="mt-1 shrink-0 text-slate-400">{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div className="border-t border-slate-100 px-3.5 py-3">
            <ul className="space-y-1">
              {folder.artifacts.map((a) => (
                <li key={a} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-700">
                  <span className="text-slate-300">❐</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {open && hasChildren && (
        <div className="mt-1.5 space-y-1.5 border-l-2 border-slate-100 pl-1">
          {folder.children!.map((c) => (
            <FolderNode key={c.code} folder={c} depth={depth + 1} query={query} />
          ))}
        </div>
      )}
    </div>
  );
}
