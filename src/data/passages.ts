import type { Passage } from '../types';

/**
 * Ngu lieu cho cac chum cau hoi doc hieu (phan Ngon ngu — Van hoc).
 * Cac doan trich duoi day duoc bien soan rieng cho HSA365 de tranh vuong
 * ban quyen, nhung giu dung do dai va do kho cua ngu lieu trong de that.
 */
export const PASSAGES: readonly Passage[] = [
  {
    id: 'p.reading.1',
    title: 'Đọc chậm trong một thế giới vội',
    source: 'Ngữ liệu biên soạn cho HSA365',
    body: `Chúng ta đang đọc nhiều hơn bao giờ hết, nhưng có lẽ cũng hời hợt hơn bao giờ hết. Mỗi ngày, mắt ta lướt qua hàng vạn con chữ trên màn hình: tin nhắn, tiêu đề, bình luận, quảng cáo. Não bộ dần quen với nhịp lướt, và một cách âm thầm, nó đánh mất khả năng ở lại lâu với một trang sách.

Đọc chậm không phải là đọc ít. Đọc chậm là chấp nhận rằng có những câu văn đòi hỏi ta dừng lại, đọc đi đọc lại, thậm chí gấp sách để nghĩ. Khi ấy, người đọc không còn là kẻ tiêu thụ thông tin mà trở thành người đối thoại với tác giả. Một cuốn sách được đọc chậm sẽ ở lại rất lâu, trong khi hàng trăm bài báo được lướt qua chỉ để lại cảm giác mơ hồ rằng mình đã biết điều gì đó.

Vấn đề không nằm ở màn hình. Vấn đề nằm ở chỗ ta có còn giữ được cho mình một khoảng lặng đủ dài để suy nghĩ hay không. Khoảng lặng ấy, trớ trêu thay, lại là thứ đắt đỏ nhất của thời đại này.`,
  },
  {
    id: 'p.reading.2',
    title: 'Bức tường xanh của vùng cửa sông',
    source: 'Ngữ liệu biên soạn cho HSA365',
    body: `Rừng ngập mặn thường bị xem là vùng đất hoang: bùn lầy, muỗi và những gốc cây quằn quại rễ. Nhưng chính cái vẻ ngoài không hấp dẫn ấy lại che giấu một trong những hệ sinh thái làm việc chăm chỉ nhất hành tinh.

Bộ rễ chằng chịt của cây đước, cây mắm giữ lại phù sa, khiến bờ biển được bồi đắp thay vì bị bào mòn. Khi bão đổ bộ, một dải rừng ngập mặn rộng vài trăm mét có thể làm giảm đáng kể độ cao và năng lượng của sóng trước khi chúng chạm vào đê. Nhiều nghiên cứu cho thấy chi phí trồng và giữ rừng thấp hơn nhiều so với chi phí xây và sửa đê bê tông cho cùng một mức bảo vệ.

Rừng ngập mặn còn là vườn ươm của biển. Tôm, cua, cá con tìm đến các lạch nước nông giữa rễ cây để tránh kẻ săn mồi. Mất rừng, sản lượng đánh bắt ven bờ sụt giảm sau đó vài năm — một cái giá chậm trả nên thường không ai kịp nhận ra ai là người phải trả.

Điều đáng nói là mỗi héc-ta rừng ngập mặn có thể tích lũy lượng các-bon trong lớp bùn đáy lớn gấp nhiều lần một héc-ta rừng trên cạn. Chặt rừng ngập mặn để làm đầm nuôi tôm vì thế không chỉ đánh đổi sinh kế dài hạn lấy lợi nhuận ngắn hạn, mà còn giải phóng lượng các-bon đã bị khóa lại suốt hàng nghìn năm.`,
  },
  {
    id: 'p.english.1',
    title: 'The Quiet Rise of Night Trains',
    source: 'Ngữ liệu biên soạn cho HSA365',
    body: `For decades, the night train looked like a relic. Budget airlines made it cheaper and faster to fly between European cities, and one sleeper route after another was quietly withdrawn. Yet over the past few years the trend has reversed. New sleeper services now connect Vienna to Paris, Brussels to Berlin, and Stockholm to Hamburg, and many of them run close to full.

Part of the explanation is environmental. A passenger travelling by night train typically produces a small fraction of the carbon emissions of the same journey by plane, and a growing number of travellers say they take this into account when booking. Several governments have also begun to tax short-haul flights while subsidising cross-border rail, which narrows the price gap that once made flying an obvious choice.

There is a practical argument too. A night on a train replaces a night in a hotel, and passengers arrive in the city centre rather than at an airport an hour away. Whether the revival lasts, however, may depend less on passenger enthusiasm than on something far less romantic: whether rail operators in different countries can agree on how to sell a single ticket across their borders.`,
  },
];

export const PASSAGE_BY_ID = new Map(PASSAGES.map((p) => [p.id, p]));
