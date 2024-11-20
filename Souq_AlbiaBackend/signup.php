<?php

include("connexion.php");

// Get the input data
$data = json_decode(file_get_contents("php://input"));

$username = $data->nom;
$password = password_hash($data->password, PASSWORD_BCRYPT);
$email = $data->email;
$address = $data->addresse;
$phone = $data->telephone;

// Prepare and execute the insert query for the utilisateur table
$query = "INSERT INTO utilisateur (nom, password, email, addresse, telephone, RegistrationDate) 
          VALUES (?, ?, ?, ?, ?, NOW())";
$stmt = $conn->prepare($query);
$stmt->bind_param('sssss', $username, $password, $email, $address, $phone);

if ($stmt->execute()) {
    // Get the last inserted ID
    $userId = $stmt->insert_id;
    
    // Insert the same ID into vendeur and acheteur tables
    $insertVendeur = "INSERT INTO vendeur (id) VALUES (?)";
    $insertAcheteur = "INSERT INTO acheteur (id) VALUES (?)";
    
    $stmtVendeur = $conn->prepare($insertVendeur);
    $stmtAcheteur = $conn->prepare($insertAcheteur);
    
    $stmtVendeur->bind_param('i', $userId);
    $stmtAcheteur->bind_param('i', $userId);
    
    $stmtVendeur->execute();
    $stmtAcheteur->execute();
    
    // Check for errors
    if ($stmtVendeur->error || $stmtAcheteur->error) {
        echo json_encode(['message' => 'User registered but failed to insert into vendeur or acheteur']);
    } else {
        echo json_encode(['message' => 'User registered successfully']);
    }
    
    $stmtVendeur->close();
    $stmtAcheteur->close();
} else {
    echo json_encode(['message' => 'Failed to register user: ' . $stmt->error]);
}

$stmt->close();
$conn->close();

?>
