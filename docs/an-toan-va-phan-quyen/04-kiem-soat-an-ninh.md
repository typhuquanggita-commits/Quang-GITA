# 04 · KIỂM SOÁT AN NINH

## 1. Mô hình đe doạ

Câu hỏi nền: **ai có động cơ và khả năng gây hại, và họ tấn công vào đâu?**

| # | Tác nhân | Động cơ | Đường tấn công | Hậu quả xấu nhất |
|---|---|---|---|---|
| **T1** | Kẻ tấn công bên ngoài | Bán dữ liệu, tống tiền | Lộ khoá API · lỗ hổng ứng dụng · mật khẩu yếu | Rò rỉ hồ sơ hàng trăm trẻ em |
| **T2** | **Người trong tổ chức tò mò** | Tò mò về một học viên, một gia đình | Quyền quá rộng, không có nhật ký | Vi phạm riêng tư, mất niềm tin |
| **T3** | **Người trong tổ chức có ý đồ xấu với trẻ** | Tiếp cận trẻ em | Lạm dụng quyền xem hồ sơ, thông tin liên lạc, lịch trình | **Nguy hại trực tiếp tới trẻ** |
| **T4** | Nhân sự cũ | Chưa thu hồi quyền | Tài khoản còn sống sau khi nghỉ việc | Rò rỉ, phá hoại dữ liệu |
| **T5** | Nhầm lẫn của nhân sự | Không có ý xấu | Gửi nhầm báo cáo, đăng nhầm ảnh, xuất nhầm tệp | Rò rỉ cục bộ nhưng rất mất mặt |
| **T6** | Nhà cung cấp bên thứ ba | — | Dịch vụ lưu trữ, gửi email, phân tích, mô hình AI | Rò rỉ ngoài tầm kiểm soát |
| **T7** | Yêu cầu không chính đáng từ bên ngoài | Muốn lấy thông tin trẻ | Giả danh phụ huynh, giả danh cơ quan chức năng | Giao dữ liệu cho người không có quyền |

> **T3 là tác nhân được đặt lên hàng đầu trong mọi tổ chức làm việc với trẻ em**, và cũng là
> tác nhân bị bỏ quên nhiều nhất trong thiết kế kỹ thuật. Phần lớn hệ thống giáo dục thiết kế
> chống hacker bên ngoài rất kỹ, nhưng để nhân sự nội bộ xem được mọi hồ sơ mà không để lại dấu vết.

---

## 2. Hai mươi bốn biện pháp kiểm soát

### Nhóm A · Danh tính và truy cập
| # | Biện pháp | Chi tiết |
|---|---|---|
| A1 | Xác thực hai yếu tố | **Bắt buộc** với `COUNSELOR`, `CSO`, `SUPER_ADMIN`, `SYSTEM_ADMIN`, `EXEC_DIRECTOR`; khuyến nghị mọi vai trò nhân sự |
| A2 | Mật khẩu | Tối thiểu 12 ký tự; kiểm tra danh sách mật khẩu đã lộ; không ép đổi định kỳ vô nghĩa |
| A3 | Phiên đăng nhập | Hết hạn sau 8 giờ không hoạt động; thiết bị lạ phải xác thực lại |
| A4 | Đặc quyền tối thiểu | Ma trận TL 02; mặc định từ chối |
| A5 | **Bốn mắt khi gán vai trò nhạy cảm** | `CN`, `CS`, `SU`, `ED` cần Super Admin đề xuất + Giám đốc điều hành phê duyệt |
| A6 | **Thu hồi quyền tự động** | Phân công kết thúc / đổi lớp / đóng ca / nghỉ việc → mất quyền trong **24 giờ**; tác vụ rà hằng đêm |
| A7 | Rà soát tài khoản định kỳ | Mỗi quý: liệt kê toàn bộ tài khoản còn hoạt động và vai trò; người quản lý trực tiếp xác nhận |

