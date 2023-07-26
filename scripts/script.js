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
        console.log(event)
        event.target.click();
        updateRadios()
    }
  
    const listenRadios = () => {
        for(i = 0; i < formRadioLabels.length; i++) {
            let radio = formRadioLabels[i];
            radio.addEventListener('click', clickRadios);
            console.log(radio);
        };
    };

    const unListenRadios = () => {
        for(i = 0; i < formRadioLabels.length; i++) {
            let radio = formRadioLabels[i];
            radio.removeEventListener('click', clickRadios);
            console.log(radio);
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

    const refresh = () => {
        gameplay.gameArr.forEach((arg) => {
                let i = gameplay.gameArr.indexOf(arg);
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
        });
    };

    return {show, hide, toggleBlur, refresh};
})();

const gameplay = (() => {

    const Player = (type, difficulty) => {
        const getType = () => type;
        const getDifficulty = () => difficulty;
    
        return {getMark, getType, getDifficulty};
    };

    const gatherForm = () => {
        return new Promise(function(resolve, reject){
            playerForm.addEventListener('submit',(event) =>{
                event.preventDefault();
                let typeX = playerForm.elements.playerTypeX.value;
                let diffX = playerForm.elements.cpuDifX.value;
                
                let typeO = playerForm.elements.playerTypeO.value;
                let diffO = playerForm.elements.cpuDifO.value;
                
                if (playerTypeX.trim() === '' || playerTypeO.trim() === '') {
                    reject('Please fill in the form');
                    return;
                }

                const PlayerX = Player(typeX, diffX);
                const PlayerO = Player(typeO, diffO);
                playerForm.reset();
                setTimeout(() => {
                    resolve('Form submitted succesfully');
                    return PlayerX, PlayerO;
                }, 2000);
            });
        });
    }

    const gameArr = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];



    return {gatherForm, gameArr}
})();

const runGame = () => {
    display.hide(startButton);
    display.show(announcer);
    display.toggleBlur();
    display.show(formScreen);
    form.listenRadios();
    gameplay.gatherForm();
    form.unListenRadios();
    display.hide(formScreen);
    display.toggleBlur();
  };


startButton.addEventListener('click', runGame);


  
  