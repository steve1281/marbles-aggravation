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

    if ( 
        (start_pos.col == 1 && start_pos.row ==13)||     
        (start_pos.col == 2 && start_pos.row ==12)||     
        (start_pos.col == 3 && start_pos.row ==11)||     
        (start_pos.col == 4 && start_pos.row ==10)
     ) {
        // ok, they clicked a marble in the hoosegow. 
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


    return true; // for now.    
}

