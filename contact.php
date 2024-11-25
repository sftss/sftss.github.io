<?php
// $dotenv = Dotenv::createImmutable(__DIR__);
// $dotenv->load();

// $siteKey = getenv('SITE_KEY');
// $apiKey = getenv('API_KEY'); 

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $name = htmlspecialchars($_POST['name']);
//     $email = htmlspecialchars($_POST['email']);
//     $message = htmlspecialchars($_POST['message']);
//     $token = $_POST['g-recaptcha-response']; //récupère jeton

//     $apiUrl = "https://recaptchaenterprise.googleapis.com/v1/projects/portfolio-1730133266651/assessments?key=$apiKey";

//     //request.json équivalent
//     $requestBody = json_encode([
//         "event" => [
//             "token" => $token,
//             "expectedAction" => "submit",
//             "siteKey" => $siteKey 
//         ]
//     ]);

//     $options = [
//         "http" => [
//             "header" => "Content-type: application/json\r\n",
//             "method" => "POST",
//             "content" => $requestBody
//         ]
//     ];
//     $context = stream_context_create($options);
//     $response = file_get_contents($apiUrl, false, $context);
//     $responseData = json_decode($response, true);

//     //check jeton
//     if (isset($responseData['tokenProperties']['valid']) && $responseData['tokenProperties']['valid']) {
//         $score = $responseData['riskAnalysis']['score'];
//     }
//         //check score
//         if ($score >= 0.5) {
//             $to = "tasdemir.sefer74@gmail.com";
//             $subject = "Nouveau message du portfolio";
//             $body = "Nom et prénom: $name\nEmail: $email\nMessage:\n$message";
//             $headers = "From: $email";
// }
?>
