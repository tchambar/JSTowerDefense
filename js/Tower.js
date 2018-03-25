class Tower extends Entity {
    constructor(canvas, pos, firingRate, damage, criticalLuck, buyPrice, height, width) {
        super(pos, canvas, height, width);

        this.firingRate = firingRate;
        this.damage = damage;
        this.criticalLuck = criticalLuck;
        this.level = 1;

        this.buyPrice = buyPrice;
        this.sellPrice = buyPrice;
    }

    getFiringRate() {
        return this.firingRate;
    }

    getDamage() {
        return this.damage;
    }

    getCriticalLuck() {
        return criticalLuck;
    }

    getLevel() {
        return level;
    }

    levelUp() {
        this.level += 1;
    }

    shoot(e) {
        // ANIMATION
        return e.takeDamage(this.damage) == 0;
    }

    draw() {
        var context = document.getElementById("testcanvas").getContext("2d");
        context.beginPath();
        context.fillStyle = "#00FF00";
        context.strokeStyle = "#00FF00";
        context.moveTo(this.getPos().getx(),this.getPos().gety());
        context.fillRect(this.getPos().getx(), this.getPos().gety(), this.getWidth(), this.getHeight());
        context.closePath();
    }
}
