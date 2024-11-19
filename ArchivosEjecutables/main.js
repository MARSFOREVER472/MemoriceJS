// DECLARACIÓN DE VARIABLES:

let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let timeCountDownId = null;

// APUNTANDO A DOCUMENTO EN FORMATO HTML...

let showMoves = document.getElementById('movimientos');
let showHit = document.getElementById('aciertos');
let showTimer = document.getElementById('t-restante');

// PARA LOS NÚMEROS ALEATORIOS:

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {return Math.random() -0.5});
console.log(numbers);

// FUNCIONES:

function timeCount()
{
    setInterval(() =>
    {
        timer--;
        showTimer.innerHTML = `Tiempo: ${timer} segundos`; 

        if (timer == 0)
        {
            clearInterval(timeCountDownId);
            lockCards();
        }
    }, 1000);
}

function lockCards()
{
    for (let i = 0; i <= 15; i++)
    {
        let bloquearTarjeta = document.getElementById(i);
        bloquearTarjeta.innerHTML = numbers[i];
        bloquearTarjeta.disabled = true;
    }

}

// FUNCIÓN PRINCIPAL:

function destapar(id)
{
    if (temporizador == false)
    {
        timeCount();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1)
    {
        // MUESTRA EL PRIMER NÚMERO...
        
        tarjeta1 = document.getElementById(id);
        primerResultado = numbers[id];
        tarjeta1.innerHTML = primerResultado;

        // DESHABILITAR PRIMER BOTÓN...

        tarjeta1.disabled = true;
    }

    else if (tarjetasDestapadas == 2)
    {
        // MUESTRA EL SEGUNDO NÚMERO...

        tarjeta2 = document.getElementById(id);
        segundoResultado = numbers[id];
        tarjeta2.innerHTML = segundoResultado;

        // DESHABILITAR SEGUNDO BOTÓN...

        tarjeta2.disabled = true;

        //INCREMENTAR MOVIMIENTOS...

        movimientos++;
        showMoves.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado)
        {
            // ENCERRAR CONTADOR DE TARJETAS DESTAPADAS...

            tarjetasDestapadas = 0;

            // INCREMENTAR ACIERTOS...

            aciertos++;
            showHit.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8)
            {
                clearInterval(timeCountDownId);
                showHit.innerHTML = `Aciertos: ${aciertos} ❤️`;
                showTimer = `Fantástico! 🎍 Solamente te demoraste en ${timerInicial - timer} segundos`;
                showMoves.innerHTML = `Movimientos: ${movimientos} ✌️`;
            }
        }
        else
        {
            // MUESTRA MOMENTÁNEAMENTE LOS VALORES Y LUEGO LO VUELVEN A TAPAR...

            setTimeout(() =>
            {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}