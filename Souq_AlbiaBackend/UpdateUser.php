<?php
include 'connexion.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "User ID required"]);
    exit();
}

$id = intval($data['id']);
$nom = $conn->real_escape_string($data['nom']);
$email = $conn->real_escape_string($data['email']);
$addresse = $conn->real_escape_string($data['addresse']);
$telephone = $conn->real_escape_string($data['telephone']);
$registrationDate = $conn->real_escape_string($data['RegistrationDate']);

$query = "UPDATE utilisateur SET nom='$nom', email='$email', addresse='$addresse', telephone='$telephone', RegistrationDate='$registrationDate' WHERE id=$id";

if ($conn->query($query) === TRUE) {
    echo json_encode($data);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to update user"]);
}

$conn->close();
?>
