<?php

require_once("../../html-css-js/utils/mangadb.php");
require("../../html-css-js/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT `character`.*, manga.name AS manga, race.name AS race FROM `character` INNER JOIN manga ON manga.id_Manga = `character`.Manga_id_Manga INNER JOIN race ON race.id_Race = `character`.Race_id_Race GROUP BY character.id_Character");
        $characters = resultAsArray($res);

        echo json_encode(["success" => true, "characters" => $characters]);
        break;

    case 'select_id':
        if (isset($method['id'])) {
            $res = $db->query("SELECT * FROM `character` WHERE id_Character = {$method['id']}");
            $character = resultAsArray($res)[0];

            echo json_encode(["success" => true, "character" => $character]);
        } else echo json_encode(["success" => false, "msg" => "L'id' du manga n'a pas été transmis"]);
        break;

    case 'insert':
        if (isset($method['firstname'], $method['birthday'], $method['age'], $method['race'], $method['manga'], $method['picture']) && trim($method['firstname']) != '' && trim($method['birthday']) != '' && trim($method['age']) != '' && trim($method['race']) != '' && trim($method['manga']) != '' && trim($method['picture']) != '') {
            $firstname = mysqli_real_escape_string($db, $method['firstname']);
            $birthday = mysqli_real_escape_string($db, $method['birthday']);
            $age = mysqli_real_escape_string($db, $method['age']);
            $race = mysqli_real_escape_string($db, $method['race']);
            $manga = mysqli_real_escape_string($db, $method['manga']);
            $picture = mysqli_real_escape_string($db, $method['picture']);
            $lastname = "NULL";
            $nickname = "NULL";
            $height = "NULL";
            $audio = "NULL";
            $desc = "NULL";

            if (isset($method['lastname'], $method['nickname'], $method['height'], $method['audio'], $method['desc']) && trim($method['lastname']) != '' && trim($method['nickname']) != '' && trim($method['height']) != '' && trim($method['audio']) != '' && trim($method['desc']) != '' ) {
                $lastname = "'" . mysqli_real_escape_string($db, $method['lastname']) . "'";
                $nickname = "'" . mysqli_real_escape_string($db, $method['nickname']) . "'";
                $height = "'" . mysqli_real_escape_string($db, $method['height']) . "'";
                $audio = "'" . mysqli_real_escape_string($db, $method['audio']) . "'";
                $desc = "'" . mysqli_real_escape_string($db, $method['desc']) . "'";
            }

            $sql = "INSERT INTO `character` (last_name, first_name, nickname, date_birth, age, height, voice, Race_id_Race, Manga_id_Manga, Image, description) VALUES ($lastname, '$firstname', $nickname, '$birthday', '$age', $height, $audio, '$race', '$manga', '$picture', $desc)";
            $db->query($sql);

            echo json_encode(["success" => true, "newid" => $db->insert_id]);
        } else echo json_encode(["success" => false, "msg" => "Une ou plusieurs données n'ont pas été transmis "]);
        break;

    case 'update':
        if (isset($method['firstname'], $method['birthday'], $method['age'], $method['race'], $method['manga'], $method['picture'], $method['id']) && trim($method['firstname']) != '' && trim($method['birthday']) != '' && trim($method['age']) != '' && trim($method['race']) != '' && trim($method['manga']) != '' && trim($method['picture']) != '') {
            $firstname = mysqli_real_escape_string($db, $method['firstname']);
            $birthday = mysqli_real_escape_string($db, $method['birthday']);
            $age = mysqli_real_escape_string($db, $method['age']);
            $race = mysqli_real_escape_string($db, $method['race']);
            $manga = mysqli_real_escape_string($db, $method['manga']);
            $picture = mysqli_real_escape_string($db, $method['picture']);
            $lastname = "NULL";
            $nickname = "NULL";
            $height = "NULL";
            $audio = "NULL";
            $desc = "NULL";

            if (isset($method['lastname']) && trim($method['lastname']) != '') $lastname = "'" . mysqli_real_escape_string($db, $method['lastname']) . "'";

            if (isset($method['nickname']) && trim($method['nickname']) != '') $nickname = "'" . mysqli_real_escape_string($db, $method['nickname']) . "'";

            if (isset($method['height']) && trim($method['height']) != '') $height = "'" . mysqli_real_escape_string($db, $method['height']) . "'";

            if (isset($method['audio']) && trim($method['audio']) != '') $audio = "'" . mysqli_real_escape_string($db, $method['audio']) . "'";

            if (isset($method['desc']) && trim($method['desc']) != '') $desc = "'" . mysqli_real_escape_string($db, $method['desc']) . "'";

            $sql = "UPDATE `character` SET last_name = $lastname, first_name = '$firstname', nickname = $nickname, date_birth = '$birthday', age = '$age', height = $height, voice = $audio, Race_id_Race = '$race', Manga_id_Manga = '$manga', Image = '$picture', description = $desc WHERE id_Character = {$method['id']}";
            $db->query($sql);

            echo json_encode(["success" => true]);
        } else echo json_encode(["success" => false, "msg" => "Une ou plusieurs données n'ont pas été transmise"]);
        break;

    case 'delete':
        if (isset($method['id'])) {
            $sql = "DELETE FROM `character` WHERE id_Character = {$method['id']}";
            $db->query($sql);
            
            echo json_encode(["success" => true]);
        } else echo json_encode(["success" => false, "msg" => "Erreur lors de la suppression"]);
        break;

    default:
        echo json_encode(["success" => false, "msg" => "Mauvais choix vérifiez votre requete"]);
        break;
        
}

?>