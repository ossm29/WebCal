let startDate;
let endDate;
let weekCourses = [];

function loadCourses() {
    fetch('../../data/courses.json')
        .then(response => response.json())
        .then(data => {
            const currentDate = new Date();
            startDate = getStartOfWeek(currentDate);
            console.log("start date : "+startDate);
            endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 4);
            weekCourses = filterCoursesInWeek(data, startDate, endDate);
            console.log("weekCourses length : "+weekCourses.length);
            fillCalendar(weekCourses);
        })
        .catch(error => console.error('Erreur lors du chargement des cours :', error));
}

function getStartOfWeek(date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    return startOfWeek;
}

function filterCoursesInWeek(courses, startDate, endDate) {
    return courses.filter(course => {
        const courseDate = new Date(course.date);
        return courseDate >= startDate && courseDate <= endDate;
    });
}

function est_occupee(date, groupe, heure) {
    const course = weekCourses.find(course => {
        return (
            course.date === formatDate(date) &&
            course.groupes.includes(groupe.toString()) &&
            course.horaire_debut <= heure &&
            course.horaire_fin > heure
        );
    });

    return !!course;
}

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

function getCours(date, groupe, heure) {
    return weekCourses.find(course => {
        return (
            course.date === formatDate(date) &&
            course.groupes.includes(groupe.toString()) &&
            course.horaire_debut === heure
        );
    });
}

function formatDate(date) {
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fillCalendar(weekCourses) {
    for (let date = new Date(startDate); date <= endDate; date = new Date(date.setDate(date.getDate() + 1))) {
        for (let h = 8; h <= 18; h++) {
            for (let m = 0; m < 60; m += 15) {
                for (let groupe = 1; groupe <= 2; groupe++) {
                    const heure = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                    const ligne = document.getElementById(heure);

                    if (est_occupee(date, groupe, heure)) {
                        // Créneau occupé, on ne fait rien
                    } else if (cours_commence(date, groupe, heure)) { // cours commence on l'ajoute
                        const cours = getCours(date, groupe, heure);
                        const newcell = document.createElement('td');
                        const nbLignes = Math.ceil((Date.parse(`01/01/2000 ${cours.horaire_fin}`) - Date.parse(`01/01/2000 ${cours.horaire_debut}`)) / (15 * 60 * 1000));
                    
                        newcell.setAttribute('class', `groupe-${groupe}`);
                        newcell.setAttribute('rowspan', nbLignes);
                        newcell.setAttribute('id', cours.matiere);
                    
                        const courseInfo = `${cours.matiere}<br>${cours.enseignant}<br>${cours.salle}`;
                        newcell.innerHTML = courseInfo;
                        ligne.appendChild(newcell);
                    
                    } else if (!est_occupee(date, groupe, heure)) { // si le créneau est libre on met une case vide
                        const newcell = document.createElement('td');
                        newcell.setAttribute('class', `groupe-${groupe}`);
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
