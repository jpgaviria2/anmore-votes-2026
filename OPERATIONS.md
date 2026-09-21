# Operations Runbook

This runbook keeps Anmore Votes 2026 neutral, recoverable, and consistent when candidate or community information changes.

## Non-negotiable release rules

- Never use paid promotion, sponsored distribution, candidate funding, rankings, scores, endorsements, recommendations, or preferential placement.
- Never publish candidate-supplied material before identity verification, written publication consent, and approval of the final proof.
- Never treat candidate-supplied claims as official records.
- Never accept candidate or community information through a public web form.
- Never deploy a change that fails lint, tests, either production build, or the production smoke check.

## Candidate-content workflow

1. Receive the reply at `election@anmore.me` from the email in the official nomination record, or independently verify another official contact route.
2. Confirm acceptance of the Candidate Consent and Publication Authorization.
3. Preserve the original message and attachments privately with least-privilege access.
4. Prepare the biography, links, portrait, and numbered answers without summarizing or changing meaning.
5. Label candidate-supplied material and keep official facts separately sourced.
6. Send the exact final proof to the candidate.
7. Record explicit approval, approval date, and any approved corrections.
8. Publish every candidate under the same formatting and display rules.
9. Run the release checklist below.

## Community-question workflow

1. Review for election relevance, civility, privacy, and legal risk.
2. Remove private information; combine duplicates only without changing substance.
3. Send an accepted question to all candidates for the applicable office at the same time, with the same deadline and limits.
4. Record the distribution date and preserve the exact question.
5. Publish replies only through the candidate-content workflow.

## Release checklist

1. Fetch and reconcile remote changes without overwriting concurrent work.
2. Confirm candidate ordering, common questions, neutrality labels, consent language, and policy links.
3. Run `npm run lint`, `npm test`, and `npm run build:hostinger`.
4. Create a dated rollback archive of the current production site.
5. Deploy only the validated build; never deploy local temporary files or private records.
6. Verify `/`, `/candidate-response/`, `/legal/`, `/robots.txt`, and `/sitemap.xml` return HTTP 200.
7. Verify retired API endpoints return HTTP 410.
8. Run `npm run smoke:production`.
9. Record the release and any correction in the compliance register.

## Incident response

- If neutrality, consent, privacy, or content integrity is uncertain, stop publication and preserve evidence.
- If candidate-supplied content is disputed, unpublish only the disputed content, verify identity, and follow the corrections policy.
- If the site fails, restore the last known-good rollback archive and rerun the smoke check.
- Direct privacy, correction, security, and candidate-approval issues to `election@anmore.me`.
