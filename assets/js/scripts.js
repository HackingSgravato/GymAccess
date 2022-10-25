function importJson(fileInput) {
    fileInput.files[0].text()
        .then(data => {
            if (isValidJson(data)) {
                const json = JSON.parse(data);
                db.import(json);
            }
        });
}

function exportJson() {
    const json = db.export();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.getElementById("confirm-export");
    a.href = url;
    a.download = "workout.json";
    a.style.display = "block";
    // automatically hide after 3 seconds
    setTimeout(() => {
        a.style.display = "none";
    }, 3000);
}

function shareJson() {
    const json = db.export();

    var file = new File([json], "workout.txt", { type: 'text/plain' });
    var filesArray = [file];

    if (navigator.share) {
        navigator.share({
            // file
            files: filesArray
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(err => {
            // Handle errors, if occured
            console.log("Error while using Web share API:");
            console.log(err);
        });
    } else {
        // Alerts user if API not available 
        alert("Browser doesn't support this API !");
    }
}

function editDb() {
    const dayName = document.getElementById("day-input").value;
    const exerciseName = document.getElementById("exercise-input").value;
    const reps = document.getElementById("reps-input").value;
    const sets = document.getElementById("sets-input").value;
    const weight = document.getElementById("weight-input").value;

    // ensure at least day and exercise are filled
    if (dayName && exerciseName) {
        // ensure day is valid
        if (isValidDay(dayName)) {
            db.edit({ dayName, exerciseName, sets, reps, weight });
            window.location.reload();
        }
    }
    else {
        alert("Please fill at least the day and exercise fields");
        return;
    }

    eraseEditInputs();
}

function removeItemDb() {
    const dayName = document.getElementById("day-input").value;
    const exerciseName = document.getElementById("exercise-input").value;

    if (dayName) {
        // ensure day is valid
        if (isValidDay(dayName)) {
            db.remove({ dayName, exerciseName });
            window.location.reload();
        }
    }
    else {
        alert("Please fill the day and/or exercise name fields");
        return;
    }

    eraseEditInputs();
}

function eraseEditInputs() {
    [
        document.getElementById("day-input"),
        document.getElementById("exercise-input"),
        document.getElementById("reps-input"),
        document.getElementById("sets-input"),
        document.getElementById("weight-input")
    ].forEach(input => {
        // erase
        input.value = "";
    });
}

function isValidDay(name) {
    name = name.toLowerCase();
    const isValid = name === "monday" || name === "tuesday" || name === "wednesday" || name === "thursday" || name === "friday" || name === "saturday" || name === "sunday";

    if (!isValid) {
        alert("Please enter a valid day name");
        return false;
    }

    return true;
}

function isValidJson(data) {
    try {
        JSON.parse(data);
    } catch (e) {
        alert("Invalid JSON file");
        return false;
    }
    return true;
}

// use class Db from database.js
let db;

// use class Web from web.js
let web;

// window events
window.addEventListener('load', () => {
    db = new Db();
    web = new Web();

    // I'll use this mechanism, for example to load multilingual content
    const location = window.location.pathname;
    const page = location.substring(location.lastIndexOf("/") + 1);
    if (page == 'index.html') {
        web.init('fitness');
        console.log('fitness');
    }
    else if (page == 'changelog.html') {
        web.init('changelog');
        console.log('changelog');
    }
    else{
        web.init('fitness');
        console.log('fitness');
    }
    //else if (location === '/register.html') {
    //    console.log('register');
    //}
    //else if (location === '/login.html') {
    //    console.log('login');
    //}
    //else if (location === '/index.html') {
    //    console.log('index');
    //}
    //else if (location === '/privacy.html') {
    //    console.log('privacy');
    //}
    //else {
    //    // parse url
    //    console.log(location);
    //    setTimeout(() => {
    //        window.location.href = '/index.html';
    //    }, 1000);
    //}
});