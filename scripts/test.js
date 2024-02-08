let ball = document.querySelector('.ball');
let plate = document.querySelector('.plate');

//для будущей генерации кирпичей при новой игре
let brickYCord=[20,80,140,200,20,80,140,20,80,20,20,80,140,200,20,80,140,20,80,20];
let brickXCord=[30,30,30,30,140,140,140,250,250,360,30,30,30,30,140,140,140,250,250,360];

let startGameFlag = false;//что бы войти в блок кода, где активируется платформа
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
let oldBallXCord;//нужны чтобы пофиксить баг с телепортацией мяча на 0, 0
let oldBallYCord;
let ballCenter = {
    x : ballXCord + Math.trunc(ball.clientWidth / 2),
    y : ballYCord + Math.trunc(ball.clientHeight / 2),
}
let arr1, arr2, arr3, arr4;


let playersDataBase = {
    '@@@ANIGIL9TOP@@@':990,
    '123':810,
    'VitekVasyan':700,
    'DOBPb|H9|':9990,
    'aaa':320,
    'sss':100,
    'Player4':500,
    'Бабуля':110,
    'Пращур':600,
    'Олежа BELGORODSKIY':10,
}
let playername;
let preventScores;
let actualScr = document.querySelector('.actualScr').innerHTML;
let actualScores = document.querySelector('.actualScores').innerHTML;
let screen1 = document.querySelector('.startScreen');
let screen2 = document.querySelector('.main_box');
let lifes = document.querySelector('.lifes').innerHTML;

let endGameFlag=false;
let winnersTable;
let endStartGameButton;

