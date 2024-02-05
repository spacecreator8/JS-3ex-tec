let ball = document.querySelector('.ball');
let plate = document.querySelector('.plate');

let startGameFlag = false;
let pauseFlag = false;
let idForPause;

let positivityX;
let directionX, directionY;
let contactPoint;
let flagHitPoint1, flagHitPoint2, flagHitPoint3;

let pressedButton =false;
let pressedBtnMotion;
let plateSpeed = 20;
let ballSpeed = 12;
let ySpeed = ballSpeed;
let xSpeed = 0;

let ballYCord = ball.offsetTop;
let ballXCord = ball.offsetLeft;
let ballCenter = {
    x : ballXCord + Math.trunc(ball.clientWidth / 2),
    y : ballYCord + Math.trunc(ball.clientHeight / 2),
}
let arr1, arr2, arr3, arr4;


let playersDataBase = {
    '@@@ANIGIL9TOP@@@':990,
    '123':810,
    'VitekVasyan':700,
    'DOBPb|H9|':9999,
    'aaa':1320,
    'sss':1000,
    'Player4':500,
    'Бабуля':1100,
    'Пращур':800,
    'Олежа BELGORODSKIY':10,
}
let playername;
let preventScores;
let actualScr = document.querySelector('.actualScr').innerHTML;
let actualScores = document.querySelector('.actualScores').innerHTML;
let screen1;
let screen2 = document.querySelector('.main_box');
let lifes = document.querySelector('.lifes').innerHTML;

let endGameFlag=false;
let winnersTable;
let endStartGameButton;

function plateMotion(event){ // логику подсмотрел
    if(!pauseFlag){
        if(pressedButton){
            return;
        }
    
        pressedButton = true;
        let plateCoord = plate.offsetLeft;
        if(event.code == 'ArrowLeft'){
            if(plateCoord <= 2*plateSpeed){
                ;
            }else{
                plate.style.left = `${plateCoord - plateSpeed}px`;
            }    
        }else if(event.code == 'ArrowRight'){
            if(plateCoord >= 850 - 2*plateSpeed){
                ;
            }else{
                plate.style.left = `${plateCoord + plateSpeed}px`;
            }    
        }
    
    
        pressedBtnMotion = setInterval(function(){
            if(event.code == 'ArrowLeft'){
                if(plateCoord <= 2*plateSpeed){
                    clearInterval(pressedBtnMotion);
                }else{
                    plateCoord = plate.offsetLeft;
                    plate.style.left = `${plateCoord - plateSpeed}px`;
                }    
            }else if(event.code == 'ArrowRight'){
                if(plateCoord >= 850 - 2*plateSpeed){
                    clearInterval(pressedBtnMotion);
                }else{
                    plateCoord = plate.offsetLeft;
                    plate.style.left = `${plateCoord + plateSpeed}px`;
                }    
            }      
        }, 40);
    
    }
    }


function stopPlateMotion(){
    pressedButton = false;
    clearInterval(pressedBtnMotion);
}


//при отскоке от платформы Х должен оставаться по знаку таким, каким и был
function bounceMotionChange(angle, ballSpeed, positivityX){
    let radians = angle * (Math.PI / 180);
    let deltaY = Math.trunc(Math.sin(radians) * ballSpeed);
    let deltaX = Math.trunc(Math.cos(radians) * ballSpeed) * positivityX;    
    return{
        x: deltaX,
        y: deltaY,
    }
}

