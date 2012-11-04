window.onload = pageLoad;
var deck = [];
var bet = 1;

function pageLoad() {
	// set up canvas
	newGame();
}

function newGame() {
	// initiate new game
	deck = createDeck();
	deck.shuffle();
	
	var hand = [];
	hand = draw(5, hand);

	for (var i = 0; i < hand.length; i++) {
		console.log(hand[i].value + " of " + hand[i].suite);
	}

	hand.remove(4);
	hand.remove(2);

	console.log('');
	hand = draw(2, hand);

	for (var i = 0; i < hand.length; i++) {
		console.log(hand[i].value + " of " + hand[i].suite);
	}
}

function updateDisplay() {
	// update win, bet, credits

}

function draw(numberOfCards, oldHand) {
	// draw new cards
	for (var i = 0; i < numberOfCards; i++) {
		oldHand.push(deck.pop());
	}

	return oldHand;
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
	var deckOfCards = [];
	var suites = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
	var cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];

	for (var i = 0; i < suites.length; i++) {
		for (var j = 0; j < cardValues.length; j++) {
			var card = new Card(suites[i], cardValues[j]);
			deckOfCards.push(card);
		}
	}

	return deckOfCards;
}

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

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
