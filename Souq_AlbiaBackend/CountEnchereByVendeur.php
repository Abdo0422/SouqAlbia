<?php
include("connexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $vendeur_id = isset($_GET['vendeur_id']) ? intval($_GET['vendeur_id']) : 0;

    if ($vendeur_id > 0) {
        $stmt = $conn->prepare("
            SELECT 
                COUNT(CASE WHEN e.dateFin > NOW() THEN 1 END) AS disponibles,
                COUNT(CASE WHEN e.dateFin <= NOW() AND e.prixActuel IS NOT NULL THEN 1 END) AS conclu,
                COUNT(CASE WHEN e.dateFin <= NOW() AND e.prixActuel IS NULL THEN 1 END) AS en_attente
            FROM enchere e
            WHERE e.vendeur_id = ?
        ");
        $stmt->bind_param('i', $vendeur_id);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $counts = $result->fetch_assoc();
            echo json_encode($counts);
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
