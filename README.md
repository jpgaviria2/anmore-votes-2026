# Anmore Votes 2026

An independent, community-run voter guide for the October 17, 2026 Village of Anmore local election.

The site gives every verified candidate the same opportunity to provide a biography, public links, portrait, and answers to a common questionnaire. Candidate participation is voluntary. Information is sent directly to `election@anmore.me`, verified against official nomination records, and never published automatically.

## Principles

- Neutrality: no endorsements, rankings, paid placement, or candidate preference—ever.
- Equality: the same invitation, questions, word limits, and deadlines for every candidate.
- Attribution: official records and candidate-supplied statements are clearly distinguished.
- Consent: candidate-supplied biographies, images, and answers publish only after verification and approval.
- Transparency: sources, corrections, and material updates remain visible.

See [EDITORIAL_POLICY.md](EDITORIAL_POLICY.md) and [SOURCES.md](SOURCES.md).

## Public routes

- `/` — ballot, candidates, and question-by-question comparison
- `/candidate-response/` — verified email participation instructions
- `/legal/` — election compliance, candidate consent, privacy, corrections, and terms

Unanswered questions are displayed neutrally. No candidate-supplied information is invented, summarized, ranked, or published before identity verification, written consent, and final proof approval. Paid promotion is permanently prohibited.

## Local development

```bash
npm install
npm run dev
```

The public site does not collect candidate or community submissions. Questions and candidate information are sent directly to `election@anmore.me`.

## Hostinger deployment

The repository also includes a Hostinger-native build for the production
`anmore.me` shared-hosting account:

```bash
npm run build:hostinger
```

This produces the static frontend and compatibility endpoints in
`hostinger-dist/`. The old form endpoints return HTTP 410 and direct visitors
to `election@anmore.me`. Historical private submission data remains outside
`public_html` and is not modified by a normal site deployment. Publication
remains a separate, manual action after identity verification against the
official nomination registration and candidate approval.

## Validation

```bash
npm run lint
npm test
```

## Election sources

- Village of Anmore: https://anmore.com/village-hall/elections/
- CivicInfo BC: https://localelections.ca/election_candidates/3_2026_candidates.html
- Elections BC: https://elections.bc.ca/local-elections/2026-general-local-elections/

This project is not affiliated with the Village of Anmore, Elections BC, a candidate, or a political organization.
