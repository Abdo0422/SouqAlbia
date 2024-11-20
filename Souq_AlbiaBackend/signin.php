<?php
include("connexion.php"); // Include your database connection script

// Disable error display
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Prepare and execute SQL query
$query = $conn->prepare("SELECT * FROM utilisateur WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    // Send JSON response
    header('Content-Type: application/json');
    echo json_encode($user);
} else {
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Invalid credentials']);
}
?>
