<?php
include("connexion.php");

$input = json_decode(file_get_contents('php://input'), true);

$montant = $input['montant'];
$statut = $input['statut'];
$acheteur_id = $input['acheteur_id'];
$vendeur_id = $input['vendeur_id'];
$transaction_id = $input['transactionId'];
$date = date('Y-m-d');

$sql = "INSERT INTO transaction (montant, date, statut, acheteur_id, vendeur_id) VALUES ('$montant', '$date', '$statut', '$acheteur_id', '$vendeur_id')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
