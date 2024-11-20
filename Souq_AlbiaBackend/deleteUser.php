<?php
include("connexion.php");
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $userId = (int) $_GET['id'];

    // Prepare SQL query to delete user
    $sql = "DELETE FROM utilisateur WHERE id = ?";
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param('i', $userId);

    // Execute the query
    if ($stmt->execute()) {
        // Return success response
        http_response_code(200);
        echo json_encode(['message' => 'User deleted successfully']);
    } else {
        // Return error response
        http_response_code(500);
        echo json_encode(['message' => 'Failed to delete user']);
    }

    // Close statement and connection
    $stmt->close();
} else {
    // Return error response if no ID is provided
    http_response_code(400);
    echo json_encode(['message' => 'No user ID provided']);
}

// Close connection
$conn->close();
?>