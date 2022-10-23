let addNewExBtn = '<button onclick="openNewExModal(this.parentNode.id)" class="add-ex-btn">Add Exercise...</button>';
const addNewExHeading = document.getElementById("add-ex-modal-heading");
const addNewExName = document.getElementById("ex-name");
const addNewExWeight = document.getElementById("ex-weight");

const editExHeading = document.getElementById("edit-ex-modal-heading");
const editExWeight = document.getElementById("edit-ex-weight");

let validationAlert = "You must fill all the fields";

function loadEn() {
    validationAlert = "You must fill all the fields";

    addNewExBtn = '<button onclick="openNewExModal(this.parentNode.id)" class="add-ex-btn">Add Exercise...</button>';
    addNewExHeading.innerHTML = 'Adding Exercise...';
    addNewExName.placeholder = 'Name';
    addNewExWeight.placeholder = 'Weight';

    editExHeading.innerHTML = 'Editing Exercise...';
    editExWeight.placeholder = 'New Weight';

    monday.innerHTML = '⏵ Monday' + addNewExBtn;
    monday.setAttribute('Name', 'Monday');
    tuesday.innerHTML = '⏵ Tuesday' + addNewExBtn;
    tuesday.setAttribute('Name', 'Tuesday');
    wednesday.innerHTML = '⏵ Wednesday' + addNewExBtn;
    wednesday.setAttribute('Name', 'Wednesday');
    thursday.innerHTML = '⏵ Thursday' + addNewExBtn;
    thursday.setAttribute('Name', 'Thursday');
    friday.innerHTML = '⏵ Friday' + addNewExBtn;
    friday.setAttribute('Name', 'Friday');
    saturday.innerHTML = '⏵ Saturday' + addNewExBtn;
    saturday.setAttribute('Name', 'Saturday');
    sunday.innerHTML = '⏵ Sunday' + addNewExBtn;
    sunday.setAttribute('Name', 'Sunday');

    loadExercises('en');
}

function loadIt() {
    validationAlert = "Devi compilare tutti i campi";

    addNewExBtn = '<button onclick="openNewExModal(this.parentNode.id)" class="add-ex-btn">Aggiungi Esercizio...</button>';
    addNewExHeading.innerHTML = 'Aggiungi Esercizio...';
    addNewExName.placeholder = 'Nome';
    addNewExWeight.placeholder = 'Nuovo Peso';

    editExHeading.innerHTML = 'Modificando Esercizio...';
    editExWeight.placeholder = 'Peso';

    monday.innerHTML = '⏵ Lunedì' + addNewExBtn.replace("Add Exercise", "Aggiungi Esercizio");
    monday.setAttribute('Name', 'Lunedì');
    tuesday.innerHTML = '⏵ Martedì' + addNewExBtn;
    tuesday.setAttribute('Name', 'Martedì');
    wednesday.innerHTML = '⏵ Mercoledì' + addNewExBtn;
    wednesday.setAttribute('Name', 'Mercoledì');
    thursday.innerHTML = '⏵ Giovedì' + addNewExBtn;
    thursday.setAttribute('Name', 'Giovedì');
    friday.innerHTML = '⏵ Venerdì' + addNewExBtn;
    friday.setAttribute('Name', 'Venerdì');
    saturday.innerHTML = '⏵ Sabato' + addNewExBtn;
    saturday.setAttribute('Name', 'Sabato');
    sunday.innerHTML = '⏵ Domenica' + addNewExBtn;
    sunday.setAttribute('Name', 'Domenica');

    loadExercises('it');
}