const exMonday = document.getElementById("ex-monday");
const exTuesday = document.getElementById("ex-tuesday");
const exWednesday = document.getElementById("ex-wednesday");
const exThursday = document.getElementById("ex-thursday");
const exFriday = document.getElementById("ex-friday");
const exSaturday = document.getElementById("ex-saturday");
const exSunday = document.getElementById("ex-sunday");

function loadExercises(lang){
    getDatabase()['days'].forEach((day) => {
        const dayElement = document.getElementById(`ex-${day.name.toLowerCase()}`);
        dayElement.innerHTML = "";
        
        day.exercises.forEach((exercise) => {
            const div = document.createElement("div");
            div.style.marginBottom = "10px";

            const strong = document.createElement("strong");
            strong.classList.add("changelog-date");
            strong.style.paddingLeft = "20px";
            strong.style.textTransform = "capitalize";
            strong.innerText = exercise.name;

            const button = document.createElement("button");
            button.classList.add("ex-btn");
            button.innerText = lang === "en" ? "Remove" : lang === "it" ? "Rimuovi" : "Remove";
            button.addEventListener("click", () => {
                removeExercise(exercise, day);
            });

            const br = document.createElement("br");

            const span1 = document.createElement("span");
            span1.classList.add("weight-span");
            span1.innerText = lang === "en" ? "Weight:" : lang === "it" ? "Peso:" : "Weight:";

            const span2 = document.createElement("span");
            span2.classList.add("changelog-newweight");
            span2.innerText = exercise.weight;

            const editBtn = document.createElement("button");
            editBtn.classList.add("ex-btn-edit");
            editBtn.innerText = lang === "en" ? "Edit" : lang === "it" ? "Modifica" : "Edit";
            editBtn.addEventListener("click", () => {
                openEditModal(exercise, day);
            });

            div.appendChild(strong);
            div.appendChild(button);
            div.appendChild(br);
            div.appendChild(span1);
            div.appendChild(span2);
            div.appendChild(editBtn);
            
            dayElement.appendChild(div);
        });
    });
}

let lastDaySelected;

function addNewExercise(){
    if (!validateBeforeCreation()){
        return;
    }

    const day = {
        name: normalizeDayName(lastDaySelected)
    };

    const exercise = {
        name: document.getElementById("ex-name").value,
        weight: document.getElementById("ex-weight").value
    };

    addExercise(exercise, day);

    $('#add-ex-modal').modal('hide');
}

function normalizeDayName(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function validateBeforeCreation(){
    const name = document.getElementById("ex-name").value;
    const weight = document.getElementById("ex-weight").value;

    if(name === "" || weight === ""){
        alert(validationAlert);
        return false;
    }

    return true;
}

function openNewExModal(dayName){
    $('#add-ex-modal').modal('show');

    lastDaySelected = dayName;
}

let lastSelectedExercise;
let lastDaySelect2;

function openEditModal(exercise, day){
    lastSelectedExercise = exercise;
    lastDaySelect2 = day;

    $('#edit-ex-modal').modal('show');
}

function validateBeforeEdit(){
    const weight = document.getElementById("edit-ex-weight").value;

    if(weight === ""){
        alert(validationAlert);
        return false;
    }

    return true;
}

function editExercise(){
    if (!validateBeforeEdit()){
        return;
    }

    updateExerciseWeight(lastSelectedExercise, lastDaySelect2, document.getElementById("edit-ex-weight").value);

    $('#edit-ex-modal').modal('hide');
}