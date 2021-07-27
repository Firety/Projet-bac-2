<?php

require_once("../../Projet-bac-2/html-css-js/utils/mangadb.php");
require("../../Projet-bac-2/html-css-js/utils/function.php");

$pwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT);

if (isset($_POST['lastname'],$_POST['firstname'],$_POST['birth'],$_POST['mail'],$_POST['log'],$_POST['pwd'])) {
    $sql = "INSERT INTO users (last_name, first_name, date_birth, email, login, passwd) VALUES ('{$_POST['lastname']}', '{$_POST['firstname']}', '{$_POST['birth']}', '{$_POST['mail']}', '{$_POST['log']}', '{$pwd}')";
    $db->query($sql);
    echo json_encode(['success' => true]);
}else echo json_encode(['success' => false]);

?>