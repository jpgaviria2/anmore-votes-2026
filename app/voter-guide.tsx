import { candidates } from "./data";
import { CandidateComparison } from "./candidate-comparison";

const groups = ["Mayor", "Councillor", "School Trustee"] as const;

function alphabeticalByLastName(left: { name: string }, right: { name: string }) {
  const leftLastName = left.name.trim().split(/\s+/).at(-1) || left.name;
  const rightLastName = right.name.trim().split(/\s+/).at(-1) || right.name;
  return leftLastName.localeCompare(rightLastName) || left.name.localeCompare(right.name);
}

function candidateId(name: string) {
  return `candidate-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function VoterGuide() {
  return (
    <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <main id="main-content">
      <div className="election-strip">
        <span>Advance vote: Wed, Oct 7</span>
        <strong>Election day: Sat, Oct 17, 2026</strong>
      </div>

      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="Anmore Votes home">
          <span className="brand-mark">A</span>
          <span>Anmore Votes <b>2026</b></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#candidates">Candidates</a>
          <a href="#questions">Questions</a>
          <a href="#voting">How to vote</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Independent community voter guide</p>
          <h1>Know your ballot.<br /><em>Hear from candidates.</em></h1>
          <p className="hero-lede">
            A simple, neutral place for Anmore voters to compare voluntary candidate biographies and answers to the same community questions.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#candidates">Meet the candidates</a>
            <a className="button secondary" href="mailto:election@anmore.me?subject=Community%20question%20for%20Anmore%20Votes%202026">Ask a question</a>
          </div>
          <p className="fine-print">Not affiliated with the Village of Anmore, any candidate, or any political organization.</p>
        </div>
        <aside className="ballot-card" aria-label="Election at a glance">
          <p className="mono-label">Your 2026 ballot</p>
          <div className="ballot-row"><span>Mayor</span><strong>1</strong></div>
          <div className="ballot-row"><span>Councillors</span><strong>Choose 4</strong></div>
          <div className="ballot-row"><span>School trustee</span><strong>1</strong></div>
          <div className="ballot-rule" />
          <p><b>10</b> candidates are seeking four council seats.</p>
          <p><b>1,835</b> estimated eligible voters.</p>
          <a href="https://anmore.com/village-hall/elections/" target="_blank" rel="noreferrer">View official election information ↗</a>
        </aside>
      </section>

      <section className="principles shell" aria-labelledby="principles-title">
        <div>
          <p className="eyebrow" id="principles-title">How this guide works</p>
          <h2>Equal questions. Voluntary answers. Visible sources.</h2>
        </div>
        <div className="principle-grid">
          <article><span>01</span><h3>Same invitation</h3><p>Every candidate receives the same opportunity, questions, space, and deadlines.</p></article>
          <article><span>02</span><h3>Candidates speak</h3><p>Candidate-supplied words are clearly labelled and published only with consent.</p></article>
          <article><span>03</span><h3>No ranking</h3><p>Profiles appear alphabetically. We do not endorse, score, or recommend candidates.</p></article>
        </div>
      </section>

      <section className="section shell" id="candidates">
        <div className="section-heading">
          <div><p className="eyebrow">Verified ballot</p><h2>Meet the candidates</h2></div>
          <p>Official status is sourced from the Village of Anmore and CivicInfo BC. Candidates are listed alphabetically by last name within each office. Biographies and portraits appear only after candidates voluntarily submit and approve them.</p>
        </div>
        {groups.map((group) => (
          <div className="candidate-group" key={group}>
            <div className="group-title"><h3>{group}</h3><span>{group === "Councillor" ? "4 to be elected" : "1 to be elected"}</span></div>
            <div className="candidate-grid">
              {candidates.filter((candidate) => candidate.office === group).sort(alphabeticalByLastName).map((candidate) => (
                <article className="candidate-card" id={candidateId(candidate.name)} key={candidate.name}>
                  <div className="candidate-top">
                    <div className="portrait-placeholder" aria-hidden="true">{candidate.initials}</div>
                    {candidate.officialNote && <span className="status-badge">{candidate.officialNote}</span>}
                  </div>
                  <p className="office">Candidate for {candidate.office}</p>
                  <h4>{candidate.name}</h4>
                  {candidate.publicService ? (
                    <ul className="public-record">{candidate.publicService.map((item) => <li key={item}>{item}</li>)}</ul>
                  ) : (
                    <p className="awaiting">Awaiting a voluntary candidate biography.</p>
                  )}
                  {candidate.office === "School Trustee" ? (
                    <div className="response-state"><span className="dot" /> Sole candidate — no questionnaire requested</div>
                  ) : (
                    <div className="response-state"><span className="dot" /> No questionnaire response published yet</div>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
        <div className="candidate-invite">
          <div><p className="eyebrow">Are you a candidate?</p><h3>Send your biography and answers by email.</h3><p>Identity is checked against the official email in your nomination registration. Nothing is posted automatically, and you approve the final profile before publication.</p></div>
          <a className="button light" href="/candidate-response/">View candidate instructions</a>
        </div>
      </section>

      <section className="issues" id="questions">
        <div className="shell">
          <div className="section-heading light-heading">
            <div><p className="eyebrow">Common questionnaire</p><h2>The questions every council candidate receives</h2></div>
            <p>These questions reflect issues in current Village plans and public records. Responses are voluntary and shown without scoring.</p>
          </div>
          <CandidateComparison />
        </div>
      </section>

      <section className="ask-section shell" id="ask">
        <div className="ask-copy">
          <p className="eyebrow">Community questions</p>
          <h2>What do you want every candidate to answer?</h2>
          <p>Email one specific, respectful question or relevant election information to <strong>election@anmore.me</strong>. Selected questions will be sent to every candidate at the same time and attributed as a community question, not to an individual unless you ask us to credit you.</p>
          <ul className="check-list"><li>Questions are moderated for relevance and civility.</li><li>Similar submissions may be combined.</li><li>No candidate receives a private or preferential question.</li></ul>
        </div>
        <div className="question-form">
          <p className="mono-label">Email the editor</p>
          <h3>Send questions or information directly.</h3>
          <p>Your email address is used only for editorial follow-up and is never published without your permission.</p>
          <a className="button primary" href="mailto:election@anmore.me?subject=Community%20question%20for%20Anmore%20Votes%202026">Email election@anmore.me</a>
        </div>
      </section>

      <section className="voting shell" id="voting">
        <div><p className="eyebrow">Voting information</p><h2>Two ways to vote in person</h2><p>Mail voting is also available to eligible resident and non-resident property electors. Always confirm locations, identification requirements, and updates with the Village.</p></div>
        <div className="date-cards">
          <article><p>Advance voting</p><strong>Oct 7</strong><span>Wednesday, 2026</span></article>
          <article><p>Election day</p><strong>Oct 17</strong><span>Saturday, 2026</span></article>
        </div>
        <a className="button secondary" href="https://anmore.com/village-hall/elections/" target="_blank" rel="noreferrer">Official voting details ↗</a>
      </section>

      <section className="about shell" id="about">
        <div><p className="eyebrow">About this project</p><h2>Neutral by design</h2></div>
        <div className="about-copy">
          <p>Anmore Votes 2026 is an independent, community-run voter information project. It is not affiliated with the Village of Anmore, Elections BC, a candidate, or a political organization.</p>
          <p>We distinguish official records from candidate-supplied statements, publish equivalent opportunities for every candidate, preserve corrections, and never sell placement or rank candidates.</p>
          <div className="source-links">
            <a href="https://anmore.com/village-hall/elections/" target="_blank" rel="noreferrer">Village election page ↗</a>
            <a href="https://localelections.ca/election_candidates/3_2026_candidates.html" target="_blank" rel="noreferrer">CivicInfo candidate roster ↗</a>
            <a href="https://elections.bc.ca/local-elections/2026-general-local-elections/" target="_blank" rel="noreferrer">Elections BC ↗</a>
            <a href="/legal/#compliance">Compliance & independence</a>
            <a href="/legal/#privacy">Privacy</a>
            <a href="/legal/#candidate-consent">Candidate consent</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner"><div className="brand"><span className="brand-mark">A</span><span>Anmore Votes <b>2026</b></span></div><p>Built for an informed community. Last verified September 20, 2026.</p><div className="footer-links"><a href="/legal/">Policies</a><a href="mailto:election@anmore.me">Contact</a><a href="#top">Back to top ↑</a></div></div>
      </footer>
    </main>
    </>
  );
}
