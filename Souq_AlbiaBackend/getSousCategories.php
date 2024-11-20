<?php
include("connexion.php");

$sql = "SELECT sc.id_sous_categorie , sc.nom, sc.id_categorie , sc.image FROM souscategorie sc";
$result = $conn->query($sql);

$souscategories = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['image'] = 'http://localhost/Souq_AlbiaBackend/' . $row['image'];
        $souscategories[] = $row;
    }
} else {
    echo "0 results";
}

$conn->close();

echo json_encode($souscategories);
?>
