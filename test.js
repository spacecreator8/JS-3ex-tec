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



function plateMotion(event){
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





function motionCalc(a, c = ballSpeed){ 
    let b = c**2 - a**2;
    b = Math.trunc(Math.sqrt(b));
    return b;
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
        console.log(document.elementsFromPoint(ballCenter.x, ballCenter.y));


    }
    ball.style.top = `${ball_y_cord + ySpeed}px`;
    ball.style.left = `${ball_x_cord + xSpeed}px`;
}




document.addEventListener('keydown', plateMotion);
document.addEventListener('keyup', stopPlateMotion);
let timerID = setInterval(testMotion, 40, 10);



