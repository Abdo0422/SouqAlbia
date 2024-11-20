<?php

include("connexion.php");

$id = intval($_GET['id']);

$sql = "SELECT * FROM Categorie WHERE id_categorie = $id";
$result = $conn->query($sql);

$sousCategorie = null;
if ($result->num_rows > 0) {
    $sousCategorie = $result->fetch_assoc();
}

echo json_encode($sousCategorie);
$conn->close();

?>