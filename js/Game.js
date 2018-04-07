class Game {
    constructor(canvas, hCanvas, wCanvas, nbEnemiesWave, initLife, initWallet) {
        this.canvas = canvas;
        this.hCanvas = hCanvas;
        this.wCanvas = wCanvas;
        this.nbEnemiesWave = nbEnemiesWave;
        this.road = getModelRoad();
        this.life = initLife;
        this.wave = 0;
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

    addSniperTower(pos) {
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
        if (this.enemies.size == 0) {
            return true;
        }
        this.activeEnemies.forEach(function(e) {
            if (e.move()) {
                this.life -= 1;
                this.activeEnemies.delete(e);
            }
        });
        return (this.enemies.size == 0 && this.activeEnemies.size == 0);
    }

    drawAll() {
        context.drawImage(image,0,0,this.hCanvas,this.wCanvas);
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
        if (this.enemies.size != 0) {
            this.activeEnemies.add([...this.enemies][0]);
        }
        this.drawAll();
        this.shootAll();
        return this.moveAllEnemies();
    }

    lose() {

    }

    play() {
        this.drawAll();

        while(this.life != 0) {
            this.wave += 1;
            this.createWave();
            var end = false;
            var intervalId = setInterval(function() {
                if (this.playOneSecond()) {
                    clearInterval(intervalId);
                    end = true;
                }
            }, 1000);
            while (!end);
        }
        this.lose();
    }
}