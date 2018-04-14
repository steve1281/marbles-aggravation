//
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
// --- walk the path --
var the_path = [
    { "col":6, "row":13}, //0
    { "col":6, "row":12}, //1
    { "col":6, "row":11}, //2
    { "col":6, "row":10}, //3
    { "col":6, "row":9},  //4
    { "col":6, "row":8},  //5 ** OR { 7, 7}; the hole
    { "col":5, "row":8},  //6 
    { "col":4, "row":8},  //7
    { "col":3, "row":8},  //8
    { "col":2, "row":8},  //9
    { "col":1, "row":8},  //10
    { "col":1, "row":7},  //11
    { "col":1, "row":6},  //12 ** enemy start point
    { "col":2, "row":6},  //13
    { "col":3, "row":6},  //14
    { "col":4, "row":6},  //15
    { "col":5, "row":6},  //16
    { "col":6, "row":6},  //17
    { "col":6, "row":5},  //18
    { "col":6, "row":4},  //19
    { "col":6, "row":3},  //20
    { "col":6, "row":2},  //21
    { "col":6, "row":1},  //22
    { "col":7, "row":1},  //23
    { "col":8, "row":1},  //24 ** partner start point
    { "col":8, "row":2},  //25 
    { "col":8, "row":3},  //26 
    { "col":8, "row":4},  //27 
    { "col":8, "row":5},  //28 
    { "col":8, "row":6},  //29 
    { "col":9, "row":6},  //30 
    { "col":10, "row":6},  //31 
    { "col":11, "row":6},  //32 
    { "col":12, "row":6},  //33 
    { "col":13, "row":6},  //34 
    { "col":13, "row":7},  //35 
    { "col":13, "row":8},  //36 ** enemy start point
    { "col":12, "row":8},  //37 
    { "col":11, "row":8},  //38 
    { "col":10, "row":8},  //39 
    { "col":9, "row":8},  //40
    { "col":8, "row":8},  //41 
    { "col":8, "row":9},  //42 
    { "col":8, "row":10},  //43 
    { "col":8, "row":11},  //44 
    { "col":8, "row":12},  //45 
    { "col":8, "row":13},  //46 
    { "col":7, "row":13},  //47 
    { "col":7, "row":12},  //48  ** home/safe/win positions
    { "col":7, "row":11},  //49 
    { "col":7, "row":10},  //50 
    { "col":7, "row":9},  //51 

];

function findPos(pos) 
{
    var x = -1;
    if (pos.col == 7 && pos.row == 7) {
        x = 52; // board center
    } else {
        for (var i=0; i< the_path.length; i++) {
            //console.log("col: "+the_path[i].col + ", row:"+the_path[i].row);
            if ( (the_path[i].col == pos.col) && (the_path[i].row == pos.row) ) {
                x = i;
                break;
            }
        }
    }
    return x;
}

function getPath(start_pos, end_pos)
{
    var subpath =[];
    var sindex = findPos(start_pos);
    var eindex = findPos(end_pos);
    console.log("sindex: "+sindex+","+ "eindex: "+eindex);

    if (sindex > eindex) { // user is moving backwards.
        return subpath;
    }
    if (sindex == 52) { // special case, leaving hole
        
    
    }
    if (eindex == 52) { // special case, entering hole

    }
    
    console.log("splice: " +JSON.stringify(the_path.slice(sindex,eindex)));
    return the_path.slice(sindex, eindex);

}
function inHooseGow(pos)
{
    if ( pos.col == 1 && pos.row == 13) return true;
    if ( pos.col == 2 && pos.row == 12) return true;
    if ( pos.col == 3 && pos.row == 11) return true;
    if ( pos.col == 4 && pos.row == 10) return true;
    return false;
}

// ----- rules ----

function ruleHooseGowLock()
{
     if (   board_grid[1][13]>1 
         && board_grid[2][12]>1 
         && board_grid[3][11]>1 
         && board_grid[4][10] 
         && last_roll !=1 
         && last_roll !=6 ) { 
         return true; 
     }
     return false;
}

