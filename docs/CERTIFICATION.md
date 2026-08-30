# Internal certification

## What the certificate is for

A learner who has practised for six months has a folder of scores and no way to
say what they can do. The certificate converts that into one sentence they can
stand behind — and its entire value rests on being hard enough to get that the
sentence is true.

## Standards-referenced, never a rank

Bands are defined by **what the holder can do**. Never by percentile, never by
comparison with other candidates.

Two reasons. A cohort that all improves should all move up a band, and a
percentile cannot express that. And a percentile awarded inside one tuition
centre ranks a learner against whoever happened to enrol, which means nothing
outside the building.

A test enforces this: no band descriptor may contain "percentile", "top",
"better than", or "rank".

| Band | From | Certifies, among others |
| --- | --- | --- |
| **Nền tảng** / Foundation | 1000 | recognises every question type and can name what each is asking before attempting it |
| **Thành thạo** / Proficient | 1200 | separates what a text states from what it implies, and can point to the sentence that decides a question |
| **Nâng cao** / Advanced | 1350 | reads two texts against each other for position rather than for shared topic |
| **Xuất sắc** / Distinction | 1480 | can explain why a wrong option is wrong, not only why the right one is right |

## The rule that makes it worth having

> **A band is awarded only when the score's measurement interval lies wholly
> inside it.**

A candidate scoring 1215 with a standard error of 30 has evidence consistent
with 1185. They have not demonstrated a 1200 standard. The award goes to the
lower band, and the certificate says so in the candidate's own language,
together with the figure a further sitting would need to clear.

This costs awards, and the commercial incentive to drop it is obvious. It is
also the only version of this document worth printing. Without it, a candidate
who sits the test enough times will eventually be carried over a boundary by
noise, and the certificate will have certified nothing — which they and the
centre find out later, expensively.

A consequence worth noticing: **a more precise form awards a band that a less
precise one refuses at the same score.** 1210 ± 8 certifies as Proficient;
1210 ± 30 does not. That is correct, and it is the reason the scheme also has a
reliability floor.

## The other three requirements

- **A full-length sitting.** A section paper measures one half of the standard
  and cannot certify the whole of it.
- **A form reliable to 0.80 or better.** A form that cannot resolve an
  individual has no business supporting an individual decision, however high
  the number on it. The refusal message says the fault is the form's, not the
  candidate's — re-sitting the same paper would not fix it.
- **An integrity log without unexplained absence.** More than 120 seconds away
  from the exam window holds the certificate for a human to account for. The
  *result* still stands; only the certificate is held. A blur with no matching
  focus counts until submission, because ignoring it would make walking away
  and never coming back the cheapest way to defeat the check.

## Which sitting counts

The **best** eligible sitting, not the most recent. A candidate who has done
better before has demonstrated the standard, and requiring the latest attempt
would let one bad morning erase evidence already given.

That does not open the door to grinding: five sittings that each nudge just
over a boundary with a ±30 interval all fail the interval rule, and a test
pins that case.

## The verification code

`SAT365-26-K3F9-2A7` — deterministic in the scheme, the sitting, the score and
the issue date. It carries **no personal data**: a code printed on a document
that leaves the building should not encode a name.

It is a checksum, not a signature. There is no server, so it detects a
certificate whose score or date has been altered and does nothing at all
against someone who invents a plausible-looking string. The certificate says
exactly that rather than implying an authority the code does not have.

## Not a College Board score

Printed on every certificate, in full:

> This is an internal SAT365 certificate issued by a tuition provider. It is
> not a College Board score, it is not accepted by any university, and the item
> parameters behind the scale are author estimates rather than calibrations
> against a live testing population.

## Portable to another exam

Nothing in `src/engine/certification.ts` knows what the SAT is. A
`CertificationScheme` names its own scale, bands, descriptors, reliability
floor and disclaimer, so a sibling platform on a different exam — HSA365, for
instance — defines a scheme and reuses the whole apparatus. A test builds a
0–150 scheme with two bands and certifies against it.

## Known limits

- Sittings are unproctored. The integrity log records what a browser can see —
  focus loss, fullscreen exits, blocked copy — and sees nothing at all about
  who is at the keyboard or what else is on the desk. A certificate issued this
  way is evidence of a performance, not of an identity.
- The reliability floor is computed from the delivered form's marginal
  reliability, which is itself derived from author-estimated parameters. It is
  a real constraint, but it inherits the uncertainty of the estimates beneath
  it.
- There is no revocation. A certificate held for integrity stays held, but one
  already issued cannot be withdrawn by the platform.
- Expiry is checked but not enforced anywhere: an expired certificate still
  prints, marked as expired.
