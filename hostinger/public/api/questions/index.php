<?php
declare(strict_types=1);

require dirname(__DIR__, 3) . '/private/bootstrap.php';

require_post();
$data = request_json(10000);
reject_bot($data);

$question = clean_text($data['question'] ?? '', 600);
$name = clean_text($data['name'] ?? '', 100);
$email = clean_text($data['email'] ?? '', 200);

if (mb_strlen($question) < 10 || ($data['consent'] ?? '') !== 'yes') {
    json_response(400, ['error' => 'A question and consent are required.']);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(400, ['error' => 'Please enter a valid email address.']);
}

store_submission('community_question', [
    'question' => $question,
    'name' => $name,
    'email' => $email,
    'consent' => 'yes',
]);

json_response(201, ['ok' => true]);
