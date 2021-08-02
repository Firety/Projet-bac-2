<?php

require_once("../../html-css-js/utils/mangadb.php");
require("../../html-css-js/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'select':
        $res = $db->query("SELECT * FROM manga");
        $mangas = resultAsArray($res);

        echo json_encode(["success" => true, "mangas" => $mangas]);
        break;

    case 'select_id':
        if (isset($method['id'])) {
            $res = $db->query("SELECT * FROM manga WHERE id_Manga = {$method['id']}");
            $manga = resultAsArray($res)[0];
    
            echo json_encode(["success" => true, "manga" => $manga]);
        } else echo json_encode(["success" => false, "msg" => "L'id' du manga n'a pas été transmis"]);
        break;
    
    case 'insert':
        if (isset($method['name_manga'], $method['logo_manga'], $method['author'], $method['release'], $method['episodes'], $method['resume']) && trim($method['name_manga']) != '' && trim($method['logo_manga']) != '' && trim($method['author']) != '' && trim($method['release']) != '' && trim($method['episodes']) != '' && trim($method['resume']) != '') {
            $name_manga = mysqli_real_escape_string($db, $method['name_manga']);
            $logo_manga = mysqli_real_escape_string($db, $method['logo_manga']);
            $author = mysqli_real_escape_string($db, $method['author']);
            $release = mysqli_real_escape_string($db, $method['release']);
            $episodes = mysqli_real_escape_string($db, $method['episodes']);
            $resume = mysqli_real_escape_string($db, $method['resume']);
        
            $sql = "INSERT INTO manga (name, Logo, author , release_date, number_episodes, summary) VALUES('$name_manga','$logo_manga','$author','$release','$episodes','$resume')";
            $db->query($sql);
        
            echo json_encode(["success" => true, "newid" => $db->insert_id]);
        } else echo json_encode(["success" => false, "msg" => "Le nom ou la description du manga n'a pas été transmis"]);
        break;
        
    case 'update':
        if (isset($method['name_manga'], $method['logo_manga'], $method['author'], $method['release'], $method['episodes'], $method['resume'] , $method['id']) && trim($method['name_manga']) != '' && trim($method['logo_manga']) != '' && trim($method['author']) != '' && trim($method['release']) != '' && trim($method['episodes']) != '' && trim($method['resume']) != '') {
            $name_manga = mysqli_real_escape_string($db, $method['name_manga']);
            $logo_manga = mysqli_real_escape_string($db, $method['logo_manga']);
            $author = mysqli_real_escape_string($db, $method['author']);
            $release = mysqli_real_escape_string($db, $method['release']);
            $episodes = mysqli_real_escape_string($db, $method['episodes']);
            $resume = mysqli_real_escape_string($db, $method['resume']);
        
            $sql = "UPDATE manga SET name = '$name_manga', Logo = '$logo_manga', author = '$author', release_date = '$release', number_episodes = '$episodes', summary = '$resume' WHERE id_Manga = {$method['id']}";
            $db->query($sql);
        
            echo json_encode(["success" => true , 'sql' => $sql]);
        } else echo json_encode(["success" => false, "msg" => "Une ou plusieurs données n'ont pas été transmis "]);
        break;

    case 'delete':
        if (isset($method['id'])) {
            $sql = "DELETE FROM manga WHERE id_Manga = {$method['id']}";
            $db->query($sql);
            echo json_encode(["success" => true]);
        } else echo json_encode(["success" => false, "msg" => "Erreur lors de la suppression"]);
        break;

    default:
        echo json_encode(["success" => false, "msg" => "Mauvais choix vérifiez votre requete"]);
        break;

}

?>