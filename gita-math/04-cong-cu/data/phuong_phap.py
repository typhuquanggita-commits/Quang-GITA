# -*- coding: utf-8 -*-
"""Mười sáu phương pháp giải toán tiểu học — trục thứ hai của chương trình.

Vì sao có tệp này. Toàn bộ hệ thống GITA cho tới nay tổ chức theo **trục nội
dung**: tám nhóm chuyên đề, 96 cụm, 538 dạng bài — tức là *bài này nói về cái
gì*. Nhưng toàn bộ tài liệu bồi dưỡng học sinh giỏi tiểu học ở Việt Nam lại tổ
chức theo một trục khác: **trục phương pháp** — *bài này giải bằng cách gì*.

Hai trục ấy vuông góc với nhau, và một chương trình luyện học sinh giỏi nghiêm
túc cần cả hai. Một em thuộc hết 538 dạng bài vẫn tắc trước một đề lạ nếu chưa
từng được gọi tên cái *thủ pháp* mà đề ấy đòi. Ngược lại, em nắm chắc mười sáu
thủ pháp này thì gặp dạng chưa học vẫn có đường vào.

Rà soát kho ngày 30/08/2026 cho thấy sáu phương pháp **vắng hẳn** khỏi cả
1 296 tài liệu: thử chọn, khử, thay thế, diện tích, dùng chữ thay số, biểu đồ
Ven. Sáu chỗ ấy là lý do `sinh/mau_pp.py` ra đời.

Cột `dau_hieu` được `build_so_do.py` và trang dạng bài dùng lại, nên viết nó
như một câu người đọc đề có thể tự đối chiếu, không viết như định nghĩa sách
giáo khoa.
"""

