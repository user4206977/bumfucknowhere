<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || empty($data["title"]) || empty($data["content"]) || empty($data["author"])) {
    echo json_encode(["success" => false, "message" => "Brak danych"]);
    exit;
}

$dir = __DIR__ . "/posts/";
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

$id = time(); // unikalny identyfikator
$post = [
    "id" => $id,
    "title" => $data["title"],
    "author" => $data["author"],
    "content" => $data["content"],
    "date" => date("Y-m-d H:i:s")
];

$filename = $dir . $id . ".json";
file_put_contents($filename, json_encode($post, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo json_encode(["success" => true]);
?>
