// main game container to apply blur
const gameMain = document.getElementById ('main-container');

// game 'start' button
const startButton = document.getElementById('start-button');

// game text announser
const announcer = document.getElementById('announcer');

// nodelist for all 'x'
const xNodeList = document.getElementsByClassName('cross');
// nodelist for all 'o'
const oNodeList = document.getElementsByClassName('circle');
// nodelist for all cells
const cellNodeList = document.getElementsByClassName('cell');

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

// function for collecting player data

// 1.Pushing the 'start' button will call the form to collect player data

// 2.Script will create player objects according to the data

// 3.Script initiates the array, containing game field data, hides the start button and gives cells class '.active'

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
        const show = (item) => {
            item.classList.remove('no-visible')
        };
        const hide = (item) => {
            item.classList.add('no-visible')
        };
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
                        hide(formSelectLabelX);
                        hide(formSelectInputX);
                        break;
                    case 'computer-x':
                        show(formSelectLabelX);
                        show(formSelectInputX);
                        break;
                    case 'human-o':
                        hide(formSelectLabelO);
                        hide(formSelectInputO);
                        break;
                    case 'computer-o':
                        show(formSelectInputO);
                        show(formSelectLabelO);
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
  
    // Public methods
    return {
      listenRadios: listenRadios,
      unListenRadios: unListenRadios
    };
})();

const toggleVisibility = (item) => {
    item.classList.toggle('no-visible');
};

const toggleBlur = () => {
    gameMain.classList.toggle('blur');
}


const startGame = () => {
    toggleVisibility(startButton);
    toggleVisibility(announcer);
    toggleBlur();
    toggleVisibility(formScreen);
    form.listenRadios();
  };


startButton.addEventListener('click', startGame);


  
  