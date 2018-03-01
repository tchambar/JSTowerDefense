class Tower extends Entity {
    constructor(canvas, pos, firingRate, damage, criticalLuck, buyPrice) {
        super(pos, canvas);

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
}
