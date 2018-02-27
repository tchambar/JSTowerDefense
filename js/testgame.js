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

    constructor(posi, acanvas, height, width){
        this.pos = posi;
        this.canvas = acanvas;
        this.height = height;
        this.width = width;
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

    getHeight(){
        return this.height;
    }

    getWidth(){
        return this.width;
    }

    setHeight(height){
        this.height = height;
    }

    setWidth(width){
        this.width = width;
    }

}

class Ennemy extends Entity {
    constructor(posi, acanvas, height, width){
        super(posi,acanvas, height, width);
    }

    draw() {
        context.beginPath();
        context.fillStyle = "#FF0000";
        context.strokeStyle = "#FF0000";
        context.moveTo(this.getPos().getx(),this.getPos().gety());
        context.fillRect(this.getPos().getx(), this.getPos().gety(), this.getWidth(), this.getHeight());
        context.closePath();
    }
}

class Tower extends Entity {
    constructor(posi, acanvas, height, width){
        super(posi,acanvas, height, width);
    }

    draw() {
        context.beginPath();
        context.fillStyle = "#00FF00";
        context.strokeStyle = "#00FF00";
        context.moveTo(this.getPos().getx(),this.getPos().gety());
        context.fillRect(this.getPos().getx(), this.getPos().gety(), this.getWidth(), this.getHeight());
        context.closePath();
    }
}

mode = false;

function animationwow(){
    var posen1 = new Pos(100, 100);
    var posen2 = new Pos(150, 100);
    var posen3 = new Pos(200, 100);
    var posen4 = new Pos(250, 100);

    var postow= new Pos(200, 200);
    tow = new Tower(postow, "testcanvas",30,30);
    var ene1 = new Ennemy(posen1, "testcanvas",30,30);
    var ene2 = new Ennemy(posen2, "testcanvas",30,30);
    var ene3 = new Ennemy(posen3, "testcanvas",30,30);
    var ene4 = new Ennemy(posen4, "testcanvas",30,30);
    var arrenn = [];
    arrenn[0] = ene1;
    arrenn[1] = ene2;
    arrenn[2] = ene3;
    arrenn[3] = ene4;


    tow.draw();

    var context = document.getElementById("testcanvas").getContext("2d");
    setInterval(function() {
        context.canvas.width = context.canvas.width;
        context.drawImage(image,0,0,500,500);
        testdeplacement(arrenn,tow);
    }, 25);
}

function testdeplacement(arrenn,arrtow){
    arrenn.forEach(function(enn){
        if(!mode){
            context.beginPath();
            context.moveTo(enn.getPos().getx(),enn.getPos().gety());
            context.fillStyle = "#0000FF";
            context.strokeStyle = "#0000FF";
            context.lineTo(tow.getPos().getx(), tow.getPos().gety());
            context.stroke();
            context.closePath();
            mode = Math.round(Math.random());
        } else {
            context.beginPath();
            context.moveTo(enn.getPos().getx(),enn.getPos().gety());
            context.fillStyle = "#FFFFFF";
            context.strokeStyle = "#FFFFFF";
            context.lineTo(tow.getPos().getx(), tow.getPos().gety());
            context.stroke();
            context.closePath();
            mode = Math.round(Math.random());
        }
    });
    tow.draw();
    arrenn.forEach(function(enn) {
        context.moveTo(enn.getPos().getx(),enn.getPos().gety());
        context.clearRect(enn.getPos().getx(), enn.getPos().gety(), enn.getHeight(), enn.getWidth());
        enn.getPos().sety((enn.getPos().gety()+getRandomInt(7)));
        context.fillStyle = "#FF0000";
        context.fillRect(enn.getPos().getx(), enn.getPos().gety(), enn.getHeight(), enn.getWidth());
        context.stroke();
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

$(document).ready(function() {
    context = document.getElementById("testcanvas").getContext("2d");
    var img = document.getElementById("mapimg");
    image = new Image();
    image.src = img.getAttribute("src");
    animationwow();
});
