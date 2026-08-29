# Roles, ranks, and levels

Three ladders exist in SAT365 and confusing them causes real harm, so they are
kept strictly apart.

| Ladder | Governs | Earned or assigned |
| --- | --- | --- |
| **Role and rank** | What you may do with other people's data | Assigned |
| **Student level** | What study material is unlocked for you | Earned |
| **Practitioner level** | What you are qualified to deliver | Certified |

## Roles

Eight roles in two families. The delivery roles work with learners; the
operating roles run the platform. A person in an operating role is **not**
automatically able to read a learner's record — `student.analytics.view` is
granted where the job needs it and withheld where it does not.

| Role | Vietnamese | For |
| --- | --- | --- |
| `student` | Học sinh | Studies. Sees their own work and nobody else's. |
| `teacher` | Giáo viên | Teaches named classes. Authority widens by rank and stays inside those classes. |
| `coach` | Coach | Works on method and rhythm with named learners. Reads their evidence; administers nothing. |
| `consultant` | Tư vấn | Designs programmes, reports to families. Sees the shape of progress, not every answer. |
| `product-admin` | Admin sản phẩm | Owns the item bank and calibration. No access to learner records. |
| `system-admin` | Admin hệ thống | Runs accounts, classes and settings across the organisation. |
| `executive` | Giám đốc điều hành | Sees the organisation in aggregate. Holds no access to individual records. |
| `super-admin` | Super Admin | Every permission, destructive ones included. Should be very few people. |

### Three decisions worth defending

**An executive sees the organisation, not the people in it.** `metrics.aggregate`
yes; `student.analytics.view` no. A director who needs one learner's record can
be granted a delivery role, which is auditable. What they must not have is
standing access to every learner's record by virtue of seniority. Seniority is
not a reason to read a child's data.

**A consultant sees progress, not transcripts.** They hold
`student.analytics.view` and not `student.responses.view`: designing a
programme needs the shape of a learner's progress, not a record of every answer
they have ever given.

**Publishing item parameters left the teaching ladder.** `bank.publish` changes
the basis on which every score in the system is computed. That is a
psychometric act, not a teaching one, so it belongs to the product
administrator. A head of programme may author items; publishing them is
somebody else's signature. Held by *each teacher rank grants exactly what it
should* in `tests/engine.test.ts`.

### The escalation ceiling

`role.assign` without a ceiling is equivalent to super-admin, because the first
thing anyone holding it would do is manufacture a peer. So `canAssignRole`
refuses three things:

- assigning a role **at or above** the assigner's own position;
- changing a target who **already holds** a role at or above the assigner's —
  demoting a peer removes the check they represent, which is as much an
  escalation as promoting one;
- changing **your own** role, whatever you hold.

`assignableRoles` derives the picker from the same predicate the handler
re-checks, so the interface cannot offer an option the policy will refuse. The
handler re-checks anyway and writes `permission.denied` if it fires: a select
element is a suggestion, and the policy decides.

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
