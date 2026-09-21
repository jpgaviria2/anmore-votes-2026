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
  assert.match(guide, /alphabetically by last name within each office/);
  assert.match(guide, /sort\(alphabeticalByLastName\)/);
  assert.match(data, /How will you support community recreation in Anmore, including Spirit Park development/);
  assert.match(guide, /<strong>\{questions\[3\]\}<\/strong>/);
  assert.doesNotMatch(data, /If a new Anmore South proposal is submitted/);
  const residencyPosition = data.indexOf("How long have you been a resident of Anmore?");
  const prioritiesPosition = data.indexOf("What are your three measurable priorities");
  const growthPosition = data.indexOf("What is your position on housing growth");
  const recreationPosition = data.indexOf("How will you support community recreation");
  assert.ok(residencyPosition < prioritiesPosition && prioritiesPosition < growthPosition && growthPosition < recreationPosition);
  assert.match(data, /Doug Richardson/);
  assert.match(data, /Kerri Palmer Isaak/);
  assert.doesNotMatch(guide + layout, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("contains moderated candidate and community submission flows", async () => {
  const [candidateForm, questionRoute, candidateRoute, hostingerCandidateRoute, hostingerBootstrap] = await Promise.all([
    readFile(new URL("app/candidate-response/response-form.tsx", root), "utf8"),
    readFile(new URL("app/api/questions/route.ts", root), "utf8"),
    readFile(new URL("app/api/candidate-submissions/route.ts", root), "utf8"),
    readFile(new URL("hostinger/public/api/candidate-submissions/index.php", root), "utf8"),
    readFile(new URL("hostinger/private/bootstrap.php", root), "utf8"),
  ]);
  assert.match(candidateForm, /Submissions are reviewed before publication/);
  assert.match(candidateForm, /Submit for review/);
  assert.match(questionRoute, /communityQuestions/);
  assert.match(candidateRoute, /candidateSubmissions/);
  assert.match(candidateForm, /Nothing is published until your identity is independently verified/);
  assert.match(hostingerCandidateRoute, /notify_candidate_submission/);
  assert.match(hostingerBootstrap, /Candidate submission pending verification/);
  assert.match(hostingerBootstrap, /Publish manually only after explicit approval/);
  await access(new URL("dist/server/index.js", root));
});
