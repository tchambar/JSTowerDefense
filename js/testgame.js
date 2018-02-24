/**
 * Created by antoineguillory on 20/02/2018.
 */
class Pos {
    constructor(posx,posy){
        this.x=posx;
        this.y=posy;
    }

    getx() {
        return this.x;
    }

    setx(posx){
        this.x = posx;
    }

    gety() {
        return this.y;
    }

    sety(posy){
        this.y = posy;
    }
}

class Entity {

    constructor(posi, acanvas){
        this.pos = posi;
        this.canvas = acanvas;
    }

    getCanvas(){
        return this.canvas;
    }

    setCanvas(acanvas){
        this.canvas = acanvas;
    }

    getPos(){
        return this.pos;
    }


    setPos(posi){
        this.pos = posi;
    }

}

class Ennemy extends Entity {
    constructor(posi, acanvas){
        super(posi,acanvas);
    }

    draw() {
        var context = document.getElementById("testcanvas").getContext("2d");
        context.beginPath();
        context.fillStyle = "#FF0000";
        context.strokeStyle = "#FF0000";
        context.moveTo(this.getPos().getx(),this.getPos().gety());
        context.fillRect(this.getPos().getx(), this.getPos().gety(), 30, 30);
        context.closePath();
    }
}

class Tower extends Entity {
    constructor(posi, acanvas){
        super(posi,acanvas);
    }

    draw() {
        var context = document.getElementById("testcanvas").getContext("2d");
        context.beginPath();
        context.fillStyle = "#00FF00";
        context.strokeStyle = "#00FF00";
        context.moveTo(this.getPos().getx(),this.getPos().gety());
        context.fillRect(this.getPos().getx(), this.getPos().gety(), 30, 30);
        context.closePath();
    }
}

mode = false;

function animationwow(){
    posen = new Pos(100, 100);
    postow= new Pos(200, 200);
    tow = new Tower(postow, "testcanvas");
    ene = new Ennemy(posen, "testcanvas");
    tow.draw();
    ene.draw();
    var context = document.getElementById("testcanvas").getContext("2d");
    setInterval(function() {
        if(!mode){
            context.beginPath();
            context.moveTo(ene.getPos().getx(),ene.getPos().gety());
            context.fillStyle = "#0000FF";
            context.strokeStyle = "#0000FF";
            context.lineTo(ene.getPos(), ene.getPos());
            context.stroke();
            context.closePath();
            mode = true;
        } else {
            context.beginPath();
            context.moveTo(ene.getPos().getx(),ene.getPos().gety());
            context.fillStyle = "#FFFFFF";
            context.strokeStyle = "#FFFFFF";
            context.lineTo(tow.getPos().getx(), tow.getPos().gety());
            context.stroke();
            context.closePath();
            mode = false;
        }
    }, 3000);
}
$(document).ready(function() {
    animationwow();
});