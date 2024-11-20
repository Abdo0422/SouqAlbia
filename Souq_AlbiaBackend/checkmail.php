<?php

include("connexion.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = $request->email;

$stmt = $conn->prepare("SELECT * FROM utilisateur WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

$response = array();

if ($stmt->num_rows > 0) {
    $response['exists'] = true;
} else {
    $response['exists'] = false;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
