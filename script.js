const board = document.getElementById('gameBoard');
const triesDisplay = document.getElementById('tries');
const message = document.getElementById('message');

const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍'];
let cards = [...symbols, ...symbols]; // 6 pairs = 12 cards

// Shuffle the cards
cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let tries = 0;
let matches = 0;

// Create cards on the board
cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    tries++;
    triesDisplay.textContent = `Број на обиди: ${tries}`;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === symbols.length) {
            message.textContent = `Браво! Ги најде сите парови за ${tries} обиди. 🎉`;
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '?';
        secondCard.textContent = '?';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
