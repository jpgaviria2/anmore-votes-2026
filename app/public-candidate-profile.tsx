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
            <strong>Staging-only original sources.</strong> Complete public posts are displayed directly from Facebook where embedding is available. Anmore Votes has not summarized or rewritten them.
          </div>
        </div>

        <section className="profile-hero shell">
          <div className="profile-portrait-wrap public-profile-placeholder" role="img" aria-label={`No portrait supplied for ${candidate.name}; initials ${candidate.initials}`}>
            <span>{candidate.initials}</span>
          </div>
          <div className="profile-intro">
            <p className="eyebrow">Full original public posts</p>
            <p className="office">Candidate for {candidate.office}</p>
            <h1>{candidate.name}</h1>
            {candidate.officialNote && <span className="status-badge">{candidate.officialNote}</span>}
            <p className="profile-label">Research status</p>
            <p className="profile-copy">Compiled {publicProfile.compiledAt} from Facebook and other public sources. No portrait was supplied, so an initials placeholder is shown.</p>
          </div>
        </section>

        <section className="public-profile-sources shell" aria-labelledby="sources-heading">
          <p className="eyebrow">Original source material</p>
          <h2 id="sources-heading">Complete posts, questions, and answers</h2>
          {publicProfile.posts.length > 0 ? (
            <div className="public-post-list">
              {publicProfile.posts.map((post) => (
                <article className="public-post" key={post.url}>
                  <h3>{post.label}</h3>
                  {post.embedded && (
                    <iframe
                      className="facebook-post"
                      src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(post.url)}&show_text=true&width=500`}
                      title={`${candidate.name} — complete Facebook post`}
                      width="500"
                      height="780"
                      scrolling="yes"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  )}
                  {!post.embedded && <p>This Facebook group post cannot be embedded publicly.</p>}
                  <p><a href={post.url} target="_blank" rel="noreferrer">View original post on Facebook ↗</a></p>
                </article>
              ))}
            </div>
          ) : (
            <p className="public-profile-empty">{publicProfile.noSubstantiveInformation}</p>
          )}
          <p>Compilation date: {publicProfile.compiledAt}. Facebook supplies the embedded content; use “See more” inside a post to reveal its complete questions and answers.</p>
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
