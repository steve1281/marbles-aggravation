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

