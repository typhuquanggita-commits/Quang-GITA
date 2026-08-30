# -*- coding: utf-8 -*-
"""Sinh các PHẦN CÓ CẤU TRÚC của phiếu — những phần không phải là bài luyện.

Phiếu Lý thuyết, Dạng bài & Đọc vị, Kỹ năng & Phương pháp có nhiều phần mà nội
dung chính **là bản thân hệ thống kiến thức của chương**: sơ đồ tư duy, bảng dạng
bài và dấu hiệu nhận biết, kỹ năng trình bày, kịch bản thuyết trình. Những phần
này được dựng thẳng từ dữ liệu của cụm và từ hồ sơ mẫu bài của nhóm chuyên đề,
chứ không rút bài từ ngân hàng — nhờ vậy phiếu Lý thuyết nói đúng về chương của
nó thay vì lắp bài của chương khác vào.
"""
from __future__ import annotations

import random
import sys
from pathlib import Path

CC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(CC))

from sinh.khung import KHO, Bai                   # noqa: E402

sys.path.insert(0, str(CC / "data"))
from so_do_doc_vi import CAU_MO, CAY, CHOT, DOC_NHAM   # noqa: E402


def cay_goi_y(g: str) -> str:
    """Cây quyết định đọc vị của nhóm, viết gọn thành khối mã trong phiếu."""
    L = ["```", f"ĐỌC ĐỀ → {CAU_MO.get(g, '').replace('**', '')}"]
    for i, (hoi, dung, _sai) in enumerate(CAY.get(g, []), 1):
        L.append(f"{i}. {hoi.replace('**', '')}")
        L.append(f"     ĐÚNG → {dung.replace('**', '').lstrip('→ ')}")
    L.append("```")
    return "\n".join(L)


def ho_so_cum(rng: random.Random, nhom: str, lop: int, so: int = 12) -> list[Bai]:
    """Một bộ bài đại diện của nhóm chuyên đề, dùng làm nguyên liệu cho các phần
    có cấu trúc: mỗi bài cho một dạng bài, một dấu hiệu, một phương pháp, một lỗi."""
    mau = [x for m in ("M1", "M2", "M3", "M4", "M5")
           for x in KHO.get(nhom, {}).get(m, []) if lop in x.lop]
    if not mau:
        mau = [x for g in KHO for m in KHO[g] for x in KHO[g][m] if lop in x.lop]
    rng.shuffle(mau)
    return [x.tao(rng, lop) for x in mau[:so]]


def _lay(ds: list, i: int):
    return ds[i % len(ds)]


def _bai(tieu_de, dan, y, huong_giai, td, diem_chot, loi, phong,
         pt_dang, pt_kien_thuc, pt_du_lieu, pt_phuong_phap, pt_nhanh,
         tuong_tu, goi_y=None) -> Bai:
    return Bai(tieu_de=tieu_de, dan=dan, y=y, huong_giai=huong_giai, td=td,
               diem_chot=diem_chot, loi=loi, phong=phong,
               goi_y=goi_y or ("Đọc lại phần đầu phiếu và bảng dạng bài.",
                               "Trả lời bằng chính lời của em, không chép nguyên văn.",
                               "So lại với bảng tổng hợp cuối phiếu để tự chấm."),
               pt_dang=pt_dang, pt_kien_thuc=pt_kien_thuc, pt_du_lieu=pt_du_lieu,
               pt_phuong_phap=pt_phuong_phap, pt_nhanh=pt_nhanh, tuong_tu=tuong_tu,
               nhom="", muc="M1", ma_mau="META")


# ══════════════════════ LT — phần B: WHY – WHAT ══════════════════════

