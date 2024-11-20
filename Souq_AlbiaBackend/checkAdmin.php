<?php
include("connexion.php");


$userId = intval($_GET['id']);

$sql = "SELECT COUNT(*) as isAdmin FROM admin WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

echo json_encode($data['isAdmin'] > 0);

$stmt->close();
$conn->close();
?>
