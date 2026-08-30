# -*- coding: utf-8 -*-
"""Khối Mầm — tiền tiểu học, lớp 1, lớp 2.

Ba khối này **không dùng chung khung với lớp 3–5**, và đó là quyết định thiết
kế quan trọng nhất của cả tệp này.

Phiếu lớp 3–5 dài 90 phút, năm phần, hai mươi lăm bài, thang điểm 100. Đặt một
phiếu như vậy trước mặt trẻ năm tuổi là sai ở mọi mặt: trẻ chưa đọc trôi chảy
nên không tự làm được đề bằng chữ; sức tập trung của trẻ mẫu giáo lớn là quãng
20–25 phút chứ không phải 90; và một thang điểm 100 kèm bút đỏ ở tuổi này dạy
trẻ sợ sai trước khi kịp thấy toán là thứ đáng chơi. Yêu cầu "học sinh thích
học toán" không phải là một lời chúc thêm vào cuối — nó là ràng buộc thiết kế,
và nó loại bỏ khung cũ.

Khung mới, theo lứa tuổi:

| Khối | Tuổi | Một buổi | Cấu trúc | Đánh giá |
|---|:--:|:--:|---|---|
| **MG** mẫu giáo lớn | 5–6 | 25 phút | 4 hoạt động × 3–5 việc | ba mức, không điểm số |
| **L1** lớp 1 | 6–7 | 35 phút | 4 phần × 4 bài | thang 20 |
| **L2** lớp 2 | 7–8 | 40 phút | 5 phần × 4 bài | thang 40 |

Hai chuẩn được hợp nhất, không phải chọn một:

* **Chương trình GDPT 2018 của Bộ Giáo dục và Đào tạo** — ba mạch kiến thức
  (Số và phép tính · Hình học và Đo lường · Thống kê và Xác suất) và năm năng
  lực toán học. Với khối MG là Chương trình Giáo dục mầm non, phần cho trẻ làm
  quen với toán. Đây là chuẩn **bắt buộc**: nội dung nào Bộ quy định cho lớp
  nào thì nằm đúng ở lớp ấy, không dạy trước, không bỏ sót.
* **Cambridge Primary Mathematics** — ba mạch tương ứng (Number · Geometry and
  Measure · Statistics and Probability) và khung **Thinking and Working
  Mathematically** với tám đặc điểm xếp thành bốn cặp. Đây là phần **bổ sung**:
  nó không thêm nội dung mới mà thêm *cách làm việc với nội dung ấy*.

Chỗ Cambridge bổ sung được nhiều nhất chính là khung TWM. Chương trình của Bộ
nói học sinh phải đạt gì; TWM nói học sinh phải **làm việc như thế nào** để đạt.
Một đứa trẻ sáu tuổi hoàn toàn nói được "con nghĩ là số nào cũng thế" (dự đoán)
và "con thử số khác cũng đúng" (thuyết phục) — chỉ cần người lớn hỏi đúng câu.
"""

# ─────────────────── TÁM ĐẶC ĐIỂM TWM CỦA CAMBRIDGE ───────────────────
#
# Giữ nguyên tên tiếng Anh để đối chiếu được với tài liệu gốc, kèm cách gọi
# tiếng Việt và **câu hỏi người lớn nói ra miệng** — vì với trẻ nhỏ, một đặc
# điểm tư duy chỉ tồn tại khi có người hỏi thành lời.

