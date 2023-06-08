//-------custom crosshair --------
// crosshair = document.querySelector('.crosshair')

// // window.addEventListener('mousemove',function(e){
// // crosshair.style.left = e.pageX + "px";
// // crosshair.style.top = e.pageY + "px";
// // })

// ------move view model to follow mouse------
// var cv = document.createElement('canvas');
// var ctx = cv.getContext('2d');
// cv.width = 1000;
// cv.height = 700;
// document.body.appendChild(cv);

// var centerX = 700, centerY = 600;

// var img = new Image();
// img.onload = function() {
// 	drawImg(0);
// };
// img.src = 'view model.png';


// function drawImg(angle) {
//   ctx.clearRect(0, 0, cv.width, cv.height);
// 	ctx.save();
//   ctx.translate(centerX, centerY);
//   ctx.rotate(-Math.PI / 2);
//   ctx.rotate(angle);
//   ctx.drawImage(img, -img.width / 2, -img.height / 2);
//   ctx.restore();
// }

// document.onmousemove = function(e) {
//   var aa = e.pageX - centerX;
//   var bb = e.pageY - centerY;
//   var cc = Math.atan2(aa, bb);
// 	drawImg(cc);
// };




// ------- actual code starts here ------------

//set audio to nothing, so I can grab it in our setLoadout function
let audioClip;

//set game length time
const GAME_LENGTH = 30;

//------grab the loadout values from loadout.js and pass it to the #viewmodel in the HTML and select the proper loadout audio file
function setLoadout(){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('loadout');

    let loadout = loadouts[parseInt(myParam) || 0];

    document.querySelector('#viewmodel').src = `viewmodel images/${loadout.gameImage}`;

    audioClip = `audio/${loadout.sound}`;
}
//play audio on click
document.addEventListener('click', function(){
    //do not play click audio if the game is over (if game timer is not real)
    if(!gameTimer) return;
    //create new audio each click so that the sound can be repeated as quickly as you click
    let audio = new Audio(audioClip);
    audio.volume = .20;
    audio.play();
    //each click adds one value to shot
    shots++;

    //------on each shot calculate kills/shot-----
    setAccuracy(kills/shots)
});

//killStat = HTML span Tag 'kills'
const killStat = document.querySelector('#kills');
//timeStat = HTML span Tag 'Time'
const timeStat = document.querySelector('#time');
//accuracyStat = HTML span Tag 'accuracy'
const accuracyStat = document.querySelector('#accuracy');


//-----testing different enemy locations and sizes for array --------
/*
    {
        x: .18, //left and right
        y: .48, //up and down
        height: '60px',
        width: '25px',
        func: () => console.log('A long guy') //potential kill feed call value
        //---- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions ----
    },
    {
        x: .69,
        y: .45,
        height: '50px',
        width: '60px',
        func: () => console.log('He\'s pushing')
    },
    {
        x: .60,
        y: .45,
        height: '120px',
        width: '60px',
        func: () => console.log('Guy who planted')
    }
*/
//----original thought on arrays for location and size----
// const enemyLocs = [[.18, .48]];
// const enemySizes = [['60px', '25px']];

//-----array of good enemy locations for dust map------
//array:
const enemies = [
    //objects:
    {
        x: .18, //left and right
        y: .48, //up and down
        height: '60px',
        width: '25px',
        func: () => console.log('A long guy') //potential kill feed call value
    //     //---- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions ----
    },
    {
        x: .69,
        y: .45,
        height: '50px',
        width: '60px',
        func: () => console.log('He\'s pushing')
    },
    {
        x: .60,
        y: .45,
        height: '120px',
        width: '60px',
        func: () => console.log('Guy who planted')
    },
    {
        x: .04,
        y: .55,
        height: '155px',
        width: '75px',
        func: () => console.log('Guy who rushed')
    },
    {
        x: .50,
        y: .35,
        height: '80px',
        width: '100px',
        func: () => console.log('Guy crouched on da box')
    },
    {
        x: .96,
        y: .03,
        height: '120px',
        width: '80px',
        func: () => console.log('How did he get up there')
    }
];
//container = HTML div covering entire page
const container = document.querySelector('#game');
//gameoverscreen grabs game.html id gameoverscreen
const gameOverScreen = document.querySelector('#gameoverscreen');

const gameOverScore = document.querySelector('#score');

const gameOverAccuracy = document.querySelector('#accuracy-stat');

const restartBtn = document.querySelector('.restart>button');

const homeBtn = document.querySelector('.home>button');

//create gameTimer, this will act as a identifier for when game has started and ended
let gameTimer;

//------set starting value for stats------
let kills = 0;
let shots = 0;
let time = 0;

//---- setKills = a variable that will update HTML code with kill count
function setKills(val){
    kills = val;
    killStat.innerHTML = kills;
}

function setAccuracy(val){
    accuracyStat.innerHTML = Math.floor(val * 100) + '%';
}

//---- setTime = a value that will update HTML code with timer
function setTime(val){
    time = val;
    timeStat.innerHTML = time; //
}

function game(){
    // ------repeat time less 1 -------
    setTime(time-1);
    // ------until 0, game over -------
    if(time <= 0){
        clearInterval(gameTimer);
        gameTimer = undefined;
        //when timer reaches 0, change display none to display flex to show it, edited in CSS
        gameOverScreen.style.display = 'flex';
        //add kills total to our kills span in html
        gameOverScore.innerHTML = kills;
        //add accuracy total to our accuracy span in html
        gameOverAccuracy.innerHTML = shots === 0 ? '0%' : Math.floor(kills/shots * 100) + '%';
    }
}
//on clicking restart button reset startGame
restartBtn.addEventListener('click', function(e){
    startGame();
    e.preventDefault();
    e.stopPropagation();
});

//on startGame sent stat values to default
function startGame(){
    document.querySelector('#tip').style.display = 'none';

    shots = 0;
    setKills(0);
    setTime(GAME_LENGTH);
    setAccuracy(1);
//on restart take away game over screen
    gameOverScreen.style.display = 'none';
    //have game timer repeat each second (1000)
    gameTimer = setInterval(game, 1000);
}

//----function to create the enemy div with class "enemy"-----
function createEnemy(){
    const enemy = document.createElement("div");
    enemy.classList.add('enemy');
//----enemyData = random selection of objects from our "enemies" array-----
    const enemyData = enemies[Math.floor(enemies.length * Math.random())];

    //-----grab the height and width from our randomly selected object-----
    enemy.style.height = enemyData.height
    enemy.style.width = enemyData.width;

    //-----grab the x and y coordinates from our randomly selected object-----
    enemy.style.left = enemyData.x * 100 + '%';
    enemy.style.top = enemyData.y * 100 + '%';
   
//------on first enemy "kill"----
    enemy.addEventListener('click', () => {
        enemyData.func();
        
        if(!gameTimer){
            // If the game isn't running, start it
            startGame();
        }
//------on each kill add 1 to our kill value -----
        setKills(kills+1);
//------on each kill remove the enemy and create a new randomly located enemy -----
        enemy.remove();
        createEnemy();
    });
//------this adds these enemy changes to our html container -----
   container.append(enemy);
}

//----- this is calling the functions -------
createEnemy();


setLoadout();

//start audio on page load
let startup = new Audio(`audio/awp_boltforward.wav`);
startup.volume = .5;
startup.play();