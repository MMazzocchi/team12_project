window.onload = pageLoad;
var deck = [];
var hand = [];
var bet = "--";
var credits = "------";
var turnInProgress = false;
var handResult = "----------";
var payout = "------";

function pageLoad() {
	// set up canvas
        initCanvas();

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
	hand = [];
	credits = 200;
	bet = 1;
	turnInProgress = false;
	handResult = "----------";
	payout = "------";
	render();

	// enable draw button
	document.getElementById("draw").disabled = false;
}

function nextTurn() {
	// draw new cards
	deck.shuffle();
	hand = [];
	for (var i = 0; i < 5; i++) {
		deck[i].selected = false;
		hand.push(deck[i]);
	}

	// take bet and reset 
	credits -= bet;
	handResult = "----------";
	payout = "------";
}

function doTurn() {
	// get cards to discard/hold
	var count = 0;

	for(var i = 0; i < hand.length; i++) {
		if(hand[i].selected) {
			hand[i].selected = false;
			hand[i] = deck[i + 5];
		}
	}

	// check hand and payout
	checkWin();

	// game over if out of credits
	if (credits <= 0) {
		// disable draw button
		document.getElementById("draw").disabled = true;

		// display game over
		alert("Game Over.");
	}
	render();
}

function setBet() {
	if (!turnInProgress) {
		bet = this.id;
	}
	render();
}

// draw button clicked, advance turn
function draw() {
	if (credits >= 0) {
		if(turnInProgress) {
			doTurn();
		} else if (credits > 0) {
			// make sure user cant bet more than the have
			if (bet > credits) { bet = 1; }
			nextTurn();
		}
		turnInProgress = !turnInProgress;
	}
	render();
}

function checkWin() {
	// check if winning hand
	var possibleHands = ["Royal Flush", "Straight Flush", "Four Aces", 
		"Four Of A Kind", "Full House", "Flush", "Straight", "Three Of A Kind", 
		"Two Pair", "Jacks Or Better", "No Win"];

	var index = 10;
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
		index = 0;
	} else if (flush && straight) {
		// straight flush
		index = 1;
	} else if (flush) {
		// flush
		index = 5;
	} else if (straight) {
		// straight
		index = 6;
	}

	// pairs, threes, fours, full house
	for (var i in cardValues) {
		if (cardValues[i] == 4) {
			if (i == 'A') {
				// four aces
				index = 2;
			} else {
				// four of a kind
				index = 3;
			}
		} else if (cardValues[i] == 3) {
			if (pairsFound == 1) {
				// full house
				index = 4;
			} else {
				// three of a kind
				index = 7;
			}
		} else if (cardValues[i] == 2) {
			if (threeOfaKind) {
				// full house
				index = 4;
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
		index = 8;
	} else if (pairsFound == 1 && jacksOrBetter) {
		index = 9;
	}

	// set result of hand to display
	handResult = possibleHands[index];
	// payout
	pay(index);
}

function pay(index) {
	// payout according to hand
	var payouts = [250, 150, 100, 50, 10, 5, 4, 3, 2, 1, 0];

	payout = bet * payouts[index];
	credits += payout;
}

function Card(suite, value) {
	// card class
	this.suite = suite;
	this.value = value;
	this.selected = false;
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
