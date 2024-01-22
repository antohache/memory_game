//declare variables to store array in cards
let card = document.getElementsByClassName('card');
const cards = [...card];
//variable that holds all the cards
let cardDeck = document.getElementById('deck');
//variable to count moves
let moves = 0;
let count = document.querySelector('.moves');
//variable to store stars list
const stars = document.querySelectorAll('.fa-star');
//variable for matched cards
let matchedCards = document.getElementsByClassName('match');
let closeIcon = document.querySelector('.close');
//variable for modal
let modal = document.getElementById('popup');
//array variable to store the clicked cards
let chosenCards = [];
//shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
} 
//initialization and definition of the imer function
let second = 0, minute = 0; 
let hour = 0;
let timer = document.querySelector('.timer');
let interval;
//initializing Start game function when browser window is loaded
window.onload = startGame();
function startGame() {
//a new deck of cards is shuffled for every game
    let shuffleCards = shuffle(cards);
    for (let i = 0; i < shuffleCards.length; i++) {
        cardDeck.innerHTML = "";
        [].forEach.call(cards, function(item){
            cardDeck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }
//moves is set to 0
    moves = 0;
    count.innerHTML = moves;
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = 'FFD700';
        stars[i].style.visibility = 'visible';
    }
//timer is set to 0
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector('.timer');
    timer.innerHTML = '0 mins 0 secs';
    clearInterval(interval);
}
//start timer function
function startTimer() {
interval = setInterval(function() {
  timer.innerHTML = minute + ' mins ' + second + ' secs';
  second++;
  if (second == 60) {
      minute++;
      second = 0;
  }
  if (minute == 60) {
      hour++;
      minute = 0;
  }
}, 1000);
}
/*
  moves function that counts the number of moves the player took
  star-rating changes depending on the number of moves
*/
function movesCounter() {
moves++;
count.innerHTML = moves;
if (moves == 1) {
      second = 0;
      minute = 0;
      hour = 0;
      startTimer();
}
//star rating changes as the game continue
    if (moves > 13 && moves < 19) {
        for (let i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
    else if (moves > 20) {
    for (let i = 0; i < 3; i++) {
        if (i > 0) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
}
//toggle between opened and showed cards to display open cards
let displayCard = function() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
};
//function for flipped cards that checks match
function cardFlipped() {
    chosenCards.push(this);
    let flips = chosenCards.length;
    if(flips === 2 ) {
      movesCounter();
        if(chosenCards[0].dataset.text === chosenCards[1].dataset.text) {
          matched();
        } else {
            unmatched();
        }
    }
}
//function matched created when two cards match
function matched() {
    chosenCards[0].classList.add('match', 'disabled');
    chosenCards[1].classList.add('match', 'disabled');
    chosenCards[0].classList.remove('show', 'open', 'no-event');
    chosenCards[1].classList.remove('show', 'open', 'no-event');
    chosenCards = [];
}
//function unmatched created when two cards don't match
function unmatched() {
    chosenCards[0].classList.add('unmatched');
    chosenCards[1].classList.add('unmatched');
    disabled();
    setTimeout(function() {
    chosenCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
    chosenCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
    enable();
    chosenCards = [];
    }, 1100);
}
//cards are disabled temporarily
function disabled() {
      Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}
//cards are enabled and matched cards are disabled
function enable() {
    Array.prototype.filter.call(cards, function(card) {
      card.classList.remove('disabled');
      for (let i = 0; i < matchedCards.length; i++) {
          matchedCards[i].classList.add('disabled');
        }
    });
}
//congratulations function is created when all player finishes
function congrats() {
    if(matchedCards.length == 16) {
        clearInterval(interval);
        let finalTime = timer.innerHTML;
//a well done modal is shown
  modal.classList.add('show');
//a variable star rating is created
    let starRating = document.querySelector('.stars').innerHTML;
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('star-rating').innerHTML = starRating;
    document.getElementById('totalTime').innerHTML = finalTime;
    closeModal();
    }
}
//close modal function, so the modal can be closed and the game reset
function closeModal(){
    closeIcon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}
//play again function
function playAgain() {
    modal.classList.remove('show');
    startGame();
}
//event listener is atached to cards to each card to interact with the player.
for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardFlipped);
    card.addEventListener('click', congrats);
}
