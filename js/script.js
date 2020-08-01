//Challenge 1
const ageInDays = () => {
    let birthYear = prompt('¿En que año naciste?');
    let thisYear = new Date().getFullYear();
    let edadEnDias = (thisYear - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('Tienes ' + edadEnDias + ' días de edad');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flexbox-result').appendChild(h1);
}

// const reset = () => {
//     document.getElementById('ageInDays').remove();
// }

function reset() {
    document.getElementById('ageInDays').remove();
}

//Challenge 2
const generaGato = () => {
    let image = document.createElement('img');
    let div = document.getElementById('espacio-gato');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    image.setAttribute('id', 'gatos');
    div.appendChild(image);
}

const borraGatos = () => {
    document.getElementById('gatos').remove();
}

//Challenge 3
const pptJuego = (eleccion) => {
    let eleccionUsuario, eleccionBot;
    eleccionUsuario = eleccion.id;
    eleccionBot = numeroEleccionBot(randomBotppt());
    resultado = ganador(eleccionUsuario, eleccionBot); // [0,1] Usuario perdió / Computadora ganó
    mensaje = mensajeResultado(resultado); // {mensaje: 'Perdiste', color: 'rojo'}
    pptResultadoFinal(eleccionUsuario, eleccionBot, mensaje);
};

const randomBotppt = () => {
    return Math.floor(Math.random() * 3);
};

const numeroEleccionBot = (numero) => {
    return ['piedra', 'papel', 'tijera'][numero];
};

const ganador = (eleccionUsuario, eleccionBot) => {
    let opcionesJuego = {
        'piedra': { 'piedra': 0.5, 'papel': 0, 'tijera': 1 },
        'papel': { 'piedra': 1, 'papel': 0.5, 'tijera': 0 },
        'tijera': { 'piedra': 0, 'papel': 1, 'tijera': 0.5 },
    }
    let resultadoUsuario = opcionesJuego[eleccionUsuario][eleccionBot];
    let resultadoBot = opcionesJuego[eleccionBot][eleccionUsuario];

    return [resultadoUsuario, resultadoBot];
};

const mensajeResultado = ([resultadoUsuario, resultadoBot]) => {
    if (resultadoUsuario === 0) {
        return { 'mensaje': 'Perdiste', 'color': 'red' };
    } else if (resultadoUsuario === 1) {
        return { 'mensaje': 'Ganaste!', 'color': 'green' };
    } else
        return { 'mensaje': 'Fue empate', 'color': 'blue' };
};

const pptResultadoFinal = (imagenEleUsuario, imagenEleBot, mensajeResultado) => {

    let imagenes = {
        'piedra': document.getElementById('piedra').src,
        'papel': document.getElementById('papel').src,
        'tijera': document.getElementById('tijera').src
    }

    document.getElementById('piedra').remove();
    document.getElementById('papel').remove();
    document.getElementById('tijera').remove();

    let divUsuario = document.createElement('div');
    let divMensaje = document.createElement('div');
    let divBot = document.createElement('div');

    divUsuario.innerHTML = "<img src='" + imagenes[imagenEleUsuario] + "' height=150 width=150 style='box-shadow: 0 10px 50px rgba(37, 50, 223, 1); '>";
    divMensaje.innerHTML = "<h1 style= 'color: " + mensajeResultado['color'] + "; font-size: 60px; padding 25px; margin-top:20px;'>" + mensajeResultado['mensaje'] + "</h1>"
    divBot.innerHTML = "<img src='" + imagenes[imagenEleBot] + "' height=150 width=150 style='box-shadow: 0 10px 50px rgba(243, 38, 223, 1); '>";

    document.getElementById('flexbox-ppt').appendChild(divUsuario);
    document.getElementById('flexbox-ppt').appendChild(divMensaje);
    document.getElementById('flexbox-ppt').appendChild(divBot);
};

//Challenge 4
let todosBotones = document.getElementsByTagName('button');
let copiarBotones = [];
for (let i = 0; i < todosBotones.length; i++) {
    copiarBotones.push(todosBotones[i].classList[1]);
}

const cambioColorBotones = (seleccionHtml) => {
    if (seleccionHtml.value == 'rojo') {
        botonesRojo();
    } else if (seleccionHtml.value == 'verde') {
        botonesVerde();
    } else if (seleccionHtml.value == 'reset') {
        resetBotones();
    } else if (seleccionHtml.value == 'random') {
        botonesRandom();
    }
}

const botonesRojo = () => {
    for (let i = 0; i < todosBotones.length; i++) {
        todosBotones[i].classList.remove(todosBotones[i].classList[1]);
        todosBotones[i].classList.add('btn-danger');
    }
}

const botonesVerde = () => {
    for (let i = 0; i < todosBotones.length; i++) {
        todosBotones[i].classList.remove(todosBotones[i].classList[1]);
        todosBotones[i].classList.add('btn-success');
    }
}

const resetBotones = () => {
    for (let i = 0; i < todosBotones.length; i++) {
        todosBotones[i].classList.remove(todosBotones[i].classList[1]);
        todosBotones[i].classList.add(copiarBotones[i]);
    }
}

const botonesRandom = () => {
    let opcionesColor = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark'];

    for (let i = 0; i < todosBotones.length; i++) {
        let numeroRandom = Math.floor(Math.random() * 7);
        todosBotones[i].classList.remove(todosBotones[i].classList[1]);
        todosBotones[i].classList.add(opcionesColor[numeroRandom]);
    }
};

//Challenge 5: blackjack

let blackjackJuego = {
    'tu': { 'spanResultado': '#resultado-usuario', 'div': '#caja-usuario', 'score': 0 },
    'dealer': { 'spanResultado': '#resultado-dealer', 'div': '#caja-dealer', 'score': 0 },
    'cartas': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'valorCartas': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'ganados': 0,
    'perdidos': 0,
    'empates': 0,
    'plantado': false,
    'finDelTurno': false
};

const TU = blackjackJuego['tu'];
const DEALER = blackjackJuego['dealer'];

const sonidoHit = new Audio('static/sounds/swish.m4a');
const sonidoGanaste = new Audio('static/sounds/cash.mp3');
const sonidoPerdiste = new Audio('static/sounds/aww.mp3');

document.querySelector('#bj-pedir-button').addEventListener('click', blackjackHit);
document.querySelector('#bj-plantar-button').addEventListener('click', dealerJuego);
document.querySelector('#bj-repartir-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackJuego['plantado'] === false) {
        let cartaElegida = cartaRandom();
        mostrarCarta(cartaElegida, TU);
        puntajeActualizado(cartaElegida, TU);
        mostrarScore(TU);
    }
}

