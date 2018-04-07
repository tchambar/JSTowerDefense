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
        this.hEnemy = 15;
        this.wEnemy = 15;
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
        this.addTower(pos, 100, 1, 5, 1, 200);
    }

    addEnemy(maxHp, speed, damage) {
        this.enemies.add(new Enemy(this.canvas, maxHp, speed, damage,
            this.road, this.hEnemy, this.wEnemy))
    }

    addSoldier() {
        this.addEnemy(30, 5, 1);
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
        });
        return (this.enemies.size == 0 && this.activeEnemies.size == 0);
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
        });
    }

    shootAll(){
        this.towers.forEach(function(t) {
            var e = t.nearestEnemy(this.activeEnemies)
            if (e != null && t.shoot(e)) {
                this.activeEnemies.delete(e);
            }
        });
    }

    playOneSecond() {
        console.log("PlayOneSecond");
        if (this.enemies.size != 0) {
            console.log("new active enemy");
            var e = [...this.enemies][0];
            this.activeEnemies.add(e);
            this.enemies.delete(e);
        }
        this.drawAll();
        this.shootAll();
        return this.moveAllEnemies();
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
        console.log("this.canvas : " + this.canvas)
        console.log("this.hCanvas : " + this.hCanvas)
        console.log("this.wCanvas : " + this.wCanvas)
        console.log("this.nbEnemiesWave : " + this.nbEnemiesWave)
        console.log("this.road : " + this.road)
        console.log("this.life : " + this.life)
        console.log("this.wave : " + this.wave)
        console.log("this.wallet : " + this.wallet)
        console.log("this.towers.size : " + this.towers.size)
        console.log("this.enemies.size : " + this.enemies.size)
        console.log("this.activeEnemies.size : " + this.activeEnemies.size)
        console.log("this.hTower : " + this.hTower)
        console.log("this.wTower : " + this.wTower)
        console.log("this.hEnemy : " + this.hEnemy)
        console.log("this.wEnemy : " + this.wEnemy)
    }
}