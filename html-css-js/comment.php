<?php

session_start();

require_once("../../Projet-bac-2/html-css-js/utils/mangadb.php");
require("../../Projet-bac-2/html-css-js/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT comment.*, users.first_name AS prenom FROM comment INNER JOIN users ON users.id_User = Users_id_User WHERE Character_id_Character = '{$method['character_id']}'");
        $comments = resultAsArray($res);

        echo json_encode(["success" => true, "comments" => $comments]);
        break;

    case 'insert':
        if (isset($method['date_comment'], $method['note'], $method['comment_user']) && trim($method['comment_user']) != '')   {
            $date_comment = mysqli_real_escape_string($db, $method['date_comment']);
            $note = mysqli_real_escape_string($db, $method['note']);
            $comment_user = mysqli_real_escape_string($db, $method['comment_user']);

            $sql = "INSERT INTO comment (date, note, content, Users_id_User, Character_id_Character) VALUES ('$date_comment','$note','$comment_user','{$_SESSION['id_user']}', '{$method['character_id']}' )";
            $db->query($sql);

            echo json_encode(["success" => true, "newid" => $db->insert_id]);
        } else echo json_encode(["success" => false, "msg" => "Le nom ou la description du manga n'a pas été transmis"]);
        break;
}

?>