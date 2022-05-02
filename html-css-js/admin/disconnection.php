<?php

session_start();
require_once("../../html-css-js/utils/mangadb.php");

$_SESSION['connected']= false;
unset($_SESSION['id_user']);

echo json_encode(['success' => true]);

?>