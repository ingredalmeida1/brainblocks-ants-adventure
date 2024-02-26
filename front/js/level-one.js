function duplicateCard(id) {
    var originalCard = document.getElementById(id);
    var clonedCard = originalCard.cloneNode(true);

    if (id === 'card1' || id === 'card2') {
        clonedCard.classList.remove('item1');
        clonedCard.classList.add('cloned-item1');
        document.getElementById('column1').prepend(clonedCard);
    } else if(id === 'card3') {
        clonedCard.classList.remove('item2');
        clonedCard.classList.add('cloned-item2');
        document.getElementById('column1').prepend(clonedCard);
    } else {
        clonedCard.classList.remove('item3');
        clonedCard.classList.add('cloned-item3');
        document.getElementById('column1').prepend(clonedCard);
    }
    
    document.getElementById('column1').appendChild(clonedCard);
}

function clearCode() {
    var column1 = document.getElementById('column1');

    while (column1.firstChild) {
        column1.removeChild(column1.firstChild);
    }
}

function returnToHome() {
    window.location.href = "index.html";
}