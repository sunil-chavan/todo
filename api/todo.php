<?php
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_GET['request'] ?? '', '/'));

switch ($method) {
    case 'GET':
        if (isset($request[0]) && is_numeric($request[0])) {
            echo json_encode(getById($pdo, $request[0]));
        } else {
            echo json_encode(getData($pdo, $_GET));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode(addOrUpdate($pdo, $data));
        break;
    case 'PUT':
        if (!isset($request[0])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required for update']);
            exit;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode(addOrUpdate($pdo, $data, $request[0]));
        break;

    case 'DELETE':
        if (!isset($request[0])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required for delete']);
            exit;
        }
        echo json_encode(deleteData($pdo, $request[0]));
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
function getData($pdo, $params)
{
    $search = isset($params['search']) ? '%' . $params['search'] . '%' : '%';
    $limit = isset($params['limit']) ? (int)$params['limit'] : 10;
    $offset = isset($params['offset']) ? (int)$params['offset'] : 0;

    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM todos WHERE title LIKE ?");
    $countStmt->execute([$search]);
    $total = $countStmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT * FROM todos WHERE title LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?");
    $stmt->bindValue(1, $search);
    $stmt->bindValue(2, $limit, PDO::PARAM_INT);
    $stmt->bindValue(3, $offset, PDO::PARAM_INT);
    $stmt->execute();

    return [
        'total' => $total,
        'limit' => $limit,
        'offset' => $offset,
        'data' => $stmt->fetchAll(PDO::FETCH_ASSOC),
    ];
}

function getById($pdo, $id)
{
    $stmt = $pdo->prepare("SELECT * FROM todos WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function addOrUpdate($pdo, $data, $id = null)
{
    if ($id === null) {
        $stmt = $pdo->prepare("INSERT INTO todos (title, description) VALUES (?, ?)");
        $stmt->execute([
            $data['title'],
            $data['description'],
        ]);
        return ['message' => 'ToDo Added', 'id' => $pdo->lastInsertId()];
    } else {
        $stmt = $pdo->prepare("UPDATE todos SET title = ?, description = ? WHERE id = ?");
        $stmt->execute([
            $data['title'],
            $data['description'],
            $id
        ]);
        return ['message' => 'ToDo Updated'];
    }
}
function deleteData($pdo, $id)
{
    $stmt = $pdo->prepare("DELETE FROM todos WHERE id = ?");
    $stmt->execute([$id]);
    return ['message' => 'ToDo Deleted'];
}