def lt_why_what(rng, row, hs) -> list[Bai]:
    dang = row["dang_bai"]
    cum, nhom_ten = row["cum_ten"], row["nhom_ten"]
    ra = []
    ra.append(_bai(
        "Vì sao phải học chương này",
        f"Chương **{cum}** thuộc nhóm chuyên đề **{row['nhom_ma']} — {nhom_ten}**.",
        [("Chương này có tên đầy đủ là gì?", cum),
         ("Chương này thuộc nhóm chuyên đề nào?", f"{row['nhom_ma']} — {nhom_ten}"),
         ("Chương này gồm bao nhiêu dạng bài chính?", str(len(dang))),
         ("Nếu không học chắc chương này, em sẽ mất điểm ở đâu trong đề thi?",
          "ở mọi bài thuộc " + nhom_ten.lower() + ", vì các chương sau đều dùng lại nền này"),
         ("Chương này học xong thì dùng được vào việc gì?",
          "giải nhanh và chắc các bài " + dang[0].lower())],
        "Trả lời bằng cách đọc lại phần đầu phiếu và bảng dạng bài ở mục sau. "
        "Mỗi câu chỉ cần một dòng, nhưng phải đúng tên gọi.",
        ["TD1"], "Gọi đúng **tên chương** và **tên nhóm chuyên đề** là bước đầu tiên "
                 "để xếp kiến thức vào đúng ngăn trong đầu.",
        "Trả lời chung chung “để học giỏi toán”.",
        "Bắt buộc nhắc tên chương và tên nhóm chuyên đề trong câu trả lời.",
        "Định vị chương trong hệ thống", "Tên chương, nhóm chuyên đề, số dạng bài",
        "Phần đầu phiếu ghi rõ tên cụm và nhóm chuyên đề",
        "Đọc phần đầu phiếu rồi trả lời theo đúng tên gọi",
        "Ghi tên chương ra góc vở, mỗi lần mở vở là đọc lại một lần.",
        (f"Chương “{cum}” thuộc nhóm chuyên đề nào?", f"{row['nhom_ma']} — {nhom_ten}")))

    ra.append(_bai(
        "Chương này học những gì",
        "Liệt kê lại các dạng bài chính của chương.",
        [(f"Dạng bài thứ {i + 1} của chương là gì?", d) for i, d in enumerate(dang[:8])],
        "Chép lại đúng tên từng dạng bài theo thứ tự trong bảng dạng bài. "
        "Thứ tự này cũng là thứ tự học trong cụm.",
        ["TD1", "TD3"], "Biết chương có **bao nhiêu dạng** thì mới biết mình còn thiếu dạng nào.",
        "Kể thiếu dạng bài, hoặc gộp hai dạng làm một.",
        "Đếm số dạng trước khi kể, kể xong đếm lại.",
        "Liệt kê dạng bài của chương", "Danh mục dạng bài",
        "Bảng dạng bài ở phiếu Dạng bài & Đọc vị của cùng cụm",
        "Chép theo bảng, giữ nguyên thứ tự",
        "Học thuộc số lượng dạng bài trước, tên từng dạng sau.",
        ("Chương này có mấy dạng bài chính?", str(len(dang)))))

    ra.append(_bai(
        "Chương này nối với chương nào",
        "Trả lời ngắn gọn về vị trí của chương trong cả năm học.",
        [("Chương này nằm ở học kỳ nào?", row["hoc_ky"]),
         ("Chương này học vào tuần thứ mấy?", f"tuần {row['tuan']}"),
         ("Mốc kiểm tra gần nhất sau chương này là mốc nào?",
          row.get("moc_kiem_tra") or "cuối kỳ"),
         ("Chương này là cụm thứ mấy trong năm?", f"cụm {row['cum']}"),
         ("Cụm này gồm mấy buổi học?", "6 buổi: LT · DB · KN · NC · OT · TH")],
        "Nhìn phần đầu phiếu: dòng thứ hai ghi tuyến, lớp, tuần, học kỳ và mốc "
        "kiểm tra; dòng thứ ba ghi số cụm và số buổi.",
        ["TD1"], "Biết chương nằm ở đâu trong năm thì mới **ôn đúng lúc**.",
        "Không nhớ mốc kiểm tra nên ôn muộn.",
        "Ghi mốc kiểm tra vào lịch học ngay buổi đầu của cụm.",
        "Định vị chương theo thời gian", "Kế hoạch năm học, mốc kiểm tra",
        "Phần đầu phiếu ghi tuần, học kỳ, mốc",
        "Đọc phần đầu phiếu", "Mỗi cụm luôn có đúng 6 buổi và 1 phiếu hướng dẫn ôn chắc.",
        ("Một cụm chuyên đề GITA gồm mấy buổi học?", "6 buổi")))

    ra.append(_bai(
        "Từ khoá của chương",
        "Mỗi dạng bài có những từ khoá riêng. Ghi lại từ khoá em nhận ra.",
        [(f"Nêu một dấu hiệu nhận biết của dạng “{_lay(hs, i).pt_dang}”.",
          _lay(hs, i).pt_du_lieu) for i in range(min(6, max(4, len(hs))))],
        "Dấu hiệu nhận biết là những chữ có mặt trong đề bài, không phải là cách giải. "
        "Đọc lại cột “Dữ liệu nhận biết” trong bảng phân tích chuyên sâu.",
        ["TD2"], "Dấu hiệu nằm ở **chữ trong đề**, không nằm ở phép tính.",
        "Trả lời bằng cách giải thay vì bằng dấu hiệu.",
        "Tự hỏi: em nhìn thấy chữ gì trong đề thì biết đây là dạng này?",
        "Nhận diện dạng bài qua từ khoá", "Bảng dạng bài và dấu hiệu nhận biết",
        "Cột “Dữ liệu nhận biết” của bảng phân tích chuyên sâu",
        "Đọc đề, gạch chân từ khoá, đối chiếu bảng",
        "Gạch chân từ khoá ngay khi đọc đề lần đầu.",
        ("Thấy cụm “có tất cả … và … hơn …” thì đó là dạng gì?",
         "bài toán tổng – hiệu")))

    ra.append(_bai(
        "Mục tiêu của riêng em",
        "Tự đặt mục tiêu cho chương này. Câu trả lời của mỗi bạn có thể khác nhau.",
        [("Em đặt mục tiêu đạt bao nhiêu điểm ở phiếu thi cuối cụm?",
          "tự ghi, chuẩn đóng cụm là từ 80/100"),
         ("Dạng bài nào em thấy khó nhất khi mới đọc?", "tự ghi"),
         ("Em sẽ làm gì khi gặp bài không giải được trong 8 phút?",
          "đọc gợi ý tầng 1, sau đó tầng 2, không xem lời giải ngay"),
         ("Em sẽ ôn lại chương này vào lúc nào trong tuần?", "tự ghi"),
         ("Ai là bạn cùng nhóm em sẽ giảng lại chương này cho?", "tự ghi")],
        "Đây là phần cam kết cá nhân, không có đáp án đúng sai. Huấn luyện viên "
        "chỉ chấm mức độ cụ thể của câu trả lời.",
        ["TD1"], "Mục tiêu phải **đo được**: có con số và có mốc thời gian.",
        "Viết mục tiêu chung chung như “cố gắng hơn”.",
        "Bắt buộc mỗi mục tiêu có một con số hoặc một mốc thời gian.",
        "Cam kết mục tiêu cá nhân", "Mô thức G-I-T-A, khối G và khối A",
        "Câu hỏi mở, học viên tự trả lời",
        "Viết mục tiêu có số và có mốc thời gian",
        "Mục tiêu ghi ra giấy có tỉ lệ hoàn thành cao hơn hẳn mục tiêu chỉ nghĩ trong đầu.",
        ("Mục tiêu “học chăm hơn” đã đo được chưa?",
         "chưa, phải ghi rõ số buổi và số phiếu")))
    return ra


