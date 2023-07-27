// main game container to apply blur
const gameMain = document.getElementById ('main-container');

// game 'start' button
const startButton = document.getElementById('start-button');

// screen for collecting form
const formScreen = document.getElementById('form-container');
// collecting form
const playerForm = document.getElementById('start');

// game end message screen
const endScreen = document.getElementById('end-screen');
// game end message
const endMessage = document.getElementById('end-message');
// replay button
const reButton = document.getElementById('ret-button');


// 4.Turn 'x', player annonsed, array checked, gamefield refreshed, waiting for player input, input taken, array modified, array cheked for winning conditions

// 5.Turn 'o', player annonsed, array checked, gamefield refreshed, waiting for player input, input taken, array modified, array cheked for winning conditions

// 6.Repeat turns until array matches winning conditions, stop game, announce the result

// 7.'Try again' button reloads page

// Script to maintain the form

const form = (() => {
    const formRadioInputs = document.querySelectorAll('input[type="radio"]');
    const formRadioLabels = document.querySelectorAll('.radio')
    const formSelectInputX = document.getElementById('cpu-dif-x');
    const formSelectLabelX = document.querySelector('label[for="cpu-dif-x"]');
    const formSelectInputO = document.getElementById('cpu-dif-o');
    const formSelectLabelO = document.querySelector('label[for="cpu-dif-o"]');

    const updateRadios = () => {
        const check = (item) => {
            item.classList.add('radio-checked')
        };
        const unCheck = (item) => {
            item.classList.remove('radio-checked')
        };

        for(let i = 0; i < formRadioInputs.length; i++) {
            let radio = formRadioInputs[i];
            let label = formRadioLabels[i];

            if (radio.checked) {
                check(label);
                switch(radio.id) {
                    case 'human-x':
                        display.hide(formSelectLabelX);
                        display.hide(formSelectInputX);
                        break;
                    case 'computer-x':
                        display.show(formSelectLabelX);
                        display.show(formSelectInputX);
                        break;
                    case 'human-o':
                        display.hide(formSelectLabelO);
                        display.hide(formSelectInputO);
                        break;
                    case 'computer-o':
                        display.show(formSelectInputO);
                        display.show(formSelectLabelO);
                        break;
                };
            } else {
                unCheck(label);
            }
        }; 
    }

    const clickRadios = (event) => {
        event.target.click();
        updateRadios()
    }
  
    const listenRadios = () => {
        for(i = 0; i < formRadioLabels.length; i++) {
            let radio = formRadioLabels[i];
            radio.addEventListener('click', clickRadios);
        };
    };

    const unListenRadios = () => {
        for(i = 0; i < formRadioLabels.length; i++) {
            let radio = formRadioLabels[i];
            radio.removeEventListener('click', clickRadios);
        };
    };
  
    return {listenRadios, unListenRadios};
})();

const display = (() => {
    // game text announser
    const announcer = document.getElementById('announcer');
    // nodelist for all 'x'
    const xNodeList = document.getElementsByClassName('cross');
    // nodelist for all 'o'
    const oNodeList = document.getElementsByClassName('circle');
    // nodelist for all cells
    const cellNodeList = document.getElementsByClassName('cell');
    // x player turn announcer
    const turnMesX = document.getElementById("turn-mes-x");
    // o player turn announcer
    const turnMesO = document.getElementById("turn-mes-o");
    // endgame message player 'x' wins
    const winMesX = document.getElementById("win-message-x");
    // endgame message player 'o' wins
    const winMesO = document.getElementById("win-message-o");
    //  endgame message for human player lost
    const lostMesPlayer = document.getElementById("lost-message-player");
    // endgame message for human player wins
    const winMesPlayer = document.getElementById("win-message-player");
    // endgame message for a draw
    const drawMes = document.getElementById("draw-message");

    const show = (item) => {
        item.classList.remove('no-visible')
    };
    const hide = (item) => {
        item.classList.add('no-visible')
    };
    const toggleBlur = () => {
        gameMain.classList.toggle('blur');
    };
    const activate = (item) => {
        item.classList.add('active')
    }
    const deActivate = (item) => {
        item.classList.remove('active');
    }

    const turnAnnounce = (mark) => {
        switch(mark) {
            case 'x':
                show(turnMesX);
                hide(turnMesO);
                break;
            case 'o':
                show(turnMesO);
                hide(turnMesX);
                break;
            default:
                hide(turnMesX);
                hide(turnMesO);
                break;
        };
    };

    const showEndMes = (mark, playerType) => {
        toggleBlur();

        switch(mark) {
            case 'x':
                show(winMesX);
                break;
            case 'o':
                show(winMesO);
                break;
        }

        switch(playerType) {
            case 'human':
                show(winMesPlayer);
                break;
            case 'computer':
                show(lostMesPlayer);
                break;
        }

    };

    const showEndMesDraw = () => {
        toggleBlur();
        show(drawMes);
    }

    const refresh = () => {
        let gameArr = gameplay.gameArr;
        for(let i = 0; i < gameArr.length; i++) {
                let arg = gameArr[i];
                let cross = xNodeList[i];
                let circle = oNodeList[i];
                let cell = cellNodeList[i];
                switch (arg) {
                    case 'x':
                        show(cross);
                        deActivate(cell);
                        break;
                    case 'o':
                        show(circle);
                        deActivate(cell);
                        break;
                    default:
                        hide(circle);
                        hide(cross);
                        activate(cell);
                }
        };
    };

    return {
        show, 
        hide, 
        toggleBlur, 
        refresh, 
        deActivate,
        turnAnnounce,
        showEndMes,
        showEndMesDraw,
        cellNodeList
    };
})();

