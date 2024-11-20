<?php
include("connexion.php");

$sql = "
    SELECT 
        sc.id_sous_categorie,
        COUNT(e.id) AS nombre_encheres
    FROM 
        souscategorie sc
    LEFT JOIN 
        enchere e ON sc.id_sous_categorie = e.id_sous_categorie
    GROUP BY 
        sc.id_sous_categorie;
";

$result = $conn->query($sql);

$encheres_par_sous_categorie = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $encheres_par_sous_categorie[] = $row;
    }
} else {
    echo "0 results";
}

$conn->close();

echo json_encode($encheres_par_sous_categorie);
?>
