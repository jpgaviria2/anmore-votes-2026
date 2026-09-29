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
            <strong>Staging-only Google Drive research document.</strong> The complete document is displayed below without summarizing or rewriting it.
          </div>
        </div>

        <section className="profile-hero shell">
          <div className="profile-portrait-wrap public-profile-placeholder" role="img" aria-label={`No portrait supplied for ${candidate.name}; initials ${candidate.initials}`}>
            <span>{candidate.initials}</span>
          </div>
          <div className="profile-intro">
            <p className="eyebrow">Full Google Drive research document</p>
            <p className="office">Candidate for {candidate.office}</p>
            <h1>{candidate.name}</h1>
            {candidate.officialNote && <span className="status-badge">{candidate.officialNote}</span>}
            <p className="profile-label">Research status</p>
            <p className="profile-copy">The full research document from the shared Google Drive folder is displayed below. No portrait was supplied, so an initials placeholder is shown.</p>
          </div>
        </section>

        <section className="public-profile-sources shell" aria-labelledby="sources-heading">
          <p className="eyebrow">Complete source document</p>
          <h2 id="sources-heading">{publicProfile.driveDocumentTitle}</h2>
          <iframe
            className="google-drive-document"
            src={`https://docs.google.com/document/d/${publicProfile.driveDocumentId}/preview`}
            title={`${candidate.name} — full Google Drive research document`}
            width="100%"
            height="900"
            frameBorder="0"
            allowFullScreen
          />
          <p><a href={`https://docs.google.com/document/d/${publicProfile.driveDocumentId}/edit?usp=sharing`} target="_blank" rel="noreferrer">Open the complete document in Google Drive ↗</a></p>
          <p>Document compilation date: {publicProfile.compiledAt}. The embedded Google document is shown in full and has not been rewritten by Anmore Votes.</p>
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
