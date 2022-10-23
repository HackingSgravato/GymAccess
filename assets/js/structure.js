const monday = document.getElementById('monday');
const tuesday = document.getElementById('tuesday');
const wednesday = document.getElementById('wednesday');
const thursday = document.getElementById('thursday');
const friday = document.getElementById('friday');
const saturday = document.getElementById('saturday');
const sunday = document.getElementById('sunday');

const week = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

function toggleDay(day) {
    for (const d of week) {
        const dayName = d.getAttribute('Name');
        const dayEx = document.getElementById('ex-' + translateToEnglish(dayName).toLowerCase());

        if (d == day) {
            if (d.classList.contains('day-active')) {
                d.classList.remove('day-active');
                d.innerHTML = '⏵ ' + dayName + addNewExBtn;
                dayEx.classList.add('d-none');
            } else {
                d.classList.add('day-active');
                d.innerHTML = '⏷ ' + dayName + addNewExBtn;
                dayEx.classList.remove('d-none');
            }
        }
        else {
            d.classList.remove('day-active');
            d.innerHTML = '⏵ ' + dayName + addNewExBtn;
            dayEx.classList.add('d-none');
        }
    }
}

function translateToEnglish(name){
    switch (name) {
        case 'Lunedì':
            return 'Monday';
        case 'Martedì':
            return 'Tuesday';
        case 'Mercoledì':
            return 'Wednesday';
        case 'Giovedì':
            return 'Thursday';
        case 'Venerdì':
            return 'Friday';
        case 'Sabato':
            return 'Saturday';
        case 'Domenica':
            return 'Sunday';
        default:
            return name;
    }
}