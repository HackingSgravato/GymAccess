window.addEventListener('load', function () {
    loadEn();
    loadEvents();

    const changelog = getChangelog();
    if (changelog.length > 0) {
        changelog.forEach((change) => {
            createChangeCard(change);
        });
    }else{
        document.getElementById('changelog').innerText = 'No changes yet';
    }
});

function loadEvents(){
    week.forEach((day) => {
        day.addEventListener('click', () => {
            toggleDay(day);
        });
    });

    const addExModal = document.getElementById('add-ex-modal');
    addExModal.addEventListener('hidden.bs.modal', () => {
        document.getElementById('ex-name').value = '';
        document.getElementById('ex-weight').value = '';
    });

    const editExModal = document.getElementById('edit-ex-modal');
    editExModal.addEventListener('hidden.bs.modal', () => {
        document.getElementById('edit-ex-weight').value = '';
    });
}

function createChangeCard(change) {
    const div = document.createElement('div');
    div.className = 'changelog disable-select';

    const date = document.createElement('strong');
    date.className = 'changelog-date';
    date.innerText = change.date;

    const exercise = document.createElement('em');
    exercise.className = 'changelog-exercise';
    exercise.innerText = change.exerciseName;

    const oldWeight = document.createElement('span');
    oldWeight.className = 'changelog-oldweight';
    oldWeight.innerText = change.oldWeight;

    const newWeight = document.createElement('span');
    newWeight.className = 'changelog-newweight';
    newWeight.innerText = change.newWeight;

    div.appendChild(date);
    div.appendChild(exercise);
    div.appendChild(oldWeight);
    div.appendChild(newWeight);

    document.getElementById('changelog').appendChild(div);
}

function reloadPage() {
    location.reload();
}