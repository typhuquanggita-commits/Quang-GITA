# -*- coding: utf-8 -*-
"""Bản đồ ý định tìm kiếm của MATH TIỂU HỌC 365.

Nguồn dữ liệu duy nhất cho mọi thứ liên quan tới tìm kiếm: nhóm ý định, cụm từ
khoá theo nhóm chuyên đề, tên trường thi vào 6, và mẫu câu tiêu đề – mô tả.

Nguyên tắc chi phối cả tệp này:

1. **Từ khoá phải là câu người thật gõ, không phải tên chương trong giáo án.**
   Phụ huynh gõ "toán tổng hiệu lớp 4", không ai gõ "Nhóm D — Toán điển hình".
   Tên nội bộ dùng để tổ chức kho; từ khoá dùng để đặt tiêu đề và mô tả.

2. **Không nhồi từ khoá.** Mỗi trang nhận đúng một từ khoá chính và tối đa bốn
   từ khoá phụ. `kiem_toan_seo.py` báo lỗi nếu một từ khoá chính bị hai trang
   cùng nhận (ăn thịt lẫn nhau) hoặc nếu mật độ từ khoá vượt ngưỡng.

3. **Chỉ nhận từ khoá mà trang thật sự trả lời được.** Trang không có lời giải
   thì không được nhận từ khoá "có đáp án". Kiểm toán đối chiếu điều này.
"""

# ─────────────────────────── BỐN NHÓM Ý ĐỊNH TÌM KIẾM ───────────────────────────
#
# Xếp theo mức độ GITA có thể thắng, không xếp theo lượng tìm kiếm. Cột "cửa
# thắng" là lý do vì sao một trang mới có thể vượt trang cũ ở nhóm ý định đó.

