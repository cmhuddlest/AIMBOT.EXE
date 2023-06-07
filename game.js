//-------custom crosshair --------
// crosshair = document.querySelector('.crosshair')

// // window.addEventListener('mousemove',function(e){
// // crosshair.style.left = e.pageX + "px";
// // crosshair.style.top = e.pageY + "px";
// // })

// ------move view model to follow mouse------
// var cv = document.createElement('canvas');
// var ctx = cv.getContext('2d');
// cv.width = 1224;
// cv.height = 768;
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

//killStat = HTML P Tag 'kills'
const killStat = document.querySelector('#kills');
//timeStat = HTML P Tag 'Time'
const timeStat = document.querySelector('#time');
//-----testing different enemy locations and sizes for array --------
/*
{
        x: .18,
        y: .48,
        height: '60px',
        width: '25px'
    },
    {
        x: .69,
        y: .45,
        height: '50px',
        width: '60px'
    },
    {
        x: .60,
        y: .45,
        height: '120px',
        width: '60px'
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
];
//container = HTML div covering entire page
const container = document.querySelector('#game');

//create gameTimer, this will act as a identifier for when game has started and ended
let gameTimer;

//------set starting value for stats------
let kills = 0;
let time = 0;

//---- setKills = a value that will update HTML code with kill count
function setKills(val){
    kills = val;
    killStat.innerHTML = kills;
}

//---- setTime = a value that will update HTML code with timer
function setTime(val){
    time = val;
    timeStat.innerHTML = time; //
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
//----create game stat start points, timer start value and kills reset to 0 ------
        if(!gameTimer){
            setKills(0);
            setTime(10);

            // ------if no timer exists, start it-------
            gameTimer = setInterval(() => {
                // ------repeat time less 1 -------
                setTime(time-1);
                // ------until 0, game over -------
                if(time <= 0){
                    clearInterval(gameTimer);
                    gameTimer = undefined;
                }
            }, 1000);
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

//----- this is calling the function -------
createEnemy();

