"use client";

import { useMemo, useState } from "react";
import { candidates, questions } from "./data";

type OfficeFilter = "All" | "Mayor" | "Councillor";

function byLastName(left: { name: string }, right: { name: string }) {
  const leftLast = left.name.trim().split(/\s+/).at(-1) || left.name;
  const rightLast = right.name.trim().split(/\s+/).at(-1) || right.name;
  return leftLast.localeCompare(rightLast) || left.name.localeCompare(right.name);
}

function candidateId(name: string) {
  return `candidate-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function CandidateComparison() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [office, setOffice] = useState<OfficeFilter>("All");
  const visibleCandidates = useMemo(
    () => candidates
      .filter((candidate) => candidate.office !== "School Trustee")
      .filter((candidate) => office === "All" || candidate.office === office)
      .sort(byLastName),
    [office],
  );

  return (
    <div className="comparison" id="compare">
      <div className="comparison-intro">
        <div>
          <p className="eyebrow">Side-by-side comparison</p>
          <h3>Compare every candidate on the same question.</h3>
        </div>
        <p>Answers appear exactly as approved by each candidate, without scoring or editorial interpretation. A missing answer is shown neutrally.</p>
      </div>

      <div className="comparison-controls">
        <label>
          Question
          <select value={questionIndex} onChange={(event) => setQuestionIndex(Number(event.target.value))}>
            {questions.map((question, index) => <option value={index} key={question}>{index + 1}. {question}</option>)}
          </select>
        </label>
        <fieldset>
          <legend>Office</legend>
          <div className="filter-buttons">
            {(["All", "Mayor", "Councillor"] as const).map((value) => (
              <button type="button" className={office === value ? "active" : ""} aria-pressed={office === value} onClick={() => setOffice(value)} key={value}>{value}</button>
            ))}
          </div>
        </fieldset>
      </div>

      <section className="comparison-results" aria-live="polite" aria-labelledby="active-question">
        <div className="active-question">
          <span>{String(questionIndex + 1).padStart(2, "0")}</span>
          <h4 id="active-question">{questions[questionIndex]}</h4>
        </div>
        <div className="comparison-grid">
          {visibleCandidates.map((candidate) => {
            const answer = candidate.answers?.[questionIndex];
            return (
              <article className="answer-card" key={candidate.name}>
                <div className="answer-heading">
                  <div className="answer-initials" aria-hidden="true">{candidate.initials}</div>
                  <div><p>{candidate.office}</p><h5>{candidate.name}</h5></div>
                </div>
                {answer ? (
                  <>
                    <blockquote>{answer}</blockquote>
                    <p className="answer-meta">Candidate supplied · Identity verified{candidate.responseApprovedAt ? ` · Approved ${candidate.responseApprovedAt}` : ""}</p>
                  </>
                ) : (
                  <p className="no-answer">No response provided.</p>
                )}
                <a href={candidate.profilePath || `#${candidateId(candidate.name)}`}>{candidate.profilePath ? "View full profile" : "View candidate card"}</a>
              </article>
            );
          })}
        </div>
      </section>

      <p className="comparison-note">Candidates are ordered alphabetically by last name. Anmore Votes does not rank, endorse, summarize, or score responses.</p>
    </div>
  );
}
