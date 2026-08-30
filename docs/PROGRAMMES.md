# Programmes and fees

## Every amount is a placeholder

`PRICING.confirmed` is **`false`**. Nothing in `src/data/pricing.ts` is a quote.

The amounts are mid-market SAT tuition rates for Hà Nội and Hồ Chí Minh City as
of 2026-08, put there so the package structure can be reviewed with plausible
numbers rather than with zeroes. A table of zeroes cannot be argued with; a
table of invented numbers that nobody flagged is how a wrong price reaches a
parent.

So the flag is load-bearing. While it is false:

- every in-app surface shows a banner reading "Đây là mức tham khảo, **KHÔNG
  phải báo giá**"
- the public page at `/hoc-phi/` carries the same sentence
- both read it from `feeLabel()`, so it cannot be dropped from one and kept on
  the other, and a test asserts that

**To publish real prices:** set each `amountPerSession`, then set
`confirmed: true`. Both labels change at once.

## Fees are derived, never typed

A course total is the session rate times the session count **from the
syllabus**:

```
listTotal = delivery.amountPerSession × plan.totalSessions
```

A total typed separately survives the course being shortened, and a fee that no
longer matches the sessions delivered is the complaint that ends a relationship
with a family. A test asserts the derivation for every course × delivery pair.

The **hourly rate is also derived**, and shown. This exists to stop the oldest
trick in tuition pricing: quoting the same session rate against a longer
session. The Sprint course runs 180-minute sessions against everyone else's
120, and the table shows its hourly rate correspondingly lower — a test pins
exactly that.

## Four delivery modes

| Mode | Class size | Suits |
| --- | --- | --- |
| Chỉ dùng nền tảng | — | a learner who can hold a schedule unprompted. Most cannot at first, and the platform does not pretend otherwise |
| Lớp nhóm | 8–12 | a learner within ~150 points of the rest of the class |
| Nhóm nhỏ | 3–5 | a learner whose weak skills are specific enough to name |
| Kèm 1–1 | 1 | a short deadline, or a profile unusual enough that no group matches |

The one-to-one description says plainly that it **is not automatically better
than a small group — for most learners it is not**. That is true, it is what a
good teacher would say, and it is the opposite of what a price list usually
says about its most expensive tier.

Rates are tested to ascend with attention received: a smaller class costing less
than a larger one is a data-entry error, not a strategy.

## Exclusions carry a reason

The Sprint course is not offered as a large group. The reason is stored with
the exclusion and shown in place of a price: the sprint is two full rehearsals
and a recognition unit, and running it as a large class means nobody's pacing
is watched — which is the only thing it is for.

## Terms

Three, and each is stated where a fee appears:

1. A course is quoted for the sessions in its published syllabus. A unit
   repeated for a failed checkpoint is charged at the same session rate — not
   free, and not a penalty.
2. Placement is by the entry diagnostic, and a learner placed wrongly moves up
   or down at no charge for the change.
3. **No score is guaranteed**, by this centre or by any other being honest.
   What is guaranteed is the syllabus, the session count, and a report that
   will not call a change smaller than the measurement error progress.

A test rejects any term containing a score promise.

## Known limits

- No instalment schedule is modelled: the up-front discount exists, but the
  alternative is only described, not priced.
- No sibling, referral, or scholarship rates.
- Fees do not vary by location, and a centre operating in two cities usually
  needs them to.
- Nothing here connects to an invoice, a payment, or a receipt. This is a
  price list, not billing.
