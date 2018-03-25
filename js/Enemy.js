let SOUTH = 0;
let NORTH = 1;
let EAST = 2;
let WEST = 3;

function defineDirection(pos, road) {
    var direction;
    for (var i = 0; i < road.length; ++i) {
        if (road[i].equals(pos)) {
            if (road[i].getx() == road[i+1].getx()) {
                if (road[i].gety() < road[i+1].gety()) {
                    direction = SOUTH;
                } else {
                    direction = NORTH;
                }
            } else {
                if (road[i].getx() < road[i+1].getx()) {
                    return EAST;
                } else {

                    return WEST;
                }
            }
            break;
        }
    }
    return direction;
}

class Enemy extends Entity {

    constructor(canvas, maxHp, speed, damage, road, height, width) {
        super(road[0], canvas, height, width);
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.speed = speed;
        this.damage = damage;
        this.direction = defineDirection(this.getPos(), road);

        this.road = road;
        this.partRoad = 1;
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

    getDirection() {
        return this.direction;
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
                    this.pos = this.road[this.partRoad];
                    this.partRoad++;
                    if (this.partRoad == this.road.length) {
                        return true;
                    }
                    this.direction = defineDirection(this.pos, this.road);
                } else {
                    this.pos.setx(new_x);
                    n = 0;
                }
            }
            if (this.direction == WEST) {
                var new_x = this.pos.getx() - n;
                if (new_x <= this.road[this.partRoad].getx()) {
                    n = (new_x - this.road[this.partRoad].getx());
                    this.pos = this.road[this.partRoad];
                    this.partRoad++;
                    if (this.partRoad == this.road.length) {
                        return true;
                    }
                    this.direction = defineDirection(this.pos, this.road);
                } else {
                    this.pos.setx(new_x);
                    n = 0;
                }
            }
            if (this.direction == SOUTH) {
                var new_y = this.pos.gety() + n;
                if (new_y >= this.road[this.partRoad].gety()) {
                    n = (new_y - this.road[this.partRoad].gety());
                    this.pos = this.road[this.partRoad];
                    this.partRoad++;
                    if (this.partRoad == this.road.length) {
                        return true;
                    }
                    this.direction = defineDirection(this.pos, this.road);
                } else {
                    this.pos.sety(new_y);
                    n = 0;
                }
            }
            if (this.direction == NORTH) {
                var new_y = this.pos.gety() - n;
                if (new_y <= this.road[this.partRoad].gety()) {
                    n = (new_y - this.road[this.partRoad].gety());
                    this.pos = this.road[this.partRoad];
                    this.partRoad++;
                    if (this.partRoad == this.road.length) {
                        return true;
                    }
                    this.direction = defineDirection(this.pos, this.road);
                } else {
                    this.pos.sety(new_y);
                    n = 0;
                }
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
