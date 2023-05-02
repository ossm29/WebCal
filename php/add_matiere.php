<?php
$jsonData = file_get_contents("../data/matieres.json");
$matieres = json_decode($jsonData, true);

$maxId = 0;
foreach ($matieres as $matiere) {
    if ($matiere['id'] > $maxId) {
        $maxId = $matiere['id'];
    }
}

$newId = $maxId + 1;
$newMatiere = [
    "id" => $newId,
    "nom" => $_POST["nom"]
];

$matieres[] = $newMatiere;
file_put_contents("../data/matieres.json", json_encode($matieres, JSON_PRETTY_PRINT));

header("Content-Type: application/json");
echo json_encode(["success" => true]);
?>
