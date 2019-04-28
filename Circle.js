class Circle {
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.list = []; //파이 데이터들
        this.pointList = [{x:0, y:-r}, {x:r, y:0}, {x:0, y:r},{x:-r, y:0}];
    }

    addPie(pie, idx){
        pie.x = this.x;
        pie.y = this.y;
        pie.r = this.r;
        
        pie.point = {x: this.x + this.pointList[idx].x , y:this.y + this.pointList[idx].y};
        this.list.push(pie); //파이를 추가.
    }

    update(delta){

    }

    render(ctx){
        this.list.forEach( x => x.render(ctx) );
    }
}