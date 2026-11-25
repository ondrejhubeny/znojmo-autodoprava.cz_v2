<?php
/**
 * Odesílání poptávkového formuláře přes SMTP (Active24.cz)
 * --------------------------------------------------------
 * Po nahrání webu na FTP u Active24 otevři tento soubor (send-mail.php)
 * a na řádku $smtp_pass doplň skutečné heslo ke schránce formular@znojmo-autodoprava.cz.
 */

header('Content-Type: application/json; charset=UTF-8');

// =========================================================================
// NASTAVENÍ E-MAILU A SMTP (Active24.cz)
// =========================================================================
$smtp_host = 'smtp.active24.cz';
$smtp_port = 465; // SSL port u Active24
$smtp_user = 'formular@znojmo-autodoprava.cz';
$smtp_pass = 'SEM_VLOZ_HESLO_NA_FTP'; // <-- Nebo vytvoř na FTP soubor smtp-heslo.php (viz níže)

// Pokud na FTP existuje soubor smtp-heslo.php, načte se heslo z něj
// (díky tomu se heslo nikdy nepřepíše při budoucím kopírování složky dist/ na FTP)
if (file_exists(__DIR__ . '/smtp-heslo.php')) {
    include __DIR__ . '/smtp-heslo.php';
}

$to_email  = 'petrchochola@seznam.cz';          // Hlavní příjemce poptávek
$bcc_email = 'formular@znojmo-autodoprava.cz';  // Záložní kopie každé poptávky zůstane ve schránce
$from_name = 'Znojmo Autodoprava - Web';
// =========================================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Povolen je pouze POST požadavek.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Antispam honeypot (pokud skryté pole vyplní robot, tiše ukončíme)
if (!empty($data['website'])) {
    echo json_encode(['success' => true, 'message' => 'Poptávka byla odeslána.']);
    exit;
}

$name    = trim((string)($data['name'] ?? ''));
$phone   = trim((string)($data['phone'] ?? ''));
$email   = trim((string)($data['email'] ?? ''));
$vehicle = trim((string)($data['vehicle'] ?? 'Neuvedeno'));
$from    = trim((string)($data['from'] ?? ''));
$to      = trim((string)($data['to'] ?? ''));
$date    = trim((string)($data['date'] ?? 'Neuvedeno'));
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || $phone === '' || $email === '' || $from === '' || $to === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Vyplňte prosím všechna povinná pole.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Zadejte prosím platnou e-mailovou adresu.']);
    exit;
}

$subject = "Nová poptávka přepravy: {$from} -> {$to} ({$name})";

$htmlBody = '<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; color: #1a1d23; line-height: 1.6; max-width: 620px; margin: 0 auto; padding: 20px;">
  <h2 style="margin-top: 0; color: #14161a; border-bottom: 2px solid #14161a; padding-bottom: 10px;">
    Nová poptávka z webu znojmo-autodoprava.cz
  </h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
    <tr>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 38%;">Jméno a příjmení:</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;">' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Telefon:</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;"><a href="tel:' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '">' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">E-mail zákazníka:</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Preferovaný vůz:</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;">' . htmlspecialchars($vehicle ?: 'Neuvedeno', ENT_QUOTES, 'UTF-8') . '</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Trasa (Odkud → Kam):</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;"><strong>' . htmlspecialchars($from, ENT_QUOTES, 'UTF-8') . ' → ' . htmlspecialchars($to, ENT_QUOTES, 'UTF-8') . '</strong></td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Datum a čas:</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;">' . htmlspecialchars($date ?: 'Neuvedeno', ENT_QUOTES, 'UTF-8') . '</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Poznámka / Zpráva:</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;">' . nl2br(htmlspecialchars($message ?: 'Bez poznámky', ENT_QUOTES, 'UTF-8')) . '</td>
    </tr>
  </table>
  <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
    Tip: Kliknutím na „Odpovědět“ ve vašem e-mailu odpovíte přímo zákazníkovi na adresu ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '.
  </p>
