 
<?php

include("connexion.php");

// SQL query to select products with the latest bid dates, limited to the top 3
$sql = "SELECT 
    e.id AS enchere_id,
    e.dateDebut,
    e.dateFin,
    e.status,
    e.prixDepart as prixdepart,
    e.prixActuel as prixactuel,
    e.id_sous_categorie as id_sous_categorie,
    e.nombre_de_bids AS NumBids,
    p.id ,
    p.nom ,
    p.description ,
    p.state ,
    p.image,
    p.localisation
FROM 
    enchere e
JOIN 
    produit p ON e.produit_id = p.id
ORDER BY 
    e.dateDebut ASC
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
