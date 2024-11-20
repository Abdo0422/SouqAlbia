<?php

include("connexion.php");

$sql = "SELECT c.id_categorie, c.nom , c.image , c.description FROM Categorie c";
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        $row['image'] = 'http://localhost/Souq_AlbiaBackend/' . $row['image'];
        $products[] = $row;
    }

} else {
    echo "0 results";
}

$conn->close();

echo json_encode($products);
?>
