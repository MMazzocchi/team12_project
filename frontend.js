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
}

