let flippedCards = [];
let matchedCards = [];

function startGame() {
    const count = parseInt(document.getElementById("cardCount").value);
    if (count % 2 !== 0 || count < 4 || count > 100) {
        alert("Please enter a valid even number between 4 and 100");
        return;
    }
    const values = [];
    for (let i = 1; i <= count / 2; i++) {
        values.push(i, i);
    }
    values.sort(() => 0.5 - Math.random());
    const board = document.getElementById("gameBoard");
    board.innerHTML = '';
    values.forEach((val, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.value = val;
        card.dataset.index = index;
        card.onclick = flipCard;
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains("flipped") || this.classList.contains("matched")) return;
    this.classList.add("flipped");
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards.push(card1, card2);
            flippedCards = [];
            if (matchedCards.length === document.querySelectorAll(".card").length) {
                alert("You matched all pairs!");
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.textContent = '';
                card2.textContent = '';
                flippedCards = [];
            }, 1000);
        }
    }
}