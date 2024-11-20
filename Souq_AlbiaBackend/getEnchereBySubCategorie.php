<?php
include("connexion.php");

// Set header to indicate JSON response
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_sous_categorie = isset($_GET['id_sous_categorie']) ? intval($_GET['id_sous_categorie']) : 0;

    if ($id_sous_categorie > 0) {
        $stmt = $conn->prepare("SELECT e.id AS enchere_id, e.dateDebut, e.dateFin, e.prixDepart as prixdepart, e.status, e.prixActuel as prixactuel, e.nombre_de_bids as NumBids, e.id_sous_categorie, e.produit_id,
                   p.nom, p.description , CONCAT('http://localhost/Souq_AlbiaBackend/', p.image) AS image, p.state, 
                   p.localisation AS produit_localisation
            FROM enchere e
            JOIN produit p ON e.produit_id = p.id
            WHERE e.id_sous_categorie = ?
        ");
        
        if ($stmt === false) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erreur lors de la préparation de la requête SQL']);
            exit();
        }

        $stmt->bind_param('i', $id_sous_categorie);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $encheres = $result->fetch_all(MYSQLI_ASSOC);

            if (empty($encheres)) {
                echo json_encode(['success' => true, 'message' => 'Aucune enchère trouvée', 'data' => []]);
            } else {
                // Shuffle the array to randomize the order
                shuffle($encheres);

                // Slice the array to get only the first 3 encheres
                $randomEncheres = array_slice($encheres, 0, 3);

                echo json_encode(['success' => true, 'data' => $randomEncheres]);
            }
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des enchères: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID de id_sous_categorie invalide']);
    }
}

$conn->close();
?>
