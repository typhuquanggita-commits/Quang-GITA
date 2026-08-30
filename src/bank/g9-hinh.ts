import type { Template } from '@/types';

/* =====================================================================
   MATHGITA — TUYỂN TẬP BÀI HÌNH HỌC THI VÀO 10 (khối 9)
   Biên soạn theo bộ "Thách thức tài năng Toán 9" của GITA: mỗi bài là một
   câu hình hoàn chỉnh 3–4 ý theo đúng cấu trúc đề tuyển sinh, kèm thang
   điểm chi tiết, phân tích tư duy và lời giải đầy đủ.
   ===================================================================== */

interface GeoProblem {
  stem: string;
  rubric: { criterion: string; points: number }[];
  thinking: string[];
  solution: string[];
}

const PROBLEMS: GeoProblem[] = [
  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho tam giác $ABC$ có ba góc nhọn ($AB<AC$) nội tiếp đường tròn $(O)$. Hai đường cao $BE$ và $CF$ cắt nhau tại $H$.\n\na) Chứng minh bốn điểm $B$, $C$, $E$, $F$ cùng thuộc một đường tròn.\n\nb) Chứng minh tứ giác $AEHF$ nội tiếp và $AH\\perp BC$.\n\nc) Chứng minh $\\angle AEF=\\angle ABC$.\n\nd) Chứng minh $OA\\perp EF$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi đủ ký hiệu vuông góc', points: 0.5 },
      { criterion: 'Ý a: chỉ ra $\\angle BFC=\\angle BEC=90\\deg$, hai đỉnh kề cùng nhìn $BC$ → bốn điểm thuộc đường tròn đường kính $BC$', points: 1 },
      { criterion: 'Ý b: $\\angle AEH+\\angle AFH=180\\deg$ → $AEHF$ nội tiếp đường kính $AH$', points: 0.75 },
      { criterion: 'Ý b: $H$ là trực tâm nên $AH$ là đường cao thứ ba, suy ra $AH\\perp BC$', points: 0.75 },
      { criterion: 'Ý c: từ $BFEC$ nội tiếp, dùng góc ngoài bằng góc trong đối diện', points: 1 },
      { criterion: 'Ý d: kẻ tiếp tuyến $Ax$, chứng minh $Ax\\para EF$ rồi suy ra $OA\\perp EF$', points: 1 },
    ],
    thinking: [
      'Ý a và b đều là “săn góc vuông”: mỗi đường cao cho một góc $90\\deg$, hai góc vuông cùng nhìn một đoạn là có ngay tứ giác nội tiếp.',
      'Ý c là hệ quả trực tiếp của tứ giác nội tiếp $BFEC$ — góc ngoài tại một đỉnh bằng góc trong của đỉnh đối diện.',
      'Ý d là câu phân loại: ý tưởng là kẻ tiếp tuyến $Ax$ tại $A$ rồi chứng minh $Ax\\para EF$; vì $OA\\perp Ax$ nên $OA\\perp EF$.',
    ],
    solution: [
      'a) Vì $BE$, $CF$ là đường cao nên $\\angle BEC=\\angle BFC=90\\deg$.',
      'Hai đỉnh $E$, $F$ kề nhau cùng nhìn đoạn $BC$ dưới góc vuông, nên bốn điểm $B$, $C$, $E$, $F$ cùng thuộc đường tròn đường kính $BC$.',
      'b) Xét tứ giác $AEHF$: $\\angle AEH=90\\deg$ (vì $BE\\perp AC$) và $\\angle AFH=90\\deg$ (vì $CF\\perp AB$).',
      'Tổng hai góc đối bằng $180\\deg$ nên $AEHF$ nội tiếp đường tròn đường kính $AH$.',
      '$H$ là giao của hai đường cao nên $H$ là trực tâm tam giác $ABC$; do đó $AH$ nằm trên đường cao thứ ba, suy ra $AH\\perp BC$.',
      'c) Tứ giác $BFEC$ nội tiếp (chứng minh ở ý a).',
      'Do đó góc ngoài tại đỉnh $E$ bằng góc trong tại đỉnh đối diện $B$: $\\angle AEF=\\angle ABC$.',
      'd) Kẻ tiếp tuyến $Ax$ của $(O)$ tại $A$ (lấy $Ax$ nằm cùng phía với $E$ so với $AB$).',
      '$\\angle xAB=\\angle ACB$ (góc tạo bởi tiếp tuyến và dây $AB$ bằng góc nội tiếp chắn cung $AB$).',
      'Mặt khác từ ý c ta có $\\angle AEF=\\angle ABC$, suy ra $\\angle AFE=\\angle ACB$ (cùng bù với các góc tương ứng trong tứ giác nội tiếp $BFEC$).',
      'Vậy $\\angle xAB=\\angle AFE$, hai góc này ở vị trí so le trong đối với $Ax$ và $EF$ nên $Ax\\para EF$.',
      'Mà $OA\\perp Ax$ (bán kính vuông góc tiếp tuyến), do đó $OA\\perp EF$. (điều phải chứng minh)',
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho đường tròn $(O)$ và điểm $A$ nằm ngoài đường tròn. Kẻ hai tiếp tuyến $AM$, $AN$ tới $(O)$ ($M$, $N$ là tiếp điểm). Một đường thẳng $d$ qua $A$ cắt $(O)$ tại hai điểm $B$ và $C$ ($AB<AC$, $d$ không đi qua $O$).\n\na) Chứng minh tứ giác $AMON$ nội tiếp.\n\nb) Chứng minh $AN^{2}=AB\\cdot AC$. Tính $BC$ khi $AB=4\\,cm$ và $AN=6\\,cm$.\n\nc) Gọi $I$ là trung điểm của $BC$. Chứng minh năm điểm $A$, $M$, $O$, $I$, $N$ cùng thuộc một đường tròn.\n\nd) Chứng minh $IA$ là tia phân giác của góc $\\angle MIN$.',
    rubric: [
      { criterion: 'Vẽ hình đúng', points: 0.5 },
      { criterion: 'Ý a: $\\angle AMO=\\angle ANO=90\\deg$, tổng hai góc đối bằng $180\\deg$', points: 0.75 },
      { criterion: 'Ý b: chứng minh $\\tri ANB\\sim\\tri ACN$ (góc $A$ chung, góc tiếp tuyến – dây)', points: 1 },
      { criterion: 'Ý b: suy ra $AN^{2}=AB\\cdot AC$ và tính $BC=5\\,cm$', points: 0.75 },
      { criterion: 'Ý c: $OI\\perp BC$ nên $\\angle AIO=90\\deg$, suy ra $I$ thuộc đường tròn đường kính $AO$', points: 1 },
      { criterion: 'Ý d: dùng $AM=AN$ để suy ra hai cung bằng nhau, từ đó hai góc nội tiếp bằng nhau', points: 1 },
    ],
    thinking: [
      'Cấu hình “hai tiếp tuyến + cát tuyến” là cấu hình xuất hiện nhiều nhất trong đề thi vào 10 — nhớ khai thác đủ bốn kết quả của hai tiếp tuyến.',
      'Ý b là hệ thức phương tích: đưa về tỉ lệ $\\f{AN}{AC}=\\f{AB}{AN}$ rồi tìm hai tam giác đồng dạng.',
      'Ý c: $I$ là trung điểm dây nên $OI\\perp BC$ — lại một góc vuông nhìn $AO$, ghép chung vào đường tròn đường kính $AO$ ở ý a.',
      'Ý d: khi đã có năm điểm cùng thuộc một đường tròn, mọi quan hệ góc đều quy về góc nội tiếp chắn cung bằng nhau.',
    ],
    solution: [
      'a) Vì $AM$, $AN$ là tiếp tuyến nên $OM\\perp AM$ và $ON\\perp AN$, tức $\\angle AMO=\\angle ANO=90\\deg$.',
      'Tổng hai góc đối bằng $180\\deg$ nên tứ giác $AMON$ nội tiếp đường tròn đường kính $AO$.',
      'b) Xét $\\tri ANB$ và $\\tri ACN$ có: $\\angle A$ chung;',
      '$\\angle ANB=\\angle ACN$ (góc tạo bởi tiếp tuyến $AN$ và dây $NB$ bằng góc nội tiếp $\\angle NCB$ cùng chắn cung $NB$).',
      'Do đó $\\tri ANB\\sim\\tri ACN$ (g.g), suy ra $\\f{AN}{AC}=\\f{AB}{AN}$, tức $AN^{2}=AB\\cdot AC$.',
      'Thay số: $6^{2}=4\\cdot AC\\Rightarrow AC=9\\ (cm)$.',
      'Vậy $BC=AC-AB=9-4=5\\ (cm)$.',
      'c) Vì $I$ là trung điểm của dây $BC$ (dây không đi qua tâm) nên $OI\\perp BC$, tức $\\angle AIO=90\\deg$.',
      'Do đó $I$ thuộc đường tròn đường kính $AO$ — chính là đường tròn đi qua $A$, $M$, $O$, $N$ ở ý a.',
      'Vậy năm điểm $A$, $M$, $O$, $I$, $N$ cùng thuộc một đường tròn.',
      'd) Trong đường tròn đường kính $AO$ nói trên, ta có $AM=AN$ (hai tiếp tuyến cùng xuất phát từ $A$).',
      'Hai dây bằng nhau căng hai cung bằng nhau, nên cung $AM$ bằng cung $AN$.',
      'Hai góc nội tiếp $\\angle MIA$ và $\\angle AIN$ chắn hai cung bằng nhau đó nên $\\angle MIA=\\angle AIN$.',
      'Vậy $IA$ là tia phân giác của góc $\\angle MIN$.',
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho nửa đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ trên đoạn $AO$ ($C$ khác $A$ và $O$). Đường thẳng qua $C$ vuông góc với $AB$ cắt nửa đường tròn tại $K$. Gọi $M$ là điểm bất kỳ trên cung $KB$ ($M$ khác $K$, $B$). Đường thẳng $CK$ cắt $AM$ tại $H$ và cắt $BM$ tại $D$.\n\na) Chứng minh tứ giác $ACMD$ nội tiếp.\n\nb) Chứng minh $CA\\cdot CB=CH\\cdot CD$.\n\nc) Chứng minh $CH\\cdot CD=CK^{2}$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi ký hiệu vuông góc', points: 0.5 },
      { criterion: 'Ý a: $\\angle AMB=90\\deg$ (góc nội tiếp chắn nửa đường tròn) nên $\\angle AMD=90\\deg$', points: 0.75 },
      { criterion: 'Ý a: cùng với $\\angle ACD=90\\deg$, tổng hai góc đối bằng $180\\deg$', points: 0.75 },
      { criterion: 'Ý b: chứng minh $\\tri CAH\\sim\\tri CDB$ (hai góc vuông + góc bằng nhau)', points: 1.25 },
      { criterion: 'Ý b: suy ra hệ thức $CA\\cdot CB=CH\\cdot CD$', points: 0.75 },
      { criterion: 'Ý c: dùng hệ thức lượng $CK^{2}=CA\\cdot CB$ trong tam giác $AKB$ vuông tại $K$', points: 1 },
    ],
    thinking: [
      '$M$ nằm trên nửa đường tròn đường kính $AB$ nên $\\angle AMB=90\\deg$ — đây là “chìa khoá” của cả bài.',
      'Ý b: hệ thức tích → tìm hai tam giác đồng dạng chứa bốn đoạn $CA$, $CB$, $CH$, $CD$.',
      'Ý c: $K$ cũng nằm trên nửa đường tròn nên $\\tri AKB$ vuông tại $K$, có đường cao $KC$ — dùng ngay hệ thức lượng.',
    ],
    solution: [
      'a) Vì $M$ thuộc nửa đường tròn đường kính $AB$ nên $\\angle AMB=90\\deg$ (góc nội tiếp chắn nửa đường tròn).',
      '$D$ thuộc tia $BM$ nên $\\angle AMD=180\\deg-\\angle AMB=90\\deg$.',
      'Lại có $CD\\perp AB$ tại $C$ nên $\\angle ACD=90\\deg$.',
      'Xét tứ giác $ACMD$: $\\angle ACD+\\angle AMD=90\\deg+90\\deg=180\\deg$, hai góc ở vị trí đối nhau.',
      'Vậy tứ giác $ACMD$ nội tiếp.',
      'b) Từ tứ giác $ACMD$ nội tiếp (ý a), hai góc nội tiếp $\\angle MAC$ và $\\angle MDC$ cùng chắn cung $MC$ nên $\\angle MAC=\\angle MDC$.',
      'Vì $H$ thuộc $AM$ và $B$ thuộc tia $DM$ nên $\\angle HAC=\\angle MAC$ và $\\angle BDC=\\angle MDC$, do đó $\\angle HAC=\\angle BDC$.',
      'Xét $\\tri CAH$ và $\\tri CDB$ có: $\\angle ACH=\\angle DCB=90\\deg$ (vì $CD\\perp AB$) và $\\angle HAC=\\angle BDC$ (chứng minh trên).',
      'Do đó $\\tri CAH\\sim\\tri CDB$ (g.g), suy ra $\\f{CA}{CD}=\\f{CH}{CB}$, tức $CA\\cdot CB=CH\\cdot CD$.',
      'c) Vì $K$ thuộc nửa đường tròn đường kính $AB$ nên $\\angle AKB=90\\deg$, tam giác $AKB$ vuông tại $K$.',
      '$KC\\perp AB$ nên $KC$ là đường cao ứng với cạnh huyền $AB$.',
      'Theo hệ thức lượng trong tam giác vuông: $CK^{2}=CA\\cdot CB$.',
      'Kết hợp với ý b: $CH\\cdot CD=CA\\cdot CB=CK^{2}$. (điều phải chứng minh)',
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho đường tròn $(O;R)$ đường kính $AB$. Bán kính $OC$ vuông góc với $AB$. Lấy $M$ là điểm bất kỳ trên cung nhỏ $AC$ ($M$ khác $A$ và $C$). Đường thẳng $BM$ cắt $AC$ tại $H$. Gọi $K$ là hình chiếu vuông góc của $H$ trên $AB$.\n\na) Chứng minh tứ giác $CBKH$ nội tiếp.\n\nb) Chứng minh $\\angle ACM=\\angle ACK$.\n\nc) Trên đoạn $BM$ lấy điểm $E$ sao cho $BE=AM$. Chứng minh tam giác $ECM$ vuông cân tại $C$.',
    rubric: [
      { criterion: 'Vẽ hình đúng', points: 0.5 },
      { criterion: 'Ý a: $\\angle HCB=90\\deg$ và $\\angle HKB=90\\deg$, tổng hai góc đối bằng $180\\deg$', points: 1 },
      { criterion: 'Ý b: dùng tứ giác $CBKH$ nội tiếp và góc nội tiếp cùng chắn cung $AM$', points: 1.25 },
      { criterion: 'Ý c: chứng minh $\\tri AMC=\\tri BEC$ (c.g.c) suy ra $CM=CE$', points: 1 },
      { criterion: 'Ý c: chứng minh $\\angle MCE=90\\deg$ và kết luận vuông cân', points: 1.25 },
    ],
    thinking: [
      '$OC\\perp AB$ cho $C$ là điểm chính giữa cung $AB$, do đó $CA=CB$ và mọi góc nội tiếp chắn cung $AC$ bằng $45\\deg$.',
      'Ý c là câu phân loại: muốn chứng minh vuông cân thì cần hai việc — hai cạnh bằng nhau và góc xen giữa bằng $90\\deg$.',
      'Ghép $AM$ và $BE$ vào hai tam giác $AMC$ và $BEC$, dùng $CA=CB$ và góc nội tiếp cùng chắn cung.',
    ],
    solution: [
      'a) Vì $\\angle ACB=90\\deg$ (góc nội tiếp chắn nửa đường tròn) nên $\\angle HCB=90\\deg$.',
      '$HK\\perp AB$ tại $K$ nên $\\angle HKB=90\\deg$.',
      'Xét tứ giác $CBKH$: $\\angle HCB+\\angle HKB=180\\deg$, hai góc ở vị trí đối nhau, nên $CBKH$ nội tiếp.',
      'b) Từ tứ giác $CBKH$ nội tiếp (ý a), hai góc nội tiếp $\\angle HCK$ và $\\angle HBK$ cùng chắn cung $HK$ nên $\\angle HCK=\\angle HBK$.',
      'Vì $H$ nằm trên $BM$ và $K$ nằm trên $AB$ nên $\\angle HBK=\\angle MBA$.',
      'Trong đường tròn $(O)$, hai góc nội tiếp $\\angle MBA$ và $\\angle MCA$ cùng chắn cung $AM$ nên $\\angle MBA=\\angle MCA$.',
      'Mặt khác $H$ thuộc đoạn $AC$ nên tia $CH$ trùng tia $CA$, do đó $\\angle HCK=\\angle ACK$.',
      'Kết hợp lại: $\\angle ACK=\\angle HCK=\\angle HBK=\\angle MBA=\\angle MCA=\\angle ACM$. (điều phải chứng minh)',
      'c) Vì $OC\\perp AB$ nên $C$ là điểm chính giữa cung $AB$, suy ra $CA=CB$.',
      'Xét $\\tri AMC$ và $\\tri BEC$ có: $AM=BE$ (giả thiết); $CA=CB$ (chứng minh trên);',
      '$\\angle MAC=\\angle EBC$ (hai góc nội tiếp cùng chắn cung $MC$ của đường tròn $(O)$).',
      'Do đó $\\tri AMC=\\tri BEC$ (c.g.c), suy ra $CM=CE$ và $\\angle ACM=\\angle BCE$.',
      'Khi đó $\\angle MCE=\\angle MCB+\\angle BCE=\\angle MCB+\\angle ACM=\\angle ACB=90\\deg$.',
      'Tam giác $ECM$ có $CM=CE$ và $\\angle MCE=90\\deg$ nên vuông cân tại $C$.',
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho đường tròn $(O;R)$ và điểm $A$ nằm ngoài đường tròn. Kẻ hai tiếp tuyến $AB$, $AC$ tới $(O)$ ($B$, $C$ là tiếp điểm).\n\na) Chứng minh tứ giác $ABOC$ nội tiếp.\n\nb) Gọi $E$ là giao điểm của $BC$ và $OA$. Chứng minh $BE\\perp OA$ và $OE\\cdot OA=R^{2}$.\n\nc) Cho $OA=2R$. Tính độ dài $AB$, số đo góc $\\angle BAC$ và diện tích tam giác $ABC$ theo $R$.',
    rubric: [
      { criterion: 'Vẽ hình đúng', points: 0.5 },
      { criterion: 'Ý a: hai góc vuông đối nhau, tổng bằng $180\\deg$', points: 0.5 },
      { criterion: 'Ý b: $OA$ là trung trực của $BC$ nên $OA\\perp BC$ tại $E$', points: 1 },
      { criterion: 'Ý b: dùng hệ thức lượng trong tam giác $OBA$ vuông tại $B$: $OB^{2}=OE\\cdot OA$', points: 1 },
      { criterion: 'Ý c: tính $AB=R\\s{3}$ và $\\angle BAC=60\\deg$', points: 1 },
      { criterion: 'Ý c: tính đúng $S_{ABC}=\\f{3R^{2}\\s{3}}{4}$', points: 1 },
    ],
    thinking: [
      'Cấu hình hai tiếp tuyến cho ngay: $AB=AC$, $OA$ là trung trực của $BC$, và tứ giác $ABOC$ nội tiếp đường tròn đường kính $OA$.',
      'Ý b: khi đã có $OA\\perp BC$ tại $E$ thì $BE$ là đường cao của tam giác vuông $OBA$ — dùng hệ thức lượng.',
      'Ý c: $OA=2R$ là cấu hình quen thuộc cho tam giác $ABC$ đều.',
    ],
    solution: [
      'a) Vì $AB$, $AC$ là tiếp tuyến nên $\\angle ABO=\\angle ACO=90\\deg$.',
      'Tổng hai góc đối bằng $180\\deg$ nên tứ giác $ABOC$ nội tiếp đường tròn đường kính $OA$.',
      'b) Ta có $AB=AC$ (hai tiếp tuyến cùng xuất phát từ $A$) và $OB=OC=R$.',
      'Do đó $OA$ là đường trung trực của đoạn $BC$, suy ra $OA\\perp BC$ tại $E$ và $E$ là trung điểm $BC$.',
      'Xét tam giác $OBA$ vuông tại $B$, có $BE$ là đường cao ứng với cạnh huyền $OA$.',
      'Theo hệ thức lượng: $OB^{2}=OE\\cdot OA$, tức $OE\\cdot OA=R^{2}$.',
      'c) Tam giác $OBA$ vuông tại $B$, theo Pythagore: $AB^{2}=OA^{2}-OB^{2}=(2R)^{2}-R^{2}=3R^{2}$.',
      'Vậy $AB=R\\s{3}$.',
      '$\\sin\\angle BAO=\\f{OB}{OA}=\\f{R}{2R}=\\f{1}{2}\\Rightarrow\\angle BAO=30\\deg$.',
      'Vì $AO$ là phân giác của $\\angle BAC$ nên $\\angle BAC=2\\cdot30\\deg=60\\deg$.',
      'Tam giác $ABC$ có $AB=AC$ và $\\angle BAC=60\\deg$ nên là tam giác **đều** cạnh $R\\s{3}$.',
      '$S_{ABC}=\\f{(R\\s{3})^{2}\\s{3}}{4}=\\f{3R^{2}\\s{3}}{4}$.',
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    stem: 'Cho đường tròn $(O;R)$ đường kính $AB$. Trên tiếp tuyến tại $A$ của đường tròn lấy điểm $M$ ($M$ khác $A$). Đường thẳng $MB$ cắt đường tròn tại điểm thứ hai $C$.\n\na) Chứng minh $\\angle ACB=90\\deg$ và $MA^{2}=MC\\cdot MB$.\n\nb) Chứng minh $AC^{2}=MC\\cdot CB$.\n\nc) Cho $MA=R\\s{3}$. Tính $MB$, $MC$ và $BC$ theo $R$.',
    rubric: [
      { criterion: 'Vẽ hình đúng, ghi ký hiệu vuông góc', points: 0.5 },
      { criterion: 'Ý a: $\\angle ACB=90\\deg$ (góc nội tiếp chắn nửa đường tròn)', points: 0.75 },
      { criterion: 'Ý a: chỉ ra $\\tri MAB$ vuông tại $A$ và $AC$ là đường cao, suy ra $MA^{2}=MC\\cdot MB$', points: 1 },
      { criterion: 'Ý b: dùng hệ thức đường cao $h^{2}=b\'c\'$ trong tam giác vuông $MAB$', points: 1 },
      { criterion: 'Ý c: tính $MB=R\\s{7}$ bằng định lí Pythagore', points: 0.75 },
      { criterion: 'Ý c: tính đúng $MC=\\f{3R\\s{7}}{7}$ và $BC=\\f{4R\\s{7}}{7}$, có kiểm tra lại', points: 1 },
    ],
    thinking: [
      'Tiếp tuyến tại $A$ vuông góc với bán kính $OA$, mà $OA$ nằm trên $AB$, nên $MA\\perp AB$: tam giác $MAB$ vuông tại $A$.',
      '$\\angle ACB=90\\deg$ nên $AC\\perp MB$ — vậy $AC$ chính là **đường cao ứng với cạnh huyền** $MB$ của tam giác vuông $MAB$.',
      'Nhận ra điều đó thì cả ba ý đều là hệ thức lượng trong tam giác vuông, không cần thêm công cụ nào khác.',
    ],
    solution: [
      'a) Vì $C$ thuộc đường tròn đường kính $AB$ nên $\\angle ACB=90\\deg$ (góc nội tiếp chắn nửa đường tròn).',
      '$MA$ là tiếp tuyến tại $A$ nên $MA\\perp OA$, mà $O\\in AB$ nên $MA\\perp AB$: tam giác $MAB$ vuông tại $A$.',
      'Từ $\\angle ACB=90\\deg$ suy ra $AC\\perp MB$, tức $AC$ là đường cao ứng với cạnh huyền $MB$ của tam giác $MAB$.',
      'Theo hệ thức lượng trong tam giác vuông: $MA^{2}=MC\\cdot MB$.',
      'b) Cũng trong tam giác vuông $MAB$ với đường cao $AC$, hai hình chiếu của hai cạnh góc vuông lên cạnh huyền là $MC$ và $CB$.',
      'Theo hệ thức $h^{2}=b\'c\'$ ta có $AC^{2}=MC\\cdot CB$.',
      'c) Với $MA=R\\s{3}$ và $AB=2R$, áp dụng định lí Pythagore trong tam giác $MAB$ vuông tại $A$:',
      '$MB^{2}=MA^{2}+AB^{2}=3R^{2}+4R^{2}=7R^{2}\\Rightarrow MB=R\\s{7}$.',
      'Từ $MA^{2}=MC\\cdot MB$: $MC=\\f{MA^{2}}{MB}=\\f{3R^{2}}{R\\s{7}}=\\f{3R}{\\s{7}}=\\f{3R\\s{7}}{7}$.',
      'Từ $AB^{2}=BC\\cdot BM$: $BC=\\f{AB^{2}}{MB}=\\f{4R^{2}}{R\\s{7}}=\\f{4R\\s{7}}{7}$.',
      'Kiểm tra: $MC+BC=\\f{3R\\s{7}+4R\\s{7}}{7}=\\f{7R\\s{7}}{7}=R\\s{7}=MB$ ✓',
    ],
  },
];

export const BANK_G9_HINH: Template[] = [
  {
    id: 'g9.hinh-thi-vao-10', topicId: 'g9-t6', grade: 9, level: 'VDC', kind: 'ESSAY',
    strand: 'HINH_HOC', tag: 'Câu hình thi vào 10 — bài nhiều ý',
    build: (r) => {
      const p = r.pick(PROBLEMS);
      return {
        stem: p.stem,
        answer: '',
        rubric: p.rubric,
        thinking: p.thinking,
        solution: p.solution,
        pitfall: 'Ý a và b luôn làm được — phải lấy trọn điểm hai ý này trước khi nghĩ tới ý cuối.',
      };
    },
  },
];

/** Tuyển tập bài hình để hiển thị riêng ở mục Luyện thi vào 10. */
export const GEO_PROBLEMS = PROBLEMS;