# `lop`: lớp sớm nhất dạy được phương pháp ấy ở mức làm quen.
# `nhom`: nhóm chuyên đề hay dùng nó nhất — dùng để xếp mẫu bài vào đúng kho.
PHUONG_PHAP = {
    "so-do-doan-thang": {
        "ten": "Sơ đồ đoạn thẳng",
        "lop": 3,
        "nhom": "D",
        "la_gi": "Vẽ mỗi đại lượng thành một đoạn thẳng, đặt chúng cạnh nhau để "
                 "quan hệ giữa các đại lượng hiện thành hình.",
        "dau_hieu": "Đề cho quan hệ giữa hai hay ba đại lượng — tổng, hiệu, tỉ số, "
                    "“nhiều hơn”, “gấp … lần” — và hỏi từng đại lượng.",
        "cach_lam": "Vẽ đoạn ngắn trước, đoạn dài sau. Ghi mọi con số đề cho lên "
                    "sơ đồ. Nhìn sơ đồ đếm số phần bằng nhau rồi mới tính.",
        "bay": "Vẽ xong không đếm lại số phần, lấy luôn con số trong tỉ số đem chia.",
        "tu_khoa": ("sơ đồ đoạn thẳng",),
    },
    "rut-ve-don-vi": {
        "ten": "Rút về đơn vị",
        "lop": 3,
        "nhom": "D",
        "la_gi": "Tìm giá trị của một đơn vị trước, rồi nhân lên để có giá trị của "
                 "số đơn vị đề hỏi.",
        "dau_hieu": "Đề cho giá trị của một nhóm nhiều đơn vị và hỏi giá trị của "
                    "một nhóm khác cùng loại.",
        "cach_lam": "Bước 1 chia để có một đơn vị. Bước 2 nhân với số đơn vị cần tìm.",
        "bay": "Rút về đơn vị khi hai đại lượng tỉ lệ nghịch — lúc ấy phải nhân "
               "trước chia sau, không phải chia trước nhân sau.",
        "tu_khoa": ("rút về đơn vị",),
    },
    "chia-ti-le": {
        "ten": "Chia tỉ lệ",
        "lop": 4,
        "nhom": "D",
        "la_gi": "Coi mỗi đại lượng là một số phần bằng nhau, tìm giá trị một phần "
                 "rồi nhân ra từng đại lượng.",
        "dau_hieu": "Đề cho tổng (hoặc hiệu) cùng với tỉ số giữa các đại lượng.",
        "cach_lam": "Cộng (hoặc trừ) số phần để ra tổng số phần. Lấy tổng chia cho "
                    "tổng số phần được giá trị một phần. Nhân lên từng đại lượng.",
        "bay": "Với hiệu – tỉ thì phải lấy **hiệu** chia cho **hiệu số phần**, "
               "không phải chia cho tổng số phần.",
        "tu_khoa": ("chia tỉ lệ", "tỉ lệ", "tổng – tỉ", "hiệu – tỉ",),
    },
    "thu-chon": {
        "ten": "Thử chọn",
        "lop": 4,
        "nhom": "G",
        "la_gi": "Liệt kê các khả năng có thể xảy ra, thử từng khả năng và loại "
                 "những khả năng trái với điều kiện đề cho.",
        "dau_hieu": "Đề tìm một số thoả **nhiều điều kiện cùng lúc**, và số khả "
                    "năng phải xét là hữu hạn và không quá nhiều.",
        "cach_lam": "Dùng điều kiện chặt nhất để thu hẹp trước, rồi mới thử. Lập "
                    "bảng để không sót và không lặp khả năng nào.",
        "bay": "Thử được một đáp số rồi dừng, quên kiểm xem còn đáp số khác không.",
        "tu_khoa": ("thử chọn", "lựa chọn", "loại trừ",),
    },
    "khu": {
        "ten": "Phương pháp khử",
        "lop": 5,
        "nhom": "D",
        "la_gi": "So hai tình huống khác nhau của cùng một bài để **triệt tiêu** "
                 "một đại lượng chưa biết, còn lại một đại lượng thì tính được ngay.",
        "dau_hieu": "Đề cho hai lần mua (hai lần cân, hai lần đong) cùng hai loại "
                    "hàng, khác nhau ở số lượng và ở tổng tiền.",
        "cach_lam": "Nhân cả hai tình huống lên cho số lượng của một loại bằng nhau, "
                    "rồi trừ hai tình huống cho nhau. Loại ấy tự mất đi.",
        "bay": "Trừ khi số lượng của loại cần khử **chưa** bằng nhau ở hai tình huống.",
        "tu_khoa": ("phương pháp khử", "khử",),
    },
    "gia-thiet-tam": {
        "ten": "Giả thiết tạm",
        "lop": 5,
        "nhom": "D",
        "la_gi": "Tạm giả sử một tình huống không có thật — thường là “tất cả đều "
                 "cùng một loại” — rồi so phần chênh lệch để suy ra đáp số.",
        "dau_hieu": "Đề cho tổng số con (hoặc tổng số vật) và tổng số chân (hoặc "
                    "tổng giá trị), hỏi mỗi loại có bao nhiêu.",
        "cach_lam": "Giả sử tất cả đều là loại ít chân hơn. Tính số chân theo giả "
                    "sử ấy. Phần thiếu so với đề chia cho chênh lệch chân mỗi con.",
        "bay": "Chia phần chênh lệch cho số chân của một loại, thay vì chia cho "
               "**hiệu** số chân giữa hai loại.",
        "tu_khoa": ("giả thiết tạm",),
    },
    "thay-the": {
        "ten": "Phương pháp thay thế",
        "lop": 5,
        "nhom": "D",
        "la_gi": "Biểu diễn đại lượng này theo đại lượng kia rồi thay vào, để bài "
                 "chỉ còn một đại lượng chưa biết.",
        "dau_hieu": "Đề cho quan hệ đổi ngang giữa hai loại — “một cái này bằng "
                    "mấy cái kia” — cùng với một tổng chung.",
        "cach_lam": "Chọn loại nhỏ làm chuẩn. Đổi hết mọi loại về loại chuẩn. Giải "
                    "bài đã đơn giản rồi đổi ngược lại.",
        "bay": "Đổi xong quên đổi ngược về đại lượng đề hỏi.",
        "tu_khoa": ("thay thế", "phương pháp thế",),
    },
    "dirichlet": {
        "ten": "Nguyên lý Đi-rích-lê",
        "lop": 5,
        "nhom": "G",
        "la_gi": "Nhốt nhiều thỏ vào ít chuồng thì chắc chắn có một chuồng từ hai "
                 "con trở lên. Dùng để khẳng định *tồn tại* mà không cần chỉ ra.",
        "dau_hieu": "Đề hỏi “chứng tỏ rằng có ít nhất …” hoặc “ít nhất phải lấy bao "
                    "nhiêu để chắc chắn …”.",
        "cach_lam": "Gọi tên thỏ là gì, chuồng là gì. Đếm số chuồng. Số thỏ vượt số "
                    "chuồng bao nhiêu lần thì có chuồng chứa bấy nhiêu cộng một.",
        "bay": "Đếm nhầm số chuồng, hoặc quên rằng kết luận chỉ nói **có tồn tại**, "
               "không chỉ ra được là chuồng nào.",
        "tu_khoa": ("Đi-rích-lê", "ngăn kéo", "dirichlet",),
    },
    "dien-tich": {
        "ten": "Phương pháp diện tích",
        "lop": 5,
        "nhom": "F",
        "la_gi": "Dùng quan hệ giữa các diện tích để tìm ra độ dài, thay vì tìm độ "
                 "dài rồi mới tính diện tích.",
        "dau_hieu": "Hình bị chia thành nhiều phần; đề cho diện tích một vài phần "
                    "và hỏi phần còn lại, hoặc hỏi một độ dài.",
        "cach_lam": "Tìm hai tam giác **chung chiều cao**: tỉ số diện tích của "
                    "chúng bằng đúng tỉ số hai đáy. Từ đó suy ngược ra độ dài.",
        "bay": "So diện tích hai tam giác không chung chiều cao — lúc ấy tỉ số "
               "diện tích không còn bằng tỉ số đáy.",
        "tu_khoa": ("phương pháp diện tích", "chung chiều cao",),
    },
    "tinh-nguoc": {
        "ten": "Tính ngược từ cuối",
        "lop": 4,
        "nhom": "B",
        "la_gi": "Đi từ kết quả cuối cùng ngược về đầu, mỗi bước làm **phép tính "
                 "ngược** với phép tính đề đã làm.",
        "dau_hieu": "Đề kể một chuỗi thao tác rồi cho biết kết quả cuối, hỏi số ban đầu.",
        "cach_lam": "Viết chuỗi thao tác thành sơ đồ mũi tên. Đi ngược mũi tên và "
                    "đảo mỗi phép tính: cộng thành trừ, nhân thành chia.",
        "bay": "Đi ngược nhưng giữ nguyên thứ tự phép tính, không đảo lại thứ tự.",
        "tu_khoa": ("tính ngược", "ngược từ cuối",),
    },
    "so-do-cay": {
        "ten": "Ứng dụng sơ đồ (cây, khối, mũi tên)",
        "lop": 4,
        "nhom": "G",
        "la_gi": "Vẽ các khả năng hoặc các bước thành một sơ đồ để nhìn thấy toàn "
                 "bộ tình huống cùng lúc.",
        "dau_hieu": "Đề đếm số cách chọn, số con đường, hoặc kể một chuỗi biến đổi.",
        "cach_lam": "Mỗi tầng của cây là một lần chọn. Nhân số nhánh của các tầng "
                    "được số cách; đếm lá được số kết quả.",
        "bay": "Vẽ thiếu một nhánh, hoặc đếm trùng hai nhánh cho ra cùng kết quả.",
        "tu_khoa": ("sơ đồ cây", "sơ đồ khối", "đếm số cách",),
    },
    "chu-thay-so": {
        "ten": "Dùng chữ thay số",
        "lop": 4,
        "nhom": "A",
        "la_gi": "Đặt một chữ cái thay cho chữ số hoặc số chưa biết, viết cấu tạo "
                 "số theo chữ ấy rồi lập luận.",
        "dau_hieu": "Đề viết số dưới dạng có dấu sao hoặc có chữ — kiểu “số có hai "
                    "chữ số ab” — và hỏi tìm số ấy.",
        "cach_lam": "Viết cấu tạo: số có hai chữ số ab bằng a × 10 + b. Thay vào "
                    "điều kiện đề cho rồi rút gọn.",
        "bay": "Quên rằng chữ số hàng cao nhất không được bằng 0, và mỗi chữ chỉ "
               "nhận giá trị từ 0 đến 9.",
        "tu_khoa": ("dùng chữ thay số", "chữ thay số",),
    },
    "lap-bang": {
        "ten": "Lập bảng",
        "lop": 4,
        "nhom": "G",
        "la_gi": "Kẻ bảng hai chiều, mỗi ô ghi đúng – sai, rồi loại dần cho tới khi "
                 "chỉ còn một cách ghép.",
        "dau_hieu": "Đề ghép người với việc, người với vật, ai học môn nào — và cho "
                    "một loạt câu khẳng định hoặc phủ định.",
        "cach_lam": "Mỗi dòng một người, mỗi cột một khả năng. Đánh dấu × cho điều "
                    "chắc chắn sai, ✓ cho điều chắc chắn đúng. Một ✓ trong dòng thì "
                    "cả dòng và cả cột còn lại đều là ×.",
        "bay": "Đánh dấu ✓ mà quên gạch × cho phần còn lại của cùng cột.",
        "tu_khoa": ("lập bảng", "bảng đúng sai", "bảng đúng – sai",),
    },
    "bieu-do-ven": {
        "ten": "Biểu đồ Ven",
        "lop": 4,
        "nhom": "H",
        "la_gi": "Vẽ mỗi nhóm thành một vòng tròn, phần chung của hai nhóm là chỗ "
                 "hai vòng chồng lên nhau.",
        "dau_hieu": "Đề đếm số người tham gia nhiều hoạt động, có người tham gia cả "
                    "hai, có người không tham gia hoạt động nào.",
        "cach_lam": "Điền phần chung vào trước, rồi mới trừ ra hai phần riêng. Cộng "
                    "ba phần ấy lại và so với tổng để tìm số người ngoài cả hai vòng.",
        "bay": "Cộng thẳng hai nhóm mà không trừ đi phần chung — phần chung bị "
               "đếm hai lần.",
        "tu_khoa": ("biểu đồ Ven", "sơ đồ Ven",),
    },
    "suy-luan": {
        "ten": "Suy luận đơn giản",
        "lop": 3,
        "nhom": "G",
        "la_gi": "Đi từ điều chắc chắn đúng, mỗi bước rút ra một điều mới, cho tới "
                 "khi ra kết luận.",
        "dau_hieu": "Đề cho vài câu khẳng định và hỏi ai làm gì, vật nào ở đâu.",
        "cach_lam": "Tìm câu cho biết chắc chắn nhất làm điểm xuất phát. Mỗi lần "
                    "rút ra một điều mới thì ghi lại, đừng giữ trong đầu.",
        "bay": "Coi một điều mới đoán được là điều đã chứng minh.",
        "tu_khoa": ("suy luận", "logic",),
    },
    "lua-chon-tinh-huong": {
        "ten": "Xét trường hợp",
        "lop": 5,
        "nhom": "G",
        "la_gi": "Chia bài thành các trường hợp không chồng lên nhau, giải từng "
                 "trường hợp rồi gộp kết luận.",
        "dau_hieu": "Đề có một chỗ mập mờ có thể xảy ra theo vài cách — số chẵn hay "
                    "lẻ, đi trước hay đi sau, lớn hơn hay nhỏ hơn.",
        "cach_lam": "Liệt kê đủ các trường hợp trước khi giải bất kỳ trường hợp nào. "
                    "Giải xong phải kiểm lại đã phủ hết mọi khả năng chưa.",
        "bay": "Bỏ sót một trường hợp, hoặc để hai trường hợp chồng lên nhau khiến "
               "một đáp số bị đếm hai lần.",
        "tu_khoa": ("xét trường hợp", "chia trường hợp",),
    },
}

# `tu_khoa` là các cách gọi khác của cùng một phương pháp. `kiem_tra_mau.py` đo
# độ phủ bằng danh sách này chứ không bằng tên chính thức: mẫu bài viết "nguyên
# lí ngăn kéo" vẫn là dạy nguyên lý Đi-rích-lê, và đòi đúng từng chữ của tên
# chính thức chỉ tạo ra báo động giả.

# Sáu phương pháp từng vắng hẳn khỏi kho trước ngày 30/08/2026. Giữ danh sách này
# để `kiem_tra_mau.py` canh không cho chúng biến mất trở lại.
TUNG_VANG = ("thu-chon", "khu", "thay-the", "dien-tich", "chu-thay-so", "bieu-do-ven")
