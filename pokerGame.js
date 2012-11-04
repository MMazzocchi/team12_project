window.onload = pageLoad;
var deck = [];
var hand = [];
var bet = 1;
var credits = 200;
var turnInProgress = false;

function pageLoad() {
	// set up canvas

	// link new game button to new game function
	document.getElementById("newGame").onclick = newGame;

	// link bet buttons to bet function
	document.getElementById("1").onclick = setBet;
	document.getElementById("5").onclick = setBet;

	// link draw button to draw function
	document.getElementById("draw").onclick = draw;
}

function newGame() {
	// initiate new game
	createDeck();
	deck.shuffle();
	credits = 200;
	bet = 1;
	turnInProgress = false;
}

function nextTurn() {
	deck.shuffle();
	// draw new cards
	hand = [];
	for (var i = 0; i < 5; i++) {
		hand.push(deck[i]);
	}
	updateDisplay();
}

function doTurn() {
	// get cards to discard/hold
	var discards = [];
	discards.sort();
	discards.reverse();

	for (var i = 0; i < discards.length; i++) {
		hand.remove(discards[i]);
	}

	// draw new cards
	for (var i = 0; i < discards.length; i++) {
		hand.push(deck[i+5]);
	}
	payout(checkWin());
	updateDisplay();
}

function setBet() {
	if (!turnInProgress) {
		bet = this.id;
	}
}

function updateDisplay() {
	// update win, bet, credits
	for (var i = 0; i < hand.length; i++) {
		console.log(hand[i].value + " of " + hand[i].suite);
	}
	console.log("");
}

function draw() {
	if(turnInProgress) {
		doTurn();
	} else {
		nextTurn();
	}

	turnInProgress = !turnInProgress;
}

function checkWin() {
	// check if winning hand
	var WinningHand = {
		ROYALFLUSH : 0,
		STRAIGHTFLUSH : 1,
		FOURACES : 2,
		FOUROFAKIND : 3,
		FULLHOUSE : 4,
		FLUSH : 5,
		STRAIGHT : 6,
		THREEOFAKIND : 7,
		TWOPAIR : 8,
		JACKSORBETTER : 9
	};

	var suites = { hearts : 0, spades : 0, diamonds : 0, clubs : 0 };

	for (var i in hand) {

	}
}

function payout(index) {
	// payout according to hand
	var payouts = [250, 150, 100, 50, 10, 5, 4, 3, 2, 1];

	return bet * payouts[index];
}

function Card(suite, value) {
	// card class
	this.suite = suite;
	this.value = value;
}

function createDeck() {
	// deck class contains card objects
	deck = [];
	var suites = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
	var cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];

	for (var i = 0; i < suites.length; i++) {
		for (var j = 0; j < cardValues.length; j++) {
			var card = new Card(suites[i], cardValues[j]);
			deck.push(card);
		}
	}
}

// credit: http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
// and http://sedition.com/perl/javascript-fy.html
Array.prototype.shuffle = function() {
  var i = this.length, j, tempi, tempj;
  if ( i == 0 ) return false;
  while ( --i ) {
     j       = Math.floor( Math.random() * ( i + 1 ) );
     tempi   = this[i];
     tempj   = this[j];
     this[i] = tempj;
     this[j] = tempi;
  }
  return this;
}

// credit: http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
