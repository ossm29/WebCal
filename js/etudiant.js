/* On initialise la semaine à la date actuelle */
const currentDate = new Date();
/* Date du lundi */
let startDate = getStartOfWeek(currentDate);

/* Date du vendredi */
endDate = new Date(startDate);
endDate.setDate(endDate.getDate() + 4);

/* Cours de la semaine */
let weekCourses = [];

/* Boutons navigation Semaine */
document.getElementById("previous-week").addEventListener("click", goToPreviousWeek);
document.getElementById("next-week").addEventListener("click", goToNextWeek);

/* affichage de la semaine */
function updateWeekDisplay() {
    const currentWeek = document.getElementById("current-week");
    const endDateOfWeek = new Date(startDate);
    endDateOfWeek.setDate(endDateOfWeek.getDate() + 4);
    currentWeek.textContent = `Semaine du ${formatDate(startDate)} au ${formatDate(endDateOfWeek)}`;
}

/* Fonctions changement semaine */
function goToPreviousWeek() {
    startDate.setDate(startDate.getDate() - 7);
    endDate.setDate(endDate.getDate() - 7);
    updateWeekDisplay();
    loadCourses();
}

function goToNextWeek() {
    startDate.setDate(startDate.getDate() + 7);
    endDate.setDate(endDate.getDate() + 7);
    updateWeekDisplay();
    loadCourses();
}


/* Charge les cours de la semaine et remplit le calendrier */
function loadCourses() {
    fetch('../data/courses.json')
        .then(response => response.json())
        .then(data => {
            //startDate = getStartOfWeek(currentDate);
            console.log("start date : "+startDate);
            updateWeekDisplay();
            weekCourses = filterCoursesInWeek(data, startDate, endDate);
            console.log("weekCourses length : "+weekCourses.length);
            fillCalendar();
        })
        .catch(error => console.error('Erreur lors du chargement des cours :', error));
}

/**
 * Retourne la date du début de la semaine de la date passée en paramètre.
 * Cette fonction est utile pour déterminer le premier jour de la semaine courante.
 *
 * @param {Date} date - La date pour laquelle on veut obtenir le premier jour de la semaine.
 * @returns {Date} - La date du premier jour de la semaine correspondant à la date passée en paramètre.
 */
function getStartOfWeek(date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    return new Date(startOfWeek.toDateString());
}

/**
 * Chaine JJ/MM/AAAA -> Date
 * Prend en paramètre une chaîne de caractères représentant une date dans un format français (jour/mois/année),
 * et retourne un objet Date correspondant.
 * Utilisée pour lire les dates du Json
 * @param {string} dateString - La chaîne de caractères représentant une date au format français (JJ/MM/AAAA).
 * @returns {Date} - Un objet Date correspondant à la date passée en paramètre.
 */
function parseFrenchDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
}

/**
 * Filtre les cours pour récupérer ceux qui se déroulent pendant une semaine spécifique.
 *
 * @param {Array} courses - Liste des cours avec leurs informations.
 * @param {Date} startDate - La date de début de la semaine.
 * @param {Date} endDate - La date de fin de la semaine.
 * @returns {Array} Liste des cours qui se déroulent pendant la semaine spécifiée.
 */
function filterCoursesInWeek(courses, startDate, endDate) {
    return courses.filter(course => {
        const courseDate = parseFrenchDate(course.date);
        return courseDate >= startDate && courseDate <= endDate;
    });
}

/**
 * Vérifie si une un horaire est occupée pour un groupe donné à une date spécifique.
 * 
 * @param {Date} date - La date à vérifier.
 * @param {number} groupe - Le numéro du groupe à vérifier.
 * @param {string} heure - L'heure à vérifier, au format 'HH:mm'.
 * @returns {boolean} True si la plage horaire est occupée, false sinon. (false si un cours commence à cet horaire)
 */
function est_occupee(date, groupe, heure) {
    const course = weekCourses.find(course => {
        return (
            course.date === formatDate(date) &&
            course.groupes.includes(groupe.toString()) &&
            course.horaire_debut < heure &&
            course.horaire_fin > heure
        );
    });

    return !!course;
}

/**
 * Vérifie si un cours commence pour un groupe donné à une date et une heure spécifiques.
 *
 * @param {Date} date - La date à vérifier.
 * @param {number} groupe - Le numéro du groupe à vérifier.
 * @param {string} heure - L'heure à vérifier, au format 'HH:mm'.
 * @returns {boolean} True si un cours commence à l'heure spécifiée, false sinon.
 */
