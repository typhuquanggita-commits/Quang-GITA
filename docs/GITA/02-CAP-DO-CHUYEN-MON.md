# Năm cấp chuyên môn

> Cấp được công nhận bằng **bằng chứng**, không phải bằng thâm niên. Mỗi cấp chịu
> trách nhiệm chính về một trụ cột GITA, và gắn với quyền thật trong hệ thống.

---

## Bảng tổng hợp

| Cấp | Tên | Vai trò hệ thống | Giữ trụ cột | Phục vụ tầng |
|---|---|---|---|---|
| **P1** | Trợ giảng GITA | Trợ giảng | Action | H1, H2 |
| **P2** | Giáo viên GITA | Giáo viên bậc 1–2 | Talent | H2, H3 |
| **P3** | Huấn luyện viên GITA | Giáo viên bậc 3 | Inspirits | H3, H4, H5 |
| **P4** | Cố vấn lộ trình | Chủ nhiệm chuyên môn bậc 1 | Goal | H1, H4, H5 |
| **P5** | Kiến trúc sư chương trình | Chủ nhiệm bậc 2 / Quản trị | Goal | H4, H5 |

Ánh xạ sang vai trò được định nghĩa ở `practitionerLevelOf()` trong
[`src/lib/gita.ts`](../../src/lib/gita.ts), và một bài test canh giữ rằng mọi
quyền khai báo cho một cấp đều **thật sự** có ở vai trò tương ứng.

---

## P1 — Trợ giảng GITA · Facilitator

**Giữ trụ Action.** Người bảo đảm nhịp không đứt.

**Năng lực phải chứng minh được**
- Giải thích được bốn trụ cột GITA bằng ngôn ngữ của học viên.
- Đọc được bảng tiến độ và chỉ ra ai đang tụt lại.
- Nhận xét bài làm theo khung ba lớp: hiện tượng — nguyên nhân — việc cần làm.

**Quyền trong hệ thống.** Xem danh sách lớp · Nhận xét bài làm.

**Bằng chứng công nhận**
- Bản thân đạt tầng hấp thu H3 trở lên.
- Nhận xét 20 bài làm được cấp trên thẩm định.

**Bộ công cụ sở hữu.** Sổ tay dẫn nhóm nhỏ · Khung phản hồi 3 lớp · Kịch bản buổi
rà tuần.

---

## P2 — Giáo viên GITA · Instructor

**Giữ trụ Talent.** Người chịu trách nhiệm về năng lực chuyên môn của lớp.

**Năng lực phải chứng minh được**
- Thiết kế được một tuần học theo nhịp meso cho một lớp.
- Chọn đúng phiếu luyện theo tầng hấp thu chứ không theo cảm tính.
- Phân biệt được **ba loại lỗi**:

| Loại lỗi | Dấu hiệu | Cách xử lý |
|---|---|---|
| Lỗi kiến thức | Không biết công thức, không nhận ra dạng | Dạy lại, rồi phiếu khởi động |
| Lỗi kỹ năng | Biết cách nhưng làm sai bước | Luyện lặp có phản hồi |
| Lỗi chiến thuật | Làm đúng nhưng hết giờ, hoặc bỏ trống | Sửa quy trình làm bài, không dạy lại kiến thức |

Nhầm ba loại này là nguyên nhân phổ biến nhất khiến việc dạy thêm không có tác dụng.

**Quyền trong hệ thống.** Giao nhiệm vụ · Duyệt lên cấp · Biên soạn câu hỏi.

**Bằng chứng công nhận**
- Dẫn trọn một giai đoạn cho một lớp, KPI lớp đạt từ 80%.
- Biên soạn 30 câu hỏi được thẩm định đạt.

**Bộ công cụ sở hữu.** Giáo án tuần theo nhịp GITA · Bảng chẩn đoán ba loại lỗi ·
Ngân hàng câu hỏi lớp.

---

## P3 — Huấn luyện viên GITA · Coach

**Giữ trụ Inspirits.** Người làm việc với động lực, thói quen và bản lĩnh — phần
mà giảng bài không giải quyết được.

**Năng lực phải chứng minh được**
- Dẫn một cuộc trò chuyện huấn luyện: **hỏi trước khi giảng**.
- Xử lý được vấn đề động lực và thói quen, không chỉ vấn đề kiến thức.
- Đọc được hiệu chuẩn mức tự tin và làm việc với lỗ hổng "không biết là mình
  không biết".

**Bộ câu hỏi huấn luyện GITA** (dùng theo thứ tự, không nhảy cóc)
1. *Tuần này em thấy điều gì đang đi đúng?* — bắt đầu từ chỗ đang được.
2. *Số liệu nói gì khác với cảm nhận của em?* — mở khoảng cách nhận thức.
3. *Nếu chỉ được đổi một thứ trong tuần tới, em đổi gì?* — buộc chọn.
4. *Điều gì sẽ khiến em không làm được điều đó?* — lường trước rào cản.
5. *Em muốn ai biết về cam kết này?* — tạo trách nhiệm xã hội.

