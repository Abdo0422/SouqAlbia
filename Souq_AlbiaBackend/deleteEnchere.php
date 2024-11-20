<?php
// Include your database connection file
include("connexion.php");

// Set response content type to JSON
header('Content-Type: application/json');

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get ID from URL
    $id = intval($_GET['id']);

    // Check if ID is valid
    if ($id > 0) {
        // Prepare and execute the SQL statement to delete from enchere
        $stmt = $conn->prepare("DELETE FROM enchere WHERE id = ?");
        if ($stmt) {
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->close();
            
            // Optionally, delete related produit if needed
            $stmt = $conn->prepare("DELETE FROM produit WHERE id = (SELECT produit_id FROM enchere WHERE id = ?)");
            if ($stmt) {
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();
            }
            
            // Send a success response
            http_response_code(200);
            echo json_encode(["message" => "Enchere deleted successfully."]);
        } else {
            // Send a response if the statement preparation fails
            http_response_code(500);
            echo json_encode(["message" => "Failed to prepare the SQL statement."]);
        }
    } else {
        // Send a response if the ID is invalid
        http_response_code(400);
        echo json_encode(["message" => "Invalid ID provided."]);
    }
} else {
    // Send a response if the request method is not DELETE
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed. Use DELETE request."]);
}
?>