### Nhóm B · Dữ liệu
| # | Biện pháp | Chi tiết |
|---|---|---|
| B1 | Mã hoá khi truyền | TLS cho mọi kết nối, không có ngoại lệ nội bộ |
| B2 | Mã hoá khi lưu | Toàn bộ cơ sở dữ liệu và bản sao lưu |
| B3 | **Mã hoá tầng ứng dụng cho P3** | Khoá riêng, **vai trò quản trị hệ thống không giữ khoá** — đây là cơ chế kỹ thuật thực thi bất biến BB-01 |
| B4 | Tách kho P3 | Hồ sơ tham vấn và báo cáo BVTE nằm ở kho riêng, sao lưu riêng |
| B5 | **Chống xuất hàng loạt** | `export` là quyền riêng; giới hạn số bản ghi mỗi lần; vượt ngưỡng phải phê duyệt |
| B6 | Che dữ liệu ở môi trường thử | Môi trường dev/test **không bao giờ** dùng dữ liệu thật |
| B7 | Xoá theo thời hạn | Tác vụ tự động rà hằng tháng theo TL 03 §5 |
| B8 | Sao lưu và diễn tập phục hồi | Sao lưu hằng ngày; **diễn tập phục hồi mỗi 6 tháng** — sao lưu chưa từng phục hồi thử thì coi như chưa có |

### Nhóm C · Giám sát và trách nhiệm giải trình
| # | Biện pháp | Chi tiết |
|---|---|---|
| C1 | **Nhật ký kiểm toán bất biến** | Chỉ ghi thêm; lưu tách kho; Super Admin đọc được nhưng không sửa, không xoá |
| C2 | Ghi cả lần đọc hợp lệ | Với P2 và P3. Không có cái này thì không phát hiện được T2 và T3 |
| C3 | **Cảnh báo hành vi bất thường** | Đọc nhiều hồ sơ ngoài phạm vi thường ngày · truy cập ngoài giờ · xuất dữ liệu lớn · nhiều lần bị từ chối liên tiếp |
| C4 | Thông báo khi truy cập P3 | Cán bộ BVTE và Giám đốc điều hành nhận thông báo mọi lần truy cập P3 |
| C5 | Rà soát break-glass | Mỗi quý; tài khoản dùng > 2 lần/quý phải được xem lại |
| C6 | Rà soát nhật ký | Mỗi tháng, do người **không** thuộc đội vận hành hệ thống thực hiện |

### Nhóm D · Ứng dụng và hạ tầng
| # | Biện pháp | Chi tiết |
|---|---|---|
| D1 | **Không bao giờ nhúng bí mật vào mã phía trình duyệt** | Xem §6 LH-01 |
| D2 | Quản lý bí mật | Dùng kho bí mật; không đặt trong mã nguồn, không trong biến môi trường của kho mã |
| D3 | Quét bí mật trước khi commit | Chạy tự động trong CI; chặn merge khi phát hiện |
| D4 | Cập nhật phụ thuộc | Quét lỗ hổng hằng tuần; vá lỗ hổng nghiêm trọng trong 7 ngày |
| D5 | Kiểm soát đầu vào | Kiểm tra và làm sạch mọi đầu vào; chống XSS và tiêm mã |
| D6 | Giới hạn tần suất | Chống dò mật khẩu và thu thập dữ liệu tự động |
| D7 | Phân tách môi trường | dev / staging / production tách hoàn toàn, khoá khác nhau |
| D8 | Đánh giá nhà cung cấp | Trước khi dùng bất kỳ dịch vụ nào chạm dữ liệu học viên: hợp đồng xử lý dữ liệu, nơi lưu trữ, thời hạn lưu, quyền xoá |

### Nhóm E · Con người
| # | Biện pháp | Chi tiết |
|---|---|---|
| E1 | Ký cam kết bảo mật | 100% nhân sự, gồm cộng tác viên và cựu học viên trợ giảng |
| E2 | Tập huấn nhận thức | Trong buổi tập huấn D-5; nội dung gồm 10 bất biến và cách nhận ra yêu cầu giả danh |
| E3 | **Quy trình xác minh khi có yêu cầu dữ liệu** | Người lạ xin thông tin học viên → không cung cấp qua điện thoại; gọi lại theo số đã đăng ký trong hồ sơ |

---

## 3. Ứng phó sự cố an ninh

