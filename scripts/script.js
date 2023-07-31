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
// replay button
const reButton = document.getElementById('ret-button');

// Function handling form items display and reaction
const form = (() => {
    // nodelist of radio inputs
    const formRadioInputs = document.querySelectorAll('input[type="radio"]');
    // nodelist for radio labels
    const formRadioLabels = document.querySelectorAll('.radio')
    // select input for player 'x'
    const formSelectInputX = document.getElementById('cpu-dif-x');
    //  select input label for player 'x'
    const formSelectLabelX = document.querySelector('label[for="cpu-dif-x"]');
    // select input for player 'o'
    const formSelectInputO = document.getElementById('cpu-dif-o');
    //  select input label for player 'o'
    const formSelectLabelO = document.querySelector('label[for="cpu-dif-o"]');

    // Update radio labels according to their values
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

    // landing double click for proper updates
    const clickRadios = (event) => {
        event.target.click();
        updateRadios()
    }
    
    // adding event listeners for radios
    const listenRadios = () => {
        for(i = 0; i < formRadioLabels.length; i++) {
            let radio = formRadioLabels[i];
            radio.addEventListener('click', clickRadios);
        };
    };

    // removing event listeners
    const unListenRadios = () => {
        for(i = 0; i < formRadioLabels.length; i++) {
            let radio = formRadioLabels[i];
            radio.removeEventListener('click', clickRadios);
        };
    };
    
    // puplic methods
    return {listenRadios, unListenRadios};
})();

// function to handle game display
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
        let board = gameplay.board;
        for(let i = 0; i < board.length; i++) {
                let arg = board[i];
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

    // public methods
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

// function to handle gameplay
const gameplay = (() => {
    // array containing game board info
    const board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    // player 'x' initialisation
    let playerX;
    // player 'o' initialisation
    let playerO;
    // convertiong nodelist to array to use in function
    const cellNodeList = Array.from(display.cellNodeList);

    // player factory
    const Player = (mark, type, difficulty) => {
        const getType = () => type;
        const getDifficulty = () => difficulty;
        const getMark = () => mark;
    
        return {getMark, getType, getDifficulty};
    };

    // function to gather info for players
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

    // get info about empty cells on board
    const getEmptyCells = (board) => {
        return board.reduce((indexes, cell, index) => {
          if (cell === ' ') {
            indexes.push(index);
          }
          return indexes;
        }, []);
      };

    // function handling computer input
    const computerInput = (mark, cpuDif, playerType) => {
        console.log("difficulty is" + cpuDif);
        return new Promise((resolve, reject) => {
            if(playerType === 'human') {
                resolve('Human move');
            }
            const emptyCells = getEmptyCells(board);

            // function to make computer move
            const makeMove = (index, mark, arr) => {
                if (arr[index] === ' ') {
                arr[index] = mark;
                return true;
                }
                return false;
            };

            // calculate silly move index
            const moveSilly = () => {
                return emptyCells[Math.floor(Math.random() * emptyCells.length)];
            }

            // calculate smart move index
            const moveSmart = () => {
                // check if there avaible move to make to win
                for (let i = 0; i < emptyCells.length; i++) {
                    let boardCopy = [...board];
                    let index = emptyCells[i];
                    if (makeMove(index, mark, boardCopy)) {
                        if (checkWinningConditions(boardCopy, mark)) {
                            return index;
                        }
                    }
                }

                // toggle mark for opponents one
                const opponentMark = mark === 'x' ? 'o' : 'x';

                // check if there any winning moves for opponent to block them
                for (let i = 0; i < emptyCells.length; i++) {
                    let boardCopy = [...board];
                    let index = emptyCells[i];
                    if (makeMove(index, opponentMark, boardCopy)) {
                        if (checkWinningConditions(boardCopy, opponentMark)) {
                            return index;
                        }
                    }
                }

                return moveSilly();
            };

            // choose tactics according to difficulty
            switch (cpuDif) {
                case 'easy':
                    index = moveSilly();
                    break;
                case 'normal':
                    index = moveSmart();
                    break;
            }
            setTimeout(() => {
                makeMove(index, mark, board);
                let cell = cellNodeList[index];
                display.deActivate(cell);
                console.log ({mark, index, cell})
                resolve('computer move')
            }, 1500);
        });
    };

    // function to handle human input
    const humanInput = (mark, playerType) => {
        return new Promise((resolve, reject) => {
            const clickHandler = (event) => {
                let cell = event.target;
                let i = cellNodeList.indexOf(cell);
    
                if (i === -1) {
                    reject(clickHandler());
                    return Promise;
                }
    
                cell.removeEventListener('click', clickHandler);
    
                board[i] = mark;
                display.deActivate(cell);
    
                setTimeout(() => {
                    resolve('Cell clicked');
                }, 100);
            };
    
            if (playerType === 'human') {
                for (let i = 0; i < cellNodeList.length; i++) {
                    cellNodeList[i].addEventListener('click', clickHandler);
                };
            } else if (playerType === 'computer') {
                resolve('CPU move');
            }
        });
    };

    // winning conditions check
    const checkWinningConditions = (arr, mark) => {
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
            if (arr[a] === mark && arr[b] === mark && arr[c] === mark) {
                return true;
            }
        }
    
        return false;
    };

    // function handling endgame screen and 'play again' button
    const endGame = () => {
        display.show(endScreen);
        reButton.addEventListener('click', () => {
            location.reload();
        });
    }

    // handling turn
    const handleTurn = (currentPlayer) => {
        const mark = currentPlayer.getMark();
        const playerType = currentPlayer.getType();
        const cpuDif = currentPlayer.getDifficulty();

        console.log('start turn')

        display.turnAnnounce(mark);

        const endTurn = () => {
            display.refresh();

            if (checkWinningConditions(board, mark)) {
                display.showEndMes(mark, playerType);
                endGame();
                return;
            } else if (board.indexOf(' ') === -1) {
                display.showEndMesDraw();
                endGame();
                return;
            } else {
                currentPlayer = currentPlayer === playerX ? playerO : playerX;
                handleTurn(currentPlayer);
            }
        }

        const handleHumanInput = () => {
            return humanInput(mark, playerType);
        };
    
        const handleComputerInput = () => {
            return computerInput(mark, cpuDif, playerType);
        };
    
        handleHumanInput()
        .then(() => {
            if (playerType === 'computer') {
                return handleComputerInput();
            }
        })
        .then(() => endTurn());     
    };

    // handles game statrt
    const runGame = () => {
        display.refresh();
        display.hide(startButton);
        display.show(announcer);
        display.toggleBlur();
        display.show(formScreen);
        form.listenRadios();
        gatherForm()
            .then(() => {
                handleTurn(playerX);
            })
    };

    // public methods
    return {
        board,
        runGame
    }
})();

startButton.addEventListener('click', gameplay.runGame);
 