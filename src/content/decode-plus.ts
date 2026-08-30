import type { DecodeRule } from '@/types';

/* =====================================================================
   MATHGITA — SƠ ĐỒ ĐỌC VỊ BÀI (BỔ SUNG)
   "Đọc vị" là kỹ năng lõi của phương pháp GITA: nhìn **dấu hiệu** trong đề
   là biết ngay **công cụ** phải dùng, không mò mẫm. Mỗi quy tắc gồm ba
   phần: dấu hiệu nhận ra — hành động phải làm — và bản chất vì sao.
   File này bổ sung cho phần đọc vị có sẵn trong từng chuyên đề, nâng mức
   phủ lên tối thiểu 8 quy tắc mỗi chuyên đề.
   ===================================================================== */

export const EXTRA_DECODE: Record<string, DecodeRule[]> = {
  /* ============================== KHỐI 6 ============================== */
  'g6-t1': [
    { signal: 'Đề cho tập hợp bằng tính chất đặc trưng, hỏi số phần tử', action: 'Liệt kê vài phần tử đầu — cuối rồi dùng công thức $(\\text{cuối}-\\text{đầu}):\\text{khoảng cách}+1$.', why: 'Dãy cách đều nên đếm được bằng công thức, không cần liệt kê hết.' },
    { signal: 'Biểu thức có nhiều tầng ngoặc $(\\;)$, $[\\;]$, $\\{\\;\\}$', action: 'Làm từ trong ra ngoài: tròn → vuông → nhọn.', why: 'Ngoặc trong cùng ràng buộc chặt nhất nên phải giải phóng trước.' },
    { signal: 'Đề yêu cầu "tính nhanh" hoặc "tính hợp lí"', action: 'Tìm cặp cộng tròn chục/trăm, hoặc đặt nhân tử chung.', why: 'Đề đã cài sẵn cấu trúc đẹp; tính thẳng là rơi vào bẫy mất thời gian.' },
    { signal: 'So sánh hai luỹ thừa $a^{m}$ và $b^{n}$', action: 'Đưa về **cùng cơ số** hoặc **cùng số mũ** rồi so sánh.', why: 'Chỉ khi cùng một trong hai yếu tố mới so sánh trực tiếp được.' },
  ],
  'g6-t2': [
    { signal: 'Bài toán chia đều, không thừa, hỏi "nhiều nhất"', action: 'Tìm **ƯCLN** của các số đã cho.', why: 'Số phần chia phải là ước chung, và ta cần giá trị lớn nhất.' },
    { signal: 'Bài toán lặp lại, gặp lại, hỏi "ít nhất"', action: 'Tìm **BCNN** của các chu kỳ.', why: 'Thời điểm trùng nhau là bội chung, ta cần giá trị nhỏ nhất.' },
    { signal: 'Số cần tìm chia $a$, $b$, $c$ **đều dư $r$**', action: 'Tìm BCNN rồi cộng thêm $r$: $n=\\text{BCNN}\\cdot k+r$.', why: 'Trừ đi $r$ thì số đó chia hết cho cả ba, tức là bội chung.' },
    { signal: 'Số cần tìm chia $a$, $b$, $c$ **đều thiếu $t$**', action: 'Tìm BCNN rồi **trừ** $t$: $n=\\text{BCNN}\\cdot k-t$.', why: 'Cộng thêm $t$ thì số đó mới chia hết — ngược chiều với dạng "dư".' },
    { signal: 'Chứng minh hai biểu thức chứa $n$ nguyên tố cùng nhau', action: 'Đặt $d$ là ƯCLN, nhân hệ số để khử $n$, rồi chặn $d$ theo ước của hằng số.', why: 'Khử biến là cách duy nhất biến bài toán vô hạn thành hữu hạn.' },
  ],
  'g6-t3': [
    { signal: 'Phép tính có nhiều dấu trừ liên tiếp', action: 'Đổi mọi phép trừ thành phép cộng số đối rồi nhóm lại.', why: 'Phép cộng có tính giao hoán và kết hợp, phép trừ thì không.' },
    { signal: 'Tích nhiều thừa số âm', action: 'Đếm **số lượng thừa số âm**: chẵn thì kết quả dương, lẻ thì âm.', why: 'Mỗi cặp âm nhân nhau cho một số dương.' },
    { signal: 'Đề có $|x|=a$ với $a>0$', action: 'Xét **hai trường hợp** $x=a$ và $x=-a$.', why: 'Hai số đối nhau có cùng khoảng cách tới $0$.' },
    { signal: 'Đề hỏi giá trị nhỏ nhất của biểu thức chứa $|x-a|$', action: 'Dùng $|x-a|\\ge0$, dấu bằng khi $x=a$.', why: 'Giá trị tuyệt đối luôn không âm, cực trị rơi đúng tại điểm triệt tiêu.' },
    { signal: 'Tìm $x$ nguyên để một phân số có tử là hằng số nhận giá trị nguyên', action: 'Cho mẫu là **ước** của tử rồi lập bảng.', why: 'Phân số nguyên khi và chỉ khi mẫu chia hết tử.' },
  ],
  'g6-t4': [
    { signal: 'Cộng, trừ hai phân số khác mẫu', action: 'Quy đồng theo **BCNN của các mẫu**, không lấy tích các mẫu.', why: 'BCNN cho mẫu chung nhỏ nhất, số nhỏ thì ít sai.' },
    { signal: 'Dãy phân số có quy luật $\\f{1}{n(n+1)}$', action: 'Tách sai phân $\\f{1}{n}-\\f{1}{n+1}$ rồi cộng dồn.', why: 'Các hạng tử giữa triệt tiêu dây chuyền, chỉ còn hai đầu.' },
    { signal: 'Bài toán "tìm một số biết $\\f{a}{b}$ của nó bằng $c$"', action: 'Lấy $c$ **chia** cho $\\f{a}{b}$.', why: 'Đây là bài toán ngược của phép nhân phân số.' },
    { signal: 'Bài toán "tìm $\\f{a}{b}$ của một số"', action: 'Lấy số đó **nhân** với $\\f{a}{b}$.', why: 'Phân biệt rõ với dạng trên — đọc kỹ đâu là số đã biết.' },
    { signal: 'So sánh hai phân số có tử hoặc mẫu gần nhau', action: 'So qua **phần bù tới $1$** hoặc bắc cầu qua một phân số trung gian.', why: 'Nhanh hơn quy đồng khi mẫu lớn.' },
  ],
  'g6-t5': [
    { signal: 'Đề cho tỉ số phần trăm và một đại lượng, hỏi đại lượng còn lại', action: 'Xác định rõ đâu là "toàn bộ" ($100\\%$), rồi lập tỉ lệ.', why: 'Chọn sai "toàn bộ" là sai toàn bài, dù phép tính đúng.' },
    { signal: 'Bài toán tăng giá rồi giảm giá (hoặc ngược lại)', action: 'Nhân liên tiếp các hệ số: tăng $a\\%$ là nhân $\\left(1+\\f{a}{100}\\right)$, giảm $b\\%$ là nhân $\\left(1-\\f{b}{100}\\right)$.', why: 'Phần trăm sau tính trên giá trị mới, nên phải nhân chứ không cộng trừ.' },
    { signal: 'Yêu cầu làm tròn đến hàng nào đó', action: 'Nhìn chữ số **ngay sau** hàng làm tròn: $\\ge5$ thì tăng, $<5$ thì giữ nguyên.', why: 'Làm tròn khác với cắt bỏ đuôi.' },
    { signal: 'Đề cho biểu đồ và hỏi số lượng thực tế', action: 'Đổi phần trăm sang số lượng qua tổng: $\\text{số lượng}=\\text{tổng}\\times\\text{tỉ lệ}$.', why: 'Biểu đồ chỉ cho tỉ lệ, phải nhân với tổng mới ra số thật.' },
  ],
  'g6-t6': [
    { signal: 'Hình ghép từ nhiều hình cơ bản', action: 'Chia nhỏ thành hình chữ nhật, tam giác, hình thang rồi **cộng hoặc trừ** diện tích.', why: 'Diện tích có tính cộng được khi các phần không chồng lên nhau.' },
    { signal: 'Bài toán lát gạch, sơn tường, làm hàng rào', action: 'Phân biệt: lát/sơn dùng **diện tích**, hàng rào dùng **chu vi**.', why: 'Đây là chỗ đọc đề sai nhiều nhất của dạng thực tế.' },
    { signal: 'Đề cho đơn vị khác nhau (m và cm, m² và dm²)', action: 'Đổi về **cùng một đơn vị** trước khi tính.', why: 'Đơn vị diện tích đổi theo bình phương: $1\\;m^{2}=10\\,000\\;cm^{2}$.' },
    { signal: 'Đề hỏi chi phí', action: 'Tính đại lượng hình học trước, nhân đơn giá sau — tách rõ hai bước.', why: 'Gộp hai bước dễ nhầm đơn vị và mất điểm trình bày.' },
  ],
  'g6-t7': [
    { signal: 'Đề hỏi số đoạn thẳng từ $n$ điểm thẳng hàng', action: 'Dùng công thức $\\f{n(n-1)}{2}$.', why: 'Mỗi đoạn thẳng ứng với một cách chọn $2$ điểm trong $n$.' },
    { signal: 'Điểm $M$ nằm giữa $A$ và $B$', action: 'Viết ngay hệ thức $AM+MB=AB$.', why: 'Đây là điều kiện định lượng duy nhất của quan hệ "nằm giữa".' },
    { signal: 'Đề nói $M$ là trung điểm của $AB$', action: 'Dùng đồng thời $MA=MB$ **và** $MA=\\f{AB}{2}$.', why: 'Trung điểm cần cả hai: cách đều và nằm giữa.' },
    { signal: 'Hai tia $Ox$, $Oy$ đối nhau', action: 'Suy ra $\\angle xOy=180\\deg$ và mọi góc kề nhau đều bù nhau.', why: 'Hai tia đối tạo thành một đường thẳng.' },
  ],
  'g6-t8': [
    { signal: 'Đề cho bảng số liệu, hỏi vẽ biểu đồ tranh hoặc cột', action: 'Chọn khoá quy đổi cho biểu đồ tranh; biểu đồ cột thì thống nhất một thang chia.', why: 'Sai thang chia làm biểu đồ mất ý nghĩa so sánh.' },
    { signal: 'Hỏi xác suất thực nghiệm', action: 'Lấy $\\f{\\text{số lần biến cố xảy ra}}{\\text{tổng số lần thực hiện}}$.', why: 'Xác suất thực nghiệm là tần số tương đối, chỉ **xấp xỉ** xác suất lí thuyết.' },
    { signal: 'Từ khoá "chắc chắn", "không thể", "có thể"', action: 'Phân loại ngay: chắc chắn ($P=1$) · không thể ($P=0$) · ngẫu nhiên ($0<P<1$).', why: 'Ba loại biến cố ứng với ba mốc xác suất cố định.' },
    { signal: 'Đề hỏi giá trị xuất hiện nhiều nhất', action: 'Tìm **mốt** — chỉ cần đếm tần số, không cần tính trung bình.', why: 'Mốt là giá trị có tần số lớn nhất, khác hẳn số trung bình.' },
    { signal: 'Số liệu có một giá trị lệch hẳn (rất lớn hoặc rất nhỏ)', action: 'Cân nhắc dùng **trung vị** thay cho trung bình cộng.', why: 'Giá trị bất thường kéo lệch trung bình nhưng ít ảnh hưởng trung vị.' },
  ],

  /* ============================== KHỐI 7 ============================== */
  'g7-t1': [
    { signal: 'Số thập phân vô hạn tuần hoàn cần đổi ra phân số', action: 'Đặt $x$ bằng số đó, nhân $10^{k}$ với $k$ là độ dài chu kỳ rồi trừ.', why: 'Phép trừ khử được phần đuôi vô hạn giống nhau.' },
    { signal: 'Hỏi phân số nào viết được dạng thập phân hữu hạn', action: 'Rút gọn về **tối giản** rồi xem mẫu chỉ có ước nguyên tố $2$ và $5$ hay không.', why: 'Hệ thập phân dựa trên $10=2\\cdot5$.' },
    { signal: 'Biểu thức chứa $\\s{A^{2}}$', action: 'Viết thành $|A|$ rồi **xét dấu $A$** để bỏ dấu giá trị tuyệt đối.', why: 'Căn bậc hai số học luôn cho kết quả không âm.' },
    { signal: 'Có căn ở mẫu số', action: 'Trục căn thức: nhân với chính căn đó, hoặc nhân với biểu thức liên hợp.', why: 'Mẫu không căn thì mới so sánh và tính toán được.' },
    { signal: 'Phương trình dạng $|A|=|B|$', action: 'Xét hai trường hợp $A=B$ và $A=-B$.', why: 'Hai số có cùng giá trị tuyệt đối thì bằng nhau hoặc đối nhau.' },
  ],
  'g7-t2': [
    { signal: 'Điều kiện có **hệ số** như $2x+3y=k$', action: 'Nhân hệ số vào **cả tử và mẫu** của tỉ số tương ứng rồi mới cộng.', why: 'Chỉ được cộng tử với tử khi các tỉ số đã đúng dạng đề cho.' },
    { signal: 'Điều kiện chứa **tích** hoặc **bình phương**', action: 'Đặt tỉ số chung bằng $t$, biểu diễn các ẩn theo $t$ rồi thay vào.', why: 'Tính chất cộng tử mẫu không áp dụng được cho tích.' },
    { signal: 'Bài toán chia phần theo tỉ lệ nghịch', action: 'Chia **tỉ lệ thuận với nghịch đảo** của các số đã cho.', why: 'Tỉ lệ nghịch với $a$ chính là tỉ lệ thuận với $\\f{1}{a}$.' },
    { signal: 'Dãy tỉ số mà mẫu có thể bằng $0$', action: 'Xét riêng trường hợp tổng các mẫu bằng $0$.', why: 'Tính chất dãy tỉ số bằng nhau đòi hỏi mẫu tổng khác $0$.' },
  ],
  'g7-t3': [
    { signal: 'Đa thức chưa thu gọn', action: 'Thu gọn và **sắp xếp theo luỹ thừa giảm dần** trước khi làm bất cứ việc gì.', why: 'Bậc, hệ số cao nhất, hệ số tự do chỉ đọc đúng khi đã thu gọn.' },
    { signal: 'Hỏi "$x=a$ có là nghiệm không"', action: 'Thay $a$ vào và kiểm tra kết quả có bằng $0$ hay không.', why: 'Nghiệm là giá trị làm đa thức triệt tiêu.' },
    { signal: 'Tìm tham số để $x=a$ là nghiệm', action: 'Giải phương trình $P(a)=0$ theo tham số.', why: 'Đây là bài toán ngược của việc kiểm tra nghiệm.' },
    { signal: 'Cộng, trừ hai đa thức', action: 'Đặt theo cột cùng bậc, chú ý **đổi dấu toàn bộ** đa thức bị trừ.', why: 'Dấu trừ trước ngoặc đổi dấu tất cả hạng tử bên trong.' },
    { signal: 'Chứng minh đa thức vô nghiệm', action: 'Đưa về dạng tổng bình phương cộng hằng số dương.', why: 'Bình phương không âm nên tổng luôn dương, không thể bằng $0$.' },
  ],
  'g7-t4': [
    { signal: 'Hai đường thẳng song song bị cắt bởi cát tuyến', action: 'Nhớ ba cặp: so le trong **bằng nhau**, đồng vị **bằng nhau**, trong cùng phía **bù nhau**.', why: 'Đây là toàn bộ công cụ tính góc của chuyên đề này.' },
    { signal: 'Hai đường thẳng cùng vuông góc với đường thứ ba', action: 'Kết luận hai đường đó song song với nhau.', why: 'Quan hệ vuông góc — song song bắc cầu qua đường trung gian.' },
    { signal: 'Cần tính góc nhưng chưa có đường song song nào', action: '**Kẻ đường phụ** song song với một trong hai đường đã cho, đi qua đỉnh góc cần tính.', why: 'Đường phụ tách góc lớn thành hai góc tính được bằng so le trong.' },
    { signal: 'Đề cho tia phân giác của một góc', action: 'Viết ngay hai góc con bằng nhau và bằng nửa góc đã cho.', why: 'Phân giác chia góc thành hai phần bằng nhau — dữ kiện định lượng.' },
  ],
  'g7-t5': [
    { signal: 'Cần chứng minh hai đoạn thẳng (hoặc hai góc) bằng nhau', action: 'Tìm **hai tam giác chứa chúng** rồi chứng minh hai tam giác đó bằng nhau.', why: 'Đây là con đường chuẩn: bằng nhau của tam giác kéo theo bằng nhau của mọi yếu tố tương ứng.' },
    { signal: 'Có trung điểm và một đoạn kéo dài gấp đôi', action: 'Ghép hai tam giác với **góc đối đỉnh** ở giữa, dùng c.g.c.', why: 'Mô hình này xuất hiện trong hầu hết đề học kì.' },
    { signal: 'Cần chứng minh tổng hai đoạn bằng một đoạn thứ ba', action: 'Cắt đoạn dài thành đúng hai phần rồi chứng minh từng phần bằng nhau.', why: 'Biến bài toán tổng thành hai bài toán bằng nhau đơn giản hơn.' },
    { signal: 'Cần chứng minh ba điểm thẳng hàng', action: 'Chứng minh hai tia đối nhau, hoặc tổng hai góc kề bằng $180\\deg$.', why: 'Thẳng hàng tương đương góc bẹt tại điểm giữa.' },
    { signal: 'Đề cho tam giác cân và một đường đặc biệt từ đỉnh', action: 'Dùng ngay: trong tam giác cân, đường phân giác từ đỉnh đồng thời là trung tuyến, đường cao và trung trực.', why: 'Một dữ kiện cho bốn kết luận — tiết kiệm rất nhiều bước.' },
  ],
  'g7-t6': [
    { signal: 'Đề cho hình lăng trụ đứng, hỏi diện tích xung quanh', action: 'Dùng $S_{xq}=C_{\\text{đáy}}\\cdot h$ (chu vi đáy nhân chiều cao).', why: 'Trải mặt xung quanh ra được hình chữ nhật có kích thước là chu vi đáy và chiều cao.' },
    { signal: 'Hỏi diện tích toàn phần', action: 'Cộng thêm **hai** mặt đáy: $S_{tp}=S_{xq}+2S_{\\text{đáy}}$.', why: 'Lăng trụ có hai đáy bằng nhau ở hai đầu.' },
    { signal: 'Bài toán làm hộp, thùng không nắp', action: 'Trừ bớt một mặt đáy khỏi diện tích toàn phần.', why: 'Đọc kỹ "có nắp" hay "không nắp" — đây là bẫy của dạng thực tế.' },
    { signal: 'Đề cho thể tích và hỏi chiều cao (hoặc ngược lại)', action: 'Dùng $V=S_{\\text{đáy}}\\cdot h$ rồi giải phương trình một ẩn.', why: 'Công thức thể tích dùng được theo cả hai chiều xuôi và ngược.' },
    { signal: 'Bài toán đổ nước, đơn vị lít', action: 'Nhớ $1\\;dm^{3}=1$ lít và $1\\;m^{3}=1000$ lít.', why: 'Sai quy đổi đơn vị là mất trọn điểm dù công thức đúng.' },
  ],
  'g7-t7': [
    { signal: 'Đề cho biểu đồ hình quạt tròn', action: 'Nhớ hai mốc: cả hình tròn ứng với $360\\deg$ và với $100\\%$.', why: 'Mọi phép tính của dạng này đều quy về hai mốc đó.' },
    { signal: 'Hỏi góc ở tâm của một phần', action: 'Lấy $\\f{\\text{phần đó}}{\\text{tổng}}\\times360\\deg$.', why: 'Góc ở tâm tỉ lệ thuận với số liệu của phần tương ứng.' },
    { signal: 'Đề cho biểu đồ đoạn thẳng', action: 'Đọc **xu hướng** qua độ dốc: dốc lên là tăng, dốc xuống là giảm, dốc càng đứng biến động càng mạnh.', why: 'Biểu đồ đoạn thẳng sinh ra để thể hiện thay đổi theo thời gian.' },
    { signal: 'Hỏi "tăng bao nhiêu phần trăm so với..."', action: 'Lấy $\\f{\\text{giá trị mới}-\\text{giá trị cũ}}{\\text{giá trị cũ}}\\times100\\%$.', why: 'Mốc so sánh luôn là giá trị **cũ** — đây là chỗ hay đặt sai mẫu số.' },
    { signal: 'Gieo xúc xắc, tung đồng xu, rút thẻ', action: 'Đếm số kết quả thuận lợi chia tổng số kết quả **đồng khả năng**.', why: 'Công thức xác suất lí thuyết chỉ đúng khi các kết quả đồng khả năng.' },
  ],

  /* ============================== KHỐI 8 ============================== */
  'g8-t1': [
    { signal: 'Biểu thức có dạng $A^{2}\\pm2AB+B^{2}$', action: 'Viết ngay thành $(A\\pm B)^{2}$.', why: 'Nhận dạng hằng đẳng thức nhanh hơn mọi cách khai triển.' },
    { signal: 'Đa thức bậc hai $ax^{2}+bx+c$ khó nhóm', action: 'Tách hạng tử giữa thành hai số có **tổng $b$, tích $ac$**.', why: 'Sau khi tách sẽ nhóm được thành hai cặp có nhân tử chung.' },
    { signal: 'Cần tính nhanh giá trị số như $99^{2}$, $101\\cdot99$', action: 'Đưa về hằng đẳng thức với số tròn chục, tròn trăm.', why: '$99^{2}=(100-1)^{2}$ tính nhẩm được, nhân trực tiếp thì không.' },
    { signal: 'Bốn thừa số bậc nhất nhân nhau cộng hằng số', action: 'Ghép cặp sao cho **tổng hai hằng số trong mỗi cặp bằng nhau**, rồi đặt ẩn phụ.', why: 'Cách ghép đó tạo ra hai biểu thức chỉ khác nhau một hằng số.' },
  ],
  'g8-t2': [
    { signal: 'Bắt đầu mọi bài phân thức', action: 'Viết **điều kiện xác định** — phân tích mẫu thành nhân tử rồi cho từng nhân tử khác $0$.', why: 'Thiếu điều kiện là mất điểm ngay cả khi kết quả đúng.' },
    { signal: 'Cộng, trừ phân thức khác mẫu', action: 'Phân tích các mẫu thành nhân tử để tìm **mẫu thức chung nhỏ nhất**.', why: 'Lấy tích các mẫu sẽ cho biểu thức cồng kềnh, dễ sai.' },
    { signal: 'Cần tính giá trị của phân thức tại một điểm', action: '**Rút gọn trước, thay số sau**, và luôn đối chiếu điều kiện.', why: 'Thay số vào biểu thức chưa rút gọn cho số rất lớn, dễ sai.' },
    { signal: 'Hỏi "tìm $x$ nguyên để biểu thức nguyên"', action: 'Tách phần nguyên rồi cho mẫu là ước của phần dư.', why: 'Sau khi tách, phần chứa biến chỉ còn ở mẫu — bài toán về ước số.' },
    { signal: 'Đề hỏi giá trị của biểu thức **không phụ thuộc** vào biến', action: 'Rút gọn triệt để; nếu kết quả là hằng số thì đó là đáp án.', why: 'Nhiều đề cố tình dựng biểu thức rút gọn ra hằng số để kiểm tra kỹ năng.' },
  ],
  'g8-t3': [
    { signal: 'Phương trình có mẫu số', action: 'Nhân hai vế với **BCNN các mẫu**, nhớ nhân cả vế phải.', why: 'Khử mẫu là bước bắt buộc trước khi chuyển vế.' },
    { signal: 'Phương trình có dạng tích bằng $0$', action: 'Cho **từng thừa số** bằng $0$, giải hết các nhánh.', why: 'Tích bằng $0$ khi ít nhất một thừa số bằng $0$.' },
    { signal: 'Bài toán chuyển động', action: 'Lập bảng ba cột **quãng đường – vận tốc – thời gian**, điền dữ kiện rồi tìm quan hệ còn thiếu.', why: 'Bảng giúp thấy ngay đại lượng nào bằng nhau để lập phương trình.' },
    { signal: 'Bài toán năng suất, làm chung làm riêng', action: 'Đặt ẩn là **thời gian**, tính năng suất bằng $\\f{1}{\\text{thời gian}}$ rồi cộng năng suất.', why: 'Năng suất cộng được, thời gian thì không.' },
    { signal: 'Bài toán giảm giá phần trăm', action: 'Giảm $a\\%$ thì phải trả $(100-a)\\%$ — nhân với $1-\\f{a}{100}$.', why: 'Nhầm phần được giảm với phần phải trả là sai bản chất.' },
  ],
  'g8-t4': [
    { signal: 'Hỏi điểm có thuộc đồ thị hay không', action: 'Thay toạ độ điểm vào hàm số, xem đẳng thức có đúng không.', why: 'Điểm thuộc đồ thị khi và chỉ khi toạ độ thoả mãn công thức hàm số.' },
    { signal: 'Đề cho "hệ số góc"', action: 'Đó chính là hệ số $a$ đứng trước $x$.', why: 'Hệ số góc quyết định độ dốc và chiều biến thiên của đường thẳng.' },
    { signal: 'Hai đường thẳng song song', action: 'Đặt điều kiện $a=a\'$ và $b\\ne b\'$.', why: 'Cùng độ dốc nhưng khác tung độ gốc thì không bao giờ gặp nhau.' },
    { signal: 'Tìm toạ độ giao điểm của hai đường thẳng', action: 'Giải phương trình hoành độ giao điểm, rồi **thay lại** để tìm tung độ.', why: 'Toạ độ cần đủ hai số; quên bước thay lại là mất nửa điểm.' },
    { signal: 'Tìm giao điểm với hai trục toạ độ', action: 'Cho $x=0$ để có giao với trục tung; cho $y=0$ để có giao với trục hoành.', why: 'Trên trục tung thì hoành độ bằng $0$ và ngược lại.' },
  ],
  'g8-t5': [
    { signal: 'Cần chứng minh một tứ giác là hình bình hành', action: 'Chọn một trong bốn dấu hiệu; thường dùng nhất là "hai đường chéo cắt nhau tại trung điểm mỗi đường".', why: 'Dấu hiệu này chỉ cần một điểm và hai đoạn bằng nhau.' },
    { signal: 'Đã có hình bình hành, cần lên hình chữ nhật', action: 'Chứng minh thêm **một góc vuông** hoặc **hai đường chéo bằng nhau**.', why: 'Sơ đồ nhận biết đi từ hình chung tới hình riêng, mỗi bước thêm một điều kiện.' },
    { signal: 'Đã có hình bình hành, cần lên hình thoi', action: 'Chứng minh thêm **hai cạnh kề bằng nhau** hoặc **hai đường chéo vuông góc**.', why: 'Cùng sơ đồ như trên nhưng theo nhánh cạnh thay vì nhánh góc.' },
    { signal: 'Xuất hiện hai trung điểm của hai cạnh tam giác', action: 'Dùng ngay **đường trung bình**: song song cạnh thứ ba và bằng nửa cạnh ấy.', why: 'Đây là công cụ tạo ra quan hệ song song "từ không có gì".' },
    { signal: 'Tam giác vuông có trung điểm cạnh huyền', action: 'Dùng: trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.', why: 'Trung điểm cạnh huyền cách đều ba đỉnh.' },
  ],
  'g8-t6': [
    { signal: 'Có đường thẳng song song với một cạnh tam giác', action: 'Viết ngay dãy tỉ số theo **định lí Thalès**.', why: 'Song song là nguồn duy nhất sinh ra tỉ lệ đoạn thẳng ở chuyên đề này.' },
    { signal: 'Cần chứng minh hai tam giác đồng dạng', action: 'Ưu tiên tìm **hai cặp góc bằng nhau** (trường hợp g.g) — nhanh nhất.', why: 'Góc dễ tìm hơn cạnh, nhất là khi có song song hoặc đường cao.' },
    { signal: 'Cần chứng minh hệ thức dạng $AB\\cdot CD=EF\\cdot GH$', action: 'Đưa về tỉ số $\\f{AB}{EF}=\\f{GH}{CD}$ rồi tìm hai tam giác đồng dạng cho tỉ số ấy.', why: 'Mọi hệ thức tích đều xuất phát từ một cặp tam giác đồng dạng.' },
    { signal: 'Đề cho tia phân giác trong tam giác', action: 'Dùng $\\f{AB}{AC}=\\f{DB}{DC}$ với $D$ là chân phân giác.', why: 'Phân giác chia cạnh đối diện theo tỉ số hai cạnh kề.' },
    { signal: 'Hỏi tỉ số diện tích của hai tam giác đồng dạng', action: 'Lấy **bình phương** tỉ số đồng dạng.', why: 'Diện tích là đại lượng hai chiều nên tỉ lệ theo $k^{2}$.' },
  ],
  'g8-t7': [
    { signal: 'Tam giác có một góc vuông, biết hai cạnh', action: 'Dùng Pythagore để tìm cạnh còn lại.', why: 'Quan hệ $a^{2}=b^{2}+c^{2}$ chỉ cần hai cạnh là đủ.' },
    { signal: 'Biết ba cạnh, hỏi tam giác có vuông không', action: 'Kiểm tra Pythagore **đảo**: bình phương cạnh lớn nhất có bằng tổng bình phương hai cạnh kia không.', why: 'Định lí đảo là công cụ nhận biết tam giác vuông từ số đo.' },
    { signal: 'Hình chóp đều, hỏi diện tích xung quanh', action: 'Dùng $S_{xq}=\\f{1}{2}\\cdot C_{\\text{đáy}}\\cdot d$ với $d$ là **trung đoạn**.', why: 'Mỗi mặt bên là tam giác cân có đường cao chính là trung đoạn.' },
    { signal: 'Hình chóp, hỏi thể tích', action: 'Dùng $V=\\f{1}{3}S_{\\text{đáy}}\\cdot h$ với $h$ là **chiều cao**, không phải trung đoạn.', why: 'Phân biệt trung đoạn (cho diện tích) với chiều cao (cho thể tích).' },
  ],
  'g8-t8': [
    { signal: 'Đề cho bảng tần số, hỏi xác suất thực nghiệm', action: 'Cộng đúng các tần số thoả điều kiện rồi chia cho tổng $N$.', why: 'Sai ở bước "cộng đúng nhóm nào" là sai kết quả.' },
    { signal: 'Từ khoá "dưới", "trên", "ít nhất", "không quá"', action: 'Xác định rõ có bao gồm giá trị mốc hay không: "dưới/trên" thì **không**, "ít nhất/không quá" thì **có**.', why: 'Đây là bẫy ngôn ngữ được cài trong hầu hết đề trắc nghiệm.' },
    { signal: 'Bài toán chọn ngẫu nhiên từ hai nhóm', action: 'Đếm tổng số phần tử của **cả hai nhóm** làm mẫu số.', why: 'Không gian mẫu là toàn bộ đối tượng có thể chọn.' },
    { signal: 'Hỏi ước lượng số lần xảy ra khi lặp $n$ lần', action: 'Lấy xác suất nhân với $n$.', why: 'Xác suất là tỉ lệ kỳ vọng, nhân với số lần thử cho số lần dự đoán.' },
    { signal: 'Số liệu cho ở dạng biểu đồ chứ không phải bảng', action: 'Lập bảng thống kê từ biểu đồ trước, rồi mới tính.', why: 'Đọc trực tiếp từ biểu đồ dễ sót hoặc đọc nhầm cột.' },
  ],

  /* ============================== KHỐI 9 ============================== */
  'g9-t1': [
    { signal: 'Bài toán có thêm điều kiện phụ như $x=y$ hoặc $x+y=k$', action: 'Thay điều kiện phụ vào phương trình **không chứa tham số** trước.', why: 'Tìm được nghiệm cụ thể rồi mới thay vào phương trình có tham số — ngắn hơn nhiều.' },
    { signal: 'Bài toán phần trăm hai đối tượng', action: 'Một phương trình cho **tổng số lượng**, một phương trình cho **tổng phần đạt**.', why: 'Hai loại thông tin khác nhau cho hai phương trình độc lập.' },
    { signal: 'Bài toán ca nô xuôi ngược dòng', action: 'Vận tốc xuôi $=v+v_{n}$, ngược $=v-v_{n}$; quãng đường hai chiều bằng nhau.', why: 'Dòng nước đẩy theo hoặc cản lại đúng bằng vận tốc của nó.' },
  ],
  'g9-t2': [
    { signal: 'Căn thức nằm ở **mẫu**', action: 'Điều kiện là biểu thức dưới căn $>0$, không phải $\\ge0$.', why: 'Vừa cần căn có nghĩa vừa cần mẫu khác $0$.' },
    { signal: 'Biểu thức dạng $a\\pm2\\s{b}$ dưới một dấu căn lớn', action: 'Tách thành $(\\s{m}\\pm\\s{n})^{2}$ với $m+n=a$, $mn=b$.', why: 'Đây là kỹ thuật "căn kép" — cách duy nhất rút gọn được dạng này.' },
    { signal: 'Cần so sánh hai biểu thức chứa căn', action: 'Bình phương hai vế (khi cả hai không âm) hoặc đưa hết vào trong một dấu căn.', why: 'Bình phương là phép biến đổi tương đương trên miền không âm.' },
  ],
  'g9-t3': [
    { signal: 'Đề nói "phương trình có hai nghiệm" mà chưa cho $\\Delta$', action: 'Tính $\\Delta$ và khẳng định $\\Delta>0$ **trước** khi dùng Viète.', why: 'Không có nghiệm thì không có tổng và tích để nói tới — mất điểm lập luận.' },
    { signal: 'Biểu thức đối xứng của hai nghiệm', action: 'Biểu diễn qua $S$ và $P$, tuyệt đối không giải phương trình.', why: 'Mọi biểu thức đối xứng đều viết được qua tổng và tích.' },
    { signal: 'Hỏi điều kiện để hai nghiệm trái dấu', action: 'Chỉ cần $P<0$, không cần thêm $\\Delta>0$.', why: '$P<0$ đã tự kéo theo $\\Delta>0$.' },
    { signal: 'Hỏi số giao điểm của parabol và đường thẳng', action: 'Lập phương trình hoành độ giao điểm rồi xét dấu $\\Delta$.', why: 'Số giao điểm chính là số nghiệm của phương trình đó.' },
    { signal: 'Họ đường thẳng phụ thuộc tham số $m$, hỏi điểm cố định', action: 'Nhóm theo $m$ rồi cho **cả hệ số của $m$ và phần còn lại** bằng $0$.', why: 'Đẳng thức đúng với mọi $m$ khi và chỉ khi hai phần đều triệt tiêu.' },
  ],
  'g9-t4': [
    { signal: 'Nhân hoặc chia hai vế bất phương trình cho một số **âm**', action: '**Đổi chiều** dấu bất đẳng thức.', why: 'Nhân số âm làm đảo thứ tự trên trục số.' },
    { signal: 'Bất phương trình có mẫu chứa ẩn', action: 'Không nhân chéo trực tiếp — chuyển hết về một vế rồi **xét dấu** biểu thức.', why: 'Chưa biết dấu của mẫu nên không biết có phải đổi chiều hay không.' },
    { signal: 'Cần chứng minh $A\\ge B$ với $A$, $B$ là biểu thức', action: 'Xét hiệu $A-B$ và đưa về tổng các bình phương.', why: 'Bình phương luôn không âm — cách chứng minh chắc chắn nhất.' },
    { signal: 'Bài cực trị có ràng buộc tổng bằng hằng số', action: 'Dự đoán điểm rơi tại các biến bằng nhau, rồi chọn cách áp Cô-si cho khớp.', why: 'Không dự đoán điểm rơi thì bất đẳng thức thu được sẽ không chặt.' },
    { signal: 'Tổng phân thức có tử là bình phương', action: 'Dùng Cauchy–Schwarz dạng cộng mẫu $\\f{a^{2}}{x}+\\f{b^{2}}{y}\\ge\\f{(a+b)^{2}}{x+y}$.', why: 'Gộp được nhiều phân thức thành một, cực kỳ hiệu quả.' },
  ],
  'g9-t5': [
    { signal: 'Tam giác vuông có đường cao ứng với cạnh huyền', action: 'Viết ngay bốn hệ thức: $b^{2}=ab\'$, $c^{2}=ac\'$, $h^{2}=b\'c\'$, $ah=bc$.', why: 'Cấu hình này luôn cho ba cặp tam giác đồng dạng, sinh ra bốn hệ thức.' },
    { signal: 'Biết một cạnh và một góc nhọn của tam giác vuông', action: 'Dùng tỉ số lượng giác để tìm cạnh còn lại.', why: 'Mỗi tỉ số lượng giác nối một góc với hai cạnh cụ thể.' },
    { signal: 'Bài toán thực tế đo chiều cao, khoảng cách', action: 'Vẽ tam giác vuông mô tả, xác định rõ đâu là cạnh đối, kề, huyền so với góc đã cho.', why: 'Vẽ đúng hình là xong nửa bài; sai vai trò cạnh là sai công thức.' },
    { signal: 'Hai góc phụ nhau', action: 'Dùng $\\sin\\alpha=\\cos(90\\deg-\\alpha)$ và $\\tan\\alpha=\\cot(90\\deg-\\alpha)$.', why: 'Hai góc phụ nhau đổi vai trò cạnh đối và cạnh kề cho nhau.' },
  ],
  'g9-t6': [
    { signal: 'Cần chứng minh tứ giác nội tiếp', action: 'Hoặc hai góc đối bù nhau, hoặc hai đỉnh kề cùng nhìn một cạnh dưới góc bằng nhau.', why: 'Hai dấu hiệu này phủ gần như toàn bộ đề thi vào 10.' },
    { signal: 'Đề có hai đường cao hoặc hai góc vuông', action: 'Săn ngay tứ giác nội tiếp đường tròn đường kính là cạnh chung.', why: 'Hai góc vuông cùng nhìn một đoạn là dấu hiệu mạnh nhất.' },
    { signal: 'Từ một điểm ngoài đường tròn kẻ tiếp tuyến và cát tuyến', action: 'Dùng hệ thức phương tích $MT^{2}=MA\\cdot MB$.', why: 'Sinh ra từ cặp tam giác đồng dạng nhờ góc tiếp tuyến – dây.' },
    { signal: 'Cần chứng minh một đường là tiếp tuyến', action: 'Chứng minh nó vuông góc với bán kính tại điểm nằm trên đường tròn.', why: 'Đây là định nghĩa – dấu hiệu nhận biết tiếp tuyến.' },
  ],
  'g9-t7': [
    { signal: 'Quay tam giác vuông quanh một cạnh góc vuông', action: 'Cạnh quay là **chiều cao**, cạnh kia là **bán kính**, cạnh huyền là **đường sinh**.', why: 'Xác định đúng ba vai trò này thì mọi công thức hình nón đều dùng được.' },
    { signal: 'Hỏi diện tích xung quanh hình nón', action: 'Dùng $S_{xq}=\\pi rl$ với $l$ là **đường sinh**, không phải chiều cao.', why: 'Trải mặt xung quanh ra được hình quạt bán kính $l$.' },
    { signal: 'Biết $r$ và $h$ của hình nón, cần $l$', action: 'Dùng Pythagore: $l=\\s{r^{2}+h^{2}}$.', why: 'Bán kính, chiều cao và đường sinh tạo thành tam giác vuông.' },
    { signal: 'Bài toán bể chứa, phao, quả bóng', action: 'Nhận dạng khối: trụ ($V=\\pi r^{2}h$) · nón ($V=\\f{1}{3}\\pi r^{2}h$) · cầu ($V=\\f{4}{3}\\pi R^{3}$).', why: 'Ba công thức chỉ khác nhau ở hệ số — nhớ theo hệ số là an toàn nhất.' },
    { signal: 'Khối ghép từ nhiều hình', action: 'Tách thành các khối cơ bản rồi cộng hoặc trừ thể tích.', why: 'Thể tích cộng được khi các phần không chồng lên nhau.' },
  ],
  'g9-t8': [
    { signal: 'Đề cho bảng tần số ghép nhóm', action: 'Lấy **giá trị đại diện** của mỗi nhóm (trung điểm) rồi tính như bảng thường.', why: 'Ghép nhóm làm mất số liệu gốc nên phải thay bằng đại diện.' },
    { signal: 'Hỏi tần số tương đối', action: 'Lấy tần số chia tổng rồi nhân $100\\%$.', why: 'Tần số tương đối cho phép so sánh giữa các bộ dữ liệu khác cỡ.' },
    { signal: 'Phép thử gồm **hai giai đoạn** (tung hai lần, rút hai thẻ)', action: 'Lập **sơ đồ hình cây** hoặc bảng để liệt kê đủ không gian mẫu.', why: 'Liệt kê nhẩm rất dễ sót trường hợp; sơ đồ cây bảo đảm không bỏ sót.' },
    { signal: 'Đề hỏi xác suất của biến cố "ít nhất một..."', action: 'Tính xác suất biến cố **đối** rồi lấy $1$ trừ đi.', why: 'Biến cố đối ("không có cái nào") thường chỉ có một trường hợp, đếm nhanh hơn nhiều.' },
    { signal: 'Rút thẻ, chọn người **không hoàn lại**', action: 'Sau mỗi lần chọn, tổng số giảm đi $1$.', why: 'Không hoàn lại thì không gian mẫu thay đổi giữa hai giai đoạn.' },
  ],
};
