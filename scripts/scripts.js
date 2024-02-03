let ball = document.querySelector('.ball');
let plate = document.querySelector('.plate');

let pressedBtnMotion;
let pressedButton =false;
let plateSpeed = 20;
let ballSpeed = 12;
let ySpeed = ballSpeed;
let xSpeed = 0;

let ball_y_cord = parseInt(ball.offsetTop);
let ball_x_cord = parseInt(ball.offsetLeft);
let ballCenter = {
    x : ball_x_cord + Math.trunc(ball.clientWidth / 2),
    y : ball_y_cord + Math.trunc(ball.clientHeight / 2),
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

// будет менять направление (выдает измененные дельта х и у) - должна запускаться каждую итерацию фукции движения меча
function brickBounce(xspeed, yspeed){
    let ball_y_cord = parseInt(ball.offsetTop);
    let ball_x_cord = parseInt(ball.offsetLeft);    
    let directionX = xspeed!=0 ? Math.abs(xspeed) / xspeed : 0;
    let directionY = yspeed!=0 ? Math.abs(yspeed) / yspeed : 0;
    let ballSize = ball.clientWidth;
    
    
    let point1 = {
        x:ball_x_cord,
        y:ball_y_cord
    }
    let point2 = {
        x:ball_x_cord + ballSize,
        y:ball_y_cord
    }
    let point3 = {
        x:ball_x_cord + ballSize,
        y:ball_y_cord + ballSize
    }
    let point4 = {
        x:ball_x_cord,
        y:ball_y_cord + ballSize
    }

    let indicators;
    if(((directionX!=0) && (directionY==0)) || ((directionX==0) && (directionY!=0))){
        // в данно реализации игры я не делаю возможным для у равенство нулю 
        if(directionY > 0){
            indicators = {
                1 : point3,
                2 : point4
            }
        }else{
            indicators = {
                1 : point1,
                2 : point2
            }
        }

    }

    if((directionX > 0) && (directionY > 0)){
        indicators = {
            1 : point2,// v levo
            2 : point3, //center
            3 : point4//v verh
        }
    }else if((directionX > 0) && (directionY < 0)){
        indicators = {
            1 : point1,//v niz
            2 : point2,//center
            3 : point3//v levo
        }
    }else if((directionX < 0) && (directionY > 0)){
        indicators = {
            1 : point3,//v pravo
            2 : point4,//center
            3 : point1// v verh
        }
    }else if((directionX < 0) && (directionY < 0)){
        indicators = {
            1 : point4, //v pravo
            2 : point1,//center
            3 : point2 //v niz
        }
    }


    if(((directionX!=0) && (directionY==0)) || ((directionX==0) && (directionY!=0))){
        let arrForFinding = document.elementsFromPoint(indicators[1].x, indicators[1].y);
        let arrForFinding2 = document.elementsFromPoint(indicators[2].x, indicators[2].y);
        let flagForFinding;
        let flagForFinding2;

        for(let i of arrForFinding){
            if( i.className=='brick') flagForFinding=true;
        }
        for(let i of arrForFinding2){
            if( i.className=='brick') flagForFinding2=true;
        }

        if(flagForFinding || flagForFinding2){
            yspeed = yspeed * (-1);
            return {
                x : xspeed,
                y : yspeed
            };
        }
    }else if(xspeed){
        let arrForFinding = document.elementsFromPoint(indicators[2].x+(ballSize*directionX*(-1)), indicators[2].y);
        let arrForFinding2 = document.elementsFromPoint(indicators[2].x, indicators[2].y+(ballSize*directionY*(-1)));
        let flagForFinding;
        let flagForFinding2;

        for(let i of arrForFinding){
            if( i.className=='brick') flagForFinding=true;
        }
        for(let i of arrForFinding2){
            if( i.className=='brick') flagForFinding2=true;
        }

        if(flagForFinding){
            yspeed = yspeed * (-1);
            return {
                x : xspeed,
                y : yspeed
            };
        }else{
            xspeed = xspeed * (-1);
            return {
                x : xspeed,
                y : yspeed
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // let ind1, ind2, ind3;

    // if(((directionX!=0) && (directionY==0)) || ((directionX==0) && (directionY!=0))){
    //     ind1 = document.querySelector('.indicator:nth-child(2)');
    //     ind1.style.top = `${indicators[1].y}px`;
    //     ind1.style.left = `${indicators[1].x}px`;
        
    //     ind2 = document.querySelector('.indicator:nth-child(3)');
    //     ind2.style.top = `${indicators[2].y}px`;
    //     ind2.style.left = `${indicators[2].x}px`;

    //     ind3 = document.querySelector('.indicator:nth-child(4)');
    //     ind3.style.visibility = 'hidden';

    // }else{
    //     ind1 = document.querySelector('.indicator:nth-child(2)');
    //     ind1.style.top = `${indicators[1].y}px`;
    //     ind1.style.left = `${indicators[1].x}px`;
        
    //     ind2 = document.querySelector('.indicator:nth-child(3)');
    //     ind2.style.top = `${indicators[2].y}px`;
    //     ind2.style.left = `${indicators[2].x}px`;

    //     ind3 = document.querySelector('.indicator:nth-child(4)');
    //     ind3.style.visibility = 'visible';
    //     ind3.style.top = `${indicators[3].y}px`;
    //     ind3.style.left = `${indicators[3].x}px`;
    // }
}






function bounceMotionChange(angle, ballSpeed, positivityX){
    let radians = angle * (Math.PI / 180);
    let deltaY = Math.trunc(Math.sin(radians) * ballSpeed);
    let deltaX = Math.trunc(Math.cos(radians) * ballSpeed) * positivityX;
    
    return{
        x: deltaX,
        y: deltaY,
    }
}



function testMotion(){
    plate_y_cord = parseInt(plate.offsetTop);
    plate_x_cord = parseInt(plate.offsetLeft);
    ball_y_cord = parseInt(ball.offsetTop);
    ball_x_cord = parseInt(ball.offsetLeft);
    let positivityX = 1;
    
    
    if(ball_y_cord <= 0){
        ySpeed = ySpeed * (-1);
        ball.style.top = `${ball_y_cord + ySpeed + ySpeed}px`;
    }else if(ball_y_cord >= 550){
        ySpeed = ySpeed * (-1);
        ball.style.top = `${ball_y_cord + ySpeed + ySpeed}px`;
    }else if(ball_x_cord <= 0){
        xSpeed = xSpeed * (-1);
        ball.style.left = `${ball_x_cord + xSpeed + xSpeed}px`;
    }else if(ball_x_cord >= 950){
        xSpeed = xSpeed * (-1);
        ball.style.left = `${ball_x_cord + xSpeed + xSpeed}px`;

    }else if((ball_y_cord + 60 >= plate_y_cord)&&((ball_x_cord + 40 >= plate_x_cord)&&(ball_x_cord + 25 <= plate_x_cord + 20))){
        if (xSpeed == 0){
            positivityX = (-1);
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        } 
        xSpeed = bounceMotionChange(30, ballSpeed, positivityX).x ;
        ySpeed = bounceMotionChange(30, ballSpeed, positivityX).y * (-1);
        ball.style.top = `${ball_y_cord + ySpeed}px`;
        ball.style.left = `${ball_y_cord + xSpeed}px`;


    }else if((ball_y_cord + 60 >= plate_y_cord)&&((ball_x_cord + 20 >= plate_x_cord + 135)&&(ball_x_cord <= plate_x_cord + 140 ))){
        if (xSpeed == 0){
            positivityX = 1;
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        } 
        xSpeed = bounceMotionChange(30, ballSpeed, positivityX).x ;
        ySpeed = bounceMotionChange(30, ballSpeed, positivityX).y * (-1);
        ball.style.top = `${ball_y_cord + ySpeed}px`;
        ball.style.top = `${ball_y_cord + ySpeed}px`;


    }else if((ball_y_cord + 60 >= plate_y_cord)&&((ball_x_cord + 40 > plate_x_cord+ 25)&&(ball_x_cord +25 < plate_x_cord + 50))){
        if (xSpeed == 0){
            positivityX = (-1);
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        }    
        xSpeed = bounceMotionChange(60, ballSpeed, positivityX).x ;
        ySpeed = bounceMotionChange(60, ballSpeed, positivityX).y * (-1) ;
        ball.style.top = `${ball_y_cord + ySpeed}px`;


    }else if((ball_y_cord + 60 >= plate_y_cord)&&((ball_x_cord + 25 >plate_x_cord+100)&&(ball_x_cord + 25 < plate_x_cord+135))){
        if (xSpeed == 0){
            positivityX = 1;
        }else{
            positivityX = Math.abs(xSpeed)/ xSpeed;
        } 
        xSpeed = bounceMotionChange(60, ballSpeed, positivityX).x ;
        ySpeed = bounceMotionChange(60, ballSpeed, positivityX).y * (-1) ;
        ball.style.top = `${ball_y_cord + ySpeed}px`;

    }else if((ball_y_cord + 60 >= plate_y_cord)&&((ball_x_cord +40 >= plate_x_cord)&&(ball_x_cord  <= plate_x_cord + 140))){
        ySpeed = ySpeed * (-1);
        ball.style.top = `${ball_y_cord + ySpeed}px`;

        ballCenter = {
            x : ball_x_cord + Math.trunc(ball.clientWidth / 2),
            y : ball_y_cord + Math.trunc(ball.clientHeight / 2),
        };
        console.log((document.elementsFromPoint(ballCenter.x, ballCenter.y)));
    }

    ball.style.top = `${ball_y_cord + ySpeed}px`;
    ball.style.left = `${ball_x_cord + xSpeed}px`;
    
    ySpeed = brickBounce(xSpeed, ySpeed).y;
    xSpeed = brickBounce(xSpeed, ySpeed).x;
    
}




document.addEventListener('keydown', plateMotion);
document.addEventListener('keyup', stopPlateMotion);
let timerID = setInterval(testMotion, 40, 10);