Y_DINH = {
    "dang_bai": {
        "ten": "Học một dạng bài cụ thể",
        "vi_du": ["cách giải bài toán tổng hiệu lớp 4",
                  "dấu hiệu chia hết cho 3 lớp 4",
                  "tính nhanh dãy số lớp 5",
                  "bài toán chuyển động ngược chiều lớp 5"],
        "nguoi_tim": "Học sinh đang bí một dạng bài, hoặc phụ huynh đang kèm con",
        "can_gi": "Một lời giải đi từng bước có số thật, kèm cách nhận ra dạng ấy "
                  "ở đề sau, và bài tương tự để tự làm ngay",
        "cua_thang": "Trang đang xếp trên chỉ đưa đề rồi bắt tải PDF. Trang có "
                     "lời giải đọc được ngay trên màn hình, có bảng phân tích và "
                     "bài tự luyện, giữ người đọc lâu hơn hẳn.",
        "trang_dich": "dang-bai",
        "uu_tien": 1,
    },
    "doc_vi": {
        "ten": "Không biết đề đang hỏi dạng gì",
        "vi_du": ["làm sao biết bài toán thuộc dạng nào",
                  "phân biệt tổng tỉ và hiệu tỉ",
                  "nhiều hơn và gấp khác nhau thế nào",
                  "cách nhận dạng bài toán tiểu học"],
        "nguoi_tim": "Học sinh làm được bài khi biết dạng, nhưng đọc đề lạ là tắc",
        "can_gi": "Một cây quyết định hỏi từ 'đề nói về cái gì' xuống tới tên dạng",
        "cua_thang": "Gần như không có trang tiếng Việt nào làm nội dung này. "
                     "Đây là khoảng trống thật, không phải chỗ tranh giành.",
        "trang_dich": "doc-vi",
        "uu_tien": 1,
    },
    "lo_trinh": {
        "ten": "Không biết cho con học theo thứ tự nào",
        "vi_du": ["lộ trình học toán lớp 4 thi vào 6",
                  "con lớp 5 mất gốc toán phải bắt đầu từ đâu",
                  "học toán nâng cao lớp 3 từ bao giờ",
                  "một tuần nên học mấy buổi toán tiểu học"],
        "nguoi_tim": "Phụ huynh, thường là người quyết định chi tiền",
        "can_gi": "Một bảng tuần cụ thể, nói rõ tuần nào học gì và kiểm tra ở đâu",
        "cua_thang": "Nội dung này đòi phải có chương trình thật đứng sau. Trang "
                     "tổng hợp tài liệu không tự bịa ra được một lộ trình 34 tuần.",
        "trang_dich": "lo-trinh",
        "uu_tien": 1,
    },
    "de_thi": {
        "ten": "Tìm đề để luyện",
        "vi_du": ["đề thi toán lớp 4 học kì 1 có đáp án",
                  "đề thi vào lớp 6 Ams môn toán",
                  "đề thi violympic toán lớp 5",
                  "đề thi hsg toán lớp 4"],
        "nguoi_tim": "Phụ huynh và giáo viên, tìm để tải về in",
        "can_gi": "Đề đầy đủ, đáp án đầy đủ, tải được, và biết đề ở mức nào",
        "cua_thang": "Rất đông trang mạnh đã giữ chỗ này nhiều năm. Không vào "
                     "bằng cách làm giống họ; vào bằng đề **có phân tích từng "
                     "câu** và có mức độ ghi rõ.",
        "trang_dich": "phieu",
        "uu_tien": 3,
    },
    "thi_vao_6": {
        "ten": "Chuẩn bị thi vào lớp 6 trường top",
        "vi_du": ["luyện thi vào 6 chuyên toán Ams",
                  "thi vào lớp 6 Cầu Giấy cần ôn những gì",
                  "cấu trúc đề thi vào 6 Nguyễn Tất Thành"],
        "nguoi_tim": "Phụ huynh lớp 4 và lớp 5, ý định thương mại cao nhất",
        "can_gi": "Nói đúng cấu trúc đề của từng trường và chỉ ra chỗ con đang hổng",
        "cua_thang": "Trang đối thủ nói chung chung cho cả nước. Trang nói riêng "
                     "cho từng trường Hà Nội, gắn với dạng bài cụ thể, thắng được.",
        "trang_dich": "thi-vao-6",
        "uu_tien": 2,
    },
    "thuong_hieu": {
        "ten": "Tìm đúng tên GITA",
        "vi_du": ["math tiểu học 365", "học viện GITA", "gita 365 toán tiểu học"],
        "nguoi_tim": "Người đã nghe tên, đang tìm lại",
        "can_gi": "Vào đúng trang chủ, thấy ngay hệ thống gồm những gì",
        "cua_thang": "Không ai cạnh tranh tên riêng. Lên số 1 là chuyện đương "
                     "nhiên **và cũng gần như vô nghĩa**: chưa ai tìm tên này. "
                     "Từ khoá thương hiệu chỉ có giá trị sau khi nhóm 1 và 2 đã "
                     "kéo được người vào và họ nhớ tên.",
        "trang_dich": "chu",
        "uu_tien": 4,
    },
}

# ───────────────────── CỤM TỪ KHOÁ THEO NHÓM CHUYÊN ĐỀ ─────────────────────
#
# `chinh` là cách gọi dân dã của nhóm, dùng trong tiêu đề trang trụ.
# `phu` là các cách gọi khác người ta cũng gõ, dùng rải trong phần mở đầu.
# `hoi` là câu hỏi thật, dùng dựng khối Câu hỏi thường gặp có đánh dấu FAQPage.

