class Pos {
    constructor(posx,posy){
        this.x=posx;
        this.y=posy;
    }

    getx() {
        return this.x;
    }

    setx(posx){
        this.x = posx;
    }

    gety() {
        return this.y;
    }

    sety(posy){
        this.y = posy;
    }

    equals(pos){
        return this.x == pos.getx() && this.y == pos.gety();
    }

    copyTo(pos) {
        if (pos != null) {
            this.x = pos.getx();
            this.y = pos.gety();
        }
    }
}