**Quyền trong hệ thống.** Duyệt lên giai đoạn · Quản lý lớp · Thẩm định nội dung.

**Bằng chứng công nhận**
- Dẫn 10 học viên qua ít nhất một lần chuyển tầng hấp thu.
- Hồ sơ 5 ca huấn luyện có biên bản trước — trong — sau.

**Bộ công cụ sở hữu.** Bộ câu hỏi huấn luyện GITA · Quy trình can thiệp khi học
viên chững lại · Biên bản buổi tổng kết giai đoạn.

---

## P4 — Cố vấn lộ trình · Mentor / Consultant

**Giữ trụ Goal.** Người thiết kế đích đến cho những hồ sơ mà lộ trình mặc định
không phù hợp.

**Năng lực phải chứng minh được**
- Thiết kế lộ trình cá nhân từ ngày bắt đầu tới ngày thi cho hồ sơ phức tạp.
- Làm việc được với gia đình: **chuyển kỳ vọng của cha mẹ thành hỗ trợ cụ thể**.
- Đánh giá và cải thiện chất lượng của cả một đội ngũ chuyên môn.

**Ba loại hồ sơ phức tạp thường gặp**
1. **Thời gian ngắn** (dưới 8 tuần): bỏ hẳn mục tiêu phủ kín, dồn toàn bộ vào
   vùng 20/80 và chiến thuật phòng thi.
2. **Nền yếu nhưng mục tiêu cao**: kéo dài giai đoạn 1, chấp nhận mốc tuần thấp
   hơn ở đầu lộ trình, và làm việc kỹ với gia đình về kỳ vọng.
3. **Điểm cao nhưng chững**: hầu như luôn là vấn đề Inspirits hoặc chiến thuật,
   không phải kiến thức. Chuyển sang P3 nếu là vấn đề động lực.

**Quyền trong hệ thống.** Xem mọi lớp · Thẩm định nội dung.

**Bằng chứng công nhận**
- Cố vấn thành công 3 hồ sơ có ràng buộc đặc biệt.
- Kèm cặp ít nhất 2 người lên cấp P2 hoặc P3.

**Bộ công cụ sở hữu.** Khung phỏng vấn định vị 45 phút · Bộ kịch bản làm việc với
phụ huynh · Bảng đánh giá chất lượng buổi dạy.

---

## P5 — Kiến trúc sư chương trình · Program Architect

**Giữ trụ Goal ở quy mô hệ thống.** Người bảo đảm chuẩn đầu ra không trôi theo
thời gian.

**Năng lực phải chứng minh được**
- Thiết kế và hiệu chỉnh khung chương trình: cấp độ, ngưỡng KPI, phân bổ phiếu.
- Đọc được số liệu toàn hệ thống để phát hiện chỗ chương trình đang hỏng.
- Bảo đảm chuẩn đầu ra không trôi.

**Bốn dấu hiệu chương trình đang hỏng**
1. Một chuyên đề có tỉ lệ vượt ải thấp bất thường ở mọi lớp → phiếu sai độ khó.
2. KPI giai đoạn cao nhưng điểm thi thử thấp → ngưỡng đang quá dễ.
3. Nhiều học viên mắc kẹt ở cùng một tầng → cách phục vụ tầng đó chưa đúng.
4. Độ phủ ngân hàng câu hỏi ở một chuyên đề dưới 50% → phiếu đang lặp câu.

**Quyền trong hệ thống.** Sửa khung chương trình · Phát hành nội dung · Xem nhật ký.

**Bằng chứng công nhận**
- Chủ trì ít nhất một chu kỳ hiệu chỉnh chương trình có số liệu trước — sau.
- Duy trì bộ tiêu chuẩn chất lượng và quy trình thẩm định nội dung.

**Bộ công cụ sở hữu.** Bộ tiêu chuẩn chất lượng HSA365 · Quy trình thẩm định nội
dung ba vòng · Báo cáo hiệu chỉnh chương trình.

---

## Nguyên tắc chung của trục chuyên môn

1. **Quyền cộng dồn.** Lên bậc chỉ thêm quyền, không bao giờ mất quyền đã có. Một
   bài test canh giữ điều này cho mọi vai trò.
2. **Không tự phong.** Mỗi cấp có danh sách bằng chứng cụ thể, và cấp trên là
   người xác nhận.
3. **Cấp cao không thay thế cấp thấp.** Một P5 giỏi thiết kế chương trình không
   nhất thiết giỏi ngồi cạnh một bạn H1. Phân công theo *phục vụ tầng nào*, không
   theo *cấp ai cao hơn*.