# ══════════════════════ LT — phần C: SƠ ĐỒ TƯ DUY CHƯƠNG ══════════════════════

def lt_so_do(rng, row, hs) -> list[Bai]:
    dang = row["dang_bai"]
    ra = []
    ra.append(_bai(
        "Ô 1 và ô 2 — tên chương và nội dung chính",
        "Điền vào sơ đồ tư duy chương (vẽ ở giữa trang, toả ra bảy nhánh).",
        [("Ô trung tâm: tên chương là gì?", row["cum_ten"]),
         ("Nhánh 1: nhóm chuyên đề của chương?",
          f"{row['nhom_ma']} — {row['nhom_ten']}"),
         ("Nhánh 2: chương gồm mấy nội dung chính?", str(len(dang))),
         ("Kể tên nội dung chính thứ nhất.", dang[0]),
         ("Kể tên nội dung chính cuối cùng.", dang[-1])],
        "Vẽ ô trung tâm trước, rồi toả ra bảy nhánh: tên chương · nội dung chính · "
        "công thức và định nghĩa · hình vẽ minh hoạ · bài tập minh hoạ · dạng bài và "
        "dấu hiệu nhận biết · phương pháp ghi điểm 10.",
        ["TD3"], "Sơ đồ phải có **đủ bảy nhánh**; thiếu nhánh nào là hổng phần ấy.",
        "Vẽ sơ đồ thành danh sách gạch đầu dòng, mất tính liên kết.",
        "Bắt buộc vẽ toả từ tâm, mỗi nhánh một màu.",
        "Lập sơ đồ tư duy chương", "Hệ thống hoá kiến thức",
        "Yêu cầu “điền khuyết sơ đồ tư duy”",
        "Vẽ tâm trước, toả nhánh sau, mỗi nhánh một từ khoá",
        "Chỉ ghi **từ khoá** trên nhánh, không ghi cả câu.",
        ("Sơ đồ tư duy chương GITA có mấy nhánh bắt buộc?", "7 nhánh")))

    ct = [b for b in hs if b.pt_kien_thuc]
    ra.append(_bai(
        "Ô 3 — công thức và định nghĩa phải thuộc",
        "Điền các công thức, quy tắc bắt buộc của chương.",
        [(f"Công thức hoặc quy tắc dùng cho dạng “{_lay(ct, i).pt_dang}”?",
          _lay(ct, i).pt_kien_thuc) for i in range(min(6, max(4, len(ct))))],
        "Mỗi dạng bài có một công thức hoặc một quy tắc gốc. Chép lại từ cột "
        "“Kiến thức liên quan” của bảng phân tích chuyên sâu.",
        ["TD1", "TD3"], "Công thức phải **thuộc lòng**, không tra sách khi làm bài.",
        "Nhớ công thức nhưng không nhớ nó dùng cho dạng nào.",
        "Luôn viết công thức kèm tên dạng bài đi cùng nó.",
        "Bảng công thức của chương", "Công thức và quy tắc gốc",
        "Cột “Kiến thức liên quan” của bảng phân tích",
        "Ghép cặp công thức với dạng bài",
        "Học công thức theo cặp “dạng bài – công thức”, không học rời.",
        ("Công thức nào dùng cho bài toán tổng – hiệu?",
         "Số lớn = (Tổng + Hiệu) : 2")))

    ra.append(_bai(
        "Ô 4 và ô 5 — hình vẽ và bài tập minh hoạ",
        "Với mỗi dạng bài, chọn một cách minh hoạ.",
        [(f"Dạng “{_lay(hs, i).pt_dang}” nên minh hoạ bằng hình vẽ hay bằng bảng?",
          _lay(hs, i).pt_phuong_phap) for i in range(min(5, max(4, len(hs))))],
        "Dạng nào có quan hệ hơn kém thì vẽ sơ đồ đoạn thẳng; dạng nào có nhiều "
        "trường hợp thì kẻ bảng; dạng nào về hình thì vẽ hình và ghi số đo lên hình.",
        ["TD3"], "Chọn đúng **kiểu minh hoạ** giúp nhìn ra lời giải nhanh hơn hẳn.",
        "Dạng nào cũng vẽ sơ đồ đoạn thẳng, kể cả bài đếm.",
        "Hỏi trước: bài này có quan hệ hơn kém, có nhiều trường hợp, hay có hình?",
        "Chọn cách minh hoạ theo dạng bài", "Sơ đồ đoạn thẳng, bảng, hình vẽ",
        "Cột “Phương pháp áp dụng” của bảng phân tích",
        "Đối chiếu dạng bài với kiểu minh hoạ phù hợp",
        "Bài có quan hệ hơn kém → sơ đồ đoạn thẳng. Bài nhiều trường hợp → bảng.",
        ("Bài toán tổng – hiệu nên minh hoạ bằng gì?", "sơ đồ đoạn thẳng")))

    ra.append(_bai(
        "Ô 6 — dạng bài và dấu hiệu nhận biết",
        "Ghép mỗi dạng bài với dấu hiệu nhận biết của nó.",
        [(f"Dấu hiệu nào cho biết đề thuộc dạng “{_lay(hs, i).pt_dang}”?",
          _lay(hs, i).pt_du_lieu) for i in range(min(6, max(4, len(hs))))],
        "Dấu hiệu nhận biết luôn là **chữ có trong đề**: một cụm từ khoá, một kiểu "
        "dữ kiện, hoặc một cách hỏi.",
        ["TD2"], "Đọc vị được đề là **đã đi được nửa đường**.",
        "Lẫn dấu hiệu nhận biết với phương pháp giải.",
        "Dấu hiệu trả lời câu “thấy gì?”, phương pháp trả lời câu “làm gì?”.",
        "Bảng dạng bài – dấu hiệu", "Đọc vị đề bài",
        "Cột “Dữ liệu nhận biết”", "Ghép cặp dạng bài với dấu hiệu",
        "Gạch chân từ khoá ngay lần đọc đề đầu tiên.",
        ("“Trung bình mỗi ngày…” là dấu hiệu của dạng nào?", "trung bình cộng")))

    ra.append(_bai(
        "Ô 7 — phương pháp ghi điểm 10",
        "Ghi lại cách xử lý nhanh nhất của từng dạng.",
        [(f"Cách xử lý nhanh nhất của dạng “{_lay(hs, i).pt_dang}” là gì?",
          _lay(hs, i).pt_nhanh) for i in range(min(6, max(4, len(hs))))],
        "Cách xử lý nhanh nhất thường là một nhận xét giúp bỏ bớt một hai bước tính. "
        "Chép lại từ cột “Cách xử lý nhanh nhất”.",
        ["TD5", "TD6"], "Điểm 10 đến từ **mẹo đúng bản chất**, không phải mẹo học vẹt.",
        "Dùng mẹo mà không hiểu vì sao đúng nên áp dụng sai chỗ.",
        "Với mỗi mẹo, viết thêm một dòng “mẹo này đúng vì …”.",
        "Bảng phương pháp ghi điểm 10", "Kỹ thuật rút gọn lời giải",
        "Cột “Cách xử lý nhanh nhất”", "Ghi nhớ mẹo kèm lý do đúng",
        "Mẹo nào cũng phải kiểm chứng được bằng một ví dụ nhỏ.",
        ("Tổng dãy cách đều tính nhanh bằng cách nào?",
         "(đầu + cuối) × số số hạng : 2")))
    return ra


