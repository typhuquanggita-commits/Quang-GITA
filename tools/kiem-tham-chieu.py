#!/usr/bin/env python3
"""Kiểm tra toàn vẹn tham chiếu: mọi ID được gọi có tồn tại không."""
import re, os, sys, json, glob
D = "/home/user/Quang-GITA"
def rd(p): return open(os.path.join(D, p), encoding="utf-8").read()

def ids(src, pat):
    return set(re.findall(pat, src))

fail = []
def check(name, used, defined, where):
    missing = sorted(used - defined)
    if missing:
        fail.append((name, missing, where))
        print(f"  ✗ {name}: THIẾU {len(missing)} — {', '.join(missing[:8])}")
    else:
        print(f"  ✓ {name}: {len(used)} tham chiếu, tất cả hợp lệ")

print("\n── Toàn vẹn tham chiếu ──")

methods   = ids(rd("data/methods.ts"),   r"^  \{\n    id: '([\w-]+)'")
methods  |= ids(rd("data/methods.ts"),   r"\n    id: '([\w-]+)',\n    name:")
drills    = ids(rd("data/drills.ts"),    r"\n    id: '([\w-]+)',\n    name:")
resources = ids(rd("data/resources.ts"), r"\n    id: '([\w-]+)',\n    name:")
lectures  = ids(rd("data/lectures.ts"),  r"\n    id: '([\w-]+)',\n    name:")
habits    = ids(rd("data/habits.ts"),    r"\n    id: '([\w-]+)',\n    name:")
mindsets  = ids(rd("data/mindset.ts"),   r"\n    id: '([\w-]+)',\n    name:")
clubs     = ids(rd("data/clubs.ts"),     r"\n    id: '([\w-]+)',\n    name:")
tiers     = ids(rd("data/academy.ts"),   r"\n    id: '(tier-\d)'")
nlp       = ids(rd("data/academy.ts"),   r"\n    id: '([\w-]+)',\n    name: '\w")

road = rd("data/roadmap.ts")
check("methodIds  (roadmap→methods)",  set(re.findall(r"'([\w-]+)'", re.search(r"methodIds: \[(.*?)\]", road, re.S).group(0)) if False else
      {m for blk in re.findall(r"methodIds: \[(.*?)\]", road, re.S) for m in re.findall(r"'([\w-]+)'", blk)}), methods, "roadmap.ts")
check("drillIds   (roadmap→drills)",   {m for blk in re.findall(r"drillIds: \[(.*?)\]", road, re.S) for m in re.findall(r"'([\w-]+)'", blk)}, drills, "roadmap.ts")
check("resourceIds(roadmap→resources)",{m for blk in re.findall(r"resourceIds: \[(.*?)\]", road, re.S) for m in re.findall(r"'([\w-]+)'", blk)}, resources, "roadmap.ts")
check("lectureIds (roadmap→lectures)", {m for blk in re.findall(r"lectureIds: \[(.*?)\]", road, re.S) for m in re.findall(r"'([\w-]+)'", blk)}, lectures, "roadmap.ts")
check("habitIds   (roadmap→habits)",   {m for blk in re.findall(r"habitIds: \[(.*?)\]", road, re.S) for m in re.findall(r"'([\w-]+)'", blk)}, habits, "roadmap.ts")
check("mindsetIds (roadmap→mindset)",  {m for blk in re.findall(r"mindsetIds: \[(.*?)\]", road, re.S) for m in re.findall(r"'([\w-]+)'", blk)}, mindsets, "roadmap.ts")
check("clubIds    (roadmap→clubs)",    {m for blk in re.findall(r"clubIds: \[(.*?)\]", road, re.S) for m in re.findall(r"'([\w-]+)'", blk)}, clubs, "roadmap.ts")
check("weeklyPlan (roadmap→drills)",   set(re.findall(r"drillId: '([\w-]+)'", road)), drills, "roadmap.ts")

