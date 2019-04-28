class Pie {
    constructor(data={start:0, end: 2 * Math.PI, color:"#000"}){
        this.start = data.start;
        this.end = data.end;
        this.color = data.color;
        this.disable = false;
        this.x;
        this.y;
        this.r;
        this.point = null;
    }

    update(delta){

    }

    clone(origin){
        this.x = origin.x;
        this.y = origin.y;
        this.r = origin.r;
        this.start = origin.start;
        this.end = origin.end;
        this.color = origin.color;
        this.disable = origin.disable;
    }

    render(ctx){
        if(this.disable) return; //안그리는 애들은 그리지 않는다.
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.r, this.start, this.end);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}