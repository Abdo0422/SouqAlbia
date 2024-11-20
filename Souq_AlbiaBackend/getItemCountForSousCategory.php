<?php
include("connexion.php");

$sousCategoryId = intval($_GET['sousCategoryId']);

$sql = "SELECT COUNT(*) AS item_count FROM enchere WHERE id_sous_categorie = $sousCategoryId";
$result = $conn->query($sql);

$itemCount = 0;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $itemCount = intval($row['item_count']);
}

echo json_encode($itemCount);
$conn->close();
?>
