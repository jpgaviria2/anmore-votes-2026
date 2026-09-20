# Anmore Votes 2026

An independent, community-run voter guide for the October 17, 2026 Village of Anmore local election.

The site gives every verified candidate the same opportunity to submit a biography, public links, portrait, and answers to a common questionnaire. Candidate participation is voluntary. Public submissions are moderated and nothing is published automatically.

## Principles

- Neutrality: no endorsements, rankings, paid placement, or candidate preference.
- Equality: the same invitation, questions, word limits, and deadlines for every candidate.
- Attribution: official records and candidate-supplied statements are clearly distinguished.
- Consent: candidate-supplied biographies, images, and answers publish only after verification and approval.
- Transparency: sources, corrections, and material updates remain visible.

See [EDITORIAL_POLICY.md](EDITORIAL_POLICY.md) and [SOURCES.md](SOURCES.md).

## Local development

```bash
npm install
npm run dev
```

The application uses a Cloudflare D1 binding named `DB` for private community-question and candidate-submission moderation queues.

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
