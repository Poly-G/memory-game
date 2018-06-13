/*
 * Tutorial provided by Mike Wales via https://www.youtube.com/watch?reload=9&reload=9&v=_rUH-sEs68Y&app=desktop
 */




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

let moves = document.querySelector('.moves');
let actualMoves = 0;
const restart = document.querySelector('.restart');

restart.addEventListener('click', function (){
  location.reload();
})


// creates the card list
function generateCard(card) {
return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

//stack overflow (https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)
const minutes = document.querySelector("#minutes")
    const seconds = document.querySelector("#seconds")
    let count = 0;

    const renderTimer = () => {
      count += 1;
      minutes.innerHTML = Math.floor(count / 60).toString().padStart(2, "0");
      seconds.innerHTML = (count % 60).toString().padStart(2, "0");
    }

    const timer = setInterval(renderTimer, 1000)


// clear timer
function clearTimer (){
  clearInterval(timer);
};

//start game
function initGame() {
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
  
}

initGame();


const allCards = document.querySelectorAll('.card');
let openCards = [];

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



allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
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
        } else {
            // if cards dont match - go away
            setTimeout(function(){
            openCards.forEach(function(card){
              card.classList.remove('open', 'show');
            });

            openCards = [];
          }, 700);
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