function getChangelog() {
    return getDatabase()['changelog'];
}

function deleteDatabase(){
    localStorage.removeItem('database');
    reloadPage();
}

function getDatabase() {
    tryCreateDatabase();
    return JSON.parse(localStorage.getItem('database'));
}

function tryCreateDatabase() {
    const database = {
        days: [
            {
                name: "Monday",
                exercises: []
            },
            {
                name: "Tuesday",
                exercises: []
            },
            {
                name: "Wednesday",
                exercises: []
            },
            {
                name: "Thursday",
                exercises: []
            },
            {
                name: "Friday",
                exercises: []
            },
            {
                name: "Saturday",
                exercises: []
            },
            {
                name: "Sunday",
                exercises: []
            }
        ],
        changelog: []
    };

    if (!localStorage.getItem('database')) {
        saveNewDatabase(database);
    }
}

function saveNewDatabase(database, reload = true) {
    localStorage.setItem('database', JSON.stringify(database));
    if (reload == false){
        return;
    }
    reloadPage();
}

function updateExerciseWeight(exercise, day, newWeight) {
    const database = getDatabase();
    const dayIndex = database['days'].findIndex((d) => d.name === day.name);
    const exerciseIndex = database['days'][dayIndex].exercises.findIndex((e) => e.name === exercise.name);
    const oldWeight = database['days'][dayIndex].exercises[exerciseIndex].weight;
    database['days'][dayIndex].exercises[exerciseIndex].weight = newWeight

    saveNewDatabase(database, false);

    // Informations about update
    const exerciseName = database['days'][dayIndex].exercises[exerciseIndex].name;

    const change = {
        date: new Date().toLocaleDateString(),
        exerciseName: exerciseName,
        oldWeight: oldWeight,
        newWeight: newWeight
    };
    
    saveChangelog(change);
}

function saveChangelog(change) {
    const database = getDatabase();
    database['changelog'].push(change);
    saveNewDatabase(database);
}

function removeDay(){
    const database = this.getDatabase();
    const dayIndex = database['days'].findIndex((d) => d.name === day.name);
    database['days'].splice(dayIndex, 1);

    saveNewDatabase(database);
}

function removeExercise(exercise, day) {
    const database = getDatabase();
    const dayIndex = database['days'].findIndex((d) => d.name === day.name);
    const exerciseIndex = database['days'][dayIndex].exercises.findIndex((e) => e.name === exercise.name);
    database['days'][dayIndex].exercises.splice(exerciseIndex, 1);

    saveNewDatabase(database);
}

function addDay(day) {
    const database = getDatabase();
    database['days'].push(day);

    saveNewDatabase(database);
}

function addExercise(exercise, day) {
    const database = getDatabase();
    const dayIndex = database['days'].findIndex((d) => d.name === day.name);
    database['days'][dayIndex].exercises.push(exercise);

    saveNewDatabase(database);
}