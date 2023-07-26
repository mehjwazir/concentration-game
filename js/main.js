
/*----- constants -----*/
const SOURCE_CARDS = [
  {img: 'images/insta.png', matched: false},
  {img: 'images/slack1.png', matched: false},
  {img: 'images/youtube1.png', matched: false},
  {img: 'images/snapchat1.png', matched: false},
  {img: 'images/fb1.png', matched: false},
  {img: 'images/twitter1.png', matched: false},
  {img: 'images/tiktok1.png', matched: false},
  {img: 'images/linkedin1.png', matched: false}
];


const CARD_BACK = 'images/blacksquare.png'; 
const DISPLAY_CARD_TIME = 1000;


/*----- app's state (variables) -----*/
let cards;  // array of source cards X 2, shuffled
let selectedCard;
let badGuessCount;
let ignoreClick;
let winner;
let lose;


/*----- cached element references -----*/
const cardImgEls = document.querySelectorAll('main > img');
const badCountEl = document.querySelector('h3');
const btnEl = document.querySelector('button');


/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);
btnEl.addEventListener('click', init);


/*----- functions -----*/
init();

function init() {
  buildShuffledCards();
  selectedCard = null;
  badGuessCount = 0;
  ignoreClick = false;
  winner = false;
  render();
}

function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id);
  const card = cards[cardIdx];
  if (ignoreClick || isNaN(cardIdx) || card.matched) return;
  if (selectedCard && selectedCard === card) {
    badGuessCount++;
    selectedCard = null;
  } else if (selectedCard) {
    // check for match
    if (card.img === selectedCard.img) {
      card.matched = selectedCard.matched = true;
      selectedCard = null;
      winner = cards.every(card => card.matched);
    } else {
      ignoreClick = true;
		badGuessCount++;
		lose = badGuessCount === 16;
      // hack
      card.matched = true;
      setTimeout(function() {
        ignoreClick = false;
        selectedCard = null;
        card.matched = false;
        render();
      }, DISPLAY_CARD_TIME);
    }
  } else {
    selectedCard = card;
  }
  render();
}

function buildShuffledCards() {
  const tempCards = [];
  cards = [];
  SOURCE_CARDS.forEach(function(card) {
    tempCards.push({...card}, {...card});
  });
  while (tempCards.length) {
    const rndIdx = Math.floor(Math.random() * tempCards.length);
    const rndCard = tempCards.splice(rndIdx, 1)[0];
    cards.push(rndCard);
  }
}

function render() {
btnEl.style.visibility = winner ? 'visible' : 'visible';
  cards.forEach(function(card, idx) {
    const src = card.matched || selectedCard === card ? card.img : CARD_BACK; 
    cardImgEls[idx].src = src;
  });
  if (winner) {
	  badCountEl.innerHTML = 'You Win!';
	  
  } else if (lose ) {
    badCountEl.innerHTML =  'You Lose!';
  } else { 
	  badCountEl.innerHTML = ` Moves: ${badGuessCount}`;
	  
}
}