NHOM_TU_KHOA = {
    "A": {
        "chinh": "toán số học và cấu tạo số lớp {lop}",
        "phu": ["dấu hiệu chia hết lớp {lop}", "cấu tạo số lớp {lop}",
                "toán chia hết chia có dư lớp {lop}", "chữ số tận cùng lớp {lop}"],
        "hoi": [
            ("Dấu hiệu chia hết cho 3 và cho 9 khác nhau chỗ nào?",
             "Cả hai đều xét **tổng các chữ số**, chỉ khác số đem chia: tổng chia "
             "hết cho 3 thì số chia hết cho 3, tổng chia hết cho 9 thì số chia hết "
             "cho 9. Vì 9 chia hết cho 3 nên số nào chia hết cho 9 cũng chia hết "
             "cho 3, còn chiều ngược lại thì không."),
            ("Con thuộc dấu hiệu chia hết nhưng gặp đề vẫn không làm được, vì sao?",
             "Vì đề thi hiếm khi hỏi thẳng \"số này có chia hết cho 3 không\". Đề "
             "hỏi vòng: tìm chữ số thay vào dấu sao, tìm số lớn nhất thoả điều "
             "kiện, hoặc chứng minh một tổng chia hết. Phải luyện bước **đọc vị** "
             "chứ không phải học thuộc thêm."),
        ],
    },
    "B": {
        "chinh": "toán tính nhanh lớp {lop}",
        "phu": ["tính nhanh giá trị biểu thức lớp {lop}", "tìm x lớp {lop}",
                "tính nhẩm nhanh lớp {lop}", "bài tập tính nhanh có đáp án lớp {lop}"],
        "hoi": [
            ("Tính nhanh là mẹo hay là có quy tắc?",
             "Là quy tắc. Mọi cách tính nhanh ở tiểu học đều dựa trên bốn tính "
             "chất: giao hoán, kết hợp, phân phối, và cộng trừ cùng một số. Học "
             "thuộc mẹo thì đề đổi số là tắc; hiểu bốn tính chất thì tự nghĩ ra mẹo."),
            ("Nên dạy con tính nhanh từ lớp mấy?",
             "Từ lớp 3, ngay khi con thạo bảng nhân chia. Để tới lớp 5 mới học thì "
             "con đã quen đặt tính và rất khó bỏ thói quen ấy."),
        ],
    },
    "C": {
        "chinh": "toán dãy số và quy luật lớp {lop}",
        "phu": ["tìm quy luật dãy số lớp {lop}", "tổng dãy số cách đều lớp {lop}",
                "số hạng thứ n lớp {lop}", "bài toán đánh số trang lớp {lop}"],
        "hoi": [
            ("Công thức tính số số hạng của dãy cách đều là gì?",
             "Số số hạng = (số cuối − số đầu) : khoảng cách + 1. Chỗ học sinh sai "
             "nhiều nhất là quên cộng 1, vì đếm khoảng cách chứ không đếm số hạng."),
            ("Bài đánh số trang sách thuộc dạng nào?",
             "Thuộc dãy số: các trang tạo thành dãy cách đều 1 đơn vị, còn số chữ "
             "số dùng để đánh thì tách theo nhóm 1 chữ số, 2 chữ số, 3 chữ số. Nhận "
             "ra được hai tầng ấy thì bài trở thành phép cộng đơn giản."),
        ],
    },
    "D": {
        "chinh": "toán có lời văn lớp {lop}",
        "phu": ["toán tổng hiệu lớp {lop}", "toán tổng tỉ hiệu tỉ lớp {lop}",
                "toán trung bình cộng lớp {lop}", "bài toán rút về đơn vị lớp {lop}"],
        "hoi": [
            ("Làm sao phân biệt bài tổng – tỉ với bài hiệu – tỉ?",
             "Nhìn **con số thứ hai** mà đề cho cùng với tỉ số. Nếu đó là tổng hai "
             "số (\"cả hai\", \"tất cả\") thì là tổng – tỉ. Nếu đó là phần chênh "
             "lệch (\"hơn\", \"kém\", \"nhiều hơn\") thì là hiệu – tỉ. Sơ đồ đoạn "
             "thẳng vẽ ra là thấy ngay."),
            ("Vì sao con vẽ được sơ đồ mà vẫn ra sai đáp số?",
             "Thường vì chia sai tổng số phần. Sau khi vẽ, phải đếm lại số phần "
             "trên sơ đồ rồi mới chia; nhiều em lấy luôn con số trong tỉ số mà quên "
             "cộng hai vế."),
        ],
    },
    "E": {
        "chinh": "toán đại lượng và đo lường lớp {lop}",
        "phu": ["đổi đơn vị đo lớp {lop}", "bài toán thời gian lớp {lop}",
                "đổi đơn vị diện tích lớp {lop}", "toán khối lượng lớp {lop}"],
        "hoi": [
            ("Vì sao con hay sai khi đổi đơn vị diện tích?",
             "Vì đổi độ dài thì mỗi bậc gấp 10 lần, nhưng đổi diện tích thì mỗi "
             "bậc gấp **100 lần**, và thể tích gấp 1000 lần. Em nào áp thói quen "
             "của đơn vị độ dài sang diện tích là sai cả bài."),
            ("Bài toán thời gian có gì khác các bài đổi đơn vị khác?",
             "Thời gian không theo hệ mười: 1 giờ là 60 phút chứ không phải 100 "
             "phút. Mọi phép cộng trừ thời gian phải nhớ mượn và nhớ trả theo 60."),
        ],
    },
    "F": {
        "chinh": "toán hình học lớp {lop}",
        "phu": ["tính diện tích hình lớp {lop}", "chu vi diện tích lớp {lop}",
                "bài toán hình học nâng cao lớp {lop}", "cắt ghép hình lớp {lop}"],
        "hoi": [
            ("Con thuộc công thức diện tích nhưng gặp hình lạ là chịu, vì sao?",
             "Vì đề nâng cao không cho sẵn hình cơ bản. Kỹ năng thật là **chia hình "
             "lạ thành hình quen** rồi cộng trừ diện tích. Đó là kỹ năng vẽ thêm "
             "đường phụ, phải luyện riêng chứ không nằm trong công thức."),
            ("Chu vi và diện tích, con hay lẫn chỗ nào?",
             "Ở đơn vị. Chu vi đo bằng cm, m — cùng loại với độ dài. Diện tích đo "
             "bằng cm², m². Nhắc con nhìn đơn vị trong câu hỏi trước khi chọn công "
             "thức là bớt được phần lớn lỗi này."),
        ],
    },
    "G": {
        "chinh": "toán suy luận logic lớp {lop}",
        "phu": ["bài toán suy luận lớp {lop}", "toán tư duy lớp {lop}",
                "bài toán đếm hình lớp {lop}", "toán trạng thái và cân đĩa lớp {lop}"],
        "hoi": [
            ("Toán suy luận có luyện được không hay là do con thông minh sẵn?",
             "Luyện được, vì mọi bài suy luận tiểu học đều rơi vào một số ít khuôn: "
             "lập bảng đúng – sai, giả sử rồi bác bỏ, tính ngược từ cuối, và xét "
             "trường hợp. Nhận ra khuôn nào thì bài trở thành thủ tục."),
            ("Nên bắt đầu toán suy luận từ lớp mấy?",
             "Lớp 3 làm quen bằng bài đếm hình và bài tính ngược; lớp 4 và 5 mới "
             "vào bảng đúng – sai và bài nguyên lý ngăn kéo."),
        ],
    },
    "H": {
        "chinh": "toán thống kê và số liệu lớp {lop}",
        "phu": ["đọc biểu đồ lớp {lop}", "bài toán bảng số liệu lớp {lop}",
                "toán tỉ số phần trăm lớp {lop}", "biểu đồ cột lớp {lop}"],
        "hoi": [
            ("Vì sao bài biểu đồ trông dễ mà con vẫn mất điểm?",
             "Vì mất điểm ở khâu đọc chứ không ở khâu tính. Đề thường hỏi phần "
             "**chênh lệch** hoặc **tỉ lệ**, còn học sinh chỉ đọc ra con số trên "
             "cột rồi trả lời. Phải tập gạch chân câu hỏi trước khi nhìn biểu đồ."),
            ("Tỉ số phần trăm khó ở chỗ nào?",
             "Ở chỗ xác định **lấy gì làm 100%**. Cùng một cặp số, hỏi \"A bằng "
             "bao nhiêu phần trăm B\" và \"B bằng bao nhiêu phần trăm A\" cho hai "
             "đáp số khác nhau."),
        ],
    },
}

