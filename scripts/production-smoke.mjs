import assert from "node:assert/strict";

const origin = process.env.ANMORE_ORIGIN || "https://anmore.me";

async function request(path) {
  return fetch(new URL(path, origin), {
    redirect: "follow",
    headers: { "user-agent": "AnmoreVotesProductionSmoke/1.0" },
  });
}

async function expectPage(path) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path} returned ${response.status}`);
  return { response, body: await response.text() };
}

function scriptPath(html, prefix) {
  const match = html.match(new RegExp(`src="([^"]*\\/assets\\/${prefix}-[^"]+\\.js)"`));
  assert.ok(match, `Could not find ${prefix} asset`);
  return match[1];
}

const home = await expectPage("/");
const candidate = await expectPage("/candidate-response/");
const legal = await expectPage("/legal/");
const robots = await expectPage("/robots.txt");
const sitemap = await expectPage("/sitemap.xml");

for (const [name, value] of [
  ["content-security-policy", "frame-ancestors 'none'"],
  ["strict-transport-security", "max-age=31536000"],
  ["x-frame-options", "DENY"],
  ["cross-origin-opener-policy", "same-origin"],
]) {
  assert.match(home.response.headers.get(name) || "", new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `Missing ${name}`);
}

assert.match(home.body, /rel="canonical" href="https:\/\/anmore\.me\/"/);
assert.match(home.body, /property="og:image" content="https:\/\/anmore\.me\/og\.png"/);
assert.match(robots.body, /Sitemap: https:\/\/anmore\.me\/sitemap\.xml/);
assert.match(sitemap.body, /https:\/\/anmore\.me\/legal\//);

const [homeJs, candidateJs, legalJs] = await Promise.all([
  expectPage(scriptPath(home.body, "home")),
  expectPage(scriptPath(candidate.body, "candidate")),
  expectPage(scriptPath(legal.body, "legal")),
]);

assert.match(homeJs.body, /Compare every candidate on the same question/);
assert.match(homeJs.body, /No response provided/);
assert.match(homeJs.body, /does not rank, endorse, summarize, or score/);
assert.match(candidateJs.body, /I have read and agree to the Candidate Consent and Publication Authorization/);
assert.match(legalJs.body, /Permanent no-paid-promotion rule/);
assert.match(legalJs.body, /never purchase or accept paid placement/);
assert.match(legalJs.body, /candidate agrees to the final version/);

for (const path of ["/api/questions/", "/api/candidate-submissions/"]) {
  const response = await request(path);
  assert.equal(response.status, 410, `${path} must stay retired`);
  assert.match(await response.text(), /Online submissions are closed/);
}

console.log(`Production smoke passed for ${origin}`);
