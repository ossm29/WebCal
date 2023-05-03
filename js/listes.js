document.addEventListener('DOMContentLoaded', () => {
    loadData('../data/matieres.json', displayMatiere);
    loadData('../data/profs.json', displayProf);
    loadData('../data/salles.json', displaySalle);
  
    // Ajoutez des écouteurs d'événements pour les boutons "Ajouter"
    document.getElementById('add-matiere').addEventListener('click', openAddMatiereModal);
    document.getElementById('add-prof').addEventListener('click', openAddProfModal);
    document.getElementById('add-salle').addEventListener('click', openAddSalleModal);
  });
  
function loadData(jsonFile, callback) {
    fetch(jsonFile)
        .then((response) => response.json())
        .then((data) => {
        callback(data);
        })
        .catch((error) => console.error('Erreur lors du chargement des données :', error));
}

function displayMatiere(matieres) {
    const matiereList = document.getElementById('matieres-list');
    matieres.forEach((matiere) => {
        const li = document.createElement('li');
        li.textContent = matiere.nom;
        matiereList.appendChild(li);
});
}

function displayProf(profs) {
    const profList = document.getElementById('profs-list');
    profs.forEach((prof) => {
        const li = document.createElement('li');
        li.textContent = `${prof.prenom} ${prof.nom}`;
        profList.appendChild(li);
    });
}

function displaySalle(salles) {
    const salleList = document.getElementById('salles-list');
    salles.forEach((salle) => {
        const li = document.createElement('li');
        li.textContent = salle.nom;
        salleList.appendChild(li);
});
}
  
// Fonctions pour ouvrir les modals d'ajout
function openAddMatiereModal() {
    const addMatiereModal = document.getElementById('add-matiere-modal');
    addMatiereModal.style.display = 'block';
}

function openAddProfModal() {
    const addProfModal = document.getElementById('add-prof-modal');
    addProfModal.style.display = 'block';
}

function openAddSalleModal() {
    const addSalleModal = document.getElementById('add-salle-modal');
    addSalleModal.style.display = 'block';
}

// Fonctions pour ajouter de nouveaux éléments
function addMatiere() {
    // Récupérer les données du formulaire
    const matiereNom = document.getElementById('matiere-nom').value;

    // Créer un objet FormData pour envoyer les données au serveur
    const formData = new FormData();
    formData.append('nom', matiereNom);

    // Envoi de la requête au serveur
    fetch('add_matiere.php', {
    method: 'POST',
    body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
        // Ajouter la nouvelle matière à la liste et fermer le modal
        const matiereList = document.getElementById('matieres-list');
        const li = document.createElement('li');
        li.textContent = matiereNom;
        matiereList.appendChild(li);

        document.getElementById('add-matiere-modal').style.display = 'none';
        } else {
        // Gérer l'erreur
        console.error('Erreur lors de l\'ajout de la matière');
        }
    });
}

function addProf() {
    // Récupérer les données du formulaire
    const profNom = document.getElementById('prof-nom').value;
    const profPrenom = document.getElementById('prof-prenom').value;

    // Créer un objet FormData pour envoyer les données au serveur
    const formData = new FormData();
    formData.append('nom', profNom);
    formData.append('prenom', profPrenom);

    // Envoi de la requête au serveur
    fetch('add_prof.php', {
    method: 'POST',
    body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
        // Ajouter le nouveau professeur à la liste et fermer le modal
        const profList = document.getElementById('profs-list');
        const li = document.createElement('li');
        li.textContent = `${profPrenom} ${profNom}`;
        profList.appendChild(li);

        document.getElementById('add-prof-modal').style.display = 'none';
        } else {
        // Gérer l'erreur
        console.error('Erreur lors de l\'ajout du professeur');
        }
    });
}

function addSalle() {
    // Récupérer les données du formulaire
    const salleNom = document.getElementById('salle-nom').value;

    // Créer un objet FormData pour envoyer les données au serveur
    const formData = new FormData();
    formData.append('nom', salleNom);

    // Envoi de la requête au serveur
    fetch('add_salle.php', {
    method: 'POST',
    body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
        // Ajouter la nouvelle salle à la liste et fermer le modal
        const salleList = document.getElementById('salles-list');
        const li = document.createElement('li');
        li.textContent = salleNom;
        salleList.appendChild(li);

        document.getElementById('add-salle-modal').style.display = 'none';
        } else {
        // Gérer l'erreur
        console.error('Erreur lors de l\'ajout de la salle');
        }
    });
}

document.getElementById("add-matiere-form").addEventListener("submit", (event) => {
    event.preventDefault();
    addMatiere();
});

document.getElementById("add-prof-form").addEventListener("submit", (event) => {
    event.preventDefault();
    addProf();
});

document.getElementById("add-salle-form").addEventListener("submit", (event) => {
    event.preventDefault();
    addSalle();
});

document.getElementById('cancel-add-matiere').addEventListener('click', function() {
    document.getElementById('add-matiere-modal').style.display = 'none';
});

document.getElementById('cancel-add-prof').addEventListener('click', function() {
    document.getElementById('add-prof-modal').style.display = 'none';
});

document.getElementById('cancel-add-salle').addEventListener('click', function() {
    document.getElementById('add-salle-modal').style.display = 'none';
});