class Web {
    init(type) {
        if (type === 'fitness') {
            this.initFitness();
        }
        else if (type === 'changelog') {
            this.initChangelog();
        }
    }
    initFitness() {
        // get json from db
        const days = db.retrieve()['days'];
        // get table
        const table = document.getElementById("table-body");
        // events to edit and delete row
        table.addEventListener('click', (e) => {
            this.edit(e.target.parentNode);
        });
        // order days of the week
        const orderedDays = [];
        days.forEach(day => {
            switch (day.name) {
                case 'Monday':
                    orderedDays[0] = day;
                    break;
                case 'Tuesday':
                    orderedDays[1] = day;
                    break;
                case 'Wednesday':
                    orderedDays[2] = day;
                    break;
                case 'Thursday':
                    orderedDays[3] = day;
                    break;
                case 'Friday':
                    orderedDays[4] = day;
                    break;
                case 'Saturday':
                    orderedDays[5] = day;
                    break;
                case 'Sunday':
                    orderedDays[6] = day;
                    break;
            }
        });
        // loop through days
        orderedDays.forEach(day => {
            // ensure the day exists
            if (!day) {
                return;
            }
            // fill cells
            day.exercises.forEach(exercise => {
                // create row
                const row = document.createElement("tr");
                // create cells
                const dayName = document.createElement("td");
                const exerciseName = document.createElement("td");
                const exerciseReps = document.createElement("td");
                const exerciseSets = document.createElement("td");
                const exerciseWeight = document.createElement("td");
                // fill cells
                dayName.innerHTML = day.name;
                exerciseName.innerHTML = exercise.name;
                exerciseReps.innerHTML = exercise.reps;
                exerciseSets.innerHTML = exercise.sets;
                exerciseWeight.innerHTML = exercise.weight;
                // append cells to row
                row.appendChild(dayName);
                row.appendChild(exerciseName);
                row.appendChild(exerciseReps);
                row.appendChild(exerciseSets);
                row.appendChild(exerciseWeight);
                // append row to table
                table.appendChild(row);
            });
            // empty row beetwen days
            const emptyRow = document.createElement("tr");
            const emptyCell = document.createElement("td");
            const emptyCell2 = document.createElement("td");
            const emptyCell3 = document.createElement("td");
            const emptyCell4 = document.createElement("td");
            const emptyCell5 = document.createElement("td");
            // assign
            emptyCell.innerHTML = "&nbsp;";
            emptyCell2.innerHTML = "&nbsp;";
            emptyCell3.innerHTML = "&nbsp;";
            emptyCell4.innerHTML = "&nbsp;";
            emptyCell5.innerHTML = "&nbsp;";
            // append cells to row
            emptyRow.appendChild(emptyCell);
            emptyRow.appendChild(emptyCell2);
            emptyRow.appendChild(emptyCell3);
            emptyRow.appendChild(emptyCell4);
            emptyRow.appendChild(emptyCell5);
            table.appendChild(emptyRow);
        });
    }
    initChangelog() {
        // get json from db
        const changelog = db.retrieve()['logs'];
        // get table
        const table = document.getElementById("table-body");
        // loop through changelog
        changelog.forEach(entry => {
            // create row
            const row = document.createElement("tr");
            // create cells
            const date = document.createElement("td");
            const exercise = document.createElement("td");
            const oldReps = document.createElement("td");
            const newReps = document.createElement("td");
            const oldSets = document.createElement("td");
            const newSets = document.createElement("td");
            const oldWeight = document.createElement("td");
            const newWeight = document.createElement("td");
            // fill cells
            date.innerHTML = entry.date;
            exercise.innerHTML = entry.exerciseName;
            if (entry.oldReps) {
                oldReps.innerHTML = entry.oldReps;
                newReps.innerHTML = entry.newReps;
            }
            else {
                oldReps.innerHTML = "-";
                newReps.innerHTML = "-";
            }
            if (entry.oldSets) {
                oldSets.innerHTML = entry.oldSets;
                newSets.innerHTML = entry.newSets;
            }
            else {
                oldSets.innerHTML = "-";
                newSets.innerHTML = "-";
            }
            if (entry.oldWeight) {
                oldWeight.innerHTML = entry.oldWeight;
                newWeight.innerHTML = entry.newWeight;
            }
            else {
                oldWeight.innerHTML = "-";
                newWeight.innerHTML = "-";
            }
            // append cells to row
            row.appendChild(date);
            row.appendChild(exercise);
            row.appendChild(oldReps);
            row.appendChild(newReps);
            row.appendChild(oldSets);
            row.appendChild(newSets);
            row.appendChild(oldWeight);
            row.appendChild(newWeight);
            // append row to table
            table.appendChild(row);
        });
    }
    edit(target) {
        // prevent edit if clicked on empty row
        if (target.children[0].innerHTML === "&nbsp;") {
            return;
        }

        // enable edit
        [
            document.getElementById("day-input"),
            document.getElementById("exercise-input"),
            document.getElementById("reps-input"),
            document.getElementById("sets-input"),
            document.getElementById("weight-input")
        ].forEach(input => input.removeAttribute('disabled'));

        // getting current value
        const day = target.children[0].innerHTML;
        const exercise = target.children[1].innerHTML;
        const reps = target.children[2].innerHTML;
        const sets = target.children[3].innerHTML;
        const weight = target.children[4].innerHTML;

        // getting text inputs
        const dayInput = document.getElementById("day-input");
        const exerciseInput = document.getElementById("exercise-input");
        const repsInput = document.getElementById("reps-input");
        const setsInput = document.getElementById("sets-input");
        const weightInput = document.getElementById("weight-input");

        // filling text inputs
        dayInput.value = day;
        exerciseInput.value = exercise;
        repsInput.value = reps;
        setsInput.value = sets;
        weightInput.value = weight;
    }
}