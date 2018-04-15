// this is the board_grid.                                                                                                                       
// - a zero means no divot
// - 1 means empty divot
// - 10,11,12,13 - player one marbles
// - 20,21,22,23 - player two marbles
// - 30,31,32,33 - player three marbles
// - 40,41,42,43 - player four marbles
// 
// draw a board
function drawBoard(board_grid) {
    var marked = 0;
    for (r=0; r<15; r++) {
        for (c=0;c<15; c++) {
            divot = board_grid[c][r];
            if (divot > 99) { // marked 
                divot = divot / 100;
                marked = 1;
            }
            if (divot>0) {
                ctx.beginPath(); 
                switch (divot) { // select a player color if there is a marble in place.
                    case 10:
                    case 11:
                    case 12: 
                    case 13: 
                        ctx.fillStyle = "red";
                        break;
                    case 20:
                    case 21:
                    case 22: 
                    case 23: 
                        ctx.fillStyle = "green";
                        break;
                    case 30:
                    case 31:
                    case 32:
                    case 33: 
                        ctx.fillStyle = "lightblue";
                        break;
                    case 40:
                    case 41:
                    case 42:
                    case 43: 
                        ctx.fillStyle = "yellow";
                        break;
                    default: // or a default blank divot color.
                        ctx.fillStyle = "#F5F5F5";
                }
                if (marked) {
                    ctx.fillStyle = "pink";
                    marked = 0;
                }
                if (divot > 1) {
                    ctx.arc(30*c+30,30*r+30,14,0,Math.PI*2);
                } else {
                    ctx.arc(30*c+30,30*r+30,10,0,Math.PI*2);
                }
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                if (divot > 1) { 
                    ctx.font = "10px Arial";
                    ctx.fillStyle = "black";
                    ctx.fillText(""+(divot - Math.floor(divot/10)*10), 30*c+30-3 , 30*r+30+3 );
                }
                if (divot == 1) { 
                    ctx.font = "10px Arial";
                    ctx.fillStyle = "black";
                    p = findPos({"row":r,"col":c});
                    if (p>=0 && p<10) {
                        ctx.fillText(""+p, 30*c+30-3 , 30*r+30+3 );
                    }

                    if (p>=10) {
                        ctx.fillText(""+p, 30*c+30-5 , 30*r+30+3 );
                    }
                }
            }
        }
    }
    ctx.closePath();
}

