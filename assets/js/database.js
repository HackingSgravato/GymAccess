class Db {
    clear() {
        localStorage.clear();
        window.location.reload();
    }
    import(json) {
        this.update(json);
    }
    export() {
        return JSON.stringify(this.retrieve());
    }
    edit({ dayName, exerciseName, sets, reps, weight }) {
        const db = this.retrieve();
        let day = db.days.find(day => day.name === dayName);

        // capitalize first letter and lowercase the rest
        dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase();

        if (!day) {
            db.days.push({
                name: dayName,
                exercises: []
            });
            this.update(db, false);
            day = db.days.find(day => day.name === dayName);
        }

        let exercise = day.exercises.find(exercise => exercise.name === exerciseName);

        if (!exercise) {
            day.exercises.push({
                name: exerciseName,
                sets: sets,
                reps: reps,
                weight: weight
            });
            this.update(db, false);
            exercise = day.exercises.find(exercise => exercise.name === exerciseName);
        }

        const oldSets = exercise.sets;
        const oldReps = exercise.reps;
        const oldWeight = exercise.weight;

        const newlog = {
            exerciseName,
        }

        if (oldReps != reps) {
            exercise.reps = reps;
            newlog.oldReps = oldReps;
            newlog.newReps = reps;
        }
        if (oldSets != sets) {
            exercise.sets = sets;
            newlog.oldSets = oldSets;
            newlog.newSets = sets;
        }
        if (oldWeight != weight) {
            exercise.weight = weight;
            newlog.oldWeight = oldWeight;
            newlog.newWeight = weight;
        }

        if (newlog.oldReps || newlog.oldSets || newlog.oldWeight) {
            this.update(db, false);
            this.log(newlog);
            return;
        }

        this.update(db);
    }
    remove({ dayName, exerciseName }) {
        if (exerciseName) {
            const db = this.retrieve();
            const day = db.days.find(day => day.name === dayName);
            // if day exists
            if (day) {
                const exercise = day.exercises.find(exercise => exercise.name === exerciseName);
                // if exercise exists
                if (exercise) {
                    // if exercise is the only one in the day
                    if (day.exercises.length === 1) {
                        // remove day
                        db.days = db.days.filter(day => day.name !== dayName);
                    } else {
                        // remove exercise
                        day.exercises = day.exercises.filter(exercise => exercise.name !== exerciseName);
                    }
                    this.update(db);
                }
            }
        }
        else {
            const db = this.retrieve();
            db.days = db.days.filter(day => day.name != dayName);
            this.update(db);
        }
    }
    log({ exerciseName, oldSets, newSets, oldReps, newReps, oldWeight, newWeight }) {
        const newLog = {
            exerciseName: exerciseName,
            date: new Date().toLocaleString(),
        }
        if (oldSets && newSets) {
            newLog.oldSets = oldSets;
            newLog.newSets = newSets;
        }
        if (oldReps && newReps) {
            newLog.oldReps = oldReps;
            newLog.newReps = newReps;
        }
        if (oldWeight && newWeight) {
            newLog.oldWeight = oldWeight;
            newLog.newWeight = newWeight;
        }

        const db = this.retrieve();
        db.logs.push(newLog);
        this.update(db, false);
    }
    update(db, reload = true) {
        localStorage.setItem('db', JSON.stringify(db));
        if (reload) {
            window.location.reload();
        }
    }
    retrieve() {
        let db = localStorage.getItem('db');
        if (db) {
            return this.toJson(db);
        }
        else {
            const template = {
                days: [],
                logs: []
            };
            localStorage.setItem('db', JSON.stringify(template));
            return template
        }
    }
    toJson(db) {
        return JSON.parse(db);
    }
}