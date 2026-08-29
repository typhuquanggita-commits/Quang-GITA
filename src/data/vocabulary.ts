/**
 * Academic vocabulary deck.
 *
 * The Digital SAT does not test obscure words in isolation; it tests common
 * words used precisely, in context. This deck therefore favours mid-frequency
 * academic vocabulary — the register of the passages themselves — over the
 * long, rare words that older word lists collected.
 *
 * Tier 1 words appear most often in released material and are taught first.
 */

import type { VocabWord } from '../types.ts';

export const VOCABULARY: VocabWord[] = [
  { id: 'v001', word: 'ambiguous', pos: 'adj', definition: 'open to more than one interpretation', definitionVi: 'mơ hồ, có thể hiểu theo nhiều nghĩa', example: 'The treaty clause was ambiguous enough that both parties claimed it favoured them.', synonyms: ['equivocal', 'unclear'], tier: 1 },
  { id: 'v002', word: 'undermine', pos: 'v', definition: 'to weaken gradually, especially by indirect means', definitionVi: 'làm suy yếu dần, ngầm phá hoại', example: 'The new findings undermine the assumption on which the model rests.', synonyms: ['erode', 'subvert'], tier: 1 },
  { id: 'v003', word: 'nuanced', pos: 'adj', definition: 'marked by subtle distinctions', definitionVi: 'tinh tế, có sắc thái phân biệt rõ', example: 'Her reading of the poem is more nuanced than earlier accounts.', synonyms: ['subtle', 'refined'], tier: 1 },
  { id: 'v004', word: 'plausible', pos: 'adj', definition: 'seeming reasonable or probable', definitionVi: 'nghe hợp lý, có vẻ đúng', example: 'The explanation is plausible but remains untested.', synonyms: ['credible', 'believable'], tier: 1 },
  { id: 'v005', word: 'substantiate', pos: 'v', definition: 'to provide evidence supporting a claim', definitionVi: 'chứng minh bằng bằng chứng', example: 'No document has been found to substantiate the allegation.', synonyms: ['corroborate', 'verify'], tier: 1 },
  { id: 'v006', word: 'novel', pos: 'adj', definition: 'new and not resembling anything formerly known', definitionVi: 'mới mẻ, chưa từng có', example: 'The team proposed a novel approach to protein folding.', synonyms: ['innovative', 'unprecedented'], tier: 1 },
  { id: 'v007', word: 'compelling', pos: 'adj', definition: 'convincing enough to command attention or belief', definitionVi: 'thuyết phục mạnh, cuốn hút', example: 'The prosecution presented compelling evidence.', synonyms: ['persuasive', 'cogent'], tier: 1 },
  { id: 'v008', word: 'preclude', pos: 'v', definition: 'to prevent something from happening', definitionVi: 'ngăn không cho xảy ra', example: 'The budget does not preclude further study.', synonyms: ['prevent', 'rule out'], tier: 2 },
  { id: 'v009', word: 'arbitrary', pos: 'adj', definition: 'based on random choice rather than reason', definitionVi: 'tuỳ tiện, không theo lý do nào', example: 'The cut-off was arbitrary; any nearby value would have served.', synonyms: ['random', 'capricious'], tier: 1 },
  { id: 'v010', word: 'mitigate', pos: 'v', definition: 'to make less severe or painful', definitionVi: 'làm giảm nhẹ', example: 'Planting mangroves mitigates storm surge.', synonyms: ['alleviate', 'lessen'], tier: 1 },
  { id: 'v011', word: 'discrete', pos: 'adj', definition: 'individually separate and distinct', definitionVi: 'rời rạc, tách biệt', example: 'The process occurs in discrete stages, not continuously.', synonyms: ['separate', 'distinct'], tier: 2 },
  { id: 'v012', word: 'empirical', pos: 'adj', definition: 'based on observation or experiment rather than theory', definitionVi: 'dựa trên quan sát/thực nghiệm', example: 'The claim has strong theoretical appeal but little empirical support.', synonyms: ['observed', 'experimental'], tier: 1 },
  { id: 'v013', word: 'anomaly', pos: 'n', definition: 'something that deviates from what is expected', definitionVi: 'điều bất thường, dị biệt', example: 'The reading was dismissed as an anomaly until it recurred.', synonyms: ['irregularity', 'aberration'], tier: 1 },
  { id: 'v014', word: 'concede', pos: 'v', definition: 'to admit that something is true, often reluctantly', definitionVi: 'thừa nhận (miễn cưỡng)', example: 'She concedes the point but disputes its significance.', synonyms: ['acknowledge', 'grant'], tier: 1 },
  { id: 'v015', word: 'salient', pos: 'adj', definition: 'most noticeable or important', definitionVi: 'nổi bật, đáng chú ý nhất', example: 'The salient feature of the design is its modularity.', synonyms: ['prominent', 'striking'], tier: 2 },
  { id: 'v016', word: 'tenuous', pos: 'adj', definition: 'very weak or slight', definitionVi: 'mong manh, yếu ớt', example: 'The connection between the two events is tenuous at best.', synonyms: ['flimsy', 'weak'], tier: 2 },
  { id: 'v017', word: 'proliferate', pos: 'v', definition: 'to increase rapidly in number', definitionVi: 'sinh sôi, tăng nhanh', example: 'Cheap sensors proliferated once the patent expired.', synonyms: ['multiply', 'burgeon'], tier: 2 },
  { id: 'v018', word: 'inherent', pos: 'adj', definition: 'existing as a permanent, essential attribute', definitionVi: 'vốn có, cố hữu', example: 'There is an inherent tension between speed and accuracy.', synonyms: ['intrinsic', 'innate'], tier: 1 },
  { id: 'v019', word: 'scrutiny', pos: 'n', definition: 'critical, close examination', definitionVi: 'sự xem xét kỹ lưỡng', example: 'The dataset did not survive careful scrutiny.', synonyms: ['examination', 'inspection'], tier: 1 },
  { id: 'v020', word: 'attribute', pos: 'v', definition: 'to regard something as caused by', definitionVi: 'quy cho, gán cho (nguyên nhân)', example: 'Historians attribute the decline to a shift in trade routes.', synonyms: ['ascribe', 'credit'], tier: 1 },
  { id: 'v021', word: 'contentious', pos: 'adj', definition: 'causing or likely to cause disagreement', definitionVi: 'gây tranh cãi', example: 'Redistricting remains the most contentious item on the agenda.', synonyms: ['controversial', 'disputed'], tier: 2 },
  { id: 'v022', word: 'ubiquitous', pos: 'adj', definition: 'present or found everywhere', definitionVi: 'có mặt khắp nơi', example: 'Plastic microfibres are now ubiquitous in ocean sediment.', synonyms: ['omnipresent', 'pervasive'], tier: 2 },
  { id: 'v023', word: 'paradigm', pos: 'n', definition: 'a typical pattern or model of something', definitionVi: 'khuôn mẫu, mô hình chuẩn', example: 'Plate tectonics became the governing paradigm of geology.', synonyms: ['model', 'framework'], tier: 2 },
  { id: 'v024', word: 'reconcile', pos: 'v', definition: 'to make two apparently conflicting things compatible', definitionVi: 'dung hoà, làm cho tương thích', example: 'The theory reconciles observations that had seemed contradictory.', synonyms: ['harmonise', 'square'], tier: 1 },
  { id: 'v025', word: 'prevalent', pos: 'adj', definition: 'widespread in a particular area or time', definitionVi: 'phổ biến, thịnh hành', example: 'The practice was prevalent throughout the region.', synonyms: ['widespread', 'common'], tier: 1 },
  { id: 'v026', word: 'articulate', pos: 'v', definition: 'to express an idea clearly and coherently', definitionVi: 'diễn đạt rõ ràng', example: 'She articulated the objection more precisely than its own author had.', synonyms: ['express', 'formulate'], tier: 1 },
  { id: 'v027', word: 'derivative', pos: 'adj', definition: 'imitative of the work of another', definitionVi: 'thiếu độc đáo, vay mượn', example: 'Critics found the second album derivative.', synonyms: ['unoriginal', 'imitative'], tier: 2 },
  { id: 'v028', word: 'exacerbate', pos: 'v', definition: 'to make a problem worse', definitionVi: 'làm trầm trọng thêm', example: 'Draining the wetland exacerbated the flooding downstream.', synonyms: ['aggravate', 'worsen'], tier: 2 },
  { id: 'v029', word: 'implicit', pos: 'adj', definition: 'implied though not directly expressed', definitionVi: 'ngầm hiểu, hàm ý', example: 'The warning was implicit rather than stated.', synonyms: ['tacit', 'unspoken'], tier: 1 },
  { id: 'v030', word: 'rigorous', pos: 'adj', definition: 'extremely thorough and careful', definitionVi: 'nghiêm ngặt, chặt chẽ', example: 'The study met a rigorous standard of evidence.', synonyms: ['exacting', 'stringent'], tier: 1 },
  { id: 'v031', word: 'obsolete', pos: 'adj', definition: 'no longer produced or used; out of date', definitionVi: 'lỗi thời', example: 'The format became obsolete within a decade.', synonyms: ['outdated', 'superseded'], tier: 2 },
  { id: 'v032', word: 'converge', pos: 'v', definition: 'to come together from different directions', definitionVi: 'hội tụ, gặp nhau', example: 'Independent lines of evidence converge on the same date.', synonyms: ['meet', 'coincide'], tier: 2 },
  { id: 'v033', word: 'analogous', pos: 'adj', definition: 'comparable in certain respects', definitionVi: 'tương tự, có thể so sánh', example: 'The circuit is analogous to a system of pipes.', synonyms: ['comparable', 'similar'], tier: 2 },
  { id: 'v034', word: 'succinct', pos: 'adj', definition: 'briefly and clearly expressed', definitionVi: 'ngắn gọn súc tích', example: 'His summary was succinct without omitting anything essential.', synonyms: ['concise', 'terse'], tier: 2 },
  { id: 'v035', word: 'redundant', pos: 'adj', definition: 'no longer needed because it duplicates something', definitionVi: 'thừa, lặp lại không cần thiết', example: 'The second clause is redundant given the first.', synonyms: ['superfluous', 'excess'], tier: 2 },
  { id: 'v036', word: 'coherent', pos: 'adj', definition: 'logical and consistent', definitionVi: 'mạch lạc, nhất quán', example: 'The argument is coherent even where it is unconvincing.', synonyms: ['consistent', 'logical'], tier: 1 },
  { id: 'v037', word: 'constitute', pos: 'v', definition: 'to be a part of a whole; to amount to', definitionVi: 'cấu thành, tạo nên', example: 'Those four species constitute the bulk of the catch.', synonyms: ['comprise', 'form'], tier: 1 },
  { id: 'v038', word: 'diminish', pos: 'v', definition: 'to make or become less', definitionVi: 'giảm bớt, suy giảm', example: 'The effect diminishes as the sample grows.', synonyms: ['decrease', 'wane'], tier: 1 },
  { id: 'v039', word: 'meticulous', pos: 'adj', definition: 'showing great attention to detail', definitionVi: 'tỉ mỉ, cẩn thận', example: 'His meticulous notes made replication possible.', synonyms: ['painstaking', 'thorough'], tier: 2 },
  { id: 'v040', word: 'facilitate', pos: 'v', definition: 'to make an action or process easier', definitionVi: 'tạo điều kiện, làm cho dễ hơn', example: 'The new protocol facilitates data sharing between labs.', synonyms: ['ease', 'enable'], tier: 1 },
  { id: 'v041', word: 'skeptical', pos: 'adj', definition: 'not easily convinced; having doubts', definitionVi: 'hoài nghi', example: 'Reviewers were skeptical of the effect size.', synonyms: ['doubtful', 'dubious'], tier: 1 },
  { id: 'v042', word: 'transient', pos: 'adj', definition: 'lasting only a short time', definitionVi: 'thoáng qua, ngắn ngủi', example: 'The improvement proved transient.', synonyms: ['fleeting', 'temporary'], tier: 2 },
  { id: 'v043', word: 'delineate', pos: 'v', definition: 'to describe or mark the boundaries of precisely', definitionVi: 'phác hoạ, vạch ranh giới rõ', example: 'The chapter delineates three distinct phases.', synonyms: ['outline', 'define'], tier: 3 },
  { id: 'v044', word: 'juxtapose', pos: 'v', definition: 'to place close together for contrasting effect', definitionVi: 'đặt cạnh nhau để đối chiếu', example: 'The exhibit juxtaposes photographs taken a century apart.', synonyms: ['contrast', 'pair'], tier: 3 },
  { id: 'v045', word: 'pragmatic', pos: 'adj', definition: 'dealing with things sensibly and realistically', definitionVi: 'thực tế, thực dụng', example: 'The committee took a pragmatic view of the deadline.', synonyms: ['practical', 'realistic'], tier: 2 },
  { id: 'v046', word: 'aggregate', pos: 'v', definition: 'to combine into a whole', definitionVi: 'gộp lại, tổng hợp', example: 'The service aggregates readings from thousands of sensors.', synonyms: ['combine', 'pool'], tier: 2 },
  { id: 'v047', word: 'stringent', pos: 'adj', definition: 'strict, precise, and demanding', definitionVi: 'nghiêm ngặt', example: 'Emissions limits became more stringent in 2020.', synonyms: ['strict', 'rigorous'], tier: 2 },
  { id: 'v048', word: 'candid', pos: 'adj', definition: 'truthful and straightforward', definitionVi: 'thẳng thắn, thành thật', example: 'Her candid assessment surprised the board.', synonyms: ['frank', 'forthright'], tier: 2 },
  { id: 'v049', word: 'impede', pos: 'v', definition: 'to delay or obstruct', definitionVi: 'cản trở', example: 'Silt impedes flow through the channel.', synonyms: ['hinder', 'obstruct'], tier: 2 },
  { id: 'v050', word: 'viable', pos: 'adj', definition: 'capable of working successfully', definitionVi: 'khả thi', example: 'Only one of the three routes is viable in winter.', synonyms: ['feasible', 'workable'], tier: 1 },
  { id: 'v051', word: 'inevitable', pos: 'adj', definition: 'certain to happen; unavoidable', definitionVi: 'tất yếu, không tránh khỏi', example: 'Some loss of detail is inevitable in compression.', synonyms: ['unavoidable', 'certain'], tier: 1 },
  { id: 'v052', word: 'refute', pos: 'v', definition: 'to prove a statement or theory to be wrong', definitionVi: 'bác bỏ (bằng chứng cứ)', example: 'A single counterexample refutes the universal claim.', synonyms: ['disprove', 'rebut'], tier: 1 },
  { id: 'v053', word: 'austere', pos: 'adj', definition: 'severe or plain in appearance or manner', definitionVi: 'khắc khổ, giản dị nghiêm nghị', example: 'The building\'s austere façade conceals an ornate interior.', synonyms: ['stark', 'spare'], tier: 3 },
  { id: 'v054', word: 'reciprocal', pos: 'adj', definition: 'given or done in return; mutual', definitionVi: 'qua lại, tương hỗ', example: 'The two species have a reciprocal relationship.', synonyms: ['mutual', 'shared'], tier: 3 },
  { id: 'v055', word: 'exemplify', pos: 'v', definition: 'to be a typical example of', definitionVi: 'là ví dụ điển hình cho', example: 'The case exemplifies a broader pattern.', synonyms: ['illustrate', 'typify'], tier: 2 },
  { id: 'v056', word: 'disparate', pos: 'adj', definition: 'essentially different in kind', definitionVi: 'khác biệt về bản chất', example: 'The review draws on disparate sources of evidence.', synonyms: ['dissimilar', 'divergent'], tier: 3 },
  { id: 'v057', word: 'trivial', pos: 'adj', definition: 'of little value or importance', definitionVi: 'không đáng kể, vụn vặt', example: 'The discrepancy is trivial and does not affect the conclusion.', synonyms: ['negligible', 'minor'], tier: 1 },
  { id: 'v058', word: 'unprecedented', pos: 'adj', definition: 'never done or known before', definitionVi: 'chưa từng có tiền lệ', example: 'The scale of the migration was unprecedented.', synonyms: ['unparalleled', 'novel'], tier: 1 },
  { id: 'v059', word: 'sustain', pos: 'v', definition: 'to keep something going over time', definitionVi: 'duy trì, giữ vững', example: 'The reef cannot sustain that rate of harvest.', synonyms: ['maintain', 'uphold'], tier: 1 },
  { id: 'v060', word: 'discern', pos: 'v', definition: 'to perceive or recognise something with effort', definitionVi: 'nhận ra, phân biệt được', example: 'No pattern could be discerned in the first year of data.', synonyms: ['detect', 'distinguish'], tier: 2 },
];

export const VOCAB_BY_ID = new Map<string, VocabWord>(VOCABULARY.map((w) => [w.id, w]));

export function vocabByTier(tier: 1 | 2 | 3): VocabWord[] {
  return VOCABULARY.filter((w) => w.tier === tier);
}
