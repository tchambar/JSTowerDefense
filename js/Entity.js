class Entity {
    constructor(posi, acanvas, height, width){
        this.pos = posi;
        this.canvas = acanvas;
        this.height = height;
        this.width = width;
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

    getHeight(){
        return this.height;
    }

    getWidth(){
        return this.width;
    }

    setHeight(height){
        this.height = height;
    }

    setWidth(width){
        this.width = width;
    }
}
