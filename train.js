'use strict';

var TrueM = [],  //Набор данных для обучения
    Solve = [],  //Пример для решения
    Solve_Y,  //Результат решения приера
    W = [], //веса на входе
    W_out = [], //веса на выходе
    X_in = 2,  //входные
    Y_out = 1,  //выходные
    H,  //Кол-во нейронов в скрытом слое
    H_out = [],  //Массив обработанных весов
    H1, //промежуточная переменная для весов
    Y_H1 = [], //Результаты перед выходным нейроном
    Yi_out = [], //Результаты после выходного нейрона
    error = [],  // Массив ошибок
    D = [], D_out, //градиенты
    n,  //скорость
    era,  //эпоха
    error_,  //Сумма ошибок
    perfect_error,  //Минимальная ошибка
    x, count = 0; //Прочее





function input(){ //Ввод параметров обучения
    n = document.getElementById('n').value;
    era = document.getElementById('era').value;
    perfect_error = document.getElementById('perfect_error').value;
    H = document.getElementById('H').value;

            //заполнение весов входа
            for (var i = 0; i < (H * 2); i++) {
                W[i] = Math.random();
            }
            //заполнение весов выхода
            for (var i = 0; i < H; i++) {
                W_out[i] = Math.random();
            }
}


function training(){  //Кнопка "Обучить"
    
    TrueM = [[document.getElementById('01').value, document.getElementById('02').value, document.getElementById('03').value],
    [document.getElementById('11').value, document.getElementById('12').value, document.getElementById('13').value],
    [document.getElementById('21').value, document.getElementById('22').value, document.getElementById('23').value],
    [document.getElementById('31').value, document.getElementById('32').value, document.getElementById('33').value]];
 
    do {
       train();
       error_ = (Math.pow(error.map(i => x += i, x = 0).reverse()[0], 2)) / TrueM.length * 100;
       count++;
    } while (perfect_error <= error_);

    alert('Обучение завершено!')
}

function train(){  //Обучение

    for (var e = 0; e < era; e++) {
        for (var str = 0; str < TrueM.length; str++) {

            //вперед
            for (var i = 0; i < H; i++) {
                H1 = (TrueM[str][0] * W[i * 2]) + (TrueM[str][1] * W[i * 2 + 1]);
                Y_H1[i] = 1 / (1 + Math.exp(-1 * H1));
            }

            for (var j = 0; j < W_out.length; j++) {
                H_out[j] = (W_out[j] * Y_H1[j])
            }

            Yi_out[str] = 1 / (1 + Math.exp(-1 * H_out.map(i => x += i, x = 0).reverse()[0]));

            //назад
            error[str] = (TrueM[str][2] - Yi_out[str]);
            D_out = Yi_out[str] * (1 - Yi_out[str]) * error[str];

            for (var d = 0; d < W_out.length; d++) {
                D[d] = Y_H1[d] * (1 - Y_H1[d]) * D_out * W_out[d];
            }

            //обнова
            for (var up = 0; up < H; up++) {
                W[up] = W[up] + n * D[up] * TrueM[str][0];
                W[up + 1] = W[up + 1] + n * D[up] * TrueM[str][1];
            }

            for (var up = 0; up < W_out.length; up++) {
                W_out[up] = W_out[up] + n * D_out * Y_H1[up];
            }
        }
    }
}

function solve(){  //Решение примера

    Solve = [document.getElementById('input1').value, document.getElementById('input2').value]

    
        for (var i = 0; i < H; i++) {
            H1 = (Solve[0] * W[i * 2]) + (Solve[1] * W[i * 2 + 1]);
            Y_H1[i] = 1 / (1 + Math.exp(-1 * H1));
        }

        for (var j = 0; j < W_out.length; j++) {
            H_out[j] = (W_out[j] * Y_H1[j])
        }

        Solve_Y = 1 / (1 + Math.exp(-1 * H_out.map(i => x += i, x = 0).reverse()[0]));

    document.getElementById('output').innerHTML = Solve_Y.toFixed(4);
  
}