# ══════════════════════ LT — phần D: HỆ THỐNG LÝ THUYẾT THEO KEY ══════════════════════

def lt_theo_key(rng, row, hs) -> list[Bai]:
    ra = []
    for i in range(5):
        b = _lay(hs, i)
        ra.append(_bai(
            f"Key {i + 1} — {b.pt_dang}",
            f"**Phát biểu:** {b.pt_kien_thuc}. **Ví dụ mẫu:** {b.tuong_tu[0]} "
            f"→ {b.tuong_tu[1]}.",
            [("Phát biểu lại key này bằng lời của em.", b.pt_kien_thuc),
             ("Key này dùng cho dạng bài nào?", b.pt_dang),
             ("Dấu hiệu nào trong đề cho biết phải dùng key này?", b.pt_du_lieu),
             ("Phương pháp áp dụng key này là gì?", b.pt_phuong_phap),
             ("Lỗi thường gặp khi dùng key này?", b.loi),
             ("Làm lại ví dụ mẫu ở trên và ghi đáp số.", b.tuong_tu[1])],
            f"{b.huong_giai}",
            b.td or ["TD1"], b.diem_chot,
            b.loi, b.phong,
            b.pt_dang, b.pt_kien_thuc, b.pt_du_lieu, b.pt_phuong_phap, b.pt_nhanh,
            b.tuong_tu))
    return ra


# ══════════════════════ DB — phần A: SƠ ĐỒ TƯ DUY DẠNG BÀI ══════════════════════