TWM = {
    "specialising": {
        "ten": "Cho một ví dụ",
        "goc": "Specialising",
        "cap": "Cho ví dụ ↔ Rút quy luật",
        "la_gi": "Nêu được một trường hợp cụ thể đúng với quy luật đang xét.",
        "cau_hoi": "Con cho cô một ví dụ nữa được không?",
        "tuoi": 5,
    },
    "generalising": {
        "ten": "Rút ra quy luật",
        "goc": "Generalising",
        "cap": "Cho ví dụ ↔ Rút quy luật",
        "la_gi": "Nói được điều gì luôn đúng, không chỉ đúng với một trường hợp.",
        "cau_hoi": "Lúc nào cũng thế à? Con nói lại thành một câu xem.",
        "tuoi": 6,
    },
    "conjecturing": {
        "ten": "Đoán thử",
        "goc": "Conjecturing",
        "cap": "Đoán thử ↔ Thuyết phục",
        "la_gi": "Nêu một ý hoặc một câu hỏi để hiểu thêm, chưa cần đúng.",
        "cau_hoi": "Con đoán xem cái tiếp theo là gì?",
        "tuoi": 5,
    },
    "convincing": {
        "ten": "Nói cho người khác tin",
        "goc": "Convincing",
        "cap": "Đoán thử ↔ Thuyết phục",
        "la_gi": "Giải thích cách nghĩ của mình để người khác hiểu và tin.",
        "cau_hoi": "Vì sao con biết? Con nói cho bạn hiểu đi.",
        "tuoi": 5,
    },
    "characterising": {
        "ten": "Chỉ ra chỗ giống nhau",
        "goc": "Characterising",
        "cap": "Chỉ chỗ giống ↔ Xếp nhóm",
        "la_gi": "Nói được các thứ trong một nhóm giống nhau ở điểm nào.",
        "cau_hoi": "Mấy cái này giống nhau ở chỗ nào?",
        "tuoi": 5,
    },
    "classifying": {
        "ten": "Xếp thành nhóm",
        "goc": "Classifying",
        "cap": "Chỉ chỗ giống ↔ Xếp nhóm",
        "la_gi": "Chia các thứ vào các nhóm theo một tiêu chí.",
        "cau_hoi": "Con xếp chúng thành mấy nhóm? Vì sao xếp thế?",
        "tuoi": 5,
    },
    "critiquing": {
        "ten": "Xem chỗ nào chưa ổn",
        "goc": "Critiquing",
        "cap": "Xem chỗ chưa ổn ↔ Làm tốt hơn",
        "la_gi": "Nhận ra chỗ tốt và chỗ chưa tốt trong bài mình hoặc bài bạn.",
        "cau_hoi": "Bạn làm thế này, con thấy có chỗ nào chưa ổn không?",
        "tuoi": 6,
    },
    "improving": {
        "ten": "Làm cách gọn hơn",
        "goc": "Improving",
        "cap": "Xem chỗ chưa ổn ↔ Làm tốt hơn",
        "la_gi": "Sửa cách làm của mình thành cách nhanh hơn hoặc gọn hơn.",
        "cau_hoi": "Có cách nào nhanh hơn không?",
        "tuoi": 7,
    },
}

# ─────────────────── BA MẠCH KIẾN THỨC ───────────────────
#
# Tên mạch lấy đúng theo Chương trình GDPT 2018, kèm tên tương ứng của Cambridge
# để đối chiếu. Ba mạch này chạy suốt từ mẫu giáo lớn tới lớp 5.

MACH = {
    "S": {"ten": "Số và phép tính", "cam": "Number", "mau": "#1B5EA8"},
    "H": {"ten": "Hình học và Đo lường", "cam": "Geometry and Measure",
          "mau": "#2E7BC4"},
    "T": {"ten": "Thống kê và Xác suất", "cam": "Statistics and Probability",
          "mau": "#5AA0DC"},
}

# ─────────────────── KHUNG BUỔI HỌC THEO KHỐI ───────────────────