```
0–1 giờ    PHÁT HIỆN → báo Admin hệ thống + Giám đốc điều hành
           Nếu có khả năng ảnh hưởng tới an toàn trẻ → báo Cán bộ BVTE ngay
     ↓
1–4 giờ    NGĂN CHẶN: khoá tài khoản liên quan · thu hồi khoá · cô lập hệ thống bị ảnh hưởng
           KHÔNG xoá bằng chứng, KHÔNG sửa nhật ký
     ↓
4–24 giờ   ĐÁNH GIÁ: dữ liệu nào · bao nhiêu người · mức nhạy cảm nào · đã bị lấy hay chỉ bị xem
     ↓
24–72 giờ  THÔNG BÁO: gia đình bị ảnh hưởng · cơ quan chức năng theo quy định pháp luật
           Nội dung: chuyện gì xảy ra · dữ liệu nào · đang làm gì · gia đình nên làm gì
     ↓
7 ngày     BÁO CÁO NGUYÊN NHÂN GỐC + danh sách khắc phục có người chịu trách nhiệm và hạn
     ↓
30 ngày    XÁC NHẬN đã khắc phục · cập nhật biện pháp kiểm soát · rút kinh nghiệm toàn đội
```

**Ba nguyên tắc ứng phó:**
1. **Thông báo sớm, kể cả khi chưa biết hết.** Che giấu làm hỏng niềm tin nhiều hơn bản thân sự cố.
2. **Nói về hệ thống, không tìm người để đổ lỗi.** Nhân sự sợ bị phạt sẽ giấu sự cố lần sau.
3. **Cận-sự-cố an ninh cũng phải báo cáo** — một lần suýt gửi nhầm, một lần suýt đăng nhầm ảnh.

---

## 4. Bảng kiểm an ninh trước mỗi lần phát hành

- [ ] Bộ tự kiểm phân quyền chạy **đạt 100%** (15 mệnh đề tại TL 02 §5)
- [ ] Không có bí mật nào trong mã nguồn (quét tự động)
- [ ] Bản build production **không chứa khoá API** của bất kỳ nhà cung cấp nào
- [ ] Phụ thuộc không có lỗ hổng mức nghiêm trọng chưa vá
- [ ] Mọi điểm cuối chạm dữ liệu P2/P3 **đều gọi hàm `can()`** — không có đường tắt
- [ ] Mọi truy cập P2/P3 **đều ghi nhật ký kiểm toán**
- [ ] Môi trường thử không dùng dữ liệu thật
- [ ] Đã diễn tập phục hồi sao lưu trong 6 tháng gần nhất

---

## 5. Bảng kiểm an ninh định kỳ

| Tần suất | Việc | Người |
|---|---|---|
| Hằng ngày | Xem cảnh báo hành vi bất thường | Admin hệ thống |
| Hằng tuần | Quét lỗ hổng phụ thuộc | Công nghệ |
| Hằng tháng | Rà nhật ký kiểm toán — do người ngoài đội vận hành thực hiện | Người được chỉ định |
| Hằng tháng | Rà tài khoản chưa thu hồi sau khi quan hệ chấm dứt | Super Admin |
| Hằng quý | Rà toàn bộ tài khoản và vai trò; rà break-glass | Super Admin + Giám đốc điều hành |
| Mỗi 6 tháng | **Rà soát toàn bộ ma trận quyền** | Công nghệ + BLĐ |
| Mỗi 6 tháng | Diễn tập phục hồi sao lưu | Admin hệ thống |
| Hằng năm | Đánh giá lại mô hình đe doạ; đánh giá nhà cung cấp | BLĐ |

---

## 6. Ba lỗ hổng đã phát hiện trong mã nguồn và cách vá

### LH-01 · Khoá API bị nhúng vào bundle trình duyệt — mức **Cao**

**Hiện trạng phát hiện:** `vite.config.ts` dùng `define` để thay `process.env.API_KEY` bằng
giá trị `GEMINI_API_KEY` tại thời điểm build. Vite thực hiện thay thế **văn bản trong mã nguồn**,
nên khoá nằm nguyên dạng chuỗi trong tệp JavaScript đã build.

**Vì sao nghiêm trọng:** bất kỳ ai mở trang đều xem được mã nguồn đã build và trích ra khoá,
rồi gọi API bằng hạn mức và hoá đơn của Học viện. Không cần kỹ năng đặc biệt.
Đây không phải rủi ro lý thuyết — đây là cách khoá bị lộ thường gặp nhất trong ứng dụng web.

