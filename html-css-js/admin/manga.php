<?php

require_once("../../html-css-js/utils/mangadb.php");
require("../../html-css-js/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT * FROM manga");
        $mangas = resultAsArray($res);

        echo json_encode(["success" => true, "mangas" => $mangas]);
        break;
    
    case 'insert':
        if (isset($method['name_manga'], $method['logo_manga'], $method['author'], $method['release'], $method['episodes'], $method['resume']) && trim($method['name_manga']) != '' && trim($method['logo_manga']) != '' && trim($method['author']) != '' && trim($method['release']) != '' && trim($method['episodes']) != '' && trim($method['resume']) != '') {

        
            $sql = "INSERT INTO manga (name, Logo, author , release_date, number_episodes, summary) VALUES (:name_manga, :logo_manga, :author, :release, :episodes, :resume)";
            $req = $pdo->prepare($sql);
            $req->bindValue(':name_manga', $method['name_manga']);
            $req->bindValue(':logo_manga', $method['logo_manga']);
            $req->bindValue(':author', $method['author']);
            $req->bindValue(':release', $method['release']);
            $req->bindValue(':episodes', $method['episodes']);
            $req->bindValue(':resume', $method['resume']);
            $req->execute();
        
            echo json_encode(["success" => true, "newid" => $pdo->insert_id]);
        } else echo json_encode(["success" => false, "msg" => "Le nom ou la description du manga n'a pas été transmis"]);
        break;

    case 'select_id':
        if (isset($method['id'])) {
            $res = $pdo->query("SELECT * FROM manga WHERE id_Manga = {$method['id']}");
            $manga = resultAsArray($res)[0];
        
            echo json_encode(["success" => true, "manga" => $manga]);
        } else echo json_encode(["success" => false, "msg" => "L'id' du manga n'a pas été transmis"]);
        break;
        
    case 'update':
        if (isset($method['name_manga'], $method['logo_manga'], $method['author'], $method['release'], $method['episodes'], $method['resume'] , $method['id']) && trim($method['name_manga']) != '' && trim($method['logo_manga']) != '' && trim($method['author']) != '' && trim($method['release']) != '' && trim($method['episodes']) != '' && trim($method['resume']) != '') {
            
        
            $sql = "UPDATE manga SET name = :name_manga , Logo = :logo_manga, author = :author, release_date = :release, number_episodes = :episodes, summary = :resume WHERE id_Manga = {$method['id']}";
            $pdo->query($sql);
            $req = $pdo->prepare($sql);
            $req->bindValue(':name_manga', $method['name_manga']);
            $req->bindValue(':logo_manga', $method['logo_manga']);
            $req->bindValue(':author', $method['author']);
            $req->bindValue(':release', $method['release']);
            $req->bindValue(':episodes', $method['episodes']);
            $req->bindValue(':resume', $method['resume']);
            $req->execute();
        
            echo json_encode(["success" => true , 'sql' => $sql]);
        } else echo json_encode(["success" => false, "msg" => "Une ou plusieurs données n'ont pas été transmise "]);
        break;

    case 'delete':
        if (isset($method['id'])) {
            $sql = "DELETE FROM manga WHERE id_Manga = {$method['id']}";
            $pdo->query($sql);
            echo json_encode(["success" => true]);
        } else echo json_encode(["success" => false, "msg" => "Erreur lors de la suppression"]);
        break;

    default:
        echo json_encode(["success" => false, "msg" => "Mauvais choix vérifiez votre requete"]);
        break;

}

?>