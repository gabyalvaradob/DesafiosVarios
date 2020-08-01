// Challenge 1: Your Age in Days
function ageInDays() {
  var birthYear = prompt("What year were you born... Good friend?");
  var ageInDays = (2018 - birthYear) * 365;
  var h1 = document.createElement('H1');
  var textAnswer = document.createTextNode('You are ' + ageInDays.toString() + ' days old.');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat() {
  var catDiv = document.createElement('div');
  catDiv.innerHTML = "<img class='cat-image' src='http://thecatapi.com/api/images/get?format=src&type=gif&size=small'>"
  document.getElementById('catGeneratorDiv').appendChild(catDiv);
}


// Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  results = decideWinner(humanChoice, botChoice);
  message = finalMessage(results)
  rpsFrontEnd(yourChoice.id, botChoice, message);
  // alert(message + '\n---------------------------\n\nYou: ' + humanChoice + '\nBot: ' + botChoice + '\nYour Score: ' + humanScore + '\nBot Score: ' + botScore);
}

/**
 * Returns either 0, 1 or 2
 */
function randToRpsInt() {
  return Math.floor(Math.random() * 3)
}

/**
 * Takes in a integer and returns the choice as a string.
 * @param {int} number - Numbers 0-2
 */
function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number]
}

/**
 * Takes in your choice & computer's choice as strings and returns
 * the scores as an array.
 * @param {string} yourChoice 
 * @param {string} computerChoice 
 */
function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
  }

  var yourScore = rpsDatabase[yourChoice][computerChoice]
  var computerScore = rpsDatabase[computerChoice][yourChoice]

  return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]){
  if (yourScore === 0) {
    return {'message': 'You lost!', 'color': 'red'}
  } else if (yourScore == 0.5) {
    return {'message': 'You tied!', 'color': 'yellow'}
  } else {
    return {'message': 'You won!', 'color': 'green'}
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var items = ['rock', 'paper', 'scissors'];

  var imagesDatabase = {
    'rock': document.getElementById('rock').src, 
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  };

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
  messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);

  /* Alternate way of doing this
  // create image elements
  var image1 = document.createElement('img');
  var image2 = document.createElement('img');

  // set the attributes for the images
  image1.setAttribute = ('src', imagesDatabase[humanImageChoice]);
  image1.setAttribute = ('height', '150px');
  image2.setAttribute = ('src', imagesDatabase[botImageChoice]);
  image2.setAttribute = ('width', '150px');

  // append the images to the flex-box-rps-div
  document.getElementById('flex-box-rps-div').appendChild(image1);
  document.getElementById('flex-box-rps-div').appendChild(image2);
  */
}

// Challenge 4: Change Button Colors
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = []

for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === 'red') {
    buttonsRed();
  } else if (buttonThingy.value === 'green') {
    buttonsGreen();
  } else if (buttonThingy.value === 'reset') {
    buttonColorReset();
  } else if (buttonThingy.value === 'random'){
    randomColors();
  }
}

function buttonsRed(){
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen(){
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  var allButtons = document.getElementsByTagName('button');

  var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

  for (i = 0; i < allButtons.length; i++) {
    var randomNumber = Math.floor(Math.random() * 4);
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(choices[randomNumber]);
  }
}

// Challenge 5: Blackjack
let blackjackGame = {
  'yourScore': 0,
  'dealerScore': 0,
  'isStand': false,
  'turnsOver': false,
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11]},
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A']
};

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

const hitSound = new Audio('/Users/cleverprogrammer/github/javascript_crash_course/static/sounds/swish.m4a');
const winSound = new Audio('/Users/cleverprogrammer/github/javascript_crash_course/static/sounds/cash.mp3');
const lossSound = new Audio('/Users/cleverprogrammer/github/javascript_crash_course/static/sounds/aww.mp3');

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let randomCard = hit();
    updateScore('yourScore', randomCard);
    console.log(blackjackGame['yourScore']);
    showCard(randomCard, '#your-box');
    showYourScore(blackjackGame['yourScore']);
  }
}