def db_so_do_dang(rng, row, hs) -> list[Bai]:
    dang = row["dang_bai"]
    ra = [_bai(
        "Cây quyết định đọc vị và bảng tổng quát dạng bài",
        f"Đọc cây quyết định của nhóm **{row['nhom_ma']} — {row['nhom_ten']}** dưới đây, "
        f"dừng ở câu hỏi đầu tiên trả lời ĐÚNG. Bản đầy đủ ở "
        f"`10-so-do-doc-vi/so-do-{row['nhom_ma']}-L{row['lop']}.md`.\n\n"
        f"{cay_goi_y(row['nhom_ma'])}\n\n"
        "Sau đó kẻ bảng ba cột: Dạng bài · Dấu hiệu nhận biết · Phương pháp, "
        "rồi điền cột thứ nhất.",
        [(f"Dạng bài thứ {i + 1} của chương?", d) for i, d in enumerate(dang[:8])],
        "Chép đúng tên các dạng bài theo thứ tự học. Đây là khung xương của cả chương.",
        ["TD3"], "Nhớ **số lượng dạng bài** trước, nhớ tên từng dạng sau.",
        "Kể thiếu dạng bài.",
        "Đếm số dạng rồi mới kể; kể xong đếm lại.",
        "Liệt kê dạng bài", "Danh mục dạng bài của chương",
        "Bảng dạng bài đầu phiếu", "Chép theo thứ tự học",
        "Đếm số dạng bài là cách nhanh nhất để biết mình còn sót gì.",
        ("Chương này có mấy dạng bài?", str(len(dang))))]
    for k, (t, c) in enumerate([("Dấu hiệu nhận biết", "pt_du_lieu"),
                                ("Phương pháp áp dụng", "pt_phuong_phap"),
                                ("Kiến thức phải thuộc", "pt_kien_thuc"),
                                ("Cách xử lý nhanh nhất", "pt_nhanh")]):
        ra.append(_bai(
            f"Điền cột “{t}”",
            f"Với mỗi dạng bài dưới đây, điền cột **{t}** của bảng.",
            [(f"Dạng “{_lay(hs, i + k * 2).pt_dang}” — {t.lower()}?",
              getattr(_lay(hs, i + k * 2), c))
             for i in range(min(5, max(4, len(hs))))],
            f"Cột “{t}” lấy từ bảng phân tích chuyên sâu của các phiếu đã học. "
            f"Điền xong, đọc ngang từng hàng để thấy mạch từ đề bài tới lời giải.",
            ["TD2", "TD3"], "Bảng chỉ có giá trị khi **đọc ngang được từng hàng**.",
            "Điền từng cột rời rạc, không đối chiếu ngang.",
            "Điền xong thì đọc lại theo hàng, mỗi hàng phải thành một câu có nghĩa.",
            "Lập bảng dạng bài", "Bảng phân tích chuyên sâu sáu cột",
            "Bảng có sẵn cột dạng bài, thiếu các cột còn lại",
            "Tra bảng phân tích của các phiếu đã học",
            "Học theo hàng ngang, không học theo cột dọc.",
            (f"Cột “{t}” trả lời câu hỏi gì?",
             "thấy gì" if c == "pt_du_lieu" else "làm gì")))
    return ra


# ══════════════════════ DB — phần E: ĐỌC VỊ ĐỀ BÀI ══════════════════════

def db_doc_vi(rng, row, hs) -> list[Bai]:
    ra = []
    for i in range(5):
        b = _lay(hs, i * 2 + 1)
        de = ((b.dan + " ") if b.dan else "") + b.y[0][0]
        ra.append(_bai(
            f"Đọc vị đề số {i + 1}",
            f"**Đề:** {de}",
            [("Đề này thuộc dạng bài nào?", b.pt_dang),
             ("Dấu hiệu nào giúp em nhận ra?", b.pt_du_lieu),
             ("Kiến thức nào phải dùng?", b.pt_kien_thuc),
             ("Phương pháp giải là gì?", b.pt_phuong_phap),
             ("Cách xử lý nhanh nhất?", b.pt_nhanh),
             ("Lỗi nào dễ mắc ở đề này?", b.loi)],
            "Đọc vị là trả lời năm câu hỏi theo thứ tự: dạng gì → dấu hiệu nào → "
            "kiến thức nào → phương pháp nào → có lối tắt không. Chỉ khi trả lời "
            "xong năm câu ấy mới bắt đầu tính.",
            ["TD2", "TD6"], "Đọc vị xong mới đặt bút — **không tính trước khi gọi tên dạng**.",
            b.loi, b.phong,
            b.pt_dang, b.pt_kien_thuc, b.pt_du_lieu, b.pt_phuong_phap, b.pt_nhanh,
            b.tuong_tu,
            goi_y=("Gạch chân các từ khoá trong đề.",
                   "Đối chiếu từ khoá với bảng dạng bài ở phần A.",
                   "Gọi tên dạng bài rồi mới nghĩ tới phép tính.")))
    return ra


# ══════════════════════ KN — các phần kỹ năng ══════════════════════

