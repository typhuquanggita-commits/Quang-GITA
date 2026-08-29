# HỆ PHÂN QUYỀN VÀ BẢO MẬT — HỌC VIỆN GITA

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn

> Tài liệu này quy định **ai được làm gì với dữ liệu và học liệu nào**, và nói rõ
> **ranh giới bảo mật thật sự** của bản online hiện tại. Bảng quyền được sinh tự
> động từ `04-cong-cu/data/phan_quyen.py` nên tài liệu và phần mềm không lệch nhau.

---

## 1. TÁM VAI TRÒ

| Mã | Vai trò | Bậc | Phạm vi dữ liệu | Mô tả |
|:--:|---|:--:|---|---|
| **HS** | Học sinh | 1 | Chỉ dữ liệu của chính mình | Người học. Nội dung mở theo tầng năng lực M1–M5. |
| **TV** | Tư vấn | 2 | Ứng viên và phụ huynh do mình phụ trách | Tổ chức test đầu vào, tư vấn lộ trình. Không xem chi tiết bài làm. |
| **GV** | Giáo viên | 3 | Các lớp mình được phân công dạy | Dạy, chấm, mở đề thi, nhập nhận xét, đề xuất sửa học liệu. |
| **CO** | Coach | 3 | Các học viên mình kèm cặp | Kèm sát lộ trình cá nhân, không mở đề thi, không sửa học liệu. |
| **ASP** | Admin sản phẩm | 4 | Toàn bộ kho học liệu | Biên soạn, phê duyệt và phát hành học liệu. Không chạm dữ liệu học viên. |
| **AHT** | Admin hệ thống | 4 | Toàn hệ thống về mặt kỹ thuật | Tài khoản, phân quyền, nhật ký, cấu hình. Không biên soạn học liệu. |
| **GDDH** | Giám đốc điều hành | 5 | Toàn hệ thống ở mức báo cáo | Xem mọi báo cáo, phê duyệt chính sách. Không sửa dữ liệu tác nghiệp. |
| **SA** | Super Admin | 6 | Toàn quyền | Chỉ dùng khi xử lý sự cố. Mọi thao tác đều bị ghi nhật ký. |

**Bậc** chỉ dùng để giải quyết xung đột quyền: khi hai vai trò cùng áp lên một người thì lấy quyền của bậc cao hơn, **trừ** các quy tắc bất biến ở mục 4.

## 2. MƯỜI SÁU NHÓM TÀI NGUYÊN

| Mã | Tài nguyên |
|:--:|---|
| `phieu_de` | Đề của phiếu học (LT, DB, KN, NC, OT, TH) |
| `phieu_gp` | Phiếu Lời giải & Phân tích chuyên sâu |
| `phieu_hd` | Phiếu Hướng dẫn ôn chắc chuyên đề |
| `ban_do` | Bản đồ kiến thức theo kỳ |
| `de_moc` | Đề thi mốc (GK1, CK1, GK2, CK2) |
| `de_nl` | Đề đánh giá năng lực |
| `test_dv` | Test đầu vào và kết quả xếp lớp |
| `ho_so_minh` | Hồ sơ học tập của chính mình |
| `ho_so_hv` | Hồ sơ học tập của học viên khác |
| `bao_cao_lop` | Báo cáo lớp và khối |
| `bao_cao_ht` | Báo cáo toàn hệ thống |
| `chi_muc` | Chỉ mục và danh mục kho học liệu |
| `bien_soan` | Biên soạn, sửa và phát hành học liệu |
| `tai_khoan` | Tài khoản và phân quyền |
| `nhat_ky` | Nhật ký hệ thống |
| `cau_hinh` | Cấu hình hệ thống |

## 3. MA TRẬN QUYỀN

Ký hiệu: **X** không có quyền · **R** xem · **R!** xem có điều kiện · **R°** xem bản rút gọn · **RW** xem và sửa · **RWD** xem, sửa, xoá · **A** phê duyệt hoặc cấp quyền.

