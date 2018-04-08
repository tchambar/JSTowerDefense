class Tower extends Entity {
    constructor(canvas, pos, scale, damage, buyPrice, height, width, color) {
        super(pos, canvas, height, width);

        this.scale = scale;
        this.damage = damage;
        this.buyPrice = buyPrice;
        this.color = color;
    }

    getColor(){
        return this.color;
    }
    //Portée de la tour
    getScale() {
        return this.scale;
    }

    getDamage() {
        return this.damage;
    }

    //tire vers la position e
    shoot(e) {
        if (e != null) {
            var context = document.getElementById(this.canvas).getContext("2d");
            context.beginPath();
            context.moveTo(e.getPos().getx(), e.getPos().gety());
            context.fillStyle = "#0000FF";
            context.strokeStyle = "#0000FF";
            context.lineTo(this.pos.getx(), this.pos.gety());
            context.stroke();
            context.closePath();
            return (e.takeDamage(this.damage) == 0);
        }
        return false;
    }
    //Dessine la tour courante
    draw() {
        var context = document.getElementById(this.getCanvas()).getContext("2d");
        context.beginPath();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.moveTo(this.getPos().getx(),this.getPos().gety());
        context.fillRect(this.getPos().getx(), this.getPos().gety(), this.getWidth(), this.getHeight());
        context.closePath();
    }

    //detecte l'ennemi le plus proche
    nearestEnemy(enemies) {
        var arrayEnemies = Array.from(enemies);
        if (enemies.size != 0) {
            var nearestEnemy = arrayEnemies[0];
            var min = Math.sqrt(Math.pow(this.pos.getx() - nearestEnemy.getPos().getx(), 2)
                + Math.pow(this.pos.gety() - nearestEnemy.getPos().gety(), 2));
            for (var i = 1; i < arrayEnemies.length; ++i) {
                var e = arrayEnemies[i];
                var dist = Math.sqrt(Math.pow(this.pos.getx() - e.getPos().getx(), 2)
                    + Math.pow(this.pos.gety() - e.getPos().gety(), 2));
                if (min > dist) {
                    nearestEnemy = e;
                    min = dist;
                }
            }
            if (this.scale >= min) {
                return nearestEnemy;
            }
        }
        return null;
    }
}