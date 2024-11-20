<?php
include("connexion.php");

$expediteur_id = isset($_GET['expediteur_id']) ? intval($_GET['expediteur_id']) : 0;
$destinataire_id = isset($_GET['destinataire_id']) ? intval($_GET['destinataire_id']) : 0;

// Ensure that both parameters are set
if ($expediteur_id === 0 || $destinataire_id === 0) {
    echo json_encode([]);
    exit;
}

// Query to fetch messages where the expediteur is the sender and to get the sender's name
$sql = "SELECT 
    u_sender.nom as senderName, 
    u_receiver.nom as receiverName, 
    COALESCE(m.contenu, m.file_name) as lastMessage, 
    m.dateEnvoi as lastMessageTime
FROM 
    utilisateur u_sender
JOIN 
    utilisateur u_receiver
ON u_receiver.id = ?  -- This is the receiver id
LEFT JOIN 
    (
        SELECT 
            m.expediteur_id as sender_id,
            m.destinataire_id as receiver_id,
            m.contenu, 
            m.file_name,
            m.dateEnvoi
        FROM 
            message m
        WHERE 
            m.expediteur_id = ? 
            AND m.destinataire_id = ?
        ORDER BY 
            m.dateEnvoi DESC
    ) m 
ON u_sender.id = m.sender_id
AND u_receiver.id = m.receiver_id
WHERE 
    u_sender.id = ?  -- This is the sender id
    AND m.sender_id IS NOT NULL
GROUP BY 
    u_sender.id, u_receiver.id
ORDER BY 
    lastMessageTime DESC;
";

// Prepare and execute the query
$stmt = $conn->prepare($sql);

// Bind parameters: 'iiii' indicates four integers
$stmt->bind_param("iiii", $destinataire_id, $expediteur_id, $destinataire_id, $expediteur_id);
$stmt->execute();
$result = $stmt->get_result();

// Check if $result is a valid result object
if ($result) {
    $messages = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($messages);
} else {
    echo json_encode([]);
}

$stmt->close();
$conn->close();
?>
