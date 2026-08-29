# Bộ nhận diện HSA365 · GITA

Một bộ nhận diện không phải là một tệp logo. Nó là tập các **quyết định đã chốt kèm lý
do**, để lần sau không ai phải chốt lại.

Tài liệu này là bản đọc. Bản **sống** nằm ở màn hình *Nhận diện* trong ứng dụng: nó in ra
đúng các giá trị mà mã nguồn đang chạy, nên không thể lệch khỏi sản phẩm. Nguồn sự thật
là [`src/brand/tokens.ts`](../src/brand/tokens.ts).

---

## 1. Dấu hiệu

Ba vệt cong đồng tâm và một cụm sao. Mỗi vệt dựng bằng **hai cung elip lồng nhau có tâm
lệch nhau** — chính độ lệch ấy tạo ra độ thon ở hai đầu mà một nét dày đều không bao giờ
có được.

| Tệp | Dùng khi |
|---|---|
| `public/logo-gita.svg` | Đủ màu, có chữ. Mặc định. |
| `public/logo-gita-mark.svg` | Chỉ dấu hiệu, khi đã có chữ bên cạnh. |
| `public/logo-gita-mono.svg` | Một màu, cho nền đậm, dấu mộc, bản fax, in một màu. |

Trong mã: `GitaMark`, `GitaLogo`, `BrandLockup` trong
[`src/brand/Logo.tsx`](../src/brand/Logo.tsx).

> **Về phần chữ.** Ba vệt cong và cụm sao là vector dựng lại chính xác, dùng được ở mọi
> cỡ. Riêng chữ **GITA** đang dùng phông chữ hệ thống, không phải phông gốc của logo. Khi
> có tệp vector gốc, hãy thay phần `<text>` bằng đường dẫn chữ thật. Mọi thứ còn lại của
> bộ nhận diện không phụ thuộc vào việc đó.

### Bốn phần tử, bốn trụ cột

Ánh xạ này không phải gán ghép cho vui: nó cho phép mọi tài liệu dùng đúng một ngôn ngữ
hình ảnh khi nói về một trụ cột — và người học nhìn dấu hiệu là nhớ được mô thức, thay vì
phải học thuộc bốn chữ cái.

| Phần tử | Trụ cột | Vì sao |
|---|---|---|
| Vệt cong ngoài | **G** — Mục tiêu | Vệt rộng nhất, ôm trọn cả dấu hiệu. Không có mục tiêu thì ba trụ kia không biết đi đâu. |
| Vệt cong đỏ cắt ngang | **I** — Nội lực | Vệt duy nhất đổi màu và cắt lên trên. Nội lực làm quỹ đạo đi lên thay vì đi vòng. |
| Vệt cong trong | **T** — Tài năng | Vệt mảnh nhất, sát tâm. Đường ngắn nhất tới đích, nhưng chỉ thấy khi đã ở gần tâm. |
| Cụm sao | **A** — Hành động | Nhiều ngôi rời rạc xếp thành một đường đi lên. Hành động là những điểm nhỏ lặp đủ lâu để thành một hướng. |

---

## 2. Bảng màu

Lấy trực tiếp từ logo. Mọi tỉ lệ tương phản dưới đây được **tính lại trong test** — đổi
một mã màu mà quên cập nhật tỉ lệ sẽ làm đỏ test, không phải đợi ai đó tình cờ nhìn ra.

| Token | Mã | Trên trắng | Trên nền tối | Vai trò |
|---|---|---|---|---|
| `--gita-blue-800` | `#123C6E` | 11,07 | 1,61 | Chữ tiêu đề nền sáng, đường kẻ đậm bản in |
| `--gita-blue-700` | `#16457E` | 9,60 | 1,86 | Trạng thái nhấn của nút |
| `--gita-blue-600` | `#1C5BA8` | 6,75 | 2,64 | **Màu thương hiệu chính** — chữ logo, nút chính, liên kết |
| `--gita-blue-500` | `#2E6FBF` | 5,07 | 3,52 | Vệt cong ngoài |
| `--gita-blue-400` | `#5B9BD8` | 2,95 | 6,06 | Vệt cong trong; **màu thương hiệu ở chế độ tối** |
| `--gita-red-600` | `#C42017` | 5,89 | 3,03 | Đỏ dùng được cho chữ |
| `--gita-red-500` | `#E02B20` | 4,63 | 3,86 | Đỏ của logo, chỉ cho đồ họa |

Ngưỡng: từ **4,5:1** dùng được cho chữ thường; từ **3:1** chỉ cho chữ lớn và đồ họa; dưới
3:1 không dùng cho thứ mang thông tin.

---

## 3. Hệ chữ

**Không nạp phông chữ từ Internet.** Chính sách bảo mật của trang chỉ cho phép
`font-src 'self'`, và toàn bộ ứng dụng phải chạy được khi mất mạng. Một bộ nhận diện phụ
thuộc phông tải về sẽ vô hiệu đúng lúc người học cần nó nhất: trong phòng thi thử offline,
hoặc khi in ở một máy không có mạng. Đổi lại, hệ chữ dựa trên phông hệ thống được xếp theo
thứ tự bảo đảm **đủ dấu tiếng Việt** trên cả ba hệ điều hành.

