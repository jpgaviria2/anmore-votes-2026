/* eslint-disable @next/next/no-html-link-for-pages */
import { candidates } from "./data";

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
            <strong>Taken from the candidate’s public profile.</strong> This material was publicly posted and was not submitted or approved by the candidate for Anmore Votes.
          </div>
        </div>

        <section className="profile-hero shell">
          <div className="profile-portrait-wrap public-profile-placeholder" role="img" aria-label={`No portrait supplied for ${candidate.name}; initials ${candidate.initials}`}>
            <span>{candidate.initials}</span>
          </div>
          <div className="profile-intro">
            <p className="eyebrow">Public profile information</p>
            <p className="office">Candidate for {candidate.office}</p>
            <h1>{candidate.name}</h1>
            {candidate.officialNote && <span className="status-badge">{candidate.officialNote}</span>}
            <p className="profile-label">Source</p>
            <p className="profile-copy">Taken from the candidate’s public profile. No portrait was supplied, so an initials placeholder is shown.</p>
          </div>
        </section>

        <section className="public-profile-sources shell" aria-labelledby="sources-heading">
          <p className="eyebrow">Public Facebook post</p>
          <h2 id="sources-heading">{publicProfile.sourceLabel}</h2>
          {publicProfile.embeddable ? (
            <iframe
              className="facebook-post"
              src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(publicProfile.sourceUrl)}&show_text=true&width=500`}
              title={`${candidate.name} — public Facebook post`}
              width="500"
              height="900"
              scrolling="yes"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          ) : (
            <p className="public-profile-empty">Facebook does not permit this public group post to be embedded.</p>
          )}
          <p><a href={publicProfile.sourceUrl} target="_blank" rel="noreferrer">View the original public Facebook post ↗</a></p>
          <p>Source reviewed {publicProfile.compiledAt}. Public statements are not treated as answers to the Anmore Votes questionnaire.</p>
          <a className="button secondary profile-back" href="/#candidates">Back to candidates</a>
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
