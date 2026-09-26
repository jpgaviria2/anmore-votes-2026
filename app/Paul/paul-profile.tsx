/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { candidates, questions } from "../data";

const candidate = candidates.find((entry) => entry.name === "Paul Weverink");

if (!candidate?.biography || !candidate.professionalBackground || !candidate.portrait || !candidate.answers) {
  throw new Error("Paul Weverink profile is incomplete");
}

const paul = {
  ...candidate,
  biography: candidate.biography,
  professionalBackground: candidate.professionalBackground,
  portrait: candidate.portrait,
  answers: candidate.answers,
};

export function PaulProfile() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content" className="profile-page">
        <header className="site-header shell">
          <a className="brand" href="/" aria-label="Anmore Votes home">
            <span className="brand-mark">A</span>
            <span>Anmore Votes <b>2026</b></span>
          </a>
          <nav aria-label="Main navigation">
            <a href="/#candidates">Candidates</a>
            <a href="/#questions">Compare answers</a>
            <a href="/#voting">How to vote</a>
            <a href="/#about">About</a>
          </nav>
        </header>

        <section className="profile-hero shell">
          <div className="profile-portrait-wrap">
            <img className="profile-portrait" src={paul.portrait} alt="Portrait supplied by Paul Weverink" />
          </div>
          <div className="profile-intro">
            <p className="eyebrow">Candidate supplied</p>
            <p className="office">Candidate for {paul.office}</p>
            <h1>Paul Weverink</h1>
            {paul.officialNote && <span className="status-badge">{paul.officialNote}</span>}
            <p className="profile-label">Biography</p>
            <p className="profile-copy">{paul.biography}</p>
          </div>
        </section>

        <section className="profile-background shell" aria-labelledby="background-heading">
          <p className="eyebrow">Candidate supplied</p>
          <h2 id="background-heading">Occupation, professional background, and community service</h2>
          <p className="profile-copy">{paul.professionalBackground}</p>
        </section>

        <section className="profile-answers" aria-labelledby="answers-heading">
          <div className="shell">
            <div className="profile-section-heading">
              <p className="eyebrow">Common questionnaire</p>
              <h2 id="answers-heading">Paul Weverink’s responses</h2>
              <p>Answers appear as supplied by the candidate, without scoring or editorial interpretation.</p>
            </div>
            <div className="profile-answer-list">
              {questions.map((question, index) => (
                <article className="profile-answer" key={question}>
                  <div className="profile-question-number">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{question}</h3>
                    <p>{paul.answers?.[index] || "No response provided."}</p>
                  </div>
                </article>
              ))}
            </div>
            <a className="button light profile-back" href="/#questions">Compare candidates side by side</a>
          </div>
        </section>

        <footer>
          <div className="shell footer-inner">
            <div className="brand"><span className="brand-mark">A</span><span>Anmore Votes <b>2026</b></span></div>
            <p>Candidate-supplied content. Anmore Votes does not endorse, rank, or score candidates.</p>
            <div className="footer-links"><a href="/legal/">Policies</a><a href="mailto:election@anmore.me">Contact</a><a href="/">Voter guide</a></div>
          </div>
        </footer>
      </main>
    </>
  );
}
