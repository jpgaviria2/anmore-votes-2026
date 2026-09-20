"use client";

import { FormEvent, useMemo, useState } from "react";
import { candidates, questions, schoolTrusteeQuestions } from "../data";

export function CandidateResponseForm() {
  const [candidateName, setCandidateName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const activeQuestions = useMemo(
    () => candidateName === "Kerri Palmer Isaak" ? schoolTrusteeQuestions : questions,
    [candidateName],
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const response = await fetch("/api/candidate-submissions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (response.ok) {
      form.reset();
      setCandidateName("");
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="form-page">
      <div className="election-strip"><span>Candidate participation is voluntary</span><strong>Submissions are reviewed before publication</strong></div>
      <header className="site-header shell">
        {/* Plain anchors keep this shared component compatible with the Hostinger static build. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="brand" href="/"><span className="brand-mark">A</span><span>Anmore Votes <b>2026</b></span></a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="button secondary" href="/">Return to voter guide</a>
      </header>
      <section className="form-header shell">
        <p className="eyebrow">Candidate submission</p>
        <h1>Share your information in your own words.</h1>
        <p>Every verified candidate receives the same space and questionnaire. Your submission remains private until your identity is verified and you approve the final profile.</p>
        {status === "sent" && <p className="success-callout" role="status">Thank you. Your information is in the review queue. We will verify your identity before anything is published.</p>}
      </section>
      <form className="candidate-form shell" onSubmit={submit}>
        <input className="honeypot" name="website_confirm" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <fieldset>
          <legend>1. Identity and contact</legend>
          <div className="stack">
            <label>Your name<select name="candidateName" required value={candidateName} onChange={(event) => setCandidateName(event.target.value)}><option value="">Select your name</option>{candidates.map((candidate) => <option key={candidate.name} value={candidate.name}>{candidate.name} — {candidate.office}</option>)}</select></label>
            <div className="field-row">
              <label>Verification email <span>Kept private</span><input name="verificationEmail" type="email" required autoComplete="email" /></label>
              <label>Phone <span>Optional; kept private</span><input name="phone" type="tel" autoComplete="tel" /></label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>2. Public profile</legend>
          <div className="stack">
            <label>Biography <span>40–1,500 characters; published as candidate supplied</span><textarea name="biography" required minLength={40} maxLength={1500} rows={8} /></label>
            <div className="field-row">
              <label>Occupation or professional background <span>Optional</span><input name="occupation" maxLength={200} /></label>
              <label>Campaign website <span>Optional</span><input name="website" type="url" placeholder="https://" /></label>
            </div>
            <label>Community service and relevant experience <span>Optional</span><textarea name="communityService" maxLength={1600} rows={5} /></label>
            <div className="field-row">
              <label>LinkedIn profile <span>Optional</span><input name="linkedIn" type="url" placeholder="https://linkedin.com/in/…" /></label>
              <label>Portrait image link <span>Optional; use an image you may authorize us to publish</span><input name="portraitUrl" type="url" placeholder="https://" /></label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>3. Common questionnaire</legend>
          <p>Answer any or all questions. Each answer may be up to 2,500 characters. We will not score responses.</p>
          <div className="stack">
            {activeQuestions.map((question, index) => <label className="answer-field" key={question}><b>{index + 1}. {question}</b><textarea name={`answer${index + 1}`} maxLength={2500} rows={5} /></label>)}
          </div>
        </fieldset>
        <label className="checkbox"><input type="checkbox" name="consent" value="yes" required /><span>I confirm that this is my submission, the information is accurate to the best of my knowledge, and Anmore Votes 2026 may contact me to verify and prepare it for publication.</span></label>
        <p className="privacy-note">Private contact details are used only for identity verification and editorial follow-up. They are not published.</p>
        <button className="button primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Submitting…" : "Submit for review"}</button>
        <p className={`form-status ${status}`} aria-live="polite">{status === "error" && "Your information could not be saved. Please review the fields and try again."}</p>
      </form>
    </main>
  );
}