Thang chữ cho bản in (đơn vị pt):

| Bậc | Cỡ | Dãn dòng | Dùng ở đâu |
|---|---|---|---|
| Tên tài liệu | 20pt | 1,25 | Dòng đầu trang bìa và đầu mỗi phiếu |
| Tiêu đề mục | 13pt | 1,3 | Chặng, phần, mục lớn |
| Tiêu đề phụ | 11pt | 1,35 | Dạng bài, bước giải, tên bảng |
| Nội dung | 10,5pt | 1,55 | Đề bài, lời giải, phân tích |
| Chú thích | 8,5pt | 1,4 | Nguồn ngữ liệu, chân trang, mã tài liệu |

---

## 4. Hệ tài liệu

Mã tiền tố vừa là mã tra cứu vừa là thứ nhận diện: nhìn hai chữ cái đầu là biết đang cầm
thứ gì.

| Mã | Loại | Nội dung |
|---|---|---|
| `PL` | Phiếu luyện | Bài để làm. Không có đáp án. |
| `LG` | Phiếu lời giải | Lời giải đầy đủ kèm bảng phân tích chuyên sâu. |
| `HD` | Phiếu hướng dẫn ôn chắc | Một phiếu cho cả chuyên đề: tiêu chí đạt và kế hoạch ôn. |
| `DV` | Phiếu định vị | Kết quả bài kiểm tra định vị đầu vào. |
| `BC` | Báo cáo | Báo cáo tiến độ cho học viên, gia đình hoặc tổ chức. |

Mọi tài liệu phát ra ngoài đều đi qua `DocumentShell`
([`src/components/DocumentShell.tsx`](../src/components/DocumentShell.tsx)), và **mã tài
liệu xuất hiện hai lần**: đầu trang để nhận ra ngay, chân trang để còn đọc được khi tờ
giấy bị gấp đôi.

Lý do: *một phiếu rời khỏi hệ thống là một phiếu không còn ngữ cảnh.* Nó nằm trên bàn học,
trong cặp, trong tay phụ huynh hoặc một giáo viên khác. Không có mã thì không ai — kể cả
chính người học — tìm lại được đúng lời giải và đúng phiếu hướng dẫn của nó.

---

## 5. Bản in

Phần lớn phiếu được in ở nhà hoặc ở tiệm photo, thường là **đen trắng**. Nên hệ in tuân
một luật duy nhất: **thông tin không bao giờ chỉ được mã hóa bằng màu** — mã màu nào cũng
đi kèm chữ hoặc ký hiệu.

- Khổ A4, lề `16mm 14mm 18mm`.
- Bản in **luôn dùng bảng màu sáng** kể cả khi màn hình đang ở chế độ tối: in nền tối ra
  giấy vừa tốn mực vừa không đọc được.
- Tiêu đề không bao giờ đứng một mình ở cuối trang (`break-after: avoid`).
- Bảng, hình, trích dẫn và mục danh sách không bị cắt ngang trang.
- Liên kết in ra giấy thì mất đích đến, nên địa chỉ được trả lại ở dạng chữ.

---

## 6. Quy tắc dùng

Mỗi quy tắc đều có lý do. Một quy tắc không giải thích được lý do sẽ bị phá ngay lần đầu
có người vội — và đúng ra là nên bị phá.

1. **Màu thương hiệu không bao giờ xuất hiện bên trong biểu đồ, và màu biểu đồ không bao
   giờ dùng cho nút bấm hay liên kết.** Hai bảng màu trả lời hai câu hỏi khác nhau: "bấm
   được không" và "đây là nhóm nào". Trộn lại thì người đọc sẽ thử bấm vào một cột biểu
   đồ, hoặc bỏ qua một nút vì tưởng nó là chú giải. *(Có test canh giữ.)*
2. **Đỏ GITA chỉ dùng cho đồ họa và mảng lớn.** Chữ đỏ phải dùng biến thể đậm hơn —
   `#E02B20` đạt 4,63:1, vừa đủ nhưng không còn biên an toàn khi in mờ.
3. **Dấu hiệu luôn có khoảng thở tối thiểu bằng chiều cao chữ G ở cả bốn phía.** Vệt cong
   vươn ra ngoài khung chữ nhật của nó; đặt sát mép thì hai đường cong đọc thành một hình
   rối.
4. **Không đổi tỉ lệ, không xoay, không đổ bóng, không đổi màu** ngoài hai biến thể đã có.
   Dấu hiệu được nhận ra bằng hình bóng tổng thể, nên mọi biến dạng đều phá chính thứ tạo
   ra sự nhận ra đó.
5. **Mọi tài liệu phát ra ngoài đều mang mã tài liệu ở đầu và chân trang.**
6. **Tài liệu in luôn phải đọc được khi in đen trắng.**
