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