KHOI = {
    "MG": {
        "ten": "Mẫu giáo lớn — tiền tiểu học",
        "ten_ngan": "Tiền tiểu học",
        "tuoi": "5 – 6 tuổi",
        "phut": 25,
        "thang": None,                 # cố ý không chấm điểm
        "so_chu_de": 10,
        "buoi_moi_chu_de": 4,
        "danh_gia": ("chưa làm được", "làm được khi có người giúp", "tự làm được"),
        "chuan": "Chương trình Giáo dục mầm non — lĩnh vực phát triển nhận thức, "
                 "phần cho trẻ làm quen với toán",
        "ghi_chu": "Trẻ chưa đọc trôi chảy nên **mọi việc đều do người lớn đọc "
                   "lên**. Phiếu viết cho người lớn cầm, không phải cho trẻ tự đọc.",
    },
    "L1": {
        "ten": "Lớp 1",
        "ten_ngan": "Lớp 1",
        "tuoi": "6 – 7 tuổi",
        "phut": 35,
        "thang": 20,
        "so_chu_de": 14,
        "buoi_moi_chu_de": 5,
        "danh_gia": None,
        "chuan": "Chương trình GDPT 2018 — môn Toán lớp 1",
        "ghi_chu": "Học kỳ I trẻ mới tập đọc nên câu lệnh phải ngắn, mỗi câu một "
                   "việc, và luôn có hình hoặc đồ vật đi kèm.",
    },
    "L2": {
        "ten": "Lớp 2",
        "ten_ngan": "Lớp 2",
        "tuoi": "7 – 8 tuổi",
        "phut": 40,
        "thang": 40,
        "so_chu_de": 16,
        "buoi_moi_chu_de": 5,
        "danh_gia": None,
        "chuan": "Chương trình GDPT 2018 — môn Toán lớp 2",
        "ghi_chu": "Bắt đầu tự đọc được đề ngắn. Đây là lớp đầu tiên có mạch "
                   "Thống kê và Xác suất theo chương trình của Bộ.",
    },
}

# Bốn hoạt động của một buổi MG và bốn – năm phần của một buổi lớp 1, lớp 2.
# Tên phần cố ý là **động từ trẻ hiểu được**, không phải thuật ngữ sư phạm.
PHAN_BUOI = {
    "MG": [
        ("Chơi khởi động", 5, "Vận động hoặc trò chơi, chưa cầm bút."),
        ("Cùng khám phá", 8, "Người lớn làm mẫu bằng đồ vật thật, trẻ làm theo."),
        ("Tự làm thử", 7, "Trẻ tự làm, người lớn chỉ hỏi chứ không làm hộ."),
        ("Đố vui cuối buổi", 5, "Một câu đố nhẹ để kết buổi bằng tiếng cười."),
    ],
    "L1": [
        ("A", "Khởi động — nhắc lại buổi trước", 5, 4),
        ("B", "Học cái mới", 10, 6),
        ("C", "Luyện tay", 12, 6),
        ("D", "Thử thách vui", 8, 4),
    ],
    "L2": [
        ("A", "Khởi động — nhắc lại buổi trước", 5, 6),
        ("B", "Học cái mới", 10, 8),
        ("C", "Luyện tay", 10, 10),
        ("D", "Bài toán có lời văn", 8, 8),
        ("E", "Thử thách vui", 7, 8),
    ],
}

# ─────────────────── CHỦ ĐỀ THEO KHỐI ───────────────────
#
# Mỗi chủ đề: (mã, tên, mạch, [yêu cầu cần đạt theo chuẩn của Bộ],
#              [đặc điểm TWM được nhấn ở chủ đề này])
#
# Danh sách yêu cầu cần đạt bám Chương trình GDPT 2018 và Chương trình Giáo dục
# mầm non. Không thêm nội dung Bộ chưa yêu cầu ở lớp ấy — dạy trước chương trình
# là cách nhanh nhất làm trẻ chán toán.

