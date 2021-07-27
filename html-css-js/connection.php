<?php
session_start();

require_once("../html-css-js/utils/mangadb.php");
require("../html-css-js/utils/function.php");

if (!isset($_POST['log'], $_POST['pwd'])) {
    echo json_encode(['success' => false]);
    die();
}

$res = $db->query("SELECT id_User, passwd, last_name, first_name FROM users WHERE login = '{$_POST['log']}'");
$user = resultAsArray($res)[0];

if (password_verify($_POST['pwd'], $user['passwd'])) {
    $_SESSION['connected'] = true;
    $_SESSION['id_user'] = $user['id_User'];

    echo json_encode(['success' => true, 'user' => ['last_name' => $user['last_name'], 'first_name' => $user['first_name']]]);
} else {
    echo json_encode(['success' => false]);
}

?>