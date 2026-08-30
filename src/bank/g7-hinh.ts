import type { Template } from '@/types';

/* =====================================================================
   MATHGITA — TUYỂN TẬP BÀI HÌNH TỰ LUẬN KHỐI 7
   Biên soạn từ phần hình học của "Đề cương học kì I – Toán 7" (Archimedes)
   và phiếu nâng cao GITA "Hai tam giác bằng nhau". Mỗi bài là một câu hình
   hoàn chỉnh 4 ý theo đúng cấu trúc câu 3,5 điểm của đề học kì, kèm thang
   điểm chi tiết, phân tích tư duy và lời giải đầy đủ.
   ===================================================================== */

interface GeoProblem7 {
  stem: string;
  rubric: { criterion: string; points: number }[];
  thinking: string[];
  solution: string[];
}

const PROBLEMS: GeoProblem7[] = [
  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ có $AB<AC$. Tia phân giác của góc $A$ cắt cạnh $BC$ tại điểm $I$. Trên cạnh $AC$ lấy điểm $D$ sao cho $AD=AB$.\n\na) Chứng minh $IB=ID$.\n\nb) Tia $DI$ cắt tia $AB$ tại điểm $E$. Chứng minh $\\tri IBE=\\tri IDC$, từ đó suy ra $BD\\para CE$.\n\nc) Gọi $H$ là trung điểm của $EC$. Chứng minh $AH\\perp BD$.\n\nd) Cho $\\angle ABC=2\\angle ACB$. Chứng minh $AB+BI=AC$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi đủ giả thiết – kết luận', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri ABI=\\tri ADI$ (c.g.c) → $IB=ID$', points: 1 },
      { criterion: 'Ý b: chứng minh $\\tri IBE=\\tri IDC$ (g.c.g)', points: 0.5 },
      { criterion: 'Ý b: suy ra $AE=AC$, tam giác $AEC$ cân, dùng góc đồng vị để kết luận $BD\\para CE$', points: 0.5 },
      { criterion: 'Ý c: $AH$ là phân giác của tam giác cân $AEC$ nên $AH\\perp EC$, kết hợp $BD\\para CE$', points: 0.5 },
      { criterion: 'Ý d: lấy $AK=AB$ trên $AC$, chứng minh $KI=KC$ để suy ra $AB+BI=AC$', points: 0.5 },
    ],
    thinking: [
      'Bài mở đầu bằng **phân giác + hai cạnh bằng nhau** — đó đúng là bộ ba dữ kiện của trường hợp c.g.c. Ghép ngay $\\tri ABI$ và $\\tri ADI$.',
      'Ý b: sau khi có $IB=ID$, hãy tìm thêm một cặp góc bằng nhau. Góc $\\angle BIE$ và $\\angle DIC$ **đối đỉnh**, còn $\\angle IBE$ và $\\angle IDC$ **kề bù** với hai góc bằng nhau ở ý a.',
      'Ý c và d đều dựa trên **tam giác cân**: $AE=AC$ ở ý b cho tam giác cân $AEC$, và trong tam giác cân, phân giác đỉnh đồng thời là đường cao.',
      'Ý d là mẹo quen thuộc: muốn chứng minh **tổng hai đoạn bằng một đoạn**, hãy cắt đoạn dài thành đúng hai phần rồi chứng minh từng phần bằng nhau.',
    ],
    solution: [
      'a) Xét $\\tri ABI$ và $\\tri ADI$ có: $AB=AD$ (giả thiết); $\\angle BAI=\\angle DAI$ (vì $AI$ là phân giác góc $A$); $AI$ là cạnh chung.',
      'Do đó $\\tri ABI=\\tri ADI$ (c.g.c), suy ra $IB=ID$ (hai cạnh tương ứng).',
      'b) Từ $\\tri ABI=\\tri ADI$ ta còn có $\\angle ABI=\\angle ADI$, nên hai góc kề bù của chúng cũng bằng nhau: $\\angle IBE=\\angle IDC$.',
      'Xét $\\tri IBE$ và $\\tri IDC$: $\\angle IBE=\\angle IDC$ (vừa chứng minh); $IB=ID$ (ý a); $\\angle BIE=\\angle DIC$ (hai góc đối đỉnh).',
      'Vậy $\\tri IBE=\\tri IDC$ (g.c.g), suy ra $BE=DC$.',
      'Khi đó $AE=AB+BE=AD+DC=AC$, nên tam giác $AEC$ cân tại $A$.',
      'Tam giác $ABD$ cũng cân tại $A$ (vì $AB=AD$). Hai tam giác cân $ABD$ và $AEC$ có chung góc ở đỉnh $A$ nên $\\angle ABD=\\angle AEC=\\f{180\\deg-\\angle A}{2}$.',
      'Hai góc này ở vị trí **đồng vị** đối với hai đường thẳng $BD$, $EC$ và cát tuyến $AE$, do đó $BD\\para CE$.',
      'c) Tam giác $AEC$ cân tại $A$, $H$ là trung điểm của $EC$ nên $AH$ là đường trung tuyến, đồng thời là đường cao: $AH\\perp EC$.',
      'Mà $BD\\para CE$ (ý b), nên $AH\\perp BD$.',
      'd) Trên cạnh $AC$ lấy điểm $K$ sao cho $AK=AB$. Khi đó $K$ trùng $D$ (vì $AD=AB$), nên ta xét luôn điểm $D$.',
      'Đặt $\\angle ACB=\\alpha$ thì $\\angle ABC=2\\alpha$.',
      'Từ $\\tri ABI=\\tri ADI$ (ý a) ta có $\\angle ADI=\\angle ABI=\\angle ABC=2\\alpha$.',
      '$\\angle IDC$ kề bù với $\\angle ADI$ nên $\\angle IDC=180\\deg-2\\alpha$; trong tam giác $IDC$: $\\angle DIC=180\\deg-\\angle IDC-\\angle DCI=180\\deg-(180\\deg-2\\alpha)-\\alpha=\\alpha$.',
      'Vậy $\\angle DIC=\\angle DCI=\\alpha$, tam giác $DIC$ cân tại $D$, suy ra $DI=DC$.',
      'Kết hợp $IB=ID$ (ý a): $AB+BI=AD+DI=AD+DC=AC$. (điều phải chứng minh)',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$. Gọi $E$ là trung điểm của $BC$. Trên tia đối của tia $EA$ lấy điểm $D$ sao cho $ED=EA$.\n\na) Chứng minh $\\tri AEB=\\tri DEC$.\n\nb) Chứng minh $AC\\para BD$.\n\nc) Kẻ $EI\\perp AC$ tại $I$ và $EK\\perp BD$ tại $K$. Chứng minh $\\tri AIE=\\tri DKE$.\n\nd) Chứng minh ba điểm $I$, $E$, $K$ thẳng hàng.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi đủ ký hiệu', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri AEB=\\tri DEC$ (c.g.c) với góc đối đỉnh tại $E$', points: 1 },
      { criterion: 'Ý b: từ hai góc so le trong bằng nhau suy ra $AC\\para BD$', points: 0.75 },
      { criterion: 'Ý c: chứng minh $\\tri AIE=\\tri DKE$ (cạnh huyền – góc nhọn)', points: 0.75 },
      { criterion: 'Ý d: chứng minh $\\angle IEA=\\angle KED$ rồi dùng góc đối đỉnh để kết luận thẳng hàng', points: 0.5 },
    ],
    thinking: [
      'Cấu hình "trung điểm + kéo dài gấp đôi" luôn cho ngay một cặp tam giác bằng nhau theo c.g.c với **góc đối đỉnh** ở giữa. Đây là mô hình phải nhận ra trong 5 giây.',
      'Có hai tam giác bằng nhau thì lập tức thu hoạch: các cặp cạnh tương ứng ($AB=CD$, $AC=BD$) và các cặp góc so le trong — chính là chìa khoá cho ý b.',
      'Ý c là tam giác vuông, nên dùng trường hợp riêng **cạnh huyền – góc nhọn** thay vì đi tìm đủ ba yếu tố.',
      'Ý d: muốn chứng minh ba điểm thẳng hàng qua một điểm giữa, hãy chứng minh hai tia đối nhau — thường bằng cách chỉ ra hai góc **đối đỉnh** hoặc tổng hai góc kề bằng $180\\deg$.',
    ],
    solution: [
      'a) Xét $\\tri AEB$ và $\\tri DEC$ có: $EA=ED$ (giả thiết); $\\angle AEB=\\angle DEC$ (hai góc đối đỉnh); $EB=EC$ ($E$ là trung điểm $BC$).',
      'Do đó $\\tri AEB=\\tri DEC$ (c.g.c).',
      'b) Xét tương tự $\\tri AEC$ và $\\tri DEB$: $EA=ED$; $\\angle AEC=\\angle DEB$ (đối đỉnh); $EC=EB$.',
      'Vậy $\\tri AEC=\\tri DEB$ (c.g.c), suy ra $\\angle EAC=\\angle EDB$.',
      'Hai góc này ở vị trí **so le trong** đối với hai đường thẳng $AC$, $BD$ và cát tuyến $AD$, nên $AC\\para BD$.',
      'Từ hai tam giác bằng nhau ở trên ta cũng có $AC=DB$.',
      'c) Xét hai tam giác vuông $AIE$ (vuông tại $I$) và $DKE$ (vuông tại $K$):',
      '$EA=ED$ (giả thiết) — đây là hai cạnh huyền;',
      '$\\angle EAI=\\angle EDK$ (chính là $\\angle EAC=\\angle EDB$ đã chứng minh ở ý b).',
      'Do đó $\\tri AIE=\\tri DKE$ (cạnh huyền – góc nhọn), suy ra $EI=EK$.',
      'd) Từ $\\tri AIE=\\tri DKE$ ta có $\\angle AEI=\\angle DEK$ (hai góc tương ứng).',
      'Mặt khác $A$, $E$, $D$ thẳng hàng nên $\\angle AEI$ và $\\angle DEI$ kề bù: $\\angle AEI+\\angle DEI=180\\deg$.',
      'Thay $\\angle AEI=\\angle DEK$ ta được $\\angle DEK+\\angle DEI=180\\deg$, tức $\\angle IEK=180\\deg$.',
      'Vậy ba điểm $I$, $E$, $K$ thẳng hàng. (điều phải chứng minh)',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ cân tại $A$. Trên cạnh $BC$ lấy hai điểm $D$, $E$ sao cho $BD=CE<\\f{BC}{2}$. Qua $D$ kẻ đường thẳng vuông góc với $BC$, cắt $AB$ tại $M$. Qua $E$ kẻ đường thẳng vuông góc với $BC$, cắt $AC$ tại $N$.\n\na) Chứng minh $DM=EN$.\n\nb) Chứng minh $EM=DN$.\n\nc) Chứng minh tam giác $ADE$ cân.\n\nd) Chứng minh $MN\\para BC$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi rõ hai đường vuông góc', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri BDM=\\tri CEN$ (cạnh góc vuông – góc nhọn kề)', points: 1 },
      { criterion: 'Ý b: chứng minh $\\tri MDE=\\tri NED$ (c.g.c) → $EM=DN$', points: 0.75 },
      { criterion: 'Ý c: chứng minh $\\tri ABD=\\tri ACE$ (c.g.c) → $AD=AE$', points: 0.75 },
      { criterion: 'Ý d: chứng minh $AM=AN$ rồi dùng hai tam giác cân chung đỉnh $A$', points: 0.5 },
    ],
    thinking: [
      'Tam giác cân cho ngay hai góc đáy bằng nhau — đó là "góc nhọn" cần thiết để ghép hai tam giác vuông ở ý a.',
      'Ý b không cần dựng thêm gì: hai tam giác $MDE$ và $NED$ dùng chung cạnh $DE$, có $DM=EN$ (ý a) và hai góc vuông xen giữa.',
      'Ý c: $BD=CE$ cộng với $AB=AC$ và hai góc đáy bằng nhau chính là bộ c.g.c.',
      'Ý d: mọi bài "chứng minh song song với đáy tam giác cân" đều quy về việc chỉ ra tam giác nhỏ cũng cân tại cùng đỉnh $A$, rồi so sánh hai góc đáy (đồng vị).',
    ],
    solution: [
      'a) Tam giác $ABC$ cân tại $A$ nên $\\angle ABC=\\angle ACB$, tức $\\angle MBD=\\angle NCE$.',
      'Xét hai tam giác vuông $BDM$ (vuông tại $D$) và $CEN$ (vuông tại $E$):',
      '$BD=CE$ (giả thiết); $\\angle MBD=\\angle NCE$ (vừa chứng minh).',
      'Do đó $\\tri BDM=\\tri CEN$ (cạnh góc vuông – góc nhọn kề), suy ra $DM=EN$ và $BM=CN$.',
      'b) Vì $MD\\perp BC$ và $NE\\perp BC$ nên $\\angle MDE=\\angle NED=90\\deg$.',
      'Xét $\\tri MDE$ và $\\tri NED$: $DM=EN$ (ý a); $\\angle MDE=\\angle NED=90\\deg$; $DE$ là cạnh chung.',
      'Vậy $\\tri MDE=\\tri NED$ (c.g.c), suy ra $ME=ND$, tức $EM=DN$.',
      'c) Xét $\\tri ABD$ và $\\tri ACE$: $AB=AC$ (tam giác $ABC$ cân tại $A$); $\\angle ABD=\\angle ACE$ (hai góc đáy); $BD=CE$ (giả thiết).',
      'Do đó $\\tri ABD=\\tri ACE$ (c.g.c), suy ra $AD=AE$. Vậy tam giác $ADE$ cân tại $A$.',
      'd) Từ ý a ta có $BM=CN$, mà $AB=AC$, nên $AM=AB-BM=AC-CN=AN$.',
      'Vậy tam giác $AMN$ cân tại $A$, do đó $\\angle AMN=\\f{180\\deg-\\angle A}{2}$.',
      'Tam giác $ABC$ cũng cân tại $A$ nên $\\angle ABC=\\f{180\\deg-\\angle A}{2}$.',
      'Suy ra $\\angle AMN=\\angle ABC$; hai góc này ở vị trí đồng vị đối với $MN$, $BC$ và cát tuyến $AB$.',
      'Vậy $MN\\para BC$. (điều phải chứng minh)',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ vuông tại $A$, có $BM$ là tia phân giác của góc $B$ ($M\\in AC$). Kẻ $MD\\perp BC$ tại $D$. Kéo dài $MD$ cắt $AB$ tại $E$.\n\na) Chứng minh $BA=BD$.\n\nb) Chứng minh $\\tri ABC=\\tri DBE$.\n\nc) Chứng minh $BM$ là đường trung trực của đoạn $AD$.\n\nd) Chứng minh ba điểm $B$, $M$ và trung điểm $N$ của $EC$ thẳng hàng.',
    rubric: [
      { criterion: 'Vẽ hình đúng', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri ABM=\\tri DBM$ (cạnh huyền – góc nhọn) → $BA=BD$', points: 1 },
      { criterion: 'Ý b: chứng minh $\\tri ABC=\\tri DBE$ (g.c.g)', points: 0.75 },
      { criterion: 'Ý c: từ $BA=BD$ và $MA=MD$ suy ra $BM$ là trung trực của $AD$', points: 0.75 },
      { criterion: 'Ý d: chứng minh $M$ là trực tâm $\\tri BEC$, kết hợp $BE=BC$ để kết luận', points: 0.5 },
    ],
    thinking: [
      'Điểm nằm trên tia phân giác thì **cách đều hai cạnh của góc** — đó là lí do $MA=MD$, và hai tam giác vuông $ABM$, $DBM$ bằng nhau theo cạnh huyền – góc nhọn.',
      'Nhớ tính chất trục: hai điểm cùng cách đều hai đầu một đoạn thẳng thì đường nối chúng là **đường trung trực** của đoạn ấy. Ý c chỉ cần đúng hai điểm $B$ và $M$.',
      'Ý d là câu phân loại: trong tam giác $BEC$, $CA$ và $ED$ là hai đường cao cắt nhau tại $M$, nên $M$ là **trực tâm**, kéo theo $BM\\perp EC$.',
      'Kết hợp $BE=BC$ (tam giác $BEC$ cân tại $B$): đường cao từ $B$ cũng là trung tuyến, nên đi qua trung điểm $N$ của $EC$.',
    ],
    solution: [
      'a) Xét hai tam giác vuông $ABM$ (vuông tại $A$) và $DBM$ (vuông tại $D$):',
      '$BM$ là cạnh huyền chung; $\\angle ABM=\\angle DBM$ (vì $BM$ là phân giác góc $B$).',
      'Do đó $\\tri ABM=\\tri DBM$ (cạnh huyền – góc nhọn), suy ra $BA=BD$ và $MA=MD$.',
      'b) Xét $\\tri ABC$ và $\\tri DBE$: $\\angle BAC=\\angle BDE=90\\deg$; $BA=BD$ (ý a); $\\angle ABC=\\angle DBE$ (chính là góc $B$, chung).',
      'Vậy $\\tri ABC=\\tri DBE$ (g.c.g), suy ra $BC=BE$ và $AC=DE$.',
      'c) Từ ý a: $BA=BD$ nên $B$ cách đều hai đầu mút của đoạn $AD$; $MA=MD$ nên $M$ cũng cách đều hai đầu mút của $AD$.',
      'Hai điểm phân biệt cùng cách đều hai đầu một đoạn thẳng thì đường thẳng qua chúng là đường trung trực của đoạn đó.',
      'Vậy $BM$ là đường trung trực của $AD$.',
      'd) Xét tam giác $BEC$: $CA\\perp BE$ (vì $\\angle BAC=90\\deg$ và $A\\in BE$) nên $CA$ là một đường cao;',
      '$ED\\perp BC$ (vì $MD\\perp BC$ và $E$, $M$, $D$ thẳng hàng) nên $ED$ là đường cao thứ hai.',
      'Hai đường cao $CA$ và $ED$ cắt nhau tại $M$, nên $M$ là **trực tâm** của tam giác $BEC$; do đó $BM\\perp EC$.',
      'Mặt khác từ ý b, $BE=BC$ nên tam giác $BEC$ cân tại $B$.',
      'Trong tam giác cân, đường cao hạ từ đỉnh cân đồng thời là đường trung tuyến, nên đường thẳng $BM$ đi qua trung điểm $N$ của $EC$.',
      'Vậy ba điểm $B$, $M$, $N$ thẳng hàng. (điều phải chứng minh)',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ nhọn có $AB<AC$. Gọi $I$ là giao điểm của tia phân giác góc $B$ và tia phân giác góc $C$. Từ $I$ lần lượt kẻ các đường vuông góc với $BC$, $CA$, $AB$ tại $M$, $N$, $P$.\n\na) Chứng minh $BM=BP$.\n\nb) Chứng minh $IM=IN$.\n\nc) Chứng minh $BP+CN=BC$.\n\nd) Chứng minh $AI$ là tia phân giác của góc $BAC$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi rõ ba chân đường vuông góc', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri BPI=\\tri BMI$ (cạnh huyền – góc nhọn)', points: 1 },
      { criterion: 'Ý b: chứng minh $IM=IP$ và $IM=IN$ qua hai cặp tam giác vuông bằng nhau', points: 0.75 },
      { criterion: 'Ý c: cộng $BM+MC$ và thay bằng $BP$, $CN$', points: 0.75 },
      { criterion: 'Ý d: chứng minh $IP=IN$ rồi dùng định lí đảo về tia phân giác', points: 0.5 },
    ],
    thinking: [
      'Toàn bộ bài chỉ xoay quanh **một định lí**: điểm nằm trên tia phân giác của một góc thì cách đều hai cạnh của góc đó — và định lí đảo của nó.',
      '$I$ nằm trên phân giác góc $B$ ⇒ $IP=IM$. $I$ nằm trên phân giác góc $C$ ⇒ $IM=IN$. Ghép lại: $IP=IN$.',
      'Ý c chỉ là phép cộng đoạn thẳng: $M$ nằm giữa $B$ và $C$ nên $BC=BM+MC$, mà $BM=BP$ và $MC=CN$.',
      'Ý d dùng **định lí đảo**: $I$ cách đều hai cạnh $AB$, $AC$ (vì $IP=IN$) và nằm trong góc $A$, nên $AI$ là phân giác góc $A$. Đây chính là chứng minh ba phân giác đồng quy.',
    ],
    solution: [
      'a) Xét hai tam giác vuông $BPI$ (vuông tại $P$) và $BMI$ (vuông tại $M$):',
      '$BI$ là cạnh huyền chung; $\\angle PBI=\\angle MBI$ (vì $BI$ là phân giác góc $B$).',
      'Do đó $\\tri BPI=\\tri BMI$ (cạnh huyền – góc nhọn), suy ra $BP=BM$ và $IP=IM$.',
      'b) Tương tự, xét hai tam giác vuông $CMI$ (vuông tại $M$) và $CNI$ (vuông tại $N$):',
      '$CI$ là cạnh huyền chung; $\\angle MCI=\\angle NCI$ (vì $CI$ là phân giác góc $C$).',
      'Vậy $\\tri CMI=\\tri CNI$ (cạnh huyền – góc nhọn), suy ra $CM=CN$ và $IM=IN$.',
      'c) Vì $I$ nằm trong tam giác nên $M$ nằm giữa $B$ và $C$, do đó $BC=BM+MC$.',
      'Thay $BM=BP$ (ý a) và $MC=CN$ (ý b) ta được $BC=BP+CN$. (điều phải chứng minh)',
      'd) Từ ý a: $IP=IM$; từ ý b: $IM=IN$. Suy ra $IP=IN$.',
      '$IP$ là khoảng cách từ $I$ đến $AB$, $IN$ là khoảng cách từ $I$ đến $AC$; hai khoảng cách này bằng nhau và $I$ nằm trong góc $BAC$.',
      'Theo định lí đảo về tia phân giác, $AI$ là tia phân giác của góc $BAC$. (điều phải chứng minh)',
      'Hệ quả: ba đường phân giác của tam giác $ABC$ cùng đi qua điểm $I$ — đó là tâm đường tròn nội tiếp tam giác.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ vuông tại $A$ ($AC<AB$). Dựng $AH\\perp BC$ tại $H$. Trên tia đối của tia $HA$ lấy điểm $E$ sao cho $HE=HA$.\n\na) Chứng minh $\\tri CHA=\\tri CHE$ và tam giác $CAE$ cân tại $C$.\n\nb) Chứng minh $CB$ là đường trung trực của $AE$ và tam giác $CBE$ vuông tại $E$.\n\nc) Gọi $M$ là trung điểm của $BC$; trên tia đối của tia $MA$ lấy điểm $D$ sao cho $MA=MD$. Chứng minh $BD=CE$.\n\nd) Chứng minh $AM=\\f{CB}{2}$.',
    rubric: [
      { criterion: 'Vẽ hình đúng', points: 0.5 },
      { criterion: 'Ý a: chứng minh $\\tri CHA=\\tri CHE$ (c.g.c) → $CA=CE$', points: 1 },
      { criterion: 'Ý b: dùng $HA=HE$ và $CB\\perp AE$ để kết luận trung trực; suy ra $\\angle CEB=90\\deg$', points: 0.75 },
      { criterion: 'Ý c: chứng minh $\\tri MAC=\\tri MDB$ (c.g.c) → $BD=CA=CE$', points: 0.75 },
      { criterion: 'Ý d: chứng minh $ABDC$ là hình chữ nhật (hoặc dùng trung tuyến ứng cạnh huyền)', points: 0.5 },
    ],
    thinking: [
      'Cấu hình "lấy điểm đối xứng qua chân đường cao" cho ngay hai tam giác bằng nhau theo c.g.c với cạnh chung là đường cao.',
      'Ý b: đường trung trực chỉ cần hai điều — **đi qua trung điểm** và **vuông góc**. Cả hai đã có sẵn từ giả thiết $HE=HA$ và $AH\\perp BC$.',
      'Ý c lại là mô hình "trung điểm + kéo dài gấp đôi" với góc đối đỉnh tại $M$ — hoàn toàn giống bài 2.',
      'Ý d là tính chất nền tảng: **trung tuyến ứng với cạnh huyền của tam giác vuông bằng nửa cạnh huyền**. Ta chứng minh lại nó bằng chính cấu hình ở ý c.',
    ],
    solution: [
      'a) Xét $\\tri CHA$ và $\\tri CHE$: $HA=HE$ (giả thiết); $\\angle CHA=\\angle CHE=90\\deg$ (vì $AH\\perp BC$); $CH$ là cạnh chung.',
      'Do đó $\\tri CHA=\\tri CHE$ (c.g.c), suy ra $CA=CE$. Vậy tam giác $CAE$ cân tại $C$.',
      'b) Đường thẳng $CB$ chứa $H$ — trung điểm của $AE$ (vì $HA=HE$) — và $CB\\perp AE$ (vì $AH\\perp BC$).',
      'Vậy $CB$ là đường trung trực của đoạn $AE$.',
      'Do $B$ nằm trên trung trực của $AE$ nên $BA=BE$; xét $\\tri BAC$ và $\\tri BEC$ có $BA=BE$, $CA=CE$ (ý a), $BC$ chung.',
      'Vậy $\\tri BAC=\\tri BEC$ (c.c.c), suy ra $\\angle BEC=\\angle BAC=90\\deg$: tam giác $CBE$ vuông tại $E$.',
      'c) Xét $\\tri MAC$ và $\\tri MDB$: $MA=MD$ (giả thiết); $\\angle AMC=\\angle DMB$ (hai góc đối đỉnh); $MC=MB$ ($M$ là trung điểm $BC$).',
      'Do đó $\\tri MAC=\\tri MDB$ (c.g.c), suy ra $BD=CA$.',
      'Kết hợp $CA=CE$ (ý a) ta được $BD=CE$. (điều phải chứng minh)',
      'd) Từ ý c, $\\tri MAC=\\tri MDB$ cho $\\angle MAC=\\angle MDB$; hai góc so le trong nên $AC\\para BD$.',
      'Mà $AC\\perp AB$ nên $BD\\perp AB$, tức $\\angle ABD=90\\deg$.',
      'Xét $\\tri ABD$ và $\\tri BAC$: $\\angle ABD=\\angle BAC=90\\deg$; $BD=AC$ (ý c); $AB$ là cạnh chung.',
      'Vậy $\\tri ABD=\\tri BAC$ (c.g.c), suy ra $AD=BC$.',
      'Mà $M$ là trung điểm của $AD$ (vì $MA=MD$), nên $AM=\\f{AD}{2}=\\f{BC}{2}=\\f{CB}{2}$. (điều phải chứng minh)',
    ],
  },
];

export const BANK_G7_HINH: Template[] = [
  {
    id: 'g7.hinh-tu-luan-hk', topicId: 'g7-t5', grade: 7, level: 'VDC', kind: 'ESSAY',
    strand: 'HINH_HOC', tag: 'Câu hình tự luận học kì — bài nhiều ý',
    build: (r) => {
      const p = r.pick(PROBLEMS);
      return {
        stem: p.stem,
        answer: '',
        rubric: p.rubric,
        thinking: p.thinking,
        solution: p.solution,
        pitfall: 'Ý a và b của câu hình luôn nằm trong tầm tay — vẽ hình chuẩn và lấy trọn hai ý này trước khi nghĩ tới ý cuối.',
      };
    },
  },
];

/** Tuyển tập bài hình khối 7 để hiển thị riêng trong thư viện tài liệu. */
export const GEO_PROBLEMS_G7 = PROBLEMS;
