class Circle {
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.list = []; //파이 데이터들
        this.pointList = [{x:0, y:-r}, {x:r, y:0}, {x:0, y:r},{x:-r, y:0}];
        this.mode = 0;

        this.addPie(new Pie({x:this.x, y:this.y, r:this.r, start: - 3 / 4 * Math.PI, end: - 1 / 4 * Math.PI, color: "#ddd", number:1 }), 0);
        this.addPie(new Pie({x:this.x, y:this.y, r:this.r, start: - 1 / 4 * Math.PI, end: 1 / 4 * Math.PI, color: "#ff0000", number:2 }), 1);
        this.addPie(new Pie({x:this.x, y:this.y, r:this.r, start: 1 / 4 * Math.PI, end: 3 / 4 * Math.PI, color: "#00ff00", number:3 }), 2);
        this.addPie(new Pie({x:this.x, y:this.y, r:this.r, start: 3 / 4 * Math.PI, end: 5 / 4 * Math.PI, color: "#0000ff", number:4 }), 3);
    }

    addPie(pie, idx){
        this.list.push(pie); //파이를 추가.
    }

    update(delta){
        this.list.forEach( x => {
            x.update(delta);
            x.x = this.x;
            x.y = this.y;
        });
    }

    render(ctx){
        if(this.mode == 0){
            ctx.save();
            ctx.strokeStyle= "#000";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI);
            ctx.stroke();
            ctx.restore();
        }else if(this.mode == 1){
            this.list.forEach( x => x.render(ctx) );
        }
        
    }
}