/*
 * Tutorial provided by Mike Wales via https://www.youtube.com/watch?reload=9&reload=9&v=_rUH-sEs68Y&app=desktop
 */

// variables
let moves = document.querySelector('.moves');
let actualMoves = 0;
let numOfmatches = 0;
let count = 0;
let isAnimating = false;

const restart = document.querySelector('.restart');
const deck = document.querySelector('.deck');
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const match = document.querySelectorAll(".match");
const open = document.getElementById('open'); 
const xbutton = document.querySelector('.xbutton');
const modal = document.querySelector('.modal');
const playAgainButton = document.querySelector('.play-again');
const modalMoves = document.querySelector('.modalMoves');
const modalTime = document.querySelector('.modalTime');
const modalStars = document.querySelector('.modalStars');


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// creates the card list
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
  }

// generates the cards
const cards = [ 'fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb'
]


// generate game
function initGame() {
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
  
}
initGame();


// flip card function
function showCard(e) {
  e.classList.add('open', 'show');
}



// removes stars
function removeStars() {
  const stars = document.querySelectorAll('.fa-star');
  if (actualMoves === 15) {
    stars[0].remove();
  } if (actualMoves === 22) {
    stars[0].remove();
  } else if (actualMoves === 30) {
    stars[0].remove();
  }
}

// if cards dont match hide them
function matchingCards () {
  isAnimating = true;
  setTimeout(function(){
    openCards.forEach(function(card){
      card.classList.remove('open', 'show');
    });

    isAnimating = false;
    openCards = [];
  }, 700);
}

//stack overflow timer (https://bit.ly/2t5NjIG)
function pad(val) {
  valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

totalSeconds = 0;
function setTime(minutesLabel, secondsLabel) {
  totalSeconds++;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function startTimer() {
  minutesLabel = document.getElementById("minutes");
  secondsLabel = document.getElementById("seconds");
  my_int = setInterval(function () { setTime(minutesLabel, secondsLabel) }, 1000);
}

function stopTimer() {
  clearInterval(my_int);
}

startTimer();

// restart button refreshes the page
restart.addEventListener('click', function (){
  location.reload();
})

// exit modal
xbutton.addEventListener('click', closeModal);

// listen for modal outside click
window.addEventListener('click', outsideClick);

// play again button
playAgainButton.addEventListener('click', playAgain);

// Open Modal
function openModal() {
  modal.style.display = 'block';
}

//function to close modal with clicking x
function closeModal() {
  modal.style.display = 'none';
}

//function to close modal with outside click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// function to reload page on play again
function playAgain() {
  location.reload();
}

// listener
const allCards = document.querySelectorAll('.card');
let openCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      showCard(card);
      
      if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
            openCards[0].classList.add('match');
            openCards[0].classList.add('open');
            openCards[0].classList.add('show');

            openCards[1].classList.add('match');
            openCards[1].classList.add('open');
            openCards[1].classList.add('show');
            openCards = [];
            
            numOfmatches += 1;
            console.log(numOfmatches);
            if (numOfmatches == 8) {
              openModal();
              stopTimer();
              modalMoves.innerHTML = `<span class="modalMoves">${actualMoves}</span>`;
            }

        } else {
            matchingCards ()
        }
        removeStars();
        actualMoves ++;
        moves.innerHTML = `<span class="moves">${actualMoves}</span>`;
      }
    }
  });

});


  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */