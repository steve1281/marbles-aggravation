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


var board_grid = []


// clear screen 
function clearScreen()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

// -- load board
function loadboard()
{
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
    ctx.font = "18px Arial";
    ctx.fillStyle = colorToString[my_player_id]; //"white"; //"#34282c";
    ctx.fillText("My Colour: " + colorToString[my_player_id] , 25, 20);
    ctx.fillStyle = colorToString[current_player]; //"white"; //"#34282c";
    ctx.fillText("Current Colour: " + colorToString[current_player], 225, 20);
    ctx.fillStyle = "white"; //#f0f0f0";
    ctx.fillText(" " + game_state_toString(), canvas.width-185, 20);
}

function drawWood()
{
    var blueprint_background = new Image();
    blueprint_background.src = 'images/wood.jpg'; 
    ctx.drawImage(blueprint_background,0,0);
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
        drawWood();
        drawBoard(board_grid);
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
get_board(my_player_id);
// call get player -- modify this; we should register ourselves, and that should call this.
get_player();
var picked_marble={col:0,row:0,marble:0};

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
              //if (board_grid[divot_col][divot_row] == 1) { // picked an empty divot (what if killing someone? or jumping self!
              if (check(picked_marble, {"col":divot_col, "row":divot_row, "marble":board_grid[divot_col][divot_row] },last_roll)) {
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
                  put_board({ "board_grid": board_grid, "player":my_player_id});
              } else {
                  // invalid desistination, switch gamestate to PICKMARBLE
                  board_grid[picked_marble.col][picked_marble.row]= board_grid[picked_marble.col][picked_marble.row] / 100; 
                  picked_marble={col:0,row:0,marble:0};
                  game_state=PICKMARBLE;
                  
              }
          }
      }
}


// handle die roll.
function handleRollDie(pos) 
{
    if (pos.x > die_offsetx-2 && pos.x < die_offsetx+24 ){
        if (pos.y > die_offsety-2 && pos.y < die_offsety + 24) {
            last_roll=Math.floor(6*Math.random())+1; 
            // can my_player_id use this roll?
            if (ruleHooseGowLock()) {
                game_state = WAITING;
                current_player++; if (current_player > 4) {current_player = 1;}
                get_board(my_player_id);
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



