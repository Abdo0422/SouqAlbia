<?php
include("connexion.php");

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

$sql = "SELECT 
    u.id, 
    u.nom as name, 
    COALESCE(m.contenu, m.file_name) as lastMessage, 
    m.dateEnvoi as lastMessageTime
FROM 
    utilisateur u
LEFT JOIN 
    (
        SELECT 
            CASE 
                WHEN m.expediteur_id = $user_id THEN m.destinataire_id
                ELSE m.expediteur_id
            END as user_id,
            m.contenu, 
            m.file_name,
            m.dateEnvoi
        FROM 
            message m
        WHERE 
            m.expediteur_id = $user_id OR m.destinataire_id = $user_id
        ORDER BY 
            m.dateEnvoi DESC
    ) m 
ON u.id = m.user_id
WHERE 
    u.id != $user_id
    AND m.user_id IS NOT NULL
GROUP BY 
    u.id
ORDER BY 
    lastMessageTime DESC;
";

$result = $conn->query($sql);

$users = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $lastMessage = isset($row["file_name"]) ? $row["file_name"] : (isset($row["lastMessage"]) ? $row["lastMessage"] : null);
        $users[] = array(
            "id" => $row["id"],
            "name" => $row["name"],
            "lastMessage" => $lastMessage,
            "lastMessageTime" => $row["lastMessageTime"]
        );
    }
    echo json_encode($users);
} else {
    echo json_encode(array());
}

$conn->close();
?>
