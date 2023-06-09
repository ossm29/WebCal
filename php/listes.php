<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listes</title>
    <script src="../js/listes.js" defer></script>

</head>
<body>
    <h1>Listes de matières, professeurs et salles</h1>
    
    <div class="list-container" style="display: flex; justify-content: space-around;">
        <div class="list-section">
            <h2>Matières</h2>
            <button id="add-matiere">Ajouter une matière</button>
            <ul id="matieres-list">
                <!-- Les matières seront ajoutées dynamiquement ici -->
            </ul>
        </div>

        <div class="list-section">
            <h2>Professeurs</h2>
            <button id="add-prof">Ajouter un professeur</button>
            <ul id="profs-list">
                <!-- Les professeurs seront ajoutés dynamiquement ici -->
            </ul>
        </div>

        <div class="list-section">
            <h2>Salles</h2>
            <button id="add-salle">Ajouter une salle</button>
            <ul id="salles-list">
                <!-- Les salles seront ajoutées dynamiquement ici -->
            </ul>
        </div>
    </div>

    <!-- Modals pour ajouter des éléments -->
    <div id="add-matiere-modal" class="modal" style="display:none;">
        <!-- Formulaire pour ajouter une matière -->
        <form id="add-matiere-form">
            <label for="matiere-nom">Nom de la matière:</label>
            <input type="text" id="matiere-nom" name="matiere-nom" required><br>
            <input type="submit" value="Ajouter">
            <input type="button" id="cancel-add-matiere" value="Annuler">

        </form>
    </div>

    <div id="add-prof-modal" class="modal" style="display:none;">
        <!-- Formulaire pour ajouter un professeur -->
        <form id="add-prof-form">
            <label for="prof-nom">Nom du professeur:</label>
            <input type="text" id="prof-nom" name="prof-nom" required><br>
            <label for="prof-prenom">Prénom du professeur:</label>
            <input type="text" id="prof-prenom" name="prof-prenom" required><br>
            <input type="submit" value="Ajouter">
            <input type="button" id="cancel-add-prof" value="Annuler">

        </form>
    </div>

    <div id="add-salle-modal" class="modal" style="display:none;">
        <!-- Formulaire pour ajouter une salle -->
        <form id="add-salle-form">
            <label for="salle-nom">Nom de la salle:</label>
            <input type="text" id="salle-nom" name="salle-nom" required><br>
            <input type="submit" value="Ajouter">
            <input type="button" id="cancel-add-salle" value="Annuler">

        </form>
    </div>
</body>
</html>