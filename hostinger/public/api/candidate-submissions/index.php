<?php
declare(strict_types=1);

require dirname(__DIR__, 3) . '/private/bootstrap.php';

require_post();
$data = request_json(75000);
reject_bot($data);

$allowedCandidates = [
    'Doug Richardson', 'Harriette Chang', 'Will Crocker', 'Nylah Froese',
    'Georgia Lyons', 'Neil Lyons', 'Wade Parrish', 'Rod Rempel',
    'Carl Schmidt', 'Kim Trowbridge', 'Paul Weverink', 'Kerri Palmer Isaak',
];

$candidateName = clean_text($data['candidateName'] ?? '', 120);
$verificationEmail = clean_text($data['verificationEmail'] ?? '', 200);
$biography = clean_text($data['biography'] ?? '', 1500);

if (!in_array($candidateName, $allowedCandidates, true)
    || !filter_var($verificationEmail, FILTER_VALIDATE_EMAIL)
    || mb_strlen($biography) < 40
    || ($data['consent'] ?? '') !== 'yes') {
    json_response(400, ['error' => 'Required candidate information is incomplete.']);
}

$clean = [];
foreach ($data as $key => $value) {
    if (!is_string($key) || !is_string($value)) {
        continue;
    }
    $max = str_starts_with($key, 'answer') ? 2500 : 1600;
    $clean[$key] = clean_text($value, $max);
}
$clean['candidateName'] = $candidateName;
$clean['verificationEmail'] = $verificationEmail;
$clean['biography'] = $biography;
$clean['consent'] = 'yes';

store_submission('candidate_submission', $clean);
json_response(201, ['ok' => true]);