| Tài nguyên | **HS** | **GV** | **CO** | **TV** | **ASP** | **AHT** | **GDDH** | **SA** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Đề của phiếu học (LT, DB, KN, NC, OT, TH) | R! | R | R | R! | A | R | R | A |
| Phiếu Lời giải & Phân tích chuyên sâu | R! | R | R | X | A | R | R | A |
| Phiếu Hướng dẫn ôn chắc chuyên đề | R | R | R | R | A | R | R | A |
| Bản đồ kiến thức theo kỳ | R | R | R | R | A | R | R | A |
| Đề thi mốc (GK1, CK1, GK2, CK2) | R! | RW | R | X | A | R | R | A |
| Đề đánh giá năng lực | R! | RW | R | R! | A | R | R | A |
| Test đầu vào và kết quả xếp lớp | R! | RW | RW | RW | R | R | R | A |
| Hồ sơ học tập của chính mình | RW | X | X | X | X | X | X | R |
| Hồ sơ học tập của học viên khác | X | RW | RW | R° | X | R! | R° | A |
| Báo cáo lớp và khối | X | R | R | R° | X | R | R | A |
| Báo cáo toàn hệ thống | X | X | X | X | R | R | RW | A |
| Chỉ mục và danh mục kho học liệu | R | R | R | R | A | R | R | A |
| Biên soạn, sửa và phát hành học liệu | X | R! | X | X | A | X | R | A |
| Tài khoản và phân quyền | R! | X | X | X | X | A | R | A |
| Nhật ký hệ thống | X | X | X | X | R! | RWD | R | A |
| Cấu hình hệ thống | X | X | X | X | R | RWD | R | A |

### 3.1. Điều kiện kèm theo

| Tài nguyên | Vai trò | Quyền | Điều kiện |
|---|:--:|:--:|---|
| Đề của phiếu học (LT, DB, KN, NC, OT, TH) | HS | R! | Chỉ phiếu đã mở theo tầng năng lực và lộ trình |
| Đề của phiếu học (LT, DB, KN, NC, OT, TH) | TV | R! | Chỉ phiếu mẫu để tư vấn |
| Phiếu Lời giải & Phân tích chuyên sâu | HS | R! | Chỉ mở sau khi đã nộp bài phiếu tương ứng |
| Đề thi mốc (GK1, CK1, GK2, CK2) | HS | R! | Chỉ khi giáo viên mở đề và chỉ biến thể hợp tầng năng lực |
| Đề thi mốc (GK1, CK1, GK2, CK2) | GV | RW | Mở, đóng và giao đề cho lớp mình |
| Đề đánh giá năng lực | HS | R! | Từ tầng M5, hoặc khi giáo viên mở |
| Đề đánh giá năng lực | TV | R! | Chỉ đề mẫu |
| Test đầu vào và kết quả xếp lớp | HS | R! | Chỉ kết quả của chính mình |
| Test đầu vào và kết quả xếp lớp | TV | RW | Tổ chức và chấm test đầu vào |
| Hồ sơ học tập của chính mình | HS | RW | Sửa được thông tin cá nhân, KHÔNG sửa được điểm đã chấm |
| Hồ sơ học tập của học viên khác | GV | RW | Chỉ học viên lớp mình dạy |
| Hồ sơ học tập của học viên khác | CO | RW | Chỉ học viên mình kèm |
| Hồ sơ học tập của học viên khác | TV | R° | Chỉ thông tin tuyển sinh và kết quả test, không xem bài làm |
| Hồ sơ học tập của học viên khác | AHT | R! | Chỉ khi xử lý sự cố, có ghi nhật ký |
| Báo cáo toàn hệ thống | GDDH | RW | Phê duyệt chính sách học vụ |
| Biên soạn, sửa và phát hành học liệu | GV | R! | Chỉ đề xuất sửa, không tự phát hành |
| Biên soạn, sửa và phát hành học liệu | ASP | A | Phê duyệt và phát hành |
| Tài khoản và phân quyền | HS | R! | Chỉ tài khoản của mình |
| Nhật ký hệ thống | ASP | R! | Chỉ nhật ký thay đổi học liệu |

