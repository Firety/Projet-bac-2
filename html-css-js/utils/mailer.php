<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require("../vendor/autoload.php");

function mailer($to, $subject, $body)
{
    $mail = new PHPMailer();

    try {
        $mail->IsSMTP();
        $mail->SMTPDebug = 0;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'ssl';
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465;
        $mail->Username = 'mangaproject@gmail.com'; // MAIL
        $mail->Password = 'mangap'; // PASSWORD
        $mail->SetFrom('mangaproject@gmail.com', 'Un simple bot'); // MAIL + Alias
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AddAddress($to);

        $mail->send();
        //echo "Mail envoyé";
    } catch (Exception $e) {
        echo "error: $e";
    }
}