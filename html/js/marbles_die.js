
function Die(die_offsety, die_offsety)
{
    this.die_offsetx = die_offsetx;
    this.die_offsety = die_offsety;

    // draw a die pip
    this.drawPip = function(x,y)
    {
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.arc(this.die_offsetx + x, this.die_offsety + y, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    // draw a die
    this.drawDie = function(rollValue) 
    {
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.rect(this.die_offsetx-2, this.die_offsety-2, 24,24);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        switch(rollValue) {
        case 1:
            this.drawPip(10,10);
            break;
        case 2:
            this.drawPip(2,2);
            this.drawPip(18,18);
            break;
        case 3:
            this.drawPip(2,2);
            this.drawPip(10,10);
            this.drawPip(18,18);
            break;
        case 4:
            this.drawPip(2,2);
            this.drawPip(2,18);
            this.drawPip(18,2);
            this.drawPip(18,18);
            break;
        case 5:
            this.drawPip(2,2);
            this.drawPip(2,18);
            this.drawPip(10,10);
            this.drawPip(18,2);
            this.drawPip(18,18);
            break;
        case 6:
            this.drawPip(2,2);
            this.drawPip(2,18);
            this.drawPip(10,2);
            this.drawPip(10,18);
            this.drawPip(18,2);
            this.drawPip(18,18);
            break;
        default:
            break; // leave blank.
        }
    }
}
