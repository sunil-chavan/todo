<?php
require 'db.php';


$name = trim($data->name ?? '');
$email = trim($data->email ?? '');
$password = trim($data->password ?? '');

if (!$name || !$email || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "All fields are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(["message" => "Email already registered"]);
        exit;
    }

    // Hash the password and insert user
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword]);

    echo json_encode(["message" => "User registered successfully"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
