TYPE = 2;

$(document).ready(function() {
    var canvas = "canvas";
    var hCanvas = 500;
    var wCanvas = 500;
    var initNbEnemiesWaves = 10;
    var initLife = 30;
    var initWallet = 500;
    var upCoeffHP = 1;
    context = document.getElementById(canvas).getContext("2d");
    var img = document.getElementById("mapimg");
    image = new Image();
    image.src = img.getAttribute("src");

    var game = new Game(canvas, hCanvas, wCanvas,
        initNbEnemiesWaves, initLife, initWallet, upCoeffHP);

    $('#wallet').html(game.getWallet());
    $('#wave').html(game.getWave());
    $('#life').html(game.getLife());

    $("#" + canvas).click(function(event) {
        var rect = document.getElementById(canvas).getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        if(TYPE==1){
            game.addDefaultTower(new Pos(x,y));
        } else {
            game.addSniperTower(new Pos(x,y));
        }
        $('#wallet').html(game.getWallet());
    });

    $("#nextwave").click(function(event) {
        game.nextWave();
        $("#wave").html(game.getWave());
    });

    $('#switchtype').click(function(event) {
        if(TYPE == 1){
            TYPE = 2;
            $("#type").html("Sniper (250 €)");
        }
        else {
            TYPE = 1;
            $("#type").html("Default (175€)");
        }
    });

    $('#switchtype').click();
    game.play();
});