//проверка на столкновение с -стенами, -платформой, -кирпичиками
//изменение xSpeed, ySpeed
//изменение положениия
//обработка конца игры + таблица лидеров
function main(){
    //обновление кординат
    ballYCord = parseInt(ball.offsetTop);
    ballXCord = parseInt(ball.offsetLeft);
    ballCenter = {
        x : ballXCord + Math.trunc(ball.clientWidth / 2),
        y : ballYCord + Math.trunc(ball.clientHeight / 2),
    }

    //проверка на столкновение со стенами
    if(ballCenter.y+25 >= 600){
        ySpeed *=(-1);
        ball.style.top = `${ballYCord + ySpeed}px`;
        lifes--;
        document.querySelector('.lifes').innerHTML=lifes;
        if(lifes==0){
            endGameFlag=true;
        }
    }else if(ballCenter.y-25 <= 0){
        ySpeed *=(-1);
        ball.style.top = `${ballYCord + ySpeed}px`;
    }else if(ballCenter.x+25 >= 1000){
        xSpeed *=(-1);
        ball.style.left = `${ballXCord + xSpeed}px`;
    }else if(ballCenter.x-25 <=0){
        xSpeed *=(-1);
        ball.style.left = `${ballXCord + xSpeed}px`;
    }
    
    //проверка на столкновение с платформой
    if((ballCenter.y+25 >= plate.offsetTop)&&((ballCenter.x>=plate.offsetLeft-20)&&(ballCenter.x<=plate.offsetLeft+30))){
        if (xSpeed == 0){
            positivityX = (-1);
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        console.log(3);
        xSpeed = bounceMotionChange(30, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(30, ballSpeed, positivityX).y*(-1);
    }
    else if((ballCenter.y+25 >= plate.offsetTop)&&((ballCenter.x>=plate.offsetLeft+120)&&(ballCenter.x<=plate.offsetLeft+170))){
        if (xSpeed == 0){
            positivityX = 1;
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        console.log(3);
        xSpeed = bounceMotionChange(30, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(30, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&(ballCenter.x>=plate.offsetLeft+30)&&(ballCenter.x<=plate.offsetLeft+60)){
        if (xSpeed == 0){
            positivityX = (-1);
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        console.log(2);
        xSpeed = bounceMotionChange(60, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(60, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&(ballCenter.x>=plate.offsetLeft+90)&&(ballCenter.x<=plate.offsetLeft+120)){
        if (xSpeed == 0){
            positivityX = 1;
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        console.log(2);
        xSpeed = bounceMotionChange(60, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(60, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&((ballCenter.x>=plate.offsetLeft)&&(ballCenter.x<=plate.offsetLeft+150))){
        ySpeed*=(-1);
        console.log(1);
    }

    //проверка на столкновение с кирпичиками
    xSpeed>0 ? directionX=1 : directionX=(-1);
    ySpeed>0 ? directionY=1 : directionY=(-1);
    contactPoint = {
        x : ballCenter.x + 25*(directionX),
        y : ballCenter.y + 25*(directionY)
    }
    //потом удалить
    let ind = document.querySelector('.indicator1');
    ind.style.top = `${contactPoint.y}px`;
    ind.style.left = `${contactPoint.x}px`;
    let ind2 = document.querySelector('.indicator2');
    ind2.style.top = `${contactPoint.y}px`;
    ind2.style.left = `${contactPoint.x+50*directionX*(-1)}px`;
    let ind3 = document.querySelector('.indicator3');
    ind3.style.top = `${contactPoint.y+50*directionY*(-1)}px`;
    ind3.style.left = `${contactPoint.x}px`;

    arr1 = document.elementsFromPoint(contactPoint.x+25*directionX*-1, contactPoint.y);
    for(let i of arr1){
        if(i.className == 'brick'){
            ySpeed*=(-1);
            actualScores+=10;
            document.querySelector('.actualScores').innerHTML=actualScores;
            arr1.length = 0;
        }
    }
    arr2 = document.elementsFromPoint(contactPoint.x, contactPoint.y+25*directionY*-1);
    for(let i of arr2){
        if(i.className == 'brick'){
            xSpeed*=(-1);
            actualScores+=10;
            document.querySelector('.actualScores').innerHTML=actualScores;
            arr2.length = 0;
        } 
    }
    arr3 = document.elementsFromPoint(contactPoint.x+5*directionX*(-1), contactPoint.y);
    for(let i of arr1){
        if(i.className == 'brick'){
            ySpeed*=(-1);
            actualScores+=10;
            document.querySelector('.actualScores').innerHTML=actualScores;
            arr3.length = 0;
        }
    }
    arr4 = document.elementsFromPoint(contactPoint.x, contactPoint.y+5*directionY*(-1));
    for(let i of arr2){
        if(i.className == 'brick'){
            xSpeed*=(-1);
            actualScores+=10;
            document.querySelector('.actualScores').innerHTML=actualScores;
            arr4.length = 0;
        } 
    }

    //изменение положения
    ball.style.top = `${ballYCord + ySpeed}px`;
    ball.style.left = `${ballXCord + xSpeed}px`;

    //отсановка игры если нет жизней
    if(lifes==0){
        clearInterval(idForPause);
        document.querySelector('.endGameScreen').style.left = `${0}px`;
        document.querySelector('.endGameScreen').style.top = `${-20}px`;

        //манипуляции с БД + сортировка игроков по очкам
        if(preventScores){
            actualScores>=preventScores ? playersDataBase[playername]=actualScores : playersDataBase[playername]=preventScores;
        }else{
            playersDataBase[playername]=actualScores;
        }
        let winnersNameArray = [];
        let winnersScoreArray=[];
        let temp, tempName;
        for(i in playersDataBase){
            winnersNameArray.push(i);
            winnersScoreArray.push(playersDataBase[i]);
        }
        for(let i=0;i<winnersScoreArray.length;i++){
            for(let j=0;j<winnersScoreArray.length-i;j++){
                if(winnersScoreArray[j]<winnersScoreArray[j+1]){
                    temp=winnersScoreArray[j+1];
                    tempName = winnersNameArray[j+1];

                    winnersScoreArray[j+1]=winnersScoreArray[j];
                    winnersNameArray[j+1]=winnersNameArray[j];

                    winnersScoreArray[j]=temp;
                    winnersNameArray[j]=tempName;
                }
            }
        }
        delete temp, tempName;
        
        //вывод списка лидеров на экран + подсветка нынешнего игрока
        let firstTenCounter=1;
        winnersTable = document.querySelector('.playersList');
        for(let i=0;i<10;i++){
            let ourIndex=winnersNameArray.indexOf(playername);
            if(winnersNameArray.indexOf(playername)<10){
                if(firstTenCounter==ourIndex+1){
                    winnersTable.insertAdjacentHTML('beforeend',
                    `<span class="winnersNames redOutline">${firstTenCounter}.&nbsp<span>${winnersNameArray[i]}:</span>&nbsp&nbsp&nbsp
                    <span>${winnersScoreArray[i]}</span></span><br>`);
                }else{
                    winnersTable.insertAdjacentHTML('beforeend',
                    `<span class="winnersNames">${firstTenCounter}.&nbsp<span>${winnersNameArray[i]}:</span>&nbsp&nbsp&nbsp
                    <span>${winnersScoreArray[i]}</span></span><br>`);
                }
            }else{
                if(i==8){
                    winnersTable.insertAdjacentHTML('beforeend',`<span class="winnersNames withoutOutline">&nbsp<span>...</span>&nbsp&nbsp&nbsp
                    </span><br>`);
                }else if(i==9){
                    winnersTable.insertAdjacentHTML('beforeend',
                    `<span class="winnersNames redOutline">${ourIndex+1}.&nbsp<span>${winnersNameArray[ourIndex]}:</span>&nbsp&nbsp&nbsp
                    <span>${winnersScoreArray[ourIndex]}</span></span><br>`);
                }else{
                    winnersTable.insertAdjacentHTML('beforeend',
                    `<span class="winnersNames">${firstTenCounter}.&nbsp<span>${winnersNameArray[i]}:</span>&nbsp&nbsp&nbsp
                    <span>${winnersScoreArray[i]}</span></span><br>`);
                }
            }
            firstTenCounter++;
        }
        winnersTable.insertAdjacentHTML('beforeend','<button class="startGameButton">NEW GAME</button>');

        //обработчик для кнопки "начать игру" расположенной в таблице результатов
        endStartGameButton = document.querySelector('.startGameButton');
        endStartGameButton.addEventListener('click', function(event){
            startGameFlag=false;
            xSpeed=0;
            ySpeed=ballSpeed;
            ball.style.top= `${500}px`;
            ball.style.left = `${475}px`;
            plate.style.left='425px';
            lifes=3;
            document.querySelector('.lifes').innerHTML=3;
            screen1.style.left=`${0}px`;
            while(winnersTable.firstChild){
                winnersTable.removeChild(winnersTable.firstChild);
            }
            let endGameScreen = document.querySelector('.endGameScreen');
            endGameScreen.style.left='-9999px';
            pauseFlag=false;
            document.removeEventListener('keydown', pauseOrStart);
            console.log(playersDataBase);
        })

    }
}

//==========================================================================================================================
//==========================================================================================================================
//==========================================================================================================================
//==========================================================================================================================

//буду удалять и добавлять этот обработчик
function pauseOrStart(event){
    if(event.code == 'Space'){
        if(!startGameFlag){
            //что бы двигалась платформа
            document.addEventListener('keydown', plateMotion);
            document.addEventListener('keyup', stopPlateMotion);
            startGameFlag=true;
            idForPause = setInterval(main, 25);
        }else{
            event.preventDefault();
            pauseFlag = !pauseFlag;
            if(pauseFlag){
                clearInterval(idForPause);
                screen2.insertAdjacentHTML('beforeend',`<div class="pauseTitle">PAUSE</div>`);
            }else if(!endGameFlag){
                idForPause = setInterval(main, 25);
                document.querySelector('.pauseTitle').remove();
            }
        }
    }
}


//ввод имени + начало игры
//если игрок не ввел имя, то оно задастся по умолчанию
let player = document.getElementById('playernameForm');
player.addEventListener('submit', function(event){
    event.preventDefault();
    playername = document.getElementById('username').value;
    if(playername in playersDataBase){
        preventScores = playersDataBase[playername];
    }else{
        playersDataBase[playername]=0;
    }
    actualScores=0;
    screen1 = document.querySelector('.startScreen');
    screen1.style.left = `${-9999}px`;

    //пауза при нажатии на пробел + запуск игры
    //удаляю и запускаю каждый раз что бы пробел работал только во время игры
    document.addEventListener('keydown',pauseOrStart);
})


// //пауза при нажатии на пробел + запуск игры
// document.addEventListener('keydown',function(event){
//     if(event.code == 'Space'){
//         if(!startGameFlag){
//             //что бы двигалась платформа
//             document.addEventListener('keydown', plateMotion);
//             document.addEventListener('keyup', stopPlateMotion);
//             startGameFlag=true;
//             idForPause = setInterval(main, 25);
//         }else{
//             event.preventDefault();
//             pauseFlag = !pauseFlag;
//             if(pauseFlag){
//                 clearInterval(idForPause);
//                 screen2.insertAdjacentHTML('beforeend',`<div class="pauseTitle">PAUSE</div>`);
//             }else if(!endGameFlag){
//                 idForPause = setInterval(main, 25);
//                 document.querySelector('.pauseTitle').remove();
//             }
//         }
//     }
// })



