<?php
$jsonData = file_get_contents("../data/profs.json");
$profs = json_decode($jsonData, true);

$maxId = 0;
foreach ($profs as $prof) {
    if ($prof['id'] > $maxId) {
        $maxId = $prof['id'];
    }
}

$newId = $maxId + 1;
$newProf = [
    "id" => $newId,
    "nom" => $_POST["nom"],
    "prenom" => $_POST["prenom"]
];

$profs[] = $newProf;
file_put_contents("../data/profs.json", json_encode($profs, JSON_PRETTY_PRINT));

header("Content-Type: application/json");
echo json_encode(["success" => true]);
?>
