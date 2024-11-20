<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

session_start();

if(isset($_SESSION['userID'])) {
    // User is authenticated
    $response = array("success" => true, "userID" => $_SESSION['userID']);
} else {
    // User is not authenticated
    $response = array("success" => false);
}

echo json_encode($response);
?>
