class Line {
    constructor(origin, target){
        this.origin = origin;
        this.target = target;
    }

    render(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000";
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.target.x, this.target.y);
        ctx.stroke();
        ctx.restore();
    }

    update(delta){

    }

}