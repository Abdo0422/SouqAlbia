<?php
include("connexion.php");

if(isset($_POST["submit"])) {
    $category_name = $_POST['category_name'];
    $description = $_POST['description'];
    $image = $_FILES['image']['name'];
    $image_tmp = $_FILES['image']['tmp_name'];

    $imagePath = "Images/" . $image;

    move_uploaded_file($image_tmp, $imagePath);

    // Prepare the SQL statement
    $sql = "INSERT INTO categorie (nom, image, description) VALUES (?, ?, ?)";
    
    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $category_name, $imagePath, $description);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Image uploaded successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
