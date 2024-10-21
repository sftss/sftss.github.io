<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['firstName']);
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "tasdemir.sefer74@gmail.com";
    $subject = "NEW message du portfolio";
    $body = "Prénom: $firstName\nNom: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
      echo "Message envoyé 📧";
    } else {
      echo "Erreur lors de l'envoi du message.";
    }
  }

ini_set('display_errors', 1);
error_reporting(E_ALL);
?>