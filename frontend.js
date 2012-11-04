/*var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="#005500";
ctx.strokeRect(0,0,900,500);

var img = document.createElement('img');
img.src="cards/1.png";

ctx.drawImage(img, 100, 100); 
*/

function render() {
    var ctx = $('canvas')[0].getContext('2d');

    //Draw the initial board
    ctx.fillStyle="#005500";
    ctx.fillRect(0,0,900,500);

    ctx.strokeStyle = "#691F01";
    ctx.lineWidth=30;
    ctx.strokeRect(0,0,900,500);

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.font = "40pt Calibri";
    ctx.strokeText("Team 12 Video Poker", 150, 75);

    drawPayoutTable(1, ctx);
}

function drawPayoutTable(myBet, ctx) {
    var WinningHand = [
        "Royal Flush",
        "Straight Flush",
        "Four Aces",
        "Four Of A Kind",
        "Full House",
        "Flush",
        "Straight",
        "Three Of A Kind",
        "Two Pair",
        "Jacks Or Better"
    ];

    var x=75;
    var y=100;

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.font = "10pt Calibri";

    $.each(WinningHand, function(i,v) {
        ctx.lineWidth = 2;
        ctx.strokeRect(x,y,200,15);
        ctx.strokeRect(x+200,y,200,15);
        ctx.strokeRect(x+400,y,200,15);
        ctx.lineWidth = 1;
        ctx.strokeText(v,x+2,y+12);
        ctx.strokeText((10-i),x+202,y+12);
        ctx.strokeText((bet*(10-i)),x+402,y+12);
        y+=15;
    });
}

function drawCard(myCard, x, y, ctx) {
    var name = "";
    name=myCard.value + "_" + myCard.suite + ".png";
    var img = document.createElement('img');
    img.id = name;
    img.src = "cards/new/"+name;

    ctx.drawImage(img, x, y);
}
