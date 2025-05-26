<?php
// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Sanitize input values
  $name = htmlspecialchars(strip_tags(trim($_POST["name"])));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $service = htmlspecialchars(strip_tags(trim($_POST["service"])));
  $message = htmlspecialchars(strip_tags(trim($_POST["message"])));

  // Validate required fields
  if (empty($name) || empty($email) || empty($service)) {
    http_response_code(400);
    echo "Please fill in all required fields.";
    exit;
  }

  // Set recipient email
  $to = "your@email.com"; // ← Replace with your email
  $subject = "New Contact Form Submission from $name";
  $headers = "From: $name <$email>\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  // Build the message
  $email_content = "Name: $name\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Service Requested: $service\n";
  $email_content .= "Comments:\n$message\n";

  // Send the email
  if (mail($to, $subject, $email_content, $headers)) {
    echo "<!DOCTYPE html>
      <html lang='en'>
      <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Message Sent</title>
        <link rel='stylesheet' href='style.css'>
      </head>
      <body>
        <main class='contact-form-section'>
          <h2>Message Sent</h2>
          <p>Thank you, $name. Your message has been successfully sent. I’ll be in touch shortly.</p>
        </main>
      </body>
      </html>";
  } else {
    http_response_code(500);
    echo "There was a problem sending your message.";
  }
} else {
  http_response_code(403);
  echo "There was a problem with your submission.";
}
?>