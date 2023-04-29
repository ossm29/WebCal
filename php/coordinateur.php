<!-- Page du calendrier coordinateur -->
<?php
session_start();

if (!isset($_SESSION['user']) || $_SESSION['user']['status'] !== 'coordinateur') {
    header('Location: ../index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendrier</title>
</head>
<body>
    <header>
        <img id="logo" src="../ressources/webCal.png" alt="Logo">
        <h1 class="calendrier-title">Calendrier Coordinateur</h1>
        <form id="logoutForm" action="logout.php" method="post" style="display:inline;">
            <input type="submit" value="Déconnexion" style="float:right;">
        </form>
    </header>
        <div id="week-navigation">
        <button id="previous-week">&larr;</button>
        <span id="current-week"></span>
        <button id="next-week">&rarr;</button>
    </div>

    <table id="tableau" border=1>
        <tr>
            <th class='heure' rowspan="2">Heure</th>
            <th class='jour' colspan="2">Lundi</th>
            <th class='jour' colspan="2">Mardi</th>
            <th class='jour' colspan="2">Mercredi</th>
            <th class='jour' colspan="2">Jeudi</th>
            <th class='jour' colspan="2">Vendredi</th>
        </tr>
        <?php
            for($i = 0; $i<5; $i++) {
                echo "<th class='groupe-1'>Groupe 1</th> <th>Groupe 2</th>";
            }
        ?>

        <?php
            for($h = 8; $h <= 18; $h++) {
                for($m = 0; $m < 60; $m += 15) {
                    $heure = sprintf("%02d", $h) . ":" . sprintf("%02d", $m);
                    echo "<tr id='" . $heure . "'>";
                    echo "<td class='heure'>" . $heure . "</td>";
                    echo "</tr>";
                }
            }
        ?>


    </table>
<script src="../js/coordinateur.js"></script>
</body>
</html>