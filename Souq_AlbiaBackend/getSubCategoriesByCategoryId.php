<?php
include("connexion.php");
$categoryId = intval($_GET['categoryId']);

$sql = "SELECT * FROM souscategorie WHERE id_categorie = $categoryId";
$result = $conn->query($sql);

$subCategories = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['image'] = 'http://localhost/Souq_AlbiaBackend/' . $row['image'];
        $subCategories[] = $row;
    }
}

$conn->close();

echo json_encode($subCategories);
?>