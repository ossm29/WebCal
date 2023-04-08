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
    <table id="tableau" border=1>
        <tr>
            <th class='heure' rowspan="2">Heure</th>
            <th class='jour' id="jour1" colspan="2">Lundi</th>
            <th class='jour' id="jour2" colspan="2">Mardi</th>
            <th class='jour' id="jour3" colspan="2">Mercredi</th>
            <th class='jour' id="jour4" colspan="2">Jeudi</th>
            <th class='jour' id="jour5" colspan="2">Vendredi</th>
        </tr>
        <?php
            for($i = 0; $i<5; $i++) {
                echo "<th class='groupe-1'>Groupe 1</th> <th>Groupe 2</th>";
            }
        ?>

        <?php 
            for($h = 8; $h <= 18; $h++) {
                for($m = 0; $m < 60; $m += 15) {
                    echo "<tr>";
                    echo "<td class='heure'>" . sprintf("%02d", $h) . ":" . sprintf("%02d", $m) . "</td>";

                    for($j = 0; $j < 5; $j++) {
                        echo "<td class='groupe-1'></td>";
                        echo "<td class='groupe-2'></td>";
                    }
                    echo "</tr>";
                }
            }
        ?>

    </table>
    <script src="etudiant.js"></script>
</body>
</html>