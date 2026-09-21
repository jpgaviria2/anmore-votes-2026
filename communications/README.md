# Candidate email invitation

This package is prepared for the 1stanmore Nostr agent or another approved mailer. It is a draft until the owner explicitly approves sending.

## Files

- `candidate-invitation.html`: table-based rich HTML with inline styles for broad email-client compatibility.
- `candidate-invitation.txt`: plain-text fallback.
- `candidate-invitation.json`: campaign headers, merge fields, and sending safeguards.
- `trustee-biography-invitation.html`: rich HTML biography-only invitation for Kerri Palmer Isaak.
- `trustee-biography-invitation.txt`: plain-text fallback for the trustee invitation.
- `trustee-biography-invitation.json`: trustee campaign headers and safeguards; no questionnaire is included.

## Sending rules

1. Send one personalized message per candidate; do not expose recipients with CC.
2. Replace `{{candidate_name}}` in both templates.
3. Send only to the email published in the candidate's official nomination registration.
4. Set both `From` and `Reply-To` to `election@anmore.me` so candidates can reply directly.
5. Do not send to the school trustee candidate; no school trustee questionnaire is being requested.
6. If an official registration contains no email, hold the invitation for a separately verified delivery route.
7. Sending requires a separate explicit approval; creating or testing this template is not authorization to contact candidates.
8. Keep the preferred response date at September 25, 2026, 5:00 p.m. Pacific Time, while accepting later submissions for subsequent guide updates.
9. Apply the same 1,000-character limit to each questionnaire answer.
