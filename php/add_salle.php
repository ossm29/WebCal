<?php
$jsonData = file_get_contents("../data/salles.json");
$salles = json_decode($jsonData, true);

$maxId = 0;
foreach ($salles as $salle) {
    if ($salle['id'] > $maxId) {
        $maxId = $salle['id'];
    }
}

$newId = $maxId + 1;
$newSalle = [
    "id" => $newId,
    "nom" => $_POST["nom"]
];

$salles[] = $newSalle;
file_put_contents("../data/salles.json", json_encode($salles, JSON_PRETTY_PRINT));

header("Content-Type: application/json");
echo json_encode(["success" => true]);
?>
