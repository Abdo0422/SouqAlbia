<?php 
include("connexion.php");


$sql = "SELECT * FROM categorie";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<h2>".$row['nom']."</h2>";
        echo "<img src='".$row['image']."' alt='".$row['nom']."'>";
        echo "<p>".$row['description']."</p>";
    }
} else {
    echo "0 results";
}

?>