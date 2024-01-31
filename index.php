<?php

    echo "8.	Задан массив целых положительных чисел X(n). Все простые числа длиной не более пяти
    цифр переписать в массив Y.Удалить из массива два наибольших и три наименьших числа.";
    $arrX = [10267, 35317,33391, 20, 50, 5000, 108301, 115249, 4, 569 ,33 ,13, 17, 11, 7, 1013, 557, 101, 22];
    $arrY = [];
    print_r($arrX);

    function lookEvenly($number){
        while($number){
            $divFlag = false;
            $div = $number - 1;
            if(($number % $div == 0)&&($div != 1)){
                $divFlag = true;
            }
        }
        if($divFlag == false){
            $divFlag = 'asd';
        }
        return $divFlag;
    }
    echo lookEvenly($arrX[2]);
    echo true;