# ────────────────────── TRƯỜNG THI VÀO 6 Ở HÀ NỘI ──────────────────────
#
# Chỉ ghi những gì kiểm chứng được từ đề đã công bố. Không đoán chỉ tiêu, không
# đoán điểm chuẩn, không hứa tỉ lệ đỗ. Mục `luu_y` là chỗ nói thẳng phần chưa
# chắc chắn — đây là điều làm trang đáng tin hơn trang đối thủ, không phải điều
# cần giấu đi.

TRUONG = [
    {
        "ma": "ams",
        "ten": "THPT Chuyên Hà Nội – Amsterdam (hệ THCS)",
        "goi_tat": "Ams",
        "tu_khoa": "thi vào lớp 6 Ams môn toán",
        "trong_tam": ["D", "C", "G", "A"],
        "ghi_chu": "Đề nặng về toán có lời văn nhiều bước và suy luận; câu chốt "
                   "thường ghép hai chuyên đề vào một bài.",
    },
    {
        "ma": "khtn",
        "ten": "THCS Khoa học Tự nhiên (ĐHQG Hà Nội)",
        "goi_tat": "KHTN",
        "tu_khoa": "thi vào lớp 6 chuyên toán KHTN",
        "trong_tam": ["A", "G", "C", "D"],
        "ghi_chu": "Đề thiên về số học và suy luận chặt; đòi trình bày lập luận "
                   "chứ không chỉ ra đáp số.",
    },
    {
        "ma": "cau-giay",
        "ten": "THCS Cầu Giấy",
        "goi_tat": "Cầu Giấy",
        "tu_khoa": "thi vào lớp 6 Cầu Giấy môn toán",
        "trong_tam": ["D", "E", "F", "B"],
        "ghi_chu": "Đề bám sát chương trình nhưng tốc độ cao; mất điểm chủ yếu do "
                   "không kịp giờ chứ không do quá khó.",
    },
    {
        "ma": "nguyen-tat-thanh",
        "ten": "THCS & THPT Nguyễn Tất Thành",
        "goi_tat": "Nguyễn Tất Thành",
        "tu_khoa": "thi vào lớp 6 Nguyễn Tất Thành môn toán",
        "trong_tam": ["D", "B", "H", "E"],
        "ghi_chu": "Đề có phần trắc nghiệm nhanh; kỹ thuật tính nhẩm và loại trừ "
                   "ăn điểm rõ rệt.",
    },
    {
        "ma": "luong-the-vinh",
        "ten": "THCS Lương Thế Vinh",
        "goi_tat": "Lương Thế Vinh",
        "tu_khoa": "thi vào lớp 6 Lương Thế Vinh môn toán",
        "trong_tam": ["D", "F", "C", "B"],
        "ghi_chu": "Đề đều tay qua nhiều chuyên đề; hổng một mảng là lộ ngay.",
    },
    {
        "ma": "archimedes",
        "ten": "Trường Archimedes Academy",
        "goi_tat": "Archimedes",
        "tu_khoa": "thi vào lớp 6 Archimedes môn toán",
        "trong_tam": ["G", "D", "C", "H"],
        "ghi_chu": "Đề có màu sắc toán tư duy quốc tế; nhiều bài đặt trong tình "
                   "huống thực tế dài.",
    },
    {
        "ma": "chu-van-an",
        "ten": "THCS Chu Văn An",
        "goi_tat": "Chu Văn An",
        "tu_khoa": "thi vào lớp 6 Chu Văn An môn toán",
        "trong_tam": ["D", "A", "E", "F"],
        "ghi_chu": "Đề chuẩn mực, đòi nền kiến thức chắc hơn là đòi mẹo.",
    },
]