const gameplay = (() => {
    const gameArr = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let playerX;
    let playerO;
    const cellNodeList = Array.from(display.cellNodeList);

    const Player = (mark, type, difficulty) => {
        const getType = () => type;
        const getDifficulty = () => difficulty;
        const getMark = () => mark;
    
        return {getMark, getType, getDifficulty};
    };

    const gatherForm = () => {
        return new Promise((resolve, reject) => {
            playerForm.addEventListener('submit',(event) =>{
                event.preventDefault();
                let typeX = playerForm.elements.playerTypeX.value;
                let diffX = playerForm.elements.cpuDifX.value;
                
                let typeO = playerForm.elements.playerTypeO.value;
                let diffO = playerForm.elements.cpuDifO.value;
                
                if (typeX.trim() === '' || typeO.trim() === '') {
                    reject('Please fill in the form');
                    return;
                }

                playerX = Player('x', typeX, diffX);
                playerO = Player('o', typeO, diffO);
                form.unListenRadios();
                display.hide(formScreen);
                display.toggleBlur();
                playerForm.reset();
                setTimeout(() => {
                    resolve({ playerX, playerO });
                }, 500);
            });
        });
    };

    const playerInput = (mark, playerType) => {
        return new Promise((resolve, reject) => {
            const clickHandler = (event) => {
                let cell = event.target;
                let i = cellNodeList.indexOf(cell);
    
                if (i === -1) {
                    reject('Invalid cell clicked');
                    return;
                }
    
                cell.removeEventListener('click', clickHandler);
    
                gameArr[i] = mark;
                display.deActivate(cell);
    
                setTimeout(() => {
                    resolve('Cell clicked');
                }, 100);
            };
    
            if (playerType === 'human') {
                for (let i = 0; i < cellNodeList.length; i++) {
                    cellNodeList[i].addEventListener('click', clickHandler);
                };
            } else if (playerType === 'cpu') {
                cpuMove(mark);

                setTimeout(() => {
                    resolve('CPU move');
                }, 500);
            }
        });
    };

    const checkWinningConditions = (mark) => {
        // Winning patterns to check
        const winningPatterns = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal from top-left to bottom-right
            [2, 4, 6], // Diagonal from top-right to bottom-left
        ];
    
        // Check each winning pattern
        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (gameArr[a] === mark && gameArr[b] === mark && gameArr[c] === mark) {
                return true;
            }
        }
    
        return false;
    };

    const handleTurn = (currentPlayer) => {
        const mark = currentPlayer.getMark();
        const playerType = currentPlayer.getType();

        display.turnAnnounce(mark);
        playerInput(mark, playerType)
            .then(() => {
                display.refresh();

                if (checkWinningConditions(mark)) {
                    display.showEndMes(mark, playerType);
                    display.show(endScreen);
                    return;
                } else if (gameArr.indexOf(' ') === -1) {
                    display.showEndMesDraw();
                    display.show(endScreen);
                    return;
                } else {
                    currentPlayer = currentPlayer === playerX ? playerO : playerX;

                    handleTurn(currentPlayer);
                }
            });
    };

    const runGame = () => {
        display.refresh();
        display.hide(startButton);
        display.show(announcer);
        display.toggleBlur();
        display.show(formScreen);
        form.listenRadios();
        gatherForm()
            .then(({playerX, playerO}) => {
                handleTurn(playerX);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return {
        gameArr,
        runGame
    }
})();

startButton.addEventListener('click', gameplay.runGame);
 