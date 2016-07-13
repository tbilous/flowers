<?php

if (isset($_POST['name'])&&($_POST['phone'])){
		$name = $_POST['name'];
		$tel = $_POST['phone'];

		require_once('./PHPMailer-master/class.phpmailer.php');




$mail             = new PHPMailer();

	$body             = 'Добрый день Станислав. Меня зовут '.$name.' ,я из Киева . Перезвоните мне на номер: '.$tel.'.  Спасибо!';

$mail->IsSendmail(); // telling the class to use SMTP
$mail->Host       = "smtp.gmail.com"; // SMTP server
$mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
                                           // 1 = errors and messages
                                           // 2 = messages only
$mail->CharSet = "UTF-8";
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->SMTPSecure = "tsl ";                 // sets the prefix to the servier
$mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
$mail->Port       = 25;                   // set the SMTP port for the GMAIL server
$mail->Username   = "djonpiece2@gmail.com";  // GMAIL username
$mail->Password   = "eos400dkit";            // GMAIL password

$mail->SetFrom('eosgreen@irisflowers.in.ua', 'irisflowers.in.ua');

$mail->Subject    = "Обратный звонок";

$mail->MsgHTML($body);

$address = "Iris_flowers@mail.ru";
$mail->AddAddress($address, "Станислав");



if(!$mail->Send()) {
  echo "Mailer Error: " . $mail->ErrorInfo;
} else {
  echo "Message sent!";
}

}


?>