## 4. CHÍN QUY TẮC BẤT BIẾN

Không vai trò nào — kể cả Super Admin — được cấu hình để phá các quy tắc sau:

1. Học sinh không bao giờ mở được phiếu GP của một phiếu mình chưa nộp bài.
2. Không vai trò nào ngoài chính học sinh được sửa thông tin cá nhân của học sinh đó.
3. Không vai trò nào được sửa điểm đã chấm; muốn đổi phải tạo bản chấm lại có ghi nhật ký.
4. Admin sản phẩm không có quyền đọc hồ sơ học tập của học viên.
5. Admin hệ thống chỉ đọc hồ sơ học viên khi xử lý sự cố và luôn để lại nhật ký.
6. Tư vấn không bao giờ thấy chi tiết bài làm, chỉ thấy mức và khuyến nghị lộ trình.
7. Giám đốc điều hành xem báo cáo tổng hợp, không xem dữ liệu định danh từng học viên.
8. Mọi thao tác của Super Admin đều được ghi nhật ký và phải có lý do kèm theo.
9. Tài khoản không hoạt động 90 ngày bị khoá tự động; vai trò quản trị phải xác thực hai lớp.

## 5. TẦNG NĂNG LỰC HỌC VIÊN — CÁI GÌ ĐƯỢC MỞ

Tầng được tính lại sau **mỗi lần nộp bài**, lấy trung bình ba phiếu gần nhất. Giáo viên có quyền **nâng tầng thủ công** cho một học viên, nhưng phải ghi lý do.

| Tầng | Tên | Ngưỡng | Loại phiếu được mở | Tuyến | Biến thể đề mốc | Bộ ĐGNL |
|:--:|---|---:|---|---|---|:--:|
| **M1** | Vững nền | ≥ 0% | LT, DB, KN, HD | T1 | — | — |
| **M2** | Thành thạo | ≥ 40% | LT, DB, KN, HD, NC | T1 | D06 | — |
| **M3** | Vận dụng | ≥ 60% | LT, DB, KN, HD, NC, OT | T1 | D02, D06 | — |
| **M4** | Vượt ngưỡng | ≥ 75% | LT, DB, KN, HD, NC, OT, TH | T1, T2* | D01, D02, D03, D04, D06, D07, D08 | — |
| **M5** | Điểm 10 GITA | ≥ 90% | LT, DB, KN, HD, NC, OT, TH | T1, T2 | D01, D02, D03, D04, D05, D06, D07, D08, D09, D10 | có |

`T2*` nghĩa là **chỉ mở Tuyến 2 ở đúng nhóm chuyên đề mà học viên đã đạt M4**, không mở toàn bộ Tuyến 2.

**Diễn giải từng tầng:**

- **M1 — Vững nền:** Mặc định khi mới vào học hoặc điểm trung bình dưới 40%.
- **M2 — Thành thạo:** Trung bình ba phiếu gần nhất từ 40% trở lên.
- **M3 — Vận dụng:** Trung bình ba phiếu gần nhất từ 60% trở lên.
- **M4 — Vượt ngưỡng:** Từ 75% trở lên. Mở Tuyến 2 ở đúng nhóm chuyên đề đã đạt M4.
- **M5 — Điểm 10 GITA:** Từ 90% trở lên. Mở toàn bộ Tuyến 2 và bộ đề đánh giá năng lực.


---

## 6. MÔ HÌNH BẢO MẬT BA LỚP — VÀ RANH GIỚI THẬT SỰ

> Phần này nói thẳng: **cái gì đang thực sự chặn được, cái gì mới chỉ là chặn nhầm lẫn.**
> Không nên tin vào một lớp bảo vệ mà nó không có khả năng cung cấp.

### Lớp 1 — Phân quyền phía trình duyệt (đang có trong bản online)