</body>
</html>';

/**
 * Funkce pro odeslání e-mailu přes SSL SMTP (smtp.active24.cz:465)
 */
function sendSmtpMail($host, $port, $user, $pass, $fromName, $to, $bcc, $replyTo, $replyName, $subject, $htmlBody, &$errorMsg) {
    $socket = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 15);
    if (!$socket) {
        $errorMsg = "Nelze se připojit k SMTP serveru: {$errstr} ({$errno})";
        return false;
    }

    $readResponse = function() use ($socket) {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    };

    $sendCmd = function($cmd, $expectedCode) use ($socket, $readResponse, &$errorMsg) {
        fwrite($socket, $cmd . "\r\n");
        $resp = $readResponse();
        if (strpos($resp, (string)$expectedCode) !== 0) {
            $errorMsg = "SMTP chyba: {$resp}";
            return false;
        }
        return true;
    };

    $readResponse(); // 220 banner
    $domain = $_SERVER['HTTP_HOST'] ?? 'znojmo-autodoprava.cz';

    if (!$sendCmd("EHLO {$domain}", 250)) { fclose($socket); return false; }
    if (!$sendCmd("AUTH LOGIN", 334)) { fclose($socket); return false; }
    if (!$sendCmd(base64_encode($user), 334)) { fclose($socket); return false; }
    if (!$sendCmd(base64_encode($pass), 235)) { fclose($socket); return false; }

    if (!$sendCmd("MAIL FROM:<{$user}>", 250)) { fclose($socket); return false; }
    if (!$sendCmd("RCPT TO:<{$to}>", 250)) { fclose($socket); return false; }
    if (!empty($bcc) && $bcc !== $to) {
        $sendCmd("RCPT TO:<{$bcc}>", 250);
    }

    if (!$sendCmd("DATA", 354)) { fclose($socket); return false; }

    $encodedSubject   = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encodedFromName  = '=?UTF-8?B?' . base64_encode($fromName) . '?=';
    $encodedReplyName = '=?UTF-8?B?' . base64_encode($replyName) . '?=';

    $headers = [
        "Date: " . date('r'),
        "From: {$encodedFromName} <{$user}>",
        "To: <{$to}>",
        "Reply-To: {$encodedReplyName} <{$replyTo}>",
        "Subject: {$encodedSubject}",
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "Content-Transfer-Encoding: base64",
        "X-Mailer: ZnojmoAutodopravaMailer/1.0"
    ];

    $dataPayload = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($htmlBody)) . "\r\n.";
    if (!$sendCmd($dataPayload, 250)) { fclose($socket); return false; }

    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return true;
}

$sent = false;
$errorMsg = '';

// Pokud je na FTP vyplněné heslo ke schránce, odešleme přes SMTP Active24
if ($smtp_pass !== '' && $smtp_pass !== 'SEM_VLOZ_HESLO_NA_FTP') {
    $sent = sendSmtpMail(
        $smtp_host,
        $smtp_port,
        $smtp_user,
        $smtp_pass,
        $from_name,
        $to_email,
        $bcc_email,
        $email,
        $name,
        $subject,
        $htmlBody,
        $errorMsg
    );
}

// Záložní odeslání přes interní PHP mail() na serveru Active24 (pokud by heslo nebylo vyplněné)
if (!$sent) {
    $encodedSubject  = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encodedFromName = '=?UTF-8?B?' . base64_encode($from_name) . '?=';
    $fallbackHeaders = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "From: {$encodedFromName} <{$smtp_user}>",
        "Reply-To: {$email}",
        "Bcc: {$bcc_email}"
    ];
    $sent = @mail($to_email, $encodedSubject, $htmlBody, implode("\r\n", $fallbackHeaders));
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Děkujeme! Vaše poptávka byla úspěšně odeslána.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Nepodařilo se odeslat e-mail. Zavolejte nám prosím přímo na +420 608 707 225.']);
}