let ourTime=60;
let minutes;
let seconds;
let timerId;

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
    oldBallXCord = ballXCord;
    oldBallYCord = ballYCord;
    
    
    ballYCord = ball.offsetTop;
    ballXCord = ball.offsetLeft;
    ballCenter = {
        x : ballXCord + Math.trunc(ball.clientWidth / 2),
        y : ballYCord + Math.trunc(ball.clientHeight / 2),
    }

    //проверка на столкновение со стенами
    if(ballCenter.y+25 > 600){
        ySpeed *=(-1);
        ball.style.top = `${ballYCord + ySpeed}px`;
        if(playername!='terter'){
            lifes--;
            document.querySelector('.lifes').innerHTML=lifes;
        } 
        if(lifes==0){
            endGameFlag=true;
            clearInterval(timerId);
            document.querySelector('.timer').remove();
        }
    }else if(ballCenter.y-25 < 0){
        ySpeed *=(-1);
        ball.style.top = `${ballYCord + ySpeed}px`;
    }else if(ballCenter.x+25 > 1000){
        xSpeed *=(-1);
        ball.style.left = `${ballXCord + xSpeed}px`;
    }else if(ballCenter.x-25 <0){
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
        xSpeed = bounceMotionChange(40, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(40, ballSpeed, positivityX).y*(-1);
    }
    else if((ballCenter.y+25 >= plate.offsetTop)&&((ballCenter.x>=plate.offsetLeft+120)&&(ballCenter.x<=plate.offsetLeft+170))){
        if (xSpeed == 0){
            positivityX = 1;
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        console.log(3);
        xSpeed = bounceMotionChange(40, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(40, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&(ballCenter.x>=plate.offsetLeft+30)&&(ballCenter.x<=plate.offsetLeft+60)){
        if (xSpeed == 0){
            positivityX = (-1);
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        console.log(2);
        xSpeed = bounceMotionChange(65, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(65, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&(ballCenter.x>=plate.offsetLeft+90)&&(ballCenter.x<=plate.offsetLeft+120)){
        if (xSpeed == 0){
            positivityX = 1;
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        console.log(2);
        xSpeed = bounceMotionChange(65, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(65, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&((ballCenter.x>=plate.offsetLeft)&&(ballCenter.x<=plate.offsetLeft+150))){
        ySpeed*=(-1);
        console.log(1);
    }


    //проверка на наличие кирпичиков, если их нет, то сгенерировать новый
    if(!(document.querySelector('.brick'))){
        let randX = Math.trunc(Math.random()*890);;
        let randY = Math.trunc(Math.random()*250);
        let newBrick =document.createElement('div');
        newBrick.className = 'brick';
        document.querySelector('.main_box').insertAdjacentElement('afterbegin', newBrick);
        newBrick.style.top=`${randY}px`;
        newBrick.style.left=`${randX}px`;
        actualScores+=10;
        delete randX;
        delete randY;
    }


    //проверка на столкновение с кирпичиками
    xSpeed>0 ? directionX=1 : directionX=(-1);
    ySpeed>0 ? directionY=1 : directionY=(-1);
    contactPoint = {
        x : ballCenter.x + 25*(directionX),
        y : ballCenter.y + 25*(directionY)
    }

    arr1 = document.elementsFromPoint(contactPoint.x+25*directionX*-1, contactPoint.y);
    for(let i of arr1){
        if(i.className == 'brick'){
            document.elementFromPoint(contactPoint.x+25*directionX*-1, contactPoint.y).remove();
            ySpeed*=(-1);
            ourTime+=2;
            actualScores+=10;
            document.querySelector('.actualScores').innerHTML=actualScores;
            arr1.length = 0;
        }
    }
    arr2 = document.elementsFromPoint(contactPoint.x, contactPoint.y+25*directionY*-1);
    for(let i of arr2){
        if(i.className == 'brick'){
            document.elementFromPoint(contactPoint.x, contactPoint.y+25*directionY*-1).remove();
            xSpeed*=(-1);
            ourTime+=2;
            actualScores+=10;
            document.querySelector('.actualScores').innerHTML=actualScores;
            arr2.length = 0;
        } 
    }
    arr3 = document.elementsFromPoint(contactPoint.x+5*directionX*(-1), contactPoint.y);
    for(let i of arr1){
        if(i.className == 'brick'){
            document.elementFromPoint(contactPoint.x+5*directionX*(-1), contactPoint.y).remove();
            ySpeed*=(-1);
            ourTime+=2;
            actualScores+=10;
            document.querySelector('.actualScores').innerHTML=actualScores;
            arr3.length = 0;
        }
    }
    arr4 = document.elementsFromPoint(contactPoint.x, contactPoint.y+5*directionY*(-1));
    for(let i of arr2){
        if(i.className == 'brick'){
            document.elementFromPoint(contactPoint.x, contactPoint.y+5*directionY*(-1)).remove();
            xSpeed*=(-1);
            ourTime+=2;
            actualScores+=10;
            document.querySelector('.actualScores').innerHTML=actualScores;
            arr4.length = 0;
        } 
    }

    //изменение положения
    ball.style.top = `${ballYCord + ySpeed}px`;
    ball.style.left = `${ballXCord + xSpeed}px`;

    //отсановка игры если нет жизней
    if(endGameFlag){
        clearInterval(idForPause);
        document.querySelector('.endGameScreen').style.left = `${0}px`;
        document.querySelector('.endGameScreen').style.top = `${-20}px`;
        document.removeEventListener('keydown', plateMotion);
        document.removeEventListener('keyup', stopPlateMotion);

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
            endGameFlag=false;
            xSpeed=0;
            ySpeed=ballSpeed;
            ball.style.top= `${500}px`;
            ball.style.left = `${475}px`;
            plate.style.left='425px';
            lifes=3;
            ourTime=60;
            document.querySelector('.lifes').innerHTML=3;
            document.querySelector('.actualScores').innerHTML=0;
            
            screen1.style.left=`${0}px`;
            screen1.style.top='0px';
            while(winnersTable.firstChild){
                winnersTable.removeChild(winnersTable.firstChild);
            }
            let endGameScreen = document.querySelector('.endGameScreen');
            endGameScreen.style.left='-9999px';
            pauseFlag=false;
            document.removeEventListener('keydown', pauseOrStart);

            //перед генерацией кирпичей для новой игры нужно удалить старые
            while(document.querySelector('.brick')){
                document.querySelector('.brick').remove();
                console.log("Удалили кирпич");
            }
            //генерация новых кирпичей
            for(let i=0; i<brickYCord.length;i++){
                let creatingBrick = document.createElement('div');
                creatingBrick.className='brick';
                creatingBrick.id = 'brick'+i;
                creatingBrick.style.top = `${brickYCord[i]}px`;
                if(i<10){
                    creatingBrick.style.left = `${brickXCord[i]}px`;
                }else{
                    creatingBrick.style.right = `${brickXCord[i]}px`;
                }
                console.log("Создали кирпич");
                document.querySelector('.main_box').insertAdjacentElement('afterbegin',creatingBrick);
            }
            document.querySelector('#brick10').style.left = '890px';
        })
    }   
    //пробую пофиксить баг с координатами 0, 0
    if((ball.offsetLeft==0)&&(ball.offsetTop==0)){
        console.log("Проверка на нули сработала.");
        clearInterval(idForPause);
        ball.remove();
        ball = document.createElement('div');
        ball.className = 'ball';
        document.querySelector('.main_box').insertAdjacentElement('beforebegin', ball);
        ball = document.querySelector('.ball');
        ball.style.top = `${oldBallYCord}px`;
        ball.style.left = `${oldBallXCord }px`;
        idForPause = setInterval(main, 25);
        
        arr1 = document.elementsFromPoint(contactPoint.x+25*directionX*-1, contactPoint.y);
        for(let i of arr1){
            if(i.className == 'brick'){
                document.elementFromPoint(contactPoint.x+25*directionX*-1, contactPoint.y).remove();
                
                console.log("Проверка на попадание по кирпичу");    
                ourTime+=2;
                actualScores+=10;
                document.querySelector('.actualScores').innerHTML=actualScores;
                arr1.length = 0;
            }
        }
        arr2 = document.elementsFromPoint(contactPoint.x, contactPoint.y+25*directionY*-1);
        for(let i of arr2){
            if(i.className == 'brick'){
                document.elementFromPoint(contactPoint.x, contactPoint.y+25*directionY*-1).remove();
                
                console.log("Проверка на попадание по кирпичу");
                ourTime+=2;
                actualScores+=10;
                document.querySelector('.actualScores').innerHTML=actualScores;
                arr2.length = 0;
            } 
        }
        arr3 = document.elementsFromPoint(contactPoint.x+5*directionX*(-1), contactPoint.y);
        for(let i of arr1){
            if(i.className == 'brick'){
                document.elementFromPoint(contactPoint.x+5*directionX*(-1), contactPoint.y).remove();
                
                console.log("Проверка на попадание по кирпичу");
                ourTime+=2;
                actualScores+=10;
                document.querySelector('.actualScores').innerHTML=actualScores;
                arr3.length = 0;
            }
        }
        arr4 = document.elementsFromPoint(contactPoint.x, contactPoint.y+5*directionY*(-1));
        for(let i of arr2){
            if(i.className == 'brick'){
                document.elementFromPoint(contactPoint.x, contactPoint.y+5*directionY*(-1)).remove();
                console.log("Проверка на попадание по кирпичу");
                
                ourTime+=2;
                actualScores+=10;
                document.querySelector('.actualScores').innerHTML=actualScores;
                arr4.length = 0;
            } 
        }
    }
}

//==========================================================================================================================
//==========================================================================================================================
//==========================================================================================================================
//==========================================================================================================================

//буду удалять и добавлять этот обработчик чтобы пробел работал только во время игры
function pauseOrStart(event){
    if(event.code == 'Space'){
        
        if(!startGameFlag){
            //чтобы двигалась платформа
            document.addEventListener('keydown', plateMotion);
            document.addEventListener('keyup', stopPlateMotion);
            startGameFlag=true;
            idForPause = setInterval(main, 25);
            // document.querySelector('.timer').remove();
            //таймер будет работать если это не тест
            if(playername!='terter'){
                document.querySelector('.timer').remove();
                timerId = setInterval(function(){
                    ourTime-=1;
                    minutes = String(Math.trunc(ourTime/60));
                    if(minutes.length==1){
                        minutes='0'+minutes;
                    }
                    seconds=String(ourTime%60);
                    if(seconds.length==1){
                        seconds='0'+seconds;
                    }
                    document.querySelector('.timer').outerHTML=`<div class="timer">${minutes}&nbsp:${seconds}</div>`;
                    if(ourTime==0){
                        endGameFlag=true; 
                        clearInterval(timerId);
                        document.querySelector('.timer').remove();
                    }
                }, 1000)
            }
        }else{
            event.preventDefault();
            pauseFlag = !pauseFlag;
            if(pauseFlag){
                clearInterval(idForPause);
                clearInterval(timerId);
                screen2.insertAdjacentHTML('beforeend',`<div class="pauseTitle">PAUSE</div>`);
            }else if(!endGameFlag){
                idForPause = setInterval(main, 25);
                if(playername!='terter'){
                    timerId = setInterval(function(){
                        ourTime-=1;
                        minutes = String(Math.trunc(ourTime/60));
                        if(minutes.length==1){
                            minutes='0'+minutes;
                        }
                        seconds=String(ourTime%60);
                        if(seconds.length==1){
                            seconds='0'+seconds;
                        }
                        document.querySelector('.timer').outerHTML=`<div class="timer">${minutes}&nbsp:${seconds}</div>`;
                        if(ourTime==0){
                            endGameFlag=true; 
                            clearInterval(timerId);
                            document.querySelector('.timer').remove();
                        }
                    }, 1000)
                }
                document.querySelector('.pauseTitle').remove();
            }
        }
    }
}


//ввод имени + начало игры
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
    screen1.style.left = `${-9999}px`;
    document.querySelector('.main_box').insertAdjacentHTML('beforeend',`<div class="time">TIME&nbsp</div><div class="timer"></div>`);
    if(playername == 'terter'){
        document.querySelector('.main_box').insertAdjacentHTML('beforeend','<div class="modeTest">mode:Test</div>');
    }

    //пауза при нажатии на пробел + запуск игры
    //удаляю и запускаю каждый раз что бы пробел работал только во время игры
    document.addEventListener('keydown',pauseOrStart);
    
    if(playername=='terter'){
        document.querySelector('.nickname').outerHTML='<div class="terter"></div>';
        document.querySelector('.terter').innerHTML=`${playername}`;
    }else{
        document.querySelector('.nickname').innerHTML=`${playername}`;
    }
})

