/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · KHO KHỐI 4 – KHỐI 5

   BIÊN SOẠN MỚI — không rút từ tài liệu gốc. Kho gốc của Học viện
   chưa có phần này. Nội dung dưới đây dựng theo đúng khung mà khối
   1–3 đã dùng, và cần Hội đồng Chuyên môn của Học viện duyệt trước
   khi đưa vào dạy.

   VÌ SAO CÓ KHO NÀY. Tài liệu gốc chỉ triển khai chi tiết tới khối
   3. Khối 4 và khối 5 mới có danh mục tên chuyên đề, chưa có nội
   dung dạy. Chính kho CHUYÊN ĐỀ đã ghi đây là nợ nội dung. Kho này
   lấp nợ đó.

   BÁM VÀO ĐÂU. Ba thứ giữ nguyên, không tự đổi:
   1) Mã và tên 100 chuyên đề — lấy đúng danh mục CD_DE_TAI
      (GV4.1.01 – GV4.5.10 và GV5.1.01 – GV5.5.10).
   2) Trọng tâm khối và nhịp dự án — lấy đúng CD_KHUNG:
      khối 4 “Tư duy hệ thống, chuẩn tạo giá trị thật”, dự án 4–8
      tuần; khối 5 “Thủ lĩnh THCS, tư duy chiến lược”, dự án 8–12
      tuần. Mỗi khối 50 chuyên đề = 5 nhóm × 10.
   3) Khung 11 pha của một chuyên đề 2 tiết × 45 phút — lấy đúng
      GA_KHUNG_TIET.
   Tên nhóm ở cột “Nhóm” viết đúng chuỗi mà CD_DE_TAI đang dùng cho
   khối 1–3, để hai danh mục ghép được với nhau. Tên nhóm đầy đủ
   nằm ở CD_NHOM.

   PHẦN NÀO LÀ MỚI. Toàn bộ cột “Nội dung cốt lõi”, toàn bộ 100 khẩu
   quyết, 10 khung dự án, hai giáo án mẫu, bảng khác biệt và bộ luật
   dạy. Đây là sáng tác sư phạm, không phải trích nguồn.

   BA VIỆC KHO NÀY KHÔNG LÀM: không nêu số liệu nghiên cứu, không
   nêu tên người thật làm tấm gương, không viện dẫn văn bản pháp
   luật. Chỗ nào cần một tấm gương cụ thể thì kho ghi “tư liệu nhà
   trường cung cấp” và để Hội đồng Chuyên môn chọn nhân vật.

   ĐỘ TUỔI. Khối 4 khoảng 9–10 tuổi, khối 5 khoảng 10–11 tuổi.
   Mọi việc giao cho học sinh phải làm được trong một tuần bằng
   giấy, bút và điện thoại của người lớn.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Danh mục 100 chuyên đề khối 4 và khối 5 · dạng bang ──
     Mã và tên: theo danh mục gốc. Nội dung cốt lõi: viết mới, mỗi
     ô là một việc học sinh làm được và người dạy kiểm được. */
  G.K45_DE_TAI = [
    ['Mã', 'Khối', 'Nhóm', 'Tên chuyên đề', 'Nội dung cốt lõi'],
    ['GV4.1.01', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Chính trực & danh dự', 'Báo đúng phần việc mình đã làm, kể cả khi phần đó còn ít.'],
    ['GV4.1.02', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Trách nhiệm lựa chọn', 'Trước khi chọn, viết ba tên: ai được lợi, ai bị thiệt, ai phải dọn hậu quả.'],
    ['GV4.1.03', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Văn hoá tranh luận văn minh', 'Nói theo mẫu “em không đồng ý ý này, vì dữ kiện này”; không nhắc tên người.'],
    ['GV4.1.04', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Tử tế có nguyên tắc', 'Giúp bạn đúng một bước, không làm hộ cả bài, không nói dối giúp bạn.'],
    ['GV4.1.05', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Không chạy theo đám đông', 'Đứng yên 10 giây và hỏi một câu trước khi làm theo nhóm bạn.'],
    ['GV4.1.06', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Tôn trọng khác biệt sâu', 'Tìm một điểm mạnh của bạn mình ít chơi cùng nhất, rồi nói với bạn ấy.'],
    ['GV4.1.07', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Văn hoá “đúng chuẩn” trong tập thể', 'Việc nhóm giao: đúng giờ, đúng mẫu, đúng số lượng; thiếu thì báo trước hạn.'],
    ['GV4.1.08', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Công dân số chuẩn mực', 'Chỉ chia sẻ tin khi tìm được hai nơi khác cùng nói chuyện đó.'],
    ['GV4.1.09', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Tiết kiệm – môi trường', 'Đếm rác giấy của tổ trong 5 ngày, chọn cắt đúng một nguồn rác.'],
    ['GV4.1.10', 'Khối 4', 'N1 · Văn hoá – Phẩm chất', 'Văn hoá phụng sự bền vững', 'Chọn một việc giúp người làm đều được 8 tuần, có lịch và có người phụ trách.'],
    ['GV4.2.01', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Kỷ luật 90 ngày', 'Chọn hai thói quen, tick mỗi ngày, mỗi Chủ nhật đếm số ngày đạt.'],
    ['GV4.2.02', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Học sâu 25 phút', 'Cất đồ gây xao nhãng khỏi bàn, đặt chuông 25 phút, làm đúng một việc.'],
    ['GV4.2.03', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Đọc sâu & ghi chú', 'Mỗi phần đọc ghi ba dòng: một từ khoá, một ý chính, một câu còn thắc mắc.'],
    ['GV4.2.04', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Tự học theo mục tiêu', 'Mục tiêu tuần có số và có hạn, chia thành ba việc, chiều thứ Sáu tự chấm.'],
    ['GV4.2.05', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Quản trị áp lực (toolkit)', 'Khi căng: thở 4 nhịp, cắt việc còn một phần nhỏ, nói với một người lớn.'],
    ['GV4.2.06', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Luyện tập có chiến lược', 'Tìm ba lỗi hay sai nhất trong bài cũ, một tuần chỉ luyện ba dạng đó.'],
    ['GV4.2.07', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Kỷ luật số nâng cao (kiểm chứng nguồn)', 'Tin lạ thì tìm thêm hai nơi khác; không đủ hai thì không tin, không gửi tiếp.'],
    ['GV4.2.08', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Kỷ luật tài chính tuổi học trò', 'Chia tiền tiêu vặt vào ba phong bì tiêu – để dành – chia sẻ, ghi sổ từng khoản.'],
    ['GV4.2.09', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Tự đánh giá bằng rubric', 'Tự chấm theo bảng tiêu chí; mỗi mức phải chỉ ra được một minh chứng.'],
    ['GV4.2.10', 'Khối 4', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Kế hoạch bứt phá 12 tuần', 'Một mục tiêu học tập, một mục tiêu phẩm chất, mỗi tuần một dòng tiến độ.'],
    ['GV4.3.01', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Tư duy hệ thống (nguyên nhân gốc)', 'Hỏi “vì sao” ba lần liên tiếp rồi mới đề xuất cách sửa.'],
    ['GV4.3.02', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Design Thinking', 'Hỏi 5 bạn vướng ở đâu, viết một câu vấn đề, làm bản thử bằng giấy, cho bạn dùng thử.'],
    ['GV4.3.03', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Tư duy dữ liệu (khảo sát/biểu đồ)', 'Đặt 5 câu hỏi, hỏi đủ 30 bạn, vẽ một biểu đồ cột, viết một câu kết luận.'],
    ['GV4.3.04', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Phản biện & ngụy biện', 'Nhận ra bốn câu nói yếu: ai cũng làm, người ta bảo, lúc nào cũng thế, chắc chắn luôn.'],
    ['GV4.3.05', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Tư duy sản phẩm', 'Sản phẩm phải có tên người dùng thật và một việc họ làm nhanh hơn nhờ nó.'],
    ['GV4.3.06', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Tư duy liên môn dự án', 'Chọn một việc khó ở trường, ghi rõ mỗi môn học giúp được phần nào.'],
    ['GV4.3.07', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Tư duy rủi ro (nếu… thì…)', 'Liệt kê ba chỗ dễ hỏng nhất của kế hoạch, mỗi chỗ viết sẵn một phương án B.'],
    ['GV4.3.08', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Tư duy tối ưu (làm ít – hiệu quả nhiều)', 'Trong 10 việc, khoanh 2 việc bỏ đi thì cả kế hoạch hỏng; làm 2 việc đó trước.'],
    ['GV4.3.09', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Thuyết trình có cấu trúc', 'Nói bốn phần: mở, ba luận điểm kèm dữ kiện, kết luận, một đề nghị cụ thể.'],
    ['GV4.3.10', 'Khối 4', 'N3 · Tư duy người xuất sắc', 'Retrospective', 'Cuối chặng viết ba cột giữ – sửa – bỏ, mỗi cột ít nhất một việc có tên người làm.'],
    ['GV4.4.01', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Công thức kiệt xuất', 'Viết bốn ô của chính mình: kỷ luật nào, luyện gì, học ai, ngồi cạnh ai.'],
    ['GV4.4.02', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Gương khoa học/công nghệ Việt', 'Từ tư liệu nhà trường cung cấp, ghi ba lần nhân vật làm lại sau khi hỏng.'],
    ['GV4.4.03', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Gương doanh nhân tử tế Việt', 'Chỉ ra một việc nhân vật từ chối làm dù việc đó có lợi cho họ.'],
    ['GV4.4.04', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Gương lãnh đạo Việt', 'Chỉ ra một quyết định khó mà nhân vật nhận phần thiệt về mình.'],
    ['GV4.4.05', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Gương văn hoá – giáo dục Việt', 'Kể một việc nhân vật làm đều nhiều năm, rồi chọn một việc mình làm đều 30 ngày.'],
    ['GV4.4.06', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Hà Nội', 'Di sản & trách nhiệm: chọn một di tích gần trường, ghi ba hành vi giữ gìn và ba hành vi làm hỏng.'],
    ['GV4.4.07', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Dự án số hoá di sản (media)', 'Làm poster hoặc clip 90 giây về một di tích; mỗi con số phải ghi nguồn tư liệu.'],
    ['GV4.4.08', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Noi gương 30 ngày', 'Một phẩm chất và một thói quen, bảng 30 ô, mỗi tuần nộp một ảnh minh chứng.'],
    ['GV4.4.09', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Viết “bài học chiến lược” từ một tấm gương', 'Một trang gồm bài học, nguyên tắc rút ra, kế hoạch áp dụng trong 2 tuần.'],
    ['GV4.4.10', 'Khối 4', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Triển lãm “Trí tuệ Gen Việt”', 'Mỗi nhóm một gian, thuyết minh 3 phút, phải nêu được ít nhất hai con số của mình.'],
    ['GV4.5.01', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'Lãnh đạo phục vụ', 'Nhóm trưởng nhận phần việc khó nhất và hỏi từng bạn “bạn cần gì để làm xong”.'],
    ['GV4.5.02', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'RACI + check-in tuần', 'Mỗi việc ghi ba tên: làm chính, hỗ trợ, kiểm; họp 10 phút mỗi tuần.'],
    ['GV4.5.03', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'KPI nhóm (tiến độ – chất lượng – tác động)', 'Ba con số theo tuần: việc xong đúng hạn, việc phải làm lại, số người được hưởng lợi.'],
    ['GV4.5.04', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'Quản trị xung đột win–win', 'Nói dữ kiện trước, nói cảm xúc sau, chốt bằng ba dòng viết ra giấy.'],
    ['GV4.5.05', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'Dự án cộng đồng 4–8 tuần', 'Một vấn đề thật trong trường, kế hoạch có tên người từng tuần, số đo trước và sau.'],
    ['GV4.5.06', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'Truyền thông dự án đúng sự thật', 'Mỗi câu nói về kết quả phải kèm một ảnh hoặc một con số.'],
    ['GV4.5.07', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'Đo tác động (trước–sau, số liệu)', 'Chụp ảnh và đếm trước khi làm; làm xong đếm lại và hỏi 5 người hưởng lợi.'],
    ['GV4.5.08', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'Báo cáo 3 phút + 1 trang', 'Một trang gồm việc đã làm, một biểu đồ, ba bài học; nói đúng 3 phút có bấm giờ.'],
    ['GV4.5.09', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'Vinh danh công bằng (theo rubric)', 'Chấm theo tiêu chí; điểm nào không chỉ ra được minh chứng thì không cộng.'],
    ['GV4.5.10', 'Khối 4', 'N5 · Leader – Teamwork – Cống hiến', 'Di sản dự án (sổ tay chuyển giao)', 'Sổ 5 trang: cách làm, checklist, ba lỗi đã mắc, danh sách người giúp, biên bản bàn giao.'],
    ['GV5.1.01', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Tự trọng & danh dự', 'Xong mới nộp, không nộp cho có; sai thì gọi tên đúng phần mình làm sai.'],
    ['GV5.1.02', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Trách nhiệm lựa chọn', 'Trước quyết định, viết hai cột được – mất và một dòng “ai chịu hậu quả”.'],
    ['GV5.1.03', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Công bằng & tôn trọng', 'Chấm bài bạn theo tiêu chí trước khi nhìn tên; bạn thân sai vẫn ghi là sai.'],
    ['GV5.1.04', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Chính trực học tập', 'Không chép, không cho chép; chưa hiểu thì giơ tay nói rõ chưa hiểu chỗ nào.'],
    ['GV5.1.05', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Văn hoá phản hồi chuyên nghiệp', 'Góp ý theo mẫu: em thấy… , số liệu là… , em đề nghị… ; không phán xét người.'],
    ['GV5.1.06', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Văn hoá hội nhập', 'Giới thiệu bản thân và lớp mình trong 60 giây, đủ ý, không nói quá về mình.'],
    ['GV5.1.07', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Không chạy theo “trend độc”', 'Có sẵn một câu từ chối thuộc lòng và một người lớn để gọi khi bị ép.'],
    ['GV5.1.08', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Công dân số & hình ảnh cá nhân', 'Rà tài khoản của mình: xoá bài xúc phạm, khoá thông tin trường lớp và địa chỉ nhà.'],
    ['GV5.1.09', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Phụng sự bền vững', 'Hỏi người cần giúp xem họ cần gì trước khi làm, rồi làm theo lịch chứ không làm một đợt.'],
    ['GV5.1.10', 'Khối 5', 'N1 · Văn hoá – Phẩm chất', 'Tuyên ngôn phẩm chất Gen Việt 2.0', 'Viết 10 nguyên tắc sống, mỗi nguyên tắc kèm một hành động đã làm và minh chứng.'],
    ['GV5.2.01', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Bản lĩnh trước áp lực điểm số', 'So bài hôm nay với bài của chính mình tháng trước, ghi ra phần đã tiến bộ.'],
    ['GV5.2.02', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Học sâu 30–40 phút', 'Một ca 35 phút: 5 phút đặt mục tiêu, 25 phút làm, 5 phút tự chấm, không mở thiết bị giữa ca.'],
    ['GV5.2.03', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Mini-OKR 12 tuần', 'Một mục tiêu, ba kết quả có số, mỗi tuần cập nhật phần trăm và một dòng lý do.'],
    ['GV5.2.04', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Quản trị thời gian THCS', 'Lịch tuần có ba mảng học – vận động – nghỉ; mỗi ngày giữ một khung không đụng vào.'],
    ['GV5.2.05', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Học từ thất bại (kế hoạch sửa 2 tuần)', 'Xếp lỗi vào ba nhóm chưa hiểu – cẩu thả – thiếu giờ, mỗi nhóm sửa một cách khác nhau.'],
    ['GV5.2.06', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Kỷ luật đọc sâu & ghi chú', 'Mỗi bài đọc ghi bốn dòng: ý chính, bằng chứng, câu hỏi, chỗ nối với bài đã học.'],
    ['GV5.2.07', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Kỷ luật số & AI (đạo đức học tập)', 'Dùng công cụ AI để hỏi lại chỗ chưa hiểu, không dùng để nộp bài; có dùng thì ghi rõ dùng vào việc gì.'],
    ['GV5.2.08', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Nền sức khỏe học xuất sắc', 'Theo dõi bốn số trong 2 tuần: giờ ngủ, phút vận động, bữa sáng, phút dùng màn hình buổi tối.'],
    ['GV5.2.09', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Tự đánh giá bằng rubric + minh chứng', 'Tự chấm ba mức, mỗi mức kèm một bài làm hoặc một ảnh, nộp kèm kế hoạch nâng một mức.'],
    ['GV5.2.10', 'Khối 5', 'N2 · Nghị lực – Bản lĩnh – Kỷ luật', 'Kế hoạch tự học 1 năm', 'Chọn hai năng lực, chia bốn quý, mỗi quý một sản phẩm nộp được.'],
    ['GV5.3.01', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Tư duy chiến lược (mục tiêu–đường đi–nguồn lực)', 'Viết mục tiêu, ba đường đi, nguồn lực đang có; chọn một đường và ghi lý do chọn.'],
    ['GV5.3.02', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Phản biện nâng cao (fact/opinion, bias)', 'Tách một bài viết thành hai cột: dữ kiện kiểm được và ý kiến của người viết.'],
    ['GV5.3.03', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Giải quyết vấn đề 5 bước', 'Định nghĩa – phân tích – kế hoạch – làm – đánh giá; mỗi bước để lại một trang giấy.'],
    ['GV5.3.04', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Hệ thống & gốc rễ', 'Vẽ sơ đồ nguyên nhân, hỏi “vì sao” đến lần thứ năm rồi mới chọn chỗ để sửa.'],
    ['GV5.3.05', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Tư duy dữ liệu (đọc biểu đồ, kết luận)', 'Đọc một biểu đồ và nói ba điều: cái gì tăng giảm, mức bao nhiêu, điều gì biểu đồ chưa nói.'],
    ['GV5.3.06', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Tư duy sản phẩm & khác biệt', 'Ghi tên người dùng, một khó khăn của họ, và chỗ sản phẩm mình khác cách cũ.'],
    ['GV5.3.07', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Tư duy thương lượng', 'Vào bàn với ba thứ đã viết sẵn: điều cần, điều nhường được, giới hạn không nhường.'],
    ['GV5.3.08', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Thuyết trình thuyết phục', 'Mỗi luận điểm kèm một lý do, một ví dụ, một số liệu; kết bằng một đề nghị hành động.'],
    ['GV5.3.09', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Viết báo cáo chuẩn', 'Một trang tóm tắt đặt trước, rồi tới số liệu, minh chứng, bài học, kiến nghị.'],
    ['GV5.3.10', 'Khối 5', 'N3 · Tư duy người xuất sắc', 'Retrospective chuyên nghiệp', 'Giữ – sửa – bỏ, kèm việc cụ thể cho hai tuần tới, có tên người và ngày hạn.'],
    ['GV5.4.01', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Bản đồ hiền tài Việt', 'Xếp các tấm gương đã học vào năm nhóm và ghi mỗi nhóm cần phẩm chất nào.'],
    ['GV5.4.02', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Chiến lược rèn luyện của người kiệt xuất', 'Đối chiếu bốn yếu tố kỷ luật – luyện có chủ đích – người hướng dẫn – môi trường với đời sống của mình.'],
    ['GV5.4.03', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Gương lãnh đạo Việt', 'Từ tư liệu nhà trường cung cấp, chỉ ra một lần nhân vật giữ nguyên tắc dù bị thiệt.'],
    ['GV5.4.04', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Gương khoa học/công nghệ Việt', 'Làm một nghiên cứu nhỏ: một câu hỏi, một cách đo, mười lần đo, một kết luận.'],
    ['GV5.4.05', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Gương doanh nhân tử tế Việt', 'Chỉ ra chỗ nhân vật giữ chữ tín thay vì lấy lợi trước mắt, rồi nêu một việc tương tự ở lớp.'],
    ['GV5.4.06', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Gương phụng sự Việt', 'Phân biệt việc thiện làm một lần và việc thiện làm đều; chọn một việc làm đều 8 tuần.'],
    ['GV5.4.07', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Hà Nội', 'Tinh hoa – trách nhiệm: liệt kê 10 hành vi nơi công cộng và tự chấm mình làm được mấy hành vi.'],
    ['GV5.4.08', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Dự án kể chuyện tấm gương bằng media', 'Podcast hoặc clip 3 phút; mọi mốc thời gian và con số đều ghi nguồn tư liệu.'],
    ['GV5.4.09', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Noi gương 45 ngày (1 phẩm chất)', 'Một phẩm chất, một thói quen, bảng 45 ô, cứ 15 ngày nộp một minh chứng.'],
    ['GV5.4.10', 'Khối 5', 'N4 · Trí tuệ – Tấm gương kiệt xuất', 'Tuyên ngôn noi gương', '10 hành động đã làm, mỗi hành động một minh chứng, gắn với sáu trục Gen Việt.'],
    ['GV5.5.01', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'Thủ lĩnh dự án 8–12 tuần', 'Cầm trọn một dự án 10 tuần: chọn vấn đề, đặt mục tiêu có số, chia việc, chạy, đo, tổng kết.'],
    ['GV5.5.02', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'Quản trị đội nhóm (vai trò–cam kết)', 'Mỗi bạn một vai và một cam kết viết ra; cách xử lý khi không làm được thống nhất từ đầu.'],
    ['GV5.5.03', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'KPI nhóm + check-in', 'Ba chỉ số cập nhật sáng thứ Hai, họp 10 phút, ai chậm thì nói ngay cần giúp gì.'],
    ['GV5.5.04', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'RACI nâng cao', 'Mỗi đầu việc chỉ một người chịu trách nhiệm chính; không để việc nào hai tên hoặc không tên.'],
    ['GV5.5.05', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'Quản trị xung đột & đàm phán', 'Chốt bằng biên bản 5 dòng: việc gì, mỗi bên muốn gì, thoả thuận, hạn, ai kiểm.'],
    ['GV5.5.06', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'Truyền thông dự án có đạo đức', 'Xin phép trước khi đăng ảnh người khác; không đăng ảnh làm người nhận giúp đỡ xấu hổ.'],
    ['GV5.5.07', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'Đo tác động (số liệu + câu chuyện)', 'Ghép số liệu trước–sau với ba câu phỏng vấn người hưởng lợi; nêu cả phần chưa đạt.'],
    ['GV5.5.08', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'Báo cáo 5 phút + poster', 'Poster một trang nhìn 30 giây là hiểu; nói 5 phút có bấm giờ, có ít nhất hai biểu đồ.'],
    ['GV5.5.09', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'Chuyển giao lãnh đạo (kế thừa)', 'Kèm một bạn khoá dưới ba buổi, bàn giao sổ tay và checklist, để bạn ấy chạy thử một buổi.'],
    ['GV5.5.10', 'Khối 5', 'N5 · Leader – Teamwork – Cống hiến', 'Chuyển cấp Gen Việt 2.0', 'Hồ sơ gồm một dự án, ba minh chứng phẩm chất, một kế hoạch 100 ngày đầu ở THCS.']
  ];

  /* ── 2 · 100 khẩu quyết · dạng bang ───────────────────────────
     Mỗi chuyên đề đúng một khẩu quyết 3–5 chữ, bắt theo lối của
     GA_KHAU_QUYET: đếm được, đọc theo nhịp, làm được ngay trong
     buổi. Cột cuối là dấu hiệu quan sát được, để người dạy biết
     học sinh đã dùng thật hay mới thuộc lòng. */
  G.K45_KHAU_QUYET = [
    ['Mã chuyên đề', 'Khẩu quyết', 'Giải nghĩa', 'Dấu hiệu em đã dùng được'],
    ['GV4.1.01', 'LÀM THẬT – NÓI THẬT – NHẬN THẬT', 'Báo đúng phần đã làm, không tô thêm. Chưa xong thì nói chưa xong.', 'Em báo “con mới làm được 2 trên 5 phần” thay vì nói “con làm gần xong rồi”.'],
    ['GV4.1.02', 'AI LỢI – AI THIỆT – AI DỌN', 'Ba câu hỏi trước mỗi lựa chọn của nhóm. Người phải dọn hậu quả thường bị quên nhất.', 'Trước khi nhóm chốt việc, em hỏi được câu “ai dọn phần này”.'],
    ['GV4.1.03', 'Ý KIẾN – LÝ DO – DỮ KIỆN', 'Nói ý mình, nói vì sao, đưa một dữ kiện. Không nhắc tính cách người đối diện.', 'Trong tranh luận em nói đủ ba phần và không có câu nào bắt đầu bằng tên bạn.'],
    ['GV4.1.04', 'GIÚP 1 BƯỚC – KHÔNG LÀM HỘ', 'Tử tế là chỉ một bước để bạn tự đi tiếp, không phải làm thay và không phải che lỗi.', 'Bạn xin chép bài, em đưa gợi ý một bước và bạn tự làm xong phần còn lại.'],
    ['GV4.1.05', 'DỪNG 10 – HỎI 1 – CHỌN 1', 'Đứng yên 10 giây, hỏi một câu “làm việc này có ai bị hại không”, rồi mới chọn.', 'Có lần cả nhóm rủ, em dừng lại hỏi và không đi theo.'],
    ['GV4.1.06', 'KHÁC – KHÔNG SAI', 'Bạn nghĩ khác, làm khác, đến từ nơi khác — đó không phải lỗi của bạn.', 'Em nói được một điểm mạnh của bạn mà em ít chơi cùng nhất.'],
    ['GV4.1.07', 'ĐÚNG GIỜ – ĐÚNG MẪU – ĐÚNG SỐ', 'Ba chuẩn tối thiểu của việc nhóm. Không đủ thì báo trước hạn, không im.', 'Nộp việc nhóm ba lần liên tiếp đủ ba chuẩn, hoặc có báo trước hạn khi thiếu.'],
    ['GV4.1.08', 'KIỂM 2 NGUỒN – RỒI HÃY GỬI', 'Chưa tìm được hai nơi khác cùng nói chuyện đó thì chưa gửi cho ai.', 'Em kể được một lần định gửi tin cho bạn nhưng đã dừng vì chỉ có một nguồn.'],
    ['GV4.1.09', 'ĐO 5 NGÀY – CẮT 1 NGUỒN', 'Đếm trước, cắt sau. Cắt đúng một nguồn rác cụ thể còn hơn hô khẩu hiệu.', 'Có bảng đếm 5 ngày và tên nguồn rác đã cắt, kèm số ngày sau đó.'],
    ['GV4.1.10', 'ĐỀU 8 TUẦN – KHÔNG 1 ĐỢT', 'Phụng sự bền là làm nhỏ mà đều. Có lịch, có người phụ trách từng tuần.', 'Lịch 8 tuần dán ở lớp, tuần nào cũng có tên người và có tick.'],
    ['GV4.2.01', 'CHỌN 2 – TICK 90 – ĐẾM TUẦN', 'Chỉ chọn hai thói quen. Tick mỗi ngày. Chủ nhật đếm số ngày đạt, không đếm lỗi.', 'Bảng 90 ô có tick và có bảy con số tổng theo tuần.'],
    ['GV4.2.02', 'CẤT MÁY – CHUÔNG 25 – MỘT VIỆC', 'Ba động tác trước khi học: cất đồ gây xao nhãng, đặt chuông, chọn đúng một việc.', 'Em nói ngay được việc mình sẽ làm trong 25 phút, và bàn không còn đồ lạ.'],
    ['GV4.2.03', 'TỪ KHOÁ – Ý CHÍNH – CÂU HỎI', 'Ghi ba dòng cho mỗi phần đọc. Không chép nguyên câu trong sách.', 'Vở ghi có ba dòng đúng mẫu và có ít nhất một câu hỏi thật của em.'],
    ['GV4.2.04', 'CÓ SỐ – CÓ HẠN – CÓ CHẤM', 'Mục tiêu tuần phải có con số và ngày hạn, cuối tuần phải tự chấm.', 'Chiều thứ Sáu em chỉ ra được mục tiêu nào đạt, mục tiêu nào không và vì sao.'],
    ['GV4.2.05', 'THỞ 4 – CHIA NHỎ – GỌI 1 NGƯỜI', 'Ba bước khi thấy quá tải. Bước ba là gọi một người lớn, không phải chịu một mình.', 'Có một lần em dùng đủ ba bước và kể lại được cho người dạy.'],
    ['GV4.2.06', 'LUYỆN CHỖ SAI – KHÔNG LUYỆN CHỖ QUEN', 'Luyện lại phần mình đã giỏi là dễ chịu nhưng vô ích. Luyện ba dạng hay sai nhất.', 'Em chỉ ra được ba dạng hay sai và bài luyện trong tuần đúng ba dạng đó.'],
    ['GV4.2.07', '2 NGUỒN KHÁC – MỚI TIN', 'Hai nguồn phải khác nhau thật, không phải hai chỗ chép lại của nhau.', 'Em phát hiện được hai trang chỉ chép lại của nhau và không tính là hai nguồn.'],
    ['GV4.2.08', 'TIÊU – DÀNH – CHIA', 'Ba phong bì. Tiền vào phong bì nào thì tiêu theo phong bì đó, có ghi sổ.', 'Sổ chi tiêu 4 tuần đủ các khoản và số dư khớp với tiền trong phong bì.'],
    ['GV4.2.09', 'MỖI MỨC – MỘT MINH CHỨNG', 'Tự chấm mà không chỉ ra được minh chứng thì mức đó chưa tính.', 'Phiếu tự chấm có ô minh chứng điền kín, không ô nào để trống.'],
    ['GV4.2.10', '1 HỌC – 1 PHẨM – 12 TUẦN', 'Một mục tiêu học tập và một mục tiêu phẩm chất, không hơn.', 'Bảng 12 tuần có 12 dòng tiến độ, không có tuần nào bỏ trắng.'],
    ['GV4.3.01', 'VÌ SAO 3 LẦN', 'Hỏi vì sao ba lần liên tiếp mới chạm gốc. Dừng ở lần một là chữa ngọn.', 'Em nêu được nguyên nhân ở lần hỏi thứ ba và nó khác nguyên nhân ban đầu.'],
    ['GV4.3.02', 'HỎI 5 – VIẾT 1 – THỬ 1', 'Hỏi 5 người dùng, viết một câu vấn đề, làm một bản thử bằng giấy.', 'Có đủ 5 phiếu hỏi, một câu vấn đề và một bản giấy đã cho bạn dùng thử.'],
    ['GV4.3.03', 'HỎI 30 – VẼ 1 – KẾT 1 CÂU', 'Đủ 30 phiếu mới vẽ. Một biểu đồ, một câu kết luận đọc thẳng từ biểu đồ.', 'Câu kết luận của em chỉ dùng số có trên biểu đồ, không thêm suy đoán.'],
    ['GV4.3.04', 'AI CŨNG LÀM – KHÔNG PHẢI LÝ DO', 'Bốn câu yếu hay gặp: ai cũng làm, người ta bảo, lúc nào cũng thế, chắc chắn luôn.', 'Em bắt được một câu yếu trong lúc lớp tranh luận và hỏi lại “dữ kiện là gì”.'],
    ['GV4.3.05', 'CÓ NGƯỜI DÙNG – CÓ VIỆC LÀM ĐƯỢC', 'Sản phẩm phải có tên một người dùng thật và một việc họ làm nhanh hơn nhờ nó.', 'Em nói được tên người dùng và việc cụ thể, không nói “để cho lớp đẹp hơn”.'],
    ['GV4.3.06', 'MỘT VIỆC – NHIỀU MÔN', 'Một vấn đề thật cần nhiều môn cùng góp. Ghi rõ môn nào góp phần nào.', 'Bảng của em có ít nhất ba môn và mỗi môn có một phần việc cụ thể.'],
    ['GV4.3.07', '3 CHỖ HỎNG – 3 PHƯƠNG ÁN B', 'Kế hoạch nào cũng có chỗ dễ hỏng. Viết sẵn phương án B trước khi hỏng.', 'Kế hoạch nhóm có cột phương án B điền đủ ba dòng trước ngày chạy.'],
    ['GV4.3.08', 'BỎ THÌ HỎNG – LÀM TRƯỚC', 'Trong 10 việc chỉ có vài việc mà bỏ đi thì cả kế hoạch hỏng. Làm chúng trước.', 'Em khoanh được đúng hai việc và lịch tuần xếp hai việc đó lên đầu.'],
    ['GV4.3.09', 'MỞ – 3 LUẬN – KẾT – ĐỀ NGHỊ', 'Bốn phần cố định của một bài nói. Thiếu đề nghị thì người nghe không biết làm gì.', 'Bài nói của em có đủ bốn phần và câu đề nghị nêu rõ ai làm gì.'],
    ['GV4.3.10', 'GIỮ – SỬA – BỎ', 'Ba cột tổng kết. Mỗi cột ít nhất một việc, có tên người làm.', 'Bảng tổng kết không có cột nào để trống và mỗi dòng đều có tên người.'],
    ['GV4.4.01', 'KỶ LUẬT – LUYỆN – THẦY – BẠN', 'Bốn ô của người giỏi. Học sinh điền bốn ô đó cho chính mình, không chép của ai.', 'Bốn ô của em điền cụ thể, ô “bạn” ghi tên người em thật sự hay ngồi cạnh.'],
    ['GV4.4.02', 'HỎNG – SỬA – THỬ LẠI', 'Người làm khoa học hỏng nhiều lần. Điều đáng học là số lần thử lại.', 'Em kể được ba lần nhân vật làm lại, kèm chỗ ghi trong tư liệu.'],
    ['GV4.4.03', 'TỪ CHỐI LỢI – GIỮ CHỮ TÍN', 'Người làm ăn tử tế được nhận ra ở việc họ từ chối, không ở việc họ khoe.', 'Em chỉ ra được một việc nhân vật từ chối và nói được vì sao đó là khó.'],
    ['GV4.4.04', 'NHẬN PHẦN KHÓ – NHẬN PHẦN THIỆT', 'Người dẫn đầu nhận việc khó trước và nhận thiệt trước, không đẩy xuống dưới.', 'Em nêu được một quyết định như vậy trong tư liệu và một việc tương tự ở lớp.'],
    ['GV4.4.05', 'LÀM ĐỀU – NHIỀU NĂM', 'Việc lớn của người thầy thường là một việc nhỏ làm đều rất lâu.', 'Em chọn được một việc nhỏ và giữ đủ 30 ngày, có bảng tick.'],
    ['GV4.4.06', '3 GIỮ – 3 ĐỪNG', 'Ba hành vi giữ gìn và ba hành vi làm hỏng di tích, viết bằng chữ của mình.', 'Bảng của em ghi hành vi cụ thể, không ghi câu chung như “yêu di sản”.'],
    ['GV4.4.07', 'CÓ NGUỒN – MỚI ĐĂNG', 'Mọi con số và mốc thời gian trong sản phẩm media đều phải ghi lấy từ đâu.', 'Poster hoặc clip của em có dòng nguồn và người dạy tra lại được.'],
    ['GV4.4.08', '30 Ô – 4 MINH CHỨNG', 'Bảng 30 ô, mỗi tuần nộp một ảnh hoặc một sản phẩm. Bốn tuần bốn minh chứng.', 'Bảng đủ tick và đủ bốn minh chứng, không phải nộp dồn vào ngày cuối.'],
    ['GV4.4.09', 'BÀI HỌC – NGUYÊN TẮC – 2 TUẦN', 'Học được gì, rút ra nguyên tắc nào, hai tuần tới làm gì. Ba phần một trang.', 'Trang viết của em có phần kế hoạch ghi rõ ngày và việc, không chỉ có cảm nghĩ.'],
    ['GV4.4.10', '3 PHÚT – 2 CON SỐ', 'Thuyết minh gian triển lãm đúng 3 phút và phải nêu ít nhất hai con số của mình.', 'Em nói trong 3 phút có bấm giờ và nêu đúng hai con số đo được.'],
    ['GV4.5.01', 'NHẬN VIỆC KHÓ – HỎI BẠN CẦN GÌ', 'Nhóm trưởng nhận phần khó và đi hỏi từng bạn, không ngồi phân việc rồi thôi.', 'Sau buổi họp, mỗi bạn trong nhóm nói được nhóm trưởng đã hỏi mình câu gì.'],
    ['GV4.5.02', 'CHÍNH – HỖ TRỢ – KIỂM', 'Mỗi việc ba tên. Thiếu người kiểm thì việc xong mà không ai biết đúng hay sai.', 'Bảng việc của nhóm không có dòng nào thiếu tên người kiểm.'],
    ['GV4.5.03', 'ĐÚNG HẠN – ÍT LỖI – NHIỀU NGƯỜI', 'Ba con số đo hằng tuần: việc xong đúng hạn, việc phải làm lại, số người hưởng lợi.', 'Có bảng ba số cập nhật đủ các tuần, không bịa số cho đẹp.'],
    ['GV4.5.04', 'DỮ KIỆN TRƯỚC – CẢM XÚC SAU', 'Nói việc đã xảy ra trước, nói mình thấy thế nào sau. Chốt bằng ba dòng viết ra.', 'Hai bạn cãi nhau rồi chốt được ba dòng và cả hai ký vào.'],
    ['GV4.5.05', 'VẤN ĐỀ THẬT – SỐ ĐO THẬT', 'Dự án phải giải một vấn đề có người đang chịu, và phải đo được trước với sau.', 'Kế hoạch của nhóm có tên người đang chịu vấn đề và có số đo ngày đầu.'],
    ['GV4.5.06', 'KHOE 1 – CHỨNG 1', 'Mỗi câu nói về kết quả kèm một ảnh hoặc một con số. Không có thì bỏ câu đó.', 'Bài truyền thông của nhóm không còn câu nào không có minh chứng.'],
    ['GV4.5.07', 'ĐẾM TRƯỚC – ĐẾM SAU – HỎI 5', 'Đếm và chụp trước khi làm, đếm lại sau khi làm, hỏi 5 người hưởng lợi.', 'Nhóm có hai bộ số và năm câu trả lời ghi lại nguyên văn.'],
    ['GV4.5.08', '1 TRANG – 1 BIỂU ĐỒ – 3 PHÚT', 'Một trang tóm tắt, một biểu đồ, nói ba phút. Dài hơn là chưa gọn được ý.', 'Em nộp đúng một trang và nói hết ý trước khi chuông kêu.'],
    ['GV4.5.09', 'KHÔNG MINH CHỨNG – KHÔNG ĐIỂM', 'Vinh danh theo tiêu chí. Điểm nào không chỉ ra được minh chứng thì không cộng.', 'Bảng vinh danh của lớp có cột minh chứng và không dòng nào để trống.'],
    ['GV4.5.10', 'CÁCH LÀM – LỖI ĐÃ MẮC – NGƯỜI GIÚP', 'Ba phần bắt buộc của sổ chuyển giao. Phần lỗi đã mắc là phần quý nhất.', 'Sổ có đủ ba phần và khoá sau đọc xong làm được mà không phải hỏi lại.'],
    ['GV5.1.01', 'XONG MỚI NỘP – SAI THÌ GỌI TÊN', 'Không nộp cho có. Sai thì nói đúng tên phần mình làm sai, không nói chung chung.', 'Em nói được “phần con làm sai là bước 3”, không nói “con sai hết”.'],
    ['GV5.1.02', 'ĐƯỢC – MẤT – AI CHỊU', 'Hai cột và một dòng. Dòng “ai chịu hậu quả” là dòng hay bị bỏ nhất.', 'Trước một quyết định của nhóm, em điền đủ hai cột và một dòng đó.'],
    ['GV5.1.03', 'CHE TÊN – CHẤM TIÊU CHÍ', 'Chấm bài khi chưa nhìn tên. Bạn thân sai thì vẫn ghi là sai.', 'Có một lần em chấm bạn thân đúng theo tiêu chí và giải thích được với bạn.'],
    ['GV5.1.04', 'KHÔNG CHÉP – KHÔNG CHO CHÉP', 'Cho chép cũng là gian lận. Chưa hiểu thì nói rõ chưa hiểu chỗ nào.', 'Em từ chối cho chép một lần và thay bằng việc giảng lại cho bạn.'],
    ['GV5.1.05', 'EM THẤY – SỐ LIỆU – EM ĐỀ NGHỊ', 'Ba phần của một lời góp ý chuyên nghiệp. Không có phần phán xét người.', 'Lời góp ý của em nói về việc và kết bằng một đề nghị làm được.'],
    ['GV5.1.06', '60 GIÂY – ĐỦ – KHÔNG QUÁ', 'Giới thiệu đủ ý trong 60 giây, không nói quá về mình và về lớp mình.', 'Em nói trong 60 giây, người nghe nhắc lại đúng ba điều em đã nói.'],
    ['GV5.1.07', '1 CÂU TỪ CHỐI – 1 NGƯỜI ĐỂ GỌI', 'Phải thuộc sẵn một câu từ chối và nhớ sẵn một người lớn để gọi.', 'Em đọc thuộc câu từ chối và nói được tên, số của người mình sẽ gọi.'],
    ['GV5.1.08', 'XOÁ – KHOÁ – NGHĨ TRƯỚC KHI ĐĂNG', 'Xoá bài xúc phạm, khoá thông tin trường lớp và nhà, nghĩ trước khi đăng bài mới.', 'Em kể được đã xoá bài nào và đã khoá mục thông tin nào.'],
    ['GV5.1.09', 'HỎI TRƯỚC – LÀM SAU – LÀM ĐỀU', 'Hỏi người cần giúp xem họ cần gì, rồi mới làm, và làm theo lịch.', 'Nhóm có ghi lại câu trả lời của người được giúp trước khi lên kế hoạch.'],
    ['GV5.1.10', '10 NGUYÊN TẮC – 10 MINH CHỨNG', 'Mỗi nguyên tắc sống phải kèm một việc đã làm và một minh chứng.', 'Bản tuyên ngôn của em không có nguyên tắc nào để trống cột minh chứng.'],
    ['GV5.2.01', 'SO VỚI MÌNH THÁNG TRƯỚC', 'Thước đo là bài của chính mình tháng trước, không phải điểm của bạn bên cạnh.', 'Em chỉ ra được phần đã tiến bộ khi đặt hai bài cạnh nhau.'],
    ['GV5.2.02', '5 – 25 – 5', 'Một ca học 35 phút: 5 phút đặt mục tiêu, 25 phút làm, 5 phút tự chấm.', 'Em chạy đủ ba đoạn và không mở thiết bị nào trong 25 phút giữa.'],
    ['GV5.2.03', '1 MỤC TIÊU – 3 KẾT QUẢ – 12 TUẦN', 'Một mục tiêu, ba kết quả có số. Mỗi tuần cập nhật phần trăm kèm một dòng lý do.', 'Bảng của em có 12 dòng cập nhật, dòng lý do viết cụ thể không viết “bận”.'],
    ['GV5.2.04', 'HỌC – THỂ – NGHỈ', 'Lịch tuần đủ ba mảng. Mỗi ngày giữ một khung không ai được đụng vào.', 'Lịch tuần của em có đủ ba màu và khung giữ được ít nhất 5 trên 7 ngày.'],
    ['GV5.2.05', 'CHƯA HIỂU – CẨU THẢ – THIẾU GIỜ', 'Ba loại lỗi, ba cách sửa khác nhau. Xếp sai loại thì sửa mãi không hết.', 'Em xếp được lỗi của bài kiểm tra vào ba nhóm và chọn cách sửa khác nhau.'],
    ['GV5.2.06', 'Ý – CHỨNG – HỎI – NỐI', 'Bốn dòng ghi chú: ý chính, bằng chứng, câu hỏi, chỗ nối với bài đã học.', 'Vở của em có dòng “nối” chỉ đúng một bài đã học trước đó.'],
    ['GV5.2.07', 'HỎI ĐỂ HIỂU – KHÔNG NỘP HỘ', 'Công cụ AI dùng để hỏi lại chỗ chưa hiểu. Bài nộp phải là bài mình viết.', 'Bài của em có dòng ghi đã dùng công cụ vào việc gì, và em giải thích lại được bài.'],
    ['GV5.2.08', 'NGỦ – ĐỘNG – ĂN – TẮT MÀN HÌNH', 'Bốn số theo dõi trong 2 tuần. Không chấm điểm, chỉ nhìn số để đổi một thói quen.', 'Em có bảng 14 ngày đủ bốn cột và chọn được một thói quen để đổi.'],
    ['GV5.2.09', 'TỰ CHẤM – NỘP CHỨNG – NÂNG 1 MỨC', 'Tự chấm, nộp minh chứng, rồi lên kế hoạch nâng đúng một mức.', 'Kế hoạch nâng mức của em ghi rõ việc làm trong hai tuần, không ghi “cố gắng hơn”.'],
    ['GV5.2.10', '2 NĂNG LỰC – 4 QUÝ – 4 SẢN PHẨM', 'Chọn hai năng lực thôi. Mỗi quý phải ra một sản phẩm nộp được.', 'Kế hoạch năm của em ghi tên bốn sản phẩm cụ thể, không ghi “học tốt hơn”.'],
    ['GV5.3.01', 'ĐÍCH – ĐƯỜNG – NGUỒN LỰC', 'Mục tiêu, ba đường đi, nguồn lực đang có. Chọn một đường và ghi lý do.', 'Em nêu được vì sao bỏ hai đường kia, không chỉ nói đường mình chọn.'],
    ['GV5.3.02', 'DỮ KIỆN HAY Ý KIẾN', 'Câu nào kiểm được là dữ kiện. Câu nào chỉ là cách nhìn thì là ý kiến.', 'Em tách được một bài viết thành hai cột và giải thích được vài câu khó.'],
    ['GV5.3.03', 'ĐỊNH NGHĨA – PHÂN TÍCH – KẾ HOẠCH – LÀM – ĐÁNH GIÁ', 'Năm bước, mỗi bước để lại một trang giấy. Nhảy bước thì bước sau hỏng.', 'Hồ sơ giải quyết vấn đề của nhóm đủ năm trang, không thiếu trang nào.'],
    ['GV5.3.04', 'VÌ SAO 5 LẦN', 'Hỏi vì sao đến lần thứ năm mới chọn chỗ sửa. Sửa ở lần một là sửa triệu chứng.', 'Sơ đồ của em có đủ năm tầng và chỗ chọn sửa nằm ở tầng cuối.'],
    ['GV5.3.05', 'TĂNG GÌ – BAO NHIÊU – THIẾU GÌ', 'Đọc biểu đồ phải nói cả điều biểu đồ chưa nói, đó là chỗ dễ suy diễn nhất.', 'Em nêu được một điều biểu đồ không cho biết và không kết luận về điều đó.'],
    ['GV5.3.06', 'NGƯỜI DÙNG – NỖI ĐAU – KHÁC BIỆT', 'Ba ô của một ý tưởng sản phẩm. Thiếu ô khác biệt thì chỉ là làm lại cái đã có.', 'Em nói được sản phẩm của mình khác cách cũ ở đúng một điểm cụ thể.'],
    ['GV5.3.07', 'CẦN – NHƯỜNG – GIỚI HẠN', 'Ba thứ viết sẵn trước khi vào thương lượng. Giới hạn là chỗ không nhượng.', 'Trước buổi thương lượng em có tờ giấy ghi đủ ba mục.'],
    ['GV5.3.08', 'LUẬN – LÝ – VÍ DỤ – SỐ', 'Mỗi luận điểm bốn phần. Thiếu số thì bài nói chỉ là cảm nghĩ.', 'Bài nói của em có đủ số liệu cho từng luận điểm và nói được lấy số từ đâu.'],
    ['GV5.3.09', '1 TRANG TRƯỚC – SỐ LIỆU SAU', 'Trang tóm tắt đặt lên đầu để người bận đọc một trang là đủ.', 'Báo cáo của em có trang tóm tắt đứng trước và đọc riêng vẫn hiểu.'],
    ['GV5.3.10', 'GIỮ – SỬA – BỎ – AI – NGÀY NÀO', 'Ba cột cộng thêm tên người và ngày hạn, nếu không thì tổng kết xong để đó.', 'Biên bản tổng kết của nhóm có tên người và ngày cho từng việc.'],
    ['GV5.4.01', '5 NHÓM – 5 PHẨM CHẤT', 'Xếp tấm gương vào năm nhóm và ghi mỗi nhóm cần phẩm chất nào nhất.', 'Bản đồ của em đủ năm nhóm và mỗi nhóm có ít nhất một tấm gương đã học.'],
    ['GV5.4.02', 'KỶ LUẬT – CHỦ ĐÍCH – MENTOR – MÔI TRƯỜNG', 'Bốn yếu tố rèn luyện. Đối chiếu từng yếu tố với đời sống thật của mình.', 'Em chỉ ra được yếu tố nào mình đang thiếu nhất và một việc để bù.'],
    ['GV5.4.03', 'GIỮ NGUYÊN TẮC KHI BỊ THIỆT', 'Nguyên tắc chỉ được kiểm chứng ở lúc giữ nó thì mình mất phần.', 'Em chỉ ra được một lần như vậy trong tư liệu và một lần ở lớp mình.'],
    ['GV5.4.04', '1 CÂU HỎI – 10 LẦN ĐO', 'Nghiên cứu nhỏ: một câu hỏi, một cách đo, đo đủ mười lần rồi mới kết luận.', 'Bảng đo của em đủ mười dòng và kết luận không vượt quá số đã đo.'],
    ['GV5.4.05', 'CHỮ TÍN TRƯỚC – LỢI SAU', 'Người làm ăn tử tế chọn giữ lời hứa dù mất phần lợi trước mắt.', 'Em nêu được một việc tương tự ở lớp và mình đã chọn thế nào.'],
    ['GV5.4.06', 'LÀM ĐỀU HƠN LÀM RẦM', 'Việc thiện làm một đợt thì vui một hôm. Làm đều mới đổi được điều gì đó.', 'Nhóm em chọn được một việc và giữ đủ 8 tuần, có bảng theo dõi.'],
    ['GV5.4.07', '10 HÀNH VI – TỰ CHẤM', 'Mười hành vi nơi công cộng viết bằng chữ của mình, rồi tự chấm mình.', 'Bảng tự chấm của em có ít nhất ba ô ghi chưa làm được, không phải toàn ô đạt.'],
    ['GV5.4.08', 'CÓ NGUỒN – MỚI KỂ', 'Kể chuyện tấm gương bằng media thì mọi mốc thời gian và con số phải ghi nguồn.', 'Sản phẩm của em có phần nguồn và người dạy tra lại được từng con số.'],
    ['GV5.4.09', '45 Ô – 3 MINH CHỨNG', 'Bảng 45 ô, cứ 15 ngày nộp một minh chứng. Ba lần trong cả chặng.', 'Bảng đủ tick và ba minh chứng nộp đúng mốc, không nộp dồn.'],
    ['GV5.4.10', '10 VIỆC ĐÃ LÀM – 10 CHỨNG', 'Tuyên ngôn viết bằng việc đã làm, không viết bằng việc sẽ làm.', 'Mọi dòng trong tuyên ngôn của em ở thì đã làm và có minh chứng kèm.'],
    ['GV5.5.01', 'VẤN ĐỀ – ĐÍCH – VIỆC – SỐ ĐO', 'Bốn thứ phải có trước khi khởi động dự án dài. Thiếu số đo thì không tổng kết được.', 'Trang một của hồ sơ dự án điền đủ bốn ô trước tuần chạy đầu tiên.'],
    ['GV5.5.02', '1 VAI – 1 CAM KẾT', 'Mỗi bạn một vai và một cam kết viết ra giấy, kèm cách xử lý khi không làm được.', 'Bảng vai của nhóm có chữ ký từng bạn và một dòng xử lý đã thống nhất.'],
    ['GV5.5.03', 'THỨ HAI CẬP NHẬT – 10 PHÚT HỌP', 'Số cập nhật trước, họp sau. Họp đúng 10 phút, ai chậm thì nói ngay cần giúp gì.', 'Nhóm họp bốn tuần liên tiếp đúng 10 phút và có biên bản mỗi tuần.'],
    ['GV5.5.04', '1 VIỆC – 1 NGƯỜI CHỊU', 'Một đầu việc chỉ một người chịu chính. Hai tên hoặc không tên đều là việc sẽ trôi.', 'Bảng việc của nhóm không còn dòng nào hai tên hay để trống.'],
    ['GV5.5.05', 'BIÊN BẢN 5 DÒNG', 'Việc gì, mỗi bên muốn gì, thoả thuận, hạn, ai kiểm. Năm dòng, hai bên ký.', 'Sau một mâu thuẫn, nhóm có biên bản 5 dòng và đúng hạn thì người kiểm báo lại.'],
    ['GV5.5.06', 'XIN PHÉP – RỒI HÃY ĐĂNG', 'Ảnh có mặt người khác thì phải hỏi. Không đăng ảnh làm người được giúp xấu hổ.', 'Nhóm em có danh sách ảnh đã xin phép và đã bỏ ít nhất một ảnh vì lý do này.'],
    ['GV5.5.07', 'SỐ – CHUYỆN – PHẦN CHƯA ĐẠT', 'Báo cáo tác động phải có số, có lời người hưởng lợi, và có phần chưa làm được.', 'Báo cáo của nhóm nêu được ít nhất một mục tiêu chưa đạt và lý do.'],
    ['GV5.5.08', '30 GIÂY HIỂU – 5 PHÚT NÓI', 'Poster nhìn 30 giây là hiểu. Nói 5 phút có bấm giờ, có ít nhất hai biểu đồ.', 'Người chưa biết dự án nhìn poster 30 giây và kể lại đúng việc nhóm đã làm.'],
    ['GV5.5.09', 'KÈM 3 BUỔI – GIAO 1 BUỔI', 'Kèm bạn khoá dưới ba buổi rồi để bạn ấy chạy thử một buổi, mình đứng ngoài.', 'Bạn khoá dưới chạy được một buổi và em chỉ ngồi ghi nhận xét.'],
    ['GV5.5.10', '1 DỰ ÁN – 3 CHỨNG – 100 NGÀY', 'Hồ sơ chuyển cấp: một dự án, ba minh chứng phẩm chất, kế hoạch 100 ngày đầu THCS.', 'Hồ sơ đủ ba phần và kế hoạch 100 ngày ghi việc theo tuần, không ghi mong muốn.']
  ];

  /* ── 3 · Khung dự án hai khối · dạng bang ─────────────────────
     Nhịp tuần bám đúng CD_KHUNG: khối 4 dự án 4–8 tuần, khối 5 dự
     án 8–12 tuần. Mọi dự án đều là việc trong phạm vi trường lớp
     hoặc tổ dân phố, học sinh tự đi bộ tới được, không cần kinh
     phí lớn và không cần người lớn làm hộ. */
  G.K45_DU_AN = [
    ['Khối', 'Tên dự án mẫu', 'Nhịp tuần', 'Việc từng tuần', 'Sản phẩm cuối và cách đo tác động'],
    ['Khối 4', 'Góc sách lớp không mất sách', '5 tuần',
      'T1 đếm số sách hiện có và số sách mất trong tháng trước. T2 hỏi 30 bạn vì sao quên trả. T3 thiết kế sổ mượn và thẻ mượn giấy, chọn hai thủ thư luân phiên. T4 chạy thật, ghi từng lượt mượn. T5 đếm lại và họp tổng kết.',
      'Sổ mượn giấy đang chạy + bảng nội quy 5 dòng. Đo: số sách mất trong 30 ngày sau so với 30 ngày trước; tỷ lệ sách trả đúng hạn.'],
    ['Khối 4', 'Sân trường bớt rác giấy', '4 tuần',
      'T1 mỗi giờ ra chơi cân hoặc đếm túi rác giấy của khu vực tổ mình, ghi 5 ngày. T2 tìm nguồn rác lớn nhất và hỏi các bạn ở đó. T3 làm hai hộp thu giấy một mặt, dán hướng dẫn. T4 đếm lại 5 ngày và báo cáo.',
      'Hai hộp thu giấy một mặt đặt cố định + bảng số. Đo: số túi rác giấy mỗi ngày trước và sau; số tờ giấy một mặt được dùng lại.'],
    ['Khối 4', 'Bản đồ di sản quanh trường', '6 tuần',
      'T1 liệt kê các địa điểm trong bán kính đi bộ. T2 chọn 5 địa điểm, chia nhóm. T3 đi thực tế cùng phụ huynh, chụp ảnh, ghi chép. T4 tra tư liệu nhà trường cung cấp, ghi nguồn từng con số. T5 vẽ bản đồ A0 và viết thuyết minh 90 giây mỗi điểm. T6 trưng bày và mời lớp khác xem.',
      'Bản đồ A0 + 5 bài thuyết minh có ghi nguồn. Đo: số lượt khách xem; số người xem trả lời đúng 3 câu hỏi nhanh sau khi nghe thuyết minh.'],
    ['Khối 4', 'Cầu thang an toàn giờ tan học', '6 tuần',
      'T1 quan sát và đếm số lần chen, số lần suýt ngã trong 5 buổi tan học. T2 vẽ sơ đồ dòng người, tìm chỗ tắc. T3 đề xuất luồng đi và vạch dán sàn, xin ý kiến giáo viên chủ nhiệm. T4 tập huấn 10 bạn hướng dẫn. T5 chạy thật. T6 đếm lại và bàn giao.',
      'Sơ đồ luồng đi dán ở đầu cầu thang + đội hướng dẫn 10 bạn. Đo: số lần chen mỗi buổi trước và sau; thời gian giải toả cầu thang.'],
    ['Khối 4', 'Hộp đồ dùng dùng chung của lớp', '8 tuần',
      'T1 khảo sát 30 bạn về đồ hay thiếu. T2 lập danh mục và quy tắc 5B. T3 quyên góp và kiểm kê lần đầu. T4–T6 vận hành, ghi sổ mượn trả mỗi ngày. T7 kiểm kê lần hai, tìm nguyên nhân hao hụt. T8 sửa quy tắc và bàn giao cho tổ khác.',
      'Hộp đồ dùng + sổ mượn trả + quy tắc 5B đã sửa một lần. Đo: số lần học sinh phải mượn ngoài lớp mỗi tuần; tỷ lệ đồ còn lại sau 8 tuần.'],
    ['Khối 5', 'Thư viện nhỏ cho khối 1', '10 tuần',
      'T1 gặp giáo viên khối 1 hỏi nhu cầu. T2 khảo sát 60 học sinh khối 1 về loại sách thích. T3 lập kế hoạch, phân vai RACI, đặt 3 KPI. T4 quyên sách và phân loại. T5 làm giá và thẻ mượn. T6–T8 vận hành, mỗi tuần một buổi đọc cùng. T9 khảo sát lại. T10 báo cáo và bàn giao.',
      'Kệ sách vận hành được + sổ tay chuyển giao. Đo: số lượt mượn mỗi tuần; số học sinh khối 1 đọc hết ít nhất một cuốn; phản hồi của 3 giáo viên khối 1.'],
    ['Khối 5', 'Kèm bạn theo điểm yếu môn Toán', '10 tuần',
      'T1 xin phép giáo viên bộ môn, chọn 10 cặp tự nguyện. T2 mỗi cặp làm bài chẩn đoán, chỉ ra ba dạng hay sai. T3 tập huấn người kèm cách hỏi thay vì cách giải hộ. T4–T8 kèm 2 buổi mỗi tuần, mỗi buổi 25 phút, có phiếu ghi. T9 làm lại bài chẩn đoán. T10 tổng kết và trao sổ tay.',
      'Bộ 10 phiếu theo dõi + sổ tay người kèm. Đo: số dạng bài sai giảm được của từng bạn; số buổi kèm thực hiện đúng lịch trên tổng số buổi.'],
    ['Khối 5', 'Giờ ra chơi có trò cho khối nhỏ', '9 tuần',
      'T1 quan sát 5 giờ ra chơi, đếm số em ngồi một mình. T2 hỏi 40 em khối 1–2 thích trò gì. T3 chọn 5 trò an toàn, viết luật ngắn. T4 tập huấn đội quản trò. T5–T7 chạy 3 tuần, ghi số em tham gia mỗi buổi. T8 sửa trò theo phản hồi. T9 bàn giao cho khoá sau.',
      'Bộ 5 trò có luật viết ra + đội quản trò. Đo: số em ngồi một mình mỗi giờ ra chơi trước và sau; số em tham gia trung bình mỗi buổi.'],
    ['Khối 5', 'Số hoá góc truyền thống nhà trường', '12 tuần',
      'T1 xin phép và nhận danh mục hiện vật. T2 học cách ghi nguồn và xin phép hình ảnh. T3–T5 chụp, đo, ghi chú từng hiện vật. T6–T7 phỏng vấn 5 thầy cô lâu năm, xin phép ghi âm. T8–T9 dựng bài viết và clip 3 phút. T10 nhờ thầy cô kiểm tra sự chính xác. T11 chỉnh sửa. T12 công bố nội bộ và bàn giao.',
      'Bộ hồ sơ số của góc truyền thống + clip 3 phút có ghi nguồn. Đo: số hiện vật có hồ sơ đầy đủ trên tổng số; số lỗi sự kiện bị thầy cô trả lại ở vòng kiểm tra.'],
    ['Khối 5', 'Tuần lễ không bỏ bữa sáng của lớp', '8 tuần',
      'T1 lớp tự khảo sát 7 ngày xem ai ăn sáng, ai không, vì sao. T2 phân nhóm lý do và chọn hai lý do lớn nhất. T3 bàn với phụ huynh qua một phiếu xin ý kiến. T4 chọn giải pháp cho từng nhóm lý do. T5–T7 chạy và ghi bảng theo dõi mỗi sáng. T8 khảo sát lại và báo cáo.',
      'Bảng theo dõi 8 tuần + báo cáo 1 trang gửi phụ huynh. Đo: số ngày ăn sáng trung bình mỗi tuần của lớp, tuần đầu so với tuần cuối; số bạn chuyển từ dưới 3 ngày lên trên 5 ngày.']
  ];

  /* ── 4 · Giáo án mẫu khối 4 · dạng giaoan ─────────────────────
     GV4.3.03 · Tư duy dữ liệu (khảo sát/biểu đồ).
     Khẩu quyết: HỎI 30 – VẼ 1 – KẾT 1 CÂU.
     Đủ 11 pha theo GA_KHUNG_TIET. Mốc phút cộng dồn hai tiết. */
  G.K45_GIAO_AN_4 = [
    { p: 0, t: 'GV4.3.03 · T1 pha 0 — Chuẩn bị trước giờ học',
      ai: 'Giáo viên',
      n: 'Dán thẻ khẩu quyết HỎI 30 – VẼ 1 – KẾT 1 CÂU lên bảng. In sẵn 2 bộ phiếu khảo sát mẫu: một bộ hỏi tốt, một bộ hỏi dẫn dắt. Chuẩn bị giấy kẻ ô để vẽ cột, bút màu, và bảng đếm trống. Thử chuông 15 giây.',
      loi: 'Chốt luật ba chữ trước khi bắt đầu: hỏi đủ — vẽ đúng — kết luận không vượt số.',
      hong: 'Chưa in đủ giấy kẻ ô, đến pha vẽ biểu đồ học sinh phải kẻ tay và mất hết thời gian.' },
    { p: 0, t: 'GV4.3.03 · T1 pha 1 — Khởi động: đối chiếu hai bộ câu hỏi (8’)',
      ai: 'Cả lớp',
      n: 'Chiếu hai câu hỏi cho cùng một việc: “Bạn thấy sân trường có bẩn không?” và “Trong tuần qua bạn thấy rác ở sân trường mấy lần?”. Học sinh giơ thẻ CÂU ĐO ĐƯỢC / CÂU CHƯA ĐO ĐƯỢC. Làm 4 cặp câu.',
      loi: '“Câu nào cho ra một con số thì mới đếm được. Bạn nào chỉ giúp cô con số nằm ở đâu?”',
      hong: 'Học sinh giơ thẻ theo bạn bên cạnh, không ai chỉ ra được chỗ nào cho ra số.' },
    { p: 8, t: 'GV4.3.03 · T1 pha 2 — Câu chuyện bài học: hai nhóm cùng một sân trường (10’)',
      ai: 'Giáo viên kể, học sinh thảo luận',
      n: 'Kể 5 phút: hai nhóm cùng đề xuất thêm thùng rác. Nhóm A nói “sân bẩn lắm”. Nhóm B đưa bảng đếm 5 ngày và ảnh. Ban giám hiệu duyệt nhóm B. Thảo luận 5 phút quanh ba câu: nhóm A thiếu gì; con số của nhóm B lấy ở đâu; nếu con số sai thì sao.',
      loi: '“Cùng một ý kiến. Khác nhau ở chỗ một nhóm có số, một nhóm không.”',
      hong: 'Câu chuyện bị kể thành lời răn dạy “phải chăm chỉ”. Lớp không rút được vai trò của con số.' },
    { p: 18, t: 'GV4.3.03 · T1 pha 3 — Dạy khẩu quyết HỎI 30 – VẼ 1 – KẾT 1 CÂU (12’)',
      ai: 'Giáo viên và cả lớp',
      n: 'Giới thiệu thẻ lớn, đọc đồng thanh theo nhịp vỗ tay, làm ký hiệu tay ba nhịp. Giáo viên làm mẫu ba lần: sửa một câu hỏi dẫn dắt thành câu hỏi đo được; đếm 30 phiếu thành bảng tần suất; đọc một biểu đồ cột và nói đúng một câu kết luận.',
      loi: '“Ba nhịp thôi. Hỏi ba mươi. Vẽ một cái. Kết luận một câu. Đọc theo cô.”',
      hong: 'Giáo viên giảng về biểu đồ quá ba phút. Học sinh nghe nhưng không đọc lại được khẩu quyết.' },
    { p: 30, t: 'GV4.3.03 · T1 pha 4 — Thực hành có bấm giờ: viết 5 câu hỏi (12’)',
      ai: 'Từng học sinh',
      n: 'Mỗi em bốc một chủ đề trong lớp và viết 5 câu hỏi khảo sát trong 6 phút. Đổi phiếu cho bạn bên cạnh, bạn khoanh câu chưa đo được trong 3 phút. Sửa lại 3 phút. Giáo viên sửa theo đúng một nguyên tắc: chỉ vào câu, hỏi “con số nằm ở đâu”.',
      loi: '“Con sửa lại đúng câu này thôi. Một câu. Con số sẽ nằm ở đâu?”',
      hong: 'Giáo viên sửa cả năm câu một lượt. Học sinh gạch xoá hết phiếu rồi ngồi im.' },
    { p: 42, t: 'GV4.3.03 · T1 pha 5 — Cam kết và giao nhiệm vụ khảo sát (3’)',
      ai: 'Cả lớp',
      n: 'Mỗi em chốt 5 câu hỏi và ký cam kết hỏi đủ 30 bạn trước tiết sau. Chọn một buddy để nhắc nhau và để kiểm chéo số phiếu. Nhận phiếu đếm.',
      loi: '“Ba mươi phiếu. Không phải hai mươi chín. Bạn buddy đếm giúp con.”',
      hong: 'Cam kết ghi chung chung kiểu “con sẽ đi hỏi các bạn”, không có con số nên tiết sau không kiểm được.' },
    { p: 45, t: 'GV4.3.03 · T2 pha 1 — Ôn luyện quiz 12 tình huống (8’)',
      ai: 'Cả lớp',
      n: 'Giáo viên đọc 12 câu kết luận rút từ một biểu đồ chiếu trên bảng, học sinh giơ thẻ ĐÚNG / SAI. Một đến hai em giải thích. Chốt ba lỗi hay gặp: kết luận vượt quá số đã đo, gộp hai nhóm khác nhau, bỏ qua số người không trả lời.',
      loi: '“Câu số 7 sai vì biểu đồ không hề đo cái đó. Bạn nào nói lại giúp cô?”',
      hong: 'Dưới 80% chọn đúng mà vẫn sang pha sau. Ngưỡng đi tiếp của tiết 2 là từ 80% trở lên.' },
    { p: 53, t: 'GV4.3.03 · T2 pha 2 — Kỹ năng trọng tâm: từ phiếu sang bảng đếm (10’)',
      ai: 'Giáo viên và cặp đôi',
      n: 'Giáo viên làm mẫu hai lần cách gạch năm và cộng dồn. Sau đó luyện theo cặp: bạn A đọc phiếu, bạn B gạch bảng đếm, đổi vai sau 4 phút. Kiểm tra chéo tổng phải bằng 30.',
      loi: '“Tổng phải bằng ba mươi. Không bằng thì có phiếu bị bỏ sót hoặc đếm hai lần.”',
      hong: 'Một em trong cặp làm hết, em kia chỉ ngồi nghe và cuối giờ không biết cách gạch bảng đếm.' },
    { p: 63, t: 'GV4.3.03 · T2 pha 3 — Trạm thực chiến: vẽ và bảo vệ kết luận (18’)',
      ai: 'Nhóm nhỏ',
      n: 'Bốn trạm, mỗi trạm 4 phút, mỗi học sinh ít nhất hai lượt. Trạm 1 vẽ biểu đồ cột từ bảng đếm. Trạm 2 viết một câu kết luận. Trạm 3 nhận một kết luận sai cài sẵn và phải chỉ ra chỗ vượt số. Trạm 4 có bạn đóng vai đòi thêm số cho đẹp — học sinh phải từ chối và nói lý do.',
      loi: '“Trạm bốn có bạn xin con thêm vào ba phiếu cho tròn. Con nói gì? Nói ra, đừng chỉ nghĩ.”',
      hong: 'Trạm thành chỗ tô màu. Không có nhiễu cài sẵn thì học sinh chỉ vẽ lại mẫu đã thuộc.' },
    { p: 81, t: 'GV4.3.03 · T2 pha 4 — Chuẩn hoá văn hoá lớp (6’)',
      ai: 'Cả lớp',
      n: 'Lớp cùng viết 5 quy ước dùng số: hỏi đủ số phiếu đã hẹn; không sửa phiếu sau khi thu; ghi cả số người không trả lời; kết luận không vượt quá số đã đo; ai cũng xem được bảng đếm gốc. Viết lên A0, dán góc lớp.',
      loi: '“Năm điều thôi. Điều nào cả lớp làm được thì mới ghi lên.”',
      hong: 'Giáo viên phát sẵn bộ quy ước in ra. Tuần sau không ai nhắc tới và không ai coi là của mình.' },
    { p: 87, t: 'GV4.3.03 · T2 pha 5 — Vinh danh và nhiệm vụ 7 ngày (3’)',
      ai: 'MC lớp và giáo viên',
      n: 'Phát nhật ký 7 ngày: mỗi ngày ghi một con số quan sát được ở lớp hoặc ở nhà. Vinh danh theo minh chứng: nhóm có bảng đếm khớp tổng, nhóm chỉ ra được kết luận sai. Thu nhật ký sau 7 ngày.',
      loi: '“Cô đếm số phiếu và số bảng đếm khớp, cô không đếm nhóm nào nói hay.”',
      hong: 'Nhật ký phát ra rồi không thu. Chuyên đề dừng ở lớp, không đi vào tuần.' }
  ];

  /* ── 5 · Giáo án mẫu khối 5 · dạng giaoan ─────────────────────
     GV5.5.05 · Quản trị xung đột & đàm phán.
     Khẩu quyết: BIÊN BẢN 5 DÒNG.
     Đủ 11 pha theo GA_KHUNG_TIET. Mốc phút cộng dồn hai tiết.
     Lưu ý an toàn: mọi tình huống đóng vai đều là tình huống hư
     cấu in sẵn. Không lấy mâu thuẫn thật đang xảy ra trong lớp
     ra diễn, không nêu tên bạn nào. */
  G.K45_GIAO_AN_5 = [
    { p: 0, t: 'GV5.5.05 · T1 pha 0 — Chuẩn bị trước giờ học',
      ai: 'Giáo viên',
      n: 'Dán thẻ BIÊN BẢN 5 DÒNG. In 30 mẫu biên bản trống: việc gì – bên A muốn gì – bên B muốn gì – thoả thuận – hạn và ai kiểm. In 20 thẻ tình huống hư cấu. Kê bàn thành 4 cụm đàm phán. Thử chuông 15 giây.',
      loi: 'Chốt luật lớp trước khi bắt đầu: chỉ diễn tình huống trên thẻ, không lấy chuyện thật của bạn nào.',
      hong: 'Không in đủ mẫu biên bản, học sinh chép tay mất hết thời gian đàm phán.' },
    { p: 0, t: 'GV5.5.05 · T1 pha 1 — Khởi động: đối chiếu ba cách chốt (8’)',
      ai: 'Cả lớp',
      n: 'Giáo viên diễn ba mẫu chốt cho cùng một mâu thuẫn về lịch dùng sân: mẫu bỏ ngang, mẫu chốt miệng, mẫu chốt bằng biên bản. Học sinh giơ thẻ CHỐT ĐƯỢC / CHƯA CHỐT ĐƯỢC và chỉ ra mẫu hai thiếu gì.',
      loi: '“Chốt miệng xong tuần sau cãi lại. Thiếu cái gì thì tuần sau cãi lại được?”',
      hong: 'Học sinh giơ thẻ theo bạn, không ai nói được mẫu hai thiếu hạn và thiếu người kiểm.' },
    { p: 8, t: 'GV5.5.05 · T1 pha 2 — Câu chuyện bài học: hai nhóm một cái loa (10’)',
      ai: 'Giáo viên kể, học sinh thảo luận',
      n: 'Kể 5 phút về hai nhóm dự án cùng cần một cái loa vào cùng buổi chiều thứ Sáu, cãi ba tuần liền. Đến khi ngồi viết ra điều mỗi bên thật sự cần thì mới thấy một nhóm chỉ cần 20 phút. Thảo luận 5 phút: mỗi bên thật sự cần gì; chỗ nào có thể nhường; ai sẽ kiểm.',
      loi: '“Điều hai bên đòi thì khác nhau. Điều hai bên cần nhiều khi lại ghép được.”',
      hong: 'Chuyện bị kể thành lời khuyên “phải nhường nhịn nhau”. Lớp không tách được đòi và cần.' },
    { p: 18, t: 'GV5.5.05 · T1 pha 3 — Dạy khẩu quyết BIÊN BẢN 5 DÒNG (12’)',
      ai: 'Giáo viên và cả lớp',
      n: 'Giới thiệu năm dòng bằng thẻ lớn, đọc đồng thanh theo nhịp. Giáo viên làm mẫu ba lần: điền biên bản cho tranh chấp lịch, cho việc chia phần làm không đều, cho một lời hứa bị quên. Nhấn hai dòng hay bị bỏ nhất là hạn và người kiểm.',
      loi: '“Năm dòng. Thiếu dòng hạn thì thoả thuận không có ngày. Thiếu dòng người kiểm thì không ai biết đã xong chưa.”',
      hong: 'Giáo viên giảng về xung đột quá ba phút. Học sinh nghe xong không đọc lại được năm dòng.' },
    { p: 30, t: 'GV5.5.05 · T1 pha 4 — Thực hành có bấm giờ: đàm phán 4 phút (12’)',
      ai: 'Từng cặp học sinh',
      n: 'Mỗi cặp bốc một thẻ tình huống hư cấu. Bốn phút đàm phán, chuông kêu là dừng, hai phút điền biên bản. Làm hai vòng, đổi vai. Giáo viên sửa theo đúng một nguyên tắc: chỉ vào đúng một dòng còn trống và hỏi lại.',
      loi: '“Dòng bốn của con để trống. Hạn là ngày nào? Nói lại một lần thôi.”',
      hong: 'Giáo viên sửa hai ba dòng một lượt. Cặp học sinh rối rồi bỏ dở biên bản.' },
    { p: 42, t: 'GV5.5.05 · T1 pha 5 — Cam kết và vinh danh mini (3’)',
      ai: 'Cả lớp',
      n: 'Mỗi em ký cam kết: trong 7 ngày, một lần bất đồng thật sẽ chốt bằng biên bản 5 dòng. Chọn buddy để nhắc. Vinh danh nhanh cặp có biên bản đủ năm dòng và có chữ ký hai bên.',
      loi: '“Khen cặp có đủ chữ ký, không khen cặp nói hay nhất.”',
      hong: 'Vinh danh rơi vào vài em vốn nói tốt, không dựa trên biên bản đã điền.' },
    { p: 45, t: 'GV5.5.05 · T2 pha 1 — Ôn luyện quiz 12 tình huống (8’)',
      ai: 'Cả lớp',
      n: 'Giáo viên đọc 12 câu nói trong lúc căng thẳng, học sinh giơ thẻ NÓI VIỆC / NÓI NGƯỜI. Một đến hai em sửa lại câu nói người thành câu nói việc. Chốt ba lỗi phổ biến: gắn nhãn, nhắc lỗi cũ, nói thay cho cả nhóm.',
      loi: '“Câu số 9 là nói người. Bạn nào sửa lại thành nói việc giúp cô?”',
      hong: 'Dưới 80% chọn đúng mà vẫn đi tiếp. Ngưỡng đi tiếp của tiết 2 là từ 80% trở lên.' },
    { p: 53, t: 'GV5.5.05 · T2 pha 2 — Kỹ năng trọng tâm: tách đòi và cần (10’)',
      ai: 'Giáo viên và cặp đôi',
      n: 'Giáo viên làm mẫu hai tình huống, học sinh chỉ ra đâu là điều mỗi bên đòi và đâu là điều mỗi bên thật sự cần. Luyện theo cặp: bạn A kể tình huống, bạn B viết hai cột đòi và cần, đổi vai sau 4 phút.',
      loi: '“Bạn ấy đòi giữ cả buổi chiều. Bạn ấy cần gì? Cần bao nhiêu phút thôi?”',
      hong: 'Cặp chỉ chép lại nguyên câu đòi sang cột cần, không tách được hai thứ.' },
    { p: 63, t: 'GV5.5.05 · T2 pha 3 — Trạm thực chiến: bốn kiểu người khó (18’)',
      ai: 'Nhóm nhỏ',
      n: 'Bốn trạm, mỗi trạm 4 phút, mỗi học sinh ít nhất hai lượt. Trạm 1 bạn im lặng không nói gì. Trạm 2 bạn nói to át lời. Trạm 3 bạn đồng ý cho xong rồi hôm sau không làm. Trạm 4 bạn lôi lỗi cũ từ tháng trước ra. Mỗi trạm phải ra một biên bản 5 dòng.',
      loi: '“Trạm ba bạn gật cho xong. Con thêm dòng nào để tuần sau còn kiểm được?”',
      hong: 'Trạm thành chỗ diễn hài. Không cài đủ bốn kiểu người khó thì học sinh chỉ lặp lại mẫu ở tiết 1.' },
    { p: 81, t: 'GV5.5.05 · T2 pha 4 — Chuẩn hoá văn hoá lớp (6’)',
      ai: 'Cả lớp',
      n: 'Lớp cùng viết 5 quy ước xử lý bất đồng: nói việc không nói người; không nhắc lỗi quá hai tuần trước; mỗi bên nói hết một lượt mới đến lượt kia; chốt bằng biên bản 5 dòng; ai kiểm thì báo lại đúng hạn. Viết A0, dán góc lớp.',
      loi: '“Năm điều thôi. Điều nào cả lớp làm được thì mới ghi lên.”',
      hong: 'Quy ước viết dài như khẩu hiệu, không dán được vào sổ nhóm nên không ai dùng.' },
    { p: 87, t: 'GV5.5.05 · T2 pha 5 — Vinh danh và giao nhiệm vụ 7 ngày (3’)',
      ai: 'MC lớp và giáo viên',
      n: 'Phát sổ biên bản mini cho từng nhóm dự án. Nhiệm vụ 7 ngày: mỗi nhóm chốt ít nhất một bất đồng thật bằng biên bản 5 dòng và nộp lại. Nói một câu mở đầu bằng “Nhóm con sẽ…”.',
      loi: '“Cô thu sổ vào thứ Hai. Nhóm nào chưa có bất đồng nào thì ghi rõ là chưa có.”',
      hong: 'Sổ biên bản phát ra rồi không thu, tuần sau nhóm quay lại cãi miệng như cũ.' }
  ];

  /* ── 6 · Khối 4 và khối 5 khác khối 1–3 ở đâu · dạng luoi ───── */
  G.K45_KHAC_BIET = [
    { t: 'Đơn vị đầu ra: từ hành vi sang sản phẩm có người dùng',
      n: 'Khối 1–3 kết bằng một hành vi lặp lại và nhật ký 7 ngày. Khối 4–5 vẫn giữ nhật ký, nhưng phải ra thêm một sản phẩm mà người khác dùng được: sổ mượn, bộ trò chơi, bản đồ, hồ sơ số.',
      vi: 'Kiểm bằng câu hỏi: ngoài lớp có ai đang dùng cái này không. Không có ai dùng thì chuyên đề mới xong một nửa.' },
    { t: 'Thước đo: từ tick sang số trước và số sau',
      n: 'Khối 1–3 đếm số ngày làm được. Khối 4–5 phải có hai bộ số: đo trước khi làm và đo lại sau khi làm, cộng phản hồi của người hưởng lợi.',
      vi: 'Không có số đo ngày đầu thì cuối dự án không tổng kết được. Đo trước là việc của tuần 1, không phải việc của tuần cuối.' },
    { t: 'Nhịp: từ một buổi sang một chặng nhiều tuần',
      n: 'Khối 4 chạy dự án 4–8 tuần, khối 5 chạy 8–12 tuần. Chuyên đề trên lớp trở thành buổi mở chặng hoặc buổi giữa chặng, không còn là một sự kiện đứng riêng.',
      vi: 'Người dạy phải giữ lịch check-in 10 phút mỗi tuần. Bỏ hai tuần check-in là dự án chết, không cứu bằng một buổi tổng kết được.' },
    { t: 'Vai của học sinh: từ người tham gia sang người chịu trách nhiệm',
      n: 'Khối 4 bắt đầu có RACI và người kiểm. Khối 5 có thủ lĩnh dự án cầm trọn chặng và chuyển giao cho khoá sau.',
      vi: 'Mỗi đầu việc chỉ một người chịu chính. Việc hai tên hoặc không tên là việc sẽ trôi.' },
    { t: 'Xử lý sai: từ sửa hành vi sang tìm nguyên nhân gốc',
      n: 'Khối 1–3 sửa ngay hành vi trước mắt. Khối 4 hỏi vì sao ba lần, khối 5 hỏi đến lần thứ năm rồi mới chọn chỗ sửa.',
      vi: 'Ở khối 4–5, người dạy phải chịu được việc lớp mất thêm 5 phút để đi tìm gốc thay vì chốt nhanh.' },
    { t: 'Nguồn thông tin: từ nghe kể sang phải ghi nguồn',
      n: 'Mọi con số và mốc thời gian trong sản phẩm khối 4–5 phải ghi lấy từ đâu. Tấm gương lấy từ tư liệu nhà trường cung cấp, không lấy từ trí nhớ.',
      vi: 'Đây là chỗ dễ hỏng nhất khi làm media. Sản phẩm không tra lại được nguồn thì không được trưng bày.' },
    { t: 'Xung đột: từ tránh sang xử lý có văn bản',
      n: 'Khối 1–3 dạy không trêu bạn. Khối 4 dạy chốt bằng ba dòng viết ra. Khối 5 dạy biên bản 5 dòng có hạn và người kiểm.',
      vi: 'Nhóm chạy nhiều tuần thì mâu thuẫn là chắc chắn có. Không có cách chốt bằng giấy thì nhóm tan trước khi dự án xong.' },
    { t: 'Chuyển giao: khối 5 phải để lại được cho khoá sau',
      n: 'Sổ tay chuyển giao, checklist, danh sách người giúp và ba lỗi đã mắc. Khối 4 tập viết sổ, khối 5 phải kèm bạn khoá dưới ba buổi rồi giao thật một buổi.',
      vi: 'Đo bằng việc khoá sau đọc sổ và chạy được một buổi mà không phải hỏi lại người cũ.' }
  ];

  /* ── 7 · Luật dạy khối 4 và khối 5 · dạng luat ────────────────
     Giữ nguyên các luật chung của GA_LUAT. Đây là phần cộng thêm
     cho hai khối cuối Cấp 1. */
  G.K45_LUAT = [
    'Giữ nguyên khung 11 pha của GA_KHUNG_TIET. Khối 4–5 không được rút pha để lấy chỗ cho dự án; nếu thiếu giờ thì cắt bớt số trạm, không cắt pha.',
    'Mỗi chuyên đề đúng một khẩu quyết 3–5 chữ. Dạy khẩu quyết không quá ba phút, còn lại là luyện. Học sinh không đọc lại được khẩu quyết cuối buổi thì pha 3 đã hỏng.',
    'Mọi dự án phải đo trước khi làm. Số đo ngày đầu là việc của tuần 1. Không có số đầu thì cuối chặng không có gì để so.',
    'Kết luận không được vượt quá số đã đo. Học sinh nói một điều mà bảng đếm không cho biết thì người dạy phải chặn ngay tại chỗ.',
    'Mọi con số, mốc thời gian và tấm gương trong sản phẩm đều phải ghi nguồn. Tấm gương lấy từ tư liệu nhà trường cung cấp; người dạy không tự kể thêm chi tiết đời tư nhân vật.',
    'Không lấy mâu thuẫn thật đang xảy ra trong lớp ra đóng vai. Tình huống phải in sẵn và hư cấu. Không nêu tên học sinh nào trong thẻ tình huống.',
    'Mỗi đầu việc trong nhóm chỉ một người chịu trách nhiệm chính. Bảng việc còn dòng hai tên hoặc không tên thì chưa được cho chạy.',
    'Check-in 10 phút mỗi tuần là bắt buộc trong suốt chặng dự án. Bỏ hai tuần liên tiếp thì dừng dự án và làm lại kế hoạch, không đi tiếp.',
    'Vinh danh theo minh chứng. Điểm nào không chỉ ra được ảnh, số hoặc sản phẩm thì không cộng, kể cả khi nhóm trình bày hay.',
    'Truyền thông dự án không phóng đại. Mỗi câu nói về kết quả phải kèm một ảnh hoặc một con số; báo cáo phải nêu cả phần chưa đạt.',
    'Xin phép trước khi đăng ảnh có mặt người khác. Không đăng ảnh làm người được giúp đỡ xấu hổ, kể cả khi ảnh đó dễ gây chú ý.',
    'Học sinh khối 4–5 dùng công cụ số để hỏi lại chỗ chưa hiểu, không dùng để nộp bài. Bài có dùng thì ghi rõ đã dùng vào việc gì.',
    'Việc giao về nhà phải làm được bằng giấy, bút và điện thoại của người lớn. Dự án nào cần mua sắm hoặc cần phụ huynh làm hộ thì đổi dự án.',
    'Học sinh đi thực tế ngoài trường phải có người lớn đi cùng và có giấy đồng ý của phụ huynh. Không có thì chuyển sang phương án làm trong trường.',
    'Mỗi chặng kết bằng retrospective giữ – sửa – bỏ có tên người và ngày hạn. Tổng kết không có tên người là tổng kết để đó.',
    'Chuyên đề khối 5 phải để lại được sổ tay chuyển giao. Dự án chưa có sổ bàn giao thì chưa được tính là hoàn thành.'
  ];

})(window.GV = window.GV || {});
