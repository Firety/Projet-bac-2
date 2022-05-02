<?php

require_once("../../Projet-bac-2/html-css-js/utils/mangadb.php");
require("../../Projet-bac-2/html-css-js/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'character':
        $res = $pdo->query("SELECT c.*, manga.name AS manga, manga.Logo AS logo, race.name AS race FROM `character` c INNER JOIN manga ON manga.id_Manga = c.Manga_id_Manga INNER JOIN race ON race.id_Race = c.Race_id_Race WHERE c.id_Character = {$method['id']}");
        $characters = resultAsArray($res);

        echo json_encode(["success" => true, "characters" => $characters]);
        break;
}

?>