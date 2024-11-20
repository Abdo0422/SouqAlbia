<?php
include("connexion.php");

$acheteur_id = isset($_GET['acheteur_id']) ? intval($_GET['acheteur_id']) : 0;

// Prepare the SQL statement with a JOIN to fetch product details
$sql = "SELECT e.*,e.prixActuel AS prixactuel, p.nom, p.description, p.state, p.image, p.localisation,count(*) AS NombreEncheres
    FROM enchere e
    LEFT JOIN produit p ON e.produit_id = p.id
    WHERE e.acheteur_id = ? AND e.dateFin < NOW()
";

$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("i", $acheteur_id); // Bind the acheteur_id parameter
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Fetch all results
    $auctions = [];
    while ($row = $result->fetch_assoc()) {
        $auctions[] = $row;
    }

    // Return the results as JSON
    echo json_encode($auctions);
    
    $stmt->close();
} else {
    echo json_encode(["error" => "Failed to prepare SQL statement"]);
}

$conn->close();
?>
