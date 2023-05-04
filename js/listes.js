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
        li.textContent = `${matiere.nom}`;

        // Ajout de l'ID de la matière en tant qu'attribut de l'élément li
        li.setAttribute('data-matiere-id', matiere.id);

        // Création du bouton Supprimer
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '-';

        // Ajout d'un écouteur d'événements au bouton Supprimer
        deleteButton.addEventListener('click', (event) => {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette matière ?")) {
                const li = event.target.parentElement;
                const matiereId = li.getAttribute('data-matiere-id');
                removeMatiereById(matiereId);
            }
        });

        // Ajout du bouton Supprimer à l'élément li
        li.appendChild(deleteButton);

        matiereList.appendChild(li);
    });
}

function displayProf(profs) {
    const profList = document.getElementById('profs-list');
    profs.forEach((prof) => {
        const li = document.createElement('li');
        li.textContent = `${prof.prenom} ${prof.nom}`;

        // Ajout de l'ID du professeur en tant qu'attribut de l'élément li
        li.setAttribute('data-prof-id', prof.id);

        // Création du bouton Supprimer
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '-';

        // Ajout d'un écouteur d'événements au bouton Supprimer
        deleteButton.addEventListener('click', (event) => {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) {
                const li = event.target.parentElement;
                const profId = li.getAttribute('data-prof-id');
                removeProfById(profId);
            }
        });

        // Ajout du bouton Supprimer à l'élément li
        li.appendChild(deleteButton);

        profList.appendChild(li);
    });
}

function removeProfById(id) {
    fetch("../php/remove_prof.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${id}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Mettre à jour la liste des professeurs après la suppression
            //loadProfs();
        } else {
            alert("Erreur lors de la suppression du professeur.");
        }
    })
    .catch(error => {
        console.error("Erreur lors de la suppression du professeur:", error);
    });
}


function removeMatiereById(id) {
    fetch("../php/remove_matiere.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${id}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Recharger la liste des matières après la suppression
            //loadMatieres();
        } else {
            alert("Erreur lors de la suppression de la matière.");
        }
    })
    .catch(error => {
        console.error("Erreur lors de la suppression de la matière:", error);
    });
}



function displaySalle(salles) {
    const salleList = document.getElementById('salles-list');
    salleList.innerHTML = '';

    salles.forEach((salle) => {
        const li = document.createElement('li');
        li.textContent = `${salle.nom}`;
        li.setAttribute('id', salle.id);

        const button = document.createElement('button');
        button.textContent = '-';

        button.addEventListener('click', (event) => {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette salle ?")) {
                const button = event.target;
                const cell = button.parentElement;
                const salleId = cell.getAttribute('id');
                removeSalleById(salleId);
            }
        });

        li.appendChild(button);
        salleList.appendChild(li);
    });
}

function removeSalleById(id) {
    fetch("../php/remove_salle.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${id}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Recharger la liste des salles après la suppression
            loadSalles();
        } else {
            alert("Erreur lors de la suppression de la salle.");
        }
    })
    .catch(error => {
        console.error("Erreur lors de la suppression de la salle:", error);
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
