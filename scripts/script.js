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
// cpu type radio for player 'x'
const cpuRadioX = document.getElementById('computer-x')
// select element for player 'x'
const cpuDifX = document.getElementById('cpu-dif-x');
// cpu type radio for player 'o'
const cpuRadioO = document.getElementById('computer-o')
// select element for player 'o'
const cpuDifO = document.getElementById('cpu-dif-o')

// game end message screen
const endScreen = document.getElementById('end-screen');
// game end message
const endMessage = document.getElementById('end-message')
// replay button
const reButton = document.getElementById('ret-button');