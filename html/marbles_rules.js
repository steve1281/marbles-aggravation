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


function checkHooseGowLock()
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


