// hook into the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//game constants

//position of the die
var die_offsetx = 500;
var die_offsety = 60;

// game states
var WAITING = 1;
var ROLLDIE = 2;
var PICKMARBLE = 3;
var PICKDEST = 4;
var WIN = 5;
var game_state = WAITING;

// active player info
var current_player = 0;
var player_name = "";
var last_roll = 0;

// player colors
var RED = 1;
var GREEN = 2;
var BLUE = 3;
var YELLOW = 4;
var colorToString = ["WHITE", "RED", "GREEN", "BLUE", "YELLOW"];

var my_player_id = parseInt(getParameterByName("player")); // RED; // this needs to be set by a call to the back end.


// this is the board_grid. 
// - a zero means no divot
// - 1 means empty divot
// - 10,11,12,13 - player one marbles
// - 20,21,22,23 - player two marbles
// - 30,31,32,33 - player three marbles
// - 40,41,42,43 - player four marbles
// 
var board_grid = []
/*
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
*/

// draw a board
function drawBoard() {
    var marked = 0;
    for (r=0; r<15; r++) {
        for (c=0;c<15; c++) {
            divot = board_grid[c][r];
            if (divot > 99) { // marked 
                divot = divot / 100;
                marked = 1;
            }
            if (divot>0) {
                ctx.beginPath();
                switch (divot) { // select a player color if there is a marble in place.
                    case 10:
                    case 11:
                    case 12:
                    case 13: 
                        ctx.fillStyle = "red";
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
                        ctx.fillStyle = "blue";
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
                if (marked) {
                    ctx.fillStyle = "pink";
                    marked = 0;
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

// draw a die pip
function drawPip(x,y)
{
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.arc(die_offsetx + x, die_offsety + y, 2, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

// draw a die
function drawDie(rollValue) 
{
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.rect(die_offsetx-2, die_offsety-2, 24,24);
    ctx.stroke();
    ctx.closePath();

    switch(rollValue) {
    case 1:
        drawPip(10,10);
        break;
    case 2:
        drawPip(2,2);
        drawPip(18,18);
        break;
    case 3:
        drawPip(2,2);
        drawPip(10,10);
        drawPip(18,18);
        break;
    case 4:
        drawPip(2,2);
        drawPip(2,18);
        drawPip(18,2);
        drawPip(18,18);
        break;
    case 5:
        drawPip(2,2);
        drawPip(2,18);
        drawPip(10,10);
        drawPip(18,2);
        drawPip(18,18);
        break;
    case 6:
        drawPip(2,2);
        drawPip(2,18);
        drawPip(10,2);
        drawPip(10,18);
        drawPip(18,2);
        drawPip(18,18);
        break;
    default:
        break; // leave blank.
    }
}

// clear screen 
function clearScreen()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

// -- load board
function loadboard()
{
    console.log(this.responseText);
    myObj = JSON.parse(this.responseText);
    board_grid = myObj.board_grid;

}

// -- set player, called once json data arrives.
function setplayer()
{
    if (game_state != WAITING) {
        return;
    }

    myObj = JSON.parse(this.responseText);

    current_player = myObj.current_player;
    player_name = myObj.player_name;
    last_roll = myObj.last_roll;

    if (current_player == my_player_id) {
        game_state = ROLLDIE;
    }
}


// -- draw misc player name, id, etc etc
function drawText()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Me: " + colorToString[my_player_id] , 25, 20);
    ctx.fillText("Current: " + colorToString[current_player], 205, 20);
    ctx.fillText("State: " + game_state_toString(), canvas.width-165, 20);
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
        drawDie(last_roll);
    }
}

// refresh rate and loop hookup
var fpsInterval = 1000/60;  
var last=Date.now();
var startTime=last;

// call drawing loop
draw();

// call get board (must be called at least once)
get_board();
// call get player -- modify this; we should register ourselves, and that should call this.
get_player();
var picked_marble={col:0,row:0,marble:0};

function isMyMarble(col, row )
{
    var result = false;
    var marbleAt = board_grid[col][row];

    switch (my_player_id) {
        case RED:
            if (marbleAt == 10 || marbleAt == 11 || marbleAt == 12 || marbleAt == 13) result = true;
            break;
        case GREEN:
            if (marbleAt == 20 || marbleAt == 21 || marbleAt == 22 || marbleAt == 23) result = true;
            break;
        case BLUE:
            if (marbleAt == 30 || marbleAt == 31 || marbleAt == 32 || marbleAt == 33) result = true;
            break;
        case YELLOW:
            if (marbleAt == 40 || marbleAt == 41 || marbleAt == 42 || marbleAt == 43) result = true;
            break;
        default:
            break;
     }
 
    return result;
}

function updatePlayerInfo()
{
    var next_player = { "current_player": current_player, "player_name": "", "last_roll":last_roll };
    put_next_player(next_player);
}

// handle "divot" selection - could be marble or divot.
function handleDivotSelection(pos)
{
      divot_col = Math.round((pos.x -30)/30); // divot, as in hole in the board for a marble.
      divot_row = Math.round((pos.y -30)/30);
      if (board_grid[divot_col][divot_row]) {
          if (game_state == PICKMARBLE) {
              // do some work (eg, is it a marble, is it your marble, highlight the marble, etc etc)
              
              if (board_grid[divot_col][divot_row] > 1) { // picked a marble
                  if (isMyMarble(divot_col,divot_row)) {
                      picked_marble.col =  divot_col;
                      picked_marble.row = divot_row;
                      picked_marble.marble = board_grid[divot_col][divot_row];
                      board_grid[divot_col][divot_row]= board_grid[divot_col][divot_row] * 100; 
                      game_state = PICKDEST;
                  }
              }
          } else { // PICKDEST
              // do some work (eg. is it a valid dest (are you jumping your own marble, is it within last_roll places, etc etc)
              if (board_grid[divot_col][divot_row] == 1) { // picked an empty divot (what if killing someone? or jumping self!
                  // assume we are happy for now. 
                  board_grid[divot_col][divot_row] = picked_marble.marble;
                  board_grid[picked_marble.col][picked_marble.row] = 1;
                  if (last_roll == 6 || last_roll == 1) { // and the roll was used...
                      game_state = ROLLDIE;
                  } else {
                      game_state = WAITING;
                      current_player ++;
                      if (current_player >4) current_player=1;
                      updatePlayerInfo();
                  }
                  put_board({ "board_grid": board_grid});
              } else {
                  // invalid desistination, switch gamestate to PICKMARBLE
                  board_grid[picked_marble.col][picked_marble.row]= board_grid[picked_marble.col][picked_marble.row] / 100; 
                  picked_marble={col:0,row:0,marble:0};
                  game_state=PICKMARBLE;
                  
              }
          }
      }
}

function checkHooseGowLock()
{
    var full = false;
    switch (my_player_id) {
        case GREEN:
            if (board_grid[1][1]+board_grid[2][2]+board_grid[3][3]+board_grid[4][4] > 20*4) { full=true; }
            break;
        case BLUE:
            if (board_grid[1][13]+board_grid[2][12]+board_grid[3][11]+board_grid[4][10] > 30*4) { full=true; }
            break;
        case YELLOW:
            if (board_grid[13][13]+board_grid[12][12]+board_grid[11][11]+board_grid[10][10] > 40*4) { full=true; }
            break;
        case RED:
            if (board_grid[13][1]+board_grid[12][2]+board_grid[11][3]+board_grid[10][4] > 10*4) { full=true; }
            break;
        default:
            break;
     }
     if (full && last_roll!=1 && last_roll!=6) {
         return true;
     } else {
         return false;
     }
}

// handle die roll.
function handleRollDie(pos) 
{
    if (pos.x > die_offsetx-2 && pos.x < die_offsetx+24 ){
        if (pos.y > die_offsety-2 && pos.y < die_offsety + 24) {
            last_roll=Math.floor(6*Math.random())+1; 
            // can my_player_id use this roll?
            if (checkHooseGowLock()) {
                game_state = WAITING;
                current_player++; if (current_player > 4) {current_player = 1;}
                get_board();
            } else {           
                game_state = PICKMARBLE;

            }
            updatePlayerInfo();
        }
    }
}

// listen for mouse clicks
// manage based on game state
canvas.addEventListener('click', (evt) => {

  var rect = canvas.getBoundingClientRect(), // abs. size of element
  scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
  scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
  const pos = {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  };
  
  if (game_state == PICKDEST || game_state == PICKMARBLE ) {
      handleDivotSelection(pos);
  } else if (game_state == ROLLDIE) { 
      handleRollDie(pos);
  }

});



