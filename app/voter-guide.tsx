"use client";

import { FormEvent, useState } from "react";
import { candidates, questions } from "./data";

const groups = ["Mayor", "Councillor", "School Trustee"] as const;

function alphabeticalByLastName(left: { name: string }, right: { name: string }) {
  const leftLastName = left.name.trim().split(/\s+/).at(-1) || left.name;
  const rightLastName = right.name.trim().split(/\s+/).at(-1) || right.name;
  return leftLastName.localeCompare(rightLastName) || left.name.localeCompare(right.name);
}

export function VoterGuide() {
  const [questionStatus, setQuestionStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuestionStatus("sending");
    const form = event.currentTarget;
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (response.ok) {
      form.reset();
      setQuestionStatus("sent");
    } else {
      setQuestionStatus("error");
    }
  }

  return (
    <main>
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
          <a className="priority-question" href="#questions">
            <span>Featured question for every council candidate</span>
            <strong>{questions[3]}</strong>
          </a>
          <div className="hero-actions">
            <a className="button primary" href="#candidates">Meet the candidates</a>
            <a className="button secondary" href="#ask">Ask a question</a>
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
                <article className="candidate-card" key={candidate.name}>
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
                  <div className="response-state"><span className="dot" /> No questionnaire response published yet</div>
                </article>
              ))}
            </div>
          </div>
        ))}
        <div className="candidate-invite">
          <div><p className="eyebrow">Are you a candidate?</p><h3>Add your own biography and answers.</h3><p>Submissions are verified and reviewed before publication. Nothing is posted automatically.</p></div>
          <a className="button light" href="/candidate-response/">Submit candidate information</a>
        </div>
      </section>

      <section className="issues" id="questions">
        <div className="shell">
          <div className="section-heading light-heading">
            <div><p className="eyebrow">Common questionnaire</p><h2>The questions every council candidate receives</h2></div>
            <p>These questions reflect issues in current Village plans and public records. Responses are voluntary and shown without scoring.</p>
          </div>
          <ol className="question-list">
            {questions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="ask-section shell" id="ask">
        <div className="ask-copy">
          <p className="eyebrow">Community questions</p>
          <h2>What do you want every candidate to answer?</h2>
          <p>Suggest one specific, respectful question. Selected questions will be sent to every candidate at the same time and attributed as a community question, not to an individual unless you ask us to credit you.</p>
          <ul className="check-list"><li>Questions are moderated for relevance and civility.</li><li>Similar submissions may be combined.</li><li>No candidate receives a private or preferential question.</li></ul>
        </div>
        <form className="question-form" onSubmit={submitQuestion}>
          <input className="honeypot" name="website_confirm" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label>Your question<textarea name="question" required maxLength={600} rows={6} placeholder="What specific action would you take on…" /></label>
          <div className="field-row">
            <label>Name <span>(optional)</span><input name="name" maxLength={100} autoComplete="name" /></label>
            <label>Email <span>(optional)</span><input name="email" type="email" maxLength={200} autoComplete="email" /></label>
          </div>
          <label className="checkbox"><input type="checkbox" name="consent" value="yes" required /><span>I understand this question may be edited for clarity or combined with similar questions.</span></label>
          <p className="privacy-note">Contact details are optional, never published without permission, and used only to follow up about this question.</p>
          <button className="button primary" disabled={questionStatus === "sending"} type="submit">{questionStatus === "sending" ? "Sending…" : "Submit a community question"}</button>
          <p className={`form-status ${questionStatus}`} aria-live="polite">
            {questionStatus === "sent" && "Thank you. Your question is now in the moderation queue."}
            {questionStatus === "error" && "The question could not be saved. Please try again shortly."}
          </p>
        </form>
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
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner"><div className="brand"><span className="brand-mark">A</span><span>Anmore Votes <b>2026</b></span></div><p>Built for an informed community. Last verified September 20, 2026.</p><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
