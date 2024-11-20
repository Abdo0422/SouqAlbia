
<?php
include("connexion.php");

$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;

$sql = "SELECT * FROM souscategorie WHERE id_categorie = $category_id";
$result = $conn->query($sql);

$sousCategories = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $sousCategories[] = $row;
    }
} else {
    echo "0 results";
}

$conn->close();

echo json_encode($sousCategories);
?>