function cours_commence(date, groupe, heure) {
    const course = weekCourses.find(course => {
        return (
            course.date === formatDate(date) &&
            course.groupes.includes(groupe.toString()) &&
            course.horaire_debut === heure
        );
    });

    return !!course;
}

/**
 * Trouve et retourne un cours pour un groupe donné à une date et une heure spécifiques.
 *
 * @param {Date} date - La date du cours.
 * @param {number} groupe - Le numéro du groupe pour lequel on cherche le cours.
 * @param {string} heure - L'heure à laquelle le cours commence, au format 'HH:mm'.
 * @returns {Object} Le cours correspondant aux critères, ou undefined s'il n'est pas trouvé.
 */
function getCours(date, groupe, heure) {
    return weekCourses.find(course => {
        return (
            course.date === formatDate(date) &&
            course.groupes.includes(groupe.toString()) &&
            course.horaire_debut === heure
        );
    });
}

/**
 * Date -> Chaine JJ/MM/AAAA 
 * Formate une date en chaîne de caractères au format français (jj/mm/aaaa).
 *
 * @param {Date} date - L'objet Date à formater.
 * @returns {string} La date formatée en chaîne de caractères au format 'jj/mm/aaaa'.
 */
function formatDate(date) {
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * Efface les cellules du calendrier pour permettre de le mettre à jour.
 */
function clearCalendar() {
    // Supprime les cellules du tableau
    for (let h = 8; h <= 18; h++) {
        for (let m = 0; m < 60; m += 15) {
            const heure = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
            const ligne = document.getElementById(heure);
            while (ligne.children.length > 1) {
                ligne.removeChild(ligne.lastChild);
            }
        }
    }
}

/**
 * Remplit le calendrier avec les cours de la semaine en cours.
 */
function fillCalendar() {
    // Efface les cellules du calendrier existant
    clearCalendar();
    
    // Parcourt chaque jour de la semaine
    for (let date = new Date(startDate); date <= endDate; date = new Date(date.setDate(date.getDate() + 1))) {
        // Parcourt chaque horaire (ligne du tableau) de la journée
        for (let h = 8; h <= 18; h++) {
            for (let m = 0; m < 60; m += 15) {
                // Parcourt chaque groupe
                for (let groupe = 1; groupe <= 2; groupe++) {
                    const heure = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                    // On récupère la ligne élément (tr) d'id l'horaire
                    const ligne = document.getElementById(heure);

                    if (est_occupee(date, groupe, heure)) {  // Si le créneau est occupé, on ne fait rien
                        console.log("case occupée"+date+heure);

                    } else if (cours_commence(date, groupe, heure)) {  // Si un cours commence à ce créneau, on ajoute le cours au calendrier
                        const cours = getCours(date, groupe, heure);
                        console.log("cours de "+cours.matiere);
                        const newcell = document.createElement('td');
                        /* calcul du nombre de lignes qu'occupe le cours (rowspan) */
                        const nbLignes = ((cours.horaire_fin.split(":")[0] * 4 + cours.horaire_fin.split(":")[1] / 15) - (cours.horaire_debut.split(":")[0] * 4 + cours.horaire_debut.split(":")[1] / 15));
                        
                        newcell.setAttribute('id', cours.id);
                        newcell.setAttribute('class', `groupe-${groupe}`);
                        newcell.setAttribute('rowspan', nbLignes);
                        newcell.setAttribute('matiere', cours.matiere);
                        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                        newcell.setAttribute('data-date', formattedDate);

                        newcell.setAttribute('empty-cell', '0'); // Ajoute l'attribut empty-cell 0 aux cellules non vides

                    
                        const courseInfo = `${cours.matiere}<br>${cours.type}<br>${cours.enseignant}<br>${cours.salle}`;
                        newcell.innerHTML = courseInfo;
                        ligne.appendChild(newcell);
                    
                    } else if (!est_occupee(date, groupe, heure)) { // Si le créneau est libre, on ajoute une case vide
                        console.log("case vide");
                        const newcell = document.createElement('td');
                        newcell.setAttribute('class', `groupe-${groupe}`);

                        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                        newcell.setAttribute('data-date', formattedDate);
                        
                        newcell.setAttribute('empty-cell', '1'); // Ajoute l'attribut empty-cell 1 aux cellules vides
                        ligne.appendChild(newcell);
                    }
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
});
