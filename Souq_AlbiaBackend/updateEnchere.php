<?php
// Include your database connection file
include("connexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['id'])) {
    $id = $data['id'];
    $produit_id = $data['produit_id'];
    $dateDebut = $data['dateDebut'];
    $dateFin = $data['dateFin'];
    $prixDepart = $data['prixDepart'];
    $prixActuel = $data['prixActuel'];
    $id_sous_categorie = $data['id_sous_categorie'];
    $nombre_de_bids = $data['nombre_de_bids'];
    $acheteur_id = $data['acheteur_id'];
    $vendeur_id = $data['vendeur_id'];
    
    // Start transaction
    $conn->begin_transaction();

    try {
        // Update enchere table
        $sql = "UPDATE enchere SET produit_id=?, dateDebut=?, dateFin=?, prixDepart=?, prixActuel=?, id_sous_categorie=?, nombre_de_bids=?, acheteur_id=?, vendeur_id=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('issdiiiisi', $produit_id, $dateDebut, $dateFin, $prixDepart, $prixActuel, $id_sous_categorie, $nombre_de_bids, $acheteur_id, $vendeur_id, $id);

        if (!$stmt->execute()) {
            throw new Exception("Failed to update enchere");
        }
        
        // Update produit table
        $sql = "UPDATE produit SET nom=?, description=?, state=?, image=?, localisation=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sssssi', $data['nom'], $data['description'], $data['state'], $data['image'], $data['localisation'], $produit_id);

        if (!$stmt->execute()) {
            throw new Exception("Failed to update produit");
        }

        // Commit transaction
        $conn->commit();

        http_response_code(200);
        echo json_encode(['message' => 'Enchere and produit updated successfully']);
    } catch (Exception $e) {
        // Rollback transaction
        $conn->rollback();
        http_response_code(400);
        echo json_encode(['message' => $e->getMessage()]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid data']);
}

$conn->close();
?>
