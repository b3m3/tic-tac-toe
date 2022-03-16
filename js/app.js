window.addEventListener('DOMContentLoaded', () => {
    const wrapp = document.querySelector('.tic-tac-toe__wrapp');
    const boxes = document.querySelectorAll('.box');
    const title = document.querySelector('.title');
    const restartBtn = document.querySelector('.restart');
    const sounds = document.querySelectorAll('.sound');
    const soundStatus = document.querySelector('.soundStatus');
    const soundStep = document.querySelector('.step');
    const soundWin = document.querySelector('.win');
    const soundDraw = document.querySelector('.draw');

    const winPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let stepCounter = 0;
    let drawCounter = 0;

    const addStyle = (sound, status) => {
        title.textContent = `${status}`;
        title.style.animation = 'animtitle .7s linear';
        wrapp.style.opacity = '.45';
        wrapp.style.pointerEvents = 'none';
        sound.play();
        restartBtn.style.cssText = `
            box-shadow: 0 0 5px 3px rgba(63, 63, 63, 0.2);
            color: rgb(255, 255, 255);
            background-color: rgb(44, 44, 44);
        `;
    };

    const step = (elem) => {
        stepCounter++;

        if (stepCounter % 2 === 1) {
            elem.classList.add('icon-cross');
        } else {
            elem.classList.add('icon-radio');
        }
    };

    const winner = (symbol) => {
        addStyle(soundWin, symbol);
    };

    const draw = () => {
        drawCounter++;
        if (drawCounter >= 9 && title.textContent === 'Tic tac toe') {
            addStyle(soundDraw, 'Draw !');
        }
    };

    const findOutTheWinner = () => {
        for (const key in winPositions) {
            if (boxes[winPositions[key][0]].classList.contains('icon-cross') &&
                boxes[winPositions[key][1]].classList.contains('icon-cross') &&
                boxes[winPositions[key][2]].classList.contains('icon-cross')) {
                winner('Crosses Win');
            } else if (boxes[winPositions[key][0]].classList.contains('icon-radio') &&
                boxes[winPositions[key][1]].classList.contains('icon-radio') &&
                boxes[winPositions[key][2]].classList.contains('icon-radio')) {
                winner('Circles Win');
            }
        }
    };

    const toggleIconStatus = (element, currentClass, nextClass) => {
        if (element.classList.contains(currentClass)) {
            element.classList.remove(currentClass);
            element.classList.add(nextClass);
        } else {
            element.classList.add(currentClass);
            element.classList.remove(nextClass);
        }
    };

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            soundStep.play();
            step(box);
            findOutTheWinner();
            draw();
        }, { once: true });
    });

    restartBtn.addEventListener('click', () => {
        boxes.forEach(box => box.innerHTML = '', location.reload());
    });

    soundStatus.addEventListener('click', () => {
        toggleIconStatus(soundStatus, 'icon-high', 'icon-mute');

        if (soundStatus.classList.contains('icon-high')) {
            localStorage.setItem('sound', 'high');
            sounds.forEach(sound => sound.muted = false);
        } else {
            localStorage.setItem('sound', 'mute');
            sounds.forEach(sound => sound.muted = true);
        }
    });

    if (localStorage.getItem('sound') === 'mute') {
        soundStatus.classList.add('icon-mute');
        soundStatus.classList.remove('icon-high');
        sounds.forEach(sound => sound.muted = true);
    } else {
        soundStatus.classList.remove('icon-mute');
        soundStatus.classList.add('icon-high');
        sounds.forEach(sound => sound.muted = false);
    }
});