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
  assert.match(guide, /Last verified October 6, 2026\./);
  assert.match(guide, /sort\(alphabeticalByLastName\)/);
  assert.match(data, /How will you support community recreation in Anmore, including Spirit Park development/);
  assert.doesNotMatch(guide, /priority-question|Featured question for every council candidate/);
  assert.doesNotMatch(data, /If a new Anmore South proposal is submitted/);
  const residencyPosition = data.indexOf("How long have you been a resident of Anmore?");
  const prioritiesPosition = data.indexOf("What are your three measurable priorities");
  const growthPosition = data.indexOf("What is your position on housing growth");
  const recreationPosition = data.indexOf("How will you support community recreation");
  assert.ok(residencyPosition < prioritiesPosition && prioritiesPosition < growthPosition && growthPosition < recreationPosition);
  const questionBlock = data.match(/export const questions = \[([\s\S]*?)\];/);
  assert.ok(questionBlock);
  assert.equal((questionBlock[1].match(/^  "/gm) || []).length, 9);
  assert.doesNotMatch(questionBlock[1], /drinking-water resilience|wildfire prevention|protect forests|Metro Vancouver/);
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

test("provides a neutral reply-ready candidate email campaign", async () => {
  const [html, plain, campaign] = await Promise.all([
    readFile(new URL("communications/candidate-invitation.html", root), "utf8"),
    readFile(new URL("communications/candidate-invitation.txt", root), "utf8"),
    readFile(new URL("communications/candidate-invitation.json", root), "utf8"),
  ]);
  const metadata = JSON.parse(campaign);
  assert.equal(metadata.from, "election@anmore.me");
  assert.equal(metadata.replyTo, "election@anmore.me");
  assert.equal(metadata.delivery.mode, "individual");
  assert.equal(metadata.delivery.excludeSchoolTrustee, true);
  assert.equal(metadata.delivery.requireOfficialRegistrationEmail, true);
  assert.equal(metadata.delivery.sendAutomatically, false);
  assert.equal(metadata.response.preferredDeadline, "2026-09-25T17:00:00-07:00");
  assert.equal(metadata.response.deadlineIsFlexible, true);
  assert.equal(metadata.response.answerCharacterLimit, 1000);
  assert.match(html, /Hello \{\{candidate_name\}\}/);
  assert.match(html, /Reply directly to this email/);
  assert.match(html + plain, /Why this project exists/i);
  assert.match(html + plain, /algorithms prioritize engagement/);
  assert.match(html + plain, /The goal is not to influence anyone's vote/);
  assert.match(html, /We do not endorse, rank, score, or recommend candidates/);
  assert.match(html, /mailto:election@anmore\.me/);
  assert.match(html + plain, /September 25, 2026 at 5:00 p\.m\. Pacific Time/);
  assert.match(html + plain, /This is not a cutoff/);
  assert.match(html + plain, /1,000 characters per answer/);
  assert.match(html, /final profile proof and you approve it/);
  const emailQuestionBlock = html.match(/<ol[^>]*>([\s\S]*?)<\/ol>/);
  assert.ok(emailQuestionBlock);
  assert.equal((emailQuestionBlock[1].match(/<li /g) || []).length, 9);
  assert.match(html + plain, /Residents may also submit additional community questions/);
  assert.doesNotMatch(html + plain, /drinking-water resilience|wildfire prevention|protect forests|Metro Vancouver/);
  assert.doesNotMatch(html, /<form|tracking|pixel|<img/i);
  assert.match(plain, /COMMON CANDIDATE QUESTIONS/);
  assert.match(plain, /Nothing is published automatically/);
  assert.doesNotMatch(html + plain, /school trustee questionnaire/i);
});

test("provides Kerri a biography-only invitation", async () => {
  const [html, plain, campaign] = await Promise.all([
    readFile(new URL("communications/trustee-biography-invitation.html", root), "utf8"),
    readFile(new URL("communications/trustee-biography-invitation.txt", root), "utf8"),
    readFile(new URL("communications/trustee-biography-invitation.json", root), "utf8"),
  ]);
  const metadata = JSON.parse(campaign);
  assert.equal(metadata.recipientName, "Kerri Palmer Isaak");
  assert.equal(metadata.replyTo, "election@anmore.me");
  assert.equal(metadata.delivery.requireOfficialRegistrationEmail, true);
  assert.equal(metadata.delivery.questionnaireIncluded, false);
  assert.equal(metadata.delivery.sendAutomatically, false);
  assert.match(html + plain, /No questionnaire is requested/);
  assert.match(html + plain, /any information you would like (?:Anmore residents to know|to share with Anmore residents)/);
  assert.match(html, /mailto:election@anmore\.me/);
  assert.match(html + plain, /final profile proof for approval/);
  assert.doesNotMatch(html, /<form|tracking|pixel|<img/i);
});

test("provides an equal question-by-question comparison", async () => {
  const [comparison, guide, data] = await Promise.all([
    readFile(new URL("app/candidate-comparison.tsx", root), "utf8"),
    readFile(new URL("app/voter-guide.tsx", root), "utf8"),
    readFile(new URL("app/data.ts", root), "utf8"),
  ]);
  assert.match(guide, /<CandidateComparison/);
  assert.match(comparison, /Compare every candidate on the same question/);
  assert.match(comparison, /No response provided/);
  assert.match(comparison, /alphabetically by last name/);
  assert.match(comparison, /does not rank, endorse, summarize, or score/);
  assert.match(comparison, /aria-live="polite"/);
  assert.match(comparison, /\["All", "Mayor", "Councillor"\]/);
  assert.match(data, /answers\?: Partial<Record<number, string>>/);
  assert.match(data, /name: "Paul Weverink"[\s\S]*?answers:\s*\{/);
});

test("publishes election compliance, privacy, consent, and correction safeguards", async () => {
  const [legal, candidateForm, register, policy, vite, legalHtml] = await Promise.all([
    readFile(new URL("app/legal/legal-page.tsx", root), "utf8"),
    readFile(new URL("app/candidate-response/response-form.tsx", root), "utf8"),
    readFile(new URL("COMPLIANCE_REGISTER.md", root), "utf8"),
    readFile(new URL("EDITORIAL_POLICY.md", root), "utf8"),
    readFile(new URL("hostinger/vite.config.ts", root), "utf8"),
    readFile(new URL("hostinger/legal/index.html", root), "utf8"),
  ]);
  assert.match(legal, /campaign period runs September 19 through October 17, 2026/);
  assert.match(legal, /Permanent no-paid-promotion rule/);
  assert.match(legal, /No paid advertisements, sponsored posts, boosted content, robocalls, paid canvassing, or preferential placement—ever/);
  assert.match(legal, /candidate agrees to the final version/);
  assert.match(legal, /not legal advice or a ruling from Elections BC/);
  assert.match(legal, /Candidate consent & limited release/);
  assert.match(legal, /I confirm that I am the candidate identified in this email/);
  assert.match(legal, /Privacy Officer/);
  assert.match(legal, /retained for at least one year/);
  assert.match(legal, /Personal Information Protection Act/);
  assert.match(candidateForm, /I have read and agree to the Candidate Consent and Publication Authorization/);
  assert.match(register, /No paid placement/);
  assert.match(register, /now or in the future/);
  assert.match(register, /must be rejected/);
  assert.match(register, /does not claim Elections BC third-party sponsor registration/);
  assert.match(policy, /same selected question for every candidate/);
  assert.match(vite, /legal: resolve\(__dirname, "legal\/index.html"\)/);
  assert.match(legalHtml, /Policies and compliance/);
});

test("email invitations require written publication authorization", async () => {
  const files = await Promise.all([
    "communications/candidate-invitation.html",
    "communications/candidate-invitation.txt",
    "communications/trustee-biography-invitation.html",
    "communications/trustee-biography-invitation.txt",
  ].map((file) => readFile(new URL(file, root), "utf8")));
  for (const file of files) {
    assert.match(file, /Candidate Consent and Publication Authorization/);
    assert.match(file, /I have read and agree/);
    assert.match(file, /https:\/\/anmore\.me\/legal\/#candidate-consent/);
  }
});

test("publishes Paul Weverink's exact full profile at /Paul and in comparisons", async () => {
  const [data, paulPage, paulProfile, voterGuide, css, vite, paulHtml, sitemap] = await Promise.all([
    readFile(new URL("app/data.ts", root), "utf8"),
    readFile(new URL("app/Paul/page.tsx", root), "utf8"),
    readFile(new URL("app/Paul/paul-profile.tsx", root), "utf8"),
    readFile(new URL("app/voter-guide.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("hostinger/vite.config.ts", root), "utf8"),
    readFile(new URL("hostinger/Paul/index.html", root), "utf8"),
    readFile(new URL("public/sitemap.xml", root), "utf8"),
  ]);

  const exactContent = [
    "I grew up in Port Moody and Port Coquitlam after arriving from the Netherlands with my family in 1966. I moved into a 100-plus-year-old house located in the Birchwynde subdivision in Anmore in 1998 with my wife Sandy and son Ian. My son Morgan was born soon after moving here. My sons both moved away from Anmore as young adults and my wife currently lives in a long-term care facility in Port Coquitlam. I love Anmore and all it has to offer. I am an avid mountain biker. I regularly ride and walk in our local trails and swim in the local lakes.",
    "I am a semi-retired Engineering Manager, working for the same company for the last 38 years. I have served on Council for the last 12 years. My work on Council includes serving as the Environment Committee Chair for 2 terms as well as three terms as an SVFD Trustee. I was the Alternate Director for the Metro Vancouver Board of Directors for two terms and I sat on the Metro Van Zero Waste Committee for one term. I was the Group Commissioner and a leader with the 1st Anmore Scouts for many years.",
    "I have been a resident of Anmore for 28 years.",
    "Improve opportunities for residents to engage with Council, particularly at Council meetings. I have already started this process by putting a motion on the table to change our procedure bylaw to allow more public input at Council meetings. It was passed by Council.",
    "Continue the conversation around fire safety in the village.",
    "Continue to support our Sasamat Volunteer Fire Department.",
    "I am committed to a very public OCP process regarding how the Village will grow. I will look at pros and cons of the different kinds of growth scenarios proposed and ensure that residents understand my position on what I support with regards to the OCP and why.",
    "I have been an advocate on Council for all of those projects.",
    "By constantly reviewing our Asset Management Plan to ensure that money is put away for future infrastructure replacement. By continuing to ensure that development pays for itself over time or create a surplus. In the past, we have leveraged developments to pay for much needed infrastructure upgrades as part of the new developments proposed. We need to ensure that any increased density beyond current allowable zoning, benefits the village as well as the developer.",
    "Council worked with B.C. Hydro to manage traffic to Buntzen Lake. The reservation system has greatly reduced summer traffic in and out of the village. Without this excessive summer traffic, the village roads are under capacity with regards to regular, everyday traffic. Road safety efforts continue to be a Council and staff priority, and law enforcement may need to increase. Transit, considering our small population is fairly good and has improved over the years.",
    "As stated above, I continue to support the opportunities for residents to engage with Council, particularly at Council meetings. I have already started this process by putting a motion on the table to change our procedure bylaw to allow more public input at Council meetings. It was passed by Council. There are rules around public consultation that are respected by the village and will continue as such.",
    "12 years on Council speaks to my experience. As for outside expertise, Council works with staff and contracted consultants to provide Council with the information needed to make good decisions.",
    "I don’t currently have any conflicts.",
  ];
  for (const text of exactContent) assert.ok(data.includes(text), `Missing exact candidate text: ${text.slice(0, 45)}`);

  assert.match(data, /portrait:\s*"\/candidates\/paul-weverink\.jpg"/);
  assert.match(data, /profilePath:\s*"\/Paul\/"/);
  assert.match(paulPage, /PaulProfile/);
  assert.match(paulProfile, /Candidate supplied/);
  assert.match(paulProfile, /Occupation, professional background, and community service/);
  assert.match(paulProfile, /questions\.map/);
  assert.match(css, /\.profile-intro \.eyebrow, \.profile-background \.eyebrow, \.profile-label \{ color: var\(--forest\); \}/);
  assert.match(css, /\.profile-section-heading \.eyebrow \{ color: #9cc0a8; \}/);
  assert.match(voterGuide, /candidate\.profilePath/);
  assert.match(vite, /paul: resolve\(__dirname, "Paul\/index.html"\)/);
  assert.match(paulHtml, /canonical" href="https:\/\/anmore\.me\/Paul\/"/);
  assert.match(sitemap, /https:\/\/anmore\.me\/Paul\//);
});

test("stages eight current public-source council profiles and omits the empty profile", async () => {
  const profiles = [
    ["Carl Schmidt", "Carl"],
    ["Georgia Lyons", "Georgia"],
    ["Harriette Chang", "Harriette"],
    ["Kim Trowbridge", "Kim"],
    ["Neil Lyons", "Neil"],
    ["Rod Rempel", "Rod"],
    ["Wade Parrish", "Wade"],
    ["Will Crocker", "Will"],
  ];
  const unavailableProfiles = [
    ["Nylah Froese", "Nylah"],
  ];
  const [data, profile, guide, vite, sitemap] = await Promise.all([
    readFile(new URL("app/data.ts", root), "utf8"),
    readFile(new URL("app/public-candidate-profile.tsx", root), "utf8"),
    readFile(new URL("app/voter-guide.tsx", root), "utf8"),
    readFile(new URL("hostinger/vite.config.ts", root), "utf8"),
    readFile(new URL("public/sitemap.xml", root), "utf8"),
  ]);

  assert.match(profile, /Taken from the candidate’s public profile/);
  assert.match(profile, /facebook\.com\/plugins\/post\.php/);
  assert.match(profile, /View the original public Facebook post/);
  assert.doesNotMatch(profile, /Google Drive|word-for-word|No questionnaire response provided/);
  assert.match(guide, /View public profile information/);
  assert.match(guide, /Information taken from the candidate’s public profile\./);
  assert.match(guide, /We have not received any information\./);
  assert.match(data, /pfbid07Eg5Z1HVaNUuZAKerHHaacUemA7BBL3sQvpNed54T572ytzj9JNG1fSzipkiTfGdl/);
  assert.match(data, /pfbid02ow99TUsDmRSgUtzjkCsHBnZGoMHSVr9GWi4YKZMv44dt2UfgXECvocwdN23GQKm4l/);
  assert.match(data, /pfbid0jpC1MGQVvXVHvCfZTD3dXaccdiBKVy6q39P6oW2FfAtHdES1m4aYMyF3n1xk5Yfql/);
  assert.match(data, /pfbid02H9SsDfCHzWM13EazwyqCCqYVhvLSNXNwmAZMGuAveG46VmUxGmkJ6UqPJQL4nuEfl/);
  assert.match(data, /pfbid02GQXkh8Lmhb6FFafLx8QpNfTJooEB1Lq5wXt4rZETgHfNj3ktNub1BBLqdyG5KZGXl/);
  assert.match(data, /pfbid02zmRy5nFf52JmdJrXPHdBQoKzmwbZ8ymfb5t1TCPPDziMXgdGZy3Vm4xdxvfFzeoDl/);
  assert.match(data, /pfbid02sRWci99WbGWQx4x3YaSidgrL1oACEaG6huLN2kjDDUqLvLQUbW6kMWBxJ7GQQk4Pl/);
  assert.match(data, /pfbid02m2CPB53n8jexLRM3WQ29dv8gqJtnaY3LbARsTsPDWbjQLY6cjTX7x5k6omgAA9DHl/);
  assert.match(data, /profile\.php\?id=61594542686151/);
  assert.match(data, /permalink\/2238876813348416/);
  assert.match(data, /profile\.php\?id=61594378655209/);
  assert.doesNotMatch(data, /permalink\/2244870039415760|permalink\/2241389779763786/);
  assert.match(profile, /Additional public links/);
  assert.match(profile, /publicProfile\.additionalLinks/);

  for (const [name, route] of profiles) {
    const candidateBlock = data.slice(data.indexOf(`name: "${name}"`), data.indexOf("},", data.indexOf(`name: "${name}"`)) + 2);
    assert.match(candidateBlock, new RegExp(`profilePath:\\s*"/${route}/"`));
    assert.match(candidateBlock, /publicProfile:/);
    assert.doesNotMatch(candidateBlock, /answers:/);

    const [page, hostingerHtml] = await Promise.all([
      readFile(new URL(`app/${route}/page.tsx`, root), "utf8"),
      readFile(new URL(`hostinger/${route}/index.html`, root), "utf8"),
    ]);
    assert.match(page, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false/);
    assert.match(page, new RegExp(`https://anmore\\.me/${route}/`));
    assert.match(hostingerHtml, /name="robots" content="noindex, nofollow"/);
    assert.match(hostingerHtml, new RegExp(`canonical" href="https://anmore\\.me/${route}/"`));
    assert.match(vite, new RegExp(`${route.toLowerCase()}: resolve\\(__dirname, "${route}\\/index\\.html"\\)`));
    assert.doesNotMatch(sitemap, new RegExp(`https://anmore\\.me/${route}/`));
  }

  for (const [name, route] of unavailableProfiles) {
    const candidateBlock = data.slice(data.indexOf(`name: "${name}"`), data.indexOf("},", data.indexOf(`name: "${name}"`)) + 2);
    assert.match(candidateBlock, /publicInformationUnavailable:\s*true/);
    assert.doesNotMatch(candidateBlock, /profilePath:|publicProfile:/);
    assert.doesNotMatch(vite, new RegExp(`${route.toLowerCase()}: resolve`));
    assert.doesNotMatch(sitemap, new RegExp(`https://anmore\\.me/${route}/`));
    await assert.rejects(access(new URL(`app/${route}/page.tsx`, root)));
    await assert.rejects(access(new URL(`hostinger/${route}/index.html`, root)));
  }
});

test("presents the October 6 all-candidates meeting recording", async () => {
  const [guide, css, htaccess] = await Promise.all([
    readFile(new URL("app/voter-guide.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("hostinger/public/.htaccess", root), "utf8"),
  ]);

  assert.match(guide, /All Candidates Meeting/);
  assert.match(guide, /Recorded October 6, 2026/);
  assert.match(guide, /Watch the Anmore Village All Candidates Meeting recording/);
  assert.match(guide, /https:\/\/www\.youtube\.com\/embed\/ZF5eDgnSUy8/);
  assert.match(guide, /title="Anmore Village All Candidates Meeting 2026 recording"/);
  assert.match(guide, /https:\/\/www\.youtube\.com\/watch\?v=ZF5eDgnSUy8/);
  assert.match(guide, /Watch on YouTube ↗/);
  assert.match(guide, /Read questions and answers/);
  assert.match(guide, /\/all-candidates-meeting\//);
  assert.doesNotMatch(guide, /livestream player will be added|Doors open|Everyone is welcome/);
  assert.match(css, /\.event-video/);
  assert.match(css, /aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(htaccess, /frame-src https:\/\/www\.facebook\.com https:\/\/www\.youtube\.com/);
});

test("publishes the complete meeting transcript with statements and all 13 questions", async () => {
  const [rawData, page, route, guide, css, vite, hostingerHtml, sitemap, sources] = await Promise.all([
    readFile(new URL("app/all-candidates-meeting-data.json", root), "utf8"),
    readFile(new URL("app/all-candidates-meeting/transcript-page.tsx", root), "utf8"),
    readFile(new URL("app/all-candidates-meeting/page.tsx", root), "utf8"),
    readFile(new URL("app/voter-guide.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("hostinger/vite.config.ts", root), "utf8"),
    readFile(new URL("hostinger/all-candidates-meeting/index.html", root), "utf8"),
    readFile(new URL("public/sitemap.xml", root), "utf8"),
    readFile(new URL("SOURCES.md", root), "utf8"),
  ]);
  const data = JSON.parse(rawData);
  assert.deepEqual(data.openingStatements.map((statement) => statement.speaker), [
    "Kim Trowbridge", "Wade Parrish", "Paul Weverink", "Will Crocker", "Carl Schmidt", "Rod Rempel",
    "Harriette Chang", "Neil Lyons", "Georgia Lyons", "Doug Richardson", "Kerri Palmer Isaak",
  ]);
  assert.deepEqual(data.closingRemarks.map((statement) => statement.speaker), [
    "Harriette Chang", "Neil Lyons", "Georgia Lyons", "Wade Parrish",
    "Paul Weverink", "Will Crocker", "Carl Schmidt", "Rod Rempel",
  ]);
  assert.ok([...data.openingStatements, ...data.closingRemarks].every((statement) => statement.text && statement.range.start && statement.range.end));
  const statementMarkers = [...data.openingStatements, ...data.closingRemarks].reduce((count, statement) => count + statement.text.split("[unclear]").length - 1, 0);
  const statementNotes = [...data.openingStatements, ...data.closingRemarks].reduce((count, statement) => count + statement.uncertainties.length, 0);
  assert.equal(statementMarkers, 5);
  assert.equal(statementMarkers, statementNotes);
  assert.match(data.openingStatements[0].delivery, /written statement read aloud by moderator/);
  for (const statements of [data.openingStatements, data.closingRemarks]) {
    const starts = statements.map((statement) => statement.range.start);
    assert.deepEqual(starts, [...starts].sort());
    assert.ok(statements.every((statement) => statement.range.start < statement.range.end));
  }
  assert.match(page, /recordingUrl\(statement\.range\.start\)/);
  assert.deepEqual(data.questions.map((question) => question.id), Array.from({ length: 13 }, (_, index) => `Q${String(index + 1).padStart(2, "0")}`));
  assert.equal(new Set(data.questions.map((question) => question.id)).size, 13);
  for (const question of data.questions) {
    assert.ok(question.topic);
    assert.ok(question.questionTurns.length);
    assert.ok(question.questionTurns.every((turn) => turn.text && turn.speaker));
    assert.ok(question.responses.length);
    assert.ok(question.responses.every((response) => response.speaker && Array.isArray(response.turns)));
  }
  assert.equal(data.questions.find((question) => question.id === "Q01").responses.length, 9);
  assert.equal(data.questions.find((question) => question.id === "Q04").responses.filter((response) => response.speaker === "Paul Weverink").length, 3);
  assert.deepEqual(data.questions.find((question) => question.id === "Q05").didNotAnswer, ["Georgia Lyons"]);
  assert.equal(data.questions.find((question) => question.id === "Q07").responses.filter((response) => response.speaker === "Wade Parrish").length, 2);
  assert.ok(data.questions.find((question) => question.id === "Q08").responses.some((response) => response.turns.length > 1));
  assert.doesNotMatch(rawData, /120 Lansing Crescent|1724 East Road/);
  assert.match(rawData, /\[street number omitted\] Lansing Crescent/);
  assert.match(rawData, /\[street number omitted\] East Road/);
  const q02 = data.questions.find((question) => question.id === "Q02");
  const q02TimelineStarts = [
    ...q02.responses.map((response) => response.range?.start).filter(Boolean),
    ...q02.relatedTurns.map((turn) => turn.range?.start).filter(Boolean),
  ].sort();
  assert.equal(q02TimelineStarts.at(-1), "00:41:50.000");
  const q06 = data.questions.find((question) => question.id === "Q06");
  const q06Harriette = q06.responses.filter((response) => response.speaker === "Harriette Chang");
  assert.equal(q06Harriette.length, 2);
  assert.equal(q06Harriette[0].range.end, "01:01:00.000");
  assert.ok(q06.relatedTurns.every((turn) => turn.range.start === "01:01:00.000" && turn.range.end === "01:01:25.000"));
  assert.equal(q06Harriette[1].range.start, "01:01:25.000");
  assert.match(page, /\.sort\(\(left, right\) => left\.start\.localeCompare\(right\.start\)\)/);
  assert.match(page, /showTurnSpeakers = response\.turns\.length > 1/);
  assert.doesNotMatch(css, /:only-child/);
  assert.match(page, /Verbatim, source-linked/);
  assert.match(page, /Opening statements/);
  assert.match(page, /Closing remarks/);
  assert.match(page, /openingStatements\.map/);
  assert.match(page, /closingRemarks\.map/);
  assert.match(page, /#opening-statements/);
  assert.match(page, /#closing-remarks/);
  assert.match(page, /does not summarize, score, endorse, or correct/);
  assert.doesNotMatch(page, /Candidate supplied · Identity verified/);
  assert.match(guide, /Read questions and answers/);
  assert.match(route, /canonical: "https:\/\/anmore\.me\/all-candidates-meeting\/"/);
  assert.match(css, /\.meeting-question/);
  assert.match(vite, /meeting: resolve\(__dirname, "all-candidates-meeting\/index\.html"\)/);
  assert.match(hostingerHtml, /canonical" href="https:\/\/anmore\.me\/all-candidates-meeting\/"/);
  assert.match(sitemap, /https:\/\/anmore\.me\/all-candidates-meeting\//);
  assert.match(sources, /machine-assisted transcription reviewed against the recording/);
});

test("ships accessible navigation, discovery metadata, and hardened hosting headers", async () => {
  const [guide, candidate, legal, css, homeHtml, candidateHtml, legalHtml, htaccess, robots, sitemap, packageJson] = await Promise.all([
    readFile(new URL("app/voter-guide.tsx", root), "utf8"),
    readFile(new URL("app/candidate-response/response-form.tsx", root), "utf8"),
    readFile(new URL("app/legal/legal-page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("hostinger/index.html", root), "utf8"),
    readFile(new URL("hostinger/candidate-response/index.html", root), "utf8"),
    readFile(new URL("hostinger/legal/index.html", root), "utf8"),
    readFile(new URL("hostinger/public/.htaccess", root), "utf8"),
    readFile(new URL("public/robots.txt", root), "utf8"),
    readFile(new URL("public/sitemap.xml", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);
  for (const page of [guide, candidate, legal]) {
    assert.match(page, /className="skip-link"/);
    assert.match(page, /id="main-content"/);
  }
  assert.match(css, /\.skip-link:focus/);
  assert.doesNotMatch(css, /nav\s*\{\s*display:\s*none/);
  assert.match(css, /nav \{ width: 100%; gap: 20px; overflow-x: auto/);
  for (const html of [homeHtml, candidateHtml, legalHtml]) {
    assert.match(html, /rel="canonical"/);
    assert.match(html, /name="theme-color"/);
    assert.match(html, /property="og:image"/);
  }
  assert.match(htaccess, /Content-Security-Policy/);
  assert.match(htaccess, /frame-src https:\/\/www\.facebook\.com https:\/\/www\.youtube\.com/);
  assert.match(htaccess, /frame-ancestors 'none'/);
  assert.match(htaccess, /Strict-Transport-Security/);
  assert.match(htaccess, /Cross-Origin-Opener-Policy/);
  assert.match(htaccess, /Cache-Control "no-cache"/);
  assert.match(robots, /Sitemap: https:\/\/anmore\.me\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/anmore\.me\/candidate-response\//);
  assert.match(sitemap, /https:\/\/anmore\.me\/legal\//);
  assert.match(sitemap, /<loc>https:\/\/anmore\.me\/<\/loc>\s*<lastmod>2026-10-06<\/lastmod>/);
  assert.match(JSON.parse(packageJson).scripts["build:hostinger"], /chmod -R a\+rX hostinger-dist/);
});
