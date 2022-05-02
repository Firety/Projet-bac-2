<?php

require_once("../../Projet-bac-2/html-css-js/utils/mangadb.php");
require("../../Projet-bac-2/html-css-js/utils/function.php");


$regex = '/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{5,10})/'; // Au moins huit caractères, au moins une lettre, un chiffre et un caractère spécial 

if (isset($_POST['lastname'],$_POST['firstname'],$_POST['birth'],$_POST['mail'],$_POST['log'], $_POST['pwd'])) {


    if (preg_match($regex, $_POST['pwd'])) {
        $passwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (last_name, first_name, date_birth, email, login, passwd) VALUES (:lastname, :firstname, :birth, :mail, :log, :pwd)";
        $req = $pdo->prepare($sql);
        $req->bindValue(':lastname', $_POST['lastname']);
        $req->bindValue(':firstname', $_POST['firstname']);
        $req->bindValue(':birth', $_POST['birth']);
        $req->bindValue(':mail', $_POST['mail']);
        $req->bindValue(':log', $_POST['log']);
        $req->bindValue(':pwd', $passwd);
        $req->execute();

        echo json_encode(['success' => true]);
    } else echo json_encode(['success' => false]);
    
}

?>