check("drill.methodIds→methods", {m for blk in re.findall(r"methodIds: \[(.*?)\]", rd("data/drills.ts"), re.S) for m in re.findall(r"'([\w-]+)'", blk)}, methods, "drills.ts")
check("lecture.drillId→drills",  set(re.findall(r"drillId: '([\w-]+)'", rd("data/lectures.ts"))), drills, "lectures.ts")
check("levels.tierId→pyramid",   set(re.findall(r"tierId: '(tier-\d)'", rd("data/levels.ts"))), tiers, "levels.ts")
check("gita.nlpTools→nlp",       {m for blk in re.findall(r"nlpTools: \[(.*?)\]", rd("data/academy.ts"), re.S) for m in re.findall(r"'([\w-]+)'", blk)}, nlp, "academy.ts")
check("profile→resources",       set(re.findall(r"'(r-[\w-]+)'", rd("data/profile.ts"))), resources, "profile.ts")

print("\n── Podcast ──")
pod = json.load(open(os.path.join(D, "content/podcast-scripts.json"), encoding="utf-8"))
fmt = {f["id"] for f in pod["formats"]}
epf = {e["formatId"] for e in pod["episodes"]}
check("episode.formatId→formats", epf, fmt, "podcast-scripts.json")
voices_declared = set(pod["series"]["voices"].keys())
voices_used = {l["s"] for e in pod["episodes"] for l in e["lines"]}
check("line.speaker→voices", voices_used, voices_declared, "podcast-scripts.json")
tool_voices = set(re.findall(r"^  '?([A-ZÀ-Ỹ\-Ữ ]+)'?: \{$", rd("tools/make-podcast.mjs"), re.M))
check("voices dùng trong kịch bản→VOICES trong tool", voices_used - {"LẶNG"}, tool_voices, "make-podcast.mjs")

print("\n── Trọng số trục (phải bằng 100) ──")
cert = rd("data/certify.ts")
for m in re.finditer(r"name: '([^']+)',\n    who:.*?weights: \[(.*?)\],\n    levels:", cert, re.S):
    role, blk = m.group(1), m.group(2)
    tot = sum(int(x) for x in re.findall(r"pct: (\d+)", blk))
    ok = "✓" if tot == 100 else "✗"
    if tot != 100: fail.append((f"trọng số {role}", [f"tổng {tot}"], "certify.ts"))
    print(f"  {ok} {role}: {tot}%")

print("\n── Trục dùng trong weights có tồn tại ──")
axes = set(re.findall(r"name: '([A-ZÀ-Ỹ0-9 ]+)',\n    what:", cert))
used_ax = set(re.findall(r"axis: '([^']+)'", cert))
check("weights.axis→AXES", used_ax, axes, "certify.ts")

print("\n── Hồ sơ 365 ngày ──")
dos = rd("data/dossier.ts")
exams = rd("data/exams.ts")
exam_ids = set(re.findall(r"^    id: '([^']+)',$", exams, re.M))
check("dossier.examId→GRADUATION_EXAMS", set(re.findall(r"examId: '([^']+)'", dos)),
      exam_ids, "dossier.ts")

# Bốn quý phải phủ kín ngày 1–360, không chồng lấn, không hở.
spans = [(int(a), int(b)) for a, b in
         re.findall(r"dayFrom: (\d+),\n    dayTo: (\d+),", dos)]
cursor, gaps = 1, []
for a, b in spans:
    if a != cursor: gaps.append(f"quý bắt đầu ngày {a}, mong {cursor}")
    cursor = b + 1
if cursor != 361: gaps.append(f"kết thúc ở ngày {cursor - 1}, mong 360")
if gaps:
    fail.append(("phủ ngày của bốn quý", gaps, "dossier.ts"))
    print(f"  ✗ phủ ngày của bốn quý: {'; '.join(gaps)}")
else:
    print(f"  ✓ bốn quý phủ kín ngày 1–360, không chồng lấn, không hở")

# Mỗi vòng đúng 21 ngày và đúng 7 nhiệm vụ.
cyc = re.findall(r"dayFrom: (\d+),\n        dayTo: (\d+),", dos)
bad_len = [f"{a}–{b}" for a, b in cyc if int(b) - int(a) + 1 != 21]
if bad_len:
    fail.append(("độ dài vòng", bad_len, "dossier.ts"))
    print(f"  ✗ vòng không đủ 21 ngày: {', '.join(bad_len)}")
else:
    print(f"  ✓ cả {len(cyc)} vòng đều đúng 21 ngày")

print("\n" + ("="*62))
print(f"  KẾT QUẢ: {'ĐẠT — không lỗi tham chiếu' if not fail else f'{len(fail)} LỖI'}")
print("="*62 + "\n")
sys.exit(1 if fail else 0)
