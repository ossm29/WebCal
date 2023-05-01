<?php
// Lecture du fichier JSON
$jsonData = file_get_contents("../data/courses.json");
$courses = json_decode($jsonData, true);

// Récupération de l'ID du cours à supprimer
$idToRemove = intval($_POST["id"]);

// Recherche du cours à supprimer
$courseIndex = -1;
foreach ($courses as $index => $course) {
    if ($course["id"] === $idToRemove) {
        $courseIndex = $index;
        break;
    }
}

// Suppression du cours s'il est trouvé
if ($courseIndex >= 0) {
    array_splice($courses, $courseIndex, 1);

    // Sauvegarde du fichier JSON mis à jour
    file_put_contents("../data/courses.json", json_encode($courses, JSON_PRETTY_PRINT));

    // Envoi de la réponse au client
    header("Content-Type: application/json");
    echo json_encode(["success" => true]);
} else {
    // Envoi de la réponse d'échec au client
    header("Content-Type: application/json");
    echo json_encode(["success" => false]);
}
?>
