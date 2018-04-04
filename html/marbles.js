// hook into the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var WAITING = 1;
var ROLLDIE = 2;
var PICKMARBLE = 3;
var PICKDEST = 4;
var WIN = 5;
var game_state = WAITING;

// this is the board_grid. 
// - a zero means no divot
// - 1 means empty divot
// - 10,11,12,13 - player one marbles
// - 20,21,22,23 - player two marbles
// - 30,31,32,33 - player three marbles
// - 40,41,42,43 - player four marbles
// 
var board_grid = []
board_grid[0] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
board_grid[1] = [ 0, 20, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 30, 0];
board_grid[2] = [ 0, 0, 21, 0, 0, 0, 1, 1, 1, 0, 0, 0, 31, 0, 0];
board_grid[3] = [ 0, 0, 0, 22, 0, 0, 1, 1, 1, 0, 0, 32, 0, 0, 0];
board_grid[4] = [ 0, 0, 0, 0, 23, 0, 1, 1, 1, 0, 33, 0, 0, 0, 0];
board_grid[5] = [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0];
board_grid[6] = [ 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
board_grid[7] = [ 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0];
board_grid[8] = [ 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
board_grid[9] = [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0];
board_grid[10] = [ 0, 0, 0, 0, 10, 0, 1, 1, 1, 0, 40, 0, 0, 0, 0];
board_grid[11] = [ 0, 0, 0, 11, 0, 0, 1, 1, 1, 0, 0, 41, 0, 0, 0];
board_grid[12] = [ 0, 0, 12, 0, 0, 0, 1, 1, 1, 0, 0, 0, 42, 0, 0];
board_grid[13] = [ 0, 13, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 43, 0];
board_grid[14] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function drawBoard() {
    for (c=0; c<15; c++) {
        for (r=0;r<15; r++) {
            divot = board_grid[r][c];
            if (divot>0) {
                ctx.beginPath();
                switch (divot) { // select a player color if there is a marble in place.
                    case 10:
                    case 11:
                    case 12:
                    case 13: 
                        ctx.fillStyle = "blue";
                        break;
                    case 20:
                    case 21:
                    case 22:
                    case 23: 
                        ctx.fillStyle = "green";
                        break;
                    case 30:
                    case 31:
                    case 32:
                    case 33: 
                        ctx.fillStyle = "red";
                        break;
                    case 40:
                    case 41:
                    case 42:
                    case 43: 
                        ctx.fillStyle = "yellow";
                        break;
                    default: // or a default blank divot color.
                        ctx.fillStyle = "#F5F5F5";
                }
                ctx.arc(30*c+30,30*r+30,10,0,Math.PI*2);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    ctx.closePath();
}

 
function clearScreen()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

// -- load board
function loadboard()
{
    console.log(this.responseText);
}
// -- set player
function setplayer()
{
    console.log(this.responseText);
}

function xhrSuccess() { 
    this.callback.apply(this, this.arguments); 
}

function xhrError() { 
    console.error(this.statusText); 
}

function get(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.arguments = Array.prototype.slice.call(arguments, 2);
    xhr.onload = xhrSuccess;
    xhr.onerror = xhrError;
    xhr.open("GET", url, true);
    xhr.send(null);
}
function get_board()
{
    get("/board", loadboard);
    if (game_state == WAITING) {
        setTimeout(get_board, 5000);
    }
}
function get_player()
{
    get("/player", setplayer);
    if (game_state == WAITING) {
        setTimeout(get_player, 5000);
    }
}

function drawText()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Ready player 1", canvas.width-165, 20);
}

// main draw loop
function draw() {
    // request future draw call.
    requestAnimationFrame(draw);
    now = Date.now();
    elapsed = now-last;
    if (elapsed > fpsInterval) {
        last = now - (elapsed % fpsInterval);
        clearScreen();
        drawBoard();
        drawText();
    }
}

// refresh rate and loop hookup
var fpsInterval = 1000/60;  
var last=Date.now();
var startTime=last;
draw();
get_board();
get_player();


// listen for mouse clicks, determine if its on a divot
// (need ot decide on actual behaviour soon, but for now alert which divot got clicked)
canvas.addEventListener('click', (evt) => {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
  scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
  scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
  const pos = {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  };
  divotx = Math.round((pos.x -30)/30); // divot, as in hole in the board for a marble.
  divoty = Math.round((pos.y -30)/30);
  if (divotx > 14 || divoty> 14) { // not on the grid, maybe a button or other ui?
  } else if (board_grid[divotx][divoty]) {
      alert('clicked on:' + divotx + ',' + divoty);
  }

});



