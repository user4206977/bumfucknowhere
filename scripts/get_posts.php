<?php
header("Content-Type: application/json");
$dir = __DIR__ . "/posts/";
$files = glob($dir . "*.json");

$posts = [];

foreach ($files as $file) {
    $content = file_get_contents($file);
    $post = json_decode($content, true);
    if ($post) {
        $posts[] = $post;
    }
}

// Sortowanie — najnowsze na górze
usort($posts, function($a, $b) {
    return strtotime($b["date"]) - strtotime($a["date"]);
});

echo json_encode($posts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
