class Pie {
    constructor(data = {x:0, y:0, r:0, start: 0, end: 2 * Math.PI, color: "#000", number:1 }) {
        this.pointList = [{x:0, y:-data.r}, {x:data.r, y:0}, {x:0, y:data.r},{x:-data.r, y:0}];
        this.start = data.start;
        this.end = data.end;
        this.color = data.color;
        this.disable = false;
        this.x = data.x;
        this.y = data.y;
        this.r = data.r;
        this.point = {x: this.x + this.pointList[data.number-1].x , y:this.y + this.pointList[data.number-1].y};
        this.number = data.number;
        this.textPos = {x:0, y:0};
    }

    update(delta) {
        this.textPos.x = this.x + this.pointList[this.number - 1].x / 2;
        this.textPos.y = this.y + this.pointList[this.number - 1].y / 2;
        this.point.x = this.x + this.pointList[this.number-1].x;
        this.point.y = this.y + this.pointList[this.number-1].y;
    }

    clone(origin) {
        this.x = origin.x;
        this.y = origin.y;
        this.r = origin.r;
        this.pointList = origin.pointList;
        this.start = origin.start;
        this.end = origin.end;
        this.color = origin.color;
        this.disable = origin.disable;
        this.point = JSON.parse(JSON.stringify(origin.point));
        this.number = origin.number;
    }

    render(ctx, debug=false) {
        if (this.disable) return; //안그리는 애들은 그리지 않는다.

        ctx.save();
        ctx.strokeStyle = "#555";
        ctx.fillStyle = "#222";
        ctx.textBaseline = "middle";
        ctx.textAlign="center";
        ctx.font="16px Arial";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.r, this.start, this.end);
        ctx.closePath();
        ctx.stroke();
        if(debug){
            console.log(this.x, this.textPos.x);
        }
        ctx.fillText(this.number, this.textPos.x, this.textPos.y)
        ctx.restore();
    }
}