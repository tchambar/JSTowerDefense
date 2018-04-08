class Game {
    //Constructeur de la classe de jeu
    constructor(canvas, hCanvas, wCanvas, initNbEnemiesWave, initLife, initWallet, upCoeffHP) {
        this.canvas = canvas;
        this.hCanvas = hCanvas;
        this.wCanvas = wCanvas;
        this.nbEnemiesWave = initNbEnemiesWave;
        this.road = getModelRoad();
        this.life = initLife;
        this.wave = 0;
        this.wallet = initWallet;
        this.coeffHP = 1;
        this.upCoeffHP = upCoeffHP;
        this.towers = new Set();
        this.enemies = new Set();
        this.activeEnemies = new Set();
    }

    //retourne le numéro de la vague d'ennemi courante
    getWave() {
        return this.wave;
    }

    //retourne la vie restante de l'utilisateur
    getLife() {
        return this.life;
    }

    //retourne vrai si la partie est terminée
    isEnd() {
        return this.life == 0;
    }

    //retourne la monnaie courante de l'utilisateur
    getWallet() {
        return this.wallet;
    }

    //ajoute une tour (raw), est utilisé que par des wrapper (default et sniper)
    addTower(pos, scale, damage, buyPrice, height, width, color) {
        if (Number(pos.getx()) >= 0 && Number(pos.gety()) >= 0
            && Number(pos.getx()) <= this.hCanvas
            && Number(pos.gety()) <= this.wCanvas) {
            if (this.wallet - buyPrice >= 0) {
                this.towers.add(new Tower(this.canvas, pos, scale,
                    damage, buyPrice, height, width, color));
                this.wallet -= buyPrice;
                $("#pasdargent").html("");
            } else {
                $("#pasdargent").html("Vous n'avez pas assez d'argent.");
            }
        }
    }

    //Ajoute une tour basique
    addDefaultTower(pos) {
        this.addTower(pos, 100, 5, 175, 25, 25, "#00FF00");
    }

    //Ajoute un sniper, avec plus de dégâts et de portée mais est plus chere
    addSniperTower(pos){
        this.addTower(pos, 200, 8, 250, 15,15, "#00FFFF");
    }

    //Ajoute un ennemi (raw, est utilisé que par les wrapper addsoldier et addboss
    addEnemy(maxHp, speed, damage, loot, height, width) {
        this.enemies.add(new Enemy(this.canvas, this.enemies.size + 1, maxHp, speed, damage, loot,
            this.road, height, width));
    }

    //Ajoute un ennemi standard
    addSoldier() {
        this.addEnemy(20 * this.coeffHP, 10, 1, 5, 7, 7);
    }

    //Ajoute un boss
    addBoss(){
        this.addEnemy(100 * this.coeffHP, 5, 10, 20, 20, 14 );
    }

    //Cree une vague d'ennemis. Un boss est créé toutes les 3 vagues.
    createWave() {

        for (var i = 0; i < this.nbEnemiesWave; ++i) {
            this.addSoldier();
        }
        if (this.wave % 3 == 0) {
            this.coeffHP += this.upCoeffHP;
            this.addBoss();
        }
        this.nbEnemiesWave += 2;
    }

    //Déplace les ennemis
    moveAllEnemies() {
        this.activeEnemies.forEach(function(e) {
            if (e.move()) {
                this.life = Math.max(0, this.life - e.getDamage());
                this.activeEnemies.delete(e);
                $('#life').html(this.getLife());
            }
            console.log("Move : " + e.getPos().getx() + " " + e.getPos().gety());
            console.log("Direction : " + e.getDirection());
        }, this);
    }

    //Dessine le canvas
    drawCanvas() {
        var context = document.getElementById(this.canvas).getContext("2d");
        var img = document.getElementById("mapimg");
        var image = new Image();
        image.src = img.getAttribute("src");
        context.drawImage(image,0,0,this.hCanvas,this.wCanvas);
    }

    //Dessine tout les composants
    drawAll() {
        this.drawCanvas();
        this.towers.forEach(function(t) {
            t.draw();
        });
        this.activeEnemies.forEach(function(e) {
            e.draw();
        });
    }

    //Gestion des tirs
    shootAll() {
        if (this.activeEnemies.size != 0) {
            this.towers.forEach(function (t) {
                var e = t.nearestEnemy(this.activeEnemies);
                if (e != null && t.shoot(e)) {
                    this.activeEnemies.delete(e);
                    this.wallet += e.getLoot();
                    $('#wallet').html(this.getWallet());
                }
            }, this);
        }
    }

    //Ajoute un nouveau ennemi 'actif' = (visible et sur le terrain)
    addNewActiveEnemy() {
        if (this.enemies.size != 0 && random_bool()) {
            var e = [...this.enemies][0];
            this.enemies.delete(e);
            this.activeEnemies.add(e);
        }
    }

    //Joue une seconde de jeu
    playOneSecond() {
        if (!(this.enemies.size == 0 && this.activeEnemies.size == 0)) {
            this.addNewActiveEnemy();
            this.moveAllEnemies();
            this.drawAll();
            this.shootAll();
        } else {
            this.drawAll();
        }
    }
    //Genere la prochaine vague
    nextWave() {
        this.wave += 1;
        this.createWave();
    }

    //Cree l'écran de game over
    lose() {
        $("body").html("\
            <h1 style='text-align:center;'>Vous avez perdu, dommage.</h1>\
            <div>\
                <button id='butcenter' onclick='window.location=\"./maps.php\"' >Retour a la selection</button>\
            </div>\
        ");
    }

    //joue le jeu.
    play() {
        this.drawAll();
        var intervalId = setInterval(function(game) {
            if (game.isEnd()) {
                game.lose();
                clearInterval(intervalId);
            }
            game.playOneSecond();
        }, 100, this);
    }

}