import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains the complete neutral voter guide", async () => {
  const [guide, data, layout] = await Promise.all([
    readFile(new URL("app/voter-guide.tsx", root), "utf8"),
    readFile(new URL("app/data.ts", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
  ]);
  assert.match(layout, /Anmore Votes 2026 \| A neutral community voter guide/);
  assert.match(guide, /Know your ballot/);
  assert.match(guide, /Not affiliated with the Village of Anmore/);
  assert.match(guide, /No questionnaire response published yet/);
  assert.match(guide, /Sole candidate — no questionnaire requested/);
  assert.match(guide, /alphabetically by last name within each office/);
  assert.match(guide, /sort\(alphabeticalByLastName\)/);
  assert.match(data, /How will you support community recreation in Anmore, including Spirit Park development/);
  assert.doesNotMatch(guide, /priority-question|Featured question for every council candidate/);
  assert.doesNotMatch(data, /If a new Anmore South proposal is submitted/);
  const residencyPosition = data.indexOf("How long have you been a resident of Anmore?");
  const prioritiesPosition = data.indexOf("What are your three measurable priorities");
  const growthPosition = data.indexOf("What is your position on housing growth");
  const recreationPosition = data.indexOf("How will you support community recreation");
  assert.ok(residencyPosition < prioritiesPosition && prioritiesPosition < growthPosition && growthPosition < recreationPosition);
  assert.match(data, /Doug Richardson/);
  assert.match(data, /Kerri Palmer Isaak/);
  assert.doesNotMatch(data, /schoolTrusteeQuestions/);
  assert.doesNotMatch(guide + layout, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("uses email-only candidate and community intake", async () => {
  const [guide, candidateForm, questionRoute, candidateRoute, hostingerQuestionRoute, hostingerCandidateRoute] = await Promise.all([
    readFile(new URL("app/voter-guide.tsx", root), "utf8"),
    readFile(new URL("app/candidate-response/response-form.tsx", root), "utf8"),
    readFile(new URL("app/api/questions/route.ts", root), "utf8"),
    readFile(new URL("app/api/candidate-submissions/route.ts", root), "utf8"),
    readFile(new URL("hostinger/public/api/questions/index.php", root), "utf8"),
    readFile(new URL("hostinger/public/api/candidate-submissions/index.php", root), "utf8"),
  ]);
  assert.match(guide, /mailto:election@anmore\.me/);
  assert.match(candidateForm, /same address published in your official nomination registration/);
  assert.match(candidateForm, /match the sender against the email published in the candidate&apos;s official nomination registration/);
  assert.match(candidateForm, /must approve the final profile proof/);
  assert.doesNotMatch(candidateForm, /School trustee questionnaire|schoolTrusteeQuestions/);
  assert.doesNotMatch(guide + candidateForm, /<form/);
  for (const route of [questionRoute, candidateRoute, hostingerQuestionRoute, hostingerCandidateRoute]) {
    assert.match(route, /410/);
    assert.match(route, /election@anmore\.me/);
  }
  assert.doesNotMatch(questionRoute + candidateRoute, /communityQuestions|candidateSubmissions/);
  assert.doesNotMatch(hostingerQuestionRoute + hostingerCandidateRoute, /store_submission|notify_candidate_submission/);
  await access(new URL("dist/server/index.js", root));
});
