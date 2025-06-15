<?php
require 'db.php';


$email = trim($data->email ?? '');
$password = trim($data->password ?? '');

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Email and password are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(["message" => "Invalid credentials"]);
        exit;
    }
    $string = $user['id'] . '|' . $email . '|' . time();
    $token = substr(hash_hmac('sha256', $string, $secret_key), 0, 50);

    echo json_encode([
        "message" => "Login successful",
        "token" => $token,
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $email
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
