SOUTH = 0;
NORTH = 1;
EAST = 2;
WEST = 3;

class Enemy extends Entity {

    constructor(canvas, id, maxHp, speed, damage, loot, road, height, width) {
        super(new Pos(road[0].getx(), road[0].gety()), canvas, height, width);
        this.id = id;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.speed = speed;
        this.damage = damage;
        this.loot = loot;
        this.road = road;
        this.partRoad = 1;
        this.direction = this.defineDirection();
    }

    getId() {
        return this.id;
    }

    getMaxHp() {
        return this.maxHp;
    }

    getHp() {
        return this.hp;
    }

    getSpeed() {
        return this.speed;
    }

    getDamage() {
        return this.damage;
    }

    getLoot() {
        return this.loot;
    }

    getDirection() {
        return this.direction;
    }


    defineDirection() {
        var posRoad = this.road[this.partRoad];
        if (Number(this.pos.getx()) == Number(posRoad.getx())) {
            if (Number(this.pos.gety()) < Number(posRoad.gety())) {
                return SOUTH;
            } else {
                return NORTH;
            }
        }
        if (Number(this.pos.gety()) == Number(posRoad.gety())) {
            if (Number(this.pos.getx()) < Number(posRoad.getx())) {
                return EAST;
            } else {
                return WEST;
            }
        }
        return -1;
    }

    move() {
        if (this.partRoad == this.road.length) {
            return true;
        }
        var n = this.speed;
        while(n != 0) {
            if (this.direction == EAST) {
                var new_x = this.pos.getx() + n;
                if (new_x >= this.road[this.partRoad].getx()) {
                    n = (new_x - this.road[this.partRoad].getx());
                    this.pos.setx(this.road[this.partRoad].getx());
                    this.partRoad++;
                    if (this.partRoad == this.road.length) {
                        return true;
                    }
                    this.direction = this.defineDirection();
                } else {
                    this.pos.setx(new_x);
                    n = 0;
                }
            } else if (this.direction == WEST) {
                var new_x = this.pos.getx() - n;
                if (new_x <= this.road[this.partRoad].getx()) {
                    n = (new_x - this.road[this.partRoad].getx());
                    this.pos.setx(this.road[this.partRoad].getx());
                    this.partRoad++;
                    if (this.partRoad == this.road.length) {
                        return true;
                    }
                    this.direction = this.defineDirection();
                } else {
                    this.pos.setx(new_x);
                    n = 0;
                }
            } else if (this.direction == SOUTH) {
                var new_y = this.pos.gety() + n;
                if (new_y >= this.road[this.partRoad].gety()) {
                    n = (new_y - this.road[this.partRoad].gety());
                    this.pos.sety(this.road[this.partRoad].gety());
                    this.partRoad++;
                    if (this.partRoad == this.road.length) {
                        return true;
                    }
                    this.direction = this.defineDirection();
                } else {
                    this.pos.sety(new_y);
                    n = 0;
                }
            } else if (this.direction == NORTH) {
                var new_y = this.pos.gety() - n;
                if (new_y <= this.road[this.partRoad].gety()) {
                    n = (new_y - this.road[this.partRoad].gety());
                    this.pos.sety(this.road[this.partRoad].gety());

                    this.partRoad++;
                    if (this.partRoad == this.road.length) {
                        return;
                    }
                    this.direction = this.defineDirection();
                } else {
                    this.pos.sety(new_y);
                    n = 0;
                }
            } else {
                break;
            }
        }
        return false;
    }

    draw() {
        var context = document.getElementById("testcanvas").getContext("2d");
        context.beginPath();
        context.fillStyle = "#FF0000";
        context.strokeStyle = "#FF0000";
        context.moveTo(this.getPos().getx(),this.getPos().gety());
        context.fillRect(this.getPos().getx(), this.getPos().gety(), this.getWidth(), this.getHeight());
        context.closePath();
    }

    takeDamage(damage) {
        this.hp = Math.max(this.hp - damage, 0);
        return this.hp;
    }
}
