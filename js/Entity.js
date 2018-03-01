class Entity {
    constructor(posi, acanvas){
        this.pos = posi;
        this.canvas = acanvas;
    }

    getCanvas(){
        return this.canvas;
    }

    setCanvas(acanvas){
        this.canvas = acanvas;
    }

    getPos(){
        return this.pos;
    }

    setPos(posi) {
        this.pos = posi;
    }
}
