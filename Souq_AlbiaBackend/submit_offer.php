<?php
include("connexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id']) && isset($data['offer']) && isset($data['acheteur_id'])) {
    $id = $data['id'];
    $offer = $data['offer'];
    $acheteur_id = $data['acheteur_id'];

    // Retrieve the current prixActuel
    $stmt = $conn->prepare("SELECT prixActuel FROM enchere WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($prixActuel);
    $stmt->fetch();
    $stmt->close();

    if ($offer <= $prixActuel) {
        echo json_encode(["success" => false, "message" => "Offer must be greater than the current price."]);
        $conn->close();
        exit();
    }

    // Start a transaction
    $conn->begin_transaction();

    try {
        // Update the current price and acheteur_id
        $stmt = $conn->prepare("UPDATE enchere SET prixActuel = ?, acheteur_id = ? WHERE id = ?");
        $stmt->bind_param("dii", $offer, $acheteur_id, $id);

        if ($stmt->execute()) {
            // Increment the number of bids
            $stmt = $conn->prepare("UPDATE enchere SET nombre_de_bids = nombre_de_bids + 1 WHERE id = ?");
            $stmt->bind_param("i", $id);

            if ($stmt->execute()) {
                // Commit the transaction
                $conn->commit();
                echo json_encode(["success" => true]);
            } else {
                // Rollback if incrementing fails
                $conn->rollback();
                echo json_encode(["success" => false, "message" => "Failed to increment the number of bids."]);
            }
        } else {
            // Rollback if the initial update fails
            $conn->rollback();
            echo json_encode(["success" => false, "message" => "Failed to update the offer."]);
        }

        $stmt->close();
    } catch (Exception $e) {
        // Rollback if there's any exception
        $conn->rollback();
        echo json_encode(["success" => false, "message" => "Transaction failed: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Invalid input data."]);
}

$conn->close();
?>
