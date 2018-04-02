// hook into the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// game globals

// draw Lives
function drawLives()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Ready player 1", canvas.width-165, 20);
}

var board_grid = []
board_grid[0] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
board_grid[1] = [ 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0];
board_grid[2] = [ 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0];
board_grid[3] = [ 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0];
board_grid[4] = [ 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
board_grid[5] = [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0];
board_grid[6] = [ 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
board_grid[7] = [ 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0];
board_grid[8] = [ 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
board_grid[9] = [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0];
board_grid[10] = [ 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
board_grid[11] = [ 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0];
board_grid[12] = [ 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0];
board_grid[13] = [ 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0];
board_grid[14] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function drawBoard() {
    for (c=0; c<15; c++) {
        for (r=0;r<15; r++) {
            if (board_grid[c][r]) {
                ctx.beginPath();
                ctx.fillStyle = "#F5F5F5";
                ctx.arc(30*c+30,30*r+30,10,0,Math.PI*2);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    ctx.closePath();
}

var hgow_blue = [];
hgow_blue[0] = { y:13, x:1 };
hgow_blue[1] = { y:12, x:2 };
hgow_blue[2] = { y:11, x:3 };
hgow_blue[3] = { y:10, x:4 };

var hgow_green = [];
hgow_green[0] = { y:13, x:13 };
hgow_green[1] = { y:12, x:12 };
hgow_green[2] = { y:11, x:11 };
hgow_green[3] = { y:10, x:10 };

var hgow_red = [];
hgow_red[0] = { y:1, x:1 };
hgow_red[1] = { y:2, x:2 };
hgow_red[2] = { y:3, x:3 };
hgow_red[3] = { y:4, x:4 };

var hgow_yellow = [];
hgow_yellow[0] = { y:1, x:13 };
hgow_yellow[1] = { y:2, x:12 };
hgow_yellow[2] = { y:3, x:11 };
hgow_yellow[3] = { y:4, x:10 };


function drawHooseGows() {
    for (hg =0; hg<4; hg++) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(30*hgow_blue[hg].x+30, 30*hgow_blue[hg].y+30,10, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(30*hgow_green[hg].x+30, 30*hgow_green[hg].y+30,10, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(30*hgow_red[hg].x+30, 30*hgow_red[hg].y+30,10, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(30*hgow_yellow[hg].x+30, 30*hgow_yellow[hg].y+30,10, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }   
}
  
 
function clearScreen()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
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
        drawHooseGows();
        drawLives();
    }
}

// refresh rate and loop hookup
var fpsInterval = 1000/60;  
var last=Date.now();
var startTime=last;
draw();

// event listeners
document.addEventListener("keydown", keyDownHandler,  false);
document.addEventListener("keyup", keyUpHandler,  false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
}

function keyDownHandler(e) {
}

function keyUpHandler(e) {
}