CHU_DE = {
    "MG": [
        ("MG01", "Đếm và nhận ra số lượng trong phạm vi 5", "S",
         ["Đếm đúng số lượng nhóm có tới 5 đối tượng",
          "Nói được kết quả đếm là số cuối cùng đọc lên",
          "Đếm được khi các đồ vật xếp không thẳng hàng"],
         ["specialising", "convincing"]),
        ("MG02", "Đếm và nhận ra số lượng trong phạm vi 10", "S",
         ["Đếm đúng số lượng nhóm có tới 10 đối tượng",
          "Nhận ra chữ số từ 1 đến 10",
          "Nối được chữ số với nhóm có đúng số lượng ấy"],
         ["specialising", "characterising"]),
        ("MG03", "Nhiều hơn, ít hơn, bằng nhau", "S",
         ["So sánh số lượng hai nhóm bằng cách ghép đôi",
          "Nói được nhóm nào nhiều hơn, ít hơn, hay bằng nhau",
          "Làm cho hai nhóm bằng nhau bằng cách thêm hoặc bớt"],
         ["convincing", "conjecturing"]),
        ("MG04", "Tách một nhóm thành hai nhóm nhỏ", "S",
         ["Tách nhóm 10 đối tượng thành hai nhóm bằng nhiều cách",
          "Gộp hai nhóm nhỏ lại và đếm ra số cũ",
          "Nhận ra tách kiểu nào thì gộp lại vẫn bằng nhau"],
         ["conjecturing", "generalising"]),
        ("MG05", "Số thứ tự trong phạm vi 10", "S",
         ["Nói được vị trí thứ nhất đến thứ mười trong một dãy",
          "Phân biệt “ba bạn” với “bạn thứ ba”"],
         ["characterising", "convincing"]),
        ("MG06", "Nhận biết hình phẳng và khối", "H",
         ["Gọi tên hình tròn, hình vuông, hình tam giác, hình chữ nhật",
          "Gọi tên khối cầu, khối trụ, khối vuông, khối chữ nhật",
          "Tìm được đồ vật quanh mình có dạng các hình khối ấy"],
         ["classifying", "characterising"]),
        ("MG07", "So sánh kích thước: dài – ngắn, cao – thấp, to – nhỏ", "H",
         ["So sánh trực tiếp hai vật về chiều dài, chiều cao, độ lớn",
          "Xếp ba vật theo thứ tự tăng dần hoặc giảm dần"],
         ["classifying", "convincing"]),
        ("MG08", "Định hướng không gian và thời gian", "H",
         ["Xác định phía trên – phía dưới, phía trước – phía sau, "
          "bên phải – bên trái so với bản thân",
          "Gọi đúng hôm qua – hôm nay – ngày mai, sáng – trưa – chiều – tối"],
         ["specialising", "convincing"]),
        ("MG09", "Xếp theo quy luật", "S",
         ["Nhận ra quy luật xen kẽ hai hoặc ba loại đối tượng",
          "Xếp tiếp được dãy theo đúng quy luật",
          "Tự nghĩ ra một quy luật mới và xếp theo"],
         ["conjecturing", "generalising"]),
        ("MG10", "Đo bằng đơn vị tự chọn và làm quen bảng đếm", "T",
         ["Đo chiều dài một vật bằng gang tay, bước chân, que tính",
          "Đếm và ghi lại kết quả vào bảng có sẵn ô",
          "Nói được nhóm nào nhiều nhất, ít nhất từ bảng đếm"],
         ["classifying", "critiquing"]),
    ],
    "L1": [
        ("L101", "Các số đến 10", "S",
         ["Đếm, đọc, viết được các số trong phạm vi 10",
          "So sánh được hai số trong phạm vi 10",
          "Sắp xếp được các số theo thứ tự"],
         ["specialising", "characterising"]),
        ("L102", "Phép cộng trong phạm vi 10", "S",
         ["Thực hiện được phép cộng trong phạm vi 10",
          "Nhận biết ý nghĩa của phép cộng là gộp lại",
          "Nêu được bài toán tương ứng với một phép cộng"],
         ["conjecturing", "convincing"]),
        ("L103", "Phép trừ trong phạm vi 10", "S",
         ["Thực hiện được phép trừ trong phạm vi 10",
          "Nhận biết ý nghĩa của phép trừ là bớt đi",
          "Nhận ra quan hệ giữa phép cộng và phép trừ"],
         ["generalising", "convincing"]),
        ("L104", "Hình phẳng và hình khối", "H",
         ["Nhận dạng, gọi tên hình vuông, tròn, tam giác, chữ nhật",
          "Nhận dạng khối lập phương, khối hộp chữ nhật",
          "Ghép được hình từ các hình đã cho"],
         ["classifying", "characterising"]),
        ("L105", "Các số đến 20 và phép cộng trừ", "S",
         ["Đếm, đọc, viết, so sánh các số trong phạm vi 20",
          "Cộng, trừ không nhớ trong phạm vi 20"],
         ["specialising", "improving"]),
        ("L106", "Đo độ dài", "H",
         ["Đo độ dài bằng đơn vị tự chọn rồi bằng xăng-ti-mét",
          "So sánh độ dài hai vật qua kết quả đo",
          "Dùng được thước có vạch xăng-ti-mét"],
         ["critiquing", "improving"]),
        ("L107", "Các số đến 100", "S",
         ["Đếm, đọc, viết các số trong phạm vi 100",
          "Nhận biết chục và đơn vị",
          "So sánh, sắp thứ tự các số trong phạm vi 100"],
         ["characterising", "generalising"]),
        ("L108", "Cộng trừ không nhớ trong phạm vi 100", "S",
         ["Đặt tính và tính cộng, trừ không nhớ trong phạm vi 100",
          "Tính nhẩm với các số tròn chục"],
         ["improving", "critiquing"]),
        ("L109", "Bài toán có lời văn một phép tính", "S",
         ["Đọc và hiểu bài toán có một phép tính",
          "Viết được phép tính và câu trả lời",
          "Tự đặt được một bài toán từ một phép tính cho sẵn"],
         ["convincing", "conjecturing"]),
        ("L110", "Xem giờ đúng và ngày trong tuần", "H",
         ["Xem được giờ đúng trên đồng hồ kim",
          "Gọi tên các thứ trong tuần và xác định hôm nay là thứ mấy"],
         ["specialising", "convincing"]),
        ("L111", "Điểm, đoạn thẳng", "H",
         ["Nhận biết điểm, đoạn thẳng",
          "Vẽ được đoạn thẳng nối hai điểm",
          "Đếm số đoạn thẳng trong một hình"],
         ["classifying", "critiquing"]),
        ("L112", "Số và quy luật dãy số đơn giản", "S",
         ["Nhận ra quy luật của dãy số cách đều",
          "Viết tiếp được vài số của dãy"],
         ["conjecturing", "generalising"]),
        ("L113", "Làm quen tách gộp số và cấu tạo số", "S",
         ["Tách một số thành hai số bằng nhiều cách",
          "Dùng tách gộp để tính nhẩm cộng trừ"],
         ["generalising", "improving"]),
        ("L114", "Ôn tập cuối năm", "S",
         ["Vận dụng tổng hợp các nội dung đã học trong năm"],
         ["critiquing", "improving"]),
    ],
    "L2": [
        ("L201", "Ôn tập các số đến 100", "S",
         ["Đọc, viết, so sánh các số trong phạm vi 100",
          "Nhận biết số hạng, tổng, số bị trừ, số trừ, hiệu"],
         ["characterising", "specialising"]),
        ("L202", "Phép cộng có nhớ trong phạm vi 100", "S",
         ["Đặt tính và tính cộng có nhớ trong phạm vi 100",
          "Giải bài toán có một phép cộng"],
         ["improving", "critiquing"]),
        ("L203", "Phép trừ có nhớ trong phạm vi 100", "S",
         ["Đặt tính và tính trừ có nhớ trong phạm vi 100",
          "Giải bài toán có một phép trừ"],
         ["improving", "critiquing"]),
        ("L204", "Nhiều hơn, ít hơn một số đơn vị", "S",
         ["Giải bài toán về nhiều hơn, ít hơn một số đơn vị",
          "Vẽ được sơ đồ đoạn thẳng đơn giản cho bài toán"],
         ["convincing", "conjecturing"]),
        ("L205", "Phép nhân và bảng nhân 2, bảng nhân 5", "S",
         ["Nhận biết phép nhân là phép cộng các số hạng bằng nhau",
          "Thuộc bảng nhân 2 và bảng nhân 5",
          "Giải bài toán có một phép nhân"],
         ["generalising", "specialising"]),
        ("L206", "Phép chia và bảng chia 2, bảng chia 5", "S",
         ["Nhận biết phép chia từ phép nhân",
          "Thuộc bảng chia 2 và bảng chia 5",
          "Giải bài toán có một phép chia"],
         ["generalising", "convincing"]),
        ("L207", "Các số đến 1 000", "S",
         ["Đọc, viết, so sánh các số trong phạm vi 1 000",
          "Nhận biết trăm, chục, đơn vị"],
         ["characterising", "specialising"]),
        ("L208", "Cộng trừ trong phạm vi 1 000", "S",
         ["Đặt tính và tính cộng, trừ trong phạm vi 1 000",
          "Tính nhẩm với các số tròn trăm"],
         ["improving", "critiquing"]),
        ("L209", "Đơn vị đo độ dài: đề-xi-mét, mét, ki-lô-mét", "H",
         ["Nhận biết và đổi được đề-xi-mét, mét, ki-lô-mét",
          "Ước lượng độ dài trong tình huống thực tế"],
         ["conjecturing", "critiquing"]),
        ("L210", "Đơn vị đo khối lượng và dung tích", "H",
         ["Nhận biết ki-lô-gam và lít",
          "Đọc được số đo trên cân và trên ca đong"],
         ["specialising", "convincing"]),
        ("L211", "Điểm, đoạn thẳng, đường thẳng, ba điểm thẳng hàng", "H",
         ["Nhận biết điểm, đoạn thẳng, đường thẳng, đường cong",
          "Nhận biết ba điểm thẳng hàng",
          "Tính độ dài đường gấp khúc"],
         ["classifying", "characterising"]),
        ("L212", "Hình tứ giác, khối trụ, khối cầu", "H",
         ["Nhận dạng và gọi tên hình tứ giác",
          "Nhận dạng khối trụ, khối cầu trong thực tế"],
         ["classifying", "characterising"]),
        ("L213", "Xem đồng hồ, ngày và tháng", "H",
         ["Xem được giờ đúng và giờ rưỡi",
          "Đọc được lịch, biết một tuần có mấy ngày, một năm có mấy tháng"],
         ["specialising", "convincing"]),
        ("L214", "Thu thập, phân loại và kiểm đếm số liệu", "T",
         ["Thu thập được số liệu từ một tình huống quen thuộc",
          "Phân loại và kiểm đếm số liệu vào bảng",
          "Nêu nhận xét đơn giản từ bảng số liệu"],
         ["classifying", "characterising"]),
        ("L215", "Biểu đồ tranh", "T",
         ["Đọc được biểu đồ tranh đơn giản",
          "Trả lời câu hỏi từ biểu đồ tranh",
          "Vẽ được biểu đồ tranh từ bảng số liệu"],
         ["convincing", "critiquing"]),
        ("L216", "Chắc chắn, có thể, không thể", "T",
         ["Dùng đúng từ chắc chắn, có thể, không thể cho một sự kiện",
          "Nêu ví dụ cho mỗi mức khả năng xảy ra"],
         ["conjecturing", "convincing"]),
    ],
}

