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
var enable_ai = parseInt(getParameterByName("enable_ai")); if (isNaN(enable_ai)) enable_ai=0;
var skip_me = parseInt(getParameterByName("skip_me")); if (isNaN(skip_me)) skip_me=0;
 
var choices=[];
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
    ctx.fillStyle = "white"; //#f0f0f0";
    ctx.fillText(" " + JSON.stringify(choices),185,canvas.height-20);
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
function destInChoices(choices,picked_marble, dest)
{
    if (enable_ai ==1 ) {
        console.log("choices: "+JSON.stringify(choices));
        console.log("picked_marble: " + JSON.stringify(picked_marble));
        console.log("dest: " + JSON.stringify(dest));
    }

    p = findPos(dest);
    var marble_id = picked_marble.marble;
    var idx = marble_id - (10*my_player_id);
    for (var i=0;i<choices[idx].length;i++) {
        if (choices[idx][i] == p) return true;
    }
    return false;
}
//
// hoose gows coordinates
// 3    2
//  \  /
//  /  \  
// 0    1 
var gows_str = `[ 
    [{ "row":1,  "col":13}, {"row":2,  "col":12}, {"row":3, "col":11}, {"row":4,  "col":10}], 
    [{ "row":13, "col":13}, {"row":12, "col":12}, {"row":11,"col":11}, {"row":10, "col":10}], 
    [{ "row":13, "col":1 }, {"row":12, "col":2 }, {"row":11,"col":3 }, {"row":10, "col":4 }], 
    [{ "row":1,  "col":1 }, {"row":2,  "col":2 }, {"row":3, "col":3 }, {"row":4,  "col":1 }] 
]`;
var gows = JSON.parse(gows_str);

function returnToHooseGow(marble_id) {
    if (marble_id<=1) return;
   
    // select hoosgow to find
    var hoosegow = Math.floor(marble_id/10); // 1,2,3,4

    // select orientation
    var orientation = my_player_id; // basically, 1,2,3 or 4

    console.log("orientation: " + orientation);
    console.log("hoosegow: " + hoosegow);
    console.log("marble: " + marble_id);

    // for now, brute force selection (todo: there must be a more clever way to do this)
    if (orientation == 1) {
        if (hoosegow == 4) gow = gows[3];//  40   30
        if (hoosegow == 3) gow = gows[2];//    \ / 
        if (hoosegow == 2) gow = gows[1];//    / \
        if (hoosegow == 1) gow = gows[0];//  10   20
    }
    if (orientation == 2) {
        if (hoosegow == 1) gow = gows[3];//  10   40
        if (hoosegow == 4) gow = gows[2];//    \ / 
        if (hoosegow == 3) gow = gows[1];//    / \
        if (hoosegow == 2) gow = gows[0];//  20   30
    }
    if (orientation == 3) {
        if (hoosegow == 2) gow = gows[3];//  20   10
        if (hoosegow == 1) gow = gows[2];//    \ / 
        if (hoosegow == 4) gow = gows[1];//    / \
        if (hoosegow == 3) gow = gows[0];//  30   40
    }
    if (orientation == 4) {
        if (hoosegow == 3) gow = gows[3];//  30   20
        if (hoosegow == 2) gow = gows[2];//    \ / 
        if (hoosegow == 1) gow = gows[1];//    / \
        if (hoosegow == 4) gow = gows[0];//  40   10
    }
    
    // scan the gow for an empty spot (guarneteed to be there)
    console.log(JSON.stringify(gow));
    var g=[];
    for (var i=0; i<gow.length;i++) {
        g = gow[i];
        if (board_grid[g.col][g.row] == 1) {
            board_grid[g.col][g.row]= marble_id;
            break;
        }
    }
}
// handle "divot" selection - could be marble or divot.
function handleDivotSelection(pos)
{
      var divot_col = Math.round((pos.x -30)/30); // divot, as in hole in the board for a marble.
      var divot_row = Math.round((pos.y -30)/30);
      if (board_grid[divot_col][divot_row]) {
          marbles(divot_col, divot_row);
      }
}

function marbles(divot_col, divot_row)
{
    if (enable_ai ==1) {
        console.log("marbles; game_state:"+game_state +" divot_col: "+divot_col+" divot_row: " + divot_row);
        console.log("marbles; picked_marble " + JSON.stringify(picked_marble));
    }

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
        if (destInChoices(choices, picked_marble, {"col":divot_col, "row":divot_row, "marble":board_grid[divot_col][divot_row] })) {
            target = board_grid[divot_col][divot_row];
            returnToHooseGow(target);
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
            // invalid destination, switch gamestate to PICKMARBLE
            board_grid[picked_marble.col][picked_marble.row]= board_grid[picked_marble.col][picked_marble.row] / 100; 
            picked_marble={col:0,row:0,marble:0};
            game_state=PICKMARBLE;
            
        }
    }
}

function anyChoices(choices)
{
   for (var i=0;i<choices.length;i++) {
       if (choices[i].length > 0) return true;
   }
   return false;
}

function rolled()
{
    last_roll=Math.floor(6*Math.random())+1; 
    // can my_player_id use this roll?
    choices = validDestinations();
    // this happens so much, I will make an exception here.
    if (!anyChoices(choices)) { //ruleHooseGowLock()) {
        game_state = WAITING;
        current_player++; if (current_player > 4) {current_player = 1;}
        get_board(my_player_id);
    } else {           
        game_state = PICKMARBLE;
    
    }
    updatePlayerInfo();
}

// handle die roll.
function handleRollDie(pos) 
{
    if (pos.x > die_offsetx-2 && pos.x < die_offsetx+24 ){
        if (pos.y > die_offsety-2 && pos.y < die_offsety + 24) {
            rolled();
        }
    }
}

// listen for mouse clicks
// manage based on game state
if (enable_ai!=1 && skip_me!=1) {
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
}

if (enable_ai == 1) setInterval(aiController, 1000);
if (skip_me == 1) setInterval(skipController, 1000);

function skipController()
{
    if (game_state != WAITING) {
        game_state = WAITING;
        current_player++; if (current_player > 4) {current_player = 1;}
        get_board(my_player_id);
        updatePlayerInfo();
    }
}

function aiController()
{
    if (game_state == PICKMARBLE) {
        for (var m = 0; m<4; m++) {
            if (choices[m].length >0) {
                pm = m + my_player_id*10;
                dm = choices[m][0];
                break;
            }
        }
        var pos={"col":-1,"row":-1};
        // hey, lets grab a hoosegow marble, why not?
        if      (board_grid[1][13] > 1) pos = {"col":1, "row":13};
        else if (board_grid[2][12] > 1) pos = {"col":2, "row":12};
        else if (board_grid[3][11] > 1) pos = {"col":3, "row":11};
        else if (board_grid[4][10] > 1) pos = {"col":4, "row":10};
        
        for (var i = 0; i<the_path.length;i++) {
            var testpos = the_path[i];
            if (board_grid[testpos.col][testpos.row] == pm) {
                pos.col = testpos.col;
                pos.row = testpos.row;
                break;
             }
        }
 
        picked_marble.col =  pos.col;
        picked_marble.row = pos.row;
        picked_marble.marble = board_grid[pos.col][pos.row];
        board_grid[pos.col][pos.row]= board_grid[pos.col][pos.row] * 100; 
        game_state = PICKDEST;
        dest = the_path[dm]; 
        marbles(dest.col, dest.row);
    } else if (game_state == ROLLDIE) {                                                                                                        
        rolled();
        console.log("rolled a " + last_roll);
    }
}