**Đã vá:**
- Bản build production **không bao giờ** nhúng khoá; nếu phát hiện có khoá trong môi trường build,
  hệ thống in cảnh báo và vẫn không nhúng.
- Môi trường dev chỉ nhúng khi lập trình viên **chủ động bật** `GITA_ALLOW_CLIENT_API_KEY=true`.
- Thêm biến `process.env.GITA_CLIENT_KEY_ENABLED` để mã ứng dụng biết trạng thái và xử lý phù hợp.

**Còn phải làm để chạy production:** dựng **backend proxy** giữ khoá phía máy chủ.
Trình duyệt gọi tới điểm cuối của Học viện; máy chủ mới gọi tới nhà cung cấp mô hình.
Proxy đồng thời là nơi đặt xác thực người dùng, giới hạn tần suất, và nhật ký sử dụng —
ba thứ không thể làm được khi gọi thẳng từ trình duyệt.

### LH-02 · `.gitignore` thiếu mẫu loại trừ bí mật — mức **Trung bình**

**Hiện trạng:** chỉ có `*.local`, không loại trừ `.env`, `.env.production`, khoá riêng tư,
tệp service account. Chỉ cần một lần `git add .` là bí mật lên kho mã vĩnh viễn —
và xoá commit sau đó **không** làm bí mật biến mất khỏi lịch sử.

**Đã vá:** bổ sung đầy đủ mẫu loại trừ và thêm tệp `.env.example` để hướng dẫn cấu hình
mà không lộ giá trị thật.

### LH-03 · Dev server lắng nghe trên mọi giao diện mạng — mức **Trung bình**

**Hiện trạng:** `server.host: '0.0.0.0'` khiến ứng dụng đang phát triển hiển thị với mọi máy
trong cùng mạng — quán cà phê, mạng khách sạn, mạng dùng chung của toà nhà. Kết hợp với LH-01,
người cùng mạng đọc được cả khoá API.

**Đã vá:** mặc định `127.0.0.1`. Muốn mở rộng phải khai báo tường minh `GITA_DEV_HOST`,
và chỉ nên làm trên mạng tin cậy.

---

## 7. Bốn lỗ hổng thiết kế cần xử lý khi xây nền tảng GITA 365

Ngoài ba lỗ hổng đã có trong mã, đây là những chỗ hệ thống **sẽ** hở nếu không thiết kế từ đầu:

| # | Lỗ hổng tiềm ẩn | Vì sao dễ mắc | Cách chặn |
|---|---|---|---|
| **TK-01** | **Super Admin đọc được mọi thứ** | Đây là mặc định của gần như mọi khung phần mềm | Mã hoá tầng ứng dụng cho P3, khoá không nằm ở vai trò quản trị (B3) |
| **TK-02** | **Quyền không hết hạn** khi quan hệ chấm dứt | Không ai nhớ thu hồi thủ công | Tác vụ rà hằng đêm, quyền phái sinh từ bản ghi phân công còn hiệu lực chứ không lưu cứng (A6) |
| **TK-03** | **Không ghi nhật ký lần đọc** | Ai cũng nghĩ chỉ cần ghi lần sửa | Ghi cả lần đọc với P2/P3 (C2) |
| **TK-04** | **Trợ lý AI trở thành đường vòng qua phân quyền** | AI có quyền đọc rộng để "hỗ trợ tốt hơn", rồi trả lời cho người không có quyền | AI **chạy dưới danh tính và quyền của người dùng đang hỏi**, không có danh tính riêng quyền cao. Mọi truy vấn của AI đều qua `can()` |

> **TK-04 là lỗ hổng mới và nguy hiểm nhất của thế hệ hệ thống hiện nay.** Một trợ lý AI được cấp
> quyền đọc toàn bộ cơ sở dữ liệu "để hỗ trợ tốt hơn" sẽ vô hiệu hoá toàn bộ ma trận phân quyền:
> phụ huynh hỏi trợ lý về con nhà khác, giáo viên hỏi về hồ sơ tâm lý — và AI trả lời,
> vì bản thân nó có quyền. Nguyên tắc bắt buộc: **AI không bao giờ có quyền cao hơn người đang dùng nó.**
