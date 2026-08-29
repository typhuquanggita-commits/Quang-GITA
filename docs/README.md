# SAT365 documentation

Every document here answers one question and names the person who needs the
answer. If you are looking for something and cannot tell which file it is in,
that is a defect in this index — please fix it rather than working around it.

## Assessment

| Document | Answers | For |
| --- | --- | --- |
| [SPEC.md](SPEC.md) | What does SAT365 claim to replicate, and where does it deliberately differ? | Programme leads, auditors |
| [PSYCHOMETRICS.md](PSYCHOMETRICS.md) | How is a score produced, and what would make it defensible in production? | Psychometricians, technical reviewers |
| [CONTENT.md](CONTENT.md) | How is an item authored, reviewed, and accepted into the bank? | Item writers, content leads |
| [LESSONS.md](LESSONS.md) | How is a skill taught rather than only measured, and when does the coach prescribe a lesson? | Item writers, coaches, engineers |
| [PACKETS.md](PACKETS.md) | What are the seven sheets per topic, and how is a packet assembled honestly from a thin bank? | Teachers, item writers, engineers |
| [AUTOPILOT.md](AUTOPILOT.md) | How does the automated coach decide, and how do I audit a decision it made? | Coaches, engineers |
| [SOLUTIONS.md](SOLUTIONS.md) | After a test, what does a learner see, and how is their personalised route derived? | Learners, coaches, engineers |

## Platform

| Document | Answers | For |
| --- | --- | --- |
| [ARCHITECTURE.md](ARCHITECTURE.md) | How is the system put together, and why this way? | Engineers |
| [ACCESSIBILITY.md](ACCESSIBILITY.md) | What accessibility standard does this meet, and how is it verified? | Engineers, compliance |
| [SECURITY.md](SECURITY.md) | What does test integrity actually guarantee, and what must move server-side? | Engineers, programme leads |
| [ROLES.md](ROLES.md) | Who can do what, and how are levels earned rather than assigned? | Programme leads, administrators |

## The GITA training model

| Document | Answers | For |
| --- | --- | --- |
| [gita/README.md](gita/README.md) | What is GITA and how does it sit inside the platform? | Everyone |
| [gita/PILLARS.md](gita/PILLARS.md) | What are the four pillars and how is each one read? | Coaches, teachers |
| [gita/TIERS.md](gita/TIERS.md) | How much of the model does a person get, and when does the next tier open? | Coaches, advisors |
| [gita/ARENAS.md](gita/ARENAS.md) | How does the method move into family, school, and society? | Coaches, parents, school leads |
| [gita/PRACTITIONERS.md](gita/PRACTITIONERS.md) | What is each practitioner level certified to deliver, and what must they escalate? | Programme leads |
| [gita/SESSION-PLAYBOOK.md](gita/SESSION-PLAYBOOK.md) | How is a coaching session actually run? | Coaches |
| [gita/PARENT-HANDBOOK.md](gita/PARENT-HANDBOOK.md) | What does a parent do, and what should they stop doing? | Families |

## A note on what these documents are not

They describe a working system, not an aspiration. Where something is
prototype-grade — the IRT parameters most of all — the document says so in
plain terms rather than leaving a reader to discover it. Any claim here that
you cannot verify against the code or the tests is a bug in the document.
