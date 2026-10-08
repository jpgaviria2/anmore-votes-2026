"use client";

/* Shared by the Next/Vinext app and the static Hostinger build, so plain anchors are required. */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import transcript from "../all-candidates-meeting-data.json";

type MeetingQuestion = (typeof transcript.questions)[number];
type TranscriptTurn = MeetingQuestion["questionTurns"][number];
type MeetingResponse = MeetingQuestion["responses"][number];
type MeetingStatement = (typeof transcript.openingStatements)[number] | (typeof transcript.closingRemarks)[number];
type CategoryKey = "opening" | "questions" | "closing";

function secondsFromTimestamp(timestamp?: string) {
  if (!timestamp) return 0;
  const parts = timestamp.split(":").map(Number);
  if (parts.some(Number.isNaN)) return 0;
  return parts.reduce((total, part) => total * 60 + part, 0);
}

function recordingUrl(timestamp?: string) {
  const seconds = secondsFromTimestamp(timestamp);
  return seconds
    ? `${transcript.event.recordingUrl}&t=${seconds}s`
    : transcript.event.recordingUrl;
}

function questionLabel(question: MeetingQuestion) {
  return `Question ${Number(question.id.slice(1))}`;
}

function Turn({ turn, showSpeaker = true }: { turn: TranscriptTurn; showSpeaker?: boolean }) {
  return (
    <div className={`transcript-turn transcript-${turn.role}`}>
      {showSpeaker ? (
        <div className="transcript-speaker-row">
          <strong>{turn.speaker}</strong>
          {turn.range?.start ? (
            <a href={recordingUrl(turn.range.start)} target="_blank" rel="noreferrer">
              {turn.range.start} ↗
            </a>
          ) : null}
        </div>
      ) : null}
      <p>{turn.text}</p>
    </div>
  );
}

function Response({ question, response, responseIndex }: { question: MeetingQuestion; response: MeetingResponse; responseIndex: number }) {
  const showTurnSpeakers = response.turns.length > 1;
  return (
    <div className="candidate-response">
      <div className="candidate-response-heading">
        <h4>{response.speaker}{response.kind === "follow-up" ? " — follow-up" : ""}</h4>
        {response.range?.start ? (
          <a href={recordingUrl(response.range.start)} target="_blank" rel="noreferrer">{response.range.start} ↗</a>
        ) : null}
      </div>
      {response.turns.length ? response.turns.map((turn, turnIndex) => (
        <Turn turn={turn} showSpeaker={showTurnSpeakers} key={`${question.id}-${responseIndex}-${turnIndex}`} />
      )) : <p className="transcript-unavailable">No recoverable verbatim response.</p>}
      {response.note ? <p className="transcript-note">Verification note: {response.note}</p> : null}
    </div>
  );
}

function StatementCard({ statement }: { statement: MeetingStatement }) {
  return (
    <article className="meeting-statement">
      <div className="meeting-statement-heading">
        <div>
          <p className="meeting-statement-role">{statement.role}</p>
          <h3>{statement.speaker}</h3>
        </div>
        <a href={recordingUrl(statement.range.start)} target="_blank" rel="noreferrer">{statement.range.start} ↗</a>
      </div>
      <p className="meeting-statement-delivery">{statement.delivery}</p>
      <p className="meeting-statement-text">{statement.text}</p>
      {statement.uncertainties.length ? (
        <details className="transcript-uncertainties statement-uncertainties">
          <summary>Transcription notes ({statement.uncertainties.length})</summary>
          <ul>{statement.uncertainties.map((item, index) => <li key={`${statement.speaker}-note-${index}`}>{item.note}</li>)}</ul>
        </details>
      ) : null}
    </article>
  );
}

function CategorySummary({ eyebrow, title, count }: { eyebrow: string; title: string; count: string }) {
  return (
    <summary className="transcript-category-summary">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <span className="transcript-category-count">{count}</span>
      <span className="transcript-category-toggle" aria-hidden="true">+</span>
    </summary>
  );
}

