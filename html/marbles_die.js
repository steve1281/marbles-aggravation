// draw a die pip
function drawPip(x,y)
{
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.arc(die_offsetx + x, die_offsety + y, 2, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

// draw a die
function drawDie(rollValue) 
{
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.rect(die_offsetx-2, die_offsety-2, 24,24);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    switch(rollValue) {
    case 1:
        drawPip(10,10);
        break;
    case 2:
        drawPip(2,2);
        drawPip(18,18);
        break;
    case 3:
        drawPip(2,2);
        drawPip(10,10);
        drawPip(18,18);
        break;
    case 4:
        drawPip(2,2);
        drawPip(2,18);
        drawPip(18,2);
        drawPip(18,18);
        break;
    case 5:
        drawPip(2,2);
        drawPip(2,18);
        drawPip(10,10);
        drawPip(18,2);
        drawPip(18,18);
        break;
    case 6:
        drawPip(2,2);
        drawPip(2,18);
        drawPip(10,2);
        drawPip(10,18);
        drawPip(18,2);
        drawPip(18,18);
        break;
    default:
        break; // leave blank.
    }
}