function cartaRandom() {
    let seleccionRandom = Math.floor(Math.random() * 13);
    return blackjackJuego['cartas'][seleccionRandom];
}

function mostrarCarta(cartaElegida, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let carta = document.createElement('img');
        carta.src = `static/images/${cartaElegida}.png`;
        document.querySelector(activePlayer['div']).appendChild(carta);
        sonidoHit.play();
    }
}

function blackjackDeal() {
    // mostrarGanador(determinarGanador());
    if (blackjackJuego['finDelTurno'] === true) {
        let tusCartas = document.querySelector('#caja-usuario').querySelectorAll('img');
        let cartasdealer = document.querySelector('#caja-dealer').querySelectorAll('img');
        for (let i = 0; i < tusCartas.length; i++) {
            tusCartas[i].remove();
        }
        for (let i = 0; i < cartasdealer.length; i++) {
            cartasdealer[i].remove();
        }

        TU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#resultado-usuario').textContent = 0;
        document.querySelector('#resultado-dealer').textContent = 0;
        document.querySelector('#resultados-blackjack').textContent = 'Juguemos!';

        document.querySelector('#resultado-usuario').style.color = '#ffffff';
        document.querySelector('#resultado-dealer').style.color = '#ffffff';
        document.querySelector('#resultados-blackjack').style.color = '#000000';

        blackjackJuego['plantado'] = false;
        blackjackJuego['finDelTurno'] = true;
    }
}

const puntajeActualizado = (carta, activePlayer) => {
    // Reglas:
    // Si sumar 11 del A me hace sumar menos de 21 o 21, entonces suma 11, sino, suma 1.
    if (carta === "A") {
        if (activePlayer['score'] + blackjackJuego['valorCartas'][carta][1] <= 21) {
            activePlayer['score'] += blackjackJuego['valorCartas'][carta][1];
        } else {
            activePlayer['score'] += blackjackJuego['valorCartas'][carta][0];
        }
    } else {
        activePlayer['score'] += blackjackJuego['valorCartas'][carta];
    }
}

const mostrarScore = (activePlayer) => {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['spanResultado']).textContent = 'Te pasaste!';
        document.querySelector(activePlayer['spanResultado']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['spanResultado']).textContent = activePlayer['score'];
    }
}

function tempo(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerJuego() {
    blackjackJuego['plantado'] = true;

    while (DEALER['score'] < 16 && blackjackJuego['plantado'] === true) {
        let cartaElegida = cartaRandom();
        mostrarCarta(cartaElegida, DEALER);
        puntajeActualizado(cartaElegida, DEALER);
        mostrarScore(DEALER);
        await tempo(900);
    }
        blackjackJuego['finDelTurno'] = true;
        let ganador = determinarGanador();
        mostrarGanador(ganador);
}

const determinarGanador = () => {
    // determina quien gana segun la logica de juego
    // incrementa el marcador de ganados, perdidos, empates

    let ganador;

    if (TU['score'] <= 21) {
        if (TU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackJuego['ganados']++;
            ganador = TU;
        } else if (TU['score'] < DEALER['score']) {
            blackjackJuego['perdidos']++;
            ganador = DEALER;
        } else if (TU['score'] === DEALER['score']) {
            blackjackJuego['empates']++;
        }
        // cuando te pasas pero El dealer no
    } else if (TU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackJuego['perdidos']++;
        ganador = DEALER;
    } else if (TU['score'] > 21 && DEALER['score'] > 21) {
        blackjackJuego['empates']++;
    }

    return ganador;
}

const mostrarGanador = (ganador) => {
    let mensaje, colorMensaje;

    if (blackjackJuego['finDelTurno'] === true) {
        if (ganador === TU) {
            document.querySelector('#ganadas').textContent = blackjackJuego['ganados'];
            mensaje = 'Ganaste!';
            colorMensaje = 'green';
            sonidoGanaste.play();
        } else if (ganador === DEALER) {
            document.querySelector('#perdidas').textContent = blackjackJuego['perdidos'];
            mensaje = 'Perdiste!';
            colorMensaje = 'red';
            sonidoPerdiste.play();
        } else {
            document.querySelector('#empates').textContent = blackjackJuego['empates'];
            mensaje = 'Empate';
            colorMensaje = 'blue';
        }
        document.querySelector('#resultados-blackjack').textContent = mensaje;
        document.querySelector('#resultados-blackjack').style.color = colorMensaje;
    }
}