def kn_trinh_bay(rng, row, hs) -> list[Bai]:
    ra = []
    mau_loi = [b for b in hs if b.loi] or hs
    ra.append(_bai(
        "Bốn dòng bắt buộc của một lời giải",
        "Một lời giải đạt điểm tối đa luôn có đủ bốn dòng dưới đây.",
        [("Dòng 1 của lời giải viết gì?", "câu lời giải nêu rõ đang tìm đại lượng nào"),
         ("Dòng 2 viết gì?", "phép tính, viết đủ dấu và đủ đơn vị"),
         ("Dòng 3 viết gì?", "kết quả kèm đơn vị"),
         ("Dòng 4 viết gì?", "câu đáp số"),
         ("Thiếu câu lời giải thì bị trừ bao nhiêu phần điểm của bài?",
          "một phần tư số điểm của bài")],
        "Trình bày là một kỹ năng chấm được. Bốn dòng trên là chuẩn chấm của GITA "
        "và cũng là chuẩn chấm phổ biến ở các kỳ thi.",
        ["TD1"], "Có lời giải đúng mà trình bày thiếu vẫn **mất điểm thật**.",
        "Viết thẳng phép tính, bỏ câu lời giải.",
        "Đọc lại bài đã làm, đếm xem có đủ bốn dòng chưa.",
        "Kỹ năng trình bày", "Chuẩn trình bày bài giải",
        "Yêu cầu “trình bày lời giải”", "Viết đủ bốn dòng",
        "Viết câu lời giải trước, phép tính sau — không bao giờ ngược lại.",
        ("Một lời giải đạt chuẩn GITA có mấy dòng bắt buộc?", "4 dòng")))
    ra.append(_bai(
        "Viết câu lời giải cho từng dạng",
        "Với mỗi dạng bài, viết một câu lời giải mẫu.",
        [(f"Câu lời giải mở đầu cho dạng “{_lay(hs, i).pt_dang}”?",
          f"“{_lay(hs, i).pt_dang} là:”") for i in range(min(5, max(4, len(hs))))],
        "Câu lời giải chỉ cần nhắc lại đại lượng đang tìm, không cần dài dòng.",
        ["TD1"], "Câu lời giải phải **nêu đúng đại lượng** đang tìm.",
        "Viết câu lời giải chung chung cho mọi bài.",
        "Lấy đúng cụm từ trong câu hỏi của đề làm câu lời giải.",
        "Kỹ năng viết câu lời giải", "Chuẩn trình bày",
        "Đề hỏi gì thì câu lời giải nhắc lại điều đó",
        "Lấy cụm từ trong câu hỏi làm câu lời giải",
        "Sao chép cụm từ trong câu hỏi là cách viết câu lời giải nhanh và chắc nhất.",
        ("Đề hỏi “mỗi tổ trồng mấy cây” thì câu lời giải viết thế nào?",
         "“Số cây mỗi tổ trồng được là:”")))
    ra.append(_bai(
        "Ghi đơn vị đúng chỗ",
        "Chỉ ra chỗ ghi đơn vị trong từng tình huống.",
        [("Trong phép tính trung gian có ghi đơn vị không?", "không ghi trong dấu ngoặc phép tính"),
         ("Kết quả cuối cùng có ghi đơn vị không?", "có, bắt buộc"),
         ("Câu đáp số có ghi đơn vị không?", "có, bắt buộc"),
         ("Diện tích ghi đơn vị gì?", "đơn vị vuông, ví dụ cm²"),
         ("Thể tích ghi đơn vị gì?", "đơn vị khối, ví dụ cm³"),
         ("Vận tốc ghi đơn vị gì?", "km/giờ hoặc m/phút")],
        "Đơn vị là một phần của đáp số. Sai đơn vị coi như sai đáp số.",
        ["TD1"], "Diện tích **luôn** có đơn vị vuông, thể tích luôn có đơn vị khối.",
        "Ghi diện tích bằng cm thay vì cm².",
        "Trước khi viết đáp số, hỏi: đại lượng này đo bằng gì?",
        "Kỹ năng ghi đơn vị", "Đơn vị đo các đại lượng",
        "Đáp số của bài có đại lượng đo", "Kiểm tra đơn vị ở bước cuối",
        "Nhìn đơn vị của đáp số là biết ngay mình có nhầm chu vi với diện tích không.",
        ("Diện tích hình vuông cạnh 5 cm ghi đơn vị gì?", "cm²")))
    ra.append(_bai(
        "Sửa lỗi trình bày",
        "Mỗi ý nêu một lỗi. Hãy nói cách sửa.",
        [(f"Lỗi: {_lay(mau_loi, i).loi} — cách phòng?", _lay(mau_loi, i).phong)
         for i in range(min(6, max(4, len(mau_loi))))],
        "Mỗi lỗi đều có một cách phòng cụ thể, làm được ngay trong lúc làm bài. "
        "Chép cả cặp lỗi – cách phòng vào sổ lỗi.",
        ["TD2"], "Sổ lỗi chỉ có ích khi ghi **cả cách phòng**, không chỉ ghi lỗi.",
        "Ghi lỗi vào sổ nhưng không ghi cách phòng nên lần sau vẫn sai.",
        "Mỗi dòng sổ lỗi bắt buộc có hai cột: lỗi và cách phòng.",
        "Sổ lỗi và cách phòng", "Lỗi thường gặp của chương",
        "Cột “Lỗi thường gặp” trong bảng phân tích",
        "Ghép cặp lỗi với cách phòng", "Đọc lại sổ lỗi 3 phút trước mỗi bài kiểm tra.",
        ("Ghi lỗi mà không ghi cách phòng thì sao?", "lần sau vẫn mắc lại lỗi đó")))
    ra.append(_bai(
        "Tự chấm bài theo thang điểm",
        "Cho một bài 5 điểm, hãy chia điểm cho từng phần.",
        [("Câu lời giải được mấy phần điểm?", "1 phần trong 4"),
         ("Phép tính đúng được mấy phần điểm?", "2 phần trong 4"),
         ("Đáp số kèm đơn vị được mấy phần điểm?", "1 phần trong 4"),
         ("Làm đúng đáp số nhưng thiếu câu lời giải thì được mấy phần?", "3 phần trong 4"),
         ("Phép tính sai nhưng cách làm đúng thì được mấy phần?", "1 đến 2 phần trong 4")],
        "Biết thang chấm thì biết chỗ nào không được bỏ. Đây cũng là cách tự chấm "
        "trong buổi thi đấu cặp đôi ở phiếu Ôn thi.",
        ["TD1", "TD2"], "Biết thang chấm để **không bỏ những dòng dễ ăn điểm nhất**.",
        "Bỏ câu lời giải vì nghĩ “không quan trọng”.",
        "Tự chấm bài của bạn cùng bàn theo đúng thang này một lần mỗi tuần.",
        "Kỹ năng tự chấm", "Thang điểm và chuẩn chấm",
        "Bài đã làm xong, cần tự đánh giá",
        "Chia bài thành bốn phần rồi chấm từng phần",
        "Tự chấm bài của bạn giúp nhớ chuẩn chấm nhanh hơn tự chấm bài của mình.",
        ("Thiếu đơn vị ở đáp số bị trừ bao nhiêu?", "một phần trong bốn phần điểm")))
    return ra


