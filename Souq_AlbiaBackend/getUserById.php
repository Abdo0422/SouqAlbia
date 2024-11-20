<?php
include 'connexion.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid user ID"]);
    exit();
}

$query = "SELECT id, nom, email, addresse, telephone, RegistrationDate FROM utilisateur WHERE id = $id";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    http_response_code(404);
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
