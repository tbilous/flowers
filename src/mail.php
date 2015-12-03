<?php

$recepient = "tbilous@gmail.com";
$sitename = "Flowers Iris";


//$comment = trim($_POST["comment"]);
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$manifest = trim($_POST["manifest"]);
$message = "Name: $name \nPhone: $phone \nManifestt: $manifest";

$pagetitle = "New request from \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
