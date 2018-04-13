var poll_rate = 1000;

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
function get_board(playerid)
{
    url ="/simpleboard?player="+playerid;
 
    get(url, loadboard);
    if (game_state == WAITING) {
        setTimeout(get_board.bind(null,playerid), poll_rate);
    }
}
function get_player()
{
    get("/player", setplayer);
    if (game_state == WAITING) {
        setTimeout(get_player, poll_rate);
    }
}

function put(url, message)
{
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var userInfo = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(message));
}


function put_next_player(next_player)
{
    //var next_player = { "current_player": current_player, "player_name": "", "last_roll":last_roll };
    put("/player", next_player);
    // put to server needs to be done
    // and then fetch the next player
    if (game_state == WAITING) {
        setTimeout(get_player, 5000);
    }
}
function put_board(board)
{
    // need put the changes we made to the board
    put("/simpleboard", board);
    if (game_state == WAITING) {
        setTimeout(get_board.bind(null,board.player), poll_rate);
    }
}
function get_admin_initgame()
{
    put("/admin/initgame");
}


