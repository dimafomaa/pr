<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Проверяем, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Задаем переменные для данных из формы
    if (!empty($_POST['name'])) {
        $name = "Ім\'я: <b>". $_POST['name'] ."</b><br>";
    }
    if (!empty($_POST['tel'])) {
        $tel = "Телефон: <b>". $_POST['tel'] ."</b><br>";
    }
    if (!empty($_POST['message'])) {
        $email = "Пошта: <b>". $_POST['email'] ."</b><br>";
    }
    if (!empty($_POST['formData'])) {
        $formData = "Назва форми: <b>". $_POST['formData'] ."</b><br>";
    }
    

    // Создаем новый объект PHPMailer
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('uk', 'PHPMailer/language/');
    $mail->IsHTML(true);

    // Настройки SMTP
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'ibkprofi@gmail.com';
    $mail->Password = 'uvrgruaozhzqhuvw';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // От кого письмо
    $mail->setFrom('ibkprofi@gmail.com', 'ibkprofi');

    // Кому письмо
    $mail->addAddress('ibkprofi@gmail.com', 'ibkprofi');

    // Тема письма
    $mail->Subject = 'Заявка з сайту ibkprofi';

    // Тело письма
    $mail->Body = '<strong><h1> '.$_POST['formData'].' </h1></strong>' . '<p><strong><h3>Чудово, хтось залишив заявку на Вашому сайті</h3></strong></p>' . '<p><strong>Ім\'я:</strong> '.$_POST['name'].' </p>' . '<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>' . '<p><strong>Пошта:</strong> '.$_POST['email'].'</p>';
    

    // Отправляем письмо
    if ($mail->send()) {
        // Если письмо отправлено успешно, то выводим сообщение об успехе
        echo 'Ваше повідомлення надіслане!';
    } else {
        // Если произошла ошибка при отправке, то выводим сообщение об ошибке
        echo 'Виникла помилка, сбробуй ще раз :) : ' . $mail->ErrorInfo;
    }
}
?>
