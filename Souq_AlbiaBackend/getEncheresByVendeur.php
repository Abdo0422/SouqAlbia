<?php
include("connexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $vendeur_id = isset($_GET['vendeur_id']) ? intval($_GET['vendeur_id']) : 0;

    if ($vendeur_id > 0) {
        $stmt = $conn->prepare("
            SELECT e.id AS id, e.status, e.dateDebut, e.dateFin, e.prixDepart as prixdepart, e.prixActuel as prixactuel, e.nombre_de_bids as NumBids, e.id_sous_categorie, 
                   p.nom AS produit_nom, p.description AS produit_description, CONCAT('http://localhost/Souq_AlbiaBackend/', p.image) AS image, p.state, 
                   p.localisation AS produit_localisation
            FROM enchere e
            JOIN produit p ON e.produit_id = p.id
            WHERE e.vendeur_id = ?
        ");
        $stmt->bind_param('i', $vendeur_id);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $encheres = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($encheres);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des enchères: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID de vendeur invalide']);
    }
}

$conn->close();
?>