def kn_do_soat(rng, row, hs) -> list[Bai]:
    ra = [_bai(
        "Ba tầng dò soát",
        "Trước khi nộp bài, dò theo đúng ba tầng.",
        [("Tầng 1 dò gì?", "đơn vị đo — mọi số có cùng đơn vị chưa"),
         ("Tầng 2 dò gì?", "phép tính — cộng trừ nhân chia có đúng thứ tự chưa"),
         ("Tầng 3 dò gì?", "đề hỏi gì — mình đã trả lời đúng câu hỏi chưa"),
         ("Tầng nào phát hiện nhiều lỗi nhất?", "tầng 3 — trả lời lệch câu hỏi"),
         ("Dò ba tầng mất bao lâu cho một bài?", "khoảng 30 giây")],
        "Ba tầng dò soát là thói quen bắt buộc của học viên GITA, làm sau mỗi bài "
        "chứ không để dồn tới cuối giờ.",
        ["TD1", "TD6"], "Tầng 3 — **đề hỏi gì** — là tầng bắt được nhiều lỗi nhất.",
        "Dò lại phép tính nhưng không đọc lại câu hỏi.",
        "Sau mỗi bài, đọc to lại câu hỏi rồi đối chiếu với đáp số.",
        "Kỹ năng dò soát", "Quy trình ba tầng",
        "Bài đã làm xong, còn thời gian",
        "Dò theo thứ tự đơn vị → phép tính → câu hỏi",
        "Đọc lại **câu hỏi** trước, đọc lại bài làm sau.",
        ("Tầng nào bắt được lỗi trả lời lệch câu hỏi?", "tầng 3"))]
    for i in range(4):
        b = _lay(hs, i * 3)
        ra.append(_bai(
            f"Dò soát tình huống {i + 1}",
            f"**Tình huống:** một bạn làm bài dạng “{b.pt_dang}” và mắc lỗi: {b.loi}",
            [("Lỗi này bị bắt ở tầng dò soát nào?",
              "tầng 1" if "đơn vị" in b.loi.lower() else
              ("tầng 3" if "hỏi" in b.loi.lower() or "câu hỏi" in b.loi.lower()
               else "tầng 2")),
             ("Cách phòng lỗi này là gì?", b.phong),
             ("Nếu không sửa, bạn ấy mất bao nhiêu điểm của bài?",
              "toàn bộ số điểm của ý sai"),
             ("Viết một câu nhắc để dán vào góc vở.", b.phong),
             ("Điểm chốt của dạng này là gì?", b.diem_chot)],
            f"{b.huong_giai}",
            b.td or ["TD2"], b.diem_chot, b.loi, b.phong,
            b.pt_dang, b.pt_kien_thuc, b.pt_du_lieu, b.pt_phuong_phap, b.pt_nhanh,
            b.tuong_tu))
    return ra


def kn_so_do_tong(rng, row, hs) -> list[Bai]:
    dang = row["dang_bai"]
    ra = [_bai(
        "Khung sơ đồ tổng hợp chương",
        "Vẽ lại sơ đồ tư duy cả chương trong một trang giấy, không nhìn phiếu Lý thuyết.",
        [("Tâm sơ đồ ghi gì?", row["cum_ten"]),
         ("Sơ đồ có mấy nhánh chính?", str(len(dang))),
         ("Mỗi nhánh chính đặt tên theo gì?", "tên một dạng bài của chương"),
         ("Mỗi nhánh chính có mấy nhánh con bắt buộc?",
          "3 nhánh con: dấu hiệu · phương pháp · lỗi hay mắc"),
         ("Vẽ xong, tự chấm bằng cách nào?",
          "so với bảng dạng bài ở phiếu Dạng bài & Đọc vị")],
        "Vẽ từ trí nhớ trước, so với phiếu sau. Chỗ nào quên chính là chỗ chưa chắc.",
        ["TD3"], "Vẽ **từ trí nhớ** mới có tác dụng; chép lại thì không.",
        "Vừa vẽ vừa nhìn phiếu Lý thuyết.",
        "Úp phiếu Lý thuyết xuống bàn trước khi bắt đầu vẽ.",
        "Sơ đồ tư duy tổng hợp", "Hệ thống hoá toàn chương",
        "Yêu cầu vẽ lại sơ đồ không nhìn tài liệu",
        "Vẽ từ trí nhớ rồi đối chiếu",
        "Chỗ nào quên khi vẽ chính là chỗ phải ôn lại đầu tiên.",
        ("Vẽ sơ đồ mà nhìn tài liệu thì mất tác dụng gì?",
         "mất tác dụng kiểm tra trí nhớ"))]
    for i in range(4):
        b = _lay(hs, i * 2 + 1)
        ra.append(_bai(
            f"Nhánh {i + 1} — {b.pt_dang}",
            "Điền ba nhánh con bắt buộc của nhánh này.",
            [("Nhánh con 1 — dấu hiệu nhận biết?", b.pt_du_lieu),
             ("Nhánh con 2 — phương pháp áp dụng?", b.pt_phuong_phap),
             ("Nhánh con 3 — lỗi hay mắc?", b.loi),
             ("Ghi thêm: kiến thức phải thuộc?", b.pt_kien_thuc),
             ("Ghi thêm: cách xử lý nhanh nhất?", b.pt_nhanh)],
            "Ba nhánh con là bộ khung tối thiểu; hai dòng ghi thêm là phần nâng cao "
            "giúp em giải nhanh trong phòng thi.",
            b.td or ["TD3"], b.diem_chot, b.loi, b.phong,
            b.pt_dang, b.pt_kien_thuc, b.pt_du_lieu, b.pt_phuong_phap, b.pt_nhanh,
            b.tuong_tu))
    return ra


