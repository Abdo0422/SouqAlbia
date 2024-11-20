<?php
include("connexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['userId'];

    $sql = "SELECT * FROM message WHERE expediteur_id = ? OR destinataire_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $userId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    echo json_encode($messages);
}
?>
