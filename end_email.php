<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the message from the POST request
    $message = htmlspecialchars($_POST['message']); // Sanitize input

    // Email configuration
    $to = "vishantrathigurjar@gmailcom"; // Replace with your email address
    $subject = "New Message from Portfolio Contact Form";
    $headers = "From: noreply@vishantrathi.me"; // Replace with your domain

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Message could not be sent."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>