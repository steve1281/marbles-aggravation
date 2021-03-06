// utility functions

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// convert game state to string
function game_state_toString()
{
    var result = "";
    switch (game_state) {
        case WAITING:
            result = "WAITING";
            break;
        case ROLLDIE:
            result = "ROLLDIE";
            break;
        case PICKMARBLE:
            result = "PICKMARBLE";
            break;
        case PICKDEST:
            result = "PICKDEST";
            break;
        case WIN:
            result = "WIN";
            break;
        default:
            result = "UNKNOWN";
            break;
    }
    return result;

}

// https://stackoverflow.com/questions/1181575/determine-whether-an-array-contains-a-value                                                       
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

function isMyMarble(col, row )
{
      var result = false;
      var marbleAt = board_grid[col][row];

      switch (my_player_id) {
          case RED:
              if (contains.call([10,11,12,13], marbleAt)) result = true;
              break;
          case GREEN:
              if (contains.call([20,21,22,23], marbleAt)) result = true;
              break;
          case BLUE:
              if (contains.call([30,31,32,33], marbleAt)) result = true;
              break;
          case YELLOW:
              if (contains.call([40,41,42,43], marbleAt)) result = true;
              break;
          default:
              break;
       }

      return result;
}

