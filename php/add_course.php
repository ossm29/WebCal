<?php
// Lecture du fichier JSON
$jsonData = file_get_contents("../data/courses.json");
$courses = json_decode($jsonData, true);

// Trouvez l'ID maximal parmi les cours existants
$maxId = 0;
foreach ($courses as $course) {
    if ($course['id'] > $maxId) {
        $maxId = $course['id'];
    }
}

// Récupération des données du formulaire et attribution d'un ID unique
$newId = $maxId + 1;

// Récupération des données du formulaire
$rawDate = $_POST["date"];

// Convertir la date dans le format souhaité
$date = DateTime::createFromFormat('Y-m-d', $rawDate);
$date = $date->format('d/m/Y');

$course = [
    "id" => $newId,
    "type" => $_POST["type"],
    "matiere" => $_POST["matiere"],
    "enseignant" => $_POST["enseignant"],
    "salle" => $_POST["salle"],
    "date" => $date,
    "horaire_debut" => $_POST["horaire_debut"],
    "horaire_fin" => $_POST["horaire_fin"],
    "groupes" => explode(",", $_POST["groupes"])
];

// Ajout du nouveau cours
$courses[] = $course;

// Sauvegarde du fichier JSON mis à jour
file_put_contents("../data/courses.json", json_encode($courses, JSON_PRETTY_PRINT));

// Envoi de la réponse au client
header("Content-Type: application/json");
echo json_encode(["success" => true]);
?>
