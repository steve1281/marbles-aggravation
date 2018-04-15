// figure out possible moves.

// there is a method in marbles_rules.js called inHooseGow(pos)

// find the position of a marble
// recall that marbles are color coded, so we need to adjust for the my_player_id
// also, we can't just assume they marbles are where we left them; they may have been
// killed back to the hoosegow, or they may have been moved by a partner
// so, scan the 14x14 grid, locate the marble, and then call the findPos
// in marbles_rules.js
//
function findMarblePosition(marble_id)
{
    var pos = {"col":-1, "row":-1 };

    for (var col =0; col<14;col++){
        for (var row=0; row<14; row++) {
            if (board_grid[col][row] == marble_id) {
                pos.col = col;
                pos.row = row;
                break;
            }
        }
    }
    return findPos(pos)
}

function inHole(p)
{
    // for reference, this is col,row == 7,7
    if (p == 52) return true; else return false;
}
function marbleAtPos(p)
{
    if (p==52) { // special case, the hole
        return board_grid[7][7].marble;
    }

    // return the marble at postion p (1 - empty)
    var pos = the_path[p];
    return board_grid[pos.col][pos.row];
}
function notMyMarble(p) 
{
    if (p == -1) return true;  // off the_path; hoosegow.

    // my marbles are 10*my_player_id +0, +1, +2, +3
    m = marbleAtPos(p);
    if (m == my_player_id*10) return false;
    if (m == my_player_id*10 +1) return false;
    if (m == my_player_id*10 +2) return false;
    if (m == my_player_id*10 +3) return false;
    return true;
}

function walkTo(src,des) 
{
    if (src ==52) return false;
    if (des > 52) return false;

    var flag = true;
    // cannot jump your own marble
    for (var i=src+1; i<=des; i++ ) {
        if (!notMyMarble(i)) {
            flag = false;
            break;
        }
    }
    return flag;
}

function validMovesFor(marble_id, roll)
{
    var paths = [];
    var i=0;
    p = findMarblePosition(marble_id);
    // path if in hole
    if (inHole(p) && roll ==1) {
        paths.push(41);
    }

    // path if in hoosegow
    if ((p<0) && (last_roll == 1 || last_roll == 6) && (notMyMarble(0))) {
        paths.push(0);
    }
    if (p>=0) {
    
        var d = p + roll; // destination
        if (walkTo(p,d)) {
            paths.push(d);
            if (d == 6 && notMyMarble(52)) {
                paths.push(52);
            }
        }
    }
    return paths;

}

//
// we need an array of valid destinations.
//
function validDestinations()
{
    // note: if there are NO valid destinations, then we must move to next game state.
    // but this method just returns the empty list.
    // there are 4 marbles to check:  my_player_id *10 +0, + 1, +2, +3 
    var valid_moves = [];
    for (var m=0;m<4;m++) {
        valid_moves[m] = validMovesFor(m+my_player_id*10, last_roll);
    }
    return valid_moves;
}



