<?php
// Lecture du fichier JSON
$jsonData = file_get_contents("../data/matieres.json");
$matieres = json_decode($jsonData, true);

// Récupération de l'ID de la matière à supprimer
$idToRemove = intval($_POST["id"]);

// Recherche de la matière à supprimer
$matiereIndex = -1;
foreach ($matieres as $index => $matiere) {
    if ($matiere["id"] === $idToRemove) {
        $matiereIndex = $index;
        break;
    }
}

// Suppression de la matière si elle est trouvée
if ($matiereIndex >= 0) {
    array_splice($matieres, $matiereIndex, 1);

    // Sauvegarde du fichier JSON mis à jour
    file_put_contents("../data/matieres.json", json_encode($matieres, JSON_PRETTY_PRINT));

    // Envoi de la réponse au client
    header("Content-Type: application/json");
    echo json_encode(["success" => true]);
} else {
    // Envoi de la réponse d'échec au client
    header("Content-Type: application/json");
    echo json_encode(["success" => false]);
}
?>
