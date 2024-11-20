<?php
include("connexion.php");

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', 1);

$expediteur_id = $_POST['expediteur_id'];
$destinataire_id = $_POST['destinataire_id'];
$contenu = $_POST['contenu'];
$dateEnvoi = date('Y-m-d H:i:s');

$file_name = null;
$file_url = null;

// File upload handling
if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    $file_name = $_FILES['file']['name'];
    $upload_directory = 'C:/wamp/www/Souq_AlbiaBackend/files/';
    $file_path = $upload_directory . basename($file_name);
    $file_url = 'files/' . basename($file_name);

    if (move_uploaded_file($_FILES['file']['tmp_name'], $file_path)) {
        $file_url = $conn->real_escape_string($file_url);
    } else {
        echo json_encode(["error" => "Failed to upload file."]);
        exit;
    }
}

// Prepare and execute SQL query
$stmt = $conn->prepare("INSERT INTO message (expediteur_id, destinataire_id, contenu, dateEnvoi, file_name, file_url) 
                         VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("iissss", $expediteur_id, $destinataire_id, $contenu, $dateEnvoi, $file_name, $file_url);

if ($stmt->execute()) {
    echo json_encode(["success" => "Message sent successfully!"]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
