<!-- Page du calendrier étudiant -->

<?php
session_start();

if (!isset($_SESSION['user']) || $_SESSION['user']['status'] !== 'etudiant') {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendrier</title>
</head>
<body>
    <header>
        <h1>Calendrier Etudiant</h1>
        <form id="logoutForm" action="logout.php" method="post" style="display:inline;">
            <input type="submit" value="Déconnexion" style="float:right;">
        </form>
    </header>
    <div>
        <button id="previousWeek">&lt;&lt; Semaine précédente</button>
        <span id="weekDates">Semaine du ...</span>
        <button id="nextWeek">Semaine suivante &gt;&gt;</button>
    </div>
    <div id="tableContainer"></div>
    <script src="etudiant.js"></script>
</body>
</html>
