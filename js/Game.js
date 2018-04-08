class Game {
    constructor(canvas, hCanvas, wCanvas, nbEnemiesWave, initLife, initWallet) {
        this.canvas = canvas;
        this.hCanvas = hCanvas;
        this.wCanvas = wCanvas;
        this.nbEnemiesWave = nbEnemiesWave;
        this.road = getModelRoad();
        this.life = initLife;
        this.wave = 0;
        this.waveIsOngoing = false;
        this.wallet = initWallet;
        this.towers = new Set();
        this.enemies = new Set();
        this.activeEnemies = new Set();
        this.hTower = 30;
        this.wTower = 30;
        this.hEnemy = 7;
        this.wEnemy = 7;
    }

    getWave() {
        return this.wave;
    }

    getWaveIsOngoing() {
        return this.waveIsOngoing;
    }

    setEndWave() {
        this.waveIsOngoing = false;
    }

    isEnd() {
        return this.life == 0;
    }

    getWallet() {
        return this.wallet;
    }

    addTower(pos, scale, firingRate, damage, criticalLuck, buyPrice) {
        if (Number(pos.getx()) >= 0 && Number(pos.gety()) >= 0
            && Number(pos.getx()) <= this.hCanvas
            && Number(pos.gety()) <= this.wCanvas
            && this.wallet - buyPrice >= 0) {
            this.towers.add(new Tower(this.canvas, pos, scale, firingRate,
                damage, criticalLuck, buyPrice, this.hTower, this.wTower))
            this.wallet -= buyPrice;
        }
    }

    addDefaultTower(pos) {
        this.addTower(pos, 500, 1, 5, 1, 200);
    }

    addEnemy(maxHp, speed, damage, loot) {
        this.enemies.add(new Enemy(this.canvas, this.enemies.size + 1, maxHp, speed, damage, loot,
            this.road, this.hEnemy, this.wEnemy));
    }

    addSoldier() {
        this.addEnemy(30, 10, 1, 5);
    }

    createWave() {
        for (var i = 0; i < this.nbEnemiesWave; ++i) {
            this.addSoldier();
        }
    }

    moveAllEnemies() {
        this.activeEnemies.forEach(function(e) {
            if (e.move()) {
                this.life -= 1;
                this.activeEnemies.delete(e);
            }
            console.log("Move " + e.getId() + " " + e.getPos().getx() + " : " + e.getPos().gety());
        }, this);
    }

    drawCanvas() {
        var context = document.getElementById("testcanvas").getContext("2d");
        var img = document.getElementById("mapimg");
        var image = new Image();
        image.src = img.getAttribute("src");
        context.drawImage(image,0,0,this.hCanvas,this.wCanvas);
    }

    drawAll() {
        this.drawCanvas();
        this.towers.forEach(function(t) {
            t.draw();
        });
        this.activeEnemies.forEach(function(e) {
            e.draw();
            console.log("Draw " + e.getId() + " " + e.getPos().getx() + " : " + e.getPos().gety());
        });
    }

    shootAll() {
        if (this.activeEnemies.size != 0) {
            this.towers.forEach(function (t) {
                var e = t.nearestEnemy(this.activeEnemies);
                if (e != null && t.shoot(e)) {
                    this.activeEnemies.delete(e);
                    this.wallet += e.getLoot();
                }
            }, this);
        }
    }

    addNewActiveEnemy() {
        if (this.enemies.size != 0) {
            console.log("new active enemy");
            var e = [...this.enemies][0];
            this.enemies.delete(e);
            this.activeEnemies.add(e);
        }
    }

    playOneSecond() {
        console.log("PlayOneSecond");
        this.addNewActiveEnemy();
        this.moveAllEnemies();
        this.shootAll();
        this.drawAll();
        return (this.enemies.size == 0 && this.activeEnemies.size == 0);
    }

    nextWave() {
        console.log("Next Wave");
        if (!this.waveIsOngoing) {
            this.wave += 1;
            this.createWave();
            console.log("new wave");
            this.waveIsOngoing = true;
        }
    }

    lose() {
        console.log("Lose");
    }

    play() {
        this.drawAll();
        this.myDescribe();
        var intervalId = setInterval(function(game) {
            console.log("new second");
            if (game.isEnd()) {
                game.lose();
                clearInterval(intervalId);
            }
            if (game.getWaveIsOngoing()) {
                console.log("Wave is ongoing");
                if (game.playOneSecond()) {
                    console.log("Wave is finish");
                    game.setEndWave();
                }
            }
            game.myDescribe();
        }, 1000, this);
    }

    myDescribe() {
        console.log("\tthis.canvas : " + this.canvas);
        console.log("\tthis.hCanvas : " + this.hCanvas);
        console.log("\tthis.wCanvas : " + this.wCanvas);
        console.log("\tthis.nbEnemiesWave : " + this.nbEnemiesWave);
        console.log("\tthis.road : " + this.road);
        console.log("\tthis.life : " + this.life);
        console.log("\tthis.wave : " + this.wave);
        console.log("\tthis.wallet : " + this.wallet);
        console.log("\ttowers" + [...this.towers]);
        console.log("\tenemies" + [...this.enemies]);
        console.log("\tactiveEnemies" + [...this.activeEnemies]);
        console.log("\tthis.hTower : " + this.hTower);
        console.log("\tthis.wTower : " + this.wTower);
        console.log("\tthis.hEnemy : " + this.hEnemy);
        console.log("\tthis.wEnemy : " + this.wEnemy);
    }
}