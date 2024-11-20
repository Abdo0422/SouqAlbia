<?php

include("connexion.php");

// SQL query to select the top 3 products based on the number of bids
$sql = "SELECT e.*, p.*,p.image ,e.prixActuel AS prixactuel, e.nombre_de_bids AS NumBids
FROM enchere e
JOIN produit p ON e.produit_id = p.id
ORDER BY e.nombre_de_bids DESC
LIMIT 3;";

// Execute the query
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    // Fetch the results
    while($row = $result->fetch_assoc()) {
        $row['image'] = 'http://localhost/Souq_AlbiaBackend/' . $row['image'];
        $products[] = $row;
    }
} else {
    echo "0 results";
}

// Close the connection
$conn->close();

// Output the results as JSON
echo json_encode($products);
?>
