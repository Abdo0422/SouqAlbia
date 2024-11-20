<?php

include("connexion.php");

$data = json_decode(file_get_contents('php://input'), true);

$address = $data['address'];
$paymentMethod = $data['paymentMethod'];
$cardNumber = $data['cardNumber'];
$expiryDate = $data['expiryDate'];
$cvv = $data['cvv'];
$userId = $data['userId'];
$vendeurID = $data['vendeurID'];
$amount = $data['amount'];
$enchereID = $data['enchereID']; // Extract enchere_id from input data

// Example transaction processing logic
$transactionStatus = 'Completed'; // Change based on actual payment gateway response

// Ensure vendeurID exists in the vendeur table
$checkVendorSql = "SELECT id FROM vendeur WHERE id = ?";
$checkVendorStmt = $conn->prepare($checkVendorSql);
$checkVendorStmt->bind_param("i", $vendeurID);
$checkVendorStmt->execute();
$checkVendorStmt->store_result();

if ($checkVendorStmt->num_rows == 0) {
    echo json_encode(['success' => false, 'error' => 'Invalid vendeurID']);
    $checkVendorStmt->close();
    $conn->close();
    exit();
}
$checkVendorStmt->close();

// Insert transaction into the database, including enchere_id
$sql = "INSERT INTO transaction (montant, date, statut, acheteur_id, vendeur_id, payment_method, enchere_id) VALUES (?, CURDATE(), ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Adjust the types of the bind_param placeholders to match your data
$stmt->bind_param("dssisi", $amount, $transactionStatus, $userId, $vendeurID, $paymentMethod, $enchereID);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
