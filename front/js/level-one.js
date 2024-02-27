var intervalId;
var currentIndex = 0;
var moves = [];
var ant = document.getElementById('ant1');
var turnFlag = false;

ant.style.left = '140px'; // 140px é a pos inicial
ant.style.top = '75px'; // 75px é a pos inicial

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
            console.log(turnFlag);
            console.log('add em y');
            currentPositionY += 65;
        } else {
            console.log(turnFlag);
            console.log('add em x');
            currentPositionX += 60;
        }
    } else if (moves[currentIndex] === 'virar') {
        console.log(turnFlag);
        console.log('virei e add em y');
        currentPositionY += 65
        turnFlag = true;
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
    ant.style.left = '140px';
    ant.style.top = '75px';
    moves = [];
    turnFlag = false;
    var column1 = document.getElementById('column1');
    column1.innerHTML = '';
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

// RETORNAR PARA PÁGINA INICIAL
function returnToHome() {
    window.location.href = "index.html";
}