<?php
include("connexion.php");

$data = json_decode(file_get_contents("php://input"));
$enchere_id = $data->id;

$sql = "UPDATE enchere SET status = 'inactive' WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $enchere_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Auction stopped"]);
} else {
    echo json_encode(["message" => "Failed to stop auction"]);
}

$stmt->close();
$conn->close();
?>
