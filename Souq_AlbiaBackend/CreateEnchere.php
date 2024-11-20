<?php
include("connexion.php");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $vendeur_id = isset($_POST['vendeur_id']) ? $_POST['vendeur_id'] : '';
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $state = isset($_POST['state']) ? $_POST['state'] : '';
    $location = isset($_POST['location']) ? $_POST['location'] : '';
    $duration = isset($_POST['duration']) ? intval($_POST['duration']) : 0;
    $startingPrice = isset($_POST['startingPrice']) ? floatval($_POST['startingPrice']) : 0.0;
    $id_sous_categorie = isset($_POST['id_sous_categorie']) ? intval($_POST['id_sous_categorie']) : 0;

    if ($duration < 0) {
        $duration = 0;
    }

    $dateDebut = date('Y-m-d H:i:s');
    $dateFin = date('Y-m-d H:i:s', strtotime($dateDebut . ' + ' . $duration . ' days'));

    $uploadDirectory = 'C:/wamp/www/Souq_AlbiaBackend/files/';
    if (!file_exists($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    $fileNames = [];
    if (isset($_FILES['images'])) {
        $totalFiles = count($_FILES['images']['name']);
        for ($i = 0; $i < $totalFiles; $i++) {
            $fileName = $_FILES['images']['name'][$i];
            $fileTmpName = $_FILES['images']['tmp_name'][$i];
            $filePath = $uploadDirectory . basename($fileName);
            $fileUrl = 'files/' . basename($fileName);

            if (move_uploaded_file($fileTmpName, $filePath)) {
                $fileNames[] = $fileUrl;
            } else {
                echo json_encode(['success' => false, 'message' => "Failed to upload $fileName"]);
                exit();
            }
        }
    }

   // Insert into enchere table
$stmt = $conn->prepare("INSERT INTO enchere (dateDebut, dateFin, prixDepart, prixActuel, nombre_de_bids, id_sous_categorie, acheteur_id, vendeur_id, status) VALUES (?, ?, ?, ?, 0, ?, NULL, ?, 'active')");
$stmt->bind_param('ssddii', $dateDebut, $dateFin, $startingPrice, $startingPrice, $id_sous_categorie, $vendeur_id);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'message' => 'Failed to insert into enchere table: ' . $stmt->error]);
    exit();
}


    $enchere_id = $stmt->insert_id;
    $stmt->close();

    $stmt = $conn->prepare("INSERT INTO produit (nom, description, state, image, localisation) VALUES (?, ?, ?, ?, ?)");
    $imagePath = implode(',', $fileNames);
    $stmt->bind_param('sssss', $title, $description, $state, $imagePath, $location);

    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Failed to insert into produit table: ' . $stmt->error]);
        exit();
    }

    $produit_id = $stmt->insert_id;
    $stmt->close();

    $stmt = $conn->prepare("UPDATE enchere SET produit_id = ? WHERE id = ?");
    $stmt->bind_param('ii', $produit_id, $enchere_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Enchère et produit créés avec succès']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update enchere table: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
