/* eslint-disable @next/next/no-html-link-for-pages */
import { candidates, questions } from "./data";

export function PublicCandidateProfile({ candidateName }: { candidateName: string }) {
  const candidate = candidates.find((entry) => entry.name === candidateName);

  if (!candidate?.publicProfile) {
    throw new Error(`Public-source profile is unavailable for ${candidateName}`);
  }

  const { publicProfile } = candidate;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content" className="profile-page public-profile-page">
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

        <div className="public-profile-notice" role="note">
          <div className="shell">
            <strong>Staging-only independent summary.</strong> This page was compiled from Facebook and other public sources. It is not candidate-supplied or candidate-approved.
          </div>
        </div>

        <section className="profile-hero shell">
          <div className="profile-portrait-wrap public-profile-placeholder" role="img" aria-label={`No portrait supplied for ${candidate.name}; initials ${candidate.initials}`}>
            <span>{candidate.initials}</span>
          </div>
          <div className="profile-intro">
            <p className="eyebrow">Independent public-source summary</p>
            <p className="office">Candidate for {candidate.office}</p>
            <h1>{candidate.name}</h1>
            {candidate.officialNote && <span className="status-badge">{candidate.officialNote}</span>}
            <p className="profile-label">Research status</p>
            <p className="profile-copy">Compiled {publicProfile.compiledAt} from Facebook and other public sources. No portrait was supplied, so an initials placeholder is shown.</p>
          </div>
        </section>

        <section className="profile-background shell" aria-labelledby="background-heading">
          <p className="eyebrow">Public-source background</p>
          <h2 id="background-heading">Biography and background</h2>
          <div className="profile-copy">
            {publicProfile.background.length > 0 ? (
              <ul className="public-profile-list">
                {publicProfile.background.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p className="public-profile-empty">{publicProfile.noSubstantiveInformation}</p>
            )}
          </div>
        </section>

        <section className="profile-background shell" aria-labelledby="priorities-heading">
          <p className="eyebrow">Public-source positions</p>
          <h2 id="priorities-heading">Priorities and positions</h2>
          <div className="profile-copy">
            {publicProfile.priorities.length > 0 ? (
              <ul className="public-profile-list">
                {publicProfile.priorities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p className="public-profile-empty">No substantive priorities or positions were found in the public sources reviewed as of September 28, 2026.</p>
            )}
          </div>
        </section>

        <section className="public-profile-sources shell" aria-labelledby="sources-heading">
          <p className="eyebrow">Source record</p>
          <h2 id="sources-heading">Sources reviewed</h2>
          <ul>
            {publicProfile.sources.map((source) => (
              <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>
            ))}
          </ul>
          <p>Compilation date: {publicProfile.compiledAt}. Public-source summaries are kept separate from candidate submissions and may be corrected when better source information becomes available.</p>
        </section>

        <section className="profile-answers" aria-labelledby="answers-heading">
          <div className="shell">
            <div className="profile-section-heading">
              <p className="eyebrow">Common questionnaire</p>
              <h2 id="answers-heading">No questionnaire response provided</h2>
              <p>Public statements have not been mapped into Anmore Votes questionnaire answers. All nine answers remain empty unless the candidate submits and approves a response.</p>
            </div>
            <div className="profile-answer-list">
              {questions.map((question, index) => (
                <article className="profile-answer" key={question}>
                  <div className="profile-question-number">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{question}</h3>
                    <p>No response provided.</p>
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
            <p>Staging-only public research. Not candidate-supplied or candidate-approved. Anmore Votes does not endorse, rank, or score candidates.</p>
            <div className="footer-links"><a href="/legal/">Policies</a><a href="mailto:election@anmore.me">Contact</a><a href="/">Voter guide</a></div>
          </div>
        </footer>
      </main>
    </>
  );
}
