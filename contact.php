<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "melih.cetinkaya.32@gmail.com";
    $subject = "Nouveau message de votre site";
    $body = "Nom: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
      echo "Message envoyé avec succès!";
    } else {
      echo "Erreur lors de l'envoi du message.";
    }
  }

ini_set('display_errors', 1);
error_reporting(E_ALL);
?>