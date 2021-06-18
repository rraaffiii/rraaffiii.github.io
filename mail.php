<?php
header('Content-type: application/json; charset=UTF-8');

// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo '{"sent":"negative"}';
   }
	
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$message = strip_tags(htmlspecialchars($_POST['message']));
	
// Create the email and send the message
$to = 'r89898@gmail.com'; 
$email_subject = "Portfolio Contact:  $name";
$email_body = "New message from portfolio website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";
$headers = "From: noreply@portfolio-raf.cf\n"; 
$headers .= "Reply-To: $email_address";	
$mailSent = mail($to,$email_subject,$email_body,$headers);

$mailSent = mail($to,$email_subject,$email_body,$headers);
if($mailSent){
   echo '{"sent":"positive"}';
}else {
   echo '{"sent":"negative"}';
}
?>
