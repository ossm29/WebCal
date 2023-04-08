document.addEventListener('DOMContentLoaded', () => {
    const previousWeekButton = document.getElementById('previousWeek');
    const nextWeekButton = document.getElementById('nextWeek');
    const weekDatesElement = document.getElementById('weekDates');
    
    let currentDate = new Date();
    updateWeekDates(currentDate);

    previousWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 7);
        updateWeekDates(currentDate);
    });

    nextWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 7);
        updateWeekDates(currentDate);
    });

    function updateWeekDates(date) {
        let { startDate, endDate } = getWeekDates(date);
        weekDatesElement.textContent = `Semaine du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()}`;

        createTable(startDate);
    }

    function getWeekDates(date) {
        const dayOfWeek = date.getDay();
        const startDate = new Date(date);
        startDate.setDate(startDate.getDate() - dayOfWeek + 1);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 4);
    
        return { startDate, endDate };
    }

    function createTable(startDate) {
        const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
        const tableContainer = document.getElementById('tableContainer');
        tableContainer.innerHTML = ''; // Clear the table container

        let table = document.createElement('table');
        table.setAttribute('border', 1);
        table.setAttribute('id', 'tableau');

        let thead = document.createElement('thead');
        let tr1 = document.createElement('tr');
        let tr2 = document.createElement('tr');

        let thHeure = document.createElement('th');
        thHeure.classList.add('heure');
        thHeure.setAttribute('rowspan', 2);
        thHeure.textContent = 'Heure';
        tr1.appendChild(thHeure);

        for (let i = 0; i < 5; i++) {
            let thJour = document.createElement('th');
            thJour.classList.add('jour');
            thJour.setAttribute('colspan', 2);
            thJour.textContent = jours[i];
            tr1.appendChild(thJour);

            let thGroupe1 = document.createElement('th');
            thGroupe1.classList.add('groupe-1');
            thGroupe1.textContent = 'Groupe 1';
            tr2.appendChild(thGroupe1);

            let thGroupe2 = document.createElement('th');
            thGroupe2.textContent = 'Groupe 2';
            tr2.appendChild(thGroupe2);
        }

        thead.appendChild(tr1);
        thead.appendChild(tr2);
        table.appendChild(thead);

        let tbody = document.createElement('tbody');

        for (let h = 8; h <= 18; h++) {
            for (let m = 0; m < 60; m += 15) {
                let tr = document.createElement('tr');

                let tdHeure = document.createElement('td');
                tdHeure.classList.add('heure');
                tdHeure.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                tr.appendChild(tdHeure);

                for (let j = 0; j < 5; j++) {
                    let tdGroupe1 = document.createElement('td');
                    tdGroupe1.classList.add('groupe-1');
                    tr.appendChild(tdGroupe1);

                    let tdGroupe2 = document.createElement('td');
                    tdGroupe2.classList.add('groupe-2');
                    tr.appendChild(tdGroupe2);
                }
                tbody.appendChild(tr);
            }
        }
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }
});
