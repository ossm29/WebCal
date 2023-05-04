<?php
// Lecture du fichier JSON
$jsonData = file_get_contents("../data/profs.json");
$profs = json_decode($jsonData, true);

// Récupération de l'ID du professeur à supprimer
$idToRemove = intval($_POST["id"]);

// Recherche du professeur à supprimer
$profIndex = -1;
foreach ($profs as $index => $prof) {
    if ($prof["id"] === $idToRemove) {
        $profIndex = $index;
        break;
    }
}

// Suppression du professeur s'il est trouvé
if ($profIndex >= 0) {
    array_splice($profs, $profIndex, 1);

    // Sauvegarde du fichier JSON mis à jour
    file_put_contents("../data/profs.json", json_encode($profs, JSON_PRETTY_PRINT));

    //
    header("Content-Type: application/json");
    echo json_encode(["success" => true]);
} else {
    //
    header("Content-Type: application/json");
    echo json_encode(["success" => false]);
}
?>
