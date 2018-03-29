/**
 * Created by antoineguillory on 20/02/2018.
 */

function play(){
    var road = getModelRoad();

    var towers = new Set();
    towers.add(new Tower("testcanvas", new Pos(100,150), 60, 1, 1, 1, 1, 30, 30));
    towers.add(new Tower("testcanvas", new Pos(200,150), 10, 1, 1, 1, 1, 30, 30));

    var enemies = new Set();
    enemies.add(new Enemy("testcanvas",30,1,1,road,10,10));

    drawAll(towers, enemies);

    var intervalId = setInterval(function() {
        playOneTurn(intervalId, towers, enemies);
    }, 100);
}

function playOneTurn(intervalId, towers, enemies) {
    context.drawImage(image,0,0,500,500);
    if (moveAll(enemies)) {
        clearInterval(intervalId);
    }
    drawAll(towers, enemies);
    shootAll(towers, enemies);
}

function moveAll(enemies) {
    if (enemies.size == 0) {
        return true;
    }
    var enemiesInEnd = 0;
    enemies.forEach(function(e) {
        if (e.move()) {
            enemiesInEnd += 1;
        }
    });
    return (enemiesInEnd == enemies.length);
}

function drawAll(towers, enemies){
    towers.forEach(function(t) {
        t.draw();
    });
    enemies.forEach(function(e) {
        e.draw();
    });
}

function shootAll(towers, enemies){
    towers.forEach(function(t) {
        var e = t.nearestEnemy(enemies)
        if (e != null && t.shoot(e)) {
            enemies.delete(e);
        }
    });
}

$(document).ready(function() {
    context = document.getElementById("testcanvas").getContext("2d");
    var img = document.getElementById("mapimg");
    image = new Image();
    image.src = img.getAttribute("src");
    play();
});
