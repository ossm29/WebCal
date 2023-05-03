<?php
// Vérifier si les données du cours sont fournies
if (isset($_POST['course_id']) && isset($_POST['date']) && isset($_POST['horaire_debut']) && isset($_POST['horaire_fin'])) {
    $courseId = intval($_POST['course_id']);
    $date = $_POST['date'];
    $horaireDebut = $_POST['horaire_debut'];
    $horaireFin = $_POST['horaire_fin'];

    // Charger les cours à partir du fichier JSON
    $coursesJson = file_get_contents('../data/courses.json');
    $courses = json_decode($coursesJson, true);

    // Trouver le cours à modifier
    $courseToEdit = null;
    foreach ($courses as &$course) {
        if ($course['id'] == $courseId) {
            $courseToEdit = &$course;
            break;
        }
    }

    // Modifier le cours si trouvé
    if ($courseToEdit) {
        // Convertir la date dans le format souhaité pour le fichier JSON
        $formattedDate = date('d/m/Y', strtotime($date));

        // Mettre à jour les informations du cours
        $courseToEdit['date'] = $formattedDate;
        $courseToEdit['horaire_debut'] = $horaireDebut;
        $courseToEdit['horaire_fin'] = $horaireFin;

        // Enregistrer les cours modifiés dans le fichier JSON
        $coursesJson = json_encode($courses, JSON_PRETTY_PRINT);
        file_put_contents('../data/courses.json', $coursesJson);

        // Réponse de succès
        http_response_code(200);
    } else {
        // Réponse d'erreur si le cours n'est pas trouvé
        http_response_code(404);
    }
} else {
    // Réponse d'erreur si les données du cours ne sont pas fournies
    http_response_code(400);
}
?>
