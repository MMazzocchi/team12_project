window.onload = pageLoad;
var deck = [];
var hand = [];
var bet = 1;
var credits = 200;
var turnInProgress = false;

function pageLoad() {
	// set up canvas
    render();

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
	updateDebug();
    render();
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
	checkWin();
	updateDebug();
}

function setBet() {
	if (!turnInProgress) {
		bet = this.id;
	}
}

// debugging purposes only
function updateDebug() {
	for (var i = 0; i < hand.length; i++) {
		console.log(hand[i].value + " of " + hand[i].suite);
	}
	console.log("");
}

// draw button clicked, advance turn
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
		JACKSORBETTER : 9,
		NOWIN : 10
	};

	var handResult = WinningHand.NOWIN;
	var flush = false;
	var straight = false;
	var pairsFound = 0;
	var threeOfaKind = false;
	var jacksOrBetter = false;

	var suites = { 'Hearts' : 0, 'Spades' : 0, 'Diamonds' : 0, 'Clubs' : 0 };
	var cardValues = {  '2' : 0, '3' : 0, '4' : 0, '5' : 0, '6' : 0,
						'7' : 0, '8' : 0, '9' : 0, 'J' : 0, 'Q' : 0, 
						'K' : 0, 'A' : 0 };

	// count occurances of each card value and suite
	for (var i = 0; i < hand.length; i++) {
		suites[hand[i].suite] += 1;
		cardValues[hand[i].value] += 1;
	}

	// royal flush, straight, stright flush, flush
	for (var i in suites) {
		// find flush
		if (suites[i] == 5) {
			flush = true;
		}
	}

	var count = 0;
	for (var i in cardValues) {
		// find straight
		if (cardValues[i] == 1) {
			count++;
		} else {
			count = 0;
		}

		if (count == 5) {
			straight = true;
		}
	}

	if (flush && straight && cardValues['A'] == 1) {
		// royal flush
		handResult = WinningHand.ROYALFLUSH;
	} else if (flush && straight) {
		// straight flush
		handResult = WinningHand.STRAIGHTFLUSH;
	} else if (flush) {
		// flush
		handResult = WinningHand.FLUSH;
	} else if (straight) {
		// straight
		handResult = WinningHand.STRAIGHT;
	}

	// pairs, threes, fours, full house
	for (var i in cardValues) {
		if (cardValues[i] == 4) {
			if (i == 'A') {
				// four aces
				handResult = WinningHand.FOURACES;
			} else {
				// four of a kind
				handResult = WinningHand.FOUROFAKIND;
			}
		} else if (cardValues[i] == 3) {
			if (pairsFound == 1) {
				// full house
				handResult = WinningHand.FULLHOUSE;
			} else {
				// three of a kind
				handResult = WinningHand.THREEOFAKIND;
			}
		} else if (cardValues[i] == 2) {
			if (threeOfaKind) {
				// full house
				handResult = WinningHand.FULLHOUSE;
			} else {
				// pair
				pairsFound += 1;
				if (i == 'J' || i == 'Q' || i == 'K' || i == 'A') {
					jacksOrBetter = true;
				}
			}
		}
	}

	// pairs
	if (pairsFound > 1) {
		handResult = WinningHand.TWOPAIR;
	} else if (pairsFound == 1 && jacksOrBetter) {
		handResult = WinningHand.JACKSORBETTER;
	}

	// payout
	console.log(handResult);
	if (handResult != WinningHand.NOWIN) {
		payout(handResult);
	}
}

function payout(index) {
	// payout according to hand
	var payouts = [250, 150, 100, 50, 10, 5, 4, 3, 2, 1];

	credits += bet * payouts[index];
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