function QuestionTranscript({ question, isOpen, onToggle }: { question: MeetingQuestion; isOpen: boolean; onToggle: (open: boolean) => void }) {
  const untimedRelated = question.relatedTurns.filter((turn) => !turn.range?.start);
  const timeline = [
    ...question.responses.map((response, responseIndex) => ({
      kind: "response" as const,
      start: response.range?.start || "99:99:99.999",
      response,
      responseIndex,
    })),
    ...question.relatedTurns.filter((turn) => turn.range?.start).map((turn, relatedIndex) => ({
      kind: "related" as const,
      start: turn.range?.start || "99:99:99.999",
      turn,
      relatedIndex,
    })),
  ].sort((left, right) => left.start.localeCompare(right.start));

  return (
    <details className="meeting-question" id={question.id.toLowerCase()} open={isOpen} onToggle={(event) => onToggle(event.currentTarget.open)}>
      <summary className="meeting-question-heading">
        <span>{questionLabel(question)}</span>
        <div>
          <p className="meeting-question-topic">{question.topic}</p>
          <p className="meeting-question-meta">Audience question</p>
        </div>
        <span className="question-toggle" aria-hidden="true">+</span>
      </summary>

      <div className="meeting-question-body">
        {question.range?.start ? (
          <p className="question-watch-link"><a href={recordingUrl(question.range.start)} target="_blank" rel="noreferrer">Watch from {question.range.start} ↗</a></p>
        ) : null}
        <section aria-label={questionLabel(question)}>
          <h3>Question</h3>
          {question.questionTurns.map((turn, index) => <Turn turn={turn} key={`${question.id}-question-${index}`} />)}
          {untimedRelated.length ? (
            <div className="related-turns">
              <h4>Moderator exchange</h4>
              {untimedRelated.map((turn, index) => <Turn turn={turn} key={`${question.id}-untimed-${index}`} />)}
            </div>
          ) : null}
        </section>

        <section className="meeting-responses" aria-label={`${questionLabel(question)} responses and follow-ups`}>
          <h3>Responses and follow-ups</h3>
          {timeline.map((entry) => entry.kind === "response" ? (
            <Response
              question={question}
              response={entry.response}
              responseIndex={entry.responseIndex}
              key={`${question.id}-${entry.response.speaker}-${entry.responseIndex}`}
            />
          ) : (
            <div className="related-turns related-turn-timeline" key={`${question.id}-related-${entry.relatedIndex}`}>
              <h4>Clarification or follow-up</h4>
              <Turn turn={entry.turn} />
            </div>
          ))}
          {question.didNotAnswer.length ? (
            <p className="did-not-answer"><strong>Did not answer:</strong> {question.didNotAnswer.join(", ")}.</p>
          ) : null}
        </section>

        {question.uncertainties.length ? (
          <details className="transcript-uncertainties">
            <summary>Transcription notes ({question.uncertainties.length})</summary>
            <ul>{question.uncertainties.map((note, index) => <li key={`${question.id}-note-${index}`}>{note}</li>)}</ul>
          </details>
        ) : null}
      </div>
    </details>
  );
}

