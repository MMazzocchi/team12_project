function initCanvas() {
    var canvas = $('canvas');
    canvas.click(function(e) { selectCard(e); });

    render();
}

function selectCard(e) {

    if(turnInProgress) {
//        console.log(e);
        if((e.layerY >= 300 && e.layerY <= 396) && (e.layerX >= 150 && e.layerX <= 500)) {
            var i = ((e.layerX-150)/70);
            i = i-(i%1);
            hand[i].selected = !hand[i].selected;
            console.log(i+": "+hand[i].selected);
            render();
        }

    }
}

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

    drawPayoutTable(ctx);
    drawScore(ctx);
    drawBet(ctx);

    drawHand(ctx);
}

function drawBet(ctx) {
    ctx.strokeStyle = "#FFB905";
    ctx.lineWidth = 2;
    ctx.font = "16pt Calibri";
    ctx.strokeText("Current Bet:", 705, 250);
    ctx.strokeStyle = "#E43D1A";
    ctx.lineWidth = 2;
    ctx.font = "25pt Calibri";
    ctx.strokeText(bet, 762, 297);

}

function drawHand(ctx) {

    var x=150;
    var y=300;

        $.each(hand, function(i,v) {
            drawCard(v,x,y,ctx);
            x+=70;
        });
}

function drawScore(ctx) {
    ctx.strokeStyle = "#FFB905";
    ctx.lineWidth = 2;
    ctx.font = "16pt Calibri";
    ctx.strokeText("Your Credits:", 705, 155);
    ctx.strokeStyle = "#E43D1A";
    ctx.lineWidth = 2;
    ctx.font = "25pt Calibri";
    ctx.strokeText(credits, 740, 192);

}

function drawPayoutTable(ctx) {
    var winningHands = [
        ["Royal Flush", 250],
        ["Straight Flush", 150],
        ["Four Aces", 100],
        ["Four Of A Kind", 50],
        ["Full House", 10],
        ["Flush", 5],
        ["Straight", 4],
        ["Three Of A Kind", 3],
        ["Two Pair", 2],
        ["Jacks Or Better", 1]
    ];

    var x=60;
    var y=100;

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.font = "10pt Calibri";

    $.each(winningHands, function(i,v) {
        ctx.lineWidth = 2;
        ctx.strokeRect(x,y,200,15);
        ctx.strokeRect(x+200,y,200,15);
        ctx.strokeRect(x+400,y,200,15);
        ctx.lineWidth = 1;
        ctx.strokeText(v[0],x+2,y+12);
        ctx.strokeText(v[1],x+202,y+12);
        if(bet != "--") {
            ctx.strokeText((bet*v[1]),x+402,y+12);
        }else{
            ctx.strokeText("------",x+402,y+12);
        }
        y+=15;
    });
}

function drawCard(myCard, x, y, ctx) {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.font = "10pt Calibri";
    ctx.strokeRect(x,y,70,96);

//    ctx.strokeText(myCard.value,x+3,y+15);
//    ctx.strokeText(myCard.suite,x+3,y+33);

    var name = "";
    name=myCard.value + "_" + myCard.suite + ".png";
    var img = document.createElement('img');
    img.onload = function() {
        ctx.drawImage(this,x,y);

        if(myCard.selected) {
            var sel = document.createElement('img');
            sel.onload = function() {
                ctx.drawImage(this,x,y);
            };
            sel.id = "sel";
            sel.src = "cards/select.png";
        }
    };
    img.id = name;
    img.src = "cards/"+name;

}
