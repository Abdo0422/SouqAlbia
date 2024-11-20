<?php

include("connexion.php");
$id = intval($_GET['id']);

$sql = "SELECT * FROM enchere WHERE id_sous_categorie = $id";
$result = $conn->query($sql);

$items = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
}

echo json_encode($items);
$conn->close();
?>