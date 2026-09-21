import { questions } from "../data";

export function CandidateResponseForm() {
  return (
    <main className="form-page">
      <div className="election-strip"><span>Candidate participation is voluntary</span><strong>Information is verified before publication</strong></div>
      <header className="site-header shell">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="brand" href="/"><span className="brand-mark">A</span><span>Anmore Votes <b>2026</b></span></a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="button secondary" href="/">Return to voter guide</a>
      </header>
      <section className="form-header shell">
        <p className="eyebrow">Candidate information</p>
        <h1>Send your biography and answers by email.</h1>
        <p>Email your information to <strong>election@anmore.me</strong>, preferably from the same address published in your official nomination registration. Nothing is published automatically.</p>
        <a className="button primary" href="mailto:election@anmore.me?subject=Candidate%20information%20for%20Anmore%20Votes%202026">Email candidate information</a>
      </section>
      <section className="candidate-form shell">
        <fieldset>
          <legend>What to include</legend>
          <ul className="check-list">
            <li>Your full name and the office you are seeking.</li>
            <li>A biography of up to 1,500 characters.</li>
            <li>Your occupation or professional background and relevant community service.</li>
            <li>Optional campaign website, LinkedIn profile, and portrait image you authorize us to publish.</li>
            <li>Your numbered answers to any or all applicable questions below.</li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Identity verification</legend>
          <p>Before publication, we match the sender against the email published in the candidate&apos;s official nomination registration. If no email appears there, we verify identity through another independently sourced official contact route. The candidate then receives and must approve the final profile proof.</p>
        </fieldset>
        <fieldset>
          <legend>Consent to publish</legend>
          <p>Candidate-supplied material is published only after written consent. Please read the <a href="/legal/#candidate-consent">Candidate Consent and Publication Authorization</a>, then include this sentence in your reply:</p>
          <blockquote className="consent-text">I have read and agree to the Candidate Consent and Publication Authorization.</blockquote>
          <p className="privacy-note">You may request a correction or withdrawal later. Private contact information is not published.</p>
        </fieldset>
        <fieldset>
          <legend>Council questionnaire</legend>
          <ol className="question-list">
            {questions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></li>)}
          </ol>
        </fieldset>
        <a className="button primary" href="mailto:election@anmore.me?subject=Candidate%20information%20for%20Anmore%20Votes%202026">Email election@anmore.me</a>
        <div className="source-links"><a href="/legal/#privacy">Privacy policy</a><a href="/legal/#corrections">Corrections and withdrawals</a><a href="/legal/#compliance">Election compliance</a></div>
      </section>
    </main>
  );
}
