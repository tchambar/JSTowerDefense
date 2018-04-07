$(document).ready(function() {
    context = document.getElementById("testcanvas").getContext("2d");
    var img = document.getElementById("mapimg");
    image = new Image();
    image.src = img.getAttribute("src");
    var canvas = "testcanvas"
    var hCanvas = 500;
    var wCanvas = 500;
    var nbEnemiesWaves = 10;
    var initLife = 30;
    var initWallet = 500;
    var game = new Game(canvas, hCanvas, wCanvas,
        nbEnemiesWaves, initLife, initWallet);
    game.play();
    game.nextWave();
});

