<?php
// Файлы phpmailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'php/Exception.php';
require 'php/PHPMailer.php';
require 'php/SMTP.php';
// Переменные
$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$email = 'reklamatime.od.ua@gmail.com';
// Настройки
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;

$mail->Host = 'ssl://smtp.gmail.com';
$mail->Port = 465;
$mail->Username = 'reklamaodssl@gmail.com';
$mail->Password = 'rolled53-why';
$mail->SMTPSecure = 'ssl';
// От кого
$mail->setFrom($email, 'Заявка с сайта');

// Кому
$mail->addAddress('sergromanenko97@gmail.com');

// Тема письма
$mail->isHTML(true);
$mail->Subject = 'Заявка с сайта';

// Тело письма
$body = 'Имя: ' . $name . '</br>';
$body .= 'Номер телефона: ' . $phone . '</br>';
$body .= 'Сообщение: ' . $message;
$mail->msgHTML($body);


$mail->send();
?>