Hệ thống online hiện tại là **một trang tĩnh chạy trên máy người xem**. Phân quyền cài
trong trang có tác dụng:

- ✅ Ngăn **nhầm lẫn**: học sinh không vô tình mở phiếu lời giải trước khi làm bài;
  tư vấn không vô tình lọt vào màn hình chấm điểm.
- ✅ Cho mỗi vai trò một giao diện đúng việc của mình.
- ❌ **Không** ngăn được người cố tình: ai mở công cụ nhà phát triển của trình duyệt
  đều có thể xem toàn bộ dữ liệu nhúng trong trang, kể cả đáp án.

**Kết luận:** ở bản online hiện tại, **đáp án và đề thi phải coi như đã công khai với
bất kỳ ai được chia sẻ đường dẫn.** Vì vậy quy tắc vận hành bắt buộc:

1. **Chỉ chia sẻ đường dẫn cho đúng người cần.** Trang mặc định ở chế độ riêng tư.
2. **Không dùng bản online làm nơi thi thật.** Thi thật dùng bản in, hoặc chờ Lớp 3.
3. Vai trò quản trị trong bản online chỉ là **chế độ xem**, không phải tài khoản.

### Lớp 2 — Quyền của nền tảng xuất bản (ranh giới thật, do nền tảng thực thi)

Hai cơ chế sau **do nền tảng cưỡng chế**, người xem không vượt qua được bằng trình duyệt:

| Cơ chế | Nó chặn được gì |
|---|---|
| **Quyền chia sẻ trang** | Người chưa được chia sẻ **không mở được trang**, kể cả có đường dẫn. |
| **Luật ghi của kho dữ liệu** | Người chỉ được quyền xem **không ghi được** vào kho dữ liệu chung. Chỉ tài khoản được cấp quyền sửa mới ghi được. |

Đây là ranh giới an ninh thật của bản online. Cấu hình đang dùng:

```
capabilities: { db: { rules: [
    { path: "",      read: "interact", write: "admin"    },
    { path: "hoso",  read: "interact", write: "interact" }
]}}
```

Nghĩa là: **mọi người được chia sẻ đều đọc và ghi được hồ sơ học tập của mình**, nhưng
**chỉ người được cấp quyền sửa mới ghi được vào vùng dữ liệu chung** (cấu hình lớp,
trạng thái mở đề). Người chỉ có quyền xem không phá được dữ liệu chung.

### Lớp 3 — Hệ thống có máy chủ (lộ trình bắt buộc trước khi vận hành thật)

Muốn phân quyền là **an ninh thật** chứ không chỉ là giao diện, phải có máy chủ. Yêu cầu
tối thiểu khi triển khai:

| # | Yêu cầu | Vì sao bắt buộc |
|---:|---|---|
| 1 | Xác thực tập trung, mật khẩu băm bằng thuật toán chậm có muối | Không bao giờ lưu mật khẩu dạng đọc được |
| 2 | Xác thực hai lớp cho GV, CO, TV, ASP, AHT, GDDH, SA | Tài khoản quản trị là mục tiêu tấn công số một |
| 3 | Kiểm quyền **tại máy chủ** cho từng lời gọi, không tin dữ liệu từ trình duyệt | Trình duyệt luôn có thể bị sửa |
| 4 | Đáp án và đề thi **không gửi xuống trình duyệt** trước thời điểm được phép | Đây là lỗ hổng lớn nhất của mọi hệ thống thi trực tuyến |
| 5 | Đề thi phát theo phiên, có hạn giờ, có mã phiên riêng cho từng học viên | Chống chia sẻ đề giữa các phòng thi |
| 6 | Nhật ký bất biến cho mọi thao tác đọc hồ sơ học viên và mọi thao tác của SA | Truy vết khi có sự cố |
| 7 | Mã hoá dữ liệu khi truyền và khi lưu; sao lưu định kỳ có kiểm thử phục hồi | Bảo vệ dữ liệu trẻ em |
| 8 | Giới hạn tần suất gọi và chống dò mật khẩu | Chống tấn công tự động |
| 9 | Rà soát quyền định kỳ 6 tháng một lần; thu hồi quyền ngay khi nhân sự nghỉ việc | Quyền thừa là rủi ro tích luỹ |
| 10 | Quy trình xử lý sự cố lộ dữ liệu, có thời hạn thông báo cho phụ huynh | Nghĩa vụ với người học chưa thành niên |

