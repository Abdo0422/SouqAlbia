<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');

$input = json_decode(file_get_contents('php://input'), true);

// Create PayPal payment URL
$paymentUrl = "https://www.paypal.com/cgi-bin/webscr";
$params = [
    'cmd' => '_xclick',
    'business' => 'sb-z40cf23959928@business.example.com',
    'item_name' => 'Order',
    'amount' => $input['amount'],
    'currency_code' => 'USD',
    'return' => 'http://localhost:4200/success', // Redirect after payment
    'cancel_return' => 'http://localhost:4200/cancel', // Redirect if canceled
];

$queryString = http_build_query($params);

echo json_encode(['url' => $paymentUrl . '?' . $queryString]);
?>
