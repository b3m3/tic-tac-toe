window.addEventListener('DOMContentLoaded', () => {
    const wrapp = document.querySelector('.tic-tac-toe__wrapp');
    const boxes = document.querySelectorAll('.box');
    const title = document.querySelector('.title');
    const restartBtn = document.querySelector('.restart');
    const soundStatus = document.querySelector('.soundStatus');
    const themeStatus = document.querySelector('.themeStatus');
    const soundStep = document.querySelector('.step');
    const soundWin = document.querySelector('.win');
    const soundDraw = document.querySelector('.draw');

    const winPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let stepCounter = 0;
    let drawCounter = 0;

    const addStyle = (sound, status) => {
        title.textContent = `${status}`;
        wrapp.style.opacity = '.2';
        wrapp.style.pointerEvents = 'none';
        sound.play();
        restartBtn.style.cssText = `
            box-shadow: 0 0 5px 3px rgba(255, 255, 255, .2);
            color: rgb(255, 255, 255);
            background-color: rgb(44, 44, 44);
        `;
    };

    const step = (elem) => {
        stepCounter++;

        if (stepCounter % 2 === 1) {
            elem.innerHTML = '&#10006;';
        } else {
            elem.innerHTML = '&#9675;';
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
            if (boxes[winPositions[key][0]].textContent === '✖' &&
                boxes[winPositions[key][1]].textContent === '✖' &&
                boxes[winPositions[key][2]].textContent === '✖') {
                winner('"✖" is Win !');
            } else if (boxes[winPositions[key][0]].textContent === '○' &&
                boxes[winPositions[key][1]].textContent === '○' &&
                boxes[winPositions[key][2]].textContent === '○') {
                winner('"○" is Win !');
            }
        }
    };

    const toggleStatus = (elem, lSName, lSStatusOn, lSStatusOff, activeBefore, activeAfter) => {

        if (elem.classList.contains(activeBefore)) {
            elem.classList.remove(activeBefore);
            elem.classList.add(activeAfter);
            localStorage.setItem(lSName, lSStatusOn);
        } else {
            elem.classList.add(activeBefore);
            elem.classList.remove(activeAfter);
            localStorage.setItem(lSName, lSStatusOff);
        }
    };

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            step(box);
            soundStep.play();
            findOutTheWinner();
            draw();
        }, { once: true });
    });

    restartBtn.addEventListener('click', () => {
        boxes.forEach(box => box.innerHTML = '', location.reload());
    });

    soundStatus.addEventListener('click', () => {
        toggleStatus(soundStatus, 'sound', 'on', 'off', 'icon-volume-mute2', 'icon-volume-high');
    });

    themeStatus.addEventListener('click', () => {
        toggleStatus(themeStatus, 'theme', 'light', 'dark', 'icon-brightness-contrast', 'icon-sun');
    });
});