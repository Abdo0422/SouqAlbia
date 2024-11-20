<?php
// Include your database connection
include("connexion.php");

// Check if vendeurId is provided
if (!isset($_GET['vendeurId'])) {
    echo json_encode(['error' => 'Vendeur ID not provided']);
    exit;
}

$vendeurId = $_GET['vendeurId'];

// Debugging
error_log("Fetching payment notifications for vendeur ID: $vendeurId");

// SQL Query
$query = "
    SELECT 
        t.id AS transaction_id,
        t.montant,
        t.date,
        t.statut,
        e.id AS enchere_id,
        e.produit_id,
        e.prixActuel,
        e.nombre_de_bids,
        u_vendeur.nom AS vendeur_nom,
        u_vendeur.email AS vendeur_email,
        u_acheteur.nom AS acheteur_nom
    FROM 
        transaction t
    JOIN 
        enchere e ON t.acheteur_id = e.acheteur_id
    JOIN 
        utilisateur u_vendeur ON e.vendeur_id = u_vendeur.id
    JOIN 
        utilisateur u_acheteur ON t.acheteur_id = u_acheteur.id
    WHERE 
        e.vendeur_id = ? AND 
        t.statut = 'completed'  -- Filter for completed transactions
";

// Prepare Statement
$stmt = $conn->prepare($query);
if ($stmt === false) {
    error_log("SQL Prepare Error: " . $conn->error);
    echo json_encode(['error' => 'SQL Prepare Error: ' . $conn->error]);
    exit;
}

// Bind Parameters
$stmt->bind_param("i", $vendeurId);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    error_log("SQL Execute Error: " . $stmt->error);
    echo json_encode(['error' => 'SQL Execute Error']);
    exit;
}

// Fetch Notifications
$notifications = [];
while ($row = $result->fetch_assoc()) {
    $notifications[] = $row;
}

echo json_encode($notifications);
?>