# ────────────────── MẪU TIÊU ĐỀ VÀ MÔ TẢ CHO TỪNG LOẠI TRANG ──────────────────
#
# Tiêu đề ≤ 60 ký tự tính cả đuôi thương hiệu; mô tả 120–158 ký tự. Hai ngưỡng
# này do `kiem_toan_seo.py` cưỡng chế, vì Google cắt ngắn phần vượt quá.

DUOI = " | MATH TIỂU HỌC 365"

MAU_TIEU_DE = {
    "chu": "MATH TIỂU HỌC 365 — Toán tiểu học lớp 3, 4, 5",
    "lop": "Toán lớp {lop} nâng cao: {so_cum} chuyên đề" + DUOI,
    "nhom": "{chinh_hoa}" + DUOI,
    "cum": "{cum_ten} — Lớp {lop}" + DUOI,
    "dang_bai": "{dang} — Lớp {lop} có lời giải" + DUOI,
    "doc_vi": "Đọc vị đề {nhom_ten} lớp {lop}" + DUOI,
    "lo_trinh": "Lộ trình toán lớp {lop} 34 tuần" + DUOI,
    "phieu": "{ten_ngan} — Lớp {lop}" + DUOI,
    "loi_giai": "Lời giải {ma} có phân tích" + DUOI,
    "on_chac": "Ôn chắc {cum_ten} lớp {lop}" + DUOI,
    "thi_vao_6": "Thi vào lớp 6 {goi_tat} môn toán" + DUOI,
}

