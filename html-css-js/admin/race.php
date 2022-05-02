<?php

require_once("../../html-css-js/utils/mangadb.php");
require("../../html-css-js/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT * FROM race");
        $races = resultAsArray($res);

        echo json_encode(["success" => true, "races" => $races]);
        break;

    case 'insert':
        if (isset($method['Name']) && trim($method['Name'])) {
            $Name = mysqli_real_escape_string($db, $method['Name']);
    
            $sql = "INSERT INTO race (name) VALUES ('$Name')";
            $db->query($sql);
    
            echo json_encode(["success" => true, "newid" => $db->insert_id]);
        } else echo json_encode(["success" => false, "msg" => "Erreur "]);
        break;

    case 'delete':
        if (isset($method['id'])) {
            $sql = "DELETE FROM race WHERE id_Race = {$method['id']}";
            $db->query($sql);
            
            echo json_encode(["success" => true]);
            } else echo json_encode(["success" => false, "msg" => "Erreur lors de la suppression"]);
            break;
}

?>