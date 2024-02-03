let ball = document.querySelector('.ball');
let plate = document.querySelector('.plate');

let pauseFlag = false;

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

let ballYCord = parseInt(ball.offsetTop);
let ballXCord = parseInt(ball.offsetLeft);
let ballCenter = {
    x : ballXCord + Math.trunc(ball.clientWidth / 2),
    y : ballYCord + Math.trunc(ball.clientHeight / 2),
}

function plateMotion(event){ // логику подсмотрел
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
        xSpeed = bounceMotionChange(30, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(30, ballSpeed, positivityX).y*(-1);
    }
    else if((ballCenter.y+25 >= plate.offsetTop)&&((ballCenter.x>=plate.offsetLeft+120)&&(ballCenter.x<=plate.offsetLeft+170))){
        if (xSpeed == 0){
            positivityX = 1;
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        xSpeed = bounceMotionChange(30, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(30, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&(ballCenter.x>=plate.offsetLeft+30)&&(ballCenter.x<=plate.offsetLeft+60)){
        if (xSpeed == 0){
            positivityX = (-1);
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        xSpeed = bounceMotionChange(60, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(60, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&(ballCenter.x>=plate.offsetLeft+90)&&(ballCenter.x<=plate.offsetLeft+120)){
        if (xSpeed == 0){
            positivityX = 1;
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }
        xSpeed = bounceMotionChange(60, ballSpeed, positivityX).x;
        ySpeed = bounceMotionChange(60, ballSpeed, positivityX).y*(-1);
    }else if((ballCenter.y+25 >= plate.offsetTop)&&((ballCenter.x>=plate.offsetLeft)||(ballCenter.x>=plate.offsetLeft+150))){
        ySpeed*=(-1);
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
    ind2.style.left = `${contactPoint.x+30*directionX*(-1)}px`;
    let ind3 = document.querySelector('.indicator3');
    ind3.style.top = `${contactPoint.y+30*directionY*(-1)}px`;
    ind3.style.left = `${contactPoint.x}px`;

    let arr1 = document.elementsFromPoint(contactPoint.x+25*directionX*-1, contactPoint.y);
    for(let i of arr1){
        if(i.className == 'brick') ySpeed*=(-1);
    }
    let arr2 = document.elementsFromPoint(contactPoint.x, contactPoint.y+25*directionY*-1);
    for(let i of arr2){
        if(i.className == 'brick') xSpeed*=(-1);
    }
    let arr3 = document.elementsFromPoint(contactPoint.x, contactPoint.y);
    

    //изменение положения
    ball.style.top = `${ballYCord + ySpeed}px`;
    ball.style.left = `${ballXCord + xSpeed}px`;
}


document.addEventListener('keydown', plateMotion);
document.addEventListener('keyup', stopPlateMotion);
let idForPause = setInterval(main, 25);
document.addEventListener('keydown',function(event){
    if(event.code == 'Space'){
        pauseFlag != pauseFlag;
        event.preventDefault();
        console.log(pauseFlag + "Это pauseFlag")
        if(pauseFlag){
            clearInterval(idForPause);
        }else{
            ;
        }
    }
})