MAU_MO_TA = {
    "chu": "Hệ thống toán tiểu học lớp 3, 4, 5 của Học viện GITA: {so_dang} dạng "
           "bài có lời giải từng bước, {so_so_do} sơ đồ đọc vị đề và lộ trình 34 tuần.",
    "lop": "Toàn bộ chương trình toán lớp {lop} chia thành {so_cum} chuyên đề, mỗi "
           "chuyên đề sáu buổi từ lý thuyết tới thi, kèm lời giải và bảng phân tích.",
    "nhom": "{mo_ta_ngan} Gồm {so_dang} dạng bài lớp {lop}, mỗi dạng có dấu hiệu "
            "nhận biết, lời giải từng bước và bài tự luyện.",
    "cum": "Chuyên đề {cum_ten} lớp {lop}: {so_dang} dạng bài, sáu buổi học 90 phút "
           "từ lý thuyết đến thi chương, có lời giải và bảng phân tích chuyên sâu.",
    "dang_bai": "{dang} lớp {lop}: dấu hiệu nhận biết dạng, lời giải đi từng bước "
                "có số thật, lỗi thường gặp và bài tự luyện có đáp án.",
    "doc_vi": "Cây quyết định giúp học sinh lớp {lop} gọi đúng tên dạng bài {nhom_ten} "
              "chỉ bằng cách đọc đề, kèm bảng dấu hiệu và mười đề luyện đọc vị.",
    "lo_trinh": "Lộ trình toán lớp {lop} theo 34 tuần: tuần nào học chuyên đề nào, "
                "sản phẩm phải có sau mỗi tuần và bốn cổng kiểm tra năng lực.",
    "phieu": "{trong_tam} Phiếu học 90 phút, thang điểm 100, năm phần từ nhận biết "
             "đến vận dụng cao, có lời giải và bảng phân tích đi kèm.",
    "loi_giai": "Lời giải đầy đủ phiếu {ma}: các bước giải có số thật, cách nghĩ "
                "chung cho mọi bài cùng dạng và bảng phân tích sáu cột.",
    "on_chac": "Hướng dẫn ôn chắc chuyên đề {cum_ten} lớp {lop}: cây gợi ý đọc đề, "
               "danh sách kiến thức phải thuộc và cách tự kiểm tra trước khi thi.",
    "thi_vao_6": "Ôn thi vào lớp 6 {ten} môn toán: các chuyên đề trọng tâm của đề "
                 "trường này và lộ trình luyện theo dạng bài.",
}