export function AllCandidatesMeetingTranscript() {
  const [openCategories, setOpenCategories] = useState<Record<CategoryKey, boolean>>({ opening: false, questions: true, closing: false });
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>("Q01");

  const setCategoryOpen = (category: CategoryKey, open: boolean) => {
    setOpenCategories((current) => current[category] === open ? current : { ...current, [category]: open });
  };

  const selectQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    window.requestAnimationFrame(() => {
      document.getElementById(questionId.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content" className="transcript-page">
        <header className="site-header shell transcript-header">
          <a className="brand" href="/" aria-label="Anmore Votes home">
            <span className="brand-mark">A</span>
            <span>Anmore Votes <b>2026</b></span>
          </a>
          <nav aria-label="Transcript navigation">
            <a href="/">Voter guide</a>
            <a href="#opening-statements">Opening statements</a>
            <a href="#questions">Questions</a>
            <a href="#closing-remarks">Closing remarks</a>
            <a href={transcript.event.recordingUrl} target="_blank" rel="noreferrer">Recording ↗</a>
          </nav>
        </header>

        <section className="transcript-hero shell">
          <p className="eyebrow">Community recording transcript</p>
          <h1>All Candidates Meeting<br /><em>statements, questions, and answers</em></h1>
          <p className="transcript-lede">
            Opening statements, thirteen audience questions and answers, and closing remarks from the October 6, 2026 Anmore Village All Candidates Meeting.
          </p>
          <div className="transcript-actions">
            <a className="button primary" href="#questions">Choose a question</a>
            <a className="button secondary" href={transcript.event.recordingUrl} target="_blank" rel="noreferrer">Watch the source recording ↗</a>
          </div>
        </section>

        <section className="transcript-method shell" aria-labelledby="transcript-method-title">
          <div>
            <p className="eyebrow">Source and method</p>
            <h2 id="transcript-method-title">Verbatim, source-linked, and explicit about uncertainty.</h2>
          </div>
          <div>
            <p>{transcript.transcription.method}</p>
            <p>Questioner names and identifying address or location details have been omitted from this publication copy for privacy. The archival transcript retains the spoken source.</p>
            <p><strong>Source:</strong> <a href={transcript.event.recordingUrl} target="_blank" rel="noreferrer">{transcript.event.sourceLabel} ↗</a></p>
          </div>
        </section>

        <details className="transcript-category shell" id="opening-statements" open={openCategories.opening} onToggle={(event) => setCategoryOpen("opening", event.currentTarget.open)}>
          <CategorySummary eyebrow="Formal remarks" title="Opening statements" count={`${transcript.openingStatements.length} statements`} />
          <div className="transcript-category-body">
            <p className="transcript-category-intro">Council candidates were allotted two minutes. Kim Trowbridge’s written statement was read by the moderator; the acclaimed mayor-elect and school trustee also addressed the meeting.</p>
            <div className="meeting-statement-list">
              {transcript.openingStatements.map((statement) => <StatementCard statement={statement} key={`opening-${statement.speaker}`} />)}
            </div>
          </div>
        </details>

        <details className="transcript-category shell" id="questions" open={openCategories.questions} onToggle={(event) => setCategoryOpen("questions", event.currentTarget.open)}>
          <CategorySummary eyebrow="Audience discussion" title="Questions and answers" count={`${transcript.questions.length} questions`} />
          <div className="transcript-category-body">
            <p className="transcript-category-intro">Pick a question below. Responses and follow-ups appear in timestamp order. This page does not summarize, score, endorse, or correct the candidates’ statements.</p>
            <nav className="question-picker" aria-label="Choose a meeting question">
              {transcript.questions.map((question) => (
                <button
                  type="button"
                  className="question-picker-button"
                  aria-controls={question.id.toLowerCase()}
                  aria-pressed={selectedQuestionId === question.id}
                  onClick={() => selectQuestion(question.id)}
                  key={`picker-${question.id}`}
                >
                  <strong>{questionLabel(question)}</strong>
                  <span>{question.topic}</span>
                </button>
              ))}
            </nav>
            <div className="transcript-question-list">
              {transcript.questions.map((question) => (
                <QuestionTranscript
                  question={question}
                  isOpen={selectedQuestionId === question.id}
                  onToggle={(open) => setSelectedQuestionId(open ? question.id : selectedQuestionId === question.id ? null : selectedQuestionId)}
                  key={question.id}
                />
              ))}
            </div>
          </div>
        </details>

        <details className="transcript-category shell" id="closing-remarks" open={openCategories.closing} onToggle={(event) => setCategoryOpen("closing", event.currentTarget.open)}>
          <CategorySummary eyebrow="Final minute" title="Closing remarks" count={`${transcript.closingRemarks.length} remarks`} />
          <div className="transcript-category-body">
            <p className="transcript-category-intro">One-minute closing remarks from the eight council candidates who spoke at the end of the recorded meeting.</p>
            <div className="meeting-statement-list">
              {transcript.closingRemarks.map((statement) => <StatementCard statement={statement} key={`closing-${statement.speaker}`} />)}
            </div>
          </div>
        </details>

        <footer>
          <div className="shell footer-inner">
            <div className="brand"><span className="brand-mark">A</span><span>Anmore Votes <b>2026</b></span></div>
            <p>Transcript published October 8, 2026.</p>
            <div className="footer-links"><a href="/">Voter guide</a><a href="mailto:election@anmore.me">Corrections</a><a href="#main-content">Back to top ↑</a></div>
          </div>
        </footer>
      </main>
    </>
  );
}
