var intervalId;
var currentIndex = 0;
var moves = [];
var turnFlag = false;

var popupOverlay = document.getElementById('popupOverlay');
var closeButton = document.querySelector('.close-btn');
var ant = document.getElementById('ant');
var antSide = "images/formiga-lado.png";
var antUp = "images/formiga-frente.png";

ant.style.left = '140px'; 
ant.style.top = '75px'; 

// DULICAR BLOCO DE CÓDIGO NA COLUNA DE CÓDIGO
function duplicateCard(id) {
    var originalCard = document.getElementById(id);
    var clonedCard = originalCard.cloneNode(true);

    if (id === 'inicio' || id === 'fim') {
        clonedCard.classList.remove('item1');
        clonedCard.classList.add('cloned-item1');
        document.getElementById('column1').prepend(clonedCard);
    } else if(id === 'avancar') {
        moves.push(id);
        clonedCard.classList.remove('item2');
        clonedCard.classList.add('cloned-item2');
        document.getElementById('column1').prepend(clonedCard);
    } else {
        moves.push(id);
        clonedCard.classList.remove('virar');
        clonedCard.classList.add('cloned-item3');
        document.getElementById('column1').prepend(clonedCard);
    }
    document.getElementById('column1').appendChild(clonedCard);
}

// MOVER A FORMIGA DE ACORDO COM A SEQUÊNCIA DE COMANDOS
function moveAnt(moves) {
    var currentPositionX = parseInt(ant.style.left) || 0;
    var currentPositionY = parseInt(ant.style.top) || 0;

    if (moves[currentIndex] === 'avancar') {
        if (turnFlag) {
            currentPositionY += 65;
        } else {
            currentPositionX += 60;
        }
    } else if (moves[currentIndex] === 'virar') {
        turnFlag = true;
        ant.src = antUp;
    }

    if (currentPositionX >= 500 || currentPositionY >= 500 || currentIndex >= moves.length) {
        stopAutoMove();
        return;
    }

    ant.style.left = currentPositionX + 'px';
    ant.style.top = currentPositionY + 'px';

    currentIndex++;
}

// MOVER A FORMIGA AO CLICAR NO BOTÃO MOVIMENTAR
document.getElementById('movimentar').addEventListener('click', function() {
    startAutoMove(moves); 
});

function startAutoMove(moves) {
    currentIndex = 0; 
    intervalId = setInterval(function() {
        moveAnt(moves);
    }, 1000); 
}

// FINAL DA MOVIMENTAÇÃO
function stopAutoMove() {
    resetValues();
    clearInterval(intervalId);
}

// LIMPAR COLUNA DE CÓDIGO
function clearCode() {
    var column1 = document.getElementById('column1');
    moves = [];
    while (column1.firstChild) {
        column1.removeChild(column1.firstChild);
    }
}

// RESETAR VALORES DEFINIDOS INICIALMENTE
function resetValues() {
    ant.style.left = '140px';
    ant.style.top = '75px';
    moves = [];
    turnFlag = false;
    var column1 = document.getElementById('column1');
    column1.innerHTML = '';
    ant.src = antSide;
}

document.getElementById('instructionsButton').addEventListener('click', function() {
    openPopup();
});

function openPopup() {
    document.getElementById("popupOverlay").style.display = "block";
}

function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
}

// RETORNAR PARA PÁGINA INICIAL
function returnToHome() {
    window.location.href = "index.html";
}