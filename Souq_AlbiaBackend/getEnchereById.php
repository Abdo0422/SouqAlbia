<?php

include("connexion.php");

$id = intval($_GET['id']);

$sql = "SELECT p.*, e.*, e.prixDepart as prixdepart,
    e.prixActuel as prixactuel,
    e.id_sous_categorie as id_sous_categorie,
    e.nombre_de_bids AS NumBids,
    CONCAT('http://localhost/Souq_AlbiaBackend/', p.image) AS image,
    u.nom AS vendeur_nom
    FROM enchere e
    LEFT JOIN produit p ON e.produit_id = p.id
    LEFT JOIN utilisateur u ON e.vendeur_id = u.id
    WHERE e.produit_id = $id";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['error' => 'Database query failed: ' . $conn->error]);
    $conn->close();
    exit();
}

$data = null;
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
} else {
    $data = ['error' => 'No records found for the given ID'];
}

echo json_encode($data);
$conn->close();

?>