function ruleEscapeHooseGow(start_pos, end_pos, last_roll)
{
    // true - player is breaking this rule. Reject the move
    // false - well, they are not breaking this rule...

    // check to see if the person is trying to release a marble from the hoosegow
    // the hoosgow is {1,13}{2,12}[3,11} or { 4,10}
    // the roll must be a 1 or 6
    // the dest must be {6,14} 
    var result = false;

    if (inHooseGow(start_pos) ) { // ok, they clicked a marble in the hoosegow. 
        // so, they better also clicked the exit
        if (end_pos.col == 6 && end_pos.row == 13) { 
            //cool, so did they also roll a 1 or 6
            if (last_roll ==6 || last_roll == 1) { 
                result = false; // they DID NOT break rule
            } else {
                result = true; // broke rule - left hoosegow without a 6 or 1
            }
       } else { 
            result = true; // broke rule, tried to leave hoosegow into wrong start point
       }  
    } else { // this rule doesn't apply
          result = false;
    }

    return result;
    
}
function ruleEmptyDivot(end_pos) 
{
    return board_grid[end_pos.col][end_pos.row] != 1;
}

function ruleIntoTheHooseGow(end_pos)
{
    // you can't move into a hoosgow voluntarily
    if (end_pos.col == 1 && end_pos.row==1) return true;
    if (end_pos.col == 2 && end_pos.row==2) return true;
    if (end_pos.col == 3 && end_pos.row==3) return true;
    if (end_pos.col == 4 && end_pos.row==4) return true;

    if (end_pos.col == 1 && end_pos.row==13) return true;
    if (end_pos.col == 2 && end_pos.row==12) return true;
    if (end_pos.col == 3 && end_pos.row==11) return true;
    if (end_pos.col == 4 && end_pos.row==10) return true;

    if (end_pos.col == 13 && end_pos.row==1) return true;
    if (end_pos.col == 13 && end_pos.row==2) return true;
    if (end_pos.col == 13 && end_pos.row==3) return true;
    if (end_pos.col == 13 && end_pos.row==4) return true;

    if (end_pos.col == 13 && end_pos.row==13) return true;
    if (end_pos.col == 12 && end_pos.row==12) return true;
    if (end_pos.col == 11 && end_pos.row==11) return true;
    if (end_pos.col == 10 && end_pos.row==10) return true;

    return false;
}

function ruleSomeoneElsesHome(end_pos)
{
    // never allowed in another players home
    if (end_pos.col == 2 && end_pos.row==7) return true;
    if (end_pos.col == 3 && end_pos.row==7) return true;
    if (end_pos.col == 4 && end_pos.row==7) return true;
    if (end_pos.col == 5 && end_pos.row==7) return true;
    
    if (end_pos.col == 7 && end_pos.row==2) return true;
    if (end_pos.col == 7 && end_pos.row==3) return true;
    if (end_pos.col == 7 && end_pos.row==4) return true;
    if (end_pos.col == 7 && end_pos.row==5) return true;

    if (end_pos.col == 9  && end_pos.row==7) return true;
    if (end_pos.col == 10 && end_pos.row==7) return true;
    if (end_pos.col == 11 && end_pos.row==7) return true;
    if (end_pos.col == 12 && end_pos.row==7) return true;

    return false;

}
function ruleEscapeTheHole(start_pos,end_pos,last_roll)
{
    if (start_pos.col != 7 && start_pos.row != 7) return false; // not in the hole, can't violate it.
    if (last_roll !=1 ) return true; // only a 1 gets you out of the hole, sorry
    if (end_pos.col != 8 && end_pos.row != 8) return true; // must go into 8,8
    return false;
}

function ruleEnoughDivots(start_pos, end_pos, last_roll)
{
    if (inHooseGow(start_pos)) return false;  // doesn't apply

    var subpath = getPath(start_pos, end_pos);
    if (subpath.length != last_roll ) {
       return true; // rule applies 
    }
    return false;

}

function check(start_pos, end_pos, last_roll)
{

    if (ruleEscapeHooseGow(start_pos, end_pos, last_roll)) return false; 

    if (ruleIntoTheHooseGow(end_pos)) return false;

    if (ruleSomeoneElsesHome(end_pos)) return false;

    // comment this out for now; need to detect no move if no marble in play before I can light this up.
    // otherwise, people will have a marble in the hole, and the game will detect this.
    // (need to think about this one)
    //if (ruleEscapeTheHole(start_pos,end_pos,last_roll)) return false;

    if (ruleEmptyDivot(end_pos)) return false; 

    if (ruleEnoughDivots(start_pos, end_pos, last_roll)) return false;

    return true; // for now.    
}