def kn_thuyet_trinh(rng, row, hs) -> list[Bai]:
    ra = [_bai(
        "Kịch bản thuyết trình 5 phút",
        "Nhóm 3 – 4 bạn chuẩn bị giảng lại chương cho lớp. Điền kịch bản.",
        [("Phút 1 nói gì?", f"giới thiệu chương “{row['cum_ten']}” và mục tiêu"),
         ("Phút 2 nói gì?", "trình bày sơ đồ tư duy chương"),
         ("Phút 3 nói gì?", "giảng một dạng bài kèm ví dụ mẫu"),
         ("Phút 4 nói gì?", "nêu lỗi hay mắc và cách phòng"),
         ("Phút 5 nói gì?", "ra một bài cho lớp làm và chữa nhanh"),
         ("Ai trong nhóm nói phần nào?", "tự phân công, mỗi bạn ít nhất một phút")],
        "Giảng lại là cách học hiệu quả nhất: chỉ khi giảng được cho người khác "
        "hiểu thì mới thật sự nắm chắc.",
        ["TD3", "TD6"], "Giảng được cho bạn hiểu mới là **đã hiểu**.",
        "Đọc thuộc lòng phiếu thay vì giảng bằng lời của mình.",
        "Cấm cầm phiếu khi thuyết trình; chỉ được cầm sơ đồ tư duy tự vẽ.",
        "Kỹ năng thuyết trình theo nhóm", "Hệ thống hoá và diễn đạt",
        "Yêu cầu giảng lại chương theo nhóm",
        "Chia kịch bản theo phút, phân công rõ người",
        "Người giảng nhớ lâu hơn người nghe khoảng ba lần.",
        ("Vì sao phải giảng lại cho bạn?", "vì giảng được mới là hiểu thật"))]
    for i in range(4):
        b = _lay(hs, i * 2)
        ra.append(_bai(
            f"Nội dung giảng — {b.pt_dang}",
            "Chuẩn bị nội dung để giảng dạng bài này cho lớp.",
            [("Câu mở đầu giới thiệu dạng bài?", f"“Hôm nay nhóm mình nói về {b.pt_dang}.”"),
             ("Dấu hiệu nhận biết em sẽ nêu?", b.pt_du_lieu),
             ("Kiến thức nền em sẽ nhắc lại?", b.pt_kien_thuc),
             ("Ví dụ mẫu em sẽ giảng?", f"{b.tuong_tu[0]} → {b.tuong_tu[1]}"),
             ("Lỗi em sẽ cảnh báo cho lớp?", b.loi),
             ("Mẹo nhanh em sẽ tặng lớp?", b.pt_nhanh)],
            f"{b.huong_giai}",
            b.td or ["TD3"], b.diem_chot, b.loi, b.phong,
            b.pt_dang, b.pt_kien_thuc, b.pt_du_lieu, b.pt_phuong_phap, b.pt_nhanh,
            b.tuong_tu))
    return ra


# ══════════════════════ OT — phần V: THI ĐẤU PHẢN BIỆN ══════════════════════

def ot_phan_bien(rng, row, hs) -> list[Bai]:
    ra = []
    for i in range(5):
        b = _lay(hs, i * 2)
        ra.append(_bai(
            f"Phản biện đề số {i + 1}",
            f"**Đề:** {((b.dan + chr(32)) if b.dan else '') + b.y[0][0]}\n\n"
            f"Hai bạn thi đấu: một bạn trình bày lời "
            f"giải, bạn kia phản biện bằng bảng phân tích sáu cột.",
            [("Cột 1 — Dạng bài?", b.pt_dang),
             ("Cột 2 — Kiến thức liên quan?", b.pt_kien_thuc),
             ("Cột 3 — Dữ liệu nhận biết?", b.pt_du_lieu),
             ("Cột 4 — Phương pháp áp dụng?", b.pt_phuong_phap),
             ("Cột 5 — Cách xử lý nhanh nhất?", b.pt_nhanh),
             ("Cột 6 — Kết quả?", b.pt_ket_qua)],
            "Thi đấu phản biện: bạn trình bày nói lời giải, bạn phản biện phải chỉ ra "
            "được ít nhất một cột trong bảng mà lời giải chưa nói tới. Ai chỉ ra được "
            "nhiều hơn thì thắng.",
            b.td or ["TD6"], b.diem_chot, b.loi, b.phong,
            b.pt_dang, b.pt_kien_thuc, b.pt_du_lieu, b.pt_phuong_phap, b.pt_nhanh,
            b.tuong_tu,
            goi_y=("Điền cột 1 và cột 3 trước — đó là hai cột dễ nhất.",
                   "Cột 4 và cột 5 khác nhau: một cột nói cách làm, một cột nói lối tắt.",
                   "Cột 6 chỉ ghi kết quả, không ghi lời giải.")))
    return ra


# Bảng tra: (loại, chỉ số phần) → hàm dựng phần có cấu trúc.
PHAN_CAU_TRUC = {
    ("LT", 1): lt_why_what,
    ("LT", 2): lt_so_do,
    ("LT", 3): lt_theo_key,
    ("DB", 0): db_so_do_dang,
    ("DB", 4): db_doc_vi,
    ("KN", 1): kn_trinh_bay,
    ("KN", 2): kn_do_soat,
    ("KN", 3): kn_so_do_tong,
    ("KN", 4): kn_thuyet_trinh,
    ("OT", 4): ot_phan_bien,
}
