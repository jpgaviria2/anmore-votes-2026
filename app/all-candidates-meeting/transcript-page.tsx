/* Shared by the Next/Vinext app and the static Hostinger build, so plain anchors are required. */
/* eslint-disable @next/next/no-html-link-for-pages */
import transcript from "../all-candidates-meeting-data.json";

type MeetingQuestion = (typeof transcript.questions)[number];
type TranscriptTurn = MeetingQuestion["questionTurns"][number];
type MeetingResponse = MeetingQuestion["responses"][number];

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

function QuestionTranscript({ question }: { question: MeetingQuestion }) {
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
    <article className="meeting-question" id={question.id.toLowerCase()}>
      <div className="meeting-question-heading">
        <span>{question.id}</span>
        <div>
          <p className="meeting-question-topic">{question.topic}</p>
          <p className="meeting-question-meta">Asked by {question.questioner}</p>
        </div>
        {question.range?.start ? (
          <a href={recordingUrl(question.range.start)} target="_blank" rel="noreferrer">Watch from {question.range.start} ↗</a>
        ) : null}
      </div>

      <div className="meeting-question-body">
        <section aria-label={`${question.id} question`}>
          <h3>Question</h3>
          {question.questionTurns.map((turn, index) => <Turn turn={turn} key={`${question.id}-question-${index}`} />)}
          {untimedRelated.length ? (
            <div className="related-turns">
              <h4>Moderator exchange</h4>
              {untimedRelated.map((turn, index) => <Turn turn={turn} key={`${question.id}-untimed-${index}`} />)}
            </div>
          ) : null}
        </section>

        <section className="meeting-responses" aria-label={`${question.id} responses and follow-ups`}>
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
    </article>
  );
}

export function AllCandidatesMeetingTranscript() {
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
            <a href="#questions">Questions</a>
            <a href={transcript.event.recordingUrl} target="_blank" rel="noreferrer">Recording ↗</a>
          </nav>
        </header>

        <section className="transcript-hero shell">
          <p className="eyebrow">Community recording transcript</p>
          <h1>All Candidates Meeting<br /><em>questions and answers</em></h1>
          <p className="transcript-lede">
            Thirteen audience questions and the candidates’ answers from the October 6, 2026 Anmore Village All Candidates Meeting.
          </p>
          <div className="transcript-actions">
            <a className="button primary" href="#questions">Read the transcript</a>
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
            <p>Questioners identified themselves in the public recording. Street numbers have been replaced with an explicit omission marker; spoken street or neighbourhood names remain for context.</p>
            <p><strong>Source:</strong> <a href={transcript.event.recordingUrl} target="_blank" rel="noreferrer">{transcript.event.sourceLabel} ↗</a></p>
          </div>
        </section>

        <section className="transcript-questions shell" id="questions" aria-labelledby="questions-title">
          <div className="section-heading">
            <div><p className="eyebrow">13 audience questions</p><h2 id="questions-title">Meeting transcript</h2></div>
            <p>Responses and follow-ups appear in timestamp order. This page does not summarize, score, endorse, or correct the candidates’ statements.</p>
          </div>
          <div className="transcript-question-list">
            {transcript.questions.map((question) => <QuestionTranscript question={question} key={question.id} />)}
          </div>
        </section>

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