# ─────────────────── ĐỐI CHIẾU VỚI CAMBRIDGE ───────────────────
#
# Ba khối của GITA so với Stage của Cambridge Primary Mathematics. Không phải
# quan hệ một đối một: Cambridge bắt đầu Stage 1 ở tuổi 5, sớm hơn lớp 1 Việt
# Nam một năm, nên chương trình lớp 1 Việt Nam nằm vắt giữa Stage 1 và Stage 2.
# Ghi rõ chỗ lệch này thay vì giả vờ hai chương trình trùng khít.

DOI_CHIEU_CAM = {
    "MG": {
        "stage": "Cambridge Early Years / đầu Stage 1",
        "trung": "Đếm tới 10, nhận biết chữ số, so sánh nhiều – ít, nhận dạng "
                 "hình phẳng và khối, xếp theo quy luật.",
        "cam_som_hon": "Cambridge Stage 1 đã bắt đầu cộng trừ trong phạm vi 10 "
                       "và làm quen số chẵn lẻ; chương trình mầm non Việt Nam "
                       "để phần ấy sang lớp 1.",
        "vn_som_hon": "Định hướng không gian so với bản thân và định hướng thời "
                      "gian trong ngày được chương trình mầm non Việt Nam làm "
                      "kỹ hơn và sớm hơn.",
    },
    "L1": {
        "stage": "Cambridge Stage 1 (phần lớn) và đầu Stage 2",
        "trung": "Số tới 100, cộng trừ trong phạm vi 20 rồi 100, hình phẳng và "
                 "khối, đo độ dài, xem giờ đúng.",
        "cam_som_hon": "Stage 1 đã có phần thống kê rất đơn giản — thu thập và "
                       "sắp xếp đồ vật theo nhóm; chương trình Việt Nam để mạch "
                       "Thống kê sang lớp 2.",
        "vn_som_hon": "Bài toán có lời văn được đưa vào sớm và làm kỹ hơn.",
    },
    "L2": {
        "stage": "Cambridge Stage 2",
        "trung": "Số tới 1 000, cộng trừ có nhớ, làm quen nhân chia, đơn vị đo, "
                 "thu thập số liệu và biểu đồ tranh, ngôn ngữ khả năng xảy ra.",
        "cam_som_hon": "Stage 2 làm quen phân số đơn giản (một nửa, một phần tư) "
                       "sớm hơn chương trình Việt Nam.",
        "vn_som_hon": "Bảng nhân 2, 5 và bảng chia 2, 5 được yêu cầu thuộc lòng, "
                      "chặt hơn Cambridge ở cùng độ tuổi.",
    },
}

