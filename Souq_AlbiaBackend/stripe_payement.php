<?php
require 'vendor/autoload.php'; // Path to the Stripe PHP SDK

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');

\Stripe\Stripe::setApiKey('sk_test_51PyDJvP8oZKAIs9nkBV55SRPECQEqD4ogw5AtEGr19u2DoAngOc2emAYpRb7ZZoIlvvJvzUMbPpimk6ccP4EYhS300nmc4t8nV');

$input = json_decode(file_get_contents('php://input'), true);

try {
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $input['amount'],
        'currency' => 'usd',
        'payment_method' => $input['payment_method'],
        'confirmation_method' => 'manual',
        'confirm' => true,
    ]);

    echo json_encode($paymentIntent);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
