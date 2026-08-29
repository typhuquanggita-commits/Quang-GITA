# Roles, ranks, and levels

Three ladders exist in SAT365 and confusing them causes real harm, so they are
kept strictly apart.

| Ladder | Governs | Earned or assigned |
| --- | --- | --- |
| **Role and rank** | What you may do with other people's data | Assigned |
| **Student level** | What study material is unlocked for you | Earned |
| **Practitioner level** | What you are qualified to deliver | Certified |

## Roles

`student`, `teacher`, `admin`.

Everyone — teachers included — holds the learner permissions. A teacher who
cannot sit a practice test cannot honestly advise on one.

## Teacher ranks

Four ranks, strictly cumulative: each holds everything the rank below holds,
plus what it adds.

| Rank | Adds |
| --- | --- |
| Teaching assistant | View rosters, view student analytics, grade work, browse the bank |
| Teacher | Create assignments, inspect student responses, assemble forms, export reports |
| Senior teacher | Create and edit classes, author items |
| Head of programme | Archive classes, invite teachers, change ranks, publish items, read the audit log |

The progression encodes one principle: **authority over people is granted
later than authority over material.** An assistant can see how a class is
doing and grade what it hands in. Only a head can promote a colleague.

Two guards apply to rank changes:
- Only `teacher.promote` holders can change a rank at all.
- Nobody can grant a rank above their own — enforced in the console, not only
  in the interface.

## Scoping

Holding a teaching permission is not enough on its own. `canForClass` requires
the class to be one the principal actually teaches, and `canViewLearner`
requires a shared class before one person may read another's record. Only an
administrator is unscoped.

Tested in `tests/engine.test.ts` under *class permissions are scoped to the
classes a teacher teaches* and *reading another learner requires a shared
class*. Two further tests hold the edges: unenrolling a student closes the
teacher's access to their record immediately, because the record view
resolves the target's classes on every render rather than caching them at
mount; and sharing a class is necessary but not sufficient, since a rank
without `student.analytics.view` is refused inside its own classroom.

### The student record

`#/student/:accountId` is where `student.analytics.view` is exercised. Three
properties define it.

**A refusal is shown as a refusal.** A viewer without access sees why, not an
empty page. A blank screen teaches nobody anything and reads as "this student
has done nothing".

**Opening it is logged.** One `student.record.viewed` entry per record opened
— keyed by the target account, so navigating between two students logs both
while an unrelated re-render logs neither. An audit log that inflates with
renders is worse than none, because it looks precise. Reading your own record
writes nothing; that is not surveillance. A denied attempt writes
`permission.denied`.

**It states what it cannot see.** There is no server. A learner's responses
live in their own browser and never reach a teacher's device, so the record
shows the cached class summary — last synced score, the level it earns,
assignment status — and says so in the interface. A blank figure means "not
synced here", not "the student has done nothing". A teacher holding
`student.responses.view` is told plainly that the permission has no data
behind it until there is a server to sync, rather than being left hunting for
a screen that cannot exist.

## Student levels

Five levels, earned from the most recent total score:

| Level | From | Unlocks |
| --- | --- | --- |
| Foundation | 400 | Core drills, guided explanations, untimed practice |
| Developing | 1000 | Timed drills, section tests, pacing analytics |
| Proficient | 1200 | Full-length adaptive tests, error taxonomy, upper-pathway items |
| Advanced | 1400 | Hard-band pool, time-pressure mode, precision review |
| Elite | 1520 | Perfect-score drills, trap-question sets, sub-target pacing |

A level is recomputed from the record on every read, never stored as the
source of truth, so it cannot drift away from what the evidence says.

**A level grants no authority.** `permissionsFor` does not accept a level as
an input. An Elite student holds exactly the permissions a Foundation student
holds. Letting the two ladders touch would mean a strong student could read a
classmate's record, which is why they do not.

Sections are levelled separately, so a learner strong in Math and weak in
Reading is described accurately rather than averaged into one misleading
label.

## Practitioner levels

The GITA ladder, documented in [gita/PRACTITIONERS.md](gita/PRACTITIONERS.md).
It governs what someone is *qualified to deliver*, which is a different
question from what data they can see. A newly hired teacher may hold wide data
access and still not be ready to run a family intervention.

## Audit

Every privileged action is logged with actor, role, target, and timestamp.
See [SECURITY.md](SECURITY.md).

## Enforcement

Client-side. This is the right model to enforce on a server and it is not
enforced by one here. See [SECURITY.md](SECURITY.md) for what must change.