---

## 7. BẢO VỆ DỮ LIỆU HỌC VIÊN

Học viên là **trẻ em**. Dữ liệu của các em được xử lý theo ba nguyên tắc:

**6.1. Thu thập tối thiểu.** Hệ thống chỉ lưu những gì phục vụ việc học: họ tên, lớp,
tuyến, kết quả bài làm. **Không** thu thập ngày sinh chi tiết, địa chỉ nhà, số điện thoại
của trẻ, hình ảnh hay bất kỳ thông tin nào không dùng để dạy học.

**6.2. Tách định danh khỏi kết quả.** Trong bản online:

- **Họ tên chỉ nằm trên máy của chính người học** (bộ nhớ trình duyệt), **không** được
  đẩy lên kho dữ liệu dùng chung.
- Kết quả học tập đẩy lên kho dữ liệu được gắn với **một mã hồ sơ ngẫu nhiên**, không
  gắn với tên.
- Hệ quả: người khác mở cùng trang không đọc được tên của em nào.

**6.3. Quyền của người học và phụ huynh.**

| Quyền | Cách thực hiện |
|---|---|
| Xem toàn bộ dữ liệu của mình | Nút **Sao chép hồ sơ** trong trang Hồ sơ học viên |
| Yêu cầu sửa dữ liệu sai | Báo giáo viên phụ trách; sửa điểm phải tạo bản chấm lại có nhật ký |
| Yêu cầu xoá dữ liệu | Nút **Xoá toàn bộ**; với hệ thống có máy chủ thì gửi yêu cầu tới Admin hệ thống |
| Biết dữ liệu được dùng làm gì | Ghi rõ trong Bản cam kết ba bên khi nhập học |

---

## 8. QUY TẮC VẬN HÀNH BẮT BUỘC

1. **Không dùng chung tài khoản.** Mỗi người một tài khoản, kể cả trợ giảng.
2. **Không gửi đáp án qua nhóm chat chung.** Phiếu GP phát đúng người, đúng thời điểm.
3. **Đề thi mốc bản `D01` chỉ mở đúng buổi thi.** Các biến thể còn lại dùng để luyện.
4. **Máy tính lớp học phải khoá màn hình khi rời chỗ**, không lưu mật khẩu trên trình duyệt.
5. **Nhân sự nghỉ việc: thu hồi quyền trong 24 giờ**, chuyển giao lớp trong 72 giờ.
6. **Mỗi 6 tháng rà soát toàn bộ danh sách tài khoản và quyền**, ghi biên bản.
7. **Sự cố lộ dữ liệu: báo Super Admin trong 1 giờ**, báo phụ huynh trong 72 giờ.

---

## 9. VIỆC CÒN LẠI TRƯỚC KHI VẬN HÀNH THẬT

- [ ] Đối chiếu ma trận quyền ở mục 3 với quy định quyền hiện hành của **GITA365** và
      chỉnh cho khớp — bảng này đang là **thiết kế đề xuất**, chưa phải bản sao quy định
      của GITA365.
- [ ] Chốt danh sách vai trò thực tế: có cần tách **Trợ giảng** khỏi Giáo viên, tách
      **Kế toán học vụ** khỏi Giám đốc điều hành hay không.
- [ ] Triển khai Lớp 3 (máy chủ) trước khi dùng hệ thống để **thi thật**.
- [ ] Ký cam kết bảo mật dữ liệu học viên với toàn bộ nhân sự có quyền đọc hồ sơ.
