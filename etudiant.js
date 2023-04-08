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

        for (let i = 0; i < 5; i++) {
            let dayDate = new Date(startDate);
            dayDate.setDate(dayDate.getDate() + i);
            document.getElementById(`jour${i + 1}`).setAttribute('data-date', dayDate.toLocaleDateString());
        }
    }

    function getWeekDates(date) {
        const dayOfWeek = date.getDay();
        const startDate = new Date(date);
        startDate.setDate(startDate.getDate() - dayOfWeek + 1);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 4);
    
        return { startDate, endDate };
    }
});