function showResult() {
  let message;

  if (blackjackGame['turnsOver'] === true) {

    if (blackjackGame['yourScore'] <= 21) {

      // condition: higher score than dealer's or when dealer busts but you're 21 or under.
      if (blackjackGame['yourScore'] > blackjackGame['dealerScore'] || (blackjackGame['dealerScore'] > 21)) {
        blackjackGame['wins']++;
        document.querySelector('#wins').textContent =  blackjackGame['wins']; 
        message = 'You won!';
        messageColor = 'green';
        winSound.play();

      } else if (blackjackGame['yourScore'] < blackjackGame['dealerScore']) {
        blackjackGame['losses']++;
        document.querySelector('#losses').textContent =  blackjackGame['losses']; 
        message = 'You lost!';
        messageColor = 'red';
        lossSound.play();

      } else if (blackjackGame['yourScore'] === blackjackGame['dealerScore']) {
        blackjackGame['draws']++;
        document.querySelector('#draws').textContent = blackjackGame['draws']; 
        message = 'You drew!';
        messageColor = 'black';
      }

      // condition: user busts but dealer doesn't
    } else if (blackjackGame['yourScore'] > 21 && blackjackGame['dealerScore'] <= 21) {
      blackjackGame['losses']++;
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You lost!';
      messageColor = 'red';
      lossSound.play();

    // condition: when both bust.
    } else if (blackjackGame['yourScore'] > 21 && blackjackGame['dealerScore'] > 21) {
      blackjackGame['draws']++;
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You drew!';
      messageColor = 'black';
    }
  }

  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}

function hit() {
  let randomIndex = Math.floor(Math.random() * 13);
  let randomCard = blackjackGame['cards'][randomIndex];
  console.log(randomCard);
  return randomCard;
}

function showCard(card, playerBoxId) {
  if (Number(document.querySelector(playerBoxId + ' span').textContent) <= 21) {
    let cardImage = document.createElement('IMG');
    cardImage.src = '/Users/cleverprogrammer/github/javascript_crash_course/static/images/' + card + '.png';
    document.querySelector(playerBoxId).appendChild(cardImage);
    hitSound.play();
  }
}

function updateScore(playerScore, card) {
  if (card === 'A') {
    if (blackjackGame[playerScore] + blackjackGame['cardsMap'][card][1] <= 21) {
      blackjackGame[playerScore] += blackjackGame['cardsMap'][card][1];
    } else {
      blackjackGame[playerScore] += blackjackGame['cardsMap'][card][0];
    }
  } else {
    blackjackGame[playerScore] += blackjackGame['cardsMap'][card];
  }
}

function showYourScore(score) {
  if (blackjackGame['yourScore'] > 21) {
    document.querySelector('#your-blackjack-score').textContent = "BUST!";
    document.querySelector('#your-blackjack-score').style.color = 'red';
  } else {
    document.querySelector('#your-blackjack-score').textContent = score;
  }
}

function showDealerScore(score) {
  if (blackjackGame['dealerScore'] > 21) {
    document.querySelector('#dealer-blackjack-score').textContent = "BUST!";
    document.querySelector('#dealer-blackjack-score').style.color = 'red';
  } else {
    document.querySelector('#dealer-blackjack-score').textContent = score;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame['isStand'] = true;
  while (blackjackGame['dealerScore'] < 16 && blackjackGame['isStand'] === true) {
    let randomDealerCard = hit();
    updateScore('dealerScore', randomDealerCard);
    showCard(randomDealerCard, '#dealer-box');
    showDealerScore(blackjackGame['dealerScore']);
    await sleep(1000);
  }

  blackjackGame['turnsOver'] = true;
  showResult(); 
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (i=0; i<yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (i=0; i<dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    blackjackGame['yourScore'] = 0;
    blackjackGame['dealerScore'] = 0;

    document.querySelector('#your-blackjack-score').textContent = 0;
    document.querySelector('#dealer-blackjack-score').textContent = 0;

    document.querySelector('#your-blackjack-score').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-score').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = false;
  }
}



// Challenge 6: AJAX & API's with Javascript
const url = 'https://randomuser.me/api/?results=10'; // Get 10 random users
fetch(url)
  .then(resp => resp.json())
  .then(data => {
    let authors = data.results;
    console.log(authors);
    for (i=0; i<authors.length; i++) {
      let div = document.createElement('div');
      let image = document.createElement('img');
      let p = document.createElement('p');
      p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`));
      image.src = authors[i].picture.large;
      div.appendChild(image);
      div.appendChild(p);
      document.querySelector('.container-6 .flex-ajax-row-1').appendChild(div);
    }
  });
  
let title = str => str[0].toUpperCase() + str.slice(1);

function mustafa() {
  return '5'
}
mustafa()
 
function resp() {
  return resp.json();
}

var mustafa = number => 5 + number;
mustafa()



// sound.seek(7);


// challenge 7: wikipedia
