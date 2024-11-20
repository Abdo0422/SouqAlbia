<?php

include("connexion.php");

// Enable error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$sql = "SELECT e.id,
       e.dateDebut,
       e.dateFin,
       e.produit_id,
       e.status,
       e.nombre_de_bids AS NumBids,
       e.prixDepart as prixdepart,
       e.prixActuel as prixactuel,
       e.id_sous_categorie as id_sous_categorie,
       p.nom AS nom,
       p.description AS description,
       p.state AS state,
       p.localisation AS localisation,
       CONCAT('http://localhost/Souq_AlbiaBackend/', p.image) AS image,
       u.nom AS vendeur_nom
FROM enchere e
JOIN produit p ON e.produit_id = p.id
LEFT JOIN vendeur v ON e.vendeur_id = v.id
LEFT JOIN utilisateur u ON v.id = u.id
";

try {
    $result = $conn->query($sql);

    if ($result) {
        $enchereData = array();

        while ($row = $result->fetch_assoc()) {
            $enchereData[] = $row;
        }

        echo json_encode($enchereData);
    } else {
        $error = array('error' => 'No results found');
        echo json_encode($error);
    }
} catch (Exception $e) {
    $error = array('error' => $e->getMessage());
    echo json_encode($error);
}

$conn->close();

?>
