<?php
/**
 * Apache: Yandex Metrika page hit under COEP require-corp (same body as Vercel api/metrika/pageview).
 * Set counter id on the server: SetEnv APP_METRIKA_ID "12345678" (or METRIKA_ID) in the vhost / .htaccess + mod_setenvif if available.
 */
declare(strict_types=1);

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	http_response_code(204);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	echo 'method not allowed';
	exit;
}

$counterId = getenv('APP_METRIKA_ID') ?: getenv('METRIKA_ID');
$counterId = is_string($counterId) ? trim($counterId) : '';
if ($counterId === '' || !preg_match('/^\d+$/', $counterId)) {
	http_response_code(204);
	exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
	http_response_code(400);
	echo 'empty body';
	exit;
}

$data = json_decode($raw, true);
if (!is_array($data) || !isset($data['pageUrl']) || !is_string($data['pageUrl'])) {
	http_response_code(400);
	echo 'pageUrl required';
	exit;
}

$pageUrlStr = $data['pageUrl'];
$parts = parse_url($pageUrlStr);
if ($parts === false || !isset($parts['host'])) {
	http_response_code(400);
	echo 'invalid pageUrl';
	exit;
}

$hostHeader = $_SERVER['HTTP_HOST'] ?? '';
$parsedRequest = @parse_url('https://' . $hostHeader);
$requestHost =
	is_array($parsedRequest) && isset($parsedRequest['host'])
		? strtolower((string) $parsedRequest['host'])
		: '';
$pageHost = strtolower((string) $parts['host']);
if ($hostHeader === '' || $requestHost === '' || $pageHost !== $requestHost) {
	http_response_code(403);
	echo 'host mismatch';
	exit;
}

$mcUrl =
	'https://mc.yandex.ru/watch/' .
	rawurlencode($counterId) .
	'?page-url=' .
	rawurlencode($pageUrlStr) .
	'&charset=utf-8';

$ua = isset($_SERVER['HTTP_USER_AGENT']) && is_string($_SERVER['HTTP_USER_AGENT'])
	? $_SERVER['HTTP_USER_AGENT']
	: 'ArkhamDivider';

$ctx = stream_context_create([
	'http' => [
		'method' => 'GET',
		'header' => "User-Agent: {$ua}\r\nReferer: {$pageUrlStr}\r\n",
		'timeout' => 5,
		'ignore_errors' => true,
	],
]);

$result = @file_get_contents($mcUrl, false, $ctx);
if ($result === false) {
	http_response_code(502);
	echo 'metrika upstream failed';
	exit;
}

http_response_code(204);
