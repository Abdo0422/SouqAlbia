<?php
include("connexion.php");

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($user_id <= 0) {
    echo json_encode(array("error" => "Invalid user ID."));
    $conn->close();
    exit();
}

// Updated SQL query to join with utilisateur table
$sql = "SELECT 
            m.contenu, 
            m.file_name, 
            m.dateEnvoi as time, 
            m.file_url,
            u_sender.nom AS sender_name,
            u_receiver.nom AS receiver_name
        FROM 
            message m
        JOIN 
            utilisateur u_sender ON m.expediteur_id = u_sender.id
        JOIN 
            utilisateur u_receiver ON m.destinataire_id = u_receiver.id
        WHERE 
            m.destinataire_id = $user_id OR m.expediteur_id = $user_id";

$result = $conn->query($sql);

$messages = array();

if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Build the full file URL if it exists
            $file_url = !empty($row["file_url"]) ? 'http://localhost/Souq_AlbiaBackend/' . $row["file_url"] : null;

            // Determine if the current user is the sender or receiver
            $isSender = ($row["sender_name"] == $_GET['current_user_name']); // assuming you pass current user's name in the request

            $messages[] = array(
                "contenu" => $row["contenu"],
                "time" => $row["time"],
                "file_name" => $row["file_name"],
                "file_url" => $file_url,
                "senderName" => $row["sender_name"], // Add sender's name
                "receiverName" => $row["receiver_name"], // Add receiver's name
                "isSender" => $isSender // Add flag to indicate if the message is from the current user
            );
        }
    }
    echo json_encode($messages);
} else {
    echo json_encode(array("error" => "Database query failed."));
}

$conn->close();
?>
