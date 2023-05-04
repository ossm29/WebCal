<?php
// Lecture du fichier JSON
$jsonData = file_get_contents("../data/salles.json");
$salles = json_decode($jsonData, true);

// Récupération de l'ID de la salle à supprimer
$idToRemove = intval($_POST["id"]);

// Recherche de la salle à supprimer
$salleIndex = -1;
foreach ($salles as $index => $salle) {
    if ($salle["id"] === $idToRemove) {
        $salleIndex = $index;
        break;
    }
}

// Suppression de la salle si elle est trouvée
if ($salleIndex >= 0) {
    array_splice($salles, $salleIndex, 1);

    // Sauvegarde du fichier JSON mis à jour
    file_put_contents("../data/salles.json", json_encode($salles, JSON_PRETTY_PRINT));

    //
    header("Content-Type: application/json");
    echo json_encode(["success" => true]);
} else {
    //
    header("Content-Type: application/json");
    echo json_encode(["success" => false]);
}
?>
