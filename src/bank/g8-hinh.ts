import type { Template } from '@/types';

/* =====================================================================
   MATHGITA — TUYỂN TẬP BÀI HÌNH TỰ LUẬN KHỐI 8
   Biên soạn từ phần hình học của "Đề cương ôn tập cuối kì II – Toán 8
   (KNTT)" và phiếu nâng cao GITA về tam giác đồng dạng. Mỗi bài là một
   câu hình hoàn chỉnh 3–4 ý theo cấu trúc câu hình của đề học kì, kèm
   thang điểm chi tiết, phân tích tư duy và lời giải đầy đủ.
   ===================================================================== */

interface GeoProblem8 {
  stem: string;
  rubric: { criterion: string; points: number }[];
  thinking: string[];
  solution: string[];
}

const PROBLEMS: GeoProblem8[] = [
  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ vuông tại $A$ có $AB=6$ cm, $AC=8$ cm, đường cao $AH$ ($H\\in BC$).\n\na) Tính $BC$.\n\nb) Chứng minh $\\tri ABC\\sim\\tri HBA$, từ đó tính $AH$ và $BH$.\n\nc) Đường phân giác của góc $ABC$ cắt $AC$ tại $I$. Gọi $K$ là giao điểm của $AH$ và $BI$. Chứng minh $\\angle AIB=\\angle HKB$.\n\nd) Chứng minh $AI^{2}=IC\\cdot KH$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi đủ số liệu', points: 0.5 },
      { criterion: 'Ý a: dùng Pythagore tính $BC=10$ cm', points: 0.5 },
      { criterion: 'Ý b: chứng minh $\\tri ABC\\sim\\tri HBA$ (g.g)', points: 0.75 },
      { criterion: 'Ý b: lập tỉ số và tính $AH=4{,}8$ cm; $BH=3{,}6$ cm', points: 0.75 },
      { criterion: 'Ý c: hai góc cùng phụ với hai góc bằng nhau (do $BI$ là phân giác)', points: 1 },
      { criterion: 'Ý d: chứng minh $AI=AK$ và $\\tri AIB\\sim\\tri HKB$ để suy ra hệ thức', points: 1 },
    ],
    thinking: [
      'Mô hình "tam giác vuông có đường cao ứng với cạnh huyền" cho **ba cặp tam giác đồng dạng** cùng lúc: $\\tri ABC\\sim\\tri HBA\\sim\\tri HAC$. Nhận ra là ý a, b xong ngay.',
      'Cách ghép tên đỉnh phải theo đúng thứ tự góc bằng nhau: $\\angle B$ chung, $\\angle BAC=\\angle BHA=90\\deg$.',
      'Ý c: $\\angle AIB$ và $\\angle HKB$ lần lượt là góc còn lại của hai tam giác vuông $ABI$ và $HBK$, mà hai tam giác đó có hai góc nhọn tại $B$ bằng nhau (phân giác) — nên hai góc còn lại bằng nhau.',
      'Ý d: từ ý c suy ra tam giác $AIK$ cân tại $A$ ($AI=AK$); rồi dùng tính chất đường phân giác $\\f{AI}{IC}=\\f{AB}{BC}$ ghép với cặp đồng dạng để ra hệ thức.',
    ],
    solution: [
      'a) Tam giác $ABC$ vuông tại $A$, theo định lí Pythagore: $BC^{2}=AB^{2}+AC^{2}=6^{2}+8^{2}=100$, nên $BC=10$ cm.',
      'b) Xét $\\tri ABC$ và $\\tri HBA$: $\\angle BAC=\\angle BHA=90\\deg$; $\\angle ABC$ chung.',
      'Do đó $\\tri ABC\\sim\\tri HBA$ (g.g), suy ra $\\f{AB}{HB}=\\f{BC}{BA}=\\f{AC}{HA}$.',
      'Từ $\\f{AB}{HB}=\\f{BC}{BA}$: $HB=\\f{AB^{2}}{BC}=\\f{36}{10}=3{,}6$ cm.',
      'Từ $\\f{AC}{HA}=\\f{BC}{BA}$: $HA=\\f{AC\\cdot BA}{BC}=\\f{8\\cdot6}{10}=4{,}8$ cm.',
      'c) $BI$ là phân giác góc $B$ nên $\\angle ABI=\\angle HBK$.',
      'Tam giác $ABI$ vuông tại $A$ nên $\\angle AIB=90\\deg-\\angle ABI$.',
      'Tam giác $HBK$ vuông tại $H$ nên $\\angle HKB=90\\deg-\\angle HBK$.',
      'Hai góc $\\angle ABI$ và $\\angle HBK$ bằng nhau, nên $\\angle AIB=\\angle HKB$. (điều phải chứng minh)',
      'd) Từ ý c: $\\angle AKI=\\angle HKB$ (hai góc đối đỉnh) $=\\angle AIB=\\angle AIK$.',
      'Vậy tam giác $AIK$ cân tại $A$, suy ra $AI=AK$.',
      'Xét $\\tri ABI$ và $\\tri HBK$: $\\angle BAI=\\angle BHK=90\\deg$; $\\angle ABI=\\angle HBK$.',
      'Nên $\\tri ABI\\sim\\tri HBK$ (g.g), suy ra $\\f{AI}{HK}=\\f{AB}{HB}$.',
      'Mặt khác, $BI$ là phân giác của tam giác $ABC$ nên $\\f{AI}{IC}=\\f{AB}{BC}$.',
      'Từ ý b, $\\tri ABC\\sim\\tri HBA$ cho $\\f{AB}{HB}=\\f{BC}{BA}$, tức $\\f{AB}{HB}=\\f{BC}{AB}$.',
      'Do đó $\\f{AI}{HK}=\\f{BC}{AB}=\\f{IC}{AI}$ (nghịch đảo của tỉ số phân giác).',
      'Nhân chéo: $AI^{2}=IC\\cdot HK$. (điều phải chứng minh)',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho hình bình hành $ABCD$, điểm $F$ nằm trên cạnh $BC$. Tia $AF$ cắt $BD$ tại $E$ và cắt tia $DC$ tại $G$.\n\na) Chứng minh $\\tri BEF\\sim\\tri DEA$ và $\\tri BEA\\sim\\tri DEG$.\n\nb) Chứng minh $EA^{2}=EF\\cdot EG$.\n\nc) Chứng minh tích $BF\\cdot DG$ không đổi khi điểm $F$ thay đổi trên cạnh $BC$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi rõ các cặp cạnh song song của hình bình hành', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri BEF\\sim\\tri DEA$ (g.g) nhờ $BC\\para AD$', points: 1 },
      { criterion: 'Ý a: chứng minh $\\tri BEA\\sim\\tri DEG$ (g.g) nhờ $AB\\para DG$', points: 1 },
      { criterion: 'Ý b: ghép hai tỉ số của ý a để khử $\\f{EB}{ED}$', points: 1 },
      { criterion: 'Ý c: chứng minh $\\tri ABF\\sim\\tri GCF$ hoặc dùng $\\f{BF}{AB}=\\f{BC}{DG}$', points: 1 },
      { criterion: 'Ý c: kết luận $BF\\cdot DG=AB\\cdot BC$ — hằng số', points: 0.5 },
    ],
    thinking: [
      'Hình bình hành cho **hai cặp cạnh song song**, mà song song là nguồn sinh ra các cặp góc so le trong — nguyên liệu chuẩn cho đồng dạng g.g.',
      '$BC\\para AD$ dùng cho cặp thứ nhất; $AB\\para DC$ (chứa $DG$) dùng cho cặp thứ hai. Cứ mỗi cặp song song là một cặp tam giác đồng dạng.',
      'Ý b là mẹo "**ghép hai tỉ số có chung một vế**": cả hai cặp đồng dạng đều cho tỉ số $\\f{EB}{ED}$, đặt bằng nhau là ra ngay.',
      'Ý c: "không đổi" nghĩa là biểu diễn được qua các cạnh cố định $AB$, $BC$ — hãy hướng tất cả về hai đại lượng đó.',
    ],
    solution: [
      'a) Vì $ABCD$ là hình bình hành nên $BC\\para AD$, tức $BF\\para AD$.',
      'Xét $\\tri BEF$ và $\\tri DEA$: $\\angle FBE=\\angle ADE$ (so le trong, $BF\\para AD$); $\\angle BEF=\\angle DEA$ (đối đỉnh).',
      'Do đó $\\tri BEF\\sim\\tri DEA$ (g.g), suy ra $\\f{EF}{EA}=\\f{EB}{ED}$. (1)',
      'Cũng vì $ABCD$ là hình bình hành nên $AB\\para DC$, tức $AB\\para DG$.',
      'Xét $\\tri BEA$ và $\\tri DEG$: $\\angle ABE=\\angle GDE$ (so le trong, $AB\\para DG$); $\\angle BEA=\\angle DEG$ (đối đỉnh).',
      'Do đó $\\tri BEA\\sim\\tri DEG$ (g.g), suy ra $\\f{EA}{EG}=\\f{EB}{ED}$. (2)',
      'b) Từ (1) và (2): $\\f{EF}{EA}=\\f{EA}{EG}$.',
      'Nhân chéo: $EA^{2}=EF\\cdot EG$. (điều phải chứng minh)',
      'c) Vì $AB\\para DG$ nên xét $\\tri ABF$ và $\\tri GCF$ có $\\angle ABF=\\angle GCF$ (so le trong) và $\\angle AFB=\\angle GFC$ (đối đỉnh).',
      'Vậy $\\tri ABF\\sim\\tri GCF$ (g.g), suy ra $\\f{BF}{CF}=\\f{AB}{CG}$. (3)',
      'Mặt khác $AD\\para BF$ nên $\\tri GCF\\sim\\tri GDA$, cho $\\f{CF}{AD}=\\f{CG}{DG}$, tức $\\f{CF}{BC}=\\f{CG}{DG}$ (vì $AD=BC$). (4)',
      'Nhân (3) với (4): $\\f{BF}{CF}\\cdot\\f{CF}{BC}=\\f{AB}{CG}\\cdot\\f{CG}{DG}$, tức $\\f{BF}{BC}=\\f{AB}{DG}$.',
      'Suy ra $BF\\cdot DG=AB\\cdot BC$.',
      'Vế phải chỉ gồm hai cạnh của hình bình hành đã cho, không phụ thuộc vị trí của $F$. Vậy $BF\\cdot DG$ không đổi. (điều phải chứng minh)',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ cân tại $A$, $H$ là trung điểm của cạnh $BC$. Vẽ $HI\\perp AC$ tại $I$; gọi $O$ là trung điểm của $HI$.\n\na) Chứng minh $\\tri CHA\\sim\\tri CIH$, từ đó suy ra $\\f{CH}{CI}=\\f{HA}{IH}$.\n\nb) Chứng minh $\\tri BIC\\sim\\tri AOH$.\n\nc) Chứng minh $AO\\perp BI$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, chỉ rõ $AH\\perp BC$', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri CHA\\sim\\tri CIH$ (g.g) và viết đúng tỉ số', points: 1 },
      { criterion: 'Ý b: dùng $BC=2CH$, $IH=2OH$ để đưa về $\\f{BC}{AH}=\\f{CI}{OH}$', points: 1 },
      { criterion: 'Ý b: chỉ ra $\\angle BCI=\\angle AHO$ rồi kết luận đồng dạng (c.g.c)', points: 1 },
      { criterion: 'Ý c: từ đồng dạng suy ra hai góc bằng nhau, rồi dùng tổng góc để có $90\\deg$', points: 1 },
    ],
    thinking: [
      'Tam giác cân + trung điểm đáy ⇒ $AH$ vừa là trung tuyến vừa là **đường cao**: $AH\\perp BC$. Đây là dữ kiện then chốt mà đề không nói thẳng.',
      'Ý a là mô hình "tam giác vuông có đường cao ứng với cạnh huyền" áp cho $\\tri AHC$ vuông tại $H$ với đường cao $HI$.',
      'Ý b là mẹo **nhân đôi**: $BC=2CH$ và $IH=2OH$, nên tỉ số $\\f{BC}{CI}$ và $\\f{AH}{OH}$ đều quy được về tỉ số ở ý a. Hai cặp cạnh tỉ lệ + góc xen giữa bằng nhau = đồng dạng c.g.c.',
      'Ý c: chứng minh vuông góc bằng cách cộng góc — chỉ ra tổng hai góc nhọn trong một tam giác bằng $90\\deg$.',
    ],
    solution: [
      'a) Tam giác $ABC$ cân tại $A$ có $H$ là trung điểm $BC$ nên $AH$ là trung tuyến đồng thời là đường cao: $AH\\perp BC$.',
      'Xét $\\tri CHA$ và $\\tri CIH$: $\\angle AHC=\\angle HIC=90\\deg$; $\\angle ACH$ chung.',
      'Do đó $\\tri CHA\\sim\\tri CIH$ (g.g), suy ra $\\f{CH}{CI}=\\f{HA}{IH}=\\f{CA}{CH}$. (điều phải chứng minh)',
      'b) Từ ý a: $\\f{CH}{CI}=\\f{HA}{IH}$, tức $\\f{CI}{CH}=\\f{IH}{HA}$.',
      'Vì $H$ là trung điểm $BC$ nên $CH=\\f{BC}{2}$; vì $O$ là trung điểm $HI$ nên $IH=2\\cdot OH$.',
      'Thay vào: $\\f{CI}{\\f{BC}{2}}=\\f{2\\cdot OH}{HA}$, rút gọn được $\\f{CI}{BC}=\\f{OH}{HA}$, tức $\\f{BC}{CI}=\\f{HA}{OH}$.',
      'Xét góc xen giữa: $\\angle BCI=\\angle ACH$ (cùng là góc $C$ của tam giác, vì $I\\in AC$ và $B$, $H$, $C$ thẳng hàng).',
      'Mặt khác $\\tri CHA\\sim\\tri CIH$ cho $\\angle ACH=\\angle AHI$; mà $O\\in HI$ nên $\\angle AHI=\\angle AHO$.',
      'Vậy $\\angle BCI=\\angle AHO$.',
      'Kết hợp $\\f{BC}{CI}=\\f{HA}{OH}$ (hai cặp cạnh kề tương ứng tỉ lệ) và góc xen giữa bằng nhau, ta có $\\tri BCI\\sim\\tri AHO$ (c.g.c), tức $\\tri BIC\\sim\\tri AOH$.',
      'c) Từ $\\tri BCI\\sim\\tri AHO$ suy ra $\\angle CBI=\\angle HAO$.',
      'Gọi $J$ là giao điểm của $AO$ và $BI$. Xét tam giác $ABJ$ và dùng tam giác $ABH$ vuông tại $H$:',
      '$\\angle ABJ+\\angle BAJ=\\angle ABI+\\angle BAO$. Mà $\\angle BAO=\\angle BAH+\\angle HAO=\\angle BAH+\\angle CBI$.',
      'Do đó $\\angle ABJ+\\angle BAJ=(\\angle ABI+\\angle IBC)+\\angle BAH=\\angle ABH+\\angle BAH=90\\deg$ (hai góc nhọn của tam giác $ABH$ vuông tại $H$).',
      'Vậy trong tam giác $ABJ$, góc còn lại $\\angle AJB=90\\deg$, tức $AO\\perp BI$. (điều phải chứng minh)',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ nhọn có $AB<AC$, hai đường cao $BD$ và $CE$ ($D\\in AC$, $E\\in AB$).\n\na) Chứng minh $AB\\cdot AE=AC\\cdot AD$.\n\nb) Chứng minh $\\tri ADE\\sim\\tri ABC$.\n\nc) Cho $AB=6$ cm, $AC=9$ cm và $AD=4$ cm. Tính $AE$ và tỉ số diện tích $\\f{S_{ADE}}{S_{ABC}}$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi rõ hai đường cao', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri ABD\\sim\\tri ACE$ (g.g) rồi nhân chéo', points: 1.5 },
      { criterion: 'Ý b: từ $\\f{AD}{AB}=\\f{AE}{AC}$ và góc $A$ chung → đồng dạng c.g.c', points: 1.5 },
      { criterion: 'Ý c: tính $AE=6$ cm', points: 0.75 },
      { criterion: 'Ý c: tỉ số diện tích bằng bình phương tỉ số đồng dạng $=\\f{4}{9}$', points: 0.75 },
    ],
    thinking: [
      'Hai đường cao cho hai tam giác vuông cùng chứa góc $A$ — đó là cặp đồng dạng g.g hiển nhiên nhất của cấu hình này.',
      'Ý b là bẫy về **thứ tự đỉnh**: từ $AB\\cdot AE=AC\\cdot AD$ ta có $\\f{AD}{AB}=\\f{AE}{AC}$ — chú ý $AD$ đi với $AB$ chứ không phải với $AC$; đó là lí do $\\tri ADE\\sim\\tri ABC$ chứ không phải $\\tri AED\\sim\\tri ABC$.',
      'Ý c chỉ là áp dụng: tỉ số diện tích của hai tam giác đồng dạng bằng **bình phương** tỉ số đồng dạng.',
    ],
    solution: [
      'a) Xét $\\tri ABD$ (vuông tại $D$) và $\\tri ACE$ (vuông tại $E$):',
      '$\\angle ADB=\\angle AEC=90\\deg$; $\\angle BAD=\\angle CAE$ (cùng là góc $A$).',
      'Do đó $\\tri ABD\\sim\\tri ACE$ (g.g), suy ra $\\f{AB}{AC}=\\f{AD}{AE}$.',
      'Nhân chéo: $AB\\cdot AE=AC\\cdot AD$. (điều phải chứng minh)',
      'b) Từ $AB\\cdot AE=AC\\cdot AD$ ta viết lại thành $\\f{AD}{AB}=\\f{AE}{AC}$.',
      'Xét $\\tri ADE$ và $\\tri ABC$: $\\f{AD}{AB}=\\f{AE}{AC}$ và $\\angle DAE=\\angle BAC$ (góc $A$ chung).',
      'Vậy $\\tri ADE\\sim\\tri ABC$ (c.g.c). (điều phải chứng minh)',
      'c) Từ $AB\\cdot AE=AC\\cdot AD$: $6\\cdot AE=9\\cdot4=36$, nên $AE=6$ cm.',
      'Tỉ số đồng dạng của $\\tri ADE$ và $\\tri ABC$ là $k=\\f{AD}{AB}=\\f{4}{6}=\\f{2}{3}$.',
      '(Kiểm tra chéo: $\\f{AE}{AC}=\\f{6}{9}=\\f{2}{3}$ — khớp.)',
      'Do đó $\\f{S_{ADE}}{S_{ABC}}=k^{2}=\\left(\\f{2}{3}\\right)^{2}=\\f{4}{9}$.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$ ($H\\in BC$).\n\na) Chứng minh $\\tri HAB\\sim\\tri HCA$.\n\nb) Gọi $M$ là trung điểm của $AC$. Từ $H$ kẻ đường thẳng song song với $AC$, cắt $AB$ tại $D$ và cắt $BM$ tại $I$. Chứng minh $I$ là trung điểm của $DH$.\n\nc) Gọi $K$ là giao điểm của $AH$ và $CD$. Chứng minh $DI\\cdot KC=DK\\cdot MC$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi đủ ký hiệu song song và vuông góc', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri HAB\\sim\\tri HCA$ (g.g) nhờ hai góc cùng phụ', points: 1 },
      { criterion: 'Ý b: dùng hệ quả Thalès hai lần để có $\\f{DI}{AM}=\\f{IH}{MC}$', points: 1.5 },
      { criterion: 'Ý b: kết hợp $AM=MC$ để kết luận $DI=IH$', points: 0.5 },
      { criterion: 'Ý c: dùng Thalès cho $DH\\para AC$ với cát tuyến $CD$', points: 1.5 },
    ],
    thinking: [
      'Ý a là cặp đồng dạng "**kinh điển**" của đường cao trong tam giác vuông: $\\angle HAB$ và $\\angle HCA$ cùng phụ với $\\angle HAC$.',
      'Ý b: có đường thẳng song song thì công cụ số một là **hệ quả định lí Thalès** — cứ mỗi tam giác bị cắt bởi đường song song là một dãy tỉ số.',
      'Dùng Thalès trong $\\tri ABM$ (với $DI\\para AM$) và trong $\\tri BMC$ (với $IH\\para MC$), hai lần đều cho tỉ số $\\f{BI}{BM}$ — ghép lại là xong.',
      'Ý c cũng chỉ là Thalès, lần này với cát tuyến $CD$ cắt $DH\\para AC$; điểm mấu chốt là nhận ra $K$ nằm trên cả $CD$ lẫn $AH$.',
    ],
    solution: [
      'a) Xét $\\tri HAB$ và $\\tri HCA$: $\\angle AHB=\\angle CHA=90\\deg$.',
      'Trong tam giác $AHB$ vuông tại $H$: $\\angle HAB=90\\deg-\\angle ABH$.',
      'Trong tam giác $ABC$ vuông tại $A$: $\\angle ACB=90\\deg-\\angle ABC=90\\deg-\\angle ABH$.',
      'Do đó $\\angle HAB=\\angle HCA$, suy ra $\\tri HAB\\sim\\tri HCA$ (g.g). (điều phải chứng minh)',
      'b) Vì $DH\\para AC$ nên $DI\\para AM$ (do $I\\in DH$, $M\\in AC$).',
      'Áp dụng hệ quả định lí Thalès trong $\\tri ABM$ với $DI\\para AM$: $\\f{DI}{AM}=\\f{BI}{BM}$. (1)',
      'Cũng vì $DH\\para AC$ nên $IH\\para MC$.',
      'Áp dụng hệ quả định lí Thalès trong $\\tri BMC$ với $IH\\para MC$: $\\f{IH}{MC}=\\f{BI}{BM}$. (2)',
      'Từ (1) và (2): $\\f{DI}{AM}=\\f{IH}{MC}$.',
      'Mà $M$ là trung điểm của $AC$ nên $AM=MC$, suy ra $DI=IH$.',
      'Vậy $I$ là trung điểm của $DH$. (điều phải chứng minh)',
      'c) $K$ là giao điểm của $AH$ và $CD$, nên $D$, $K$, $C$ thẳng hàng và $H$, $K$, $A$ thẳng hàng.',
      'Xét $\\tri KDH$ và $\\tri KCA$: $\\angle KDH=\\angle KCA$ (so le trong, $DH\\para AC$, cát tuyến $DC$); $\\angle DKH=\\angle CKA$ (hai góc đối đỉnh).',
      'Do đó $\\tri KDH\\sim\\tri KCA$ (g.g), suy ra $\\f{DK}{CK}=\\f{DH}{CA}$. (3)',
      'Từ ý b, $I$ là trung điểm của $DH$ nên $DI=\\f{DH}{2}$; $M$ là trung điểm của $AC$ nên $MC=\\f{CA}{2}$.',
      'Suy ra $\\f{DI}{MC}=\\f{DH/2}{CA/2}=\\f{DH}{CA}$. (4)',
      'Từ (3) và (4): $\\f{DI}{MC}=\\f{DK}{CK}$, nhân chéo được $DI\\cdot KC=DK\\cdot MC$. (điều phải chứng minh)',
    ],
  },
];

export const BANK_G8_HINH: Template[] = [
  {
    id: 'g8.hinh-tu-luan-hk', topicId: 'g8-t6', grade: 8, level: 'VDC', kind: 'ESSAY',
    strand: 'HINH_HOC', tag: 'Câu hình tự luận học kì — tam giác đồng dạng nhiều ý',
    build: (r) => {
      const p = r.pick(PROBLEMS);
      return {
        stem: p.stem,
        answer: '',
        rubric: p.rubric,
        thinking: p.thinking,
        solution: p.solution,
        pitfall: 'Viết sai **thứ tự đỉnh** khi ghi hai tam giác đồng dạng sẽ kéo theo tỉ số sai ở mọi ý sau — luôn ghi đỉnh theo đúng cặp góc bằng nhau.',
      };
    },
  },
];

/** Tuyển tập bài hình khối 8 để hiển thị riêng trong thư viện tài liệu. */
export const GEO_PROBLEMS_G8 = PROBLEMS;
