<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $captchaResponse = $_POST['g-recaptcha-response'];

    // Clé de site et Clé API de votre projet Google reCAPTCHA Enterprise
    $siteKey = "6LejqG4qAAAAABlIzVJGqdeXY1jM40vidOhODuit";
    $apiKey = "6LejqG4qAAAAABlIzVJGqdeXY1jM40vidOhODuit"; // Remplacez par votre clé API

    $requestBody = json_encode([
        "event" => [
            "token" => $captchaResponse,
            "expectedAction" => "submit",
            "siteKey" => $siteKey
        ]
    ]);

    // URL API reCAPTCHA
    $url = "https://recaptchaenterprise.googleapis.com/v1/projects/$siteKey/assessments?key=$apiKey";

    // Options de la requête HTTP POST
    $options = [
        "http" => [
            "header"  => "Content-type: application/json\r\n",
            "method"  => "POST",
            "content" => $requestBody
        ]
    ];
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $responseKeys = json_decode($response, true);

    // Vérification
    if ($responseKeys["tokenProperties"]["valid"] && $responseKeys["riskAnalysis"]["score"] > 0.5) {
        // envoyer email score > 0.5
        $to = "tasdemir.sefer74@gmail.com";
        $subject = "Nouveau message du portfolio";
        $body = "Nom et prénom: $name\nEmail: $email\nMessage:\n$message";
        $headers = "From: $email";
}

ini_set('display_errors', 1);
error_reporting(E_ALL);
?>