# ─────────────────── BỐN VIỆC LÀM TRẺ THÍCH TOÁN ───────────────────
#
# Đây là phần trả lời trực tiếp cho yêu cầu "học sinh thích học toán". Bốn điều
# dưới đây là ràng buộc **bắt buộc** của mọi phiếu trong khối Mầm, và
# `kiem_mam.py` kiểm chúng như kiểm mọi ràng buộc kỹ thuật khác.

LUAT_HUNG_THU = [
    ("Mỗi buổi mở bằng một trò chơi hoặc một câu đố, không mở bằng bài tập.",
     "Ấn tượng của ba phút đầu quyết định trẻ ngồi vào bàn với tâm thế nào."),
    ("Mỗi buổi có ít nhất một việc dùng **đồ vật thật** — que tính, hột hạt, "
     "cúc áo, ngón tay — chứ không chỉ có giấy bút.",
     "Ở tuổi này khái niệm số hình thành qua tay trước khi hình thành qua mắt."),
    ("Mỗi buổi kết bằng một việc trẻ **chắc chắn làm được**.",
     "Buổi học kết thúc ở cảm giác nào thì trẻ nhớ cảm giác ấy, không nhớ nội dung."),
    ("Không dùng bút đỏ, không xếp hạng, không so sánh trẻ này với trẻ khác. "
     "Sai thì ghi lại để buổi sau làm lại, không ghi điểm trừ.",
     "Trẻ sợ sai sẽ ngừng đoán, mà ngừng đoán là ngừng học toán."),
]
