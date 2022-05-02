<?php
session_start();

require_once("../html-css-js/utils/mangadb.php");
require("../html-css-js/utils/function.php");

$res = $pdo->query("SELECT * FROM manga");
$mangas = resultAsArray($res);


echo json_encode(["success" => true, "mangas" => $mangas])

?>

