<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || empty($data["id"])) {
    echo json_encode(["success" => false, "message" => "Brak ID posta"]);
    exit;
}

$file = __DIR__ . "/posts/" . basename($data["id"]) . ".json";

if (file_exists($file)) {
    unlink($file);
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Plik nie istnieje"]);
}
?>
