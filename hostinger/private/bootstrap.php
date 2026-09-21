<?php
declare(strict_types=1);

function json_response(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

function require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        json_response(405, ['error' => 'Method not allowed.']);
    }
}

function request_json(int $maxBytes): array
{
    $length = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($length > $maxBytes) {
        json_response(413, ['error' => 'Submission is too large.']);
    }
    $raw = file_get_contents('php://input', false, null, 0, $maxBytes + 1);
    if ($raw === false || strlen($raw) > $maxBytes) {
        json_response(413, ['error' => 'Submission is too large.']);
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        json_response(400, ['error' => 'Invalid request.']);
    }
    return $data;
}

function clean_text(mixed $value, int $max): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = trim(str_replace("\0", '', $value));
    return mb_substr($value, 0, $max);
}

function reject_bot(array $data): void
{
    if (clean_text($data['website_confirm'] ?? '', 200) !== '') {
        json_response(201, ['ok' => true]);
    }
}

function private_root(): string
{
    return __DIR__;
}

function database(): PDO
{
    static $db = null;
    if ($db instanceof PDO) {
        return $db;
    }
    $db = new PDO('sqlite:' . private_root() . '/anmore-votes.sqlite', null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $db->exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;');
    $db->exec('CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kind TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        ip_hash TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT "pending",
        created_at TEXT NOT NULL
    )');
    $db->exec('CREATE INDEX IF NOT EXISTS submissions_rate_limit
        ON submissions(kind, ip_hash, created_at)');
    return $db;
}

function ip_hash(): string
{
    $saltPath = private_root() . '/rate-limit-salt';
    if (!is_file($saltPath)) {
        file_put_contents($saltPath, bin2hex(random_bytes(32)), LOCK_EX);
        chmod($saltPath, 0600);
    }
    $salt = trim((string) file_get_contents($saltPath));
    return hash('sha256', $salt . '|' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
}

function store_submission(string $kind, array $payload): int
{
    $db = database();
    $hash = ip_hash();
    $cutoff = gmdate('c', time() - 3600);
    $check = $db->prepare('SELECT COUNT(*) FROM submissions
        WHERE kind = :kind AND ip_hash = :ip_hash AND created_at >= :cutoff');
    $check->execute([':kind' => $kind, ':ip_hash' => $hash, ':cutoff' => $cutoff]);
    if ((int) $check->fetchColumn() >= 8) {
        json_response(429, ['error' => 'Please wait before submitting again.']);
    }
    $insert = $db->prepare('INSERT INTO submissions
        (kind, payload_json, ip_hash, status, created_at)
        VALUES (:kind, :payload, :ip_hash, "pending", :created_at)');
    $insert->execute([
        ':kind' => $kind,
        ':payload' => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        ':ip_hash' => $hash,
        ':created_at' => gmdate('c'),
    ]);
    return (int) $db->lastInsertId();
}

function notify_candidate_submission(int $submissionId, array $payload): bool
{
    $recipient = getenv('ANMORE_NOTIFY_EMAIL') ?: 'election@anmore.me';
    $candidate = clean_text($payload['candidateName'] ?? '', 120);
    $replyTo = clean_text($payload['verificationEmail'] ?? '', 200);
    $subject = "Candidate submission pending verification: {$candidate}";
    $body = "A candidate submission is waiting in the private Anmore Votes review queue.\n\n"
        . "Submission ID: {$submissionId}\n"
        . "Candidate selected: {$candidate}\n"
        . "Submitted verification email: {$replyTo}\n"
        . "Received (UTC): " . gmdate('c') . "\n\n"
        . "Verification required before publication:\n"
        . "1. Do not rely on this submitted email or phone number alone.\n"
        . "2. Contact the candidate through an independently sourced official channel.\n"
        . "3. Confirm the submission and send the final profile proof for approval.\n"
        . "4. Publish manually only after explicit approval.\n\n"
        . "Submitted content (private):\n"
        . json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
        . "\n";
    $headers = [
        'Reply-To: ' . $replyTo,
        'Content-Type: text/plain; charset=UTF-8',
        'X-Auto-Response-Suppress: All',
    ];
    $sent = mail($recipient, $subject, $body, implode("\r\n", $headers));
    if (!$sent) {
        error_log("Anmore Votes candidate notification failed for submission {$submissionId}");
    }
    return $sent;
}
