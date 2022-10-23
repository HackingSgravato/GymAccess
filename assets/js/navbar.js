const exerciseContainer = document.querySelector('#exercise');
const changelogContainer = document.querySelector('#changelog');

const exerciseBtn = document.querySelector('#exercise-btn');
const changelogBtn = document.querySelector('#changelog-btn');

function showExercise(){
    exerciseContainer.classList.remove('d-none');
    changelogContainer.classList.add('d-none');

    exerciseBtn.classList.add('nav-active');
    changelogBtn.classList.remove('nav-active');
}

function showChangelog(){
    changelogContainer.classList.remove('d-none');
    exerciseContainer.classList.add('d-none');

    changelogBtn.classList.add('nav-active');
    exerciseBtn.classList.remove('nav-active');
}