# Practitioner levels

## What this ladder governs

**What someone is qualified to deliver.** Not what data they can see — that is
governed separately by platform roles and ranks, documented in
[../ROLES.md](../ROLES.md).

The distinction is not bureaucratic. A newly hired teacher may legitimately
hold wide data access on day one and still be nowhere near ready to run a
family intervention. Collapsing the two ladders is how organisations end up
with well-meaning people working problems they are not prepared for.

---

## Advisor — *Tư vấn viên*

**Delivers tiers:** 1–2
**Arenas:** study only
**Supervised hours before the next level:** 20

**Mandate.** Get a learner started and keep attendance alive. Explain the
model plainly.

**Escalates.** Anything about method or diagnosis. An advisor holds rhythm,
not strategy.

**Why the boundary is there.** Tier 1 and 2 work is about attendance and
consistency, and it does not require reading a skill map. An advisor who
starts prescribing method is guessing, and a learner who receives a confident
wrong diagnosis loses trust in the whole programme.

---

## Instructor — *Giáo viên*

**Delivers tiers:** 1–3
**Arenas:** study, school
**Supervised hours before the next level:** 60

**Mandate.** Teach content, read the skill map, and aim practice at what the
data names.

**Escalates.** Motivation that has stopped responding to method, and anything
inside the family.

**Why the boundary is there.** Tier 3 is where method is installed, and that
is squarely an instructor's work. Tier 4 is transfer into the home, which
requires working with parents and reading a family dynamic — a different
skill, not a harder version of the same one.

---

## Coach — *Huấn luyện viên*

**Delivers tiers:** 1–4
**Arenas:** study, school, family
**Supervised hours before the next level:** 150

**Mandate.** Work all four pillars, including Inspirits. Run transfer into
family and school.

**Escalates.** Signs of distress beyond a study problem, to a qualified
professional, immediately.

**Why the boundary is there.** Working Inspirits means working on meaning,
belief, and nerve. That is close enough to territory a coach is not qualified
for that the escalation rule has to be explicit and unconditional. A student
who has stopped caring about a test is a coaching matter. A student who has
stopped caring about most things is not.

---

## Master coach — *Huấn luyện viên trưởng*

**Delivers tiers:** 1–5
**Arenas:** study, school, family, society
**Supervised hours:** 400

**Mandate.** Certify practitioners, own programme quality, and adapt the model
to new contexts.

**Escalates.** Nothing within the model. This is where escalation ends.

---

## How the platform enforces it

The coach playbook reads the learner's tier against the practitioner's level.
Working a learner above your certified tier produces an explicit warning —
"above your level" — with instruction to hand the work on rather than proceed.

`canDeliverTier` and `canWorkArena` are tested directly, including the
property that only a master coach may deliver tier 5.

On a local install the level is self-declared, and the interface says so. An
organisational deployment must have it issued by a head of programme, the same
way platform ranks must be issued server-side.

## Progressing

Supervised hours are a floor, not a qualification. Progression also requires:

1. **Observed delivery.** A practitioner at the level above watches real
   sessions, not a demonstration.
2. **Case review.** Present three learners: one who progressed, one who
   stalled, and one you escalated. The third matters most.
3. **Knowing the boundary.** State what you escalate and why, without
   prompting. A practitioner who cannot name their own limits has not reached
   the next level